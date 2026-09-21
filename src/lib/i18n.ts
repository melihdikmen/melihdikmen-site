import type { Locale, Localized } from "@/i18n/config";

/** Bilingual alanı aktif dile göre çözer. */
export function t(value: Localized, locale: Locale): string {
  return value[locale];
}

/** "2023-07" → "Tem 2023" / "Jul 2023" */
export function formatMonth(value: string, locale: Locale): string {
  const [y, m] = value.split("-").map(Number);
  const date = new Date(Date.UTC(y, (m || 1) - 1, 1));
  const s = new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
  return s.replace(".", "");
}
