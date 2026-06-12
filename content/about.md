---
title: "About"
layout: "single"
url: "/about/"
summary: "About me"
---

I'm a systems engineer at [Saviynt](https://saviynt.com), an identity governance platform serving 300+ enterprise clients across AWS, Azure, and GovCloud.

My work is distributed systems at scale: streaming pipelines (Kafka, SQS, Event Hubs), evaluation engines, multi-tenant SaaS, memory-bounded processing, and application security. Some numbers from production:

- **215× faster** segregation-of-duties evaluation engine (21 hours → 2 seconds)
- **95% memory reduction** in export pipelines (4 GB → 200 MB), zero OOM
- **25× throughput** improvement on report generation (45 min → <1 s API response)
- **50K+ records/s** exactly-once audit ingestion across 300+ tenants

Before this, I studied Ocean Engineering at IIT Madras (2021–2025) and taught myself computer science through competitive programming — [LeetCode Guardian (2100+)](https://leetcode.com/u/arin371/), [Codeforces Expert (1602)](https://codeforces.com/profile/Arin371), Meta Hacker Cup 2024 Round 2.

I write about the systems problems I encounter in production. The blog posts here are sanitized versions of real architectures — patterns and numbers, not customer names.

## Open source

- [s3-outputstream](https://github.com/Arin016/s3-outputstream) — A `java.io.OutputStream` that writes directly to S3 via multipart upload with bounded memory. Fills a [4-year gap](https://github.com/aws/aws-sdk-java-v2/issues/3128) in the AWS SDK.
- [Y (y-rag)](https://github.com/Arin016/Y) — Privacy-first local RAG assistant over chat history. Go, Ollama, Qdrant, SQLite FTS5.
- [xx-cli](https://github.com/Arin016/xx-cli) — Natural language → shell commands, fully local via Ollama.

## Contact

arin16tumbagi@gmail.com · [GitHub](https://github.com/Arin016) · [LinkedIn](https://linkedin.com/in/arin-mallanna)
