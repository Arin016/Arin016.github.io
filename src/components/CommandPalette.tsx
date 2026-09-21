"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { LINKS } from "@/data/content";

type Item = {
  id: string;
  label: string;
  hint: string;
  keywords: string;
  run: (router: ReturnType<typeof useRouter>) => void;
  external?: boolean;
};

const ITEMS: Item[] = [
  { id: "home", label: "~/home", hint: "landing page", keywords: "home start index", run: (r) => r.push("/") },
  { id: "about", label: "~/about", hint: "who I am", keywords: "about bio story iit ocean", run: (r) => r.push("/about") },
  { id: "projects", label: "~/projects", hint: "all systems", keywords: "projects work production audit", run: (r) => r.push("/projects") },
  { id: "blog", label: "~/blog", hint: "write-ups", keywords: "blog notes writing posts", run: (r) => r.push("/blog") },
  { id: "dsa", label: "~/dsa", hint: "contest archive", keywords: "dsa algorithms archive contests", run: (r) => r.push("/dsa") },
  { id: "ask", label: "~/ask", hint: "ask the site", keywords: "ask agent question search", run: (r) => r.push("/ask") },
  {
    id: "resume",
    label: "resume.pdf",
    hint: "open in new tab",
    keywords: "resume cv pdf",
    run: () => window.open("/resume.pdf", "_blank"),
    external: true,
  },
  {
    id: "report",
    label: "agent-sod-report.pdf",
    hint: "technical report",
    keywords: "report agent sod pdf",
    run: () => window.open("/agent-sod-report.pdf", "_blank"),
    external: true,
  },
  {
    id: "github",
    label: "GitHub — Arin016",
    hint: "opens in new tab",
    keywords: "github code repos",
    run: () => window.open(LINKS.github, "_blank"),
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    hint: "opens in new tab",
    keywords: "linkedin profile",
    run: () => window.open(LINKS.linkedin, "_blank"),
    external: true,
  },
  {
    id: "email",
    label: "arin16tumbagi@gmail.com",
    hint: "compose email",
    keywords: "email contact mail",
    run: () => window.open(LINKS.email, "_self"),
    external: true,
  },
  { id: "theme", label: "theme: toggle light / dark", hint: "appearance", keywords: "theme light dark mode appearance", run: () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("arin-theme", next ? "dark" : "light");
    } catch {
      /* private mode */
    }
  } },
];

function Icons({ external }: { external?: boolean }) {
  if (external === undefined) return null;
  return external ? (
    <span className="text-zinc-600">↗</span>
  ) : (
    <span className="text-zinc-600">↵</span>
  );
}

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQ("");
    setSel(0);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 20);
      document.documentElement.style.overflow = "";
      return () => clearTimeout(t);
    }
  }, [open]);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return ITEMS;
    return ITEMS.filter(
      (it) =>
        it.label.toLowerCase().includes(needle) ||
        it.hint.toLowerCase().includes(needle) ||
        it.keywords.includes(needle)
    );
  }, [q]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${sel}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [sel]);

  const pick = (it: Item) => {
    close();
    it.run(router);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="command palette"
    >
      <div
        className="win w-full max-w-lg overflow-hidden"
        style={{ animation: "pop-in 0.14s ease-out" }}
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <span className="font-mono text-sm text-green-300">❯</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setSel(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setSel((s) => Math.min(s + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSel((s) => Math.max(s - 1, 0));
              } else if (e.key === "Enter" && results[sel]) {
                e.preventDefault();
                pick(results[sel]);
              }
            }}
            placeholder="jump to… (page, post, repo)"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="search commands"
            className="w-full bg-transparent font-mono text-sm text-green-100 caret-green-400 outline-none placeholder:text-zinc-600"
          />
          <span className="kbd">esc</span>
        </div>
        <div ref={listRef} className="max-h-[46vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <div className="p-4 font-mono text-[13px] text-zinc-600">
              no match — try “about”, “resume”, “nostos”…
            </div>
          )}
          {results.map((it, i) => (
            <button
              key={it.id}
              data-idx={i}
              onMouseEnter={() => setSel(i)}
              onClick={() => pick(it)}
              className={`flex w-full items-center justify-between gap-3 rounded-md px-3 py-2.5 text-left font-mono text-[13px] transition ${
                i === sel
                  ? "bg-green-400/10 text-green-200"
                  : "text-zinc-300 hover:bg-white/5"
              }`}
            >
              <span className="flex min-w-0 items-center gap-2.5">
                {it.id === "github" || it.id === "linkedin" ? (
                  it.id === "github" ? (
                    <GithubIcon size={14} />
                  ) : (
                    <LinkedinIcon size={14} />
                  )
                ) : (
                  <span className="text-zinc-600">❯</span>
                )}
                <span className="truncate">{it.label}</span>
                <span className="hidden truncate text-[11px] text-zinc-600 sm:inline">
                  {it.hint}
                </span>
              </span>
              <Icons external={it.external} />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 border-t border-white/10 px-4 py-2.5 font-mono text-[10.5px] text-zinc-600">
          <span className="flex items-center gap-1">
            <span className="kbd">↑</span>
            <span className="kbd">↓</span> navigate
          </span>
          <span className="flex items-center gap-1">
            <span className="kbd">↵</span> open
          </span>
          <span className="ml-auto flex items-center gap-1">
            <span className="kbd">⌘</span>
            <span className="kbd">K</span> anywhere
          </span>
        </div>
      </div>
      <style>{`@keyframes pop-in { from { opacity: 0; transform: translateY(-6px) scale(0.98); } to { opacity: 1; transform: none; } }`}</style>
    </div>
  );
}
