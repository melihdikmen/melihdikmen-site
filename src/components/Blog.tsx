import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { posts } from "@/data/posts";
import { t } from "@/lib/i18n";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

export function Blog({ locale, dict, number }: { locale: Locale; dict: Dictionary; number: string }) {
  return (
    <Section id="blog" number={number} kicker={dict.section} title={dict.blog.title}>
      <ul className="grid gap-5">
        {posts.map((post, i) => (
          <Reveal as="li" key={post.url} delay={Math.min(i, 3) * 40} className="box lift row-hover shadow-hard">
            <a href={post.url} target="_blank" rel="noopener noreferrer" className="grid gap-3 p-5 md:grid-cols-[140px_1fr_auto] md:items-center md:p-6">
              <time dateTime={post.date} className="label text-ink-3">
                {new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", { dateStyle: "medium" }).format(new Date(post.date))}
              </time>
              <span>
                <span className="row-title text-[1.4rem] font-bold leading-tight">{t(post.title, locale)}</span>
                <span className="mt-1.5 block text-[15px] text-ink-2">{t(post.summary, locale)}</span>
              </span>
              <span className="label inline-flex items-center gap-2 border border-acid/50 px-3 py-2 text-acid">
                {dict.blog.readMore} →
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
