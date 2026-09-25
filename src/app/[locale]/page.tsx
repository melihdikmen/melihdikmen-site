import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { getSections } from "@/lib/sections";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SectionIndex } from "@/components/SectionIndex";
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
      <Header locale={locale} dict={dict} sections={sections} />
      <main className="flex-1">
        <Hero locale={locale} dict={dict} sections={sections} />
        <div className="h-16 md:h-24" />
        <About locale={locale} dict={dict} number={num("about")} />
        <Experience locale={locale} dict={dict} number={num("experience")} />
        <Projects locale={locale} dict={dict} number={num("projects")} />
        <Skills dict={dict} number={num("skills")} />
        {showBlog && <Blog locale={locale} dict={dict} number={num("blog")} />}
        <Contact locale={locale} dict={dict} number={num("contact")} />
      </main>
      <Footer locale={locale} dict={dict} />
      <SectionIndex sections={sections} kicker={dict.section} />
    </>
  );
}
