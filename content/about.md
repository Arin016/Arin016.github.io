---
title: "About"
layout: "single"
url: "/about/"
summary: "About me"
---

I'm Arin. I went through one of the hardest engineering selection processes in the world (JEE — top 0.2% of 1.1 million candidates) to study at IIT Madras, where I spent four years in Ocean Engineering: partial differential equations, computational fluid dynamics, stochastic wave modeling, structural mechanics under extreme loads. It trained me to think about systems under constraints — just not software systems. Yet.

I now build distributed infrastructure that processes tens of millions of identity records for Fortune 500 companies. The bridge from naval architecture to systems engineering is shorter than it sounds: both are about modeling complex systems, finding where they break under load, and designing so they don't.

---

Here's the thing that got me hooked on systems: a customer's compliance job ran **21 hours** on a 64 GB machine. The architecture was fundamentally broken — it re-resolved the same organizational hierarchy for every single rule, thousands of times. I ripped it out and replaced it with one BFS pass that resolves the hierarchy once, then BitSet intersection for the actual violation detection. One CPU instruction checks 64 users simultaneously.

Two seconds. 256 MB. Same output, bit for bit.

That moment — when you see the right data structure collapse a problem from O(n²) to O(n) and the runtime goes from hours to seconds — I haven't found anything else that feels like that. I've been chasing it since.

---

## What I'm building now

I'm at [Saviynt](https://saviynt.com), working on identity governance infrastructure. Three hundred-something enterprise tenants, AWS and Azure and GovCloud, the whole circus.

**The export system** is probably the gnarliest thing I own. It generates compliance reports — sometimes 15 million records in a single export — and streams them to S3 as formatted Excel files inside a ZIP. The entire pipeline runs in 7 MB of memory regardless of how much data you throw at it. I'm not exaggerating — whether it's 1,000 rows or 15 million, memory is flat. The architecture is a pipe: data flows through, never accumulates. ([I wrote a detailed breakdown here.](/posts/streaming-excel-to-s3/))

I also built the exactly-once audit ingestion layer (50K+ records/s, 300+ tenants, Kafka + Redis idempotency), cloud-agnostic deployment across three cloud providers with 95% shared code, and the real-time progress system that tells you exactly where your 5-million-row export is at any given second.

**On the AI side** — I've been exploring a question nobody seems to have answered yet: what happens when autonomous AI agents accumulate too much access?

If a Copilot Studio agent can read your sensitive customer data AND send emails externally AND invoke other agents — that's the exact same toxic-combination problem that SoD policies solve for humans. Except nobody's built the detection engine for agents. So I did. Five risk types, works across individual agents, parent-child chains, and cross-agent groups sharing credentials. I genuinely couldn't find prior art.

I also built a fraud detection system using LLM agents that analyze privileged-access audit logs. The hard constraint: every single piece of evidence the agent cites has to actually exist in the source data. If the model hallucinates an event ID? Dropped. Below 70% confidence? Goes to a human. I don't trust language models with compliance decisions, but I trust them to generate hypotheses that I can verify mechanistically.

**Security** — twice I've been pulled into company-wide "Tiger Teams" — over people with 5–10 years on me. SQL injection, remote code execution, mTLS rollouts across the data layer. Took coverage from 30% to 80%+. I like breaking things almost as much as I like building them.

---

## The backstory

I got into IIT Madras through JEE — top 0.2% out of 1.1 million candidates. Ended up in Ocean Engineering because rankings and choices at 17 don't always align with who you become at 21.

The CS happened at night. Literally. After naval architecture coursework, I'd grind competitive programming until I couldn't keep my eyes open. Four years of that:

- [**LeetCode Guardian**](https://leetcode.com/u/arin371/) — 2100+ rating, contest ranks 248 / 617 / 630 / 880
- [**Codeforces Expert**](https://codeforces.com/profile/Arin371) — 1602, top 0.3% globally
- **Meta Hacker Cup 2024** — Round 2, National 424, Global 1903

I don't have a CS transcript. I have this instead. It's verifiable, ranked against 45,000 people per contest, and proves the algorithms are there whether or not a syllabus says so.

---

## The other stuff

**Team Abhiyaan** — IIT Madras's autonomous vehicle research team. I wasn't building the car; I was selling the vision. Led external relations, pitched directly to India's Commerce Minister for funding, ran the sponsorship pipeline, grew the team's reach 125% through PR campaigns. Learned something important: if you can't explain why your system matters to someone who doesn't write code, you haven't understood it well enough yourself.

**Sports** — Football: IIT Madras city-level runner-up, trained at Villarreal CF Academy (yes, the Spanish club), district champion with JHFC. Chess: district runner-up. Cricket: district all-rounder. I'm competitive by default. Not something I switch on and off.

---

## Writing

I write about real systems problems from production. No tutorials, no toy examples — architectures with actual numbers.

- [**Streaming 25 Million Excel Cells Through 5 MB of Memory**](/posts/streaming-excel-to-s3/) — the full 5-stage pipeline that holds O(1) memory across 15M+ records, multi-GB ZIPs, and concurrent S3 uploads on shared pods.
- **From 21 Hours to 2 Seconds** *(coming soon)* — the complete story of the 215× engine: what was broken, how I saw it, what I replaced it with.
- **SoD for AI Agents** *(coming soon)* — the novel problem and how to think about toxic combinations in autonomous agent systems.

---

## Open source

- [**s3-outputstream**](https://github.com/Arin016/s3-outputstream) — a `java.io.OutputStream` that writes directly to S3. 5 MB peak memory, any size upload. Fills a [gap the Spring Cloud AWS maintainer opened in 2022](https://github.com/aws/aws-sdk-java-v2/issues/3128) that still hasn't been addressed in the SDK.
- [**Y**](https://github.com/Arin016/Y) — local RAG over chat history. Go + Ollama + Qdrant + SQLite FTS5. No cloud, no API keys, runs on your laptop.
- [**xx-cli**](https://github.com/Arin016/xx-cli) — tell it what you want in plain English, get a shell command back. Fully offline.

---

## What's next

I'm going for an MS in Computer Science starting Fall 2027.

Here's what I know about myself: I can build systems that work under extreme constraints. I've done it repeatedly, in production, at scale. But I've done it through reverse-engineering principles from production incidents and Stack Overflow deep-dives at 2 AM. I know *that* my exactly-once pipeline works. I can't formally prove *why* it works in the general case.

I've never implemented a consensus protocol. I've never built a storage engine. I've never sat in a room with a professor who's spent 20 years thinking about distributed consistency and asked "what am I getting wrong?"

The production intuition is there. I want the rigor that makes it transferable — and that lets me build the next layer of infrastructure (consensus, storage, query planning) rather than only consume it.

---

arin16tumbagi@gmail.com · [GitHub](https://github.com/Arin016) · [LinkedIn](https://linkedin.com/in/arin-mallanna)
