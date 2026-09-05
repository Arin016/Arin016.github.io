"use client";
import { useEffect, useState } from "react";
import Reveal from "./Reveal";

type Item = { text: string; href: string; when: string };

const FALLBACK: Item[] = [
  {
    text: "shipped s3-outputstream. Cloud uploads in fixed 5 MB of memory.",
    href: "https://github.com/Arin016/s3-outputstream",
    when: "pinned",
  },
  {
    text: "launched Nostos. Cache-aware LLM routing with a live arena.",
    href: "https://github.com/Arin016/kv-router",
    when: "pinned",
  },
  {
    text: "published context-lattice. Verifiable agent memory over MCP.",
    href: "https://github.com/Arin016/context-lattice",
    when: "pinned",
  },
  {
    text: "building ArinLM. A language model by hand, no shortcuts.",
    href: "https://github.com/Arin016/aLM",
    when: "pinned",
  },
];

function ago(iso: string): string {
  const s = Math.max(1, (Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  const d = Math.floor(s / 86400);
  return d === 1 ? "1d ago" : `${d}d ago`;
}

export default function Activity() {
  const [items, setItems] = useState<Item[] | null>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let dead = false;
    fetch("https://api.github.com/users/Arin016/events/public?per_page=20")
      .then((r) => {
        if (!r.ok) throw new Error("gh");
        return r.json();
      })
      .then((evts: Array<{ type: string; repo?: { name: string }; payload?: Record<string, unknown>; created_at: string }>) => {
        const out: Item[] = [];
        for (const e of evts) {
          const full = e.repo?.name ?? "";
          const short = full.replace("Arin016/", "") || full;
          const href = `https://github.com/${full}`;
          const when = ago(e.created_at);
          const size = (e.payload?.["size"] as number) ?? 1;
          if (e.type === "PushEvent")
            out.push({ text: `pushed ${size} commit${size === 1 ? "" : "s"} → ${short}`, href, when });
          else if (e.type === "CreateEvent" && e.payload?.["ref_type"] === "repository")
            out.push({ text: `started ${short}`, href, when });
          else if (e.type === "PullRequestEvent")
            out.push({ text: `${String(e.payload?.["action"])} a pull request in ${short}`, href, when });
          else if (e.type === "IssuesEvent")
            out.push({ text: `${String(e.payload?.["action"])} an issue in ${short}`, href, when });
          else if (e.type === "ForkEvent") out.push({ text: `forked ${short}`, href, when });
          else if (e.type === "WatchEvent") out.push({ text: `starred ${short}`, href, when });
          if (out.length >= 6) break;
        }
        if (!dead) {
          if (out.length > 0) {
            setItems(out);
            setLive(true);
          } else setItems(FALLBACK);
        }
      })
      .catch(() => {
        if (!dead) setItems(FALLBACK);
      });
    return () => {
      dead = true;
    };
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Reveal>
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <div className="font-mono text-[12px] text-green-300">
              <span className="text-zinc-600">$</span> tail -f ~/github
            </div>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Live from GitHub
            </h2>
          </div>
          <a
            href="https://github.com/Arin016"
            target="_blank"
            className="flex items-center gap-2 font-mono text-xs text-zinc-500 hover:text-green-300"
          >
            {live && (
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-green-400" />
              </span>
            )}
            {live ? "streaming" : "highlights"} →
          </a>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="overflow-hidden rounded-lg border border-white/10 bg-panel/80 font-mono text-[13px]">
          {items === null
            ? [0, 1, 2].map((i) => (
                <div key={i} className="border-b border-white/5 p-4 last:border-0">
                  <div className="h-3.5 w-2/3 animate-pulse rounded bg-white/10" />
                </div>
              ))
            : items.map((it, i) => (
                <a
                  key={`${it.href}-${i}`}
                  href={it.href}
                  target="_blank"
                  className={`flex items-center justify-between gap-4 p-4 transition hover:bg-green-400/[0.04] ${i > 0 ? "border-t border-white/5" : ""}`}
                >
                  <span className="truncate text-zinc-300">
                    <span className="mr-2 text-green-300">❯</span>
                    {it.text}
                  </span>
                  <span className="shrink-0 text-[11px] text-zinc-600">{it.when}</span>
                </a>
              ))}
        </div>
      </Reveal>
    </section>
  );
}
