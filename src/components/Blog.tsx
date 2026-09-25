import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { posts } from "@/data/posts";
import { t } from "@/lib/i18n";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

export function Blog({ locale, dict, number }: { locale: Locale; dict: Dictionary; number: string }) {
  return (
    <Section id="blog" number={number} kicker={dict.section} title={dict.blog.title}>
      <ul className="rule-t">
        {posts.map((post) => (
          <Reveal as="li" key={post.url} className="row-hover rule-b">
            <a href={post.url} target="_blank" rel="noopener noreferrer" className="grid gap-2 py-6 md:grid-cols-[130px_1fr_auto] md:items-baseline">
              <time dateTime={post.date} className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">
                {new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", { dateStyle: "medium" }).format(new Date(post.date))}
              </time>
              <span>
                <span className="row-title font-display text-[1.6rem] font-normal leading-tight">{t(post.title, locale)}</span>
                <span className="mt-1.5 block text-[15px] text-ink-2">{t(post.summary, locale)}</span>
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">{dict.blog.readMore} →</span>
            </a>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
