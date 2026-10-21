import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { projects, pastProjects, type Platform, type Project } from "@/data/projects";
import { t } from "@/lib/i18n";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { AndroidIcon, AppleIcon, DesktopIcon, ExternalIcon, GitHubIcon, GlobeIcon, PlayIcon } from "./Icons";

const statusTone: Record<string, string> = {
  live: "block-acid",
  beta: "block-pink",
  wip: "block-sky",
  internal: "",
};

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
            className="inline-flex items-center gap-2 border border-acid/50 bg-paper px-3 py-2 font-mono text-[12px] font-bold uppercase tracking-[0.1em] text-acid shadow-hard-sm transition-colors hover:bg-acid hover:text-on-color"
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
      <ol className="grid gap-8 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={(i % 2) * 60} className="box lift hud row-hover flex flex-col shadow-hard-lg">
            {/* Kapak: mağaza sayfası gibi; uygulama ikonu ve platform rozetleri */}
            <div className="relative flex min-h-[190px] flex-col justify-between gap-6 overflow-hidden border-b border-rule p-5" style={{ background: `linear-gradient(135deg, color-mix(in srgb, ${p.accent} 45%, transparent), transparent 70%)`, boxShadow: `inset 0 1px 0 ${p.accent}` }}>
              {p.image ? (
                <Image src={p.image} alt={p.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              ) : (
                <span aria-hidden className="font-display absolute -bottom-4 -right-2 select-none text-[7rem] font-extrabold leading-none opacity-20" style={{ color: p.accent }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              )}
              <div className="relative flex items-start justify-between gap-4">
                <span className="font-mono text-[12px] font-bold uppercase tracking-[0.16em] text-ink-2">{"// "}{String(i + 1).padStart(2, "0")}</span>
                <span className={`sticker ${statusTone[p.status]}`}>
                  {dict.projects.status[p.status]}
                </span>
              </div>
              <div className="relative flex flex-wrap items-end gap-4">
                <span className="app-icon h-16 w-16 text-[30px] text-white" style={{ background: p.accent, boxShadow: `0 0 28px -4px ${p.accent}` }} aria-hidden>
                  {(p.short ?? p.name)[0]}
                </span>
                <span className="flex flex-wrap gap-2">
                  {p.platforms.map((pl) => {
                    const Icon = platformIcon[pl];
                    return (
                      <span key={pl} className="store-badge">
                        <Icon width={13} height={13} />
                        {dict.projects.platforms[pl]}
                      </span>
                    );
                  })}
                </span>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-5 md:p-6">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <h3 className="row-title font-display text-[clamp(1.4rem,2.6vw,2.1rem)] font-extrabold uppercase leading-[1]">{p.name}</h3>
                {i === 0 && <span className="label bg-hot px-2 py-1 text-on-color">{dict.projects.featured}</span>}
              </div>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-2">{t(p.description, locale)}</p>
              <p className="mt-5 flex flex-wrap gap-1.5">
                {p.tech.map((x) => (
                  <span key={x} className="border border-rule px-1.5 py-0.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.08em] text-ink-2">
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
            <h3 className="font-display neon-cyan inline-block text-[clamp(1.2rem,2.4vw,1.8rem)] font-extrabold uppercase leading-none">
              {dict.projects.earlier}
            </h3>
            <p className="mt-3 max-w-2xl text-[15px] text-ink-2">{dict.projects.earlierSubtitle}</p>
          </Reveal>
          <Reveal className="box mt-6 shadow-hard">
            <ol>
              {pastProjects.map((p, i) => (
                <li
                  key={`${p.year}-${p.name}`}
                  className={`grid gap-x-6 gap-y-1 border-t border-rule px-5 py-4 first:border-t-0 md:grid-cols-[72px_260px_1fr] ${i % 2 ? "bg-paper-2/50" : ""}`}
                >
                  <span className="font-display text-[1.2rem] font-extrabold leading-none text-acid tabular-nums">{p.year}</span>
                  <span>
                    <span className="block font-semibold">{p.name}</span>
                    <span className="label block text-ink-3">{p.platform}</span>
                  </span>
                  <p className="text-[15px] leading-relaxed text-ink-2">{t(p.description, locale)}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      )}
    </Section>
  );
}
