---
title: "About"
layout: "single"
url: "/about/"
summary: "About me"
---

I'm Arin. I studied naval architecture at IIT Madras and ended up building distributed systems that process tens of millions of identity records across 300+ enterprise tenants. Life is non-linear.

## The short version

I'm a systems engineer at [Saviynt](https://saviynt.com). I design and build the infrastructure behind identity governance at enterprise scale — the systems that answer "who has access to what, and should they?"

The thing I'm most proud of: a segregation-of-duties evaluation engine that took **21 hours** on a 64 GB pod. I replaced its O(n²) per-rule hierarchy traversal with a single BFS resolution pass and BitSet-based set intersection — one CPU instruction evaluates 64 users simultaneously — and brought it to **2 seconds on 256 MB.** Byte-identical output. Zero false positives. Processes 50K violations across 750K entitlements every 12 hours in production.

Nobody taught me how to do this. I don't have a CS degree. I have competitive programming rankings, production pressure, and the kind of stubbornness that turns a 21-hour job into a 2-second one.

## What I build

**Streaming infrastructure that scales to infinity by design:**

I built the export pipeline that generates compliance reports for Saviynt's clients. It streams **15 million+ records** in production today — but the architecture is size-agnostic by construction. Whether you export 1,000 rows or 100 million, memory stays flat at 7 MB. The system doesn't know how much data is coming, and it doesn't need to.

The trick: every stage is bounded independently. Paginated DB reads → 50-row sliding window Excel generation → chunked S3 multipart upload → streaming ZIP assembly where source files are pulled from S3 and piped directly into the output ZIP, byte by byte, with a 2 MB read buffer and a 5 MB write buffer. Nothing accumulates. The app is a pipe, not a bucket. ([Technical deep-dive here.](/posts/streaming-excel-to-s3/))

**The numbers:**
- **215× compute speedup** on the SoD engine (21 h → 2 s)
- **15M+ records** exported at production scale, memory-bounded at 64 MB
- **50K+ records/s** exactly-once audit ingestion for SOC2/GDPR
- **840K records/s** CSV throughput at 64 MB heap
- **4 concurrent large exports** on a single 4 GB pod — zero OOM since deployment
- **300+ tenants** across AWS, Azure, and GovCloud on one codebase (95%+ reuse)

**AI agent governance — a problem I defined from scratch:**

What happens when a Microsoft Copilot Studio agent can read sensitive data AND take external actions without human approval? That's a toxic combination — the same risk that segregation-of-duties policies enforce for humans, applied to autonomous agents. I couldn't find prior art, so I built it.

The engine evaluates risk across individual agents, parent→child invocation chains, and cross-agent groups that share credentials. Five risk types, 15 condition types, configurable action taxonomy, automatic autonomy-tier classification. Event-driven: only dirty agents get re-evaluated. Design-time evaluation in ~22 ms.

**Bounded LLM agents with zero hallucination tolerance:**

I built an AI system that detects fraud and insider threats in privileged-access audit logs (SAP Firefighter). Stateful ReAct agents run under hard caps — ≤7 iterations, ≤4 calls per tool, 120 seconds wall-clock — and autonomously query Elasticsearch to build and verify hypotheses.

The key constraint: every piece of evidence the agent cites is verified against the source data. If the agent hallucinates an event ID that doesn't exist in the logs, it gets dropped before reaching the output. Below 0.70 confidence → routed to a human. The system is auditable end to end. Zero tolerance for ungrounded claims in a compliance context.

**Security:**

Two company-wide Tiger Teams — selected over senior engineers with 5–10× my tenure. SQL injection, IDOR, RCE, XSS remediation across the legacy platform. mTLS/TLS rollouts across Elasticsearch, Redis, MySQL, RabbitMQ. Test coverage: 30% → 80%+.

## How I got here

IIT Madras through JEE (top 0.2% of 1.1 million candidates). Four years of fluid mechanics, wave theory, and naval architecture. Rigorous, mathematical, wrong field.

The CS education happened in parallel — every night after coursework, for four years. Not auditing MOOCs. Competing:

- [**LeetCode Guardian**](https://leetcode.com/u/arin371/) — 2100+ rating. Contest ranks: 248, 617, 630, 880.
- [**Codeforces Expert**](https://codeforces.com/profile/Arin371) — 1602. Top ~0.3% globally.
- **Meta Hacker Cup 2024** — Round 2. National 424, Global 1903.

This is what I have instead of a CS transcript. Verifiable, ranked, and harder to game than grades.

## Open source

- [**s3-outputstream**](https://github.com/Arin016/s3-outputstream) — a `java.io.OutputStream` backed by S3 multipart upload. Bounded 5 MB memory, any upload size. Fills a [4-year-old gap](https://github.com/aws/aws-sdk-java-v2/issues/3128) in the AWS SDK that the Spring Cloud AWS maintainer opened in 2022 and nobody has solved in the SDK since.
- [**Y**](https://github.com/Arin016/Y) — local-first RAG over chat history. Go, Ollama, Qdrant, SQLite FTS5. Zero API keys.
- [**xx-cli**](https://github.com/Arin016/xx-cli) — natural language → shell commands, fully offline.

## What's next

I'm pursuing an MS in Computer Science (Fall 2027) to build the formal foundations underneath everything I've learned through production. I've never implemented a consensus protocol. I've never formally verified a pipeline's exactly-once semantics against the literature. I've never built a storage engine from scratch. I want to — and I want to do it with the rigor that a research university provides, not just the pressure that a production deadline provides.

The intuition is there. The theory that makes it transferable — and that lets me build the next layer of infrastructure rather than consume it — that's what I'm after.

## Get in touch

arin16tumbagi@gmail.com · [GitHub](https://github.com/Arin016) · [LinkedIn](https://linkedin.com/in/arin-mallanna)
