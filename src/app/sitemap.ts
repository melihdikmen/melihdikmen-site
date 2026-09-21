import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = profile.siteUrl.replace(/\/$/, "");
  const languages = Object.fromEntries(locales.map((l) => [l, `${base}/${l}`]));
  return locales.map((locale) => ({
    url: `${base}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === "tr" ? 1 : 0.9,
    alternates: { languages },
  }));
}
