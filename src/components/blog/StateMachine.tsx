"use client";
import { useState } from "react";

const NODES = [
  {
    id: "candidate",
    x: 20,
    title: "candidate",
    body: "Waiting. The finding is computed and listed with its dollar figure. Nothing has happened yet — this is the state the nightly job produces on its own.",
  },
  {
    id: "pending",
    x: 245,
    title: "pending",
    body: "Action in flight. The admin acted, the removal task exists, the record is marked. Moves forward when the task executes, moves back when T0 expires or the task is rejected.",
  },
  {
    id: "gone",
    x: 470,
    title: "gone",
    body: "Resolved. The access is gone, so the next computation simply stops producing the finding. Nothing is deleted explicitly — it drops out naturally.",
  },
] as const;

type NodeId = (typeof NODES)[number]["id"];

export default function StateMachine() {
  const [active, setActive] = useState<NodeId>("pending");
  const node = NODES.find((n) => n.id === active)!;
  const activeIdx = NODES.findIndex((n) => n.id === active);

  return (
    <div className="my-6 rounded-lg border border-white/10 bg-panel/80 p-5">
      <div className="font-mono text-[12px] text-green-300">
        <span className="text-zinc-600">$</span> ./lifecycle — click a state
      </div>
      <svg
        viewBox="0 0 640 300"
        role="img"
        aria-label="Finding lifecycle: candidate to pending to gone, with return edge on cooldown expiry or rejection"
        className="mt-3 w-full"
      >
        <defs>
          <marker
            id="sm-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9" fill="none" stroke="#4ade80" strokeWidth="1.6" />
          </marker>
        </defs>

        {/* return edge, drawn first so nodes sit on top */}
        <path
          d="M 545 150 C 545 244 95 244 95 150"
          fill="none"
          stroke="#4ade80"
          strokeWidth="1.5"
          strokeDasharray="6 6"
          className="flowline"
          markerEnd="url(#sm-arrow)"
        />
        <text x="320" y="238" textAnchor="middle" fontSize="12" fontFamily="monospace" fill="currentColor" className="text-zinc-500">
          T0 expires / rejected
        </text>

        {/* forward edges */}
        <line x1="170" y1="112" x2="238" y2="112" stroke="#4ade80" strokeWidth="1.5"
          strokeDasharray="6 6" className="flowline" markerEnd="url(#sm-arrow)" />
        <text x="204" y="102" textAnchor="middle" fontSize="12" fontFamily="monospace" fill="currentColor" className="text-zinc-500">
          admin acts
        </text>
        <line x1="395" y1="112" x2="463" y2="112" stroke="#4ade80" strokeWidth="1.5"
          strokeDasharray="6 6" className="flowline" markerEnd="url(#sm-arrow)" />
        <text x="429" y="102" textAnchor="middle" fontSize="12" fontFamily="monospace" fill="currentColor" className="text-zinc-500">
          task executed
        </text>

        {NODES.map((n, i) => {
          const on = n.id === active;
          return (
            <g
              key={n.id}
              onClick={() => setActive(n.id)}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              aria-pressed={on}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setActive(n.id);
              }}
            >
              <rect
                x={n.x} y={84} width={150} height={56} rx={8}
                fill={on ? "rgba(74,222,128,0.12)" : "none"}
                stroke="#4ade80"
                strokeWidth={on ? 2 : 1.2}
                opacity={on ? 1 : 0.55 + i * 0.1}
              />
              <text
                x={n.x + 75} y={117} textAnchor="middle" fontSize="14"
                fontFamily="monospace" fontWeight="bold"
                fill="currentColor" className="text-zinc-100"
              >
                {n.title}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="rounded-md border border-white/10 bg-white/[0.02] p-4" aria-live="polite">
        <div className="font-mono text-[11px] text-zinc-600">
          state {activeIdx + 1} / 3 — {node.id}
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-300">{node.body}</p>
      </div>
    </div>
  );
}
