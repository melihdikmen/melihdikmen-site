import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { profile } from "@/data/profile";
import { t } from "@/lib/i18n";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { Stats } from "./Stats";
import { LocalTime } from "./LocalTime";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[104px_1fr] gap-4 rule-b py-3.5">
      <dt className="smallcaps pt-1">{label}</dt>
      <dd className="text-[15px] leading-snug">{children}</dd>
    </div>
  );
}

const Heading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="smallcaps rule-b border-ink pb-3">{children}</h3>
);

export function About({ locale, dict, number }: { locale: Locale; dict: Dictionary; number: string }) {
  const [first, ...rest] = profile.about[locale];
  return (
    <Section id="about" number={number} kicker={dict.section} title={dict.about.title}>
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <div className="space-y-5 text-[17px] leading-[1.65] md:text-[18px]">
            <p className="dropcap">{first}</p>
            {rest.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={80} className="lg:col-span-4 lg:col-start-9">
          <Heading>{dict.about.facts}</Heading>
          <dl>
            <Row label={dict.facts.location}>{t(profile.location, locale)}</Row>
            <Row label={dict.facts.time}>
              <span className="font-display text-[22px] leading-none">
                <LocalTime locale={locale} />
              </span>
            </Row>
            <Row label={dict.facts.status}>
              <span className="flex items-start gap-2">
                <span className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {dict.facts.statusValue}
              </span>
            </Row>
            <Row label={dict.facts.now}>{dict.facts.nowValue}</Row>
            {profile.education.map((e) => (
              <Row key={e.school.en} label={dict.about.educationTitle}>
                {t(e.school, locale)}
                <span className="block text-ink-2">{t(e.degree, locale)}</span>
                <span className="block font-mono text-[11px] text-ink-3 tabular-nums">
                  {e.period} · {t(e.location, locale)}
                </span>
              </Row>
            ))}
          </dl>
        </Reveal>
      </div>

      <Reveal className="mt-16">
        <Stats items={profile.stats.map((s) => ({ value: s.value, suffix: s.suffix, label: t(s.label, locale) }))} />
      </Reveal>

      <div className="mt-16 grid gap-12 md:grid-cols-2">
        <Reveal>
          <Heading>{dict.about.focusTitle}</Heading>
          <ol className="mt-1">
            {profile.focus.map((item, i) => (
              <li key={item.en} className="flex items-baseline gap-4 rule-b py-3">
                <span className="font-mono text-[11px] text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display display-text text-[19px] leading-snug">{t(item, locale)}</span>
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal delay={80}>
          <Heading>{dict.about.leadTitle}</Heading>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-2">{t(profile.leadership, locale)}</p>
        </Reveal>
      </div>
    </Section>
  );
}
