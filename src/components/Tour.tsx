"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";

type Step = { id: string; title: string; body: string; go?: string };

const STEPS: Step[] = [
  {
    id: "terminal",
    title: "This shell is real.",
    body: "Type `help` and hit enter. Or just ask a question like `ask what is SoD`. `open blog` and `stats` work too.",
  },
  {
    id: "stats",
    title: "The numbers first.",
    body: "Every claim on this page carries its measurement. Same output row-for-row, flat memory, cited evidence.",
  },
  {
    id: "pipeline",
    title: "Watch the 7 MB claim run.",
    body: "Packets flow, the row counter climbs, memory never moves. Click any stage for its bound.",
  },
  {
    id: "work",
    title: "Production systems.",
    body: "Each card carries its number and its write-up. Next stop is playable.",
  },
  {
    id: "ai",
    title: "The same discipline, applied to AI.",
    body: "Routers, hand-built models, safety engines. Budgets and evidence, again.",
  },
  {
    id: "audit",
    go: "/projects",
    title: "The audit desk.",
    body: "The fraud check, playable: load a case, run the engine, read the attack path. Two minutes.",
  },
  {
    id: "questions",
    title: "What I'm studying next.",
    body: "Four open threads, updated when one closes.",
  },
  {
    id: "contact",
    title: "The tour ends where conversations start.",
    body: "Questions about the work, research directions, or collaboration. Email is fastest.",
  },
];

type Ctx = { start: () => void; stop: () => void; active: boolean };
const TourCtx = createContext<Ctx>({
  start: () => {},
  stop: () => {},
  active: false,
});
export const useTour = () => useContext(TourCtx);

type Box = { top: number; left: number; width: number; height: number };

function measure(id: string): Box | null {
  const el = document.querySelector(`[data-tour="${id}"]`);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}

export function TourProvider({ children }: { children: React.ReactNode }) {
  const [idx, setIdx] = useState<number | null>(null);
  const [box, setBox] = useState<Box | null>(null);

  const start = useCallback(() => setIdx(0), []);
  const stop = useCallback(() => {
    setIdx(null);
    setBox(null);
  }, []);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (idx === null) return;
    const step = STEPS[idx];
    if (step.go && pathname !== step.go) {
      router.push(step.go);
      return;
    }
    const el = document.querySelector(`[data-tour="${step.id}"]`);
    if (!el) {
      if (!step.go && pathname !== "/") {
        router.push("/");
        return;
      }
      setIdx((i) => (i === null ? null : i + 1));
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    const t = setTimeout(() => setBox(measure(step.id)), reduce ? 60 : 500);
    return () => clearTimeout(t);
  }, [idx, pathname, router]);

  useEffect(() => {
    if (idx === null) return;
    const sync = () => setBox(measure(STEPS[idx].id));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") stop();
      if (e.key === "ArrowRight") setIdx((i) => (i === null ? null : Math.min(i + 1, STEPS.length - 1)));
      if (e.key === "ArrowLeft") setIdx((i) => (i === null || i === 0 ? i : i - 1));
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [idx, stop]);

  const step = idx === null ? null : STEPS[idx];
  const tipTop =
    box !== null
      ? box.top + box.height + 16 + 190 < window.innerHeight
        ? box.top + box.height + 16
        : Math.max(70, box.top - 206)
      : 100;
  const tipLeft =
    box !== null
      ? Math.min(Math.max(16, box.left), window.innerWidth - 352)
      : 16;

  return (
    <TourCtx.Provider value={{ start, stop, active: idx !== null }}>
      {children}
      {step && box && (
        <>
          <div
            className="fixed inset-0 z-[70] bg-black/75"
            onClick={stop}
            aria-hidden
          />
          <div
            className="pointer-events-none fixed z-[71] rounded-lg border-2 border-green-400 shadow-[0_0_50px_-8px_rgba(74,222,128,0.7)] transition-all duration-300"
            style={{
              top: box.top - 8,
              left: box.left - 8,
              width: box.width + 16,
              height: box.height + 16,
            }}
            aria-hidden
          />
          <div
            className="fixed z-[72] w-[320px] max-w-[calc(100vw-32px)] rounded-lg border border-green-400/40 bg-[#0a0d0a] p-4 shadow-2xl"
            style={{ top: tipTop, left: tipLeft }}
            role="dialog"
            aria-label={`tour step ${idx! + 1}`}
          >
            <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500">
              <span>
                STEP {idx! + 1} / {STEPS.length}
              </span>
              <button onClick={stop} className="hover:text-zinc-200" aria-label="exit tour">
                ✕
              </button>
            </div>
            <div className="mt-2 font-mono text-sm font-bold text-green-200">
              {step.title}
            </div>
            <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-400">
              {step.body}
            </p>
            <div className="mt-3 flex items-center gap-2 font-mono text-xs">
              {idx! > 0 && (
                <button
                  onClick={() => setIdx(idx! - 1)}
                  className="rounded-md border border-white/15 px-3 py-1.5 text-zinc-300 hover:bg-white/5"
                >
                  ← back
                </button>
              )}
              {idx! < STEPS.length - 1 ? (
                <button
                  onClick={() => setIdx(idx! + 1)}
                  className="rounded-md bg-green-400 px-3 py-1.5 font-bold text-black hover:bg-green-300"
                >
                  next →
                </button>
              ) : (
                <a
                  href="mailto:arin16tumbagi@gmail.com"
                  className="rounded-md bg-green-400 px-3 py-1.5 font-bold text-black hover:bg-green-300"
                >
                  email me →
                </a>
              )}
              <button onClick={stop} className="ml-auto text-zinc-600 hover:text-zinc-300">
                skip
              </button>
            </div>
          </div>
        </>
      )}
    </TourCtx.Provider>
  );
}
