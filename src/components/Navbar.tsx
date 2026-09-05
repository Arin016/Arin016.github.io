"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import ThemeToggle from "@/components/ThemeToggle";
import { LINKS } from "@/data/content";

const ROUTES = [
  { href: "/", label: "~/home" },
  { href: "/about", label: "~/about" },
  { href: "/projects", label: "~/projects" },
  { href: "/blog", label: "~/blog" },
  { href: "/dsa", label: "~/dsa" },
  { href: "/ask", label: "~/ask" },
];

export default function Navbar() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-void/85 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="hidden shrink-0 font-mono text-[13px] md:block"
          aria-label="home"
        >
          <span className="text-green-300">guest@arin</span>
          <span className="text-zinc-500">:~$</span>
          <span className="caret" />
        </Link>
        <nav className="flex flex-1 items-center gap-1 overflow-x-auto font-mono text-[13px]">
          {ROUTES.map((r) => {
            const active =
              r.href === "/" ? path === "/" : path.startsWith(r.href);
            return (
              <Link
                key={r.href}
                href={r.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap rounded-md border px-2.5 py-1.5 transition ${
                  active
                    ? "border-green-400/30 bg-green-400/10 text-green-200"
                    : "border-transparent text-zinc-500 hover:bg-white/5 hover:text-zinc-100"
                }`}
              >
                {active ? "❯ " : ""}
                {r.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden shrink-0 items-center gap-1 sm:flex">
          <span className="mr-1 hidden items-center gap-1.5 font-mono text-[11px] text-zinc-600 lg:flex">
            <span className="size-1.5 rounded-full bg-green-400" />
            online
          </span>
          <ThemeToggle />
          <a
            href={LINKS.github}
            target="_blank"
            className="rounded-md p-2 text-zinc-500 hover:bg-white/5 hover:text-white"
            aria-label="GitHub"
          >
            <GithubIcon size={16} />
          </a>
          <a
            href={LINKS.linkedin}
            target="_blank"
            className="rounded-md p-2 text-zinc-500 hover:bg-white/5 hover:text-white"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={16} />
          </a>
          <a
            href={LINKS.email}
            className="rounded-md p-2 text-zinc-500 hover:bg-white/5 hover:text-white"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
          <a
            href={LINKS.email}
            className="ml-2 rounded-md border border-green-400/40 bg-green-400/10 px-3 py-1.5 font-mono text-xs text-green-200 transition hover:bg-green-400/20"
          >
            contact.sh
          </a>
        </div>
      </div>
    </header>
  );
}
