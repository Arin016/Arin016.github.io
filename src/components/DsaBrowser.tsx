"use client";
import { useMemo, useState } from "react";
import type { DsaTopic } from "@/lib/dsa";

export default function DsaBrowser({
  topics,
  total,
}: {
  topics: DsaTopic[];
  total: number;
}) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return topics;
    return topics
      .map((t) => ({
        ...t,
        files: t.files.filter(
          (f) =>
            f.name.toLowerCase().includes(needle) ||
            t.topic.toLowerCase().includes(needle)
        ),
      }))
      .filter((t) => t.files.length > 0);
  }, [q, topics]);
  const shown = filtered.reduce((a, t) => a + t.files.length, 0);

  return (
    <div>
      <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-4 py-3 font-mono text-sm focus-within:border-green-400/50">
        <span className="shrink-0 text-green-300">❯</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={`search ${total} files. try 'dijkstra', 'knapsack', 'segment'…`}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label="search the archive"
          className="w-full bg-transparent text-zinc-100 caret-green-400 outline-none placeholder:text-zinc-700"
        />
        {q && (
          <button
            onClick={() => setQ("")}
            className="shrink-0 text-zinc-600 hover:text-zinc-300"
            aria-label="clear search"
          >
            ✕
          </button>
        )}
      </div>
      <div className="mt-2 font-mono text-[11px] text-zinc-600">
        {shown} of {total} files{q ? ` matching “${q}”` : ""}
      </div>
      <div className="mt-4 space-y-2">
        {filtered.map((t) => (
          <details
            key={t.topic}
            open={q.trim().length > 0}
            className="group rounded-lg border border-white/10 bg-white/[0.02] open:border-green-400/25"
          >
            <summary className="cursor-pointer list-none p-4 font-mono text-[13px] text-zinc-200 transition hover:text-white [&::-webkit-details-marker]:hidden">
              <span className="mr-2 text-green-300">
                <span className="hidden group-open:inline">▾</span>
                <span className="group-open:hidden">▸</span>
              </span>
              {t.topic}
              <span className="ml-2 text-[11px] text-zinc-600">
                {t.files.length}
              </span>
            </summary>
            <div className="grid gap-1 px-4 pb-4 sm:grid-cols-2">
              {t.files.map((f) => (
                <a
                  key={f.url}
                  href={f.url}
                  target="_blank"
                  className="truncate rounded px-2 py-1.5 font-mono text-[12px] text-zinc-400 transition hover:bg-green-400/10 hover:text-green-200"
                >
                  {f.name}
                </a>
              ))}
            </div>
          </details>
        ))}
        {filtered.length === 0 && (
          <div className="rounded-lg border border-white/10 p-6 font-mono text-[13px] text-zinc-500">
            nothing matches “{q}”. Try a topic like ‘graphs’, ‘dp’, or ‘tree’.
          </div>
        )}
      </div>
    </div>
  );
}
