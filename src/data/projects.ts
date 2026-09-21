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
      tr: "Lisanslı e-para kuruluşu Param'ın dijital cüzdanı: kartlar, para transferi, fatura ödemesi, kampanyalar. 2023'te React Native ile sıfırdan başlattım, ana katkıcısıyım.",
      en: "The digital wallet of licensed e-money institution Param: cards, transfers, bill payments, campaigns. Started it from scratch with React Native in 2023; primary contributor since.",
    },
    tech: ["React Native", "TypeScript", "Redux Toolkit", "Firebase", "Sentry", "CodePush"],
    accent: "#E8541E",
    links: {
      // TODO: Param uygulamasının App Store ve Google Play adreslerini ekle.
    },
  },
  {
    slug: "bip",
    name: "Turkcell BiP",
    status: "live",
    description: {
      tr: "Turkcell'in milyonlarca kullanıcısı olan mesajlaşma ve arama uygulaması. VoIP ekibinde Jitsi Meet tabanlı gerçek zamanlı görüşme özelliklerini entegre ettim ve özelleştirdim.",
      en: "Turkcell's messaging and calling app with millions of users. In the VoIP team I integrated and customised Jitsi Meet based real-time calling features.",
    },
    tech: ["React Native", "Redux", "Jitsi Meet", "WebRTC"],
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
