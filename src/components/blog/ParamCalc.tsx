"use client";
import { useState } from "react";

export default function ParamCalc() {
  const [d, setD] = useState(64);
  const [layers, setLayers] = useState(2);
  const [vocab, setVocab] = useState(256);
  // ~12*d^2 per block (attn 4d^2 + mlp 8d^2) + embeddings V*d + positions
  const params = 12 * layers * d * d + vocab * d + 32 * d;
  const mb = (params * 4) / 1e6;

  const fmtP =
    params >= 1e9
      ? `${(params / 1e9).toFixed(2)}B`
      : params >= 1e6
        ? `${(params / 1e6).toFixed(1)}M`
        : `${Math.round(params / 1e3)}K`;

  const row = "mt-1 w-full accent-green-400";
  return (
    <div className="my-6 rounded-lg border border-white/10 bg-panel/80 p-5">
      <div className="font-mono text-[12px] text-green-300">
        <span className="text-zinc-600">$</span> ./param_count — size a transformer
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="font-mono text-[11px] text-zinc-500">
            width d <span className="float-right text-zinc-200">{d}</span>
          </span>
          <input type="range" min={32} max={1024} step={32} value={d}
            onChange={(e) => setD(parseInt(e.target.value))}
            aria-label="model width" className={row} />
        </label>
        <label className="block">
          <span className="font-mono text-[11px] text-zinc-500">
            layers <span className="float-right text-zinc-200">{layers}</span>
          </span>
          <input type="range" min={1} max={24} step={1} value={layers}
            onChange={(e) => setLayers(parseInt(e.target.value))}
            aria-label="layers" className={row} />
        </label>
        <label className="block">
          <span className="font-mono text-[11px] text-zinc-500">
            vocab <span className="float-right text-zinc-200">{vocab}</span>
          </span>
          <input type="range" min={100} max={3200} step={100} value={vocab}
            onChange={(e) => setVocab(parseInt(e.target.value))}
            aria-label="vocab" className={row} />
        </label>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-center font-mono">
        <div className="rounded-md border border-white/10 bg-white/[0.02] p-3">
          <div className="text-xl font-extrabold text-green-200">{fmtP}</div>
          <div className="mt-0.5 text-[10.5px] text-zinc-600">parameters</div>
        </div>
        <div className="rounded-md border border-white/10 bg-white/[0.02] p-3">
          <div className="text-xl font-extrabold text-green-200">{mb.toFixed(1)} MB</div>
          <div className="mt-0.5 text-[10.5px] text-zinc-600">fp32 weights</div>
        </div>
      </div>
      <p className="mt-3 font-mono text-[11px] text-zinc-600">
        gpt2-cpp default (d=64, 2 layers) lands near 0.1M — small enough to hold in your head.
      </p>
    </div>
  );
}
