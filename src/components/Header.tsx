"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleSwitch } from "./LocaleSwitch";
import { CloseIcon, MenuIcon } from "./Icons";
import { profile } from "@/data/profile";

type Props = { locale: Locale; dict: Dictionary; showBlog: boolean };

export function Header({ locale, dict, showBlog }: Props) {
  const [open, setOpen] = useState(false);
  const items = [
    ["about", dict.nav.about],
    ["experience", dict.nav.experience],
    ["projects", dict.nav.projects],
    ["skills", dict.nav.skills],
    ...(showBlog ? [["blog", dict.nav.blog]] : []),
    ["contact", dict.nav.contact],
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-bg/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5">
        <Link href={`/${locale}`} className="font-display text-lg font-extrabold tracking-tight">
          {profile.name}
          <span className="text-gradient">.</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {items.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} className="font-mono text-[13px] text-muted transition-colors hover:text-ink">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitch locale={locale} label={dict.lang.switch} short={dict.lang.short} />
          <ThemeToggle label={dict.theme.toggle} />
          <button
            type="button"
            id="menu-toggle"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? dict.nav.close : dict.nav.menu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <nav id="mobile-nav" hidden={!open} aria-label="Mobile" className="border-t border-line md:hidden">
        <ul className="mx-auto flex max-w-6xl flex-col px-5 py-2">
          {items.map(([id, label]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="block py-3 font-mono text-sm text-muted transition-colors hover:text-ink"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
