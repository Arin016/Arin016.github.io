"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import Reveal, { SpotGrid } from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import { OSS_LIST, POSTS, STATS, WORK, AI_WORK, UPSTREAM } from "@/data/content";

export function SectionHead({
  cmd,
  title,
  right,
}: {
  cmd: string;
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <Reveal>
      <div className="mb-7 flex items-end justify-between gap-4">
      <div>
        <div className="font-mono text-[12px] text-green-300">
          <span className="text-zinc-600">$</span> {cmd}
        </div>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          {title}
        </h2>
      </div>
      {right}
      </div>
    </Reveal>
  );
}

export function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <SpotGrid className="grid grid-cols-2 gap-3 lg:grid-cols-6">
        {STATS.map((s) => (
          <div
            key={s.v}
            className="group rounded-lg border border-white/10 bg-white/[0.02] p-4 transition hover:border-green-400/30 hover:bg-green-400/[0.05]"
          >
            <div className="font-mono text-2xl font-extrabold text-green-300">
              <CountUp value={s.k} />
            </div>
            <div className="mt-1 text-[13px] font-bold text-white">{s.v}</div>
            <div className="mt-1 font-mono text-[10.5px] leading-snug text-zinc-500">
              {s.sub}
            </div>
          </div>
        ))}
      </SpotGrid>
    </section>
  );
}

const FEATURED_WORK = ["license-intel", "sod-engine", "agent-sod", "export-pipe"];

export function Work() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <SectionHead
        cmd="ls ./production"
        title="Production systems"
        right={
          <span className="flex gap-4 font-mono text-xs">
            <Link href="/projects" className="text-green-300 hover:underline">
              run the 2-minute audit →
            </Link>
            <Link
              href="/about"
              className="text-zinc-500 hover:text-green-300"
            >
              full story →
            </Link>
          </span>
        }
      />
      <SpotGrid className="grid gap-4 md:grid-cols-2">
        {WORK.filter((w) => FEATURED_WORK.includes(w.id)).map((w) => (
          <article
            key={w.id}
            className="group relative overflow-hidden rounded-lg border border-white/10 bg-panel/80 p-6 transition hover:border-green-400/30"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2">
                <span className="rounded border border-white/10 bg-white/5 px-2 py-1 font-mono text-[10px] tracking-widest text-zinc-400">
                  {w.tag}
                </span>
                <span className="font-mono text-[10px] text-zinc-600">
                  · internal system
                </span>
              </span>
              <span className="font-mono text-xs font-bold text-green-300">
                {w.metric}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-bold text-white">{w.title}</h3>
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
          </article>
        ))}
      </SpotGrid>
      <div className="mt-5 text-right font-mono text-xs text-zinc-500">
        <Link href="/projects" className="hover:text-green-300">
          all seven production systems →
        </Link>
      </div>
    </section>
  );
}

export function AIWork() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <SectionHead
        cmd="ls ./ai-systems"
        title="AI systems"
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
        {AI_WORK.map((w) => (
          <article
            key={w.id}
            className="rounded-lg border border-white/10 bg-panel/80 p-6 transition hover:border-green-400/30"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="rounded border border-white/10 bg-white/5 px-2 py-1 font-mono text-[10px] tracking-widest text-zinc-400">
                {w.tag}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-bold text-white">{w.title}</h3>
            <div className="mt-1 font-mono text-xs text-green-300">
              {w.metric}
            </div>
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
          </article>
        ))}
      </SpotGrid>
    </section>
  );
}

export function OpenQuestions() {
  const qs = [
    {
      q: "01 — consistency I haven't had to prove",
      body: "My ingestion pipeline behaves exactly once in practice. Idempotent storage, ordered partitions, careful retries. But I've never implemented a consensus protocol, and I can't derive my pipeline's guarantees from first principles. I want to close that gap from the literature and implementation, not from the next production incident.",
    },
    {
      q: "02 — storage engines I've only consumed",
      body: "I sit on top of OpenSearch and MySQL every day and tune around their behavior. Page sizes, merge pressure, compaction stalls. I've never built the LSM-tree or B-tree underneath, and I want to understand the layer I currently treat as weather.",
    },
    {
      q: "03 — verification instead of vigilance",
      body: "Right now correctness at scale means parallel runs, automated diffs, and dashboards I check compulsively. It works, but it's vigilance, not proof. I want the formal-methods background to specify what a pipeline guarantees and verify it holds, before production finds out.",
    },
    {
      q: "04 — serving intelligence cheaply",
      body: "My router treats cached conversation as a resource worth scheduling around. But batching, eviction, and heterogeneous hardware underneath are subjects I've only read about. Serving is where AI systems meet operating systems, and I want the scheduling and architecture theory beneath the API I've already built on.",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <SectionHead
        cmd="cat open_questions.txt"
        title="What I'm trying to learn next"
      />
      <div className="overflow-hidden rounded-lg border border-white/10">
        {qs.map((it, i) => (
          <div
            key={it.q}
            className={`p-6 ${i > 0 ? "border-t border-white/10" : ""} bg-panel/60 transition hover:bg-green-400/[0.03]`}
          >
            <div className="font-mono text-[13px] font-bold text-green-200">
              {it.q}
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">
              {it.body}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-3 font-mono text-[11px] text-zinc-600">
        {/* keep it a statement of direction, not an ask */}
        4 open threads · updated when one closes
      </p>
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
    <div className="mb-4 overflow-hidden rounded-lg border border-white/10 bg-panel/80 font-mono">
      <div className="border-b border-white/10 px-5 py-3 text-[11px] text-zinc-500">
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
            {r.note && <span className="text-zinc-600"> — {r.note}</span>}
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
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
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
            className="group rounded-lg border border-white/10 bg-white/[0.02] p-5 transition hover:-translate-y-0.5 hover:border-green-400/30 hover:bg-green-400/[0.04]"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-white group-hover:text-green-200">
                {o.name}
              </span>
              <ArrowUpRight
                size={15}
                className="text-zinc-600 group-hover:text-green-300"
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
    </section>
  );
}

export function BlogPreview() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
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
      <div className="grid gap-4 md:grid-cols-3">
        {[...POSTS]
          .sort((a, b) => (a.date < b.date ? 1 : -1))
          .slice(0, 3)
          .map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group rounded-lg border border-white/10 bg-panel p-6 transition hover:border-green-400/30"
          >
            <div className="flex items-center gap-2 font-mono text-[10px]">
              <span className="rounded bg-green-400/10 px-2 py-1 text-green-200">
                {p.tag}
              </span>
              <span className="text-zinc-600">
                {p.date} · {p.minutes} min
              </span>
            </div>
            <h3 className="mt-3 font-bold leading-snug text-white group-hover:text-green-200">
              {p.title}
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">
              {p.excerpt}
            </p>
            <div className="mt-4 font-mono text-xs text-green-300">
              read_post →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function Path() {
  const items = [
    {
      t: "SWE @ Saviynt",
      d: "Jun 2025 → now · identity governance · 300+ tenants",
      c: "Own export pipeline, SoD engines, audit ingestion, agent safety. 2× Tiger Team.",
    },
    {
      t: "B.Tech Ocean Eng, IIT Madras",
      d: "2021 → 2025 · JEE top 0.2% of 1.1M",
      c: "Math, modeling, physics. Plus Team Abhiyaan (pitched to India's Commerce Minister) and football, chess, cricket at district level and above.",
    },
    {
      t: "Competitive programming",
      d: "4 years · Guardian 2100+ · Expert 1602 · HackerCup R2",
      c: "My department offered no CS courses, so I trained against students who had them, and stayed until my rankings matched theirs.",
    },
    {
      t: "ML from first principles",
      d: "ongoing · in public",
      c: "A language model by hand, then in dependency-free C++, then in raw GPU code. Detection models, heuristic search, evolutionary optimization. I learn a system by rebuilding it.",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <SectionHead cmd="git log --oneline" title="How I got here" />
      <div className="grid gap-4 md:grid-cols-4">
        {items.map((it, i) => (
          <div
            key={it.t}
            className="relative rounded-lg border border-white/10 bg-white/[0.02] p-5"
          >
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
        ))}
      </div>
      <p className="mt-4 font-mono text-[12px] text-zinc-500">
        the contest archive behind the ratings. Searchable:{" "}
        <Link href="/dsa" className="text-green-300 underline">
          ~/dsa →
        </Link>
      </p>
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
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="relative overflow-hidden rounded-lg border border-green-400/25 bg-panel p-8 sm:p-12">
        <div className="font-mono text-[12px] text-green-300">
          <span className="text-zinc-600">$</span> ./open_channel
        </div>
        <h2 className="mt-3 max-w-xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Get in touch.
        </h2>
        <p className="mt-3 max-w-xl text-zinc-400">
          For questions about this work, research conversations, or
          collaboration. Email is the fastest way to reach me.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 font-mono text-sm">
          <button
            onClick={copy}
            className="rounded-md bg-green-400 px-5 py-3 font-bold text-black transition hover:bg-green-300"
          >
            {copied ? "copied ✓" : "arin16tumbagi@gmail.com"}
          </button>
          <a
            href="/resume.pdf"
            target="_blank"
            className="rounded-md border border-green-400/40 bg-green-400/10 px-5 py-3 font-bold text-green-200 transition hover:bg-green-400/20"
          >
            resume.pdf ↓
          </a>
          <a
            href="https://github.com/Arin016"
            target="_blank"
            className="rounded-md border border-white/15 bg-white/5 px-5 py-3 text-white hover:border-green-400/40 hover:bg-white/10"
          >
            github/Arin016
          </a>
          <a
            href="https://linkedin.com/in/arin-mallanna"
            target="_blank"
            className="rounded-md border border-white/15 bg-white/5 px-5 py-3 text-white hover:border-green-400/40 hover:bg-white/10"
          >
            linkedin
          </a>
        </div>
      </div>
    </section>
  );
}
