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
          background: "#0f1318",
        }}
      >
        <svg viewBox="0 0 64 64" width="180" height="180">
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#6d8dff" />
              <stop offset="1" stopColor="#b48cff" />
            </linearGradient>
          </defs>
          <path d="M15 47V17l14 17 14-17v30" fill="none" stroke="url(#g)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="51" cy="47" r="4.5" fill="#2dd4bf" />
        </svg>
      </div>
    ),
    size,
  );
}
