import type { Localized } from "@/i18n/config";

/**
 * Kişisel bilgiler. Siteyi güncellemek için bu dosyayı düzenlemen yeterli.
 */
export const profile = {
  name: "Melih Dikmen",
  firstName: "Melih",
  lastName: "Dikmen",
  email: "melihdikmen06@gmail.com",
  location: { tr: "Ankara, Türkiye", en: "Ankara, Türkiye" } satisfies Localized,
  /** Canlı site adresi — Vercel'e deploy ettikten sonra güncelle. */
  siteUrl: "https://melihdikmen.com",
  /** public/cv/ altındaki dosya adı. */
  cvPath: "/cv/Melih-Dikmen-CV.pdf",
  social: {
    github: "https://github.com/melihdikmen",
    linkedin: "https://www.linkedin.com/in/melih-dikmen-79669a119/",
  },
  stats: [
    { value: 7, suffix: "+", label: { tr: "yıl mobil geliştirme", en: "years building mobile" } },
    { value: 3, suffix: "", label: { tr: "şirket: Param, Turkcell, Başarsoft", en: "companies: Param, Turkcell, Başarsoft" } },
    { value: 11, suffix: "", label: { tr: "yayınlanan uygulama", en: "apps shipped" } },
    { value: 3, suffix: "", label: { tr: "platform: RN, Android, Flutter", en: "platforms: RN, Android, Flutter" } },
  ],
  tagline: {
    tr: "React Native, Flutter ve TypeScript ile fintech'ten harita ve saha uygulamalarına birçok alanda mobil ürün geliştiren, ekip yöneten bir mobil geliştiriciyim.",
    en: "A mobile engineer who ships apps across fintech, maps and field operations with React Native, Flutter and TypeScript, and leads the team doing it.",
  } satisfies Localized,
  about: {
    tr: [
      "2019'dan beri mobil uygulama geliştiriyorum. Başarsoft'ta harita tabanlı uygulamalarla başladım, Turkcell BiP'in VoIP ekibinde milyonlarca kullanıcının görüşme deneyimi üzerinde çalıştım, bugün Param'da lisanslı bir e-para kuruluşunun dijital cüzdanını sıfırdan geliştirip ekibini yönetiyorum.",
      "En sevdiğim işler JavaScript ile platformun kesiştiği yerde: native iOS ve Android modülleri sarmalamak, NFC ile kimlik çipi okumak, birinin kirasının bağlı olduğu cüzdanı bozmadan over-the-air güncelleme çıkmak.",
      "Backend tarafını da biliyorum. .NET Web API ve Oracle PL/SQL ile uçtan uca özellik teslim ettim; bu, mobil ekiple backend ekibi arasındaki konuşmaları kısaltıyor.",
    ],
    en: [
      "I have been building mobile apps since 2019. I started with map-based apps at Başarsoft, worked on the calling experience of millions of users in Turkcell BiP's VoIP team, and today I build and lead the digital wallet of a licensed e-money institution at Param, which I started from scratch.",
      "The work I like most sits where JavaScript meets the platform: wrapping native iOS and Android modules, reading ID chips over NFC, shipping over-the-air updates without breaking a wallet someone's rent depends on.",
      "I also know the backend. I have delivered features end to end with .NET Web API and Oracle PL/SQL, which keeps the conversation between the mobile and backend teams short.",
    ],
  },
  focus: [
    { tr: "React Native mimarisi ve performans", en: "React Native architecture and performance" },
    { tr: "Native modül köprüleri (Swift / Kotlin)", en: "Native module bridges (Swift / Kotlin)" },
    { tr: "Fintech: KYC, ödeme, güvenlik", en: "Fintech: KYC, payments, security" },
    { tr: "Yayın süreçleri ve OTA güncellemeler", en: "Release pipelines and OTA updates" },
  ],
  education: [
    {
      school: { tr: "Selçuk Üniversitesi", en: "Selçuk University" },
      degree: { tr: "Bilgisayar Mühendisliği, Lisans", en: "B.Sc. in Computer Engineering" },
      period: "2015 — 2020",
      location: { tr: "Konya", en: "Konya" },
    },
  ],
  leadership: {
    tr: "Param'da mobil ekibi yönetiyorum: kod kalitesi, ekip koordinasyonu, mimari kararlar ve geliştirme sürecinin iş hedefleriyle uyumlu planlanması benim sorumluluğumda.",
    en: "At Param I lead the mobile team: code quality, team coordination, architecture decisions, and planning the development workflow in line with business goals are on me.",
  } satisfies Localized,
};
