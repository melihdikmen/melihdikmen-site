import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import type { SectionInfo } from "@/lib/sections";
import { profile } from "@/data/profile";
import { skills } from "@/data/skills";
import { t } from "@/lib/i18n";
import { container } from "@/lib/ui";
import { AndroidIcon, AppleIcon, DownloadIcon } from "./Icons";
import { Marquee } from "./Marquee";
import { PhoneMock } from "./PhoneMock";

type Props = { locale: Locale; dict: Dictionary; sections: SectionInfo[] };

/** Apple ürün sayfası düzeni: ortalanmış manşet, altında ürün sahnesi. */
export function Hero({ locale, dict, sections }: Props) {
  void sections;
  const ticker = [...skills.mobile, ...skills.backend.slice(0, 3), ...skills.database.slice(0, 2)];
  const years = profile.stats[0];
  const css = (d: string) => ({ "--d": d }) as React.CSSProperties;

  return (
    <section id="top" className="pt-16 md:pt-24">
      <div className={`${container} flex flex-col items-center text-center`}>
        {/* Üst etiketler */}
        <div className="fade-in flex flex-wrap justify-center gap-2" style={css("0ms")}>
          <span className="sticker block-acid">
            <span className="blink inline-block h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
            {dict.hero.available}
          </span>
          <span className="sticker">
            {years.value}
            {years.suffix} {t(years.label, locale).split(" ")[0]}
          </span>
          <span className="sticker hidden sm:inline-flex">✦ {dict.hero.aiBadge}</span>
        </div>

        {/* Manşet */}
        <h1 className="font-display mt-8 text-[clamp(2.8rem,8vw,6.5rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
          <span className="line-mask">
            <span>
              {profile.firstName} {profile.lastName}
              <span className="text-accent">.</span>
            </span>
          </span>
        </h1>
        <p className="line-mask mt-4 text-[clamp(1.15rem,2vw,1.6rem)] font-medium leading-[1.3] tracking-[-0.015em] text-ink-2" style={css("120ms")}>
          <span>{dict.hero.eyebrow}</span>
        </p>
        <p className="fade-in mt-6 max-w-2xl text-[clamp(1.05rem,1.5vw,1.25rem)] leading-[1.55] text-ink-2 text-balance" style={css("300ms")}>
          {t(profile.tagline, locale)}
        </p>

        <div className="fade-in mt-8 flex flex-wrap items-center justify-center gap-3" style={css("420ms")}>
          <a href="#contact" className="btn">
            {dict.hero.contact}
          </a>
          <a href={profile.cvPath} download className="btn btn-ghost">
            <DownloadIcon width={16} height={16} strokeWidth={2} />
            {dict.hero.cv} ›
          </a>
        </div>

        <div className="fade-in mt-6 flex flex-wrap items-center justify-center gap-2" style={css("500ms")}>
          <span className="label mr-1">{dict.hero.platforms}</span>
          <span className="store-badge">
            <AppleIcon width={13} height={13} /> iOS
          </span>
          <span className="store-badge">
            <AndroidIcon width={14} height={14} /> Android
          </span>
        </div>
      </div>

      {/* Ürün sahnesi: telefon, yumuşak gradyanlı yuvarlak zemin üstünde */}
      <div className={`${container} mt-14 md:mt-20`}>
        <div className="hatch relative overflow-hidden rounded-[32px] px-6 pb-14 pt-20 md:rounded-[40px] md:pb-20 md:pt-24">
          <div className="pop-in relative mx-auto w-full max-w-[264px] md:max-w-[300px]" style={css("500ms")}>
            <PhoneMock locale={locale} dict={dict} />
          </div>
          <p className="label absolute left-6 top-6 md:left-10 md:top-8">{dict.facts.now}</p>
          <p className="absolute right-6 top-6 text-[14px] font-medium text-ink-2 md:right-10 md:top-8">{dict.facts.nowValue}</p>
        </div>
      </div>

      {/* Araç şeridi: sessiz gri */}
      <div className="fade-in mt-12 border-y border-rule" style={css("700ms")}>
        <Marquee items={ticker} className="py-3 text-[13px] font-medium text-ink-3" speed={44} separator="·" />
      </div>
    </section>
  );
}
