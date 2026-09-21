import Link from "next/link";

export const metadata = { title: "404 — command not found" };

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6">
      <div className="win overflow-hidden">
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.02] px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-zinc-700" />
          <span className="size-2.5 rounded-full bg-zinc-700" />
          <span className="size-2.5 rounded-full bg-zinc-700" />
          <span className="ml-3 font-mono text-xs text-zinc-500">
            guest@arin: ~
          </span>
        </div>
        <div className="space-y-2 p-6 font-mono text-[13px] leading-relaxed">
          <div className="text-green-200">$ open ~/this-page</div>
          <div className="text-zinc-300">
            zsh: no such page on this server. It may have moved, or never
            existed.
          </div>
          <div className="text-zinc-600">exit code 404</div>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3 font-mono text-sm">
        <Link
          href="/"
          className="rounded-md bg-green-400 px-4 py-2.5 font-bold text-black transition hover:bg-green-300"
        >
          cd ~
        </Link>
        <Link
          href="/projects"
          className="rounded-md border border-white/15 bg-white/5 px-4 py-2.5 text-white transition hover:border-green-400/40 hover:bg-white/10"
        >
          ls ./projects
        </Link>
        <Link
          href="/blog"
          className="rounded-md border border-white/15 bg-white/5 px-4 py-2.5 text-white transition hover:border-green-400/40 hover:bg-white/10"
        >
          ls ./blog
        </Link>
      </div>
      <p className="mt-4 font-mono text-[11px] text-zinc-600">
        tip: press ⌘K anywhere to jump straight to a page.
      </p>
    </div>
  );
}
