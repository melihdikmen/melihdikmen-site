"use client";

import { experience } from "@/data/experience";
import { formatMonth, t } from "@/lib/i18n";
import { Screen } from "../Screen";
import type { ScreenProps } from "../App";

export function CareerScreen({ locale, dict, on }: ScreenProps) {
  const period = (s?: string, e?: string) => (s ? `${formatMonth(s, locale)} — ${e ? formatMonth(e, locale) : dict.experience.present}` : "");
  const jobs = experience.filter((j) => !j.compact);
  const interns = experience.filter((j) => j.compact);

  return (
    <Screen title={dict.app.tabs.career} on={on}>
      {jobs.map((job) => (
        <div key={`${job.company}-${job.start}`}>
          <p className="group-h flex items-baseline justify-between">
            <span>{job.company}</span>
            <span className="normal-case tabular-nums">{period(job.start, job.end)}</span>
          </p>
          <div className="group">
            <div className="cell">
              <span>
                <span className="font-medium">{t(job.role, locale)}</span>
                <span className="sub">
                  {t(job.location, locale)}
                  {!job.end && (
                    <>
                      {" · "}
                      <span className="text-green">{dict.experience.present}</span>
                    </>
                  )}
                </span>
              </span>
            </div>
            <p className="cell-text text-ink-2">{t(job.summary, locale)}</p>
            {job.highlights.map((h) => (
              <p key={h.en.slice(0, 32)} className="cell-text flex gap-3 text-[15px] text-ink-2">
                <span className="text-accent" aria-hidden>
                  •
                </span>
                <span>{t(h, locale)}</span>
              </p>
            ))}
            <div className="flex flex-wrap gap-2 border-t-[0.5px] border-rule px-4 py-3.5">
              {job.tags.map((tag) => (
                <span key={tag} className="pill">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}

      {interns.length > 0 && (
        <>
          <p className="group-h">{dict.app.interns}</p>
          <div className="group">
            {interns.map((job) => (
              <div key={`${job.company}-${job.start}`} className="cell">
                <span className="min-w-0">
                  <span className="block">{job.company}</span>
                  <span className="sub">{t(job.role, locale)}</span>
                </span>
                <span className="val text-[14px] tabular-nums">{period(job.start, job.end)}</span>
              </div>
            ))}
          </div>
        </>
      )}
      <div className="h-8" />
    </Screen>
  );
}
