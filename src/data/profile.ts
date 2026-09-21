import type { Localized } from "@/i18n/config";

/**
 * Kişisel bilgiler. Siteyi güncellemek için bu dosyayı düzenlemen yeterli.
 */
export const profile = {
  name: "Melih Dikmen",
  firstName: "Melih",
  email: "melihdikmen06@gmail.com",
  location: { tr: "Ankara, Türkiye", en: "Ankara, Türkiye" } satisfies Localized,
  /** Canlı site adresi — Vercel'e deploy ettikten sonra güncelle. */
  siteUrl: "https://melihdikmen.dev",
  /** public/cv/ altındaki dosya adı. */
  cvPath: "/cv/Melih-Dikmen-CV.pdf",
  social: {
    github: "https://github.com/melihdikmen",
    /** TODO: LinkedIn profil adresini ekle. */
    linkedin: "https://www.linkedin.com/in/melihdikmen",
  },
  headline: {
    tr: "Milyonların ödeme yaptığı ve mesajlaştığı uygulamaları geliştiriyorum.",
    en: "I build the apps millions of people pay and message with.",
  } satisfies Localized,
  tagline: {
    tr: "React Native ve TypeScript ile fintech ve iletişim uygulamaları geliştiren, ekip yöneten bir mobil geliştiriciyim.",
    en: "A mobile engineer who ships fintech and messaging apps with React Native and TypeScript, and leads the team doing it.",
  } satisfies Localized,
  about: {
    tr: [
      "Mobil geliştirmeye Ankara'da başladım; Başarsoft'ta harita tabanlı uygulamalarla, Turkcell BiP'te milyonlarca kullanıcısı olan bir mesajlaşma uygulamasıyla ve bugün Param'da lisanslı bir e-para kuruluşunun cüzdanıyla çalıştım.",
      "En sevdiğim işler JavaScript ile platformun kesiştiği yerde: native iOS ve Android modülleri sarmalamak, NFC ile kimlik çipi okumak, birinin kirasının bağlı olduğu cüzdanı bozmadan over-the-air güncelleme çıkmak.",
      "Backend tarafını da biliyorum. .NET Web API ve Oracle PL/SQL ile uçtan uca özellik teslim ettim; bu, mobil ekiple backend ekibi arasındaki konuşmaları kısaltıyor.",
    ],
    en: [
      "I started in mobile in Ankara: map-based apps at Başarsoft, a messaging app with millions of users at Turkcell BiP, and today the wallet of a licensed e-money institution at Param.",
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
  leadership: {
    tr: "Param'da mobil ekibi yönetiyorum: sprint planlama, kod inceleme, mimari kararlar ve yeni gelen geliştiricilerin ilk haftalarını verimli geçirmesi benim sorumluluğumda.",
    en: "At Param I lead the mobile team: sprint planning, code review, architecture decisions, and making a new engineer's first weeks productive are on me.",
  } satisfies Localized,
};
