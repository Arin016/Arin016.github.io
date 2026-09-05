export const LINKS = {
  github: "https://github.com/Arin016",
  linkedin: "https://linkedin.com/in/arin-mallanna",
  email: "mailto:arin16tumbagi@gmail.com",
  leetcode: "https://leetcode.com/u/arin371/",
  codeforces: "https://codeforces.com/profile/Arin371",
  nostos: "https://kv-router.vercel.app",
  kyn: "https://kyn-blush.vercel.app",
};

export type Stat = { k: string; v: string; sub: string };

export const STATS: Stat[] = [
  { k: "≈400×", v: "compliance check", sub: "21h → ~3 min · compute is 2 s" },
  { k: "7 MB", v: "flat at any scale", sub: "15M+ rows proven · no upper bound" },
  { k: "50K+/s", v: "audit events", sub: "none lost, none double-counted" },
  { k: "live", v: "license inference", sub: "any accounts · unbounded findings" },
  { k: "2100+", v: "LeetCode peak", sub: "Codeforces Expert · Hacker Cup R2" },
  { k: "300+", v: "enterprise tenants", sub: "AWS · Azure · GovCloud" },
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
    title: "License waste, found and removed",
    metric: "live inference",
    body: "Companies pay SAP per user, priced by access level. Most quietly overpay for dormant accounts and over-privileged users. I built the inference engine that finds this waste. It reads access data and infers savings opportunities, any number of accounts or identities, with dollar figures attached. Then it acts on them, creating removal tasks with records that survive the nightly data refresh. Validated 51/51 against live APIs, through two rounds of senior review.",
    stack: ["Java", "Spring Boot", "Kafka Avro", "OpenSearch"],
  },
  {
    id: "sod-engine",
    tag: "COMPLIANCE ENGINE",
    title: "A day-long audit check, rebuilt to seconds",
    metric: "21h → ~3 min",
    body: "Large companies must continuously prove that no employee holds conflicting permissions. For example, the ability to both create and approve the same payment. Running this check across hundreds of thousands of accounts took one customer 21 hours, because the old system re-examined the organization hierarchy separately for every rule. I rebuilt the engine to resolve the hierarchy once and compare permissions with bit-level operations. Compute fell to 2 seconds in 256 MB, and with database writes the whole job now finishes in about 3 minutes. Output identical, row for row.",
    stack: ["Java", "Raw JDBC", "BitSet", "OpenSearch"],
  },
  {
    id: "export-pipe",
    tag: "DATA EXPORT",
    title: "Million-row reports that fit in 7 MB",
    metric: "unbounded · 7 MB flat",
    body: "Audit and compliance teams periodically need complete data exports. Millions of rows formatted as Excel workbooks. The previous exporter assembled entire workbooks in memory and crashed on large reports, typically during audit season. I rebuilt it as a pipeline where each stage handles only a small window of data at a time. It reads, formats, uploads, and archives in a continuous flow, so memory stays flat at 7 MB. 15M+ rows proven in production, with no upper bound in the design.",
    stack: ["Java", "POI SXSSF", "S3 multipart", "ZIP streaming"],
  },
  {
    id: "audit-ingest",
    tag: "DATA INGESTION",
    title: "Audit records you can count on",
    metric: "50K+/s · 300 tenants",
    body: "Every privileged action on the platform becomes an audit record. Who accessed what, and when. These records feed fraud detection and regulatory audits, so none may go missing and none may be counted twice, across more than 300 customer organizations sharing the same infrastructure. I built the ingestion path with ordered, replayable streams and duplicate-proof storage, sustaining over 50,000 events per second and running unchanged across three cloud environments.",
    stack: ["Kafka", "Avro", "MySQL", "Redis"],
  },
  {
    id: "agent-sod",
    tag: "AI SAFETY",
    title: "The same fraud check, for AI agents",
    metric: "~22ms per check",
    body: "Companies now build AI assistants that hold tools, data access, and login credentials. These assistants can call other assistants or share credentials with them. The dangerous permission combinations we police in humans quietly reappear, with no person in the loop. I built an engine that examines each agent setup for five such patterns. A single over-privileged agent, conflicts spanning an agent and its owner's permissions, delegation chains between agents, credential-sharing groups, and actions taken on a user's behalf. Each setup evaluates in about 22 milliseconds, and every finding is tracked until it is resolved.",
    stack: ["Java", "Spring Boot", "Graph analysis", "Raw JDBC"],
  },
  {
    id: "fraud-agents",
    tag: "AI MONITORING",
    title: "AI investigators with mandatory evidence",
    metric: "verified citations only",
    body: "The most sensitive accounts in a company are emergency 'break-glass' administrator accounts, and their activity logs are where insider fraud appears. I built software agents that investigate these logs on their own. Each pursues one fraud hypothesis with a strict budget of steps and time, and any log entry it cites as evidence is automatically re-checked against the source data. Unverifiable claims are discarded, and uncertain findings go to a human reviewer. New fraud patterns are added through a configuration file, without changing code.",
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
    desc: "Lets Java programs write data of any size to cloud storage using a fixed 5 MB of memory, instead of buffering everything first.",
    lang: "Java",
    url: "https://github.com/Arin016/s3-outputstream",
    highlight: "Fills a 4-year gap in the AWS toolkit",
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
    title: "Exports without an upper bound, in 7 MB of memory",
    date: "2025-06-12",
    minutes: 19,
    tag: "STREAMING",
    excerpt:
      "How compliance reports too large to hold in memory get generated anyway. Read a little, format a little, upload a little, repeat. No stage is ever allowed to grow.",
    status: "live",
  },
  {
    slug: "21-hours-to-2-seconds",
    title: "From 21 hours to 3 minutes, via 2 seconds of compute",
    date: "2025-09-01",
    minutes: 15,
    tag: "PERF",
    excerpt:
      "A compliance check re-examined the company hierarchy once per rule. Resolving it a single time collapsed a day of computing into minutes. 2 seconds of compute, the rest database writes, identical results.",
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
