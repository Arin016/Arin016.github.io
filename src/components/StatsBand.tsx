"use client";
import { motion } from "framer-motion";
import CountUp from "@/components/CountUp";

const STATS = [
  {
    k: "~20h → mins",
    v: "compliance check, rebuilt",
    sub: "large-enterprise worst case · <1 GB memory",
  },
  {
    k: "5 MiB",
    v: "buffer for exports of any size",
    sub: "explicit commit semantics · v2.0.0 on Maven Central",
  },
  {
    k: "110",
    v: "tests on the agent harness",
    sub: "46/46 held-out variants · zero unsupported claims",
  },
  {
    k: "2 s",
    v: "engine compute on 100K+ accounts",
    sub: "bit-level comparison · published with approval",
  },
];

export default function StatsBand() {
  return (
    <section className="hairline-t">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.v}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
            >
              <div className="font-display text-4xl font-bold tracking-tight text-white sm:text-[2.6rem]">
                <CountUp value={s.k} />
              </div>
              <div className="mt-3 text-[14px] font-semibold text-zinc-200">
                {s.v}
              </div>
              <div className="mt-1.5 font-mono text-[11px] leading-relaxed text-zinc-500">
                {s.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
