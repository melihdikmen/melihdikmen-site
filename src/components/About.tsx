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
    <div className="grid grid-cols-[96px_1fr] gap-4 border-t border-rule px-4 py-3">
      <dt className="label pt-0.5 text-ink-3">{label}</dt>
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
          <p className="box hud shadow-hard p-6 text-[clamp(1.2rem,1.9vw,1.55rem)] font-medium leading-[1.4] md:p-8">{first}</p>
          <div className="mt-8 space-y-5 text-[17px] leading-[1.65] text-ink-2">
            {rest.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
        </Reveal>

        {/* Künye: kimlik kartı */}
        <Reveal delay={80} className="lg:col-span-5">
          <div className="box lift shadow-hard-lg">
            <div className="flex items-center justify-between border-b border-acid/40 bg-acid/10 px-4 py-2.5">
              <span className="label">{dict.about.facts}</span>
              <span className="font-display text-[18px] font-extrabold uppercase leading-none">
                MD<span className="text-hot">_</span>
              </span>
            </div>
            <dl>
              <Row label={dict.facts.location}>{t(profile.location, locale)}</Row>
              <Row label={dict.facts.time}>
                <span className="font-display neon-cyan text-[24px] font-extrabold leading-none">
                  <LocalTime locale={locale} />
                </span>
              </Row>
              <Row label={dict.facts.status}>
                <span className="flex items-start gap-2">
                  <span className="blink mt-[6px] inline-block h-2 w-2 shrink-0 rounded-full bg-acid shadow-[0_0_8px_var(--acid)]" />
                  {dict.facts.statusValue}
                </span>
              </Row>
              <Row label={dict.facts.now}>{dict.facts.nowValue}</Row>
              {profile.education.map((e) => (
                <Row key={e.school.en} label={dict.about.educationTitle}>
                  <span className="font-semibold">{t(e.school, locale)}</span>
                  <span className="block">{t(e.degree, locale)}</span>
                  <span className="block font-mono text-[11px] text-ink-3 tabular-nums">
                    {e.period} · {t(e.location, locale)}
                  </span>
                </Row>
              ))}
            </dl>
            <div className="flex h-10 items-end gap-[3px] border-t border-rule px-4 pb-2" aria-hidden>
              {bars.map((w, i) => (
                <span key={i} className="block h-5 bg-acid/70" style={{ width: w * 1.5 }} />
              ))}
              <span className="ml-auto font-mono text-[10px] font-bold tabular-nums text-ink-3">TR-06 · 1996</span>
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
            <h3 className="label border-b border-acid/40 bg-acid/10 px-4 py-2.5 text-acid">{dict.about.focusTitle}</h3>
            <ol>
              {profile.focus.map((item, i) => (
                <li key={item.en} className="flex items-baseline gap-4 border-t border-rule px-4 py-3.5 first:border-t-0">
                  <span className="font-display text-[18px] font-extrabold leading-none text-hot">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[17px] font-medium leading-snug">{t(item, locale)}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <blockquote className="box block-sky hud relative h-full p-6 shadow-hard md:p-8">
            <span aria-hidden className="font-display absolute -top-1 right-5 text-[5rem] font-extrabold leading-none text-sky opacity-40">
              ”
            </span>
            <p className="label">{dict.about.leadTitle}</p>
            <p className="mt-3 text-[clamp(1.1rem,1.5vw,1.3rem)] font-medium leading-[1.45]">{t(profile.leadership, locale)}</p>
          </blockquote>
        </Reveal>
      </div>
    </Section>
  );
}
