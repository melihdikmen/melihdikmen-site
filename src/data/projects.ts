import type { Localized } from "@/i18n/config";

export type ProjectStatus = "live" | "beta" | "wip" | "internal";

export type Project = {
  slug: string;
  name: string;
  status: ProjectStatus;
  description: Localized;
  tech: string[];
  /** public/projects/ altındaki görsel. Boş bırakılırsa otomatik kapak üretilir. */
  image?: string;
  /** Kapak rengi (görsel yoksa). */
  accent: string;
  links: {
    appStore?: string;
    playStore?: string;
    github?: string;
    web?: string;
  };
};

export const projects: Project[] = [
  {
    slug: "param",
    name: "Param",
    status: "live",
    description: {
      tr: "Lisanslı e-para kuruluşu Param'ın tüketici cüzdanı: kartlar, para transferi, fatura ödemesi, kampanyalar. 2023'ten beri ana katkıcısıyım.",
      en: "The consumer wallet of licensed e-money institution Param: cards, transfers, bill payments, campaigns. Primary contributor since 2023.",
    },
    tech: ["React Native", "TypeScript", "Redux Toolkit", "Reanimated", "Sentry"],
    accent: "#E8541E",
    links: {
      // TODO: Param uygulamasının App Store ve Google Play adreslerini ekle.
    },
  },
  {
    slug: "idnext",
    name: "IdNext Digital KYC SDK",
    status: "live",
    description: {
      tr: "Partner uygulamaların müşteri kazanımı için içine gömdüğü kimlik doğrulama paketi: belge çekimi, NFC çip okuma, video canlılık, konum kontrolü. iOS 15+ ve Android.",
      en: "The identity verification package partner apps embed for onboarding: document capture, NFC chip read, video liveness, location checks. iOS 15+ and Android.",
    },
    tech: ["React Native", "Swift", "Kotlin", "NFC", "npm"],
    accent: "#0F766E",
    links: {},
  },
  {
    slug: "bip",
    name: "Turkcell BiP",
    status: "live",
    description: {
      tr: "Turkcell'in mesajlaşma, arama ve kanal uygulaması. TODO: üstlendiğin bölümü bir cümleyle yaz.",
      en: "Turkcell's messaging, calling and channels app. TODO: describe the part you owned in one sentence.",
    },
    tech: ["React Native", "TypeScript", "Firebase"],
    accent: "#1D4ED8",
    links: {
      // TODO: BiP mağaza adreslerini ekle.
    },
  },
  {
    slug: "vouch",
    name: "Vouch",
    status: "beta",
    description: {
      tr: "Kısa dönem kiralama ev sahipleri için offline-first temizlik takip uygulaması: madde madde önce/sonra fotoğraf, eksik malzeme, hasar raporu ve paylaşılabilir PDF.",
      en: "An offline-first cleaning-turnover app for short-term-rental hosts: before/after photos per checklist item, low-supply flags, damage reports, and a shareable PDF.",
    },
    tech: ["Expo", "Expo Router", "Supabase", "MMKV", "RevenueCat"],
    accent: "#1B2436",
    links: { github: "https://github.com/melihdikmen/vouch" },
  },
  {
    slug: "restosync",
    name: "RestoSync",
    status: "wip",
    description: {
      tr: "Masa siparişlerini gel-al, kurye ve teslimat platformu siparişleriyle tek akışta birleştiren restoran POS ve mutfak ekranı sistemi.",
      en: "A restaurant POS and kitchen display system that merges dine-in orders with pickup, courier and delivery-platform orders in one flow.",
    },
    tech: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "TanStack Query"],
    accent: "#7C3AED",
    links: {},
  },
];
