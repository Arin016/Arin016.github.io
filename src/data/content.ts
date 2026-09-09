export const LINKS = {
  github: "https://github.com/Arin016",
  linkedin: "https://linkedin.com/in/arin-mallanna",
  email: "mailto:arin16tumbagi@gmail.com",
  leetcode: "https://leetcode.com/u/10Ari/",
  codeforces: "https://codeforces.com/profile/Arin371",
  nostos: "https://kv-router.vercel.app",
  kyn: "https://kyn-blush.vercel.app",
};

export type Stat = { k: string; v: string; sub: string };

export const STATS: Stat[] = [
  { k: "~20h → mins", v: "compliance check", sub: "large-enterprise worst case · <1GB" },
  { k: "5 MiB", v: "S3 part buffer", sub: "explicit commit semantics · v2.0.0 on Central" },
  { k: "cited", v: "agent evidence", sub: "verified IDs only · humans decide the rest" },
  { k: "live", v: "license inference", sub: "computed findings · tasks that survive refresh" },
  { k: "2077", v: "LeetCode peak", sub: "Codeforces Expert 1602 · Meta Hacker Cup R2" },
  { k: "s3-outputstream", v: "open source", sub: "Apache-2.0 · real-S3 conformance receipt" },
];

export type Work = {
  id: string;
  tag: string;
  title: string;
  metric: string;
  body: string;
  stack: string[];
};

export const WORK: Work[] = [
  {
    id: "license-intel",
    tag: "LICENSE INTELLIGENCE",
    title: "License waste, found and priced",
    metric: "recommendation engine",
    body: "Companies pay SAP per user, priced by access level. Most quietly overpay for dormant accounts and over-privileged users. I built the recommendation engine that finds this waste: findings computed live from the search index at request time, priced in dollars, acted on through one action call that fans out into removal tasks with de-duplication. Action records live on the identity document and survive the nightly data replacement through merge/strip/prune. Validated 51/51 against live APIs in test, through two rounds of senior review; a test tenant showed seven findings worth about $11,000 a year. Test result, not a production savings claim.",
    stack: ["Java", "Spring Boot", "Kafka Avro", "OpenSearch"],
  },
  {
    id: "sod-engine",
    tag: "COMPLIANCE ENGINE",
    title: "A day-long audit check, rebuilt to minutes",
    metric: "~20h → mins",
    body: "Large companies must continuously prove that no employee holds conflicting permissions. For example, the ability to both create and approve the same payment. For one large enterprise production workload, this check took about 20 hours at 65 GB because the old system re-examined the organization hierarchy separately for every rule. I rebuilt the engine to resolve the hierarchy once and compare permissions with bit-level operations. The redesigned path runs in a few minutes under about 1 GB, with matching violations across the rollout comparisons. Worst-case production scope, not a lab benchmark.",
    stack: ["Java", "Raw JDBC", "BitSet", "OpenSearch"],
  },
  {
    id: "export-pipe",
    tag: "DATA EXPORT",
    title: "Excel exports that stream to S3",
    metric: "5 MiB buffer · v2.0.0",
    body: "Audit and compliance teams periodically need complete data exports as formatted Excel workbooks in S3. The previous exporter assembled entire workbooks in memory and crashed on large reports. I built s3-outputstream, an Apache-2.0 Java OutputStream over S3 multipart with one reusable 5 MiB part buffer and explicit commit/abort semantics: commit publishes, close aborts. v2.0.0 is on Maven Central with a real-S3 conformance receipt. Bounded application buffering, not bounded total process memory — producer, SDK and per-part overhead are separate budgets.",
    stack: ["Java", "POI SXSSF", "S3 multipart", "ZIP streaming"],
  },
  {
    id: "audit-ingest",
    tag: "DATA INGESTION",
    title: "Audit records you can count on",
    metric: "ordered · replayable",
    body: "Every privileged action on the platform becomes an audit record. Who accessed what, and when. These records feed fraud review and regulatory audits, so the ingestion path uses ordered, replayable streams with duplicate-proof storage: publish first, mark after, merge rather than replace on refresh. Throughput and tenant counts stay out of this description until measured on a defined workload and cleared for disclosure.",
    stack: ["Kafka", "Avro", "MySQL", "Redis"],
  },
  {
    id: "agent-sod",
    tag: "AI SAFETY",
    title: "The same fraud check, for AI agents",
    metric: "5 patterns · deterministic",
    body: "Companies now build AI assistants that hold tools, data access, and login credentials. These assistants can call other assistants or share credentials with them. The dangerous permission combinations we police in humans quietly reappear, with no person in the loop. I formulated effective access for agents across five patterns — a single over-privileged agent, conflicts spanning agent and owner, delegation chains, credential-sharing groups, actions on a user's behalf — and built a deterministic evaluation engine where every finding cites its evidence and is tracked to resolution. Latency and deployment scope stay out until measured and cleared.",
    stack: ["Java", "Spring Boot", "Graph analysis", "Raw JDBC"],
  },
  {
    id: "fraud-agents",
    tag: "AI MONITORING",
    title: "AI investigators with mandatory evidence",
    metric: "110 tests · 46/46 synthetic",
    body: "The most sensitive accounts in a company are emergency 'break-glass' administrator accounts, and their activity logs are where insider fraud appears. I built bounded investigator agents that pursue one fraud hypothesis with strict budgets, with every cited event re-checked against source data and uncertain findings routed to humans. The public research harness holds 110 tests and matched all 46 held-out synthetic variants with no unsupported claims — control-flow evidence, not real-world accuracy. No customer or deployment language by policy.",
    stack: ["Python", "ReAct", "Elasticsearch", "YAML policies"],
  },
  {
    id: "tiger",
    tag: "SECURITY",
    title: "Company-wide security initiatives",
    metric: "coverage 30% → 80%",
    body: "Twice in my first year I was asked to join temporary, company-wide security teams addressing systemic issues. Categories of injection and access-control flaws found across services, encrypted internal communication between data systems, and test coverage on critical components, which rose from 30% to 80%. The work was unglamorous and cross-team by design. It prevents incidents rather than responding to them.",
    stack: ["AppSec", "mTLS", "SAST/DAST", "Testing"],
  },
];

export const AI_WORK: Work[] = [
  {
    id: "nostos",
    tag: "AI INFRASTRUCTURE",
    title: "Send each request where its past already lives",
    metric: "less recomputation",
    body: "When you continue a conversation with a large language model, the serving computers keep a cache of what came before, so follow-up questions avoid redoing work. But in a fleet of machines, a standard load balancer sends your follow-up to a random server, which recomputes everything. Nostos, a router I built, instead sends each request to the server whose cache already holds that conversation. It weighs cache overlap against queue length and memory load. It remembers fingerprints of past text, never the text itself, and passes responses through without buffering. A public demo lets you race routing strategies against each other.",
    stack: ["Go", "Radix trees", "vLLM / TGI", "React"],
  },
  {
    id: "arinlm",
    tag: "LEARNING IN PUBLIC",
    title: "A language model built by hand",
    metric: "no model libraries",
    body: "To understand language models from the inside, I implemented a small one in PyTorch while deliberately refusing the framework's ready-made model components. Embeddings, attention, and decoder blocks all written out explicitly, each stage tested before the next. The model is tiny on purpose, so that internal quantities like the attention matrix stay small enough to read directly. Since ported to dependency-free C++17 as gpt2-cpp, with a five-test correctness harness. And since trained for real as lm-train: 0.818M params on Shakespeare, val loss 1.75.",
    stack: ["Python", "PyTorch", "Transformers", "pytest"],
  },
  {
    id: "cuda-t",
    tag: "LEARNING IN PUBLIC",
    title: "The same model, one level deeper",
    metric: "in progress",
    body: "Now the same transformer implemented directly in the graphics processor's own programming language, with every computation kernel written by hand. It starts from matrix multiplication checked against an ordinary CPU reference, moves through attention and normalization, and heads toward a full training run and an optimized attention variant benchmarked against PyTorch. The goal is a working understanding of how GPUs actually execute programs. Memory movement, parallel scheduling, occupancy. Not familiarity with an API, but with the machine. In progress; each phase must pass its tests before the next begins.",
    stack: ["CUDA", "C++", "CPU reference", "Colab T4"],
  },
];

export const COLLEGE: OSS[] = [
  {
    name: "RubiksCubeSolver",
    desc: "A Rubik's cube modeled as a graph problem: BFS, DFS, IDDFS and IDA* solvers with pattern-database heuristics, built as an OOP exercise in representations.",
    lang: "C++",
    url: "https://github.com/Arin016/RubiksCubeSolver",
    highlight: "IDA* + pattern databases",
  },
  {
    name: "White-Board",
    desc: "A hand-drawn-style browser whiteboard: canvas tools, toolbar and toolbox state, freehand stroke rendering. Where UI state management clicked for me.",
    lang: "JavaScript",
    url: "https://github.com/Arin016/White-Board",
    highlight: "roughjs · perfect-freehand",
  },
  {
    name: "RCNNandYoloV8Helmet",
    desc: "Helmet detection on 5K images. Fine-tuned Faster R-CNN against YOLOv8 on an imbalanced dataset. YOLO won on both accuracy and speed, measured, not assumed.",
    lang: "Jupyter",
    url: "https://github.com/Arin016/RCNNandYoloV8Helmet",
    highlight: "YOLOv8 63.4% mAP @ 10ms",
  },
];

export type UpstreamPR = {
  repo: string;
  num: string;
  title: string;
  state: "merged" | "open";
  url: string;
};

export const UPSTREAM: UpstreamPR[] = [
  {
    repo: "kirodotdev/KiroCrew",
    num: "#8773",
    title: "Skip heavy CLI imports for bare --version",
    state: "open",
    url: "https://github.com/kirodotdev/KiroCrew/pull/8773",
  },
  {
    repo: "EleutherAI/lm-evaluation-harness",
    num: "#4104",
    title: "Evaluate every CoQA turn; keep legacy last-turn variant",
    state: "open",
    url: "https://github.com/EleutherAI/lm-evaluation-harness/pull/4104",
  },
  {
    repo: "sgl-project/sglang",
    num: "#38045",
    title: "Accounting-contract tests for classic RadixCache",
    state: "open",
    url: "https://github.com/sgl-project/sglang/pull/38045",
  },
  {
    repo: "opensearch-project/OpenSearch",
    num: "#22136",
    title: "Remove AgentPolicy startup log",
    state: "merged",
    url: "https://github.com/opensearch-project/OpenSearch/pull/22136",
  },
  {
    repo: "opensearch-project/opensearch-go",
    num: "#881",
    title: "Remove deprecated ToPointer helper",
    state: "open",
    url: "https://github.com/opensearch-project/opensearch-go/pull/881",
  },
];

export type OSS = {
  name: string;
  desc: string;
  lang: string;
  url: string;
  highlight: string;
};

export const OSS_LIST: OSS[] = [
  {
    name: "s3-outputstream",
    desc: "A Java OutputStream over S3 multipart with one reusable 5 MiB buffer and explicit commit/abort semantics. v2.0.0 on Maven Central.",
    lang: "Java",
    url: "https://github.com/Arin016/s3-outputstream",
    highlight: "Commit-safe streaming + real-S3 receipt",
  },
  {
    name: "mica",
    desc: "A glass desktop markdown app. Your vault is a folder of .md files: two panes, slash commands, wikilinks, command palette, offline. Tauri 2, dark by default, with a live landing page and a Mac release.",
    lang: "TypeScript",
    url: "https://github.com/Arin016/mica",
    highlight: "live landing + signed DMG",
  },
  {
    name: "gpt2-cpp",
    desc: "GPT-2 in dependency-free C++17: tensor core to greedy decode in seven commits, verified by five correctness tests. No frameworks, no BLAS.",
    lang: "C++",
    url: "https://github.com/Arin016/gpt2-cpp",
    highlight: "causality proven, not assumed",
  },
  {
    name: "lm-train",
    desc: "The missing run: 0.818M-param char GPT trained end to end on Shakespeare. Loss curves, checkpoint samples, reproduce command.",
    lang: "Python",
    url: "https://github.com/Arin016/lm-train",
    highlight: "val loss 1.75, committed",
  },
  {
    name: "raft-cpp",
    desc: "Raft consensus in dependency-free C++17: election, replication, KV machine, chaos-tested across seeds. Simulated transport, documented honestly.",
    lang: "C++",
    url: "https://github.com/Arin016/raft-cpp",
    highlight: "single-leader safety, proven",
  },
  {
    name: "context-lattice",
    desc: "Gives AI coding assistants a searchable memory of past work where every recalled fact links back to its source file and a cryptographic fingerprint.",
    lang: "Python",
    url: "https://github.com/Arin016/context-lattice",
    highlight: "Every recall cites its source",
  },
  {
    name: "kyn",
    desc: "A control panel for long-running AI coding agents: named agents with persistent memory, scheduled tasks, and human approval gates before consequential actions.",
    lang: "Python",
    url: "https://github.com/Arin016/kyn",
    highlight: "Agents act, humans approve",
  },
  {
    name: "Y",
    desc: "Private search over my own exported chat history. It handles questions about timing ('what did we discuss last month?') and runs fully offline, with no data leaving the machine.",
    lang: "Go",
    url: "https://github.com/Arin016/Y",
    highlight: "Offline, no API keys",
  },
  {
    name: "xx-cli",
    desc: "Type a request in plain English, get the terminal command. Shown for review before anything runs. Fully offline.",
    lang: "Go",
    url: "https://github.com/Arin016/xx-cli",
    highlight: "Plain English → shell",
  },
  {
    name: "friday",
    desc: "A single searchable index of AI coding sessions scattered across three different tools. Read-only, with one-keystroke return to the original session.",
    lang: "Go",
    url: "https://github.com/Arin016/friday",
    highlight: "Every session, one view",
  },
  {
    name: "bug-butcher",
    desc:       "A safety harness for delegating bug fixes to AI agents. The repair plan is agreed first, edits are fenced to approved files, and a failing-then-passing test is required before a human merges.",
    lang: "Python",
    url: "https://github.com/Arin016/bug-butcher",
    highlight: "Plan, fence, prove, merge",
  },
];

export type Post = {
  slug: string;
  title: string;
  date: string;
  minutes: number;
  tag: string;
  excerpt: string;
  status: "live" | "soon";
};

export const POSTS: Post[] = [
  {
    slug: "unused-permissions-priced-in-dollars",
    title: "Unused permissions, priced in dollars",
    date: "2026-08-25",
    minutes: 15,
    tag: "PLATFORM",
    excerpt:
      "A license-saving feature end to end: live-computed findings, one action that becomes removal tasks, and action records engineered to survive the nightly data refresh.",
    status: "live",
  },
  {
    slug: "route-to-the-prefix",
    title: "Route to the machine that already knows the conversation",
    date: "2026-02-10",
    minutes: 14,
    tag: "INFERENCE",
    excerpt:
      "Most AI serving cost is re-reading conversations a computer has already seen. Nostos sends each request where its past already lives, and a public arena lets you race routing strategies against each other.",
    status: "live",
  },
  {
    slug: "gpt-from-scratch-thrice",
    title: "A language model from scratch, three times",
    date: "2026-01-18",
    minutes: 13,
    tag: "ML",
    excerpt:
      "The same transformer at three levels: PyTorch with no shortcuts, dependency-free C++ with tests green, raw GPU code in progress. What changes each time you rebuild it.",
    status: "live",
  },
  {
    slug: "streaming-excel-to-s3",
    title: "An S3 OutputStream needs a success signal",
    date: "2026-09-10",
    minutes: 19,
    tag: "STREAMING",
    excerpt:
      "A failed export can leave a successful S3 object. Explicit commit/abort semantics, bounded buffering, and failure behavior, verified against real S3.",
    status: "live",
  },
  {
    slug: "21-hours-to-2-seconds",
    title: "From ~20 hours to minutes: a compliance check, re-examined once",
    date: "2025-09-01",
    minutes: 15,
    tag: "PERF",
    excerpt:
      "A compliance check re-examined the company hierarchy once per rule. Resolving it a single time collapsed a worst-case production run into minutes.",
    status: "live",
  },
  {
    slug: "sod-for-agents",
    title: "Fraud checks for AI agents",
    date: "2025-10-15",
    minutes: 13,
    tag: "AI SAFETY",
    excerpt:
      "AI assistants accumulate tools and credentials the way employees accumulate permissions, including the dangerous combinations. Five patterns, one deterministic engine, every finding tracked to resolution.",
    status: "live",
  },
];
