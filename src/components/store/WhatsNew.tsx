import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { experience } from "@/data/experience";
import { formatMonth, t } from "@/lib/i18n";
import { container } from "@/lib/ui";
import { SectionHead } from "./SectionHead";

/** Kariyer = sürüm geçmişi. En yeni iş 7.0 (7+ yıl), öncekiler 6.0, 5.0…; stajlar 1.x. */
function versions(locale: Locale, present: string) {
  let m = 7;
  let minor = 0;
  return experience.map((job) => {
    const v = job.compact ? `1.${++minor}` : `${m--}.0`;
    const when = job.start ? `${formatMonth(job.start, locale)} — ${job.end ? formatMonth(job.end, locale) : present}` : "";
    return { v, when, job };
  });
}

export function WhatsNew({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const list = versions(locale, dict.experience.present);
  const [latest, ...history] = list;
  return (
    <section id="experience" className={`${container} scroll-mt-14 pt-10 md:pt-14`}>
      <div className="border-t border-rule pt-8">
        <SectionHead title={dict.store.whatsNew} action={<a href="#history">{dict.store.versionHistory} ›</a>} />
        <div className="flex flex-wrap items-baseline justify-between gap-2 text-[14px]">
          <span className="font-semibold">
            {dict.store.version} {latest.v} · {latest.job.company}
          </span>
          <span className="text-ink-3">{latest.when}</span>
        </div>
        <p className="mt-2 max-w-3xl text-[15px] leading-[1.6] text-ink-2">{t(latest.job.summary, locale)}</p>
        <ul className="mt-3 max-w-3xl space-y-2 text-[15px] leading-[1.55] text-ink-2">
          {latest.job.highlights.map((h) => (
            <li key={h.en.slice(0, 32)} className="flex gap-2">
              <span className="text-accent">•</span>
              {t(h, locale)}
            </li>
          ))}
        </ul>

        <div id="history" className="card mt-8 scroll-mt-16 px-5">
          <p className="py-3 text-[13px] font-semibold text-ink-3">{dict.store.versionHistory}</p>
          <ol className="rows">
            {history.map(({ v, when, job }) => (
              <li key={`${job.company}-${job.start}`} className="py-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2 text-[14px]">
                  <span className="font-semibold">
                    {v} · {job.company} <span className="font-normal text-ink-3">· {t(job.role, locale)}</span>
                  </span>
                  <span className="text-ink-3">{when}</span>
                </div>
                <p className="mt-1 text-[14px] leading-[1.55] text-ink-2">{t(job.summary, locale)}</p>
                {!job.compact && job.highlights.length > 0 && (
                  <ul className="mt-2 space-y-1 text-[13.5px] leading-[1.5] text-ink-2">
                    {job.highlights.slice(0, 3).map((h) => (
                      <li key={h.en.slice(0, 32)} className="flex gap-2">
                        <span className="text-ink-3">–</span>
                        {t(h, locale)}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
