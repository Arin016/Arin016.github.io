"use client";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const PERMS = [
  { id: "create_po", label: "create purchase order", hint: "raises POs" },
  { id: "approve_po", label: "approve payment", hint: "releases money" },
  { id: "read_pay", label: "read payroll", hint: "sees salaries" },
  { id: "edit_pay", label: "edit payroll", hint: "changes salaries" },
  { id: "init_pay", label: "initiate vendor payment", hint: "starts payouts" },
  { id: "release_pay", label: "release vendor payment", hint: "finalizes payouts" },
];

const PAIRS = [
  {
    a: "create_po",
    b: "approve_po",
    why: "Create + approve on one person.",
    path: "Raise a purchase order to a shell vendor, approve it yourself. Payment releases with no second pair of eyes.",
  },
  {
    a: "read_pay",
    b: "edit_pay",
    why: "Read + edit payroll on one person.",
    path: "Look up anyone's salary, adjust it quietly, then read it back to confirm. The audit trail shows one authorized user.",
  },
  {
    a: "init_pay",
    b: "release_pay",
    why: "Initiate + release on one person.",
    path: "Start a vendor payment to any account and finalize it in the same session. Initiation was supposed to be the checkpoint.",
  },
];

const PRESETS = [
  { id: "clean", label: "the clean hire", note: "read-only", perms: ["read_pay"] },
  { id: "manager", label: "the helpful manager", note: "one quiet conflict", perms: ["create_po", "approve_po", "read_pay"] },
  { id: "nightmare", label: "the nightmare", note: "three conflicts", perms: PERMS.map((p) => p.id) },
];

const TOTAL_ACCOUNTS = 100000;

export default function SodChecker() {
  const [held, setHeld] = useState<string[]>([]);
  const [scanned, setScanned] = useState<number | null>(null);
  const raf = useRef<number | null>(null);

  const hits = PAIRS.filter((p) => held.includes(p.a) && held.includes(p.b));
  const clean = hits.length === 0;
  const scanning = scanned !== null && scanned < TOTAL_ACCOUNTS;

  useEffect(
    () => () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    },
    []
  );

  const run = () => {
    if (raf.current !== null) cancelAnimationFrame(raf.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setScanned(TOTAL_ACCOUNTS);
      return;
    }
    const t0 = performance.now();
    setScanned(0);
    const tick = () => {
      const p = Math.min(1, (performance.now() - t0) / 1100);
      const eased = 1 - Math.pow(1 - p, 3);
      const n = Math.floor(eased * TOTAL_ACCOUNTS);
      setScanned(n);
      raf.current = p < 1 ? requestAnimationFrame(tick) : null;
    };
    raf.current = requestAnimationFrame(tick);
  };

  const load = (perms: string[]) => {
    setHeld(perms);
    setScanned(null);
    setTimeout(run, 60);
  };

  const toggle = (id: string) =>
    setHeld((h) => (h.includes(id) ? h.filter((x) => x !== id) : [...h, id]));

  const log: string[] = [];
  if (scanned !== null) {
    log.push(`loading entitlement graph … ${Math.min(scanned, TOTAL_ACCOUNTS).toLocaleString("en-US")} / ${TOTAL_ACCOUNTS.toLocaleString("en-US")} accounts`);
    if (scanned > TOTAL_ACCOUNTS * 0.35) log.push("resolving hierarchies … single pass");
    if (scanned > TOTAL_ACCOUNTS * 0.7) log.push("intersecting rules … 64 accounts per instruction");
    if (scanned >= TOTAL_ACCOUNTS)
      log.push(
        clean
          ? "done in ~2s — no toxic combination in this set"
          : `done in ~2s — ${hits.length} toxic combination${hits.length === 1 ? "" : "s"} found`
      );
  }

  return (
    <Reveal>
      <div className="overflow-hidden rounded-lg border border-white/10 bg-panel/80 p-5 sm:p-6">
        <div className="font-mono text-[12px] text-green-300">
          <span className="text-zinc-600">$</span> ./audit_desk — you are the auditor
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
          Load a case, or build a suspect by hand. Then run the check. The
          same logic scans 100,000+ accounts in production in about two
          seconds.
        </p>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div>
            <div className="font-mono text-[11px] text-zinc-600">
              01 · load a case file
            </div>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {PRESETS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => load(c.perms)}
                  className="rounded-md border border-white/10 bg-white/[0.02] p-3 text-left transition hover:border-green-400/40 hover:bg-green-400/[0.05]"
                >
                  <div className="font-mono text-[12px] font-bold text-zinc-200">
                    {c.label}
                  </div>
                  <div className="mt-0.5 font-mono text-[10.5px] text-zinc-600">
                    {c.note}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 font-mono text-[11px] text-zinc-600">
              02 · or assemble a suspect. Subject: EMP-1147, finance
            </div>
            <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
              {PERMS.map((p) => {
                const on = held.includes(p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => toggle(p.id)}
                    aria-pressed={on}
                    className={`rounded-md border px-3 py-2 text-left font-mono transition ${
                      on
                        ? "border-green-400/60 bg-green-400/15"
                        : "border-white/10 bg-white/[0.02] hover:border-white/25"
                    }`}
                  >
                    <div className={`text-[12px] ${on ? "text-green-100" : "text-zinc-400"}`}>
                      {on ? "▣ " : "▢ "}{p.label}
                    </div>
                    <div className="mt-0.5 text-[10.5px] text-zinc-600">{p.hint}</div>
                  </button>
                );
              })}
            </div>

            <div className="mt-3 flex gap-2">
              <button
                onClick={run}
                disabled={scanning}
                className="flex-1 rounded-md bg-green-400 px-4 py-2.5 font-mono text-[13px] font-bold text-black transition hover:bg-green-300 disabled:opacity-50"
              >
                {scanning ? "scanning…" : "▶ run engine check"}
              </button>
              <button
                onClick={() => {
                  if (raf.current !== null) cancelAnimationFrame(raf.current);
                  setHeld([]);
                  setScanned(null);
                }}
                className="rounded-md border border-white/10 px-4 py-2.5 font-mono text-[12px] text-zinc-600 hover:text-zinc-300"
              >
                reset
              </button>
            </div>
          </div>

          <div className="flex min-h-64 flex-col rounded-md border border-white/10 bg-black/40 p-4 font-mono text-[12.5px] leading-relaxed">
            <div className="text-[11px] text-zinc-600">engine output</div>
            <div className="mt-2 flex-1 space-y-1.5" role="status">
              {scanned === null && (
                <div className="text-zinc-600">
                  awaiting run — load a case, assemble a suspect, then hit run.
                </div>
              )}
              {scanned !== null &&
                !scanning &&
                (clean ? (
                  <div className="text-green-200">
                    ✓ CLEAN — no dangerous combination in this set.
                    <div className="mt-1 text-zinc-500">
                      Try “the nightmare” if you want to see the other outcome.
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="font-bold text-white">
                      ✕ {hits.length} VIOLATION{hits.length === 1 ? "" : "S"} — case
                      referred.
                    </div>
                    {hits.map((h) => (
                      <div key={h.a} className="mt-2 border-l-2 border-white/70 pl-3">
                        <div className="text-zinc-200">{h.why}</div>
                        <div className="mt-0.5 text-zinc-500">{h.path}</div>
                      </div>
                    ))}
                  </div>
                ))}
              {scanning && (
                <div className="space-y-1.5">
                  {log.map((l, i) => (
                    <div key={i} className="text-zinc-400">
                      <span className="text-green-300">❯</span> {l}
                    </div>
                  ))}
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-green-400 transition-[width]"
                      style={{ width: `${(scanned / TOTAL_ACCOUNTS) * 100}%` }}
                    />
                  </div>
                </div>
              )}
              {scanned !== null && !scanning && log.length > 0 && (
                <div className="mt-2 border-t border-white/10 pt-2 text-[11px] text-zinc-600">
                  {log[log.length - 1]}
                </div>
              )}
            </div>
            <div className="mt-3 border-t border-white/10 pt-2 font-mono text-[10.5px] text-zinc-700">
              production: 100,000+ accounts · ~2 s · output identical to legacy
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
