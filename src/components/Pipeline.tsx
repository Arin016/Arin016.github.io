"use client";
import { useEffect, useState } from "react";
import Reveal from "./Reveal";

const STAGES = [
  {
    id: "read",
    name: "01 · read",
    bound: "one page",
    desc: "The database is asked for one page of rows at a time. Each page is processed, released, and forgotten before the next arrives.",
  },
  {
    id: "format",
    name: "02 · format",
    bound: "50-row window",
    desc: "Cells are written through a 50-row sliding window. Older rows spill to temporary disk. Never to memory.",
  },
  {
    id: "upload",
    name: "03 · upload",
    bound: "5 MB parts",
    desc: "Finished workbooks stream to object storage in fixed 5 MB parts. A 1 KB file and a 10 GB file use the same buffer.",
  },
  {
    id: "archive",
    name: "04 · archive",
    bound: "streamed zip",
    desc: "Workbooks are read back in small chunks and zipped on the fly. The final archive is never assembled whole.",
  },
  {
    id: "deliver",
    name: "05 · deliver",
    bound: "one key",
    desc: "A single object lands in storage. Total memory held across all five stages: 7 MB, flat.",
  },
];

const TOTAL = 48204118;

export default function Pipeline() {
  const [rows, setRows] = useState(0);
  const [active, setActive] = useState(STAGES[1]);

  useEffect(() => {
    const id = setInterval(() => {
      setRows((r) => (r >= TOTAL ? 0 : r + 62000 + Math.floor(Math.random() * 40000)));
    }, 100);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Reveal>
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-[12px] text-green-300">
              <span className="text-zinc-600">$</span> ./export --watch
            </div>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              The 7 MB pipeline, running
            </h2>
          </div>
          <div className="font-mono text-[12px] text-zinc-500 tabular-nums">
            rows <span className="text-green-200">{rows.toLocaleString("en-US")}</span>
            {" · "}mem <span className="text-zinc-200">7.0 MB</span>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="overflow-hidden rounded-lg border border-white/10 bg-panel/80 p-5 sm:p-6">
          <div className="overflow-x-auto pb-1">
            <div className="min-w-[640px]">
              <div className="relative mb-5 h-6">
                <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/10" />
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="packet"
                    style={{ animationDelay: `${i * 1.05}s` }}
                    aria-hidden
                  />
                ))}
              </div>
              <div className="grid grid-cols-5 gap-2">
                {STAGES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActive(s)}
                    aria-pressed={active.id === s.id}
                    className={`rounded-md border p-3 text-left font-mono transition ${
                      active.id === s.id
                        ? "border-green-400/50 bg-green-400/10"
                        : "border-white/10 bg-white/[0.02] hover:border-white/25"
                    }`}
                  >
                    <div
                      className={`text-[12px] font-bold ${active.id === s.id ? "text-green-200" : "text-zinc-300"}`}
                    >
                      {s.name}
                    </div>
                    <div className="mt-1 text-[10.5px] text-zinc-500">{s.bound}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5 rounded-md border border-white/10 bg-white/[0.02] p-4">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[12px]">
              <span className="font-bold text-green-200">{active.name}</span>
              <span className="rounded bg-green-400/10 px-2 py-0.5 text-green-200">
                ≤ {active.bound} in memory
              </span>
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
              {active.desc}
            </p>
          </div>
          <p className="mt-3 font-mono text-[11px] text-zinc-600">
            looped demonstration. The architecture is the production one.{" "}
            <a href="/blog/streaming-excel-to-s3" className="text-green-300 underline">
              full write-up
            </a>{" "}
            · the 5 MB primitive didn&apos;t exist in the AWS toolkit, so I
            built it:{" "}
            <a
              href="https://github.com/Arin016/s3-outputstream"
              target="_blank"
              className="text-green-300 underline"
            >
              s3-outputstream
            </a>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
