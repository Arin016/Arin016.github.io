"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.classList.contains("light"));
  }, []);

  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem("arin-theme", next ? "light" : "dark");
    } catch {
      /* private mode: theme just won't persist */
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={light ? "switch to dark mode" : "switch to light mode"}
      className="rounded-md p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white"
    >
      {light ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}
