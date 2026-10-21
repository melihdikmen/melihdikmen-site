"use client";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { profile } from "@/data/profile";
import { t } from "@/lib/i18n";
import { DownloadIcon } from "./Icons";
import { useAppRoute } from "./app/route";

/** Masaüstünde telefonun solundaki başlık alanı; bağlam notu açık sekmeye göre değişir. */
export function Stage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { tab, navigate } = useAppRoute();
  const years = profile.stats[0];
  return (
    <div className="max-w-xl">
      <div className="flex flex-wrap gap-2 text-[13px] font-medium">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-stage-ink">
          <span className="blink inline-block h-1.5 w-1.5 rounded-full bg-green" aria-hidden />
          {dict.hero.available}
        </span>
        <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1.5 text-stage-ink">
          {years.value}
          {years.suffix} {t(years.label, locale)}
        </span>
      </div>
      <h1 className="mt-8 text-[clamp(3rem,5vw,4.6rem)] font-bold leading-[1.02] tracking-[-0.035em] text-stage-ink">
        {profile.firstName} {profile.lastName}
        <span className="text-accent">.</span>
      </h1>
      <p className="mt-3 text-[20px] font-medium text-stage-ink-2">{dict.hero.eyebrow}</p>
      <p className="mt-6 text-[17px] leading-[1.6] text-stage-ink-2">{t(profile.tagline, locale)}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" className="btn btn-stage" onClick={() => navigate("contact")}>
          {dict.hero.contact}
        </button>
        <a href={profile.cvPath} download className="btn btn-stage-ghost">
          <DownloadIcon width={16} height={16} strokeWidth={2} />
          {dict.hero.cv}
        </a>
      </div>

      <p className="mt-12 text-[13px] font-medium uppercase tracking-[0.04em] text-stage-ink-2">{dict.app.hint}</p>
      <div key={tab} className="fade-in mt-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
        <p className="text-[12px] font-semibold uppercase tracking-[0.04em] text-accent">{dict.app.tabs[tab]}</p>
        <p className="mt-1 text-[15px] leading-relaxed text-stage-ink">{dict.app.context[tab]}</p>
      </div>
    </div>
  );
}
