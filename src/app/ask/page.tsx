import { Suspense } from "react";
import AskClient from "@/components/AskClient";
import Window from "@/components/Window";
import Reveal from "@/components/Reveal";

export const metadata = { title: " · Ask — Arin Mallanna Tumbagi" };

export default function AskPage() {
  return (
    <div>
      <section>
        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 pt-16 text-center sm:px-6 sm:pt-24">
          <Reveal>
            <div className="font-mono text-[12px] text-green-300">
              <span className="text-zinc-500">$</span> ask-arin --interactive
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-[-0.02em] text-white sm:text-6xl sm:leading-[1.05]">
              Ask the site.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-zinc-400">
              Ask about my work, background, or projects. Answers come from
              these pages, with links to the source — or it tells you it
              doesn&apos;t know.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 font-mono text-[11px] text-zinc-500">
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                83 topics indexed
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                cites its page
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                or says it doesn&apos;t know
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* terminal as the hero object */}
      <section>
        <div className="mx-auto w-full max-w-3xl px-4 pb-20 pt-12 sm:px-6">
          <Reveal delay={0.1}>
            <Window title="guest@arin: ~/ask" badge="LIVE" glow>
              <Suspense>
                <AskClient />
              </Suspense>
            </Window>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 text-center font-mono text-[11px] text-zinc-500">
              click inside and ask · answers link to the page they came from
            </p>
          </Reveal>
        </div>
      </section>

      {/* how it works — editorial band */}
      <section className="hairline-t">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-10 md:grid-cols-3">
            {[
              {
                h: "parse · retrieve",
                p: "Your question is matched against the site's corpus — every page, post, and project record — not a canned FAQ.",
              },
              {
                h: "verify",
                p: "A calibrated judge scores each candidate answer against its cited source. Weak evidence is discarded, not hallucinated around.",
              },
              {
                h: "synthesize",
                p: "What survives is composed into an answer with links to the exact pages behind it. No citation, no answer.",
              },
            ].map((it, i) => (
              <Reveal key={it.h} delay={i * 0.05}>
                <div className="border-t border-white/10 pt-5">
                  <div className="font-mono text-[11px] text-green-300">
                    0{i + 1}
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold text-white">
                    {it.h}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-zinc-400">
                    {it.p}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
