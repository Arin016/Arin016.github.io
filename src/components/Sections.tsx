"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import Window from "@/components/Window";
import Reveal, { SpotGrid } from "@/components/Reveal";
import { OSS_LIST, POSTS, WORK, AI_WORK, UPSTREAM } from "@/data/content";

export function SectionHead({
  cmd,
  title,
  right,
  lede,
}: {
  cmd: string;
  title: string;
  right?: React.ReactNode;
  lede?: string;
}) {
  return (
    <Reveal>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="font-mono text-[12px] text-green-300">
            <span className="text-zinc-500">$</span> {cmd}
          </div>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
            {title}
          </h2>
          {lede && (
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-zinc-400">
              {lede}
            </p>
          )}
        </div>
        {right}
      </div>
    </Reveal>
  );
}

const FEATURED_WORK = ["license-intel", "sod-engine", "agent-sod", "export-pipe"];

export function Work() {
  const featured = WORK.filter((w) => FEATURED_WORK.includes(w.id));
  return (
    <section className="hairline-t">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHead
          cmd="ls ./production"
          title="Production systems"
          lede="Internal systems at Saviynt, shown through numbers and write-ups. Personal work links out to code."
          right={
            <Link
              href="/projects"
              className="font-mono text-xs text-green-300 hover:underline"
            >
              all seven →
            </Link>
          }
        />
        <SpotGrid className="grid gap-4 md:grid-cols-2">
          {featured.map((w, i) => (
            <Reveal key={w.id} delay={i * 0.05}>
              <article
                className={`group relative h-full overflow-hidden rounded-xl border border-white/10 bg-panel/80 p-7 transition hover:-translate-y-1 hover:border-green-400/30 ${
                  i === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-[11px] tracking-[0.16em] text-zinc-500">
                    {String(i + 1).padStart(2, "0")} · {w.tag}
                  </span>
                  <span className="rounded bg-green-400/10 px-2.5 py-1 font-mono text-[11px] font-bold text-green-200">
                    {w.metric}
                  </span>
                </div>
                <h3 className={`mt-5 font-display font-bold tracking-tight text-white ${i === 0 ? "text-3xl" : "text-xl"}`}>
                  {w.title}
                </h3>
                <p className={`mt-2 leading-relaxed text-zinc-300 ${i === 0 ? "max-w-2xl text-[15px]" : "text-sm"}`}>
                  {w.blurb}
                </p>
                <details className="group mt-4">
                  <summary className="cursor-pointer list-none font-mono text-[11px] text-zinc-500 transition hover:text-green-300 [&::-webkit-details-marker]:hidden">
                    + how it works
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {w.body}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {w.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded bg-white/5 px-2 py-1 font-mono text-[11px] text-zinc-400"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </details>
              </article>
            </Reveal>
          ))}
        </SpotGrid>
      </div>
    </section>
  );
}

export function AIWork() {
  return (
    <section className="hairline-t">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHead
          cmd="ls ./ai-systems"
          title="AI systems"
          lede="The same discipline applied to models and inference: budgets, bounds, and evidence."
          right={
            <Link
              href="/blog"
              className="font-mono text-xs text-zinc-500 hover:text-green-300"
            >
              write-ups →
            </Link>
          }
        />
        <SpotGrid className="grid gap-4 md:grid-cols-3">
          {AI_WORK.map((w, i) => (
            <Reveal key={w.id} delay={i * 0.05}>
              <article className="h-full rounded-xl border border-white/10 bg-panel/80 p-7 transition hover:-translate-y-1 hover:border-green-400/30">
                <span className="font-mono text-[11px] tracking-[0.16em] text-zinc-500">
                  {w.tag}
                </span>
                <h3 className="mt-4 text-xl font-bold text-white">{w.title}</h3>
                <div className="mt-1.5 font-mono text-xs text-green-300">
                  {w.metric}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                  {w.blurb}
                </p>
                <details className="group mt-4">
                  <summary className="cursor-pointer list-none font-mono text-[11px] text-zinc-500 transition hover:text-green-300 [&::-webkit-details-marker]:hidden">
                    + how it works
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {w.body}
                  </p>
                </details>
              </article>
            </Reveal>
          ))}
        </SpotGrid>
      </div>
    </section>
  );
}

export function AskEmbed({ children }: { children: React.ReactNode }) {
  return (
    <section className="hairline-t">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHead
          cmd="ask anything"
          title="Ask the site"
          lede="Semantic search over everything here, judged by calibrated AI. It cites its page — or tells you it doesn't know."
          right={
            <Link
              href="/ask"
              className="font-mono text-xs text-zinc-500 hover:text-green-300"
            >
              full terminal →
            </Link>
          }
        />
        <Reveal>
          <Window title="guest@arin: ~/ask" badge="LIVE" glow>
            {children}
          </Window>
        </Reveal>
      </div>
    </section>
  );
}

export function OpenQuestions() {
  const qs = [
    {
      q: "consistency, now with running code",
      body: "My ingestion pipeline behaves exactly once in practice. Idempotent storage, ordered partitions, careful retries. Since writing this I implemented Raft in C++ — election, replication, a KV machine, chaos-tested across seeds. Remaining: membership changes, snapshots, and deriving my own pipeline's guarantees from first principles rather than the next incident.",
    },
    {
      q: "storage engines I've only consumed",
      body: "I sit on top of OpenSearch and MySQL every day and tune around their behavior. Page sizes, merge pressure, compaction stalls. I've never built the LSM-tree or B-tree underneath, and I want to understand the layer I currently treat as weather.",
    },
    {
      q: "verification instead of vigilance",
      body: "Right now correctness at scale means parallel runs, automated diffs, and dashboards I check compulsively. It works, but it's vigilance, not proof. I want the formal-methods background to specify what a pipeline guarantees and verify it holds, before production finds out.",
    },
    {
      q: "serving intelligence cheaply",
      body: "My router treats cached conversation as a resource worth scheduling around. But batching, eviction, and heterogeneous hardware underneath are subjects I've only read about. Serving is where AI systems meet operating systems, and I want the scheduling and architecture theory beneath the API I've already built on.",
    },
  ];
  return (
    <section className="hairline-t">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHead
          cmd="cat open_questions.txt"
          title="What I'm trying to learn next"
          lede="Four open threads, each anchored to production experience. Updated when one closes."
        />
        <div className="grid gap-x-12 gap-y-2 md:grid-cols-2">
          {qs.map((it, i) => (
            <Reveal key={it.q} delay={i * 0.05}>
              <div className="group border-t border-white/10 py-7">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[12px] text-green-300">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-lg font-bold text-white">
                    {it.q}
                  </h3>
                </div>
                <p className="mt-3 pl-9 text-[14px] leading-relaxed text-zinc-400">
                  {it.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Upstream() {
  // Chips celebrate permanent states only (shipped, merged) — open
  // contributions stay unlabeled so the band never goes stale.
  const rows = [
    {
      href: "https://github.com/Arin016/s3-outputstream",
      name: "s3-outputstream",
      note: "the S3 streaming primitive the AWS toolkit never shipped",
      chip: "shipped",
      hot: true,
    },
    ...UPSTREAM.map((pr) => ({
      href: pr.url,
      name: pr.repo,
      note: "",
      chip: pr.state === "merged" ? "● merged" : "contribution",
      hot: pr.state === "merged",
    })),
  ];
  return (
    <div className="mb-6 overflow-hidden rounded-xl border border-white/10 bg-panel/80 font-mono">
      <div className="border-b border-white/10 bg-white/[0.02] px-5 py-3 text-[11px] text-zinc-500">
        <span className="text-green-300">$</span> beyond my own repos
      </div>
      {rows.map((r, i) => (
        <a
          key={r.name}
          href={r.href}
          target="_blank"
          className={`group flex items-center justify-between gap-4 p-4 text-[13px] transition hover:bg-green-400/[0.04] ${
            i > 0 ? "border-t border-white/5" : ""
          }`}
        >
          <span className="truncate text-zinc-300">
            <span className="mr-2 text-green-300">❯</span>
            {r.name}
            {r.note && <span className="text-zinc-500"> — {r.note}</span>}
          </span>
          <span
            className={`shrink-0 rounded px-2 py-0.5 text-[10.5px] font-bold ${
              r.hot
                ? "bg-green-400/15 text-green-200"
                : "border border-white/20 text-zinc-400"
            }`}
          >
            {r.chip}
          </span>
        </a>
      ))}
    </div>
  );
}

export function OSS() {
  return (
    <section className="hairline-t">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHead
          cmd="ls ./open-source"
          title="Open source"
          right={
            <a
              href="https://github.com/Arin016"
              target="_blank"
              className="inline-flex items-center gap-1 font-mono text-xs text-zinc-500 hover:text-green-300"
            >
              <GithubIcon size={14} /> all repos <ArrowUpRight size={13} />
            </a>
          }
        />
        <Upstream />
        <SpotGrid className="grid gap-4 md:grid-cols-3">
          {OSS_LIST.slice(0, 6).map((o) => (
            <a
              key={o.name}
              href={o.url}
              target="_blank"
              className="group rounded-xl border border-white/10 bg-white/[0.02] p-6 transition hover:-translate-y-1 hover:border-green-400/30 hover:bg-green-400/[0.04]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-white group-hover:text-green-200">
                  {o.name}
                </span>
                <ArrowUpRight
                  size={15}
                  className="text-zinc-500 group-hover:text-green-300"
                />
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">
                {o.desc}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="rounded bg-white/5 px-2 py-0.5 font-mono text-[11px] text-zinc-500">
                  {o.lang}
                </span>
                <span className="font-mono text-[10.5px] text-green-300/80">
                  {o.highlight}
                </span>
              </div>
            </a>
          ))}
        </SpotGrid>
      </div>
    </section>
  );
}

export function BlogPreview() {
  return (
    <section className="hairline-t">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHead
          cmd="tail -f ./notes"
          title="Notes from production"
          right={
            <Link
              href="/blog"
              className="font-mono text-xs text-zinc-500 hover:text-green-300"
            >
              all posts →
            </Link>
          }
        />
        <div className="grid gap-x-8 md:grid-cols-3">
          {[...POSTS]
            .sort((a, b) => (a.date < b.date ? 1 : -1))
            .slice(0, 3)
            .map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group block border-t border-white/10 py-7"
                >
                  <div className="flex items-center gap-2 font-mono text-[10px]">
                    <span className="text-green-300">{p.tag}</span>
                    <span className="text-zinc-500">
                      {p.date} · {p.minutes} min
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold leading-snug text-white transition group-hover:text-green-200">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-zinc-400">
                    {p.excerpt}
                  </p>
                  <div className="mt-4 font-mono text-xs text-green-300 opacity-0 transition group-hover:opacity-100">
                    read_post →
                  </div>
                </Link>
              </Reveal>
            ))}
        </div>
      </div>
    </section>
  );
}

export function Path() {
  const items = [
    {
      t: "SWE @ Saviynt",
      d: "Jun 2025 → now · identity governance",
      c: "Own export pipeline, SoD engines, audit ingestion, agent safety. 2× Tiger Team.",
    },
    {
      t: "B.Tech Ocean Eng, IIT Madras",
      d: "2021 → 2025 · JEE top 0.2% of 1.1M",
      c: "Math, modeling, physics. Plus Team Abhiyaan (2023 pitches to India's Finance and Commerce Ministers) and IITM football.",
    },
    {
      t: "Competitive programming",
      d: "4 years · Guardian (peak 2077) · Expert 1602 · Meta Hacker Cup R2",
      c: "My department offered no CS courses, so I trained against students who had them, and stayed until my rankings matched theirs.",
    },
    {
      t: "ML from first principles",
      d: "ongoing · in public",
      c: "A language model by hand, then in dependency-free C++, then in raw GPU code. Detection models, heuristic search, evolutionary optimization. I learn a system by rebuilding it.",
    },
  ];
  return (
    <section className="hairline-t">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHead cmd="git log --oneline" title="How I got here" />
        <div className="grid gap-x-8 md:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.05}>
              <div className="border-t border-white/10 pt-5">
                <div className="font-mono text-[11px] text-green-300">
                  0{i + 1}
                </div>
                <h3 className="mt-2 text-[15px] font-bold text-white">{it.t}</h3>
                <div className="mt-1 font-mono text-[11px] text-zinc-500">
                  {it.d}
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">
                  {it.c}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 font-mono text-[12px] text-zinc-500">
          the contest archive behind the ratings. Searchable:{" "}
          <Link href="/dsa" className="text-green-300 underline">
            ~/dsa →
          </Link>
        </p>
      </div>
    </section>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText("arin16tumbagi@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = "mailto:arin16tumbagi@gmail.com";
    }
  };
  return (
    <section className="hairline-t">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal>
          <div className="font-mono text-[12px] text-green-300">
            <span className="text-zinc-500">$</span> ./open_channel
          </div>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Building something where these systems matter?
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-zinc-400">
            Questions about this work, research conversations, or
            collaboration — email is the fastest way to reach me.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 font-mono text-sm">
            <button
              onClick={copy}
              className="rounded-md bg-green-400 px-6 py-3.5 font-bold text-black transition hover:bg-green-300"
            >
              {copied ? "copied ✓" : "arin16tumbagi@gmail.com"}
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              className="rounded-md border border-white/15 bg-white/[0.04] px-6 py-3.5 text-zinc-200 transition hover:border-green-400/40 hover:text-green-200"
            >
              resume.pdf ↓
            </a>
            <a
              href="https://github.com/Arin016"
              target="_blank"
              className="rounded-md border border-white/15 bg-white/[0.04] px-6 py-3.5 text-zinc-200 transition hover:border-green-400/40 hover:text-green-200"
            >
              github/Arin016
            </a>
            <a
              href="https://www.linkedin.com/in/arin-tumbagi-916407229/"
              target="_blank"
              className="rounded-md border border-white/15 bg-white/[0.04] px-6 py-3.5 text-zinc-200 transition hover:border-green-400/40 hover:text-green-200"
            >
              linkedin
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
