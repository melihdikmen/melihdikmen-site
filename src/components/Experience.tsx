import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { experience } from "@/data/experience";
import { formatMonth, t } from "@/lib/i18n";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { SpotlightCard } from "./SpotlightCard";

function period(start: string | undefined, end: string | undefined, locale: Locale, present: string) {
  if (!start) return null;
  return `${formatMonth(start, locale)} — ${end ? formatMonth(end, locale) : present}`;
}

export function Experience({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section id="experience" title={dict.experience.title}>
      <ol className="space-y-6">
        {experience.map((job, i) => {
          const when = period(job.start, job.end, locale, dict.experience.present);
          const year = job.start?.slice(0, 4) ?? "";
          const endYear = job.end ? job.end.slice(0, 4) : dict.experience.present;
          return (
            <li key={`${job.company}-${job.start}`} className="grid gap-4 md:grid-cols-[150px_1fr]">
              <Reveal className="md:sticky md:top-24 md:self-start">
                <p className={`font-display font-extrabold leading-none tracking-tight ${job.compact ? "text-2xl" : "text-4xl md:text-5xl"}`}>
                  <span className={i === 0 ? "text-gradient" : ""}>{year}</span>
                </p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">→ {endYear}</p>
              </Reveal>
              <Reveal delay={60}>
                <SpotlightCard
                  className={`rounded-2xl bg-surface ${job.compact ? "border border-line p-5" : "gradient-border p-6 md:p-8"} ${i === 0 ? "glow" : ""}`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className={`font-display font-bold tracking-tight ${job.compact ? "text-base" : "text-2xl"}`}>
                      {t(job.role, locale)} <span className={i === 0 ? "text-gradient" : "text-muted"}>· {job.company}</span>
                    </h3>
                    <p className="font-mono text-xs text-muted tabular-nums">
                      {when ?? ""}
                      {when && " · "}
                      {t(job.location, locale)}
                    </p>
                  </div>
                  <p className={`max-w-2xl text-muted ${job.compact ? "mt-1 text-[15px]" : "mt-3"}`}>{t(job.summary, locale)}</p>
                  {job.highlights.length > 0 && (
                    <ul className="mt-4 max-w-2xl space-y-2 text-[15px] leading-relaxed">
                      {job.highlights.map((h) => (
                        <li key={h.en.slice(0, 32)} className="flex gap-3">
                          <span aria-hidden className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-[linear-gradient(135deg,var(--g1),var(--g2))]" />
                          {t(h, locale)}
                        </li>
                      ))}
                    </ul>
                  )}
                  <ul className={`flex flex-wrap gap-1.5 ${job.compact ? "mt-2" : "mt-5"}`}>
                    {job.tags.map((tag) => (
                      <li key={tag} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11.5px] text-muted">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
