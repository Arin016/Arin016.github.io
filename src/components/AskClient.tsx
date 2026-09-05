"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { runAgent, KB_COUNT } from "@/lib/ask";
import ArinBanner from "@/components/ArinBanner";

type Line =
  | { kind: "cmd"; text: string }
  | { kind: "out"; text: string }
  | { kind: "tool"; text: string }
  | { kind: "dim"; text: string }
  | { kind: "links"; links: string[] }
  | { kind: "suggest"; items: { label: string; query: string }[] };

const BOOT: Line[] = [
  { kind: "cmd", text: "$ ask-arin --interactive" },
  { kind: "dim", text: `loading knowledge base … ${KB_COUNT} topics indexed` },
  { kind: "dim", text: "tools: parse · retrieve · verify · synthesize" },
  { kind: "dim", text: "it cites its page, or says it doesn't know." },
  { kind: "dim", text: "ready." },
];

const SUGGESTIONS = [
  "What is SoD?",
  "What did you build at Saviynt?",
  "What is Nostos?",
  "How do I contact you?",
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function AskClient() {
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const [booted, setBooted] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const running = useRef(0);
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    let dead = false;
    (async () => {
      for (const l of BOOT) {
        if (dead) return;
        if (!reduce) await sleep(300);
        if (dead) return;
        setLines((prev) => [...prev, l]);
      }
      setBooted(true);
    })();
    return () => {
      dead = true;
    };
  }, [reduce]);

  useEffect(() => {
    const el = boxRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const push = (ls: Line[]) =>
    setLines((prev) => [...prev, ...ls].slice(-120));

  const submit = async (raw: string) => {
    const q = raw.trim();
    if (!q || busy) return;
    const id = ++running.current;
    setBusy(true);
    setValue("");
    push([{ kind: "cmd", text: `$ ${q}` }]);
    const res = runAgent(q);
    for (const s of res.trace) {
      if (running.current !== id) return;
      if (!reduce) await sleep(380);
      if (running.current !== id) return;
      push([{ kind: "tool", text: `⏺ ${s}` }]);
    }
    if (running.current !== id) return;
    if (res.kind === "answer")
      push([
        { kind: "out", text: res.text },
        { kind: "links", links: res.links },
      ]);
    else
      push([
        {
          kind: "dim",
          text: "No citation for that, so no answer. Closest matches:",
        },
        { kind: "suggest", items: res.suggestions },
      ]);
    setBusy(false);
  };

  return (
    <div>
      <ArinBanner />
      <div
        ref={boxRef}
        onClick={() => inputRef.current?.focus()}
        className="h-[52vh] cursor-text space-y-2.5 overflow-y-auto p-5 font-mono text-[13px] leading-relaxed sm:h-[56vh]"
      >
        {lines.map((l, i) => {
          if (l.kind === "cmd") return <div key={i} className="text-green-200">{l.text}</div>;
          if (l.kind === "tool") return <div key={i} className="text-zinc-500">{l.text}</div>;
          if (l.kind === "dim") return <div key={i} className="text-zinc-600">{l.text}</div>;
          if (l.kind === "links")
            return (
              <div key={i} className="flex flex-wrap gap-2">
                {l.links.map((h) => (
                  <Link
                    key={h}
                    href={h}
                    className="rounded-md border border-green-400/30 bg-green-400/10 px-2.5 py-1 text-[12px] text-green-200 hover:bg-green-400/20"
                  >
                    open {h} →
                  </Link>
                ))}
              </div>
            );
          if (l.kind === "suggest")
            return (
              <div key={i} className="flex flex-wrap gap-2">
                {l.items.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => submit(s.query)}
                    className="rounded-md border border-green-400/30 bg-green-400/10 px-2.5 py-1 text-[12px] text-green-200 hover:bg-green-400/20"
                  >
                    {s.label} →
                  </button>
                ))}
              </div>
            );
          return (
            <div key={i} className="max-w-3xl text-zinc-200">
              {l.text}
            </div>
          );
        })}
        <div className="flex items-center gap-2">
          <span className="shrink-0 text-green-300">❯</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit(value);
            }}
            placeholder={booted ? "ask anything…" : "booting…"}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="ask a question"
            className="w-full bg-transparent text-green-100 caret-green-400 outline-none placeholder:text-zinc-700"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 border-t border-white/10 p-4">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => submit(s)}
            className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[12px] text-zinc-400 transition hover:border-green-400/40 hover:text-green-200"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
