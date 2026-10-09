import type { Localized } from "@/i18n/config";

export type ProjectStatus = "live" | "beta" | "wip" | "internal";
export type Platform = "ios" | "android" | "web";

export type Project = {
  slug: string;
  name: string;
  status: ProjectStatus;
  description: Localized;
  tech: string[];
  /** Uygulamanın çalıştığı platformlar; kartta mağaza rozeti olarak görünür. */
  platforms: Platform[];
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
    platforms: ["ios", "android"],
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
    platforms: ["ios", "android"],
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
    platforms: ["ios", "android"],
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
    platforms: ["web"],
    accent: "#7C3AED",
    links: {},
  },
];

export type PastProject = {
  year: string;
  name: string;
  platform: string;
  description: Localized;
};

/** Başarsoft dönemi ve öğrencilik projeleri; kompakt liste olarak gösterilir. */
export const pastProjects: PastProject[] = [
  {
    year: "2021",
    name: "Orman Yangını Karar Destek Sistemi",
    platform: "React Native · GIS",
    description: {
      tr: "Aktif ve sönmüş yangınları haritada gösteren, girilen parametrelere göre yangının yayılımını tahmin eden, söndürme ekiplerinin konumlarını, alan ve mesafe ölçümünü sunan uygulama.",
      en: "Shows active and extinguished fires on the map, estimates fire spread from entered parameters, and displays firefighting units' positions with area and distance measurement.",
    },
  },
  {
    year: "2021",
    name: "Saka Su Teslimatçı",
    platform: "Flutter",
    description: {
      tr: "Saka Su bayilerinin sipariş dağıtım uygulaması. Siparişler harita ve listede zamana göre sıralanır, arka planda her dakika yenilenir; yeni, değişen ve iptal edilen siparişler bildirimle gelir, teslimat rotası haritada çizilir.",
      en: "Order distribution app for Saka Su dealers. Orders are listed and mapped by time, refreshed in the background every minute; new, changed and cancelled orders arrive as notifications, and the delivery route is drawn on the map.",
    },
  },
  {
    year: "2020",
    name: "Saka Su Dağıtım",
    platform: "Android",
    description: {
      tr: "Aynı dağıtım akışının native Android sürümü: sipariş listesi ve haritası, bildirimler, teslimat rotası ve teslim edilen siparişler için ayrı ekran.",
      en: "The native Android version of the same distribution flow: order list and map, notifications, delivery route, and a separate screen for delivered orders.",
    },
  },
  {
    year: "2020",
    name: "Erikli Dağıtım",
    platform: "Android",
    description: {
      tr: "Erikli su bayilerinin kullandığı sipariş uygulaması. Gelen siparişler haritada ve listede sıralanır, seçilen sipariş için rota çizilir, sipariş içeriği güncellenip iptal edilebilir.",
      en: "Order app used by Erikli water dealers. Incoming orders are sorted on the map and in a list, a route is drawn for the chosen order, and order contents can be updated or cancelled.",
    },
  },
  {
    year: "2020",
    name: "GFK Anket",
    platform: "Android",
    description: {
      tr: "GFK'nın 10 ülkede aktif kullanılan anket uygulamasının geliştirme ve hata düzeltme çalışmaları.",
      en: "Development and bug fixing on GFK's survey app, actively used in 10 countries.",
    },
  },
  {
    year: "2019",
    name: "Başar Filo",
    platform: "React Native",
    description: {
      tr: "Şirket araçlarının yönetimi için mobil uygulama. Araçlar için rezervasyon yapılır, yönetici bildirimle onaylar, onay kullanıcıya bildirim olarak döner; araç bilgileri yöneticiden düzenlenir.",
      en: "Fleet management app for company cars. Users book a car, the manager approves from a notification, and the confirmation returns to the user as a notification; car details are edited by the manager.",
    },
  },
  {
    year: "2018",
    name: "Splitpay",
    platform: "React Native",
    description: {
      tr: "Ortak harcamaları eşit ya da belirlenen katsayılara göre paylaştıran grup uygulaması; grup üyeleri anlık mesajlaşabilir.",
      en: "A group app that splits shared expenses equally or by set coefficients, with instant chat between group members.",
    },
  },
];
