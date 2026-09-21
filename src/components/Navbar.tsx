"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
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
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-void/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="hidden shrink-0 items-center font-mono text-[13px] md:flex"
          aria-label="home"
        >
          <span className="text-green-300">guest@arin</span>
          <span className="text-zinc-500">:~$</span>
          <span className="caret" />
        </Link>

        <nav
          aria-label="primary"
          className="flex flex-1 items-center gap-1 overflow-x-auto font-mono text-[13px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
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

        <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
          <button
            onClick={() => {
              window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
            }}
            className="hidden items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5 font-mono text-[11px] text-zinc-500 transition hover:border-white/25 hover:text-zinc-200 sm:flex"
            aria-label="open command palette"
          >
            <Search size={13} />
            <span>jump…</span>
            <span className="kbd ml-1">⌘K</span>
          </button>
          <span className="mr-1 hidden items-center gap-1.5 font-mono text-[11px] text-zinc-600 lg:flex">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-green-400" />
            </span>
            online
          </span>
          <ThemeToggle />
          <a
            href={LINKS.github}
            target="_blank"
            className="hidden rounded-md p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white sm:block"
            aria-label="GitHub"
          >
            <GithubIcon size={16} />
          </a>
          <a
            href={LINKS.linkedin}
            target="_blank"
            className="hidden rounded-md p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white sm:block"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={16} />
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="rounded-md p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white md:hidden"
            aria-label={open ? "close menu" : "open menu"}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* mobile sheet */}
      {open && (
        <div className="border-t border-white/10 bg-panel/95 px-4 py-4 md:hidden">
          <div className="grid gap-1 font-mono text-sm">
            {ROUTES.map((r) => {
              const active =
                r.href === "/" ? path === "/" : path.startsWith(r.href);
              return (
                <Link
                  key={r.href}
                  href={r.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-2.5 transition ${
                    active
                      ? "bg-green-400/10 text-green-200"
                      : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
                  }`}
                >
                  <span className="mr-2 text-zinc-600">
                    {active ? "❯" : "$"}
                  </span>
                  {r.label}
                </Link>
              );
            })}
          </div>
          <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3">
            <a
              href={LINKS.github}
              target="_blank"
              className="flex-1 rounded-md border border-white/10 px-3 py-2 text-center text-zinc-300 hover:border-green-400/40 hover:text-green-200"
            >
              github ↗
            </a>
            <a
              href={LINKS.linkedin}
              target="_blank"
              className="flex-1 rounded-md border border-white/10 px-3 py-2 text-center text-zinc-300 hover:border-green-400/40 hover:text-green-200"
            >
              linkedin ↗
            </a>
            <a
              href={LINKS.email}
              className="flex-1 rounded-md bg-green-400 px-3 py-2 text-center font-bold text-black hover:bg-green-300"
            >
              email
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
