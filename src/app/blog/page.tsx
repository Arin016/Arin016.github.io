import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

export const metadata = { title: " · Blog — Arin Mallanna Tumbagi" };

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <div>
      <section>
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <PageHeader
            cmd="tail -f ./notes"
            title="Notes from production"
            lede="Long-form breakdowns of systems I've actually shipped. No listicles, no hot takes."
            right={
              <div className="font-mono text-[12px] text-zinc-500">
                {posts.length} posts
              </div>
            }
          />
        </div>
      </section>

      <section className="hairline-t">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-4 sm:px-6 sm:pb-24">
          <div className="max-w-3xl">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={Math.min(i * 0.04, 0.2)}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group block border-t border-white/10 py-8 transition"
                >
                  <div className="flex items-baseline justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-3 font-mono text-[10.5px]">
                        <span className="text-green-300">{p.tag}</span>
                        <span className="text-zinc-500">
                          {p.date} · {p.minutes} min read
                        </span>
                      </div>
                      <h2 className="mt-3 font-display text-2xl font-bold leading-snug tracking-tight text-white transition group-hover:text-green-200 sm:text-[1.7rem]">
                        {p.title}
                      </h2>
                      <p className="mt-2.5 text-[14px] leading-relaxed text-zinc-400">
                        {p.excerpt}
                      </p>
                      <div className="mt-4 font-mono text-xs text-green-300 opacity-0 transition group-hover:opacity-100">
                        read_post →
                      </div>
                    </div>
                    <span className="hidden font-display text-4xl font-bold text-zinc-700 transition group-hover:text-green-300/60 sm:block">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
