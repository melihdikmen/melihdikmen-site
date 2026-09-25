import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import type { SectionInfo } from "@/lib/sections";
import { profile } from "@/data/profile";
import { skills } from "@/data/skills";
import { t } from "@/lib/i18n";
import { container } from "@/lib/ui";
import { ArrowIcon, DownloadIcon } from "./Icons";
import { Stamp } from "./Stamp";

type Props = { locale: Locale; dict: Dictionary; sections: SectionInfo[] };

export function Hero({ locale, dict, sections }: Props) {
  const year = new Date().getFullYear();
  const size = "text-[clamp(3.4rem,13vw,13.5rem)]";
  const ticker = [...skills.mobile, ...skills.backend.slice(0, 3), ...skills.database.slice(0, 2)];

  return (
    <section id="top" className={`${container} pt-8 md:pt-12`}>
      {/* Tarih satırı */}
      <div className="fade-in flex flex-wrap items-center justify-between gap-x-6 gap-y-1 rule-b pb-3 smallcaps">
        <span>{dict.hero.dateline.replace("{year}", String(year))}</span>
        <span className="hidden sm:inline">{dict.hero.eyebrow}</span>
        <span>{t(profile.location, locale)}</span>
      </div>

      {/* Manşet */}
      <div className="grid grid-cols-[1fr_auto] items-end gap-4 pt-8 md:pt-12">
        <h1 className="font-display font-light leading-[0.88] tracking-[-0.04em]">
          <span className="line-mask">
            <span className={size}>{profile.firstName}</span>
          </span>
          <span className="line-mask" style={{ "--d": "140ms" } as React.CSSProperties}>
            <span className={`${size} italic`}>
              {profile.lastName}
              <span className="text-accent not-italic">.</span>
            </span>
          </span>
        </h1>
        <Stamp
          text={dict.hero.stamp}
          className="fade-in mb-2 h-24 w-24 text-ink md:h-[150px] md:w-[150px] lg:mb-3 lg:h-[190px] lg:w-[190px]"
        />
      </div>

      {/* Tanıtım ve içindekiler */}
      <div className="fade-in mt-10 grid gap-10 rule-t pt-8 md:mt-14 md:grid-cols-12 md:pt-10" style={{ "--d": "400ms" } as React.CSSProperties}>
        <div className="md:col-span-7 lg:col-span-6">
          <p className="font-display display-text max-w-xl text-[clamp(1.3rem,2.1vw,1.7rem)] font-normal leading-[1.32] text-balance">
            {t(profile.tagline, locale)}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href="#contact" className="btn">
              {dict.hero.contact}
              <ArrowIcon width={14} height={14} />
            </a>
            <a href={profile.cvPath} download className="u inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-ink-2">
              <DownloadIcon width={14} height={14} />
              {dict.hero.cv}
            </a>
          </div>
        </div>

        <div className="md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9">
          <p className="smallcaps">{dict.hero.contents}</p>
          <ol className="mt-3 rule-t">
            {sections.map((s) => (
              <li key={s.id} className="rule-b">
                <a href={`#${s.id}`} className="group flex items-baseline py-2.5 text-[15px]">
                  <span className="w-9 font-mono text-[11px] text-ink-3">{s.number}</span>
                  <span className="u-draw">{s.label}</span>
                  <span className="leaders" aria-hidden />
                  <span className="text-ink-3 transition-colors group-hover:text-accent">→</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Dizgi şeridi */}
      <p className="fade-in mt-12 flex flex-wrap gap-x-5 gap-y-1.5 rule-t rule-b py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3 md:mt-16" style={{ "--d": "600ms" } as React.CSSProperties} aria-hidden>
        {ticker.map((s, i) => (
          <span key={s} className="flex items-center gap-5">
            {s}
            {i < ticker.length - 1 && <span className="text-accent">·</span>}
          </span>
        ))}
      </p>
    </section>
  );
}
