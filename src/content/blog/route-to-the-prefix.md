---
title: "Route to the machine that already knows the conversation"
date: "2026-02-10"
tag: "INFERENCE"
minutes: 14
excerpt: "Most AI serving cost is re-reading conversations a computer has already seen. Nostos sends each request where its past already lives. Plus a public arena for racing routing strategies."
---

I named it Nostos — νόστος, homecoming. The observation: every follow-up message in a chat repeats almost the entire conversation, and the computers serving these models keep a cache of processed conversation (called a KV cache) precisely to avoid redoing that work. But in a fleet of machines, an ordinary load balancer sends your follow-up to a random server, which recomputes everything. Nostos asks a different question: **which healthy server already holds this conversation?**

## The mechanism

Nostos sits in front of standard model-serving software as a small, fast program written in Go:

```
client ──new message──▶ Nostos ──▶ serving machines
                              │
           fingerprint earlier │ messages
           look up which machines
             have seen them
           weigh cache overlap against
             queue length and memory load
           reserve capacity
                              │ forward message,
                              │ stream the reply back
```

For each machine, Nostos keeps a compact lookup structure (a radix tree) recording fingerprints of conversation it has plausibly seen. Fingerprints, never the text. An incoming message's fingerprints are checked against every machine's tree, and the score balances expected saved recomputation against current queue length and memory pressure. The winner's capacity is reserved atomically before anything is forwarded, so concurrent requests can't double-book a machine.

Two properties I treated as non-negotiable:

1. **It remembers where, not what.** The router records *that* a machine saw a conversation fingerprint, never the conversation. No user text touches disk. These structures are navigation aids, not logs.
2. **It never slows the reply.** Responses stream through Nostos as they are generated, not buffered. A router that adds delay to every word of every answer defeats its own purpose.

## The score, concretely

```
score = expected_hit × prefix_len − queue_penalty − pressure
```

Expected hit comes from the radix lookup: how many leading blocks this machine has plausibly seen. Queue penalty is current depth. Pressure is memory load. The three terms have different units, so the weights are tuned empirically in the arena, not derived. Then the winner's slot is reserved atomically before proxying, because two concurrent requests must never both claim the last slot.

Try the tradeoff yourself:

```widget-routersim
interactive: routing policy comparison toy (requires JavaScript)
```

## Why this, and not just sticky sessions

Sending each user back to the same machine (a "sticky session") covers the common case, but breaks down the moment sessions move between machines, many users share the same opening instructions, or the fleet grows and mappings go stale. Routing by *content already resident* generalizes stickiness: it helps one long conversation and a thousand users sharing a system prompt with the same machinery.

## What can go wrong

Affinity goes stale. Machines restart, fleets rescale, and yesterday's evidence misleads. So evidence is bounded and decays. A backend earns its score continuously or loses it. Cold machines still need traffic to warm up, so every backend keeps a floor score. Pure exploitation would starve newcomers forever. And the router never stores prompts, only hashes, which bounds the damage if the router itself is ever compromised.

## The arena

The most instructive part was the demo site: an interactive routing arena where you can compare policies. Round-robin, least-queue, prefix-affinity, against the same synthetic workload, watching where recomputation cost actually goes. Building the visualization forced me to make the scoring honest. When your policy loses to round-robin on some workload in public, you learn exactly which term in the score is wrong.

This is inference systems work, not model work. That's deliberate. The scarcest resource in serving isn't parameters, it's the memory holding yesterday's context. Routing is a small lever on a very large cost.

*Code: [github.com/Arin016/kv-router](https://github.com/Arin016/kv-router) · Demo: [kv-router.vercel.app](https://kv-router.vercel.app)*
