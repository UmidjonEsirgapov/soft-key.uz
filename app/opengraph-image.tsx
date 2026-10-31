import { ImageResponse } from "next/og";

export const alt = "Soft Key — Texnologiya va ta'lim";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const KEYS = ["#c9d8ff", "#ffd8b5", "#ddf2b5", "#c8eed9", "#ffe7a3", "#bfe6f2", "#dcdfe6", "#f3cfe8"];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px",
          background: "#f6f3ec",
          color: "#16171b",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 560 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 72,
                height: 72,
                borderRadius: 16,
                background: "#ff5a1f",
                borderBottom: "8px solid #c2410c",
                color: "white",
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              SK
            </div>
            <div style={{ fontSize: 44, fontWeight: 700 }}>Soft Key</div>
          </div>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, marginTop: 40 }}>
            IT&apos;ni oddiy tilda o&apos;rganing.
          </div>
          <div style={{ fontSize: 28, marginTop: 24, color: "#4a4c55" }}>soft-key.uz</div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", width: 420, gap: 16 }}>
          {KEYS.map((color) => (
            <div
              key={color}
              style={{
                width: 90,
                height: 90,
                borderRadius: 18,
                background: color,
                borderBottom: "8px solid rgba(22,23,27,0.25)",
              }}
            />
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
