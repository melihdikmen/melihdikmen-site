import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { profile } from "@/data/profile";
import { t } from "@/lib/i18n";
import { container } from "@/lib/ui";
import { ShareIcon } from "../Icons";
import { AppIcon } from "./AppIcon";

/** Ürün sayfası üstü: ikon, ad, alt başlık, EDİN düğmesi, bilgi karoları. */
export function StoreHero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const s = dict.store;
  const [years, companies, apps, platforms] = profile.stats;
  void companies;
  const tiles = [
    { label: s.tiles.years, value: `${years.value}${years.suffix}`, sub: t(years.label, locale).replace(/^\d+\+?\s*/, "") },
    { label: s.tiles.apps, value: String(apps.value), sub: t(apps.label, locale).replace(/^\d+\s*/, "") },
    { label: s.tiles.platforms, value: String(platforms.value), sub: "RN · Android · Flutter" },
    { label: s.tiles.location, value: s.tiles.locationValue, sub: s.tiles.locationSub },
  ];

  return (
    <section className={`${container} pt-8 md:pt-12`}>
      <div className="flex gap-5 md:gap-8">
        <AppIcon className="h-[104px] w-[104px] shrink-0 text-[52px] md:h-[150px] md:w-[150px] md:text-[72px]" />
        <div className="flex min-w-0 flex-1 flex-col">
          <h1 className="display text-[clamp(1.6rem,3.6vw,2.6rem)] leading-[1.05]">{profile.name}</h1>
          <p className="mt-1 text-[clamp(0.95rem,1.4vw,1.15rem)] text-ink-3">{dict.hero.eyebrow}</p>
          <div className="mt-auto flex items-center gap-3 pt-4">
            <a href="#contact" className="get" title={s.getHint}>
              {s.get}
            </a>
            <span className="hidden text-[12px] text-ink-3 sm:inline">{s.inAppNote}</span>
            <a href={profile.cvPath} download className="icon-btn ml-auto" aria-label={s.share} title={s.share}>
              <ShareIcon width={17} height={17} strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>

      <p className="mt-5 text-[13px] text-ink-3 md:hidden">
        {s.developer}: {profile.name} · {t(profile.location, locale)}
      </p>

      <div className="tiles mt-6 border-y border-rule py-4 md:mt-8">
        {tiles.map((tl) => (
          <div key={tl.label} className="tile">
            <small>{tl.label}</small>
            <b>{tl.value}</b>
            <span className="truncate">{tl.sub}</span>
          </div>
        ))}
        <div className="tile hidden md:block">
          <small>{s.developer}</small>
          <b className="text-[15px]!">{profile.name}</b>
          <span>{t(profile.location, locale)}</span>
        </div>
      </div>
    </section>
  );
}
