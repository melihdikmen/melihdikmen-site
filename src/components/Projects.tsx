import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { projects, pastProjects, type Project } from "@/data/projects";
import { t } from "@/lib/i18n";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { AppleIcon, ExternalIcon, GitHubIcon, PlayIcon } from "./Icons";

const statusTone: Record<string, string> = {
  live: "text-accent",
  beta: "text-ink",
  wip: "text-ink-3",
  internal: "text-ink-3",
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
    <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
      {links.map(({ href, label, Icon }) => (
        <li key={href}>
          <a href={href} target="_blank" rel="noopener noreferrer" className="u inline-flex items-center gap-1.5 text-[13.5px]">
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
    <Section id="projects" number={number} kicker={dict.section} title={dict.projects.title} subtitle={dict.projects.subtitle}>
      <ol className="rule-t">
        {projects.map((p, i) => (
          <Reveal
            as="li"
            key={p.slug}
            className={`row-hover grid gap-x-8 gap-y-4 rule-b py-10 md:grid-cols-[64px_1fr] md:py-12 ${p.image ? "lg:grid-cols-[64px_1fr_300px]" : ""}`}
          >
            <span className="font-mono text-[12px] text-ink-3">№ {i + 1}</span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <h3 className="row-title font-display text-[clamp(2.2rem,5vw,4rem)] font-light leading-none tracking-[-0.025em]">{p.name}</h3>
                <span className={`stamp ${statusTone[p.status]}`}>{dict.projects.status[p.status]}</span>
                {i === 0 && <span className="smallcaps text-accent">{dict.projects.featured}</span>}
              </div>
              <p className="mt-5 max-w-2xl text-[16px] leading-relaxed">{t(p.description, locale)}</p>
              <p className="mt-4 font-mono text-[11.5px] leading-relaxed text-ink-3">{p.tech.join(" / ")}</p>
              <Links p={p} dict={dict} />
            </div>
            {p.image && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-rule bg-paper-2 md:col-start-2 lg:col-start-3">
                <Image src={p.image} alt={p.name} fill sizes="(max-width: 1024px) 100vw, 300px" className="object-cover" />
              </div>
            )}
          </Reveal>
        ))}
      </ol>

      {pastProjects.length > 0 && (
        <div className="mt-20">
          <Reveal>
            <h3 className="font-display text-[1.75rem] font-normal leading-tight tracking-[-0.015em]">{dict.projects.earlier}</h3>
            <p className="mt-2 max-w-2xl text-[15px] text-ink-2">{dict.projects.earlierSubtitle}</p>
          </Reveal>
          <ol className="mt-6 rule-t">
            {pastProjects.map((p, i) => (
              <Reveal as="li" key={`${p.year}-${p.name}`} delay={Math.min(i, 4) * 40}>
                <div className="grid gap-x-6 gap-y-1 rule-b py-4 md:grid-cols-[64px_240px_1fr]">
                  <span className="font-display text-[20px] font-light leading-none text-ink-3 tabular-nums md:pt-0.5">{p.year}</span>
                  <span>
                    <span className="block font-medium">{p.name}</span>
                    <span className="block font-mono text-[11px] text-ink-3">{p.platform}</span>
                  </span>
                  <p className="text-[15px] leading-relaxed text-ink-2">{t(p.description, locale)}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      )}
    </Section>
  );
}
