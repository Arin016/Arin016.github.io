import type { NextConfig } from "next";

// Static export for GitHub Pages (EXPORT_MODE=true in the Pages workflow).
// Everything here is static-compatible: the /api/ask route is simply not
// exported, and AskClient falls back to its local agent when /api/ask 404s.
const isExport = process.env.EXPORT_MODE === "true";

const nextConfig: NextConfig = {
  ...(isExport ? { output: "export" as const } : {}),
  images: { unoptimized: true },
};

export default nextConfig;
