import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { profile } from "@/data/profile";
import { t } from "@/lib/i18n";
import { container } from "@/lib/ui";
import { Marquee } from "./Marquee";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const site = profile.siteUrl.replace(/^https?:\/\//, "");
  return (
    <footer className="inverted border-t border-acid/40">
      <Marquee
        items={[site.toUpperCase(), profile.name.toUpperCase(), dict.hero.eyebrow.toUpperCase()]}
        className="font-display outline-text border-b border-rule py-3 text-[clamp(1.8rem,5vw,4rem)] font-extrabold uppercase leading-none"
        speed={28}
        separator="✦"
      />
      <div className={`${container} label flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-6 text-ink-3`}>
        <span>
          © {new Date().getFullYear()} {profile.name} · {dict.footer.rights}
        </span>
        <span className="hidden md:inline">
          {dict.footer.typeset} {dict.footer.built}
        </span>
        <span className="flex items-center gap-6">
          <span>{t(profile.location, locale)}</span>
          <a href="#top" className="icon-btn h-auto w-auto whitespace-nowrap px-3 py-2">
            {dict.nav.top} ↑
          </a>
        </span>
      </div>
    </footer>
  );
}
