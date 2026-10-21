import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/* IDE paleti: koyu editör zemini, mavi durum çubuğu, beyaz M ve yeşil imleç. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1e1e1e",
        }}
      >
        <svg viewBox="0 0 64 64" width="180" height="180">
          <rect y="50" width="64" height="14" fill="#007acc" />
          <path d="M12 40V12l12 15 12-15v28" fill="none" stroke="#ffffff" strokeWidth="7" strokeLinecap="square" strokeLinejoin="miter" />
          <rect x="43" y="30" width="9" height="12" fill="#4ec9b0" />
        </svg>
      </div>
    ),
    size,
  );
}
