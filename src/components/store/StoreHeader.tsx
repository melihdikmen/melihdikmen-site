import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import type { SectionInfo } from "@/lib/sections";
import { container } from "@/lib/ui";
import { profile } from "@/data/profile";
import { ThemeToggle } from "../ThemeToggle";
import { LocaleSwitch } from "../LocaleSwitch";

type Props = { locale: Locale; dict: Dictionary; sections: SectionInfo[] };

/** Buzlu cam üst bar: solda dekoratif "‹ Uygulamalar", ortada bölüm bağlantıları. */
export function StoreHeader({ locale, dict, sections }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-rule/70 bg-paper/80 backdrop-blur-xl backdrop-saturate-150">
      <div className={`${container} flex h-12 items-center justify-between gap-4`}>
        <Link href={`/${locale}`} className="flex items-center gap-1 text-[15px] font-medium text-accent" aria-label={profile.name}>
          <span aria-hidden className="text-[20px] leading-none">‹</span>
          {dict.store.back}
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-0.5">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="rounded-full px-3 py-1.5 text-[13px] font-medium text-ink-2 transition-colors hover:bg-paper-2 hover:text-ink">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitch locale={locale} label={dict.lang.switch} short={dict.lang.short} />
          <ThemeToggle label={dict.theme.toggle} />
        </div>
      </div>
    </header>
  );
}
