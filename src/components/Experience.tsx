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

export function Experience({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section id="experience" title={dict.experience.title}>
      <ol className="relative border-l border-line pl-8 md:pl-10">
        {experience.map((job, i) => {
          const when = period(job.start, job.end, locale, dict.experience.present);
          return (
            <Reveal as="li" key={job.company} delay={i * 60} className="relative pb-12 last:pb-0">
              <span
                aria-hidden
                className={`absolute -left-[calc(2rem+5px)] top-2 h-[9px] w-[9px] rounded-full ring-4 ring-bg md:-left-[calc(2.5rem+5px)] ${
                  i === 0 ? "bg-accent" : "bg-line"
                }`}
              />
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="font-display text-xl font-bold tracking-tight">
                  {t(job.role, locale)} <span className="text-muted">· {job.company}</span>
                </h3>
                <p className="font-mono text-xs text-muted tabular-nums">
                  {when ?? ""}
                  {when && " · "}
                  {t(job.location, locale)}
                </p>
              </div>
              <p className="mt-3 max-w-2xl text-muted">{t(job.summary, locale)}</p>
              <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 text-[15px] leading-relaxed">
                {job.highlights.map((h) => (
                  <li key={h.en.slice(0, 32)}>{t(h, locale)}</li>
                ))}
              </ul>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {job.tags.map((tag) => (
                  <li key={tag} className="rounded border border-line px-2 py-0.5 font-mono text-[11.5px] text-muted">
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
