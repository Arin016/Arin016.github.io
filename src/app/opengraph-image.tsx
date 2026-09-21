import { ImageResponse } from "next/og";

// Node runtime (not "edge") + force-static: keeps the image buildable in
// both modes — static export for GitHub Pages and server mode for Vercel.
export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const STATS: [string, string][] = [
  ["~20h→min", "audit check"],
  ["5 MiB", "bounded S3 buffer"],
  ["cited", "evidence-checked agents"],
];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#060806",
          fontFamily: "monospace",
        }}
      >
        <div style={{ fontSize: 28, color: "#4ade80" }}>
          guest@arin:~$
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 84,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.05,
            marginTop: 16,
          }}
        >
          <span>Arin Mallanna</span>
          <span>Tumbagi</span>
        </div>
        <div style={{ fontSize: 30, color: "#4ade80", marginTop: 16 }}>
          Flat memory. Bounded agents. Every claim checked.
        </div>
        <div style={{ display: "flex", gap: 48, marginTop: 40 }}>
          {STATS.map(([k, v]) => (
            <div key={v} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 44, fontWeight: 800, color: "#4ade80" }}>
                {k}
              </div>
              <div style={{ fontSize: 22, color: "#8a938b" }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
