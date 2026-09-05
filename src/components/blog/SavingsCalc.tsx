"use client";
import { useState } from "react";

type Status = "candidate" | "pending" | "gone";

const PRESETS = [
  { id: "test", label: "test tenant", dormant: 3, identities: 6, price: 960 },
  { id: "mid", label: "mid-size tenant", dormant: 120, identities: 340, price: 960 },
  { id: "large", label: "large enterprise", dormant: 900, identities: 2600, price: 1150 },
];

const GAP = 0.8; // Advanced 1.0 → Core 0.2

const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

export default function SavingsCalc() {
  const [dormant, setDormant] = useState(120);
  const [identities, setIdentities] = useState(340);
  const [price, setPrice] = useState(960);
  const [dep, setDep] = useState<Status>("candidate");
  const [down, setDown] = useState<Status>("candidate");

  const depSave = dormant * 1.0 * price;
  const downSave = identities * GAP * price;

  const live = (save: number, st: Status) => (st === "gone" ? 0 : save);
  const total = live(depSave, dep) + live(downSave, down);
  const actionable =
    (dep === "candidate" ? depSave : 0) + (down === "candidate" ? downSave : 0);

  const load = (p: (typeof PRESETS)[number]) => {
    setDormant(p.dormant);
    setIdentities(p.identities);
    setPrice(p.price);
    setDep("candidate");
    setDown("candidate");
  };

  const card = (
    key: string,
    title: string,
    detail: string,
    save: number,
    st: Status,
    act: () => void
  ) => (
    <div
      className={`rounded-md border p-4 transition ${
        st === "gone"
          ? "border-white/10 opacity-45"
          : st === "pending"
            ? "border-white/25 bg-white/[0.03]"
            : "border-green-400/25 bg-green-400/[0.05]"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[12px] font-bold text-white">{title}</span>
        <span
          className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold ${
            st === "candidate"
              ? "bg-green-400/15 text-green-200"
              : st === "pending"
                ? "border border-white/30 text-zinc-200"
                : "text-zinc-600"
          }`}
        >
          {st === "candidate" ? "● candidate" : st === "pending" ? "◷ pending" : "✓ gone"}
        </span>
      </div>
      <div className="mt-1 font-mono text-[11px] text-zinc-500">{detail}</div>
      <div className="mt-2 font-mono text-xl font-extrabold text-green-200">
        {st === "gone" ? "$0" : money(save)}
        <span className="text-[11px] font-normal text-zinc-600"> /yr</span>
      </div>
      {st === "candidate" ? (
        <button
          onClick={act}
          className="mt-3 w-full rounded-md bg-green-400 px-3 py-2 font-mono text-[12px] font-bold text-black hover:bg-green-300"
        >
          take action →
        </button>
      ) : st === "pending" ? (
        <div className="mt-3 font-mono text-[11px] text-zinc-500">
          task created · locked for re-action until the nightly job
        </div>
      ) : (
        <div className="mt-3 font-mono text-[11px] text-zinc-600">
          access removed · finding dropped out naturally
        </div>
      )}
    </div>
  );

  return (
    <div className="my-6 rounded-lg border border-white/10 bg-panel/80 p-5">
      <div className="font-mono text-[12px] text-green-300">
        <span className="text-zinc-600">$</span> ./license_desk — find it, act on it, watch it close
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => load(p)}
            className="rounded-md border border-white/10 px-3 py-1.5 font-mono text-[11.5px] text-zinc-400 transition hover:border-green-400/40 hover:text-green-200"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-3 grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="font-mono text-[11px] text-zinc-500">
            dormant Advanced accounts{" "}
            <span className="float-right text-zinc-200">{dormant}</span>
          </span>
          <input type="range" min={0} max={2000} step={10} value={dormant}
            onChange={(e) => { setDormant(parseInt(e.target.value)); setDep("candidate"); setDown("candidate"); }}
            aria-label="dormant accounts" className="mt-1 w-full accent-green-400" />
        </label>
        <label className="block">
          <span className="font-mono text-[11px] text-zinc-500">
            over-licensed identities{" "}
            <span className="float-right text-zinc-200">{identities}</span>
          </span>
          <input type="range" min={0} max={5000} step={20} value={identities}
            onChange={(e) => { setIdentities(parseInt(e.target.value)); setDep("candidate"); setDown("candidate"); }}
            aria-label="over-licensed identities" className="mt-1 w-full accent-green-400" />
        </label>
        <label className="block">
          <span className="font-mono text-[11px] text-zinc-500">
            $ per unit / year{" "}
            <span className="float-right text-zinc-200">{price}</span>
          </span>
          <input type="range" min={100} max={2000} step={20} value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            aria-label="price per unit" className="mt-1 w-full accent-green-400" />
        </label>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {card(
          "dep",
          `Deprovision ${dormant} dormant accounts`,
          "per account · remove all roles",
          depSave,
          dep,
          () => setDep("pending")
        )}
        {card(
          "down",
          `Downgrade ${identities} identities`,
          "per user · remove excess roles only",
          downSave,
          down,
          () => setDown("pending")
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 rounded-md border border-white/10 bg-white/[0.02] p-4">
        <div className="font-mono">
          <span className="text-[11px] text-zinc-500">actionable </span>
          <span className="text-lg font-extrabold text-white">{money(actionable)}</span>
          <span className="text-[11px] text-zinc-600">/yr</span>
        </div>
        <div className="font-mono text-[11px] text-zinc-600">
          tracked total {money(total)}/yr
        </div>
        <div className="ml-auto flex gap-2">
          <button
            onClick={() => {
              if (dep === "pending") setDep("gone");
              if (down === "pending") setDown("gone");
            }}
            disabled={dep !== "pending" && down !== "pending"}
            className="rounded-md border border-green-400/40 px-3 py-2 font-mono text-[12px] text-green-200 transition hover:bg-green-400/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ☾ run nightly job
          </button>
          <button
            onClick={() => { setDep("candidate"); setDown("candidate"); }}
            className="rounded-md border border-white/10 px-3 py-2 font-mono text-[12px] text-zinc-500 hover:text-zinc-300"
          >
            reset
          </button>
        </div>
      </div>
      <p className="mt-3 font-mono text-[11px] text-zinc-600">
        the loop from the post: candidate → pending → gone. pending locks re-action;
        the job resolves what executed. measured 51/51 on live APIs.
      </p>
    </div>
  );
}
