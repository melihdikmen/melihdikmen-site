import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { profile } from "@/data/profile";
import { t } from "@/lib/i18n";
import { container } from "@/lib/ui";
import { StarIcon } from "../Icons";
import { SectionHead } from "./SectionHead";

function Stars({ n = 5, className = "" }: { n?: number; className?: string }) {
  return (
    <span className={`inline-flex gap-[2px] text-star ${className}`} aria-hidden>
      {Array.from({ length: n }).map((_, i) => (
        <StarIcon key={i} width={14} height={14} />
      ))}
    </span>
  );
}

/** Puan ve "yorum" kartları. Yorumlar Melih'in kendi notları; sahte yorumcu yok. */
export function Ratings({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const s = dict.store;
  const notes = [
    { title: s.reviewLead, body: t(profile.leadership, locale) },
    { title: s.reviewAi, body: profile.about[locale][3] },
  ];
  const bars = [92, 6, 2, 0, 0];
  return (
    <section id="reviews" className={`${container} scroll-mt-14 pt-10 md:pt-14`}>
      <div className="border-t border-rule pt-8">
        <SectionHead title={s.ratings} />
        <div className="grid gap-6 md:grid-cols-[auto_1fr] md:gap-10">
          <div className="flex items-end gap-5">
            <div>
              <p className="display text-[64px] leading-none">4.9</p>
              <p className="mt-1 text-[13px] font-semibold text-ink-3">{s.outOf}</p>
            </div>
            <div className="mb-1 flex flex-col items-end gap-[3px]">
              {bars.map((w, i) => (
                <span key={i} className="flex items-center gap-2">
                  <Stars n={5 - i} className="scale-75 opacity-80" />
                  <span className="h-[4px] w-24 overflow-hidden rounded-full bg-paper-3">
                    <span className="block h-full rounded-full bg-ink-3" style={{ width: `${w}%` }} />
                  </span>
                </span>
              ))}
              <span className="mt-1 text-[12px] text-ink-3">{notes.length} {s.notesCount}</span>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {notes.map((n) => (
              <li key={n.title} className="card p-5">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[15px] font-semibold">{n.title}</p>
                  <span className="text-[12px] text-ink-3">{s.note}</span>
                </div>
                <Stars className="mt-1" />
                <p className="mt-3 text-[14px] leading-[1.55] text-ink-2">{n.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
