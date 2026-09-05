"use client";
import { useState } from "react";

function fmt(n: number): string {
  if (n >= 1e6) return `${(n / 1e6).toFixed(n >= 1e7 ? 0 : 1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)}K`;
  return `${n}`;
}

function fmtGB(b: number): string {
  if (b >= 1e9) return `${(b / 1e9).toFixed(1)} GB`;
  return `${Math.round(b / 1e6)} MB`;
}

// Post's own math: 10 cols x 200 B DOM per row + ~2 buffer copies.
function naiveBytes(rows: number): number {
  return rows * 3400;
}

export default function MemorySim() {
  const [exp, setExp] = useState(5.7); // 10^5.7 ~= 500K
  const rows = Math.round(Math.pow(10, exp) / 1000) * 1000;
  const naive = naiveBytes(rows);
  const oom = naive > 4e9;
  const barW = Math.min(100, (Math.log10(naive) / Math.log10(200e9)) * 100);

  return (
    <div className="my-6 rounded-lg border border-white/10 bg-panel/80 p-5">
      <div className="font-mono text-[12px] text-green-300">
        <span className="text-zinc-600">$</span> ./memory_sim — drag the rows
      </div>
      <div className="mt-4 flex items-center gap-3">
        <input
          type="range"
          min={4}
          max={8.3}
          step={0.05}
          value={exp}
          onChange={(e) => setExp(parseFloat(e.target.value))}
          aria-label="row count"
          className="w-full accent-green-400"
        />
        <span className="w-20 shrink-0 text-right font-mono text-sm font-bold text-white">
          {fmt(rows)}
        </span>
      </div>
      <div className="mt-4 space-y-3 font-mono text-[12px]">
        <div>
          <div className="flex justify-between text-zinc-500">
            <span>naive (buffer everything)</span>
            <span className="text-zinc-200">{fmtGB(naive)}</span>
          </div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className={`h-full rounded-full transition-all ${oom ? "bg-white" : "bg-zinc-500"}`}
              style={{ width: `${Math.max(2, barW)}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-zinc-500">
            <span>bounded pipeline</span>
            <span className="text-green-300">7 MB</span>
          </div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[2%] rounded-full bg-green-400" />
          </div>
        </div>
      </div>
      <div
        className={`mt-4 rounded-md border p-3 font-mono text-[12.5px] ${
          oom
            ? "border-white bg-white font-bold text-black"
            : "border-green-400/30 bg-green-400/[0.06] text-green-200"
        }`}
        role="status"
      >
        {oom
          ? `✕ ${fmtGB(naive)} does not fit the 4 GB pod — and four exports share it.`
          : `✓ fits this time. Slide right until it doesn't, then re-read stage 3.`}
      </div>
    </div>
  );
}
