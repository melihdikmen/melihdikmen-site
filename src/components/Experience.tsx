import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { experience } from "@/data/experience";
import { formatMonth, t } from "@/lib/i18n";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

function period(start: string | undefined, end: string | undefined, locale: Locale, present: string) {
  if (!start) return null;
  return `${formatMonth(start, locale)} — ${end ? formatMonth(end, locale) : present}`;
}

const tones = ["", "", "", ""];

export function Experience({ locale, dict, number }: { locale: Locale; dict: Dictionary; number: string }) {
  let colorIndex = 0;
  return (
    <Section id="experience" number={number} kicker={dict.section} title={dict.experience.title}>
      <ol className="grid gap-6">
        {experience.map((job, i) => {
          const when = period(job.start, job.end, locale, dict.experience.present);
          const year = job.start?.slice(0, 4) ?? "";
          const endYear = job.end ? job.end.slice(0, 4) : dict.experience.present;
          const current = !job.end;
          const tone = job.compact ? "" : tones[colorIndex++ % tones.length];

          if (job.compact) {
            return (
              <Reveal as="li" key={`${job.company}-${job.start}`} className="grid gap-x-6 gap-y-1 border-t border-rule px-1 py-5 md:grid-cols-[120px_1fr_auto] md:items-baseline">
                <span className="text-[15px] font-semibold tabular-nums text-ink-3">{year}</span>
                <span>
                  <span className="text-[17px] font-semibold">{job.company}</span>
                  <span className="text-ink-2"> · {t(job.role, locale)}</span>
                  <span className="block text-[14px] text-ink-2">{t(job.summary, locale)}</span>
                </span>
                <span className="text-[13px] text-ink-3">{when}</span>
              </Reveal>
            );
          }

          return (
            <Reveal as="li" key={`${job.company}-${job.start}`} delay={Math.min(i, 3) * 40} className="box grid shadow-hard md:grid-cols-[180px_1fr]">
              {/* Yıl bloğu */}
              <div className={`${tone} flex flex-row items-end justify-between gap-2 border-b border-rule bg-paper-2 p-6 md:flex-col md:items-start md:justify-between md:border-b-0 md:border-r`}>
                <p className="font-display text-[clamp(2.4rem,4.5vw,3.4rem)] font-semibold leading-[0.9] tracking-[-0.04em]">{year}</p>
                <p className="flex items-center gap-2 text-[13px] font-medium text-ink-3">
                  {current && <span className="blink inline-block h-2 w-2 rounded-full bg-[#30d158]" />}→ {endYear}
                </p>
              </div>

              <div className="min-w-0 p-6 md:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold leading-[1.05] tracking-[-0.03em]">{job.company}</h3>
                  <p className="text-[13px] text-ink-3">{when}</p>
                </div>
                <p className="mt-1.5 text-[15px] font-medium text-ink-2">
                  {t(job.role, locale)} <span className="text-ink-3">· {t(job.location, locale)}</span>
                </p>
                <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink-2">{t(job.summary, locale)}</p>
                {job.highlights.length > 0 && (
                  <ul className="mt-5 max-w-2xl space-y-2.5 text-[15px] leading-relaxed text-ink-2">
                    {job.highlights.map((h) => (
                      <li key={h.en.slice(0, 32)} className="flex gap-3">
                        <span aria-hidden className="shrink-0 text-accent">
                          •
                        </span>
                        {t(h, locale)}
                      </li>
                    ))}
                  </ul>
                )}
                <p className="mt-6 flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <span key={tag} className="sticker text-[12px]">
                      {tag}
                    </span>
                  ))}
                </p>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
