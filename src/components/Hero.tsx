"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import Terminal from "@/components/Terminal";
import { useTour } from "@/components/Tour";

function useTyped() {
  const [text, setText] = useState("");
  const full = "I make slow systems fast — and agents that prove what they claim.";
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setText(full.slice(0, i));
      if (i >= full.length) clearInterval(id);
    }, 34);
    return () => clearInterval(id);
  }, []);
  return text;
}

const TRY = [
  "What did the 20-hour job become?",
  "Do your agents show evidence?",
  "What is Nostos?",
];

export default function Hero() {
  const typed = useTyped();
  const { start } = useTour();
  return (
    <section className="relative overflow-hidden lg:flex lg:min-h-[calc(100svh-3.5rem)] lg:items-center">
      <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-14 sm:px-6 lg:pt-10">
        <div className="mb-7 w-fit max-w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-[13px] leading-relaxed">
          <span className="text-green-300">❯ </span>
          <span className="text-white">Arin Mallanna Tumbagi</span>
          <span className="text-zinc-400">
            {" "}— Software Engineer, Saviynt · B.Tech, IIT Madras
          </span>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="max-w-xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]"
          >
            Slow enterprise systems, made fast.{" "}
            <span className="headline-accent">
              AI agents that show receipts.
            </span>
          </motion.h1>

          <p className="caret mt-6 min-h-7 font-mono text-sm text-green-200/90 sm:text-base">
            {typed}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {TRY.map((q) => (
              <Link
                key={q}
                href={`/ask?q=${encodeURIComponent(q)}`}
                className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[12px] text-zinc-400 transition hover:border-green-400/40 hover:text-green-200"
              >
                try: {q}
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-lg bg-green-400 px-5 py-3 font-mono text-sm font-bold text-black transition hover:bg-green-300"
            >
              ./view_work
              <ArrowRight
                size={16}
                className="transition group-hover:translate-x-0.5"
              />
            </Link>
            <button
              onClick={start}
              className="inline-flex items-center gap-2 rounded-lg border border-green-400/40 bg-green-400/10 px-5 py-3 font-mono text-sm text-green-200 transition hover:bg-green-400/20"
            >
              ▶ 90-sec tour
            </button>
          </div>
        </div>

        {/* terminal — interactive */}
        <motion.div
          data-tour="terminal"
          initial={{ opacity: 0, y: 24, rotateX: 6 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Terminal />
          <p className="mt-3 text-center font-mono text-[11px] text-zinc-600">
            click inside and type `help` · all figures from production systems
          </p>
        </motion.div>
        </div>
      </div>
      <a
        href="#intro"
        aria-label="scroll to intro"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 font-mono text-[11px] text-zinc-600 transition hover:text-green-300 lg:flex"
      >
        <span>scroll</span>
        <ChevronDown size={14} className="animate-bounce" />
      </a>
    </section>
  );
}
