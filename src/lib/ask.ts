// ask.ts — the knowledge layer behind the hero terminal and /ask.
// Keyword matching over a curated base. No network, no model.
// ask()/askRich() answer single-best (terminal contract); runAgent() runs
// the fuller loop for /ask: retrieve top passages, merge ties, verify
// citations exist, and suggest nearest topics instead of dead-ending.

type Entry = {
  label: string;
  keys: string[];
  text: string;
  src: string;
  smalltalk?: boolean;
};

const KB: Entry[] = [
  {
    label: "Profile",
    keys: ["whoami", "who are you", "about you", "bio"],
    text: "Arin Mallanna Tumbagi — Software Engineer at Saviynt, B.Tech Ocean Engineering at IIT Madras.",
    src: "/about",
  },
  {
    label: "Profile",
    keys: ["what do you do", "does arin", "who is arin", "introduce", "profile", "overview", "summary", "tldr", "arin"],
    text: "Arin builds identity infrastructure at Saviynt. Backends moving records at any scale, plus AI agents held to verified evidence. IIT Madras engineer, competitive programmer, ML-from-scratch habit.",
    src: "/about",
  },
  {
    label: "Saviynt role",
    keys: ["saviynt", "job", "work", "experience", "role", "company"],
    text: "Software Engineer at Saviynt (identity governance, 300+ tenants) since Jun 2025: compliance engines, streaming exports, audit ingestion, agent safety.",
    src: "/projects",
  },
  {
    label: "SoD engine",
    keys: ["sod", "segregation", "fraud check", "audit check", "compliance check", "21 hours", "21h"],
    text: "Segregation-of-duties = proving no employee holds conflicting permissions (e.g. create AND approve a payment). Rebuilt from 21h to ~3min.",
    src: "/blog/21-hours-to-2-seconds",
  },
  {
    label: "Export pipeline",
    keys: ["export", "excel", "pipeline", "7mb", "7 mb", "streaming", "memory"],
    text: "Compliance exports of any size at flat 7 MB memory. 15M+ rows proven. Watch it run on the homepage under ./export --watch.",
    src: "/blog/streaming-excel-to-s3",
  },
  {
    label: "License Intel",
    keys: ["license", "sap", "waste", "savings", "fue", "tier"],
    text: "License Intelligence: an inference engine finding SAP license waste (dormant/over-privileged accounts), priced in dollars, removed via tasks.",
    src: "/blog/unused-permissions-priced-in-dollars",
  },
  {
    label: "Agent safety",
    keys: ["agent safety", "agent sod", "copilot", "toxic"],
    text: "A safety engine for AI agents: 5 risk patterns across agents, owners, chains and credential groups, ~22ms checks.",
    src: "/blog/sod-for-agents",
  },
  {
    label: "Fraud agents",
    keys: ["fraud", "firefighter", "emergency", "investigator", "react agent"],
    text: "Bounded ReAct agents investigating emergency-admin logs: verified evidence only, 0.70 confidence gate to humans.",
    src: "/projects",
  },
  {
    label: "Nostos router",
    keys: ["router", "kv cache", "nostos", "inference", "vllm", "prefix", "sglang"],
    text: "Nostos routes each LLM request to the server whose cache already holds it. Live demo at kv-router.vercel.app.",
    src: "/blog/route-to-the-prefix",
  },
  {
    label: "Transformers ×3",
    keys: ["gpt", "gpt2", "cpp", "machine learning", "ml", "transformer", "cuda", "arinlm", "attention", "llm", "model"],
    text: "Same transformer 3x: PyTorch by hand, dependency-free C++ (gpt2-cpp, tested), raw CUDA in progress.",
    src: "/blog/gpt-from-scratch-thrice",
  },
  {
    label: "Open source",
    keys: ["oss", "open source", "github", "contribution", "upstream", "opensearch", "s3-outputstream"],
    text: "11 tools plus upstream pull requests across KiroCrew, OpenSearch, SGLang, and lm-eval. Code lives at github.com/Arin016.",
    src: "/projects",
  },
  {
    label: "Competitive programming",
    keys: ["leetcode", "codeforces", "competitive", "dsa", "rating", "cp", "contest"],
    text: "Guardian 2100+ / Expert 1602 / HackerCup R2. The 400-file training archive is searchable.",
    src: "/dsa",
  },
  {
    label: "Education",
    keys: ["education", "iit", "degree", "jee", "college", "ocean", "madras", "study"],
    text: "B.Tech Ocean Engineering, IIT Madras (2021-2025). JEE top 0.2% of 1.1M.",
    src: "/about",
  },
  {
    label: "Contact",
    keys: ["contact", "email", "reach", "hire", "resume", "cv", "talk", "collaborat"],
    text: "arin16tumbagi@gmail.com. The resume PDF is in the homepage contact section.",
    src: "/resume.pdf",
  },
  {
    label: "Blog",
    keys: ["blog", "writing", "posts", "articles", "writeup", "write-up"],
    text: "6 posts: inference routing, 3x transformers, streaming, SoD engine, agent safety, license intel.",
    src: "/blog",
  },
  {
    label: "Skills",
    keys: ["skills", "stack", "languages", "java", "go", "python", "typescript", "kafka"],
    text: "Java, Go, Python, TypeScript, C++/CUDA. Kafka/Avro, OpenSearch, MySQL, Redis, S3, PyTorch, MCP.",
    src: "/about",
  },
  {
    label: "Interests",
    keys: ["interests", "learn", "consensus", "storage", "verification", "research", "future"],
    text: "Consensus, storage engines, verification, serving intelligence cheaply.",
    src: "/#questions",
  },
  {
    label: "Security",
    keys: ["security", "tiger", "mtls", "vulnerability", "secops"],
    text: "2x company-wide security teams: injection/access-control fixes, mTLS rollout, coverage 30% to 80%.",
    src: "/projects",
  },
  {
    label: "Greeting",
    keys: ["hello", "hi", "hey", "yo", "greetings", "namaste", "hii"],
    text: "Hello. Ask me anything about Arin's work, projects, or background. Try a suggestion below.",
    src: "/about",
    smalltalk: true,
  },
  {
    label: "Thanks",
    keys: ["thank you", "thanks", "dhanyavad", "bye", "goodbye", "see you"],
    text: "Anytime. For anything longer, arin16tumbagi@gmail.com.",
    src: "/about",
    smalltalk: true,
  },
  {
    label: "Help",
    keys: ["help", "commands", "how to use", "what can you"],
    text: "Ask anything about Arin. Work, projects, skills, background, contact. Plain English works.",
    src: "/about",
    smalltalk: true,
  },
];

export const KB_COUNT = KB.length;

const norm = (s: string) =>
  ` ${s.toLowerCase().replace(/[^a-z0-9+#/. ]/g, " ").replace(/\s+/g, " ").trim()} `;

function ranked(input: string): { entry: Entry; score: number }[] {
  const hay = norm(input);
  return KB.map((entry) => {
    let s = 0;
    for (const k of entry.keys) {
      const needle = k.includes(" ") ? k : ` ${k} `;
      if (hay.includes(needle)) s += k.length > 5 ? 2 : 1;
    }
    return { entry, score: s };
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
}

function best(input: string): Entry | null {
  const r = ranked(input);
  return r.length ? r[0].entry : null;
}

export function ask(input: string): string | null {
  const e = best(input);
  return e ? `${e.text} More: ${e.src}` : null;
}

export function askRich(input: string): { text: string; links: string[] } | null {
  const e = best(input);
  return e ? { text: e.text, links: [e.src] } : null;
}

export type AgentResult =
  | { kind: "answer"; text: string; links: string[]; trace: string[] }
  | { kind: "unknown"; suggestions: { label: string; query: string }[]; trace: string[] };

const DEFAULT_SUGGESTIONS = ["SoD engine", "Nostos router", "Contact"];

export function runAgent(input: string): AgentResult {
  const tokens = input.trim().split(/\s+/).filter(Boolean).length;
  const hits = ranked(input);
  const trace = [`parse intent (${tokens} tokens)`, `retrieve (${hits.length} passages)`];
  if (!hits.length) {
    const toks = new Set(
      norm(input).split(" ").filter((t) => t.length > 2)
    );
    const cands = KB.filter((e) => !e.smalltalk)
      .map((entry) => {
        const bag = new Set(
          `${entry.label} ${entry.keys.join(" ")}`.toLowerCase().split(/[^a-z0-9+#/.]+/)
        );
        let s = 0;
        toks.forEach((t) => {
          if (bag.has(t)) s++;
        });
        return { entry, score: s };
      })
      .sort((a, b) => b.score - a.score);
    const seen = new Set<string>();
    const ranked_labels = cands
      .filter((c) => {
        if (c.score <= 0 || seen.has(c.entry.label)) return false;
        seen.add(c.entry.label);
        return true;
      })
      .slice(0, 2)
      .map((c) => c.entry.label);
    const picks = [...ranked_labels];
    for (const d of DEFAULT_SUGGESTIONS) {
      if (picks.length >= 2) break;
      if (!picks.includes(d)) picks.push(d);
    }
    return {
      kind: "unknown",
      suggestions: picks.map((label) => ({ label, query: label })),
      trace: [...trace, "no citation found · declining to guess ✓"],
    };
  }
  const top = hits[0].score;
  const included = hits.filter((h) => h.score === top).slice(0, 2);
  const links = [...new Set(included.map((h) => h.entry.src))];
  return {
    kind: "answer",
    text: included.map((h) => h.entry.text).join(" "),
    links,
    trace: [...trace, `verify citations ✓ (${links.length} source${links.length === 1 ? "" : "s"})`, "synthesize"],
  };
}
