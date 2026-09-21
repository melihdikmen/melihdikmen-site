import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { profile } from "@/data/profile";
import { skills } from "@/data/skills";
import { t } from "@/lib/i18n";
import { ArrowIcon, DownloadIcon } from "./Icons";
import { PhoneMockup } from "./PhoneMockup";
import { ParticleField } from "./ParticleField";
import { RotatingBadge } from "./RotatingBadge";
import { Marquee } from "./Marquee";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <>
      <section className="stage noise relative overflow-hidden">
        <ParticleField />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_20%,color-mix(in_srgb,var(--g2)_28%,transparent),transparent_70%),radial-gradient(50%_50%_at_10%_90%,color-mix(in_srgb,var(--g3)_22%,transparent),transparent_70%)]"
        />

        <div className="relative mx-auto grid min-h-[70svh] lg:min-h-[86svh] w-full max-w-6xl items-center gap-10 px-5 pb-20 pt-16 lg:grid-cols-[1.2fr_0.8fr] lg:pt-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-g3 opacity-70 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-g3" />
              </span>
              {dict.hero.eyebrow}
            </p>

            <h1 className="mt-8 font-display font-extrabold leading-[0.86] tracking-[-0.045em]">
              <span className="block text-[clamp(4rem,13vw,10rem)]">{profile.firstName}</span>
              <span className="text-outline block text-[clamp(4rem,13vw,10rem)]">{profile.lastName}</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted md:text-xl">{t(profile.tagline, locale)}</p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="glow group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--g1),var(--g2))] px-7 py-4 font-display text-base font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                {dict.hero.contact}
                <ArrowIcon width={16} height={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={profile.cvPath}
                download
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-7 py-4 font-display text-base font-bold backdrop-blur transition-colors hover:border-g1"
              >
                <DownloadIcon width={16} height={16} />
                {dict.hero.cv}
              </a>
            </div>
          </div>

          <div className="relative hidden justify-center lg:flex">
            <PhoneMockup dict={dict} />
            <div className="absolute -left-10 top-8 rounded-full bg-bg/70 backdrop-blur">
              <RotatingBadge text={dict.hero.badge.repeat(2)} />
            </div>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 pb-8 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          <span className="flex items-center gap-3">
            <span className="scroll-hint inline-block h-6 w-px bg-[linear-gradient(180deg,var(--g1),transparent)]" />
            {dict.hero.scroll}
          </span>
          <span>{t(profile.location, locale)} · {dict.hero.available}</span>
        </div>
      </section>

      <Marquee items={[...skills.mobile, ...skills.backend.slice(0, 3), ...skills.database.slice(0, 2)]} />
    </>
  );
}
