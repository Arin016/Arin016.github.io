---
title: "About"
layout: "single"
url: "/about/"
summary: "About me"
---

I'm Arin. I build distributed systems that process tens of millions of records for Fortune 500 identity governance. Before that, I spent four years at IIT Madras — one of the hardest engineering schools on earth to get into (JEE: top 0.2% of 1.1 million candidates) — in a program built on heavy mathematics, computational modeling, and physics. It trained me to reason about complex systems under extreme constraints. The systems just ended up being software rather than ships.

---

## The moment that hooked me

A customer's segregation-of-duties job ran **21 hours** on a 64 GB pod. It re-resolved the same organizational hierarchy for every rule — thousands of times, O(n²).

I replaced it with a single BFS pass and BitSet intersection. One CPU instruction evaluates 64 users at once.

**Two seconds. 256 MB. Byte-identical output.**

That feeling — when the right data structure collapses a problem by two orders of magnitude — is the thing I keep chasing.

---

## The work

I'm 14 months into [Saviynt](https://saviynt.com) (identity governance, 300+ enterprise tenants, AWS/Azure/GovCloud). In that time:

**I've owned the export pipeline end-to-end** — the system that generates compliance reports at scale. It streams **15 million+ records** in production, as formatted Excel inside ZIPs, directly to S3. Memory stays flat at 7 MB whether you export a thousand rows or fifteen million. Every stage is bounded independently: paginated reads → 50-row sliding window → S3 multipart upload → streaming ZIP assembly. The app is a pipe, not a bucket. [Full technical breakdown here.](/posts/streaming-excel-to-s3/)

**I've built what I believe is the first SoD engine for AI agents** — detecting toxic-combination risks when autonomous agents (Copilot Studio) accumulate conflicting capabilities. Works across individual agents, parent→child invocation chains, and credential-sharing groups. I couldn't find prior art; I defined the problem and built the solution.

**I've shipped bounded LLM agents for fraud detection** — ReAct loop over privileged-access audit logs with hard caps (≤7 iterations, 120s) and zero hallucination tolerance: every cited event is verified against source data before emission. Below 70% confidence → human review.

**I've been pulled into two company-wide security Tiger Teams** — selected over engineers with 5–10× my tenure. SQLi, RCE, IDOR remediation; mTLS across the data layer; test coverage 30% → 80%.

---

## How I got here without a CS degree

The CS happened at night. Four years of competitive programming alongside a full naval architecture courseload:

- [**LeetCode Guardian**](https://leetcode.com/u/arin371/) — 2100+, contest ranks 248 / 617 / 630 / 880
- [**Codeforces Expert**](https://codeforces.com/profile/Arin371) — 1602, top 0.3% globally
- **Meta Hacker Cup 2024** — Round 2, National 424, Global 1903

This is my substitute transcript. Verifiable, ranked against 45,000 people per contest.

---

## Beyond engineering

**Team Abhiyaan** (IIT Madras autonomous vehicles) — Led external relations. Pitched directly to India's Commerce Minister. Ran the sponsorship pipeline. If you can't explain why your system matters to someone who doesn't write code, you haven't understood it deeply enough.

**Athletics** — Football (IIT Madras city-level runner-up, Villarreal CF Academy, district champion with JHFC), Chess (district runner-up), Cricket (district all-rounder). Competing is a personality trait.

---

## Writing

- [**Streaming 25M Cells Through 5 MB of Memory**](/posts/streaming-excel-to-s3/) — the 5-stage bounded pipeline behind 15M+ record exports
- **From 21 Hours to 2 Seconds** *(coming soon)* — the full 215× story
- **SoD for AI Agents** *(coming soon)* — the novel problem of toxic combinations in autonomous agent systems

## Open source

- [**s3-outputstream**](https://github.com/Arin016/s3-outputstream) — `java.io.OutputStream` → S3 via multipart upload. 5 MB memory, any upload size. Solves a [4-year-old gap](https://github.com/aws/aws-sdk-java-v2/issues/3128) in the AWS SDK.
- [**Y**](https://github.com/Arin016/Y) — local-first RAG. Go + Ollama + Qdrant + SQLite FTS5. No API keys.
- [**xx-cli**](https://github.com/Arin016/xx-cli) — natural language → shell commands. Fully offline.

---

## What's next

I'm looking to go deeper — formally.

I can build systems that work under extreme constraints. I've done it repeatedly, at scale. But I've done it by reverse-engineering principles from production incidents at 2 AM. I know *that* my exactly-once pipeline is correct. I can't prove *why* in the general case.

I've never implemented a consensus protocol. Never built a storage engine. Never formally verified a distributed system's guarantees against the literature. I want to — with the rigor a research university provides, not just the pressure a production deadline provides.

The intuition is there. I'm after the theory that makes it transferable, and that lets me build the *next* layer of infrastructure rather than only consume it.

---

arin16tumbagi@gmail.com · [GitHub](https://github.com/Arin016) · [LinkedIn](https://linkedin.com/in/arin-mallanna)
