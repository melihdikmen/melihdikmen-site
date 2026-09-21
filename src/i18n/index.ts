import { tr } from "./tr";
import { en } from "./en";
import type { Locale } from "./config";

export const dictionaries = { tr, en } as const;
export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
export * from "./config";
