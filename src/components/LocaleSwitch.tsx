"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";

export function LocaleSwitch({ locale, label, short }: { locale: Locale; label: string; short: string }) {
  const pathname = usePathname() ?? `/${locale}`;
  const other: Locale = locale === "tr" ? "en" : "tr";
  const target = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), `/${other}`) || `/${other}`;
  return (
    <Link
      href={target}
      hrefLang={other}
      aria-label={label}
      title={label}
      onClick={() => {
        try {
          document.cookie = `locale=${other}; path=/; max-age=31536000; samesite=lax`;
        } catch {}
      }}
      className="u font-mono text-[11px] uppercase tracking-[0.16em] text-ink-2"
    >
      {short}
    </Link>
  );
}
