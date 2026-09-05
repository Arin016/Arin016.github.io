"use client";
import { useMemo, useState } from "react";

function randBits(rnd: () => number): boolean[] {
  return Array.from({ length: 64 }, () => rnd() < 0.35);
}

function mulberry(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Row({ bits, hot }: { bits: boolean[]; hot?: boolean }) {
  return (
    <div className="grid grid-cols-16 gap-[2px]">
      {bits.map((b, i) => (
        <span
          key={i}
          className={`aspect-square rounded-[2px] ${
            b
              ? hot
                ? "bg-white"
                : "bg-green-400"
              : "bg-white/10"
          }`}
        />
      ))}
    </div>
  );
}

export default function BitsetLab() {
  const [usersExp, setUsersExp] = useState(5); // 10^5 = 100K
  const [rulesExp, setRulesExp] = useState(3.5); // ~3.2K rules
  const [seed, setSeed] = useState(7);

  const users = Math.round(Math.pow(10, usersExp));
  const rules = Math.round(Math.pow(10, rulesExp));
  const words = Math.ceil(users / 64);
  const ops = rules * words + users; // intersections + one hierarchy pass
  const sec = ops / 3e9;
  const timeStr =
    sec >= 1
      ? `${sec.toFixed(2)} s compute`
      : sec >= 1e-3
        ? `${(sec * 1e3).toFixed(2)} ms compute`
        : `${(sec * 1e6).toFixed(1)} µs compute`;
  const naive = rules * users; // one-by-one membership checks
  const speedup = naive / Math.max(1, ops);
  const kb = (words * 8) / 1024;

  const demo = useMemo(() => {
    const rnd = mulberry(seed);
    const a = randBits(rnd);
    const b = randBits(rnd);
    const r = a.map((x, i) => x && b[i]);
    return { a, b, r, hits: r.filter(Boolean).length };
  }, [seed]);

  const fmtInt = (n: number) => n.toLocaleString("en-US");

  return (
    <div className="my-6 rounded-lg border border-white/10 bg-panel/80 p-5">
      <div className="font-mono text-[12px] text-green-300">
        <span className="text-zinc-600">$</span> ./bitset_lab — size the problem
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="font-mono text-[11px] text-zinc-500">
            users <span className="float-right text-zinc-200">{fmtInt(users)}</span>
          </span>
          <input
            type="range" min={3} max={6} step={0.1} value={usersExp}
            onChange={(e) => setUsersExp(parseFloat(e.target.value))}
            aria-label="users" className="mt-1 w-full accent-green-400"
          />
        </label>
        <label className="block">
          <span className="font-mono text-[11px] text-zinc-500">
            rules <span className="float-right text-zinc-200">{fmtInt(rules)}</span>
          </span>
          <input
            type="range" min={2} max={4.3} step={0.1} value={rulesExp}
            onChange={(e) => setRulesExp(parseFloat(e.target.value))}
            aria-label="rules" className="mt-1 w-full accent-green-400"
          />
        </label>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-center font-mono sm:grid-cols-4">
        {[
          [`~${kb >= 1000 ? `${(kb / 1024).toFixed(1)} MB` : `${kb.toFixed(1)} KB`}`, "one set in memory"],
          [`${fmtInt(ops)}`, "word operations"],
          [timeStr, "at 3B ops/s"],
          [`${speedup >= 100 ? Math.round(speedup).toLocaleString("en-US") : speedup.toFixed(1)}×`, "fewer ops than naive"],
        ].map(([v, l]) => (
          <div key={l} className="rounded-md border border-white/10 bg-white/[0.02] p-2.5">
            <div className="text-[13px] font-bold text-green-200">{v}</div>
            <div className="mt-0.5 text-[10px] text-zinc-600">{l}</div>
          </div>
        ))}
      </div>
      <div className="mt-2 font-mono text-[11px] text-zinc-600">
        naive would do {fmtInt(naive)} one-by-one checks ({fmtInt(rules)} rules × {fmtInt(users)} users).
        bitsets do {fmtInt(ops)}.
      </div>
      <div className="mt-4 border-t border-white/10 pt-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] text-zinc-500">
            one instruction, 64 users: A ∩ B
          </span>
          <button
            onClick={() => setSeed((s) => s + 1)}
            className="rounded-md border border-green-400/40 px-3 py-1 font-mono text-[11px] text-green-200 hover:bg-green-400/10"
          >
            ↻ new draw
          </button>
        </div>
        <div className="mt-2 space-y-1.5">
          <Row bits={demo.a} />
          <Row bits={demo.b} />
          <Row bits={demo.r} hot />
        </div>
        <div className="mt-2 font-mono text-[11px] text-zinc-500">
          each square = one user · white = holds both · this draw:{" "}
          <span className="text-zinc-200">{demo.hits} of 64 in one instruction</span>
        </div>
      </div>
    </div>
  );
}
