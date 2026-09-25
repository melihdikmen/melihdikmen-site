import type { Dictionary } from "@/i18n/tr";

export type SectionInfo = { id: string; label: string; number: string };

/** Sayfadaki numaralı bölümler; başlık, menü ve alt köşe göstergesi aynı listeyi kullanır. */
export function getSections(dict: Dictionary, showBlog: boolean): SectionInfo[] {
  const ids: [string, string][] = [
    ["about", dict.nav.about],
    ["experience", dict.nav.experience],
    ["projects", dict.nav.projects],
    ["skills", dict.nav.skills],
    ...(showBlog ? ([["blog", dict.nav.blog]] as [string, string][]) : []),
    ["contact", dict.nav.contact],
  ];
  return ids.map(([id, label], i) => ({ id, label, number: String(i + 1).padStart(2, "0") }));
}
