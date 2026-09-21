import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { isLocale, defaultLocale } from "@/i18n/config";

export const alt = "Melih Dikmen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0f1318",
          color: "#eaeef2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#98a2ae" }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#3fbfb2" }} />
          {locale === "tr" ? "Mobil Uygulama Geliştirici & Takım Lideri" : "Mobile Engineer & Team Lead"}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 88, fontWeight: 800, letterSpacing: -3, lineHeight: 1 }}>{profile.name}</div>
          <div style={{ fontSize: 34, color: "#ff6a2c", maxWidth: 1000, lineHeight: 1.25 }}>
            {profile.headline[locale]}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#98a2ae" }}>
          <span>React Native · TypeScript · Fintech</span>
          <span>{profile.siteUrl.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    size,
  );
}
