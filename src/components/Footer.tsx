"use client";
import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
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
    <footer className="relative z-10 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="font-mono text-xs text-zinc-500">
            <span className="text-green-300">$</span> whoami →{" "}
            <span className="text-zinc-300">
              arin — systems engineer, iit-madras, saviynt
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={LINKS.github}
              target="_blank"
              className="rounded-md border border-white/10 p-2 text-zinc-500 hover:border-green-400/40 hover:text-green-300"
              aria-label="GitHub"
            >
              <GithubIcon size={15} />
            </a>
            <a
              href={LINKS.linkedin}
              target="_blank"
              className="rounded-md border border-white/10 p-2 text-zinc-500 hover:border-green-400/40 hover:text-green-300"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={15} />
            </a>
            <a
              href={LINKS.email}
              className="rounded-md border border-white/10 p-2 text-zinc-500 hover:border-green-400/40 hover:text-green-300"
              aria-label="Email"
            >
              <Mail size={15} />
            </a>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-1 border-t border-white/5 pt-4 font-mono text-[11px] text-zinc-700 sm:flex-row sm:justify-between">
          <span>session {session} · guest · readonly</span>
          <span>next.js · vercel · 2026</span>
        </div>
      </div>
    </footer>
  );
}
