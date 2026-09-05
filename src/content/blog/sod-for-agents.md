---
title: "SoD for AI agents: toxic combinations in autonomous systems"
date: "2025-10-15"
tag: "AI SAFETY"
minutes: 13
excerpt: "Five risk types across agents, owners, chains and credential groups. AGENT_ONLY to INVOKER_COMPOSITE, in a deterministic three-pass engine."
---

Checking human permissions for dangerous combinations is a decades-old practice. But assistants that invoke other assistants and share credentials create the same hazard with no person in the loop, and I could find no existing work defining the problem for that setting. So I defined the model and built the engine.

## Why agents need SoD

A user with "create purchase order" + "approve purchase order" is a classic toxic combination. Now give an agent: read-ERP + execute-payment + external-email. Individually harmless. Combined, and delegated to a child agent with inherited credentials, it's the same fraud shape, except no human ever clicked approve.

Three scopes matter:

1. **Single agent** — capabilities granted directly to one agent.
2. **Invocation chains** — parent → child delegation accumulates effective permissions transitively.
3. **Credential-sharing groups** — agents sharing a service principal pool their reach.

## The model: 5 risk types

The engine evaluates each invocation in three passes. Per-agent, chain and group, then lifecycle. It checks against five risk types:

1. **AGENT_ONLY** — one agent holds both sides. An agent with a SharePoint knowledge source (reads data) plus an HTTP connector with no human confirmation (sends data out) is a conflict all by itself.
2. **OWNER_COMPOSITE** — the conflict spans agent tools and the owner's IGA entitlements. The bot owner holds an SAP approver role and the agent can initiate payments. Neither is a problem alone; together they break separation.
3. **CHAIN** — a parent agent invokes a child, and the union of their tool inventories completes the pair. The engine merges parent plus sub-agent into a virtual agent and evaluates the union.
4. **CROSS_AGENT** — multiple agents share a credential, owner, or invoker group, and their pooled capabilities form a conflict. The engine groups them, unions tools, knowledge and credentials, and evaluates the group.
5. **INVOKER_COMPOSITE** — the conflict between what the chatting user can do via entitlements and what the agent can do on their behalf. Modeled; gated on Graph API integration.

Each rule compiles to condition matching plus set intersection over the capability lattice. Eval runs in three passes per invocation, and every violation is tracked through its full lifecycle. Detected, acknowledged, remediated. Not just flagged once.

Click through all five. Each one is a story that actually shipped in review:

```widget-risktabs
interactive: five risk patterns explorer (requires JavaScript)
```

## One afternoon, concretely

A finance team ships a helper agent. It can read the shared drive and send email through a connector nobody configured confirmation on. Separately, its owner holds an approver role from their day job. The engine flags two patterns at once. The agent alone can exfiltrate. Together with its owner it can initiate and approve payments. Both findings cite the exact connector, the exact role, the exact edge. A human removes the email connector. Both findings close. Engine time for the snapshot: about 22 milliseconds.

## Why the model doesn't decide

A language model could read the same agent configs and opine about risk. It would also occasionally invent a connector that isn't there. Policy evaluation has to be exact and repeatable. Same graph, same verdict, every time, with every finding pointing at its evidence. The model writes the explanation paragraph afterward, from verified IDs. Judgment stays in code. Prose stays in the model.

Eval: **~22ms** per agent graph snapshot, incremental on grant/chain changes. Every finding cites the exact grants and edges. A deterministic engine, with the language model used only for explanation text whose cited IDs are verified before emission.

## Bounded fraud agents alongside it

Separately I shipped ReAct fraud-detection agents over privileged-access audit logs: ≤7 iterations, 120s hard cap, every cited event verified against source rows, <0.70 confidence → human review. Zero hallucination tolerance isn't a slogan; it's an assertion in the emit path.

## What's next

Formalize the risk lattice, prove completeness of the 5 types against a capability algebra, and publish the eval harness. If you've worked on agent policy or delegation semantics, I'd like to talk: arin16tumbagi@gmail.com.
