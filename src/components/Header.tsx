"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import type { SectionInfo } from "@/lib/sections";
import { container } from "@/lib/ui";
import { profile } from "@/data/profile";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleSwitch } from "./LocaleSwitch";
import { LocalTime } from "./LocalTime";
import { CloseIcon, MenuIcon } from "./Icons";

type Props = { locale: Locale; dict: Dictionary; sections: SectionInfo[] };

export function Header({ locale, dict, sections }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-rule/70 bg-paper/75 backdrop-blur-xl backdrop-saturate-150">
      <div className={`${container} flex h-14 items-center justify-between gap-4`}>
        <Link
          href={`/${locale}`}
          className="font-display inline-flex h-10 items-center text-[19px] font-semibold tracking-[-0.03em]"
          aria-label={profile.name}
        >
          {profile.firstName} {profile.lastName}<span className="text-accent">.</span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="group inline-flex items-center rounded-full px-3 py-1.5 text-[13px] font-medium text-ink-2 transition-colors hover:bg-paper-2 hover:text-ink"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-2 text-[13px] font-medium text-ink-3 xl:inline-flex">
            <span className="blink inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            ANK <LocalTime locale={locale} seconds={false} />
          </span>
          <LocaleSwitch locale={locale} label={dict.lang.switch} short={dict.lang.short} />
          <ThemeToggle label={dict.theme.toggle} />
          <button
            type="button"
            id="menu-toggle"
            className="icon-btn lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? dict.nav.close : dict.nav.menu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon strokeWidth={2.4} /> : <MenuIcon strokeWidth={2.4} />}
          </button>
        </div>
      </div>

      {/* Tam ekran menü: her satır bir renk bloğu. */}
      <nav
        id="mobile-nav"
        hidden={!open}
        aria-label="Mobile"
        className="fixed inset-0 top-14 z-50 flex flex-col overflow-y-auto bg-paper/95 backdrop-blur-xl lg:hidden"
      >
        <ol className="flex flex-1 flex-col px-5 pt-4">
          {sections.map((s) => (
            <li key={s.id} className="border-b border-rule">
              <a
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                className="font-display flex items-baseline justify-between gap-4 py-4 text-[clamp(1.6rem,6vw,2.2rem)] font-semibold tracking-[-0.03em]"
              >
                <span>{s.label}</span>
                <span aria-hidden className="text-ink-3">›</span>
              </a>
            </li>
          ))}
        </ol>
        <p className={`${container} label flex items-center justify-between py-6`}>
          <span>{profile.location[locale]}</span>
          <LocalTime locale={locale} seconds={false} />
        </p>
      </nav>
    </header>
  );
}
