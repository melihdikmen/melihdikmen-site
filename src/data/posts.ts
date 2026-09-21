import type { Localized } from "@/i18n/config";

export type Post = {
  title: Localized;
  summary: Localized;
  date: string; // YYYY-MM-DD
  url: string; // Medium, dev.to, kişisel blog vb.
};

/** Boş bırakılırsa "Yazılar" bölümü gizlenir. */
export const posts: Post[] = [];
