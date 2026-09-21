"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("arin-theme", next ? "dark" : "light");
    } catch {
      /* private mode: theme just won't persist */
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "switch to light mode" : "switch to dark mode"}
      className="rounded-md p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white"
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
