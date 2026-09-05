import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const STATS: [string, string][] = [
  ["~400x", "audit check"],
  ["7 MB", "flat at any scale"],
  ["50K+/s", "exactly-once ingest"],
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
            fontSize: 84,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.05,
            marginTop: 16,
          }}
        >
          Arin Mallanna
          <br />
          Tumbagi
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
