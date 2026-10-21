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

/* IDE paleti (globals.css .dark ile aynı) */
const BG = "#1e1e1e";
const PANEL = "#252526";
const BORDER = "#3c3c3c";
const FG = "#d4d4d4";
const FG_2 = "#9d9d9d";
const FG_3 = "#6e6e6e";
const ACCENT = "#007acc";
const GREEN = "#4ec9b0";
const KEY = "#9cdcfe";
const STR = "#ce9178";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const name = `${profile.firstName} ${profile.lastName}`;
  const eyebrow = dict.hero.eyebrow;
  const location = profile.location[locale];
  const site = profile.siteUrl.replace(/^https?:\/\//, "");
  const years = `${profile.stats[0].value}${profile.stats[0].suffix} ${profile.stats[0].label[locale]}`;
  const apps = `${profile.stats[2].value} ${profile.stats[2].label[locale]}`;
  const files = ["README.md", "about.md", "experience.json", "projects/", "skills.yaml", "contact.ts"];

  const uiText = [name, eyebrow].join("");
  const monoText = [...files, location, site, years, apps, "melihdikmen Build Succeeded · apps · iOS Android React Native Flutter TypeScript { } : , \" _ 0123456789"].join("");
  const [sans, mono] = await Promise.all([
    loadFont("Inter:wght@700", uiText),
    loadFont("JetBrains+Mono:wght@400", monoText),
  ]);
  const fonts = [
    ...(sans ? [{ name: "Inter", data: sans, style: "normal" as const, weight: 700 as const }] : []),
    ...(mono ? [{ name: "JetBrains Mono", data: mono, style: "normal" as const, weight: 400 as const }] : []),
  ];
  const monoFamily = mono ? "JetBrains Mono" : "monospace";
  const sansFamily = sans ? "Inter" : "sans-serif";

  const row = (n: number, children: React.ReactNode) => (
    <div style={{ display: "flex", alignItems: "baseline", gap: 28, fontFamily: monoFamily, fontSize: 24, lineHeight: 1.6 }}>
      <span style={{ width: 36, textAlign: "right", color: FG_3 }}>{n}</span>
      <span style={{ display: "flex", gap: 12 }}>{children}</span>
    </div>
  );

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: BG, color: FG }}>
        {/* Başlık çubuğu */}
        <div style={{ display: "flex", alignItems: "center", height: 56, padding: "0 24px", background: PANEL, borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ display: "flex", gap: 10 }}>
            <span style={{ width: 16, height: 16, borderRadius: 999, background: "#ff5f57" }} />
            <span style={{ width: 16, height: 16, borderRadius: 999, background: "#febc2e" }} />
            <span style={{ width: 16, height: 16, borderRadius: 999, background: "#28c840" }} />
          </div>
          <span style={{ flex: 1, textAlign: "center", marginLeft: 24, fontFamily: monoFamily, fontSize: 20, color: FG_2 }}>
            melihdikmen — README.md
          </span>
          <span style={{ width: 70 }} />
        </div>

        <div style={{ flex: 1, display: "flex" }}>
          {/* Dosya ağacı */}
          <div style={{ width: 250, display: "flex", flexDirection: "column", padding: "22px 0", background: PANEL, borderRight: `1px solid ${BORDER}`, fontFamily: monoFamily, fontSize: 20 }}>
            <span style={{ padding: "0 24px 12px", color: FG_3, fontSize: 16, letterSpacing: 2 }}>MELIHDIKMEN</span>
            {files.map((f, i) => (
              <span
                key={f}
                style={{
                  padding: "8px 24px",
                  color: i === 0 ? "#fff" : FG_2,
                  background: i === 0 ? "#37373d" : "transparent",
                  borderLeft: `3px solid ${i === 0 ? ACCENT : "transparent"}`,
                }}
              >
                {f}
              </span>
            ))}
          </div>

          {/* Editör */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", borderBottom: `1px solid ${BORDER}`, background: PANEL }}>
              <span style={{ padding: "12px 24px", background: BG, borderTop: `2px solid ${ACCENT}`, fontFamily: monoFamily, fontSize: 20, color: "#fff" }}>
                README.md
              </span>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 48px 0 24px", gap: 2 }}>
              {row(1, <span style={{ color: FG_3 }}># {site}</span>)}
              {row(
                2,
                <span style={{ fontFamily: sansFamily, fontWeight: 700, fontSize: 84, lineHeight: 1.1, letterSpacing: -3, color: "#fff" }}>
                  {name}
                  <span style={{ color: ACCENT }}>.</span>
                </span>,
              )}
              {row(3, <span style={{ fontFamily: sansFamily, fontWeight: 700, fontSize: 30, color: FG_2 }}>{eyebrow}</span>)}
              {row(4, <span />)}
              {row(
                5,
                <>
                  <span style={{ color: KEY }}>stack</span>
                  <span style={{ color: FG_2 }}>:</span>
                  <span style={{ color: STR }}>&quot;React Native · Flutter · TypeScript&quot;</span>
                </>,
              )}
              {row(
                6,
                <>
                  <span style={{ color: KEY }}>platforms</span>
                  <span style={{ color: FG_2 }}>:</span>
                  <span style={{ color: STR }}>&quot;iOS · Android&quot;</span>
                </>,
              )}
              {row(
                7,
                <>
                  <span style={{ color: KEY }}>location</span>
                  <span style={{ color: FG_2 }}>:</span>
                  <span style={{ color: STR }}>&quot;{location}&quot;</span>
                </>,
              )}
            </div>
          </div>
        </div>

        {/* Durum çubuğu */}
        <div style={{ display: "flex", alignItems: "center", gap: 36, height: 44, padding: "0 24px", background: ACCENT, color: "#fff", fontFamily: monoFamily, fontSize: 18 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 12, height: 12, borderRadius: 999, background: GREEN }} /> Build Succeeded
          </span>
          <span>{years}</span>
          <span>{apps}</span>
          <span style={{ marginLeft: "auto" }}>{site}</span>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
