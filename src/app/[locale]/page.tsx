import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { posts } from "@/data/posts";

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <Header locale={locale} dict={dict} showBlog={posts.length > 0} />
      <main className="flex-1">
        <Hero locale={locale} dict={dict} />
        <About locale={locale} dict={dict} />
        <Experience locale={locale} dict={dict} />
        <Projects locale={locale} dict={dict} />
        <Skills dict={dict} />
        {posts.length > 0 && <Blog locale={locale} dict={dict} />}
        <Contact locale={locale} dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
