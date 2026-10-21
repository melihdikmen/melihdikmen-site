import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { projects, pastProjects } from "@/data/projects";
import { LocalTime } from "./LocalTime";

/** Proje rengi olmayan eski uygulamalar için palet sırası. */
const palette = ["#00f0ff", "#ffd166", "#8b5cff", "#ff2bd6"];
const dock = [
  { short: "RN", name: "React Native", bg: "#00f0ff" },
  { short: "Fl", name: "Flutter", bg: "#8b5cff" },
  { short: "Sw", name: "Swift", bg: "#ff2bd6" },
  { short: "Kt", name: "Kotlin", bg: "#ffd166" },
];

/**
 * Hero'daki telefon: durum çubuğunda canlı Ankara saati, bildirimde şu anki iş,
 * ana ekranda yayınladığım uygulamalar, dock'ta günlük platformlarım.
 */
export function PhoneMock({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const apps = [
    ...projects.map((p) => ({ name: p.short ?? p.name, bg: p.accent, light: true })),
    ...[...new Set(pastProjects.map((p) => p.name.split(" ")[0]))].map((name, i) => ({ name, bg: palette[i % palette.length], light: false })),
  ].slice(0, 12); // 3 sıra: dock'a kadar olan alana sığan en fazla ikon

  return (
    <div className="phone" role="img" aria-label={dict.phone.label}>
      <div className="phone-screen">
        {/* Durum çubuğu */}
        <div className="flex items-center justify-between px-5 pt-3 font-mono text-[12px] font-bold text-ink">
          <LocalTime locale={locale} seconds={false} />
          <span className="h-[18px] w-[64px] rounded-full bg-black" aria-hidden />
          <span className="flex items-center gap-1" aria-hidden>
            <span className="flex items-end gap-[2px]">
              {[4, 6, 8, 10].map((h) => (
                <span key={h} className="w-[3px] bg-acid" style={{ height: h }} />
              ))}
            </span>
            <span className="relative ml-1 h-[10px] w-[20px] rounded-[3px] border border-acid p-[1px]">
              <span className="block h-full w-3/4 bg-acid" />
            </span>
          </span>
        </div>

        {/* Bildirim */}
        <div className="notif mx-3 mt-4 flex gap-2.5 p-2.5">
          <span className="app-icon h-8 w-8 shrink-0 text-[15px] text-white" style={{ background: projects[0].accent }}>
            P
          </span>
          <span className="min-w-0">
            <span className="block font-mono text-[9.5px] font-bold uppercase tracking-[0.1em] text-acid">{dict.phone.notifApp}</span>
            <span className="block text-[12.5px] font-semibold leading-snug">{dict.facts.nowValue}</span>
          </span>
        </div>

        {/* Ana ekran */}
        <ul className="mt-5 grid grid-cols-4 gap-x-2 gap-y-3.5 px-4">
          {apps.map((a, i) => (
            <li key={`${a.name}-${i}`} className="flex flex-col items-center gap-1">
              <span className={`app-icon h-11 w-11 text-[20px] ${a.light ? "text-white" : "text-[#04050d]"}`} style={{ background: a.bg, color: a.light ? undefined : "#04050d" }}>
                {a.name[0]}
              </span>
              <span className="w-full truncate text-center font-mono text-[9px] font-bold text-ink-2">{a.name}</span>
            </li>
          ))}
        </ul>

        {/* Dock */}
        <div className="dock mx-3 mt-auto mb-2 flex justify-around px-2 py-2">
          {dock.map((d) => (
            <span key={d.short} title={d.name} className="app-icon h-11 w-11 text-[16px] text-[#04050d]" style={{ background: d.bg }}>
              {d.short}
            </span>
          ))}
        </div>
        <span className="mx-auto mb-2 block h-[4px] w-24 rounded-full bg-ink/60" aria-hidden />
      </div>
    </div>
  );
}
