import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { projects, pastProjects } from "@/data/projects";
import { LocalTime } from "./LocalTime";

/** Proje rengi olmayan eski uygulamalar için palet sırası. */
const palette = ["#0071e3", "#ff9f0a", "#5e5ce6", "#ff375f"];
const dock = [
  { short: "RN", name: "React Native", bg: "#20232a" },
  { short: "Fl", name: "Flutter", bg: "#02569b" },
  { short: "Sw", name: "Swift", bg: "#f05138" },
  { short: "Kt", name: "Kotlin", bg: "#7f52ff" },
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
        <div className="flex items-center justify-between px-5 pt-3 text-[12px] font-semibold text-[#1d1d1f]">
          <LocalTime locale={locale} seconds={false} />
          <span className="h-[18px] w-[64px] rounded-full bg-[#1d1d1f]" aria-hidden />
          <span className="flex items-center gap-1" aria-hidden>
            <span className="flex items-end gap-[2px]">
              {[4, 6, 8, 10].map((h) => (
                <span key={h} className="w-[3px] rounded-sm bg-[#1d1d1f]" style={{ height: h }} />
              ))}
            </span>
            <span className="relative ml-1 h-[10px] w-[20px] rounded-[3px] border border-[#1d1d1f]/60 p-[1px]">
              <span className="block h-full w-3/4 rounded-[1px] bg-[#1d1d1f]" />
            </span>
          </span>
        </div>

        {/* Bildirim */}
        <div className="notif mx-3 mt-4 flex gap-2.5 p-3">
          <span className="app-icon h-8 w-8 shrink-0 text-[15px] text-white" style={{ background: projects[0].accent }}>
            P
          </span>
          <span className="min-w-0">
            <span className="block text-[10px] font-medium uppercase tracking-[0.02em] text-[#86868b]">{dict.phone.notifApp}</span>
            <span className="block text-[12.5px] font-semibold leading-snug">{dict.facts.nowValue}</span>
          </span>
        </div>

        {/* Ana ekran */}
        <ul className="mt-5 grid grid-cols-4 gap-x-2 gap-y-3.5 px-4">
          {apps.map((a, i) => (
            <li key={`${a.name}-${i}`} className="flex flex-col items-center gap-1">
              <span className="app-icon h-11 w-11 text-[19px] text-white" style={{ background: a.bg }}>
                {a.name[0]}
              </span>
              <span className="w-full truncate text-center text-[9.5px] font-medium text-[#1d1d1f]">{a.name}</span>
            </li>
          ))}
        </ul>

        {/* Dock */}
        <div className="dock mx-3 mt-auto mb-2 flex justify-around px-2 py-2.5">
          {dock.map((d) => (
            <span key={d.short} title={d.name} className="app-icon h-11 w-11 text-[15px] text-white" style={{ background: d.bg }}>
              {d.short}
            </span>
          ))}
        </div>
        <span className="mx-auto mb-2 block h-[5px] w-24 rounded-full bg-[#1d1d1f]" aria-hidden />
      </div>
    </div>
  );
}
