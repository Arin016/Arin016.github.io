"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
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

export default function Hero() {
  const typed = useTyped();
  const { start } = useTour();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const termY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const termScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const glowFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
    >
      <div className="hero-aurora" style={{ opacity: reduce ? 0.5 : undefined }} aria-hidden />
      <div
        className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-10 pt-16 text-center sm:px-6 lg:pt-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 font-mono text-[12px] text-zinc-400"
        >
          <span className="text-green-300">❯</span>
          <span>
            <span className="text-white">Arin Mallanna Tumbagi</span>
            <span className="text-zinc-400">
              {" "}— Software Engineer, Saviynt · B.Tech, IIT Madras
            </span>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.06 }}
          className="max-w-4xl font-display text-[2.6rem] font-bold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl lg:text-[5.2rem]"
        >
          Slow enterprise systems, made fast.{" "}
          <span className="headline-accent">AI agents that show receipts.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.14 }}
          className="caret mt-7 min-h-7 font-mono text-sm text-green-200/90 sm:text-base"
        >
          {typed}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-lg bg-green-400 px-6 py-3.5 font-mono text-sm font-bold text-black transition hover:bg-green-300"
          >
            ./view_work
            <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
          </Link>
          <button
            onClick={start}
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-6 py-3.5 font-mono text-sm text-zinc-200 transition hover:border-green-400/40 hover:text-green-200"
          >
            ▶ 90-sec tour
          </button>
        </motion.div>
      </div>

      {/* terminal as the hero object */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-3xl px-4 pb-20 sm:px-6"
        style={reduce ? undefined : { y: termY, scale: termScale }}
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.28 }}
      >
        <motion.div style={{ opacity: glowFade }} aria-hidden>
          <Terminal />
        </motion.div>
        <p className="mt-4 text-center font-mono text-[11px] text-zinc-500">
          click inside and type `help` · all figures from production systems
        </p>
      </motion.div>
    </section>
  );
}
