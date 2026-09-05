"use client";
import { useState } from "react";

export default function RouterSim() {
  const [shared, setShared] = useState(70);
  const [fleet, setFleet] = useState(8);
  // Honest toy model: affinity hit ~= shared fraction; baseline ~= 1/fleet.
  const base = 100 / fleet;
  const hit = Math.min(97, shared);
  const saved = Math.max(0, hit - base);

  return (
    <div className="my-6 rounded-lg border border-white/10 bg-panel/80 p-5">
      <div className="font-mono text-[12px] text-green-300">
        <span className="text-zinc-600">$</span> ./route_sim — where should this request go?
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="font-mono text-[11px] text-zinc-500">
            shared context{" "}
            <span className="float-right text-zinc-200">{shared}%</span>
          </span>
          <input type="range" min={0} max={95} step={5} value={shared}
            onChange={(e) => setShared(parseInt(e.target.value))}
            aria-label="shared context" className="mt-1 w-full accent-green-400" />
        </label>
        <label className="block">
          <span className="font-mono text-[11px] text-zinc-500">
            fleet size{" "}
            <span className="float-right text-zinc-200">{fleet} GPUs</span>
          </span>
          <input type="range" min={2} max={16} step={1} value={fleet}
            onChange={(e) => setFleet(parseInt(e.target.value))}
            aria-label="fleet size" className="mt-1 w-full accent-green-400" />
        </label>
      </div>
      <div className="mt-4 space-y-3 font-mono text-[12px]">
        <div>
          <div className="flex justify-between text-zinc-500">
            <span>round-robin cache hit</span>
            <span className="text-zinc-200">~{base.toFixed(0)}%</span>
          </div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-zinc-500 transition-all" style={{ width: `${base}%` }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-zinc-500">
            <span>prefix-affinity hit</span>
            <span className="text-green-300">~{hit.toFixed(0)}%</span>
          </div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-green-400 transition-all" style={{ width: `${hit}%` }} />
          </div>
        </div>
      </div>
      <div className="mt-3 font-mono text-[12px] text-zinc-400">
        ≈ <span className="font-bold text-white">{saved.toFixed(0)}% of prefill</span>{" "}
        skipped that round-robin would recompute.
      </div>
      <p className="mt-2 font-mono text-[11px] text-zinc-600">
        toy model — the arena on the demo site runs this for real.
      </p>
    </div>
  );
}
