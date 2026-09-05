"use client";
import { useState } from "react";

const RISKS = [
  {
    id: "AGENT_ONLY",
    one: "One agent holds both sides.",
    ex: "A helper with a SharePoint reader plus an HTTP sender with no human confirmation. Reads data, sends it out, alone.",
  },
  {
    id: "OWNER_COMPOSITE",
    one: "Agent tools plus the owner's own permissions.",
    ex: "The bot owner holds an SAP approver role; the agent can initiate payments. Harmless apart. Together they break separation.",
  },
  {
    id: "CHAIN",
    one: "A parent agent plus the child it calls.",
    ex: "Parent reads the ERP, child can execute payments. The engine merges both into one virtual agent and judges the union.",
  },
  {
    id: "CROSS_AGENT",
    one: "Several agents pooling one credential.",
    ex: "Three assistants share a service account. Each looks innocent. Their combined reach completes the pair.",
  },
  {
    id: "INVOKER_COMPOSITE",
    one: "What you can do, plus what the agent does for you.",
    ex: "You hold the approval right; the agent you chat with can initiate. The pair exists only in the session between you.",
  },
];

export default function RiskTabs() {
  const [active, setActive] = useState(RISKS[0]);
  return (
    <div className="my-6 rounded-lg border border-white/10 bg-panel/80 p-5">
      <div className="font-mono text-[12px] text-green-300">
        <span className="text-zinc-600">$</span> ./risk_types — click through all five
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {RISKS.map((r) => (
          <button
            key={r.id}
            onClick={() => setActive(r)}
            aria-pressed={active.id === r.id}
            className={`rounded-md border px-2.5 py-1.5 font-mono text-[11px] transition ${
              active.id === r.id
                ? "border-green-400/60 bg-green-400/15 text-green-100"
                : "border-white/10 text-zinc-500 hover:border-white/25 hover:text-zinc-300"
            }`}
          >
            {r.id}
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-md border border-white/10 bg-white/[0.02] p-4">
        <div className="font-mono text-[13px] font-bold text-white">{active.one}</div>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{active.ex}</p>
      </div>
    </div>
  );
}
