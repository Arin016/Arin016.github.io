import DsaBrowser from "@/components/DsaBrowser";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { getDsaIndex } from "@/lib/dsa";

export const metadata = {
  title: "DSA archive — Arin Mallanna Tumbagi",
  description:
    "Four years of contest problems, kept as a library of mental models. Searchable by topic. Every file links to code.",
};

export default async function DsaPage() {
  const { topics, live, total } = await getDsaIndex();
  return (
    <div>
      <section>
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <PageHeader
            cmd="man dsa"
            title="A library of ways to think"
            lede={
              <>
                Most problems are new; almost none are novel. Four years of
                contests taught me that behind thousands of problem
                statements sit a few dozen reusable moves. Sliding windows,
                disjoint sets, DP over subsets, binary lifting. And learning
                a move deeply beats skimming a hundred problems shallowly.
                This archive is that education, organized: {total} solutions
                across {topics.length} topics, each kept because the problem
                was interesting enough to change how I approach the next
                one. It is also, indirectly, why a 21-hour production job
                became a 2-second one. Breadth-first search and bitsets
                were contest moves before they were production moves.
              </>
            }
            right={
              <div className="font-mono text-[12px] text-zinc-500">
                <div className="text-zinc-300">{total} files</div>
                <div className="mt-1">{topics.length} topics</div>
              </div>
            }
          />
          <Reveal delay={0.1}>
            <p className="mt-6 font-mono text-[12px] text-zinc-500">
              clone it:{" "}
              <span className="text-zinc-300">
                git clone https://github.com/Arin016/Data-Structures-and-Algorithms.git
              </span>
            </p>
          </Reveal>
          <div className="mt-10">
            <Reveal delay={0.08}>
              <DsaBrowser topics={topics} total={total} />
            </Reveal>
          </div>
          {!live && (
            <p className="mt-4 font-mono text-[11px] text-zinc-600">
              github was unreachable at build time. Showing the topic index
              with folder links instead of the file index.
            </p>
          )}
        </div>
      </section>

      <section className="hairline-t">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-10 md:grid-cols-3">
            {[
              {
                h: "why a library, not a streak",
                p: "Solved problems are kept as references — each one earns its place by changing how the next problem gets read, not by filling a calendar.",
              },
              {
                h: "from contest to production",
                p: "The 21-hour SoD job became a 2-second one with moves this archive teaches: breadth-first search over org hierarchies, bitsets for permission comparison.",
              },
              {
                h: "how to use it",
                p: "Pick a topic, solve until the pattern becomes reflex, then move on. Every file below links to the actual code in the repo.",
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
