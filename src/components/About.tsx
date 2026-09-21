import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { profile } from "@/data/profile";
import { skills } from "@/data/skills";
import { t } from "@/lib/i18n";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { Stats } from "./Stats";
import { LocalTime } from "./LocalTime";
import { SpotlightCard } from "./SpotlightCard";

function Cell({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <SpotlightCard className={`gradient-border h-full rounded-2xl bg-surface p-6 ${className}`}>
        {children}
      </SpotlightCard>
    </Reveal>
  );
}

const Label = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{children}</h3>
);

export function About({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section id="about" title={dict.about.title}>
      <div className="bento">
        <div className="col-span-4 row-span-2">
          <Cell>
            <div className="space-y-4 text-[17px] leading-relaxed">
              {profile.about[locale].map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
          </Cell>
        </div>

        <div className="col-span-2">
          <Cell delay={60}>
            <Label>{dict.bento.time}</Label>
            <p className="mt-2 font-display text-4xl font-extrabold tracking-tight">
              <LocalTime locale={locale} />
            </p>
            <p className="mt-1 text-sm text-muted">
              {dict.bento.location}: {t(profile.location, locale)}
            </p>
          </Cell>
        </div>

        <div className="col-span-2">
          <Cell delay={120}>
            <Label>{dict.bento.status}</Label>
            <p className="mt-2 flex items-start gap-2 text-[15px] leading-snug">
              <span className="mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-g3 shadow-[0_0_12px_var(--g3)]" />
              {dict.bento.statusValue}
            </p>
            <Label>
              <span className="mt-4 block">{dict.bento.now}</span>
            </Label>
            <p className="mt-1 text-[15px] leading-snug text-muted">{dict.bento.nowValue}</p>
          </Cell>
        </div>

        <div className="col-span-6">
          <Reveal delay={160}>
            <Stats items={profile.stats.map((s) => ({ value: s.value, suffix: s.suffix, label: t(s.label, locale) }))} />
          </Reveal>
        </div>

        <div className="col-span-3">
          <Cell delay={200}>
            <Label>{dict.about.focusTitle}</Label>
            <ul className="mt-3 space-y-2">
              {profile.focus.map((item) => (
                <li key={item.en} className="flex gap-3 text-[15px]">
                  <span aria-hidden className="mt-[11px] h-px w-4 shrink-0 bg-[linear-gradient(90deg,var(--g1),var(--g2))]" />
                  {t(item, locale)}
                </li>
              ))}
            </ul>
          </Cell>
        </div>

        <div className="col-span-3">
          <Cell delay={240}>
            <Label>{dict.about.leadTitle}</Label>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{t(profile.leadership, locale)}</p>
          </Cell>
        </div>

        <div className="col-span-4">
          <Cell delay={280}>
            <Label>{dict.bento.stack}</Label>
            <ul className="mt-3 flex flex-wrap gap-2">
              {[...skills.mobile.slice(0, 6), ...skills.backend.slice(0, 2), ...skills.tools.slice(0, 4)].map((s) => (
                <li key={s} className="rounded-full border border-line px-3 py-1 font-mono text-[12px] text-muted">
                  {s}
                </li>
              ))}
            </ul>
          </Cell>
        </div>

        <div className="col-span-2">
          <Cell delay={320}>
            <Label>{dict.about.educationTitle}</Label>
            {profile.education.map((e) => (
              <div key={e.school.en} className="mt-3 text-[15px]">
                <span className="font-semibold">{t(e.school, locale)}</span>
                <span className="block text-muted">{t(e.degree, locale)}</span>
                <span className="block font-mono text-xs text-muted tabular-nums">
                  {e.period} · {t(e.location, locale)}
                </span>
              </div>
            ))}
          </Cell>
        </div>
      </div>
    </Section>
  );
}
