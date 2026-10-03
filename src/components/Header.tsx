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

const menuTones = ["block-acid", "block-hot", "block-sky", "block-pink"];

export function Header({ locale, dict, sections }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-ink bg-paper">
      <div className={`${container} flex h-16 items-center justify-between gap-4`}>
        <Link
          href={`/${locale}`}
          className="font-display inline-flex h-10 items-center gap-1 border-2 border-ink bg-[#0b0b0b] px-2.5 text-[20px] font-extrabold uppercase leading-none tracking-[-0.02em] text-[#f1efe8] shadow-hard-sm transition-transform active:translate-x-px active:translate-y-px"
          aria-label={profile.name}
        >
          MD<span className="text-acid">.</span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-2">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="group inline-flex items-center gap-1.5 border-2 border-transparent px-2.5 py-1.5 font-mono text-[12px] font-bold uppercase tracking-[0.08em] transition-colors hover:border-ink hover:bg-acid hover:text-[#0b0b0b]"
                >
                  <span className="text-ink-3 group-hover:text-[#0b0b0b]">{s.number}</span>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <span className="label hidden items-center gap-2 border-2 border-ink px-2.5 py-2 xl:inline-flex">
            <span className="blink inline-block h-2 w-2 bg-hot" aria-hidden />
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
        className="fixed inset-0 top-16 z-50 flex flex-col overflow-y-auto bg-paper lg:hidden"
      >
        <ol className="flex flex-1 flex-col">
          {sections.map((s, i) => (
            <li key={s.id} className={`${menuTones[i % menuTones.length]} border-b-[3px] border-ink`}>
              <a
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                className={`${container} font-display flex items-baseline justify-between gap-4 py-5 text-[clamp(2rem,9vw,3.4rem)] font-extrabold uppercase leading-none tracking-[-0.02em]`}
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-[12px] font-bold">{s.number}</span>
                  {s.label}
                </span>
                <span aria-hidden>→</span>
              </a>
            </li>
          ))}
        </ol>
        <p className={`${container} label flex items-center justify-between py-5`}>
          <span>{profile.location[locale]}</span>
          <LocalTime locale={locale} seconds={false} />
        </p>
      </nav>
    </header>
  );
}
