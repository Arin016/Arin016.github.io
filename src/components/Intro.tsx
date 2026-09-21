import { LINKS } from "@/data/content";
import Reveal from "./Reveal";

export default function Intro() {
  return (
    <section className="hairline-t">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.28fr_0.72fr]">
          <Reveal>
            <div className="font-mono text-[12px] text-green-300">
              <span className="text-zinc-500">$</span> cat intro.txt
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="max-w-3xl font-display text-2xl font-medium leading-snug tracking-tight text-zinc-200 sm:text-[1.7rem]">
              I work on identity governance — the software that controls who
              inside a large company can access what. My systems move records
              at any scale, and my agents work under strict budgets with
              checked outputs. I studied Ocean Engineering at IIT Madras and
              spent four years on competitive programming:{" "}
              <a
                className="text-green-300 underline decoration-green-400/40 underline-offset-4"
                href={LINKS.leetcode}
                target="_blank"
              >
                Guardian (peak 2077)
              </a>{" "}
              /{" "}
              <a
                className="text-green-300 underline decoration-green-400/40 underline-offset-4"
                href={LINKS.codeforces}
                target="_blank"
              >
                Expert 1602
              </a>
              . Current interests: consensus and storage, transformers and
              inference.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
