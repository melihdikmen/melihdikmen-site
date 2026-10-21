import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { container } from "@/lib/ui";
import { profile } from "@/data/profile";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleSwitch } from "./LocaleSwitch";

/** Yalnızca masaüstü: sahnenin üstünde ince bir çubuk. Mobilde uygulama kendi çubuğunu taşır. */
export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <header className="hidden lg:block">
      <div className={`${container} flex h-14 items-center justify-between`}>
        <Link href={`/${locale}`} className="text-[17px] font-semibold tracking-[-0.02em] text-stage-ink" aria-label={profile.name}>
          {profile.name}
          <span className="text-accent">.</span>
        </Link>
        <div className="flex items-center gap-2 [&_.icon-btn]:bg-white/10 [&_.icon-btn]:text-stage-ink">
          <LocaleSwitch locale={locale} label={dict.lang.switch} short={dict.lang.short} />
          <ThemeToggle label={dict.theme.toggle} />
        </div>
      </div>
    </header>
  );
}
