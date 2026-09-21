import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { posts } from "@/data/posts";
import { t } from "@/lib/i18n";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { ArrowIcon } from "./Icons";

export function Blog({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section id="blog" title={dict.blog.title}>
      <ul className="divide-y divide-line border-y border-line">
        {posts.map((post) => (
          <Reveal as="li" key={post.url}>
            <a href={post.url} target="_blank" rel="noopener noreferrer" className="group grid gap-2 py-5 md:grid-cols-[120px_1fr_auto] md:items-baseline">
              <time dateTime={post.date} className="font-mono text-xs text-muted">
                {new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", { dateStyle: "medium" }).format(new Date(post.date))}
              </time>
              <span>
                <span className="font-display text-lg font-bold group-hover:text-accent">{t(post.title, locale)}</span>
                <span className="mt-1 block text-[15px] text-muted">{t(post.summary, locale)}</span>
              </span>
              <span className="inline-flex items-center gap-1 text-sm text-accent">
                {dict.blog.readMore} <ArrowIcon width={14} height={14} />
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
