"use client";

import { useState } from "react";
import { profile } from "@/data/profile";
import { t } from "@/lib/i18n";
import { LocalTime } from "../../LocalTime";
import { LocaleSwitch } from "../../LocaleSwitch";
import { ThemeToggle } from "../../ThemeToggle";
import { DownloadIcon } from "../../Icons";
import { Screen } from "../Screen";
import type { ScreenProps } from "../App";

type Props = ScreenProps & { onContact: () => void; onProjects: () => void };

export function HomeScreen({ locale, dict, on, onContact, onProjects }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [first, ...rest] = profile.about[locale];

  return (
    <Screen
      title={profile.name}
      on={on}
      largeTitle={false}
      right={
        <>
          <LocaleSwitch locale={locale} label={dict.lang.switch} short={dict.lang.short} />
          <ThemeToggle label={dict.theme.toggle} />
        </>
      }
    >
      {/* Profil başlığı */}
      <div className="flex flex-col items-center px-6 pb-2 pt-4 text-center">
        <span className="app-icon h-[76px] w-[76px] bg-accent text-[32px]" aria-hidden>
          MD
        </span>
        <h1 className="mt-4 text-[28px] font-bold leading-tight tracking-[-0.02em]">{profile.name}</h1>
        <p className="mt-1 text-[15px] text-ink-3">{dict.hero.eyebrow}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <span className="pill pill-green">
            <span className="blink inline-block h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
            {dict.hero.available}
          </span>
          <span className="pill">✦ {dict.hero.aiBadge}</span>
        </div>
        <p className="mt-5 text-[16px] leading-[1.5] text-ink-2">{t(profile.tagline, locale)}</p>
        <div className="mt-5 grid w-full grid-cols-2 gap-3">
          <button type="button" className="btn" onClick={onContact}>
            {dict.hero.contact}
          </button>
          <a href={profile.cvPath} download className="btn btn-tint">
            <DownloadIcon width={16} height={16} strokeWidth={2} />
            {dict.hero.cv}
          </a>
        </div>
      </div>

      {/* Şu an */}
      <p className="group-h">{dict.app.now}</p>
      <div className="group">
        <div className="cell has-icon">
          <span className="app-icon h-[30px] w-[30px] bg-[#E8541E] text-[14px]" aria-hidden>
            P
          </span>
          <span>{dict.facts.nowValue}</span>
        </div>
        <div className="cell has-icon">
          <span className="app-icon h-[30px] w-[30px] bg-sky text-[14px]" aria-hidden>
            ◷
          </span>
          <span>{dict.facts.time}</span>
          <span className="val tabular-nums">
            <LocalTime locale={locale} seconds={false} />
          </span>
        </div>
        <div className="cell has-icon">
          <span className="app-icon h-[30px] w-[30px] bg-pink text-[14px]" aria-hidden>
            ◎
          </span>
          <span>{dict.facts.location}</span>
          <span className="val">{t(profile.location, locale)}</span>
        </div>
      </div>

      {/* Rakamlar */}
      <p className="group-h">{dict.app.stats}</p>
      <div className="mx-4 grid grid-cols-2 gap-3">
        {profile.stats.map((s) => (
          <div key={s.label.en} className="rounded-xl bg-paper-2 px-4 py-3.5">
            <p className="text-[30px] font-bold leading-none tracking-[-0.03em] tabular-nums">
              {s.value}
              <span className="text-accent">{s.suffix}</span>
            </p>
            <p className="mt-1.5 text-[13px] leading-snug text-ink-3">{t(s.label, locale)}</p>
          </div>
        ))}
      </div>

      {/* Hakkımda */}
      <p className="group-h">{dict.app.about}</p>
      <div className="group">
        <p className="cell-text">{first}</p>
        {expanded && rest.map((p) => <p key={p.slice(0, 24)} className="cell-text">{p}</p>)}
        <button type="button" className="cell cell-tap text-accent" onClick={() => setExpanded((v) => !v)}>
          {expanded ? dict.app.less : dict.app.more}
          <span className="chev">{expanded ? "⌃" : "⌄"}</span>
        </button>
      </div>

      {/* Uzmanlık */}
      <p className="group-h">{dict.app.focus}</p>
      <div className="group">
        {profile.focus.map((f, i) => (
          <div key={f.en} className="cell">
            <span className="w-6 text-[15px] font-semibold tabular-nums text-accent">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-[16px]">{t(f, locale)}</span>
          </div>
        ))}
      </div>

      {/* Eğitim */}
      <p className="group-h">{dict.app.education}</p>
      <div className="group">
        {profile.education.map((e) => (
          <div key={e.school.en} className="cell">
            <span>
              {t(e.school, locale)}
              <span className="sub">
                {t(e.degree, locale)} · {e.period} · {t(e.location, locale)}
              </span>
            </span>
          </div>
        ))}
      </div>

      <button type="button" className="group mt-5 w-[calc(100%-2rem)]" onClick={onProjects}>
        <span className="cell cell-tap text-accent">
          {dict.app.seeProjects}
          <span className="chev">›</span>
        </span>
      </button>

      <p className="px-8 pb-6 pt-8 text-center text-[12px] text-ink-3">{dict.app.version}</p>
    </Screen>
  );
}
