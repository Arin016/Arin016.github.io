import AskClient from "@/components/AskClient";

export const metadata = { title: "Ask — Arin Mallanna Tumbagi" };

export default function AskPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <div className="font-mono text-[12px] text-green-300">
        <span className="text-zinc-600">$</span> ask-arin --interactive
      </div>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white">
        Ask the site.
      </h1>
      <p className="mt-3 max-w-2xl text-zinc-400">
        Ask about my work, background, or projects. Answers come from these
        pages, with links to the source.
      </p>
      <div className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-[#070907]/95 shadow-[0_0_90px_-30px_rgba(74,222,128,0.5)]">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
          <span className="size-2.5 rounded-full bg-zinc-700" />
          <span className="size-2.5 rounded-full bg-zinc-700" />
          <span className="size-2.5 rounded-full bg-zinc-700" />
          <span className="ml-3 font-mono text-xs text-zinc-500">
            guest@arin: ~/ask
          </span>
          <span className="ml-auto rounded border border-green-400/30 bg-green-400/10 px-2 py-0.5 font-mono text-[10px] text-green-200">
            LOCAL
          </span>
        </div>
        <AskClient />
      </div>
    </div>
  );
}
