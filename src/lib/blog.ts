import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const DIR = path.join(process.cwd(), "src", "content", "blog");

export type BlogMeta = {
  slug: string;
  title: string;
  date: string;
  tag: string;
  minutes: number;
  excerpt: string;
};

export function getAllPosts(): BlogMeta[] {
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".md"));
  return files
    .map((f) => {
      const raw = fs.readFileSync(path.join(DIR, f), "utf8");
      const { data } = matter(raw);
      return {
        slug: f.replace(/\.md$/, ""),
        title: data.title as string,
        date: data.date as string,
        tag: data.tag as string,
        minutes: data.minutes as number,
        excerpt: data.excerpt as string,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): { meta: BlogMeta; content: string } {
  const raw = fs.readFileSync(path.join(DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: data.title as string,
      date: data.date as string,
      tag: data.tag as string,
      minutes: data.minutes as number,
      excerpt: data.excerpt as string,
    },
    content,
  };
}
