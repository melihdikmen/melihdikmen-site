import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { profile } from "@/data/profile";
import { t } from "@/lib/i18n";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

export function About({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section id="about" title={dict.about.title}>
      <div className="grid gap-10 md:grid-cols-[3fr_2fr]">
        <Reveal className="space-y-4 text-[17px] leading-relaxed">
          {profile.about[locale].map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </Reveal>
        <div className="space-y-8">
          <Reveal delay={80}>
            <h3 className="font-mono text-xs uppercase tracking-[0.1em] text-muted">{dict.about.focusTitle}</h3>
            <ul className="mt-3 space-y-2">
              {profile.focus.map((item) => (
                <li key={item.en} className="flex gap-3 text-[15px]">
                  <span aria-hidden className="mt-[11px] h-px w-4 shrink-0 bg-accent" />
                  {t(item, locale)}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={140}>
            <h3 className="font-mono text-xs uppercase tracking-[0.1em] text-muted">{dict.about.leadTitle}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{t(profile.leadership, locale)}</p>
          </Reveal>
          <Reveal delay={200}>
            <h3 className="font-mono text-xs uppercase tracking-[0.1em] text-muted">{dict.about.educationTitle}</h3>
            <ul className="mt-3 space-y-2">
              {profile.education.map((e) => (
                <li key={e.school.en} className="text-[15px]">
                  <span className="font-semibold">{t(e.school, locale)}</span>
                  <span className="block text-muted">{t(e.degree, locale)}</span>
                  <span className="block font-mono text-xs text-muted tabular-nums">
                    {e.period} · {t(e.location, locale)}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
