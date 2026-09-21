import type { Localized } from "@/i18n/config";

export type Experience = {
  company: string;
  role: Localized;
  /**
   * "2023-07" gibi YYYY-AA formatında. end boş bırakılırsa "Bugün" yazılır.
   * TODO: Turkcell BiP ve Başarsoft tarihlerini doldur.
   */
  start?: string;
  end?: string;
  location: Localized;
  summary: Localized;
  highlights: Localized[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    company: "Param",
    role: { tr: "Mobil Uygulama Geliştirici & Takım Lideri", en: "Mobile Engineer & Team Lead" },
    start: "2023-07",
    location: { tr: "Remote", en: "Remote" },
    summary: {
      tr: "Türkiye'nin en büyük ödeme ve e-para şirketlerinden Param'ın tüketici cüzdanı ve dijital kimlik doğrulama SDK'sı.",
      en: "The consumer wallet and digital identity verification SDK of Param, one of Türkiye's largest payment and e-money companies.",
    },
    highlights: [
      {
        tr: "Param mobil uygulamasının en aktif katkıcısıyım (2.100+ commit): kartlar, transferler, fatura ödemeleri.",
        en: "Most active contributor to the Param mobile app (2,100+ commits): cards, transfers, bill payments.",
      },
      {
        tr: "IdNext Digital KYC SDK'sını tasarladım ve yayınladım: belge çekimi, NFC ile kimlik çipi okuma, video canlılık. Partner uygulamalar npm paketi olarak kullanıyor.",
        en: "Designed and published the IdNext Digital KYC SDK: document capture, NFC ID chip read, video liveness. Partner apps consume it as an npm package.",
      },
      {
        tr: "Over-the-air güncelleme altyapısını, Sentry ile çökme takibini ve Testing Library ile bileşen testlerini kurdum.",
        en: "Set up over-the-air updates, crash monitoring with Sentry, and component tests with Testing Library.",
      },
    ],
    tags: ["React Native", "TypeScript", "Redux Toolkit", "Swift / Kotlin bridge", "NFC", "Sentry"],
  },
  {
    company: "Turkcell BiP",
    role: { tr: "Mobil Uygulama Geliştirici", en: "Mobile Engineer" },
    // TODO: start / end tarihlerini ekle.
    location: { tr: "Ankara", en: "Ankara" },
    summary: {
      tr: "Turkcell'in milyonlarca kullanıcısı olan mesajlaşma ve iletişim uygulaması BiP.",
      en: "BiP, Turkcell's messaging and communication app with millions of users.",
    },
    highlights: [
      {
        tr: "TODO: BiP'te üstlendiğin özellikleri ve etkisini yaz (ör. ekranlar, performans işleri, kullanıcı sayısı).",
        en: "TODO: Describe the features you owned at BiP and their impact (screens, performance work, user numbers).",
      },
    ],
    tags: ["React Native", "TypeScript", "Firebase"],
  },
  {
    company: "Başarsoft",
    role: { tr: "Yazılım Geliştirici", en: "Software Engineer" },
    // TODO: start / end tarihlerini ekle.
    location: { tr: "Ankara", en: "Ankara" },
    summary: {
      tr: "Harita ve coğrafi bilgi sistemleri üzerine çalışan Başarsoft'ta mobil ve backend geliştirme.",
      en: "Mobile and backend development at Başarsoft, a maps and geographic information systems company.",
    },
    highlights: [
      {
        tr: "TODO: Başarsoft'taki projeleri yaz (ör. Flutter uygulamaları, .NET Web API servisleri, Oracle PL/SQL).",
        en: "TODO: Describe the Başarsoft projects (Flutter apps, .NET Web API services, Oracle PL/SQL).",
      },
    ],
    tags: ["Flutter", ".NET Web API", "Oracle PL/SQL"],
  },
];
