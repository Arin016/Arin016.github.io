---
title: "About"
layout: "single"
url: "/about/"
summary: "About me"
---

I'm a systems engineer at [Saviynt](https://saviynt.com), an identity governance platform serving 300+ enterprise clients across AWS, Azure, and GovCloud.

## What I build

**Distributed systems & streaming infrastructure:**
- A **215× faster** segregation-of-duties evaluation engine (21 hours → 2 seconds, 64 GB → 256 MB, byte-identical output). Replaced per-rule hierarchy traversal with single BFS resolution + BitSet-based set intersection — 64 entitlements evaluated per CPU instruction.
- A **25× throughput** export pipeline (45 min → <1 s API response). Two-phase async architecture: API → SQS in <1 s, worker pool streams to S3, Kafka for cross-tenant fan-out. Handles 500K–5M records per export. Evaluated and rejected Spark/Lambda/Flink with documented trade-offs.
- **95% memory reduction** (4 GB → 200 MB) via constant-memory streaming: 50-row sliding window → direct S3 multipart upload at 5 MB chunks. Sustains 4 concurrent exports on one 4 GB pod. 840K records/s for CSV at 64 MB.
- **Kafka/Avro multi-tenant streaming** with custom partition keys, transitive schema compatibility, and embedded schemas for 300+ multi-cloud clients. Exactly-once audit ingestion at 50K+ records/s (SNS + load balancer + Redis idempotency) for SOC2/GDPR compliance.
- **Cloud-agnostic deployment** across single-tenant and multi-tenant × AWS / Azure / GovCloud with 95%+ code reuse.

**AI / Agent systems:**
- **Segregation-of-Duties engine for AI agents** — a novel access-governance category. Applies toxic-combination reasoning to autonomous AI agents (Microsoft Copilot Studio): detects when an agent accumulates conflicting capabilities — alone, across parent→child invocation chains, or grouped by shared owner/credential. Rule-driven (5 risk types, 15 condition types, configurable action taxonomy), with autonomy-tier classification and event-driven delta re-evaluation. ~22 ms design-time evaluation; architected for 10K-agent batch sweeps.
- **Bounded LLM agents for audit-log threat detection** with verified zero-hallucination citations. Stateful ReAct agents over privileged-access (SAP Firefighter) audit logs under hard caps (≤7 iterations, ≤4 calls/tool, 120 s). Autonomously query Elasticsearch to confirm fraud hypotheses. Every cited record verified against source data — hallucinated IDs dropped. Findings below 0.70 confidence gate route to manual review. Fully auditable trail.
- **Local RAG assistant** (Go) — privacy-first, fully offline, no API keys. Hybrid retrieval: temporal queries via SQLite FTS5, semantic queries via Ollama (Llama 3.2, 3072-d embeddings) + Qdrant HNSW vector search. ~2–3 s end-to-end over 1,100+ indexed messages.

**Security:**
- Selected for **2 company-wide Tiger Teams** (chosen over senior engineers). Remediated SQLi, IDOR, RCE, XSS in legacy code. Enabled mTLS/TLS across Elasticsearch, Redis, MySQL, RabbitMQ. Raised test coverage 30% → 80%+.

## Background

IIT Madras, B.Tech Ocean Engineering (2021–2025). Self-taught CS through competitive programming and production work:

- **LeetCode Guardian** (2100+) — contest ranks 248, 617, 630, 880
- **Codeforces Expert** (1602) — handle [@Arin371](https://codeforces.com/profile/Arin371)
- **Meta Hacker Cup 2024** — Round 2 (National 424, Global 1903)
- JEE Mains top 0.2% (~1.1M candidates), JEE Advanced top 3% (~200K)

## Open source

- [s3-outputstream](https://github.com/Arin016/s3-outputstream) — A `java.io.OutputStream` that writes directly to S3 via multipart upload with bounded memory. Fills a [4-year gap](https://github.com/aws/aws-sdk-java-v2/issues/3128) in the AWS SDK.
- [Y (y-rag)](https://github.com/Arin016/Y) — Privacy-first local RAG assistant. Go, Ollama, Qdrant, SQLite FTS5.
- [xx-cli](https://github.com/Arin016/xx-cli) — Natural language → shell commands, fully local via Ollama.

## Contact

arin16tumbagi@gmail.com · [GitHub](https://github.com/Arin016) · [LinkedIn](https://linkedin.com/in/arin-mallanna)
