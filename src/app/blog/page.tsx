import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata = { title: "Blog — Arin Mallanna Tumbagi" };

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <div className="font-mono text-[12px] text-green-300">
        <span className="text-zinc-600">$</span> tail -f ./notes
      </div>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white">
        Notes from production
      </h1>
      <p className="mt-3 text-zinc-400">
        Long-form breakdowns of systems I&apos;ve actually shipped. No
        listicles, no hot takes.
      </p>
      <div className="mt-8 space-y-4">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group block rounded-lg border border-white/10 bg-panel p-6 transition hover:border-green-400/30"
          >
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span className="rounded bg-green-400/10 px-2 py-1 text-green-200">
                {p.tag}
              </span>
              <span className="text-zinc-600">
                {p.date} · {p.minutes} min read
              </span>
            </div>
            <h2 className="mt-3 text-xl font-bold text-white group-hover:text-green-200">
              {p.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {p.excerpt}
            </p>
            <div className="mt-3 font-mono text-xs text-green-300">
              read_post →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
