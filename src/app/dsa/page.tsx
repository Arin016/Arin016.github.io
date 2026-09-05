import DsaBrowser from "@/components/DsaBrowser";
import { getDsaIndex } from "@/lib/dsa";

export const metadata = {
  title: "DSA archive — Arin Mallanna Tumbagi",
  description:
    "Four years of contest problems, kept as a library of mental models. Searchable by topic. Every file links to code.",
};

export default async function DsaPage() {
  const { topics, live, total } = await getDsaIndex();
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <div className="font-mono text-[12px] text-green-300">
        <span className="text-zinc-600">$</span> man dsa
      </div>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white">
        A library of ways to think
      </h1>
      <div className="mt-4 max-w-2xl space-y-4 text-[15px] leading-relaxed text-zinc-400">
        <p>
          Most problems are new; almost none are novel. Four years of contests
          taught me that behind thousands of problem statements sit a few
          dozen reusable moves. Sliding windows, disjoint sets, DP over
          subsets, binary lifting. And learning a move deeply beats
          skimming a hundred problems shallowly.
        </p>
        <p>
          This archive is that education, organized: {total} solutions across{" "}
          {topics.length} topics, each kept because the problem was
          interesting enough to change how I approach the next one. It is
          also, indirectly, why a 21-hour production job became a 2-second
          one. Breadth-first search and bitsets were contest moves before
          they were production moves.
        </p>
        <p>
          If you&apos;re learning: pick one topic, solve until the pattern
          becomes reflex, then move on. That is the whole method. Search below
          the way you&apos;d search your own notes.
        </p>
      </div>
      <p className="mt-3 font-mono text-[12px] text-zinc-600">
        clone it:{" "}
        <span className="text-zinc-400">
          git clone https://github.com/Arin016/Data-Structures-and-Algorithms.git
        </span>
      </p>
      <div className="mt-8">
        <DsaBrowser topics={topics} total={total} />
      </div>
      {!live && (
        <p className="mt-4 font-mono text-[11px] text-zinc-600">
          github was unreachable at build time. Showing the topic index with
          folder links instead of the file index.
        </p>
      )}
    </div>
  );
}
