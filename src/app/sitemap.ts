import type { MetadataRoute } from "next";

export const dynamic = "force-static";

import { getAllPosts } from "@/lib/blog";

const BASE = "https://arin016.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/about", "/projects", "/blog", "/dsa", "/ask"].map(
    (p) => ({
      url: `${BASE}${p}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : 0.8,
    })
  );
  const posts = getAllPosts();
  return [
    ...pages,
    ...posts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
