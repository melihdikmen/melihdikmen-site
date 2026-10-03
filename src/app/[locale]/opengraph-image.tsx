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

const INK = "#0b0b0b";
const PAPER = "#f1efe8";
const ACID = "#d4ff3f";
const HOT = "#ff4f1f";
const PINK = "#ff7ad9";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const up = (v: string) => v.toLocaleUpperCase(locale === "tr" ? "tr-TR" : "en-US");
  const first = up(profile.firstName);
  const last = up(profile.lastName);
  const eyebrow = up(dict.hero.eyebrow);
  const location = up(profile.location[locale]);
  const available = up(dict.hero.available);
  const stack = "REACT NATIVE · FLUTTER · TYPESCRIPT";
  const site = profile.siteUrl.replace(/^https?:\/\//, "").toUpperCase();
  const monoText = [eyebrow, location, available, stack, site, "MD.", "0123456789+"].join("");
  const [display, mono] = await Promise.all([
    loadFont("Bricolage+Grotesque:opsz,wdth,wght@96,75,800", `${first}${last}.`),
    loadFont("Space+Mono:wght@700", monoText),
  ]);
  const fonts = [
    ...(display ? [{ name: "Bricolage Grotesque", data: display, style: "normal" as const, weight: 800 as const }] : []),
    ...(mono ? [{ name: "Space Mono", data: mono, style: "normal" as const, weight: 700 as const }] : []),
  ];
  const monoFamily = mono ? "Space Mono" : "monospace";
  const displayFamily = display ? "Bricolage Grotesque" : "sans-serif";

  const label = {
    fontFamily: monoFamily,
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: 3,
    textTransform: "uppercase" as const,
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 40,
          background: PAPER,
          backgroundImage: `radial-gradient(${INK}29 2px, transparent 2px)`,
          backgroundSize: "28px 28px",
          color: INK,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            border: `6px solid ${INK}`,
            boxShadow: `18px 18px 0 ${INK}`,
            background: PAPER,
          }}
        >
          {/* Sol: manşet */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 44 }}>
            <div style={{ display: "flex", gap: 14 }}>
              <span style={{ ...label, padding: "10px 18px", border: `4px solid ${INK}`, borderRadius: 999, background: ACID, boxShadow: `5px 5px 0 ${INK}`, transform: "rotate(-3deg)" }}>
                {available}
              </span>
              <span style={{ ...label, padding: "10px 18px", border: `4px solid ${INK}`, borderRadius: 999, background: PAPER, boxShadow: `5px 5px 0 ${INK}`, transform: "rotate(2deg)" }}>
                {location}
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", fontFamily: displayFamily, fontWeight: 800, fontSize: 196, lineHeight: 0.82, letterSpacing: -10 }}>
              <span>{first}</span>
              <span style={{ display: "flex" }}>
                {last}
                <span style={{ color: HOT }}>.</span>
              </span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", ...label, color: "#3a3a3a" }}>
              <span>{eyebrow}</span>
              <span>{site}</span>
            </div>
          </div>

          {/* Sağ: renk blokları */}
          <div style={{ width: 300, display: "flex", flexDirection: "column", borderLeft: `6px solid ${INK}` }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 26, background: ACID, borderBottom: `6px solid ${INK}` }}>
              <span style={{ fontFamily: displayFamily, fontWeight: 800, fontSize: 120, lineHeight: 0.85, letterSpacing: -6 }}>
                {profile.stats[0].value}
                <span style={{ color: HOT }}>+</span>
              </span>
              <span style={{ ...label, fontSize: 15, marginTop: 10 }}>{up(profile.stats[0].label[locale])}</span>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 26, background: HOT, borderBottom: `6px solid ${INK}` }}>
              <span style={{ ...label, fontSize: 15, lineHeight: 1.4 }}>{stack}</span>
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: PINK }}>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 120, height: 120, borderRadius: 999, background: INK, color: PAPER, fontFamily: displayFamily, fontWeight: 800, fontSize: 56, letterSpacing: -3 }}>
                MD<span style={{ color: ACID }}>.</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
