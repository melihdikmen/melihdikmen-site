import type { Localized } from "@/i18n/config";

export type Experience = {
  company: string;
  role: Localized;
  /** YYYY-AA formatında. end boş bırakılırsa "Bugün" yazılır. */
  start?: string;
  end?: string;
  location: Localized;
  summary: Localized;
  highlights: Localized[];
  tags: string[];
  /** Staj gibi kısa girişler zaman çizelgesinde küçük gösterilir. */
  compact?: boolean;
};

export const experience: Experience[] = [
  {
    company: "Param",
    role: { tr: "Senior Mobil Geliştirici · Takım Lideri", en: "Senior Mobile Developer · Team Lead" },
    start: "2023-06",
    location: { tr: "Remote", en: "Remote" },
    summary: {
      tr: "Türkiye'nin en büyük ödeme ve e-para şirketlerinden Param'ın dijital cüzdanı ve dijital kimlik doğrulama SDK'sı.",
      en: "The digital wallet and identity verification SDK of Param, one of Türkiye's largest payment and e-money companies.",
    },
    highlights: [
      {
        tr: "Param dijital cüzdan uygulamasını React Native ile sıfırdan geliştirdim; kod tabanının en aktif katkıcısıyım (2.100+ commit).",
        en: "Built the Param digital wallet app from scratch with React Native; most active contributor to the codebase (2,100+ commits).",
      },
      {
        tr: "Mobil ekibi yönetiyorum: kod kalitesi, ekip koordinasyonu ve iş hedefleriyle uyumlu geliştirme süreci planlaması.",
        en: "Lead the mobile team: code quality, team coordination, and planning the development workflow in line with business goals.",
      },
      {
        tr: "Dijital kimlik doğrulama (KYC) SDK'sını tasarladım ve yayınladım: belge çekimi, NFC ile kimlik çipi okuma, video canlılık. Partner uygulamalar npm paketi olarak kullanıyor.",
        en: "Designed and published the digital identity verification (KYC) SDK: document capture, NFC ID chip read, video liveness. Partner apps consume it as an npm package.",
      },
      {
        tr: "Over-the-air güncelleme altyapısını, Sentry ile çökme takibini ve Smartlook ile oturum analizini kurdum.",
        en: "Set up over-the-air updates, crash monitoring with Sentry, and session analytics with Smartlook.",
      },
    ],
    tags: ["React Native", "TypeScript", "Redux Toolkit", "Firebase", "Sentry", "CodePush", "Smartlook", "Swift / Kotlin bridge"],
  },
  {
    company: "Turkcell BiP",
    role: { tr: "Mobil Uygulama Geliştirici", en: "Mobile Application Developer" },
    start: "2022-06",
    end: "2023-06",
    location: { tr: "Remote", en: "Remote" },
    summary: {
      tr: "Turkcell'in milyonlarca kullanıcısı olan mesajlaşma ve iletişim uygulaması BiP'in VoIP ekibi.",
      en: "The VoIP team of BiP, Turkcell's messaging and communication app with millions of users.",
    },
    highlights: [
      {
        tr: "Gerçek zamanlı görüşme özellikleri için Jitsi Meet kütüphanesini React Native uygulamasına entegre ettim ve özelleştirdim.",
        en: "Integrated and customised the Jitsi Meet library inside the React Native app for real-time communication features.",
      },
    ],
    tags: ["React Native", "Redux", "Jitsi Meet", "WebRTC"],
  },
  {
    company: "Başarsoft",
    role: { tr: "Mobil Geliştirici", en: "Mobile Developer" },
    start: "2019-09",
    end: "2022-06",
    location: { tr: "Ankara", en: "Ankara" },
    summary: {
      tr: "Harita ve coğrafi bilgi sistemleri şirketi Başarsoft'ta mobil ve backend geliştirme.",
      en: "Mobile and backend development at Başarsoft, a maps and geographic information systems company.",
    },
    highlights: [
      {
        tr: "React Native, native Android ve iOS ile mobil uygulamalar geliştirdim; Flutter projelerine katkı verdim.",
        en: "Built mobile apps with React Native, native Android and iOS; contributed to Flutter projects.",
      },
      {
        tr: "Backend tarafında .NET Web API servisleri yazdım, Oracle PL/SQL ve PostgreSQL veritabanlarını yönettim.",
        en: "On the backend, wrote .NET Web API services and managed Oracle PL/SQL and PostgreSQL databases.",
      },
    ],
    tags: ["React Native", "Android", "iOS", "Flutter", ".NET Web API", "Oracle PL/SQL", "PostgreSQL"],
  },
  {
    company: "Başarsoft",
    role: { tr: "Stajyer", en: "Intern" },
    start: "2019-06",
    end: "2019-09",
    location: { tr: "Ankara", en: "Ankara" },
    summary: {
      tr: "React Native ile mobil uygulama geliştirme stajı.",
      en: "Mobile development internship with React Native.",
    },
    highlights: [],
    tags: ["React Native"],
    compact: true,
  },
  {
    company: "Sentos",
    role: { tr: "Stajyer", en: "Intern" },
    start: "2019-02",
    end: "2019-06",
    location: { tr: "Konya", en: "Konya" },
    summary: {
      tr: "Web geliştirme ve pazaryeri entegrasyonu projelerinde destek.",
      en: "Assisted in web development and marketplace integration projects.",
    },
    highlights: [],
    tags: ["JavaScript", "HTML & CSS"],
    compact: true,
  },
];
