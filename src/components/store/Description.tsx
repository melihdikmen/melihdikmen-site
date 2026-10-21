"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { profile } from "@/data/profile";
import { t } from "@/lib/i18n";
import { container } from "@/lib/ui";
import { SectionHead } from "./SectionHead";

/** "Açıklama": ilk paragraf açık, kalanı "daha fazla" ile. */
export function Description({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [first, ...rest] = profile.about[locale];
  return (
    <section id="about" className={`${container} scroll-mt-14 pt-10 md:pt-14`}>
      <div className="border-t border-rule pt-8">
        <SectionHead title={dict.store.description} />
        <div className="max-w-3xl text-[15px] leading-[1.6] text-ink-2">
          <p>
            {first}{" "}
            {!open && (
              <button type="button" onClick={() => setOpen(true)} className="font-medium text-accent">
                {dict.store.more}
              </button>
            )}
          </p>
          {open && (
            <div className="mt-4 space-y-4">
              {rest.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
              <p className="text-[14px] font-semibold">{dict.about.focusTitle}</p>
              <ul className="grid gap-1.5 sm:grid-cols-2">
                {profile.focus.map((f) => (
                  <li key={f.en} className="flex gap-2 text-[14px]">
                    <span className="text-accent">•</span>
                    {t(f, locale)}
                  </li>
                ))}
              </ul>
              <button type="button" onClick={() => setOpen(false)} className="font-medium text-accent">
                {dict.store.less}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
