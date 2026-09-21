const ITEMS = [
  { text: "LeetCode Guardian · peak 2077" },
  { text: "Codeforces Expert · 1602" },
  { text: "Meta Hacker Cup · Round 2" },
  { text: "Maven Central · s3-outputstream v2.0.0" },
  { text: "OpenSearch · merged PR" },
  { text: "IIT Madras · JEE top 0.2%" },
  { text: "identity governance · 300+ tenants" },
  { text: "2× company-wide Tiger Team" },
];

export default function TrustStrip() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <section className="hairline-t" aria-label="credentials">
      <div className="marquee py-6">
        <div className="marquee-track gap-10 pr-10">
          {doubled.map((it, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-2.5 font-mono text-[12px] tracking-wide text-zinc-500"
            >
              <span className="text-green-300">◆</span>
              {it.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
