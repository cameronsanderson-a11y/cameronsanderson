import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function createOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f3efe6",
          color: "#1c1915",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: 42, height: 8, backgroundColor: "#ba7a47", marginRight: 16 }} />
          <div style={{ fontSize: 24, letterSpacing: 3 }}>CAMERON SANDERSON</div>
        </div>
        <div style={{ display: "flex", fontSize: 68, lineHeight: 1.05, maxWidth: 920 }}>
          Making things that help the Church communicate better.
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#5c564c" }}>
          Creative direction, church communications, and tools for the Church
        </div>
      </div>
    ),
    ogSize,
  );
}
