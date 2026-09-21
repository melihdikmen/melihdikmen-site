# melihdikmen.dev

Melih Dikmen'in kişisel portfolyo sitesi. Next.js 16 (App Router) + TypeScript + Tailwind CSS v4.

## Çalıştırma

```bash
npm install
npm run dev      # http://localhost:3000 → tarayıcı diline göre /tr veya /en
npm run build    # production build
npm run lint
```

## İçeriği güncelleme

Tüm içerik `src/data/` altında, kod değişikliği gerekmez:

| Dosya | İçerik |
|---|---|
| `src/data/profile.ts` | ad, e-posta, konum, site adresi, CV yolu, sosyal linkler, hero başlığı, hakkımda metni |
| `src/data/experience.ts` | zaman çizelgesi (tarihler `YYYY-AA`, `end` boşsa "Bugün") |
| `src/data/projects.ts` | proje kartları, teknolojiler, App Store / Play / GitHub linkleri, görsel |
| `src/data/skills.ts` | yetenekler (Mobil, Backend, Veritabanı, Araçlar) |
| `src/data/posts.ts` | yazılar; boşsa bölüm gizlenir |

Metin alanları `{ tr: "...", en: "..." }` şeklinde iki dilli. Arayüz metinleri `src/i18n/tr.ts` ve `src/i18n/en.ts` içinde.

### Yapılacaklar
- `projects.ts` içindeki mağaza linklerini ekle; istersen `public/projects/` altına görsel koyup `image` alanına yaz.
- `profile.ts` içindeki `siteUrl` ve `linkedin` adreslerini doğrula.
- CV'yi güncellediğinde `public/cv/Melih-Dikmen-CV.pdf` dosyasının üzerine yaz.

## İletişim formu

`/api/contact` rotası [Resend](https://resend.com) ile e-posta gönderir. `.env.example` dosyasını `.env.local` olarak kopyalayıp `RESEND_API_KEY` gir. Anahtar yoksa form, e-posta bağlantısına düşer.

## Deploy (Vercel)

```bash
npx vercel
```

Vercel panelinde `RESEND_API_KEY` ve gerekiyorsa `CONTACT_TO`, `CONTACT_FROM` ortam değişkenlerini ekle. Domain bağladıktan sonra `profile.ts` içindeki `siteUrl` değerini güncelle; sitemap, robots, canonical ve Open Graph adresleri oradan üretilir.

## Yapı

```
src/
  app/[locale]/        layout, page, not-found, opengraph-image
  app/api/contact/     iletişim formu
  app/sitemap.ts       app/robots.ts
  proxy.ts             / → /tr veya /en yönlendirmesi (Accept-Language + cookie)
  components/          Header, Hero, About, Experience, Projects, Skills, Blog, Contact, Footer
  data/                içerik
  i18n/                sözlükler
```
