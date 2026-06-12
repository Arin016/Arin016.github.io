---
title: "About"
layout: "single"
url: "/about/"
summary: "About me"
---

I'm Arin. I studied naval architecture at IIT Madras and ended up building distributed systems that process millions of identity records across 300+ enterprise tenants. Life is non-linear.

## The short version

I'm a systems engineer at [Saviynt](https://saviynt.com). My day job is making identity governance infrastructure fast, correct, and cheap to run — across AWS, Azure, and GovCloud, at multi-tenant scale.

The thing I'm probably most proud of: I took a segregation-of-duties engine that ran **21 hours** on a 64 GB pod, replaced its O(n²) hierarchy traversal with a single BFS pass + BitSet intersection, and brought it down to **2 seconds on 256 MB** — with byte-identical output. That's a 215× speedup and 250× less memory.

Nobody taught me how to do this. I don't have a CS degree. I have competitive programming rankings, production scars, and a lot of stubbornness.

## What I'm working on now

**At Saviynt** — streaming infrastructure at scale:
- An export pipeline that pushes 500K+ row Excel reports to S3 with constant 7 MB memory (regardless of data size). The [blog post](/posts/streaming-excel-to-s3/) explains how.
- Exactly-once audit ingestion at 50K+ records/s across 300+ tenants via Kafka, Redis idempotency, and SNS fan-out.
- Cloud-agnostic deployment that runs the same codebase on AWS, Azure, and GovCloud with 95%+ code reuse.

**On the AI side** — I've been building systems that apply traditional access-control reasoning to autonomous agents:
- An **SoD engine for AI agents** — think: what happens when a Copilot Studio agent can both read sensitive data AND act externally without human approval? That's a toxic combination, same as a human holding two conflicting roles. I built the engine that detects this across individual agents, parent→child chains, and shared-credential groups. Novel problem; no prior art I could find.
- **Bounded LLM agents for fraud detection** over privileged-access audit logs. ReAct loop with hard caps (≤7 iterations, 120s), where every single cited log entry is verified against source data before emission. Hallucinated evidence gets dropped. Below 0.70 confidence → human review. Zero tolerance for ungrounded claims.
- A **local-only RAG assistant** in Go — Ollama + Qdrant + SQLite FTS5, fully offline, no API keys. Because not everything needs to hit the cloud.

**Security** — I've been on two company-wide Tiger Teams (selected over senior engineers). SQL injection, IDOR, RCE remediation in legacy code. mTLS rollouts across Elasticsearch, Redis, MySQL, RabbitMQ. Took test coverage from 30% to 80%+.

## How I got here

I came to IIT Madras through JEE (top 0.2% of 1.1M candidates) and spent four years in Ocean Engineering — fluid mechanics, naval architecture, wave theory. Good education, wrong field.

Meanwhile I was grinding competitive programming every night. Not as a hobby — as a substitute transcript:

- [**LeetCode Guardian**](https://leetcode.com/u/arin371/) — rating 2100+, contest ranks 248 / 617 / 630 / 880
- [**Codeforces Expert**](https://codeforces.com/profile/Arin371) — 1602
- **Meta Hacker Cup 2024** — Round 2 (National 424, Global 1903)

Top ~0.3% globally. That's my proof that the math and algorithms are there, even if the transcript says "Ocean Engineering."

## Open source

- [**s3-outputstream**](https://github.com/Arin016/s3-outputstream) — a `java.io.OutputStream` backed by S3 multipart upload. 5 MB peak memory, any upload size. Fills a [4-year-old gap](https://github.com/aws/aws-sdk-java-v2/issues/3128) in the AWS SDK that the Spring Cloud AWS maintainer opened in 2022.
- [**Y**](https://github.com/Arin016/Y) — local RAG over chat history. Go + Ollama + Qdrant + SQLite. Privacy-first, no API keys.
- [**xx-cli**](https://github.com/Arin016/xx-cli) — describe what you want in English, get a shell command. Fully local.

## What's next

I'm applying to MS programs in computer science (Fall 2027) to build the formal foundations underneath everything I've self-taught — consensus protocols, storage engines, formal verification. The production intuition is there; I want the theory that makes it transferable.

## Get in touch

arin16tumbagi@gmail.com · [GitHub](https://github.com/Arin016) · [LinkedIn](https://linkedin.com/in/arin-mallanna)
