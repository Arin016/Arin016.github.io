import { NextResponse } from "next/server";
import {
  CONTENT_TOPICS,
  DEFAULT_SUGGESTIONS,
  buildRetrieveRequest,
  buildVerifyRequest,
  decideRetrieve,
  decideVerify,
  matchSmalltalk,
  type RetrieveAnswers,
} from "@/lib/jev-policy";

export const runtime = "nodejs";

const ENDPOINT = "https://api.typesafe.ai/v1/systemone";
const CALL_TIMEOUT_MS = 10_000;

// Tiny in-memory cache + throttle. Enough for a personal site; upgrade to
// Redis only if abuse ever shows up in logs.
const cache = new Map<string, { at: number; body: unknown }>();
const hitsByIp = new Map<string, number[]>();
const CACHE_TTL_MS = 10 * 60_000;
const CACHE_MAX = 300;
const RATE_PER_MIN = 30;

type Out =
  | { kind: "answer"; text: string; links: string[]; trace: string[]; via: "jev"; confidence: number }
  | { kind: "unknown"; suggestions: { label: string; query: string }[]; trace: string[]; via: "jev" }
  | { kind: "local"; text: string; links: string[]; trace: string[] }
  | { kind: "fallback" };

async function jev(body: unknown, timeoutMs: number): Promise<any> {
  const key = process.env.TYPESAFE_API_KEY;
  if (!key) throw new Error("no-key");
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), timeoutMs);
  try {
    const r = await fetch(ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: ctl.signal,
    });
    if (!r.ok) throw new Error(`jev-http-${r.status}`);
    return await r.json();
  } finally {
    clearTimeout(t);
  }
}

function suggestionsOf(topics: { label: string }[]) {
  return topics.map((t) => ({ label: t.label, query: t.label }));
}

export async function POST(req: Request) {
  let query = "";
  try {
    query = String((await req.json())?.query ?? "").slice(0, 500).trim();
  } catch {
    return NextResponse.json({ kind: "fallback" } satisfies Out);
  }
  if (!query) return NextResponse.json({ kind: "fallback" } satisfies Out);

  // 1. Deterministic smalltalk: instant, free, no model.
  const st = matchSmalltalk(query);
  if (st) {
    return NextResponse.json({
      kind: "local",
      text: st.text,
      links: [st.src],
      trace: ["parse intent (smalltalk)", "retrieve (local · instant)"],
    } satisfies Out);
  }

  // 2. Throttle.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const window = (hitsByIp.get(ip) ?? []).filter((t) => now - t < 60_000);
  window.push(now);
  hitsByIp.set(ip, window);
  if (window.length > RATE_PER_MIN)
    return NextResponse.json({ kind: "fallback" }, { status: 429 });

  // 3. Cache.
  const ck = query.toLowerCase();
  const cached = cache.get(ck);
  if (cached && now - cached.at < CACHE_TTL_MS)
    return NextResponse.json(cached.body as Out);

  const tokens = query.split(/\s+/).filter(Boolean).length;
  const respond = (body: Out) => {
    if (cache.size >= CACHE_MAX) cache.clear();
    cache.set(ck, { at: now, body });
    return NextResponse.json(body);
  };

  // 4. Retrieve: one Jev call, Choice over topics + off-topic Noul in parallel.
  let ret: any;
  try {
    ret = await jev(buildRetrieveRequest(query), CALL_TIMEOUT_MS);
  } catch {
    return NextResponse.json({ kind: "fallback" } satisfies Out);
  }
  const tAns = ret?.answers?.topic;
  const oAns = ret?.answers?.off_topic;
  if (!tAns) return NextResponse.json({ kind: "fallback" } satisfies Out);
  const gate = decideRetrieve(
    {
      choice: tAns.choice,
      probabilities: tAns.probabilities ?? {},
      confidence: tAns.confidence ?? 0,
      offTopic: oAns?.noul ?? 0,
    } satisfies RetrieveAnswers,
    CONTENT_TOPICS
  );
  const conf = typeof tAns.confidence === "number" ? tAns.confidence : 0;
  const traceBase = [
    `parse intent (${tokens} tokens)`,
    `retrieve · jev choice + off-topic (conf ${conf.toFixed(2)})`,
  ];
  if (!gate.topic) {
    return respond({
      kind: "unknown",
      suggestions: gate.suggestions.length
        ? gate.suggestions
        : suggestionsOf(
            DEFAULT_SUGGESTIONS.map((label) => ({ label }))
          ),
      trace: [...traceBase, `declining to guess · ${gate.reason} ✓`],
      via: "jev",
    } satisfies Out);
  }

  // 5. Verify: second Jev call asks whether the chosen passage answers the query.
  let verify = 1;
  try {
    const vret = await jev(buildVerifyRequest(query, gate.topic), CALL_TIMEOUT_MS);
    const n = vret?.answers?.answers_query?.noul;
    if (typeof n === "number") verify = n;
  } catch {
    return NextResponse.json({ kind: "fallback" } satisfies Out);
  }
  if (!decideVerify(verify)) {
    return respond({
      kind: "unknown",
      suggestions: gate.suggestions,
      trace: [...traceBase, `verify ✗ (answers_query ${verify.toFixed(2)}) · declining ✓`],
      via: "jev",
    } satisfies Out);
  }

  return respond({
    kind: "answer",
    text: gate.topic.text,
    links: [gate.topic.src],
    trace: [
      ...traceBase,
      `verify citations ✓ (answers_query ${verify.toFixed(2)})`,
      "synthesize",
    ],
    via: "jev",
    confidence: conf,
  } satisfies Out);
}
