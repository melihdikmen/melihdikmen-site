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
          background: "#f3eee4",
        }}
      >
        <svg viewBox="0 0 64 64" width="180" height="180">
          <path d="M14 47V17l14 17 14-17v30" fill="none" stroke="#1a1714" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="51" cy="46" r="4.5" fill="#c8321a" />
        </svg>
      </div>
    ),
    size,
  );
}
