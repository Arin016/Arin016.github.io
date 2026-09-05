"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import Terminal from "@/components/Terminal";
import { useTour } from "@/components/Tour";

function useTyped() {
  const [text, setText] = useState("");
  const full = "I build systems that stay flat in memory, and agents that show their evidence.";
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

export default function Hero() {
  const typed = useTyped();
  const { start } = useTour();
  return (
    <section className="relative overflow-hidden lg:flex lg:min-h-[calc(100svh-3.5rem)] lg:items-center">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:pt-10">
        <div>
          <div className="mb-5 font-mono text-[13px] leading-relaxed">
            <div className="text-zinc-100">Arin Mallanna Tumbagi</div>
            <div className="mt-1 text-zinc-500">
              Software Engineer, Saviynt · B.Tech, IIT Madras
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="max-w-xl text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl"
          >
            Systems that hold up under heavy load. Agents that stand behind
            their claims.
          </motion.h1>

          <p className="caret mt-6 min-h-7 font-mono text-sm text-green-200/90 sm:text-base">
            {typed}
          </p>

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
