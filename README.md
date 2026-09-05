# arin — systems engineer · portfolio

Futuristic dark-hacker personal site. Next.js 16 (App Router) + Tailwind v4 + Framer Motion. Deployed on Vercel.

## Dev

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production check (7 static routes)
```

## Routes

| Route | What |
|---|---|
| `/` | Hero terminal, stats, work, OSS, blog preview, path, contact |
| `/about` | Full story: Saviynt, 215× engine, CP, Abhiyaan, what's next |
| `/projects` | Production systems + open source |
| `/blog` | Notes from production |
| `/blog/[slug]` | `streaming-excel-to-s3`, `21-hours-to-2-seconds`, `sod-for-agents` |

Blog posts live as markdown in `src/content/blog/`. Add a `.md` with frontmatter (`title, date, tag, minutes, excerpt`) and it appears automatically.

## Deploy (Vercel)

```bash
vercel --prod --yes
```

Or push to `main` — Vercel auto-deploys from GitHub (`Arin016/Arin016.github.io`).

## Content source of truth

- About voice/career facts: `../WRITING_GUIDE_PERSONAL_SITE.md`
- Tech deep-dives: `../s3-outputstream/BLOG.md`, `../Plan/Saviynt_Work_Documentation/`
