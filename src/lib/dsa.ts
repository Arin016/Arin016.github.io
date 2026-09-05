export type DsaFile = { name: string; url: string };
export type DsaTopic = { topic: string; files: DsaFile[] };

const OWNER = "Arin016";
const REPO = "Data-Structures-and-Algorithms";
const BRANCH = "main";
const KEEP = /\.(cpp|py|md|java|txt|c|js|ts)$/i;

const FALLBACK: { topic: string; count: number }[] = [
  { topic: "STL", count: 76 },
  { topic: "Dynamic Programming II", count: 57 },
  { topic: "Graphs", count: 55 },
  { topic: "Dynamic Programming", count: 42 },
  { topic: "Trees", count: 27 },
  { topic: "Segment Tree", count: 19 },
  { topic: "Binary search", count: 17 },
  { topic: "Recursion and Backtracking", count: 15 },
  { topic: "two pointers", count: 14 },
  { topic: "prefix and partial sums", count: 13 },
  { topic: "Disjoint Set Union", count: 12 },
  { topic: "Tries", count: 12 },
  { topic: "bit manipulation", count: 12 },
  { topic: "number theory", count: 12 },
  { topic: "String algorithms", count: 11 },
  { topic: "sweep line", count: 9 },
  { topic: "meet in the middle", count: 6 },
  { topic: "Divide and conquer", count: 2 },
  { topic: "Modular Arithmetic", count: 1 },
];

export async function getDsaIndex(): Promise<{
  topics: DsaTopic[];
  live: boolean;
  total: number;
}> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/git/trees/${BRANCH}?recursive=1`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "arin-portfolio",
        },
      }
    );
    if (!res.ok) throw new Error("github api");
    const data = await res.json();
    const blobs = (
      data.tree as { path: string; type: string }[]
    ).filter((t) => t.type === "blob" && KEEP.test(t.path));
    const groups = new Map<string, DsaFile[]>();
    for (const b of blobs) {
      const parts = b.path.split("/");
      const topic = parts.length > 1 ? parts[0] : "snippets";
      const name = parts[parts.length - 1];
      if (!groups.has(topic)) groups.set(topic, []);
      groups.get(topic)!.push({
        name,
        url: `https://github.com/${OWNER}/${REPO}/blob/${BRANCH}/${parts.map(encodeURIComponent).join("/")}`,
      });
    }
    const topics = [...groups.entries()]
      .map(([topic, files]) => ({
        topic,
        files: files.sort((a, b) => a.name.localeCompare(b.name)),
      }))
      .sort((a, b) => b.files.length - a.files.length || a.topic.localeCompare(b.topic));
    return { topics, live: true, total: blobs.length };
  } catch {
    return {
      topics: FALLBACK.map((t) => ({
        topic: t.topic,
        files: [
          {
            name: `${t.count} files →`,
            url: `https://github.com/${OWNER}/${REPO}/tree/${BRANCH}/${t.topic
              .split("/")
              .map(encodeURIComponent)
              .join("/")}`,
          },
        ],
      })),
      live: false,
      total: FALLBACK.reduce((a, t) => a + t.count, 0),
    };
  }
}
