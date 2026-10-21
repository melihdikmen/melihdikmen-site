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
    <div className="grid grid-cols-[96px_1fr] gap-4 border-t border-rule px-5 py-3.5">
      <dt className="pt-0.5 text-[13px] font-medium text-ink-3">{label}</dt>
      <dd className="text-[15px] leading-snug">{children}</dd>
    </div>
  );
}

/** Barkod süsü: sabit desen, her render'da aynı. */
const bars = [3, 1, 2, 1, 4, 1, 1, 2, 3, 1, 2, 4, 1, 1, 3, 2, 1, 1, 2, 3, 1, 4, 1, 2, 1, 1, 3, 2, 1, 2];

export function About({ locale, dict, number }: { locale: Locale; dict: Dictionary; number: string }) {
  const [first, ...rest] = profile.about[locale];
  return (
    <Section id="about" number={number} kicker={dict.section} title={dict.about.title}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-7">
          <p className="font-display text-[clamp(1.4rem,2.4vw,2rem)] font-semibold leading-[1.25] tracking-[-0.025em]">{first}</p>
          <div className="mt-8 space-y-5 text-[17px] leading-[1.65] text-ink-2">
            {rest.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
        </Reveal>

        {/* Künye: kimlik kartı */}
        <Reveal delay={80} className="lg:col-span-5">
          <div className="box lift shadow-hard">
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-[15px] font-semibold">{dict.about.facts}</span>
              <span className="font-display text-[15px] font-semibold tracking-[-0.03em] text-ink-3">
                MD<span className="text-accent">.</span>
              </span>
            </div>
            <dl>
              <Row label={dict.facts.location}>{t(profile.location, locale)}</Row>
              <Row label={dict.facts.time}>
                <span className="font-display text-[22px] font-semibold leading-none tabular-nums">
                  <LocalTime locale={locale} />
                </span>
              </Row>
              <Row label={dict.facts.status}>
                <span className="flex items-start gap-2">
                  <span className="blink mt-[6px] inline-block h-2 w-2 shrink-0 rounded-full bg-[#30d158]" />
                  {dict.facts.statusValue}
                </span>
              </Row>
              <Row label={dict.facts.now}>{dict.facts.nowValue}</Row>
              {profile.education.map((e) => (
                <Row key={e.school.en} label={dict.about.educationTitle}>
                  <span className="font-semibold">{t(e.school, locale)}</span>
                  <span className="block">{t(e.degree, locale)}</span>
                  <span className="block text-[13px] text-ink-3 tabular-nums">
                    {e.period} · {t(e.location, locale)}
                  </span>
                </Row>
              ))}
            </dl>
            <div className="flex h-10 items-end gap-[3px] border-t border-rule px-5 pb-2.5" aria-hidden>
              {bars.map((w, i) => (
                <span key={i} className="block h-4 rounded-sm bg-ink/20" style={{ width: w * 1.5 }} />
              ))}
              <span className="ml-auto text-[11px] font-medium tabular-nums text-ink-3">TR-06 · 1996</span>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-14">
        <Stats items={profile.stats.map((s) => ({ value: s.value, suffix: s.suffix, label: t(s.label, locale) }))} />
      </Reveal>

      <div className="mt-14 grid gap-8 md:grid-cols-2">
        <Reveal>
          <div className="box shadow-hard">
            <h3 className="px-5 pt-5 text-[15px] font-semibold">{dict.about.focusTitle}</h3>
            <ol className="mt-3">
              {profile.focus.map((item, i) => (
                <li key={item.en} className="flex items-baseline gap-4 border-t border-rule px-5 py-3.5">
                  <span className="text-[13px] font-semibold tabular-nums text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[16px] font-medium leading-snug">{t(item, locale)}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <blockquote className="box relative h-full bg-paper-2 p-6 md:p-8">
            <span aria-hidden className="font-display absolute right-6 top-4 text-[5rem] font-semibold leading-none text-accent/20">
              ”
            </span>
            <p className="label">{dict.about.leadTitle}</p>
            <p className="font-display mt-3 text-[clamp(1.15rem,1.7vw,1.5rem)] font-semibold leading-[1.3] tracking-[-0.02em]">{t(profile.leadership, locale)}</p>
          </blockquote>
        </Reveal>
      </div>
    </Section>
  );
}
