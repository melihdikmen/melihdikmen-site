import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { profile } from "@/data/profile";
import { skills } from "@/data/skills";
import { t } from "@/lib/i18n";
import { ArrowIcon, DownloadIcon } from "./Icons";
import { PhoneMockup } from "./PhoneMockup";
import { Stats } from "./Stats";
import { Marquee } from "./Marquee";

function Headline({ text, highlight }: { text: string; highlight: string }) {
  const i = highlight ? text.indexOf(highlight) : -1;
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className="text-gradient">{highlight}</span>
      {text.slice(i + highlight.length)}
    </>
  );
}

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden">
      <div className="aurora" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.28] dark:opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--line) 1px, transparent 1px), linear-gradient(to bottom, var(--line) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at 30% 0%, black 20%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 pb-16 pt-14 lg:grid-cols-[1.15fr_0.85fr] lg:pb-24 lg:pt-20">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line/80 bg-surface/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-g3 opacity-70 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-g3" />
            </span>
            {dict.hero.eyebrow} · {t(profile.location, locale)}
          </p>
          <h1 className="mt-7 max-w-[16ch] font-display text-[clamp(2.6rem,7vw,5.2rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-balance">
            <Headline text={t(profile.headline, locale)} highlight={t(profile.headlineHighlight, locale)} />
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted md:text-xl">{t(profile.tagline, locale)}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="glow group inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(135deg,var(--g1),var(--g2))] px-6 py-3.5 font-display text-base font-bold text-white transition-transform hover:-translate-y-0.5"
            >
              {dict.hero.contact}
              <ArrowIcon width={16} height={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={profile.cvPath}
              download
              className="gradient-border inline-flex items-center gap-2 rounded-xl bg-surface/70 px-6 py-3.5 font-display text-base font-bold backdrop-blur transition-transform hover:-translate-y-0.5"
            >
              <DownloadIcon width={16} height={16} />
              {dict.hero.cv}
            </a>
            <span className="ml-1 font-mono text-xs text-muted">{dict.hero.available}</span>
          </div>
        </div>

        <div className="relative hidden justify-center lg:flex">
          <PhoneMockup dict={dict} />
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-14">
        <Stats items={profile.stats.map((s) => ({ value: s.value, suffix: s.suffix, label: t(s.label, locale) }))} />
      </div>

      <Marquee items={[...skills.mobile, ...skills.backend.slice(0, 3), ...skills.database.slice(0, 2)]} />
    </section>
  );
}
