import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import type { SectionInfo } from "@/lib/sections";
import { profile } from "@/data/profile";
import { skills } from "@/data/skills";
import { t } from "@/lib/i18n";
import { container } from "@/lib/ui";
import { AndroidIcon, AppleIcon, ArrowIcon, DownloadIcon } from "./Icons";
import { Stamp } from "./Stamp";
import { Marquee } from "./Marquee";
import { PhoneMock } from "./PhoneMock";

type Props = { locale: Locale; dict: Dictionary; sections: SectionInfo[] };

export function Hero({ locale, dict, sections }: Props) {
  const year = new Date().getFullYear();
  const size = "text-[clamp(4rem,15.5vw,15rem)]";
  const ticker = [...skills.mobile, ...skills.backend.slice(0, 3), ...skills.database.slice(0, 2)];
  const years = profile.stats[0];
  const css = (d: string) => ({ "--d": d }) as React.CSSProperties;

  return (
    <section id="top" className={`${container} pt-6 md:pt-10`}>
      {/* Üst künye şeridi */}
      <div className="fade-in label flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-2 border-ink px-3 py-2">
        <span>{dict.hero.dateline.replace("{year}", String(year))}</span>
        <span className="hidden sm:inline">{dict.hero.eyebrow}</span>
        <span>{t(profile.location, locale)}</span>
      </div>

      {/* Poster kutusu */}
      <div className="mt-4 grid border-[3px] border-ink shadow-hard-lg md:grid-cols-12">
        <div className="relative flex flex-col justify-between gap-10 p-5 md:col-span-8 md:p-10 lg:p-12">
          {/* Sticker'lar */}
          <div className="fade-in flex flex-wrap gap-3" style={css("250ms")}>
            <span className="sticker block-acid" style={{ "--r": "-3deg" } as React.CSSProperties}>
              <span className="blink inline-block h-2 w-2 rounded-full bg-[#0b0b0b]" aria-hidden />
              {dict.hero.available}
            </span>
            <span className="sticker" style={{ "--r": "2deg" } as React.CSSProperties}>
              {years.value}
              {years.suffix} {t(years.label, locale).split(" ")[0]}
            </span>
            <span className="sticker block-sky" style={{ "--r": "-1.5deg" } as React.CSSProperties}>
              ✦ {dict.hero.aiBadge}
            </span>
            <span className="sticker block-pink hidden sm:inline-flex" style={{ "--r": "2.5deg" } as React.CSSProperties}>
              React Native · Flutter
            </span>
          </div>

          {/* Platform rozetleri */}
          <div className="fade-in -mt-6 flex flex-wrap items-center gap-2" style={css("320ms")}>
            <span className="label mr-1">{dict.hero.platforms}</span>
            <span className="store-badge">
              <AppleIcon width={13} height={13} /> iOS
            </span>
            <span className="store-badge">
              <AndroidIcon width={14} height={14} /> Android
            </span>
          </div>

          {/* Manşet */}
          <h1 className="font-display font-extrabold uppercase leading-[0.82] tracking-[-0.04em]">
            <span className="line-mask">
              <span className={size}>{profile.firstName}</span>
            </span>
            <span className="line-mask" style={css("120ms")}>
              <span className={size}>
                {profile.lastName}
                <span className="text-hot">.</span>
              </span>
            </span>
          </h1>

          <div className="fade-in" style={css("450ms")}>
            <p className="max-w-xl text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.45] text-balance">{t(profile.tagline, locale)}</p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <a href="#contact" className="btn">
                {dict.hero.contact}
                <ArrowIcon width={16} height={16} strokeWidth={2.4} />
              </a>
              <a href={profile.cvPath} download className="btn btn-ghost">
                <DownloadIcon width={16} height={16} strokeWidth={2.4} />
                {dict.hero.cv}
              </a>
            </div>
          </div>
        </div>

        {/* Sağ sütun: telefon */}
        <div className="hatch relative grid place-items-center border-t-[3px] border-ink px-6 py-12 md:col-span-4 md:border-l-[3px] md:border-t-0 md:px-8">
          <div className="fade-in w-full max-w-[264px]" style={css("300ms")}>
            <PhoneMock locale={locale} dict={dict} />
          </div>
          <Stamp text={dict.hero.stamp} className="pop-in absolute right-3 top-3 h-24 w-24 lg:h-28 lg:w-28" />
          <span className="sticker sticker-sq absolute bottom-4 left-4 hidden md:inline-flex" style={{ "--r": "-4deg" } as React.CSSProperties}>
            {dict.hero.scroll} ↓
          </span>
        </div>
      </div>

      {/* Kayan şeritler */}
      <div className="fade-in mt-10 md:mt-14" style={css("600ms")}>
        <Marquee
          items={ticker}
          className="block-ink border-y-[3px] border-ink py-3 font-mono text-[13px] font-bold uppercase tracking-[0.14em] text-acid"
          speed={34}
        />
        <Marquee
          items={sections.map((s) => `${s.number} ${s.label}`)}
          className="block-acid border-b-[3px] border-ink py-2.5 font-mono text-[12px] font-bold uppercase tracking-[0.14em]"
          speed={40}
          reverse
          separator="→"
        />
      </div>
    </section>
  );
}
