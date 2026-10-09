import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
          backgroundColor: "#0f172a",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 14,
              backgroundColor: "#4f46e5",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            {"</>"}
          </div>
          <div style={{ fontSize: 36, fontWeight: 800 }}>CodeCraft</div>
        </div>
        <div style={{ marginTop: 32, fontSize: 60, fontWeight: 800, lineHeight: 1.15 }}>
          Learn to Code. Build Real Things. No Setup Required.
        </div>
        <div style={{ marginTop: 24, fontSize: 28, color: "#c7d2fe" }}>
          Interactive browser lessons · visual execution · guided projects
        </div>
      </div>
    ),
    { ...size },
  );
}
