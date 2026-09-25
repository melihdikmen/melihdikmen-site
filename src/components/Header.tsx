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
    <header className="sticky top-0 z-40 rule-b bg-paper">
      <div className={`${container} flex h-14 items-center justify-between gap-4`}>
        <Link href={`/${locale}`} className="font-display text-[21px] italic leading-none tracking-[-0.01em]">
          {profile.name}
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="group flex items-baseline gap-1.5 text-[13.5px]">
                  <span className="font-mono text-[10px] text-ink-3">{s.number}</span>
                  <span className="u-draw">{s.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3 lg:inline">
            ANK <LocalTime locale={locale} seconds={false} />
          </span>
          <LocaleSwitch locale={locale} label={dict.lang.switch} short={dict.lang.short} />
          <ThemeToggle label={dict.theme.toggle} />
          <button
            type="button"
            id="menu-toggle"
            className="inline-flex h-8 w-8 items-center justify-center text-ink-2 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? dict.nav.close : dict.nav.menu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Tam ekran mobil dizin */}
      <nav
        id="mobile-nav"
        hidden={!open}
        aria-label="Mobile"
        className="fixed inset-0 top-14 z-50 flex flex-col bg-paper md:hidden"
      >
        <ol className={`${container} flex-1 pt-6`}>
          {sections.map((s) => (
            <li key={s.id} className="rule-b">
              <a
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 py-4 font-display text-[2.4rem] font-normal leading-none tracking-[-0.02em]"
              >
                <span className="font-mono text-[11px] text-ink-3">{s.number}</span>
                {s.label}
              </a>
            </li>
          ))}
        </ol>
        <p className={`${container} smallcaps pb-8`}>
          {profile.location[locale]} · <LocalTime locale={locale} seconds={false} />
        </p>
      </nav>
    </header>
  );
}
