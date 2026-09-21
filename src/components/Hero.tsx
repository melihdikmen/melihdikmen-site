import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { profile } from "@/data/profile";
import { t } from "@/lib/i18n";
import { ArrowIcon, DownloadIcon } from "./Icons";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden">
      {/* Arka plan: ince ızgara, telefon ekranı hissi */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--line) 1px, transparent 1px), linear-gradient(to bottom, var(--line) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at 20% 0%, black 30%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-5xl px-5 pb-16 pt-14 md:pb-24 md:pt-24">
        <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
          </span>
          {dict.hero.eyebrow} · {t(profile.location, locale)}
        </p>
        <h1 className="mt-6 max-w-[17ch] font-display text-[clamp(2.4rem,6.5vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.025em] text-balance">
          {t(profile.headline, locale)}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{t(profile.tagline, locale)}</p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 font-display text-base font-bold text-accent-ink transition-transform hover:-translate-y-px"
          >
            {dict.hero.contact}
            <ArrowIcon width={16} height={16} />
          </a>
          <a
            href={profile.cvPath}
            download
            className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-3 font-display text-base font-bold transition-colors hover:border-accent"
          >
            <DownloadIcon width={16} height={16} />
            {dict.hero.cv}
          </a>
          <span className="ml-1 font-mono text-xs text-muted">{dict.hero.available}</span>
        </div>
      </div>
    </section>
  );
}
