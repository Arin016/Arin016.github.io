import { Cpu, Database, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal";
import { SectionHead } from "./Sections";
import { LINKS } from "@/data/content";

const CHIPS = [
  { icon: Cpu, t: "21h → ~3 min", s: "2 s of it compute" },
  { icon: Database, t: "No upper bound", s: "7MB flat · 15M+ proven" },
  { icon: ShieldCheck, t: "5 risk patterns", s: "~22ms a check" },
];

export default function Intro() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <Reveal>
        <SectionHead cmd="cat intro.txt" title="The short version" />
      </Reveal>
      <Reveal delay={0.08}>
        <p className="max-w-3xl text-[15px] leading-relaxed text-zinc-400">
          I work on identity governance. That is the software that controls
          who inside a large company can access what. My systems move records
          at any scale, and my agents work under strict budgets with checked
          outputs. I studied Ocean Engineering at IIT Madras and spent four
          years on competitive programming:{" "}
          <a
            className="text-zinc-100 underline decoration-green-400/50 underline-offset-4"
            href={LINKS.leetcode}
            target="_blank"
          >
            LeetCode Guardian 2100+
          </a>{" "}
          /{" "}
          <a
            className="text-zinc-100 underline decoration-green-400/50 underline-offset-4"
            href={LINKS.codeforces}
            target="_blank"
          >
            Codeforces Expert 1602
          </a>
          . Current interests: consensus and storage, transformers and
          inference.
        </p>
      </Reveal>
      <div className="mt-7 grid max-w-2xl grid-cols-3 gap-3">
        {CHIPS.map((c, i) => (
          <Reveal key={c.t} delay={0.1 + i * 0.06}>
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
              <c.icon size={16} className="text-green-300" />
              <div className="mt-2 text-sm font-bold text-white">{c.t}</div>
              <div className="font-mono text-[11px] text-zinc-500">{c.s}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
