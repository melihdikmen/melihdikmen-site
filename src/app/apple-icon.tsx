import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

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
          background: "#0b0b0b",
        }}
      >
        <svg viewBox="0 0 64 64" width="180" height="180">
          <rect x="5" y="5" width="54" height="54" fill="#d4ff3f" stroke="#0b0b0b" strokeWidth="4" />
          <path d="M15 46V18l13 16 13-16v28" fill="none" stroke="#0b0b0b" strokeWidth="7" strokeLinecap="square" strokeLinejoin="miter" />
          <rect x="44" y="39" width="8" height="8" fill="#ff4f1f" />
        </svg>
      </div>
    ),
    size,
  );
}
