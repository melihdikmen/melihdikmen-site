import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { projects, pastProjects, type Platform, type Project } from "@/data/projects";
import { t } from "@/lib/i18n";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { AndroidIcon, AppleIcon, DesktopIcon, ExternalIcon, GitHubIcon, GlobeIcon, PlayIcon } from "./Icons";

const platformIcon: Record<Platform, typeof AppleIcon> = {
  ios: AppleIcon,
  android: AndroidIcon,
  web: GlobeIcon,
  desktop: DesktopIcon,
};

function Links({ p, dict }: { p: Project; dict: Dictionary }) {
  const links = [
    p.links.appStore && { href: p.links.appStore, label: dict.projects.appStore, Icon: AppleIcon },
    p.links.playStore && { href: p.links.playStore, label: dict.projects.playStore, Icon: PlayIcon },
    p.links.github && { href: p.links.github, label: dict.projects.github, Icon: GitHubIcon },
    p.links.web && { href: p.links.web, label: dict.projects.web, Icon: ExternalIcon },
  ].filter(Boolean) as { href: string; label: string; Icon: typeof AppleIcon }[];
  if (links.length === 0) return null;
  return (
    <ul className="mt-6 flex flex-wrap gap-3">
      {links.map(({ href, label, Icon }) => (
        <li key={href}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-paper-2 px-3.5 py-2 text-[13px] font-medium transition-colors hover:bg-accent hover:text-white"
          >
            <Icon width={14} height={14} />
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Projects({ locale, dict, number }: { locale: Locale; dict: Dictionary; number: string }) {
  return (
    <Section id="projects" number={number} kicker={dict.section} title={dict.projects.title} subtitle={dict.projects.subtitle} tone="acid">
      <ol className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={(i % 2) * 60} className="box lift row-hover flex flex-col shadow-hard">
            {/* Kapak: mağaza sayfası gibi; uygulama ikonu ve platform rozetleri */}
            <div className="relative flex min-h-[200px] flex-col justify-between gap-6 overflow-hidden p-6" style={{ background: `linear-gradient(160deg, ${p.accent}, color-mix(in srgb, ${p.accent} 70%, #000))` }}>
              {p.image ? (
                <Image src={p.image} alt={p.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              ) : (
                <span aria-hidden className="font-display absolute -bottom-5 -right-1 select-none text-[8rem] font-semibold leading-none tracking-[-0.06em] text-white/10">
                  {String(i + 1).padStart(2, "0")}
                </span>
              )}
              <div className="relative flex items-start justify-between gap-4">
                <span className="text-[12px] font-semibold text-white/70">{String(i + 1).padStart(2, "0")}</span>
                <span className="rounded-full bg-white/20 px-3 py-1 text-[12px] font-semibold text-white backdrop-blur">
                  {dict.projects.status[p.status]}
                </span>
              </div>
              <div className="relative flex flex-wrap items-end gap-4">
                <span className="app-icon h-16 w-16 bg-white text-[30px]" style={{ color: p.accent }} aria-hidden>
                  {(p.short ?? p.name)[0]}
                </span>
                <span className="flex flex-wrap gap-2">
                  {p.platforms.map((pl) => {
                    const Icon = platformIcon[pl];
                    return (
                      <span key={pl} className="store-badge bg-white/20 text-white backdrop-blur">
                        <Icon width={13} height={13} />
                        {dict.projects.platforms[pl]}
                      </span>
                    );
                  })}
                </span>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-6 md:p-7">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <h3 className="row-title font-display text-[clamp(1.5rem,2.4vw,1.9rem)] font-semibold leading-[1.1] tracking-[-0.03em]">{p.name}</h3>
                {i === 0 && <span className="sticker block-acid text-[12px]">{dict.projects.featured}</span>}
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{t(p.description, locale)}</p>
              <p className="mt-5 flex flex-wrap gap-1.5">
                {p.tech.map((x) => (
                  <span key={x} className="rounded-md bg-paper-2 px-2 py-0.5 text-[12px] font-medium text-ink-2">
                    {x}
                  </span>
                ))}
              </p>
              <div className="mt-auto">
                <Links p={p} dict={dict} />
              </div>
            </div>
          </Reveal>
        ))}
      </ol>

      {pastProjects.length > 0 && (
        <div className="mt-16">
          <Reveal>
            <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold tracking-[-0.03em]">
              {dict.projects.earlier}
            </h3>
            <p className="mt-2 max-w-2xl text-[16px] text-ink-2">{dict.projects.earlierSubtitle}</p>
          </Reveal>
          <Reveal className="box mt-6 shadow-hard">
            <ol>
              {pastProjects.map((p) => (
                <li
                  key={`${p.year}-${p.name}`}
                  className="grid gap-x-6 gap-y-1 border-t border-rule px-6 py-4 first:border-t-0 md:grid-cols-[72px_260px_1fr]"
                >
                  <span className="text-[15px] font-semibold leading-none tabular-nums text-ink-3">{p.year}</span>
                  <span>
                    <span className="block font-semibold">{p.name}</span>
                    <span className="block text-[13px] text-ink-3">{p.platform}</span>
                  </span>
                  <p className="text-[14px] leading-relaxed text-ink-2">{t(p.description, locale)}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      )}
    </Section>
  );
}
