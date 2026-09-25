import type { Localized } from "@/i18n/config";

/**
 * "Hikâye" bölümü: telefon ekranında oynayan bölümler.
 * Metinleri buradan düzenleyebilirsin. `scene` değeri telefondaki animasyonu seçer;
 * yeni sahne türü eklemek bileşende kod gerektirir.
 */
export type StoryScene = "splash" | "code" | "map" | "call" | "wallet" | "nfc" | "home";

export type StoryChapter = {
  scene: StoryScene;
  /** Arkadaki büyük yazı ve zaman çizelgesindeki etiket. */
  mark: string;
  label: Localized;
  eyebrow: Localized;
  title: Localized;
  body: Localized;
  chips: string[];
};

export const story: StoryChapter[] = [
  {
    scene: "splash",
    mark: "1996",
    label: { tr: "Merhaba", en: "Hello" },
    eyebrow: { tr: "1996 · Ankara", en: "1996 · Ankara" },
    title: { tr: "Merhaba, ben Melih.", en: "Hi, I'm Melih." },
    body: {
      tr: "Mobil uygulama geliştiriciyim. Param'da mobil ekibi yönetiyorum ve Ankara'dan uzaktan çalışıyorum. Hikâyemi birkaç ekranda anlatayım.",
      en: "I build mobile apps. I lead the mobile team at Param and work remotely from Ankara. Here is my story in a few screens.",
    },
    chips: ["React Native", "TypeScript", "Flutter"],
  },
  {
    scene: "code",
    mark: "2015",
    label: { tr: "Selçuk Üni.", en: "Selçuk Univ." },
    eyebrow: { tr: "2015 – 2020 · Konya", en: "2015 – 2020 · Konya" },
    title: { tr: "İlk satırlar Konya'da yazıldı.", en: "The first lines were written in Konya." },
    body: {
      tr: "Selçuk Üniversitesi'nde Bilgisayar Mühendisliği okudum. 2018'de arkadaşlar arası masraf bölüşmek için ilk React Native uygulamam Splitpay'i yazdım. 2019'da Sentos'ta ilk stajımı yaptım.",
      en: "I studied Computer Engineering at Selçuk University. In 2018 I wrote my first React Native app, Splitpay, for splitting expenses between friends. In 2019 I did my first internship at Sentos.",
    },
    chips: ["Computer Eng.", "Splitpay", "Sentos"],
  },
  {
    scene: "map",
    mark: "2019",
    label: { tr: "Başarsoft", en: "Başarsoft" },
    eyebrow: { tr: "2019 – 2022 · Başarsoft", en: "2019 – 2022 · Başarsoft" },
    title: { tr: "Haritalar, filolar, teslimatlar.", en: "Maps, fleets, deliveries." },
    body: {
      tr: "Stajla girdiğim Başarsoft'ta mobil geliştirici oldum. Filo rezervasyonu, su dağıtımı ve 10 ülkede kullanılan bir anket uygulaması geliştirdim. Backend tarafında .NET Web API, Oracle PL/SQL ve PostgreSQL yazdım.",
      en: "I joined Başarsoft as an intern and stayed as a mobile developer. I built fleet booking, water delivery and a survey app used in 10 countries. On the backend I wrote .NET Web API, Oracle PL/SQL and PostgreSQL.",
    },
    chips: ["React Native", "Android", "Flutter", ".NET", "GIS"],
  },
  {
    scene: "call",
    mark: "2022",
    label: { tr: "BiP", en: "BiP" },
    eyebrow: { tr: "2022 – 2023 · Turkcell BiP", en: "2022 – 2023 · Turkcell BiP" },
    title: { tr: "Sesli ve görüntülü aramalar.", en: "Voice and video calls." },
    body: {
      tr: "BiP'in VoIP ekibinde arama deneyimi üzerinde çalıştım ve Jitsi Meet entegrasyonunu geliştirdim. Tamamen uzaktan çalıştığım ilk ekipti.",
      en: "In BiP's VoIP team I worked on the calling experience and built the Jitsi Meet integration. It was my first fully remote team.",
    },
    chips: ["VoIP", "Jitsi Meet", "React Native"],
  },
  {
    scene: "wallet",
    mark: "2023",
    label: { tr: "Param", en: "Param" },
    eyebrow: { tr: "2023 – bugün · Param", en: "2023 – today · Param" },
    title: { tr: "Sıfırdan bir dijital cüzdan.", en: "A digital wallet from scratch." },
    body: {
      tr: "Param'da Senior Mobile Developer ve ekip lideriyim. Dijital cüzdan uygulamasını sıfırdan kurduk. Mimariden mağaza yayınına kadar sürecin içindeyim.",
      en: "At Param I am a Senior Mobile Developer and team lead. We built the digital wallet app from scratch. I am involved from architecture to store release.",
    },
    chips: ["React Native", "Redux Toolkit", "Firebase", "Team lead"],
  },
  {
    scene: "nfc",
    mark: "NFC",
    label: { tr: "KYC SDK", en: "KYC SDK" },
    eyebrow: { tr: "Param · Kimlik doğrulama", en: "Param · Identity verification" },
    title: { tr: "Telefonu kimliğe dokundur.", en: "Tap your phone to your ID." },
    body: {
      tr: "Dijital kimlik doğrulama (KYC) için bir React Native SDK geliştirdim. Native köprü üzerinden NFC ile kimlik kartındaki çipi okuyor. SDK başka bir uygulamaya da entegre edildi.",
      en: "I built a React Native SDK for digital identity verification (KYC). It reads the chip on the ID card over NFC through a native bridge. The SDK has been integrated into another app as well.",
    },
    chips: ["Native bridge", "NFC", "KYC"],
  },
  {
    scene: "home",
    mark: "2026",
    label: { tr: "Bugün", en: "Today" },
    eyebrow: { tr: "Bugün", en: "Today" },
    title: { tr: "Ekranın dışında da üretiyorum.", en: "I keep building after hours." },
    body: {
      tr: "Yan projelerde Vouch ve RestoSync üzerinde çalışıyorum. Vouch, Expo ile yazılmış offline-first bir temizlik takip uygulaması. RestoSync ise Next.js ile yazılmış bir POS ve mutfak ekranı.",
      en: "On the side I work on Vouch and RestoSync. Vouch is an offline-first cleaning turnover app built with Expo. RestoSync is a POS and kitchen display built with Next.js.",
    },
    chips: ["Expo", "Supabase", "Next.js"],
  },
];
