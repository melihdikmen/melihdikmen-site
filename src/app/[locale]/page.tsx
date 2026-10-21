import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { getSections } from "@/lib/sections";
import { StoreHeader } from "@/components/store/StoreHeader";
import { StoreHero } from "@/components/store/StoreHero";
import { Screenshots } from "@/components/store/Screenshots";
import { Description } from "@/components/store/Description";
import { WhatsNew } from "@/components/store/WhatsNew";
import { Ratings } from "@/components/store/Ratings";
import { Information } from "@/components/store/Information";
import { Support } from "@/components/store/Support";
import { Blog } from "@/components/Blog";
import { Footer } from "@/components/Footer";
import { posts } from "@/data/posts";

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const showBlog = posts.length > 0;
  const sections = getSections(dict, showBlog);
  const num = (id: string) => sections.find((s) => s.id === id)?.number ?? "";

  return (
    <>
      <StoreHeader locale={locale} dict={dict} sections={sections} />
      <main className="flex-1">
        <StoreHero locale={locale} dict={dict} />
        <Screenshots locale={locale} dict={dict} />
        <Description locale={locale} dict={dict} />
        <WhatsNew locale={locale} dict={dict} />
        <Ratings locale={locale} dict={dict} />
        <Information locale={locale} dict={dict} />
        {showBlog && <Blog locale={locale} dict={dict} number={num("blog")} />}
        <Support dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
