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

export function Experience({ locale, dict, number }: { locale: Locale; dict: Dictionary; number: string }) {
  return (
    <Section id="experience" number={number} kicker={dict.section} title={dict.experience.title}>
      <ol className="rule-t">
        {experience.map((job) => {
          const when = period(job.start, job.end, locale, dict.experience.present);
          const year = job.start?.slice(0, 4) ?? "";
          const endYear = job.end ? job.end.slice(0, 4) : dict.experience.present;
          const current = !job.end;
          return (
            <Reveal
              as="li"
              key={`${job.company}-${job.start}`}
              className={`grid gap-x-6 gap-y-3 rule-b md:grid-cols-[110px_1fr] lg:grid-cols-[110px_1fr_200px] ${job.compact ? "py-5" : "py-9 md:py-11"}`}
            >
              <div>
                <p className={`font-display font-light leading-none tracking-[-0.02em] ${job.compact ? "text-xl" : "text-[2rem]"}`}>{year}</p>
                <p className="smallcaps mt-1.5 flex items-center gap-1.5">
                  {current && <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />}→ {endYear}
                </p>
              </div>

              <div className="min-w-0">
                <h3 className={`font-display font-normal leading-tight tracking-[-0.015em] ${job.compact ? "text-xl" : "text-[clamp(1.6rem,2.6vw,2.25rem)]"}`}>
                  {job.company}
                </h3>
                <p className={`text-ink-2 ${job.compact ? "mt-0.5 text-[14px]" : "mt-1.5 text-[15px]"}`}>
                  {t(job.role, locale)} · {t(job.location, locale)}
                  <span className="lg:hidden"> · {when}</span>
                </p>
                <p className={`max-w-2xl ${job.compact ? "mt-2 text-[15px] text-ink-2" : "mt-5 text-[16px] leading-relaxed"}`}>
                  {t(job.summary, locale)}
                </p>
                {job.highlights.length > 0 && (
                  <ul className="mt-5 max-w-2xl space-y-2.5 text-[15px] leading-relaxed text-ink-2">
                    {job.highlights.map((h) => (
                      <li key={h.en.slice(0, 32)} className="flex gap-3">
                        <span aria-hidden className="shrink-0 text-accent">—</span>
                        {t(h, locale)}
                      </li>
                    ))}
                  </ul>
                )}
                <p className={`font-mono text-[11.5px] leading-relaxed text-ink-3 ${job.compact ? "mt-2" : "mt-6"}`}>{job.tags.join(" / ")}</p>
              </div>

              <p className="hidden font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3 lg:block lg:text-right">{when}</p>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
