import type { Dictionary } from "@/i18n/tr";

export type SectionInfo = { id: string; label: string; number: string };

/** Sayfadaki bölümler (App Store sırası); başlık ve menü aynı listeyi kullanır. */
export function getSections(dict: Dictionary, showBlog: boolean): SectionInfo[] {
  const ids: [string, string][] = [
    ["projects", dict.store.screenshots],
    ["about", dict.store.description],
    ["experience", dict.store.whatsNew],
    ["reviews", dict.store.ratings],
    ["skills", dict.store.info],
    ...(showBlog ? ([["blog", dict.nav.blog]] as [string, string][]) : []),
    ["contact", dict.store.support],
  ];
  return ids.map(([id, label], i) => ({ id, label, number: String(i + 1).padStart(2, "0") }));
}
