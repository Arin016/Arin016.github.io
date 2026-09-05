"use client";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { ask } from "@/lib/ask";

type Tone = "cmd" | "out" | "dim";
type Line = { text: string; tone: Tone };

const BOOT: Line[] = [
  { text: "$ whoami", tone: "cmd" },
  { text: "arin.mallanna — software engineer @ saviynt", tone: "out" },
  { text: "$ cat focus.txt", tone: "cmd" },
  { text: "backends that stream · agents that cite evidence", tone: "out" },
  { text: "$ cat interests.txt", tone: "cmd" },
  { text: "consistency · storage · transformers · inference", tone: "out" },
];

const DIRS: Record<string, string> = {
  production: "/projects",
  "ai-systems": "/projects",
  "open-source": "/projects",
  notes: "/blog",
};

const QUESTIONS: Line[] = [
  { text: "01 — consistency, now with running code", tone: "out" },
  { text: "02 — storage engines I've only consumed", tone: "out" },
  { text: "03 — verification instead of vigilance", tone: "out" },
  { text: "04 — serving intelligence cheaply", tone: "out" },
  { text: "full text: homepage § open questions", tone: "dim" },
];

const norm = (s: string) =>
  s.replace(/^~\//, "").replace(/\/$/, "").toLowerCase();

const PAGES: Record<string, string> = {
  home: "/",
  about: "/about",
  projects: "/projects",
  work: "/projects",
  production: "/projects",
  ai: "/projects",
  blog: "/blog",
  notes: "/blog",
  writing: "/blog",
  questions: "/#questions",
  contact: "/#contact",
  dsa: "/dsa",
  resume: "/resume.pdf",
  ask: "/ask",
};

const HINTS = [
  "type 'help'",
  "try 'open blog'",
  "try 'stats'",
  "try 'sudo hire arin'",
  "try 'email'",
  "try 'open dsa'",
  "open ask — full agent",
  "ask me anything",
];

function reply(input: string): { lines: Line[]; clear?: boolean; go?: string } {
  const [cmd, ...rest] = input.trim().split(/\s+/);
  const arg = rest.join(" ");
  switch ((cmd || "").toLowerCase()) {
    case "":
      return { lines: [] };
    case "help":
      return {
        lines: [
          {
            text: "whoami · ls · cd <dir> · cat <file> · open <page> · ask <anything> · email · clear",
            tone: "out",
          },
        ],
      };
    case "whoami":
      return {
        lines: [
          {
            text: "Arin Mallanna Tumbagi — Software Engineer, Saviynt · B.Tech, IIT Madras",
            tone: "out",
          },
        ],
      };
    case "focus":
      return {
        lines: [
          {
            text: "backend systems with flat memory · agents with checked evidence",
            tone: "out",
          },
        ],
      };
    case "interests":
      return {
        lines: [
          {
            text: "consensus · storage engines · transformers · inference systems",
            tone: "out",
          },
        ],
      };
    case "stats":
      return {
        lines: [
          {
            text: "21h→3min audit (2s compute) · unbounded rows @ 7MB · live license inference · ~22ms agent check",
            tone: "out",
          },
        ],
      };
    case "ls":
      return {
        lines: [
          {
            text: "production/  ai-systems/  open-source/  notes/  open_questions.txt",
            tone: "out",
          },
        ],
      };
    case "open": {
      const dest = PAGES[arg.toLowerCase()];
      if (!dest)
        return {
          lines: [
            { text: "open what? try: open blog", tone: "dim" },
          ],
        };
      return { lines: [{ text: `→ ${dest}`, tone: "dim" }], go: dest };
    }
    case "email":
      return {
        lines: [
          { text: "arin16tumbagi@gmail.com. Fastest way to reach me.", tone: "out" },
        ],
      };
    case "ask": {
      if (!arg)
        return { lines: [{ text: "usage: ask <question>. e.g. ask what is SoD", tone: "dim" }] };
      const a = ask(arg);
      return {
        lines: a
          ? [{ text: a, tone: "out" }]
          : [
              {
                text: "I don't have that. Try 'help', or email me: arin16tumbagi@gmail.com",
                tone: "dim",
              },
            ],
      };
    }
    case "resume":
      return {
        lines: [
          { text: "resume.pdf, one page. Open it with: open resume", tone: "out" },
        ],
      };
    case "clear":
      return { lines: [], clear: true };
    case "echo":
      return { lines: [{ text: arg, tone: "out" }] };
    case "sudo":
      return {
        lines: [
          {
            text: "permission denied: this shell is read-only. email works better.",
            tone: "dim",
          },
        ],
      };
    default: {
      const a = ask(input);
      if (a)
        return {
          lines: [
            { text: a, tone: "out" },
            { text: "tip: 'ask <question>' works too. e.g. ask what is SoD", tone: "dim" },
          ],
        };
      return {
        lines: [{ text: `command not found: ${cmd}. Try 'help'.`, tone: "dim" }],
      };
    }
  }
}

export default function Terminal() {
  const router = useRouter();
  const [greet] = useState(() => {
    try {
      const h = parseInt(
        new Intl.DateTimeFormat("en-US", { hour: "numeric", hour12: false }).format(
          new Date()
        ),
        10
      );
      const word = h < 12 ? "morning" : h < 17 ? "afternoon" : "evening";
      const ist = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Kolkata",
      }).format(new Date());
      return `good ${word}, guest \u2014 my time ${ist} IST`;
    } catch {
      return "hello, guest";
    }
  });
  const [lines, setLines] = useState<Line[]>([
    { text: `// ${greet}`, tone: "dim" },
    ...BOOT,
  ]);
  const [value, setValue] = useState("");
  const [cwd, setCwd] = useState("~");
  const [hi, setHi] = useState(0);
  const frameRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const id = setInterval(() => setHi((h) => (h + 1) % HINTS.length), 2600);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = boxRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = frameRef.current;
    if (!el) return;
    if (
      window.matchMedia("(hover: none), (prefers-reduced-motion: reduce)").matches
    )
      return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
    el.style.transform = `perspective(900px) rotateX(${((0.5 - py) * 5).toFixed(2)}deg) rotateY(${((px - 0.5) * 6).toFixed(2)}deg)`;
  };
  const onLeave = () => {
    const el = frameRef.current;
    if (el) el.style.transform = "perspective(900px)";
  };

  const push = (ls: Line[]) =>
    setLines((prev) => [...prev, ...ls].slice(-60));

  const goDir = (dir: string) => {
    const dest = DIRS[dir];
    setCwd(`~/${dir}`);
    push([{ text: `→ ${dest}`, tone: "dim" }]);
    setTimeout(() => router.push(dest), 350);
  };

  const run = (raw: string) => {
    const echo: Line = { text: `$ ${raw}`, tone: "cmd" };
    const parts = raw.trim().split(/\s+/).filter(Boolean);
    const cmd = (parts[0] || "").toLowerCase();
    const rest = parts.slice(1).join(" ");

    if (cmd === "cd") {
      const t = norm(rest);
      if (!t || t === "~" || t === "/" || t === "..") {
        push([echo]);
        setCwd("~");
        setTimeout(() => router.push("/"), 350);
        return;
      }
      if (t in DIRS) {
        push([echo]);
        goDir(t);
        return;
      }
      if (t === "open_questions.txt") {
        push([echo, { text: "not a directory. Try `cat open_questions.txt`", tone: "dim" }]);
        return;
      }
      push([echo, { text: `no such directory: ${rest}. Try \`ls\`.`, tone: "dim" }]);
      return;
    }

    if (cmd === "pwd") {
      push([echo, { text: cwd === "~" ? "/home/guest" : `/home/guest/${cwd.slice(2)}`, tone: "out" }]);
      return;
    }

    if (cmd === "cat") {
      const t = norm(rest);
      if (!t) {
        push([echo, { text: "usage: cat <file>", tone: "dim" }]);
        return;
      }
      if (t === "open_questions.txt") {
        push([echo, ...QUESTIONS]);
        return;
      }
      if (t in DIRS) {
        push([echo, { text: `${t}: is a directory. Try \`cd ${t}\`.`, tone: "dim" }]);
        return;
      }
      push([echo, { text: `no such file: ${rest}`, tone: "dim" }]);
      return;
    }

    if (parts.length === 1) {
      const t = norm(cmd);
      if (t === "~") {
        push([echo]);
        setCwd("~");
        setTimeout(() => router.push("/"), 350);
        return;
      }
      if (t in DIRS) {
        push([echo]);
        goDir(t);
        return;
      }
      if (t === "open_questions.txt") {
        push([echo, ...QUESTIONS]);
        return;
      }
    }

    const r = reply(raw);
    if (r.clear) {
      setLines([]);
    } else {
      push([echo, ...r.lines]);
    }
    if (r.go) setTimeout(() => router.push(r.go as string), 350);
  };

  return (
    <div
      ref={frameRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="term-frame overflow-hidden rounded-xl border border-white/10 bg-[#070907]/95 shadow-[0_0_90px_-30px_rgba(74,222,128,0.5)]"
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
        <span className="size-2.5 rounded-full bg-zinc-700" />
        <span className="size-2.5 rounded-full bg-zinc-700" />
        <span className="size-2.5 rounded-full bg-zinc-700" />
              <span className="ml-3 font-mono text-xs text-zinc-500">
                guest@arin:~
              </span>
        <span className="ml-auto rounded border border-green-400/30 bg-green-400/10 px-2 py-0.5 font-mono text-[10px] text-green-200">
          LIVE
        </span>
      </div>

      <div
        ref={boxRef}
        onClick={() => inputRef.current?.focus()}
        className="h-64 cursor-text space-y-2 overflow-y-auto p-5 font-mono text-[12.5px] leading-relaxed"
      >
        {lines.map((l, i) => (
          <div
            key={i}
            className={
              l.tone === "cmd"
                ? "text-green-200"
                : l.tone === "out"
                  ? "text-zinc-300"
                  : "text-zinc-600"
            }
          >
            {l.text}
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span className="shrink-0 text-zinc-600">{cwd}</span>
          <span className="shrink-0 text-green-300">❯</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                run(value);
                setValue("");
              }
            }}
            placeholder={HINTS[hi]}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="terminal input"
            className="w-full bg-transparent text-green-100 caret-green-400 outline-none placeholder:text-zinc-700"
          />
        </div>
      </div>

      <div className="space-y-2.5 border-t border-white/10 p-4 font-mono text-[12px]">
        <div className="grid gap-2.5 sm:grid-cols-2">
          <div className="rounded-lg border border-green-400/20 bg-green-400/[0.06] p-3">
            <span className="text-green-200">sod_eval:</span>{" "}
            <span className="text-zinc-400">2s compute · ~3 min w/ writes → </span>
            <span className="font-bold text-white">was 21h</span>
          </div>
          <div className="rounded-lg border border-green-400/20 bg-green-400/[0.06] p-3">
            <span className="text-green-200">fraud_agent:</span>{" "}
            <span className="text-zinc-400">0 unverified claims · </span>
            <span className="font-bold text-white">below 0.70 → human</span>
          </div>
        </div>
      </div>
    </div>
  );
}
