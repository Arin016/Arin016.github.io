"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Link from "next/link";

const STAGES = [
  {
    id: "read",
    n: "01",
    name: "read",
    bound: "one page",
    desc: "The database is asked for one page of rows at a time. Each page is processed, released, and forgotten before the next arrives.",
  },
  {
    id: "format",
    n: "02",
    name: "format",
    bound: "50-row window",
    desc: "Cells are written through a 50-row sliding window. Older rows spill to temporary disk. Never to memory.",
  },
  {
    id: "upload",
    n: "03",
    name: "upload",
    bound: "5 MB parts",
    desc: "Finished workbooks stream to object storage in fixed 5 MB parts. A 1 KB file and a 10 GB file use the same buffer.",
  },
  {
    id: "archive",
    n: "04",
    name: "archive",
    bound: "streamed zip",
    desc: "Workbooks are read back in small chunks and zipped on the fly. The final archive is never assembled whole.",
  },
  {
    id: "deliver",
    n: "05",
    name: "deliver",
    bound: "one key",
    desc: "A single object lands in storage. The S3 stage holds one 5 MiB part buffer; producer, SDK and per-part overhead are separate budgets.",
  },
];

function StageRow({
  stage,
  i,
  active,
}: {
  stage: (typeof STAGES)[number];
  i: number;
  active: MotionValue<number>;
}) {
  const opacity = useTransform(active, [i - 0.6, i - 0.15, i + 0.15, i + 0.6], [0.35, 1, 1, 0.35]);
  const x = useTransform(active, [i - 0.6, i - 0.15, i + 0.15, i + 0.6], [-14, 0, 0, 14]);
  const bar = useTransform(active, [i - 0.5, i], [0, 1]);
  return (
    <motion.div
      style={{ opacity, x }}
      className={`flex items-start gap-5 py-5 ${i > 0 ? "hairline-t" : ""}`}
    >
      <span className="font-mono text-[12px] text-green-300">{stage.n}</span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3">
          <span className="font-display text-xl font-bold text-white">
            {stage.name}
          </span>
          <span className="rounded bg-green-400/10 px-2 py-0.5 font-mono text-[11px] font-bold text-green-200">
            ≤ {stage.bound}
          </span>
        </div>
        <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-zinc-400">
          {stage.desc}
        </p>
        <div className="mt-3 h-px w-full bg-white/10">
          <motion.div
            style={{ scaleX: bar, transformOrigin: "left" }}
            className="h-px bg-green-400"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function PinnedPipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // segment the scroll into 5 stage windows
  const active = useTransform(scrollYProgress, [0, 1], [0, STAGES.length - 1]);
  const rowsFloat = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const packetOpacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0, 1, 1, 0]);

  return (
    <section className="hairline-t">
      <div ref={ref} className="relative">
        {/* sticky visual rail */}
        <div className="sticky top-14 z-10 hidden border-b border-white/10 bg-void/85 backdrop-blur-xl lg:block">
          <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
            <span className="font-mono text-[12px] text-green-300">
              <span className="text-zinc-500">$</span> ./export --watch
            </span>
            <div className="relative mx-2 h-4 flex-1">
              <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/10" />
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="packet"
                  style={{ animationDelay: `${i * 1.05}s`, opacity: packetOpacity }}
                  aria-hidden
                />
              ))}
            </div>
            <span className="font-mono text-[11px] text-zinc-500">
              rows <span className="text-green-200">unbounded</span> · mem{" "}
              <span className="text-zinc-200">5 MiB part buffer</span>
            </span>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-24 pt-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:pt-20">
          <div className="lg:sticky lg:top-36 lg:self-start">
            <div className="font-mono text-[12px] text-green-300">
              <span className="text-zinc-500">$</span> ./export --watch
            </div>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Bounded at every stage.
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-zinc-400">
              Five stages, each with a hard memory bound. The export never
              holds the whole workload — so a 1 KB file and a 10 GB file cost
              the same.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 font-mono text-[12px]">
              <Link
                href="/blog/streaming-excel-to-s3"
                className="rounded-md border border-white/15 bg-white/[0.04] px-4 py-2.5 text-zinc-200 transition hover:border-green-400/40 hover:text-green-200"
              >
                full write-up →
              </Link>
              <a
                href="https://github.com/Arin016/s3-outputstream"
                target="_blank"
                className="rounded-md border border-white/15 bg-white/[0.04] px-4 py-2.5 text-zinc-200 transition hover:border-green-400/40 hover:text-green-200"
              >
                s3-outputstream ↗
              </a>
            </div>
            <p className="mt-4 font-mono text-[11px] text-zinc-500">
              scroll to walk the stages
            </p>
          </div>

          <motion.div style={reduce ? undefined : { y: rowsFloat }}>
            {STAGES.map((s, i) => (
              <StageRow key={s.id} stage={s} i={i} active={active} />
            ))}
            <p className="mt-6 font-mono text-[11px] text-zinc-500">
              stage bounds from the production design; the write-up documents
              failure behavior and the real-S3 conformance receipt.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
