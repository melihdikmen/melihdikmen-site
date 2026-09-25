import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { isLocale, defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";

export const alt = "Melih Dikmen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Google Fonts'tan TTF çeker; ağ yoksa varsayılan yazı tipine düşer. */
async function loadFont(family: string, text: string): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
    if (!match) return null;
    const res = await fetch(match[1]);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const headline = `${profile.firstName} ${profile.lastName}.`;
  const site = profile.siteUrl.replace(/^https?:\/\//, "");
  const up = (v: string) => v.toLocaleUpperCase(locale === "tr" ? "tr-TR" : "en-US");
  const eyebrow = up(dict.hero.eyebrow);
  const location = up(profile.location[locale]);
  const stack = "React Native · TypeScript · Flutter".toUpperCase();
  const siteLabel = site.toUpperCase();
  const bodyText = [eyebrow, location, profile.tagline[locale], stack, siteLabel].join("");
  const [serif, sans] = await Promise.all([
    loadFont("Fraunces:ital,opsz,wght@1,144,300", headline),
    loadFont("Instrument+Sans:wght@400", bodyText),
  ]);
  const fonts = [
    ...(serif ? [{ name: "Fraunces", data: serif, style: "italic" as const, weight: 300 as const }] : []),
    ...(sans ? [{ name: "Instrument Sans", data: sans, style: "normal" as const, weight: 400 as const }] : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#f3eee4",
          color: "#1a1714",
          fontFamily: sans ? "Instrument Sans" : "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #1a1714",
            paddingBottom: 18,
            fontSize: 20,
            letterSpacing: 3,
            color: "#4d4740",
          }}
        >
          <span>{eyebrow}</span>
          <span>{location}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: serif ? "Fraunces" : "serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: 150,
              letterSpacing: -7,
              lineHeight: 0.95,
              display: "flex",
            }}
          >
            <span>{profile.firstName} {profile.lastName}</span>
            <span style={{ color: "#c8321a", fontStyle: "normal" }}>.</span>
          </div>
          <div style={{ marginTop: 28, fontSize: 30, lineHeight: 1.3, maxWidth: 980, color: "#4d4740" }}>
            {profile.tagline[locale]}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #d5cbb9",
            paddingTop: 18,
            fontSize: 20,
            letterSpacing: 3,
            color: "#8b8276",
          }}
        >
          <span>{stack}</span>
          <span>{siteLabel}</span>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
