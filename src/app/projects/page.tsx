import { OSS_LIST, WORK, AI_WORK, COLLEGE } from "@/data/content";
import { ArrowUpRight } from "lucide-react";
import SodChecker from "@/components/SodChecker";
import PageHeader from "@/components/PageHeader";
import Reveal, { SpotGrid } from "@/components/Reveal";
import { Upstream } from "@/components/Sections";

export const metadata = { title: " · Projects — Arin Mallanna Tumbagi" };

function BandHead({
  cmd,
  title,
  lede,
  right,
}: {
  cmd: string;
  title: string;
  lede?: string;
  right?: React.ReactNode;
}) {
  return (
    <Reveal>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="font-mono text-[12px] text-green-300">
            <span className="text-zinc-500">$</span> {cmd}
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          {lede && (
            <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-zinc-400">
              {lede}
            </p>
          )}
        </div>
        {right}
      </div>
    </Reveal>
  );
}

export default function ProjectsPage() {
  return (
    <div>
      {/* hero + live checker */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <PageHeader
            cmd="ls -la ./work"
            title="Projects & production systems"
            lede="Saviynt systems are internal. Shown here through numbers and write-ups. Personal work links out to code. Full technical write-ups under /blog."
          />
          <div className="mt-12" data-tour="audit">
            <SodChecker />
          </div>
        </div>
      </section>

      {/* production systems */}
      <section className="hairline-t">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <BandHead cmd="ls ./production" title="Production systems" />
          <SpotGrid className="grid gap-4 md:grid-cols-2">
            {WORK.map((w, i) => (
              <Reveal key={w.id} delay={(i % 2) * 0.05}>
                <article className="h-full rounded-xl border border-white/10 bg-panel/80 p-7 transition hover:-translate-y-1 hover:border-green-400/30">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-[11px] tracking-[0.16em] text-zinc-500">
                      {String(i + 1).padStart(2, "0")} · {w.tag}
                    </span>
                    <span className="rounded bg-green-400/10 px-2.5 py-1 font-mono text-[11px] font-bold text-green-200">
                      {w.metric}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-white">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300">
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
              </Reveal>
            ))}
          </SpotGrid>
        </div>
      </section>

      {/* AI systems */}
      <section className="hairline-t">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <BandHead cmd="ls ./ai-systems" title="AI systems" />
          <SpotGrid className="grid gap-4 md:grid-cols-3">
            {AI_WORK.map((w, i) => (
              <Reveal key={w.id} delay={(i % 3) * 0.05}>
                <article className="h-full rounded-xl border border-white/10 bg-panel/80 p-7 transition hover:-translate-y-1 hover:border-green-400/30">
                  <span className="font-mono text-[11px] tracking-[0.16em] text-zinc-500">
                    {w.tag}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold text-white">
                    {w.title}
                  </h3>
                  <div className="mt-1.5 font-mono text-xs text-green-300">
                    {w.metric}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300">
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
              </Reveal>
            ))}
          </SpotGrid>
        </div>
      </section>

      {/* open source */}
      <section className="hairline-t">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <BandHead cmd="ls ./open-source" title="Open source" />
          <Upstream />
          <SpotGrid className="grid gap-4 md:grid-cols-3">
            {OSS_LIST.map((o, i) => (
              <Reveal key={o.name} delay={(i % 3) * 0.05}>
                <a
                  href={o.url}
                  target="_blank"
                  className="group block h-full rounded-xl border border-white/10 bg-white/[0.02] p-6 transition hover:-translate-y-1 hover:border-green-400/30 hover:bg-green-400/[0.04]"
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
                  <div className="mt-4 font-mono text-[11px] text-green-300/80">
                    {o.highlight}
                  </div>
                </a>
              </Reveal>
            ))}
          </SpotGrid>
        </div>
      </section>

      {/* college */}
      <section className="hairline-t">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <BandHead
            cmd="ls ./college"
            title="College builds"
            lede="Coursework-era builds, kept as-is. The habit predates the job titles. Rebuild it to learn it."
          />
          <SpotGrid className="grid gap-4 md:grid-cols-3">
            {COLLEGE.map((o, i) => (
              <Reveal key={o.name} delay={(i % 3) * 0.05}>
                <a
                  href={o.url}
                  target="_blank"
                  className="group block h-full rounded-xl border border-white/10 bg-white/[0.02] p-6 transition hover:-translate-y-1 hover:border-green-400/30 hover:bg-green-400/[0.04]"
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
              </Reveal>
            ))}
          </SpotGrid>
          <Reveal>
            <p className="mt-8 font-mono text-[12px] text-zinc-500">
              plus the full training archive behind the ratings. 400+ files,
              searchable:{" "}
              <a href="/dsa" className="text-green-300 underline">
                ~/dsa →
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
