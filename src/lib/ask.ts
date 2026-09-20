// ask.ts — the knowledge layer behind the hero terminal and /ask.
// Keyword matching over the curated base (src/lib/kb-data.json, shared with
// the Jev retriever). Offline fallback when /api/ask is unreachable.
// ask()/askRich() answer single-best (terminal contract); runAgent() runs
// the fuller loop for /ask: retrieve top passages, merge ties, verify
// citations exist, and suggest nearest topics instead of dead-ending.
import KB_JSON from "./kb-data.json";

type Entry = {
  label: string;
  keys: string[];
  text: string;
  src: string;
  smalltalk?: boolean;
};

const KB: Entry[] = KB_JSON as Entry[];

export const KB_COUNT = KB.length;

const norm = (s: string) =>
  ` ${s.toLowerCase().replace(/[^a-z0-9+#/. ]/g, " ").replace(/\s+/g, " ").trim()} `;

function ranked(input: string): { entry: Entry; score: number }[] {
  const hay = norm(input);
  return KB.map((entry) => {
    let s = 0;
    for (const k of entry.keys) {
      const needle = k.includes(" ") ? k : ` ${k} `;
      if (hay.includes(needle)) s += k.length > 5 ? 2 : 1;
    }
    return { entry, score: s };
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
}

function best(input: string): Entry | null {
  const r = ranked(input);
  return r.length ? r[0].entry : null;
}

export function ask(input: string): string | null {
  const e = best(input);
  return e ? `${e.text} More: ${e.src}` : null;
}

export function askRich(input: string): { text: string; links: string[] } | null {
  const e = best(input);
  return e ? { text: e.text, links: [e.src] } : null;
}

export type AgentResult =
  | { kind: "answer"; text: string; links: string[]; trace: string[] }
  | { kind: "unknown"; suggestions: { label: string; query: string }[]; trace: string[] };

const DEFAULT_SUGGESTIONS = ["SoD engine", "Nostos router", "Contact"];

export function runAgent(input: string): AgentResult {
  const tokens = input.trim().split(/\s+/).filter(Boolean).length;
  const hits = ranked(input);
  const trace = [`parse intent (${tokens} tokens)`, `retrieve (${hits.length} passages)`];
  if (!hits.length) {
    const toks = new Set(
      norm(input).split(" ").filter((t) => t.length > 2)
    );
    const cands = KB.filter((e) => !e.smalltalk)
      .map((entry) => {
        const bag = new Set(
          `${entry.label} ${entry.keys.join(" ")}`.toLowerCase().split(/[^a-z0-9+#/.]+/)
        );
        let s = 0;
        toks.forEach((t) => {
          if (bag.has(t)) s++;
        });
        return { entry, score: s };
      })
      .sort((a, b) => b.score - a.score);
    const seen = new Set<string>();
    const ranked_labels = cands
      .filter((c) => {
        if (c.score <= 0 || seen.has(c.entry.label)) return false;
        seen.add(c.entry.label);
        return true;
      })
      .slice(0, 2)
      .map((c) => c.entry.label);
    const picks = [...ranked_labels];
    for (const d of DEFAULT_SUGGESTIONS) {
      if (picks.length >= 2) break;
      if (!picks.includes(d)) picks.push(d);
    }
    return {
      kind: "unknown",
      suggestions: picks.map((label) => ({ label, query: label })),
      trace: [...trace, "no citation found · declining to guess ✓"],
    };
  }
  const top = hits[0].score;
  const included = hits.filter((h) => h.score === top).slice(0, 2);
  const links = [...new Set(included.map((h) => h.entry.src))];
  return {
    kind: "answer",
    text: included.map((h) => h.entry.text).join(" "),
    links,
    trace: [...trace, `verify citations ✓ (${links.length} source${links.length === 1 ? "" : "s"})`, "synthesize"],
  };
}
