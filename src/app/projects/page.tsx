import { OSS_LIST, WORK, AI_WORK, COLLEGE } from "@/data/content";
import { ArrowUpRight } from "lucide-react";
import SodChecker from "@/components/SodChecker";
import { Upstream } from "@/components/Sections";

export const metadata = { title: "Projects — Arin Mallanna Tumbagi" };

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="font-mono text-[12px] text-green-300">
        <span className="text-zinc-600">$</span> ls -la ./work
      </div>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white">
        Projects & production systems
      </h1>
      <p className="mt-3 max-w-2xl text-zinc-400">
        Saviynt systems are internal. Shown here through numbers and
        write-ups. Personal work links out to code. Full technical write-ups
        under{" "}
        <a href="/blog" className="text-green-300 underline">
          /blog
        </a>
        .
      </p>

      <div className="mt-8" data-tour="audit">
        <SodChecker />
      </div>

      <h2 className="mb-4 mt-10 font-mono text-[12px] text-green-200">
        <span className="text-zinc-600">$</span> ls ./production
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {WORK.map((w) => (
          <article
            key={w.id}
            className="rounded-lg border border-white/10 bg-panel p-6 transition hover:border-green-400/30"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="rounded bg-white/5 px-2 py-1 font-mono text-[10px] text-zinc-500">
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
            <h3 className="mt-3 text-lg font-bold text-white">{w.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {w.body}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {w.stack.map((s) => (
                <span
                  key={s}
                  className="rounded bg-white/5 px-2 py-1 font-mono text-[11px] text-zinc-500"
                >
                  {s}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <h2 className="mb-4 mt-12 font-mono text-[12px] text-green-200">
        <span className="text-zinc-600">$</span> ls ./ai-systems
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {AI_WORK.map((w) => (
          <article
            key={w.id}
            className="rounded-lg border border-white/10 bg-panel p-6 transition hover:border-green-400/30"
          >
            <div className="flex items-center justify-between">
              <span className="rounded bg-white/5 px-2 py-1 font-mono text-[10px] text-zinc-500">
                {w.tag}
              </span>
            </div>
            <h3 className="mt-3 text-lg font-bold text-white">{w.title}</h3>
            <div className="mt-1 font-mono text-xs text-green-300">
              {w.metric}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {w.body}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {w.stack.map((s) => (
                <span
                  key={s}
                  className="rounded bg-white/5 px-2 py-1 font-mono text-[11px] text-zinc-500"
                >
                  {s}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <h2 className="mb-4 mt-12 font-mono text-[12px] text-green-200">
        <span className="text-zinc-600">$</span> ls ./open-source
      </h2>
      <Upstream />
      <div className="grid gap-4 md:grid-cols-3">
        {OSS_LIST.map((o) => (
          <a
            key={o.name}
            href={o.url}
            target="_blank"
            className="group rounded-lg border border-white/10 bg-white/[0.02] p-5 transition hover:border-green-400/30 hover:bg-green-400/[0.04]"
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
            <p className="mt-2 text-[13px] text-zinc-400">{o.desc}</p>
            <div className="mt-3 font-mono text-[11px] text-green-300/80">
              {o.highlight}
            </div>
          </a>
        ))}
      </div>

      <h2 className="mb-4 mt-12 font-mono text-[12px] text-green-200">
        <span className="text-zinc-600">$</span> ls ./college
      </h2>
      <p className="mb-4 max-w-2xl text-sm text-zinc-500">
        Coursework-era builds, kept as-is. The habit predates the job
        titles. Rebuild it to learn it.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {COLLEGE.map((o) => (
          <a
            key={o.name}
            href={o.url}
            target="_blank"
            className="group rounded-lg border border-white/10 bg-white/[0.02] p-5 transition hover:border-green-400/30 hover:bg-green-400/[0.04]"
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
            <p className="mt-2 text-[13px] text-zinc-400">{o.desc}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="rounded bg-white/5 px-2 py-0.5 font-mono text-[11px] text-zinc-500">
                {o.lang}
              </span>
              <span className="font-mono text-[10.5px] text-green-300/80">
                {o.highlight}
              </span>
            </div>
          </a>
        ))}
      </div>
      <p className="mt-4 font-mono text-[12px] text-zinc-500">
        plus the full training archive behind the ratings. 400+ files,
        searchable:{" "}
        <a href="/dsa" className="text-green-300 underline">
          ~/dsa →
        </a>
      </p>
    </div>
  );
}
