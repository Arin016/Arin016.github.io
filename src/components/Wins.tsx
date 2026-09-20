"use client";
import Link from "next/link";
import Reveal from "./Reveal";
import { SectionHead } from "./Sections";

const WINS = [
  {
    n: "01",
    title: "The audit check that ran all day",
    metric: "~20h → minutes",
    sowhat:
      "A compliance workload that ran overnight now finishes before lunch.",
    how: "One large enterprise check re-examined the company hierarchy once per rule — thousands of redundant passes over 65 GB. Now the hierarchy resolves a single time and permissions compare 64 people per processor instruction. Under ~1 GB, with matching violations.",
    link: { href: "/blog/21-hours-to-2-seconds", label: "full write-up" },
  },
  {
    n: "02",
    title: "Exports that can't crash the server",
    metric: "5 MiB · any size",
    sowhat:
      "Reports that used to run out of memory now stream straight to storage.",
    how: "s3-outputstream (Apache-2.0, v2.0.0 on Maven Central): formatted Excel flows through one reusable 5 MiB part buffer. An upload publishes only when the producer declares success — otherwise it is discarded. A 1 KB file and a 10 GB file use the same memory.",
    link: { href: "/blog/streaming-excel-to-s3", label: "full write-up" },
  },
  {
    n: "03",
    title: "AI investigators that show receipts",
    metric: "cited or silent",
    sowhat:
      "Software agents that prove each claim against source data — or hand the case to a human.",
    how: "Bounded investigator agents pursue one fraud hypothesis with strict step and time budgets. Every cited log entry is re-checked against the source; uncertain findings route to a reviewer. Public harness: 110 tests, 46/46 held-out variants, zero unsupported claims.",
    link: { href: "/projects", label: "see the system" },
  },
];

export default function Wins() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <SectionHead
        cmd="start here · 60 seconds"
        title="Three things to know"
      />
      <div className="overflow-hidden rounded-lg border border-white/10">
        {WINS.map((w, i) => (
          <Reveal key={w.n} delay={i * 0.06}>
            <details
              className={`group bg-panel/60 p-6 transition open:bg-green-400/[0.03] hover:bg-green-400/[0.02] ${
                i > 0 ? "border-t border-white/10" : ""
              }`}
            >
              <summary className="flex cursor-pointer list-none flex-wrap items-baseline gap-x-4 gap-y-1 [&::-webkit-details-marker]:hidden">
                <span className="font-mono text-[12px] text-zinc-600">
                  {w.n}
                </span>
                <span className="text-[17px] font-bold text-white">
                  {w.title}
                </span>
                <span className="rounded bg-green-400/10 px-2 py-0.5 font-mono text-[11px] font-bold text-green-200">
                  {w.metric}
                </span>
                <span className="ml-auto font-mono text-[11px] text-zinc-600 transition group-open:rotate-45 group-open:text-green-300">
                  +
                </span>
              </summary>
              <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-zinc-300">
                {w.sowhat}
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">
                {w.how}{" "}
                <Link
                  href={w.link.href}
                  className="text-green-300 underline"
                >
                  {w.link.label} →
                </Link>
              </p>
            </details>
          </Reveal>
        ))}
      </div>
      <p className="mt-3 font-mono text-[11px] text-zinc-600">
        plain words first · engineering inside — click any row
      </p>
    </section>
  );
}
