"use client";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { LINKS } from "@/data/content";

function useSessionClock() {
  const [secs, setSecs] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(h)}:${p(m)}:${p(s)}`;
}

export default function Footer() {
  const session = useSessionClock();
  return (
    <footer className="relative z-10 mt-8 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="font-mono text-[13px]">
              <span className="text-green-300">guest@arin</span>
              <span className="text-zinc-600">:~$</span>{" "}
              <span className="text-zinc-300">whoami</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              Arin Mallanna Tumbagi — systems engineer. Production identity
              systems at Saviynt, AI systems built in public, and four years
              of contest training behind the ratings.
            </p>
          </div>
          <nav
            aria-label="footer"
            className="grid grid-cols-2 gap-x-12 gap-y-2 font-mono text-[13px] sm:grid-cols-3"
          >
            <div className="col-span-2 mb-1 font-mono text-[11px] tracking-widest text-zinc-600 sm:col-span-3">
              $ ls ~/
            </div>
            <Link href="/about">~/about</Link>
            <Link href="/projects">~/projects</Link>
            <Link href="/blog">~/blog</Link>
            <Link href="/dsa">~/dsa</Link>
            <Link href="/ask">~/ask</Link>
            <Link href="/resume.pdf">resume.pdf ↗</Link>
            <Link href={LINKS.github}>github ↗</Link>
            <Link href={LINKS.linkedin}>linkedin ↗</Link>
            <Link href={LINKS.email}>email</Link>
          </nav>
        </div>
      </div>

      {/* tmux-style status line */}
      <div className="border-t border-white/10 bg-chrome">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2.5 font-mono text-[11px] sm:px-6">
          <span className="flex items-center gap-1.5 rounded bg-green-400/10 px-2 py-0.5 text-green-200">
            <span className="size-1.5 rounded-full bg-green-400" />
            0:guest@arin
          </span>
          <span className="text-zinc-600">
            session {session} · readonly
          </span>
          <span className="ml-auto flex items-center gap-1 text-zinc-600">
            press <span className="kbd">⌘</span>
            <span className="kbd">K</span> to jump
          </span>
          <span className="text-zinc-700">© 2026 Arin Mallanna Tumbagi</span>
        </div>
      </div>
    </footer>
  );
}

function Link({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  return (
    <NextLink
      href={href}
      target={external ? "_blank" : undefined}
      className="w-fit text-zinc-500 transition hover:text-green-200"
    >
      {children}
    </NextLink>
  );
}
