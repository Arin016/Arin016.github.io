// build-kb.mjs — builds src/lib/kb-data.json (the single KB source) from:
//   1. src/lib/kb-pages.json  (hand-curated page/repo/smalltalk entries)
//   2. src/content/blog/*.md  (every post, split by ## headings into passages)
// Run after editing blogs/repos:  node scripts/build-kb.mjs  (or npm run kb:build)
// Output feeds: keyword fallback (ask.ts), Jev retriever (jev-policy.ts),
// eval harness (scripts/eval-ask.mjs). Approx budget: whole corpus ~13k tokens,
// one Jev call, Choice arity < 255.
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, basename } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const PAGES = join(ROOT, "src/lib/kb-pages.json");
const BLOGDIR = join(ROOT, "src/content/blog");
const OUT = join(ROOT, "src/lib/kb-data.json");
const MAX_PASSAGE_CHARS = 1400;

const STOP = new Set(
  "the,a,an,and,or,of,to,in,on,for,with,from,that,this,these,those,is,are,was,were,be,been,by,as,at,it,its,you,your,we,our,they,their,he,she,his,her,not,but,can,will,just,than,then,so,such,into,over,after,before,when,which,who,what,how,why,all,any,each,more,most,some,such,no,yes,if,else,while,about,into,through,during,between,than,too,very,own,same,only,also,across,within,without,within,per,via,since,until,against,among,using,used,use,one,two,new,way,much,many,like,well,even,ever,never,often,made,make".split(
    ","
  )
);

function words(s, cap) {
  const out = [];
  for (const w of s.toLowerCase().split(/[^a-z0-9+#]+/)) {
    if (w.length > 3 && !STOP.has(w) && !out.includes(w)) out.push(w);
    if (out.length >= cap) break;
  }
  return out;
}

function parseMd(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const head = m ? m[1] : "";
  const body = m ? m[2] : src;
  const title = (head.match(/^title:\s*"?(.*?)"?\s*$/m) || [])[1] ?? "";
  return { title, body };
}

const pages = JSON.parse(readFileSync(PAGES, "utf8"));
const entries = [...pages];
let nPass = 0;

for (const f of readdirSync(BLOGDIR).filter((f) => f.endsWith(".md")).sort()) {
  const slug = basename(f, ".md");
  const { title, body } = parseMd(readFileSync(join(BLOGDIR, f), "utf8"));
  const parts = body.split(/^## /m);
  const intro = parts[0].trim();
  const sections = parts.slice(1);
  const chunks = [];
  if (intro) chunks.push({ heading: "overview", text: intro });
  for (const s of sections) {
    const nl = s.indexOf("\n");
    chunks.push({
      heading: (nl === -1 ? s : s.slice(0, nl)).trim().replace(/[#*`]/g, ""),
      text: (nl === -1 ? "" : s.slice(nl)).trim(),
    });
  }
  chunks.forEach((c, i) => {
    const text = `${c.heading}: ${c.text}`.replace(/\s+/g, " ").trim().slice(0, MAX_PASSAGE_CHARS);
    if (text.length < 80) return;
    entries.push({
      id: `${slug}#${i}`,
      label: `${title} — ${c.heading}`.slice(0, 80),
      keys: [...new Set([...words(title + " " + slug.replace(/-/g, " "), 8), ...words(c.heading, 8)])],
      text,
      src: `/blog/${slug}`,
    });
    nPass++;
  });
}

writeFileSync(OUT, JSON.stringify(entries, null, 2) + "\n");
console.log(`kb: ${pages.length} pages + ${nPass} blog passages = ${entries.length} entries -> src/lib/kb-data.json`);
