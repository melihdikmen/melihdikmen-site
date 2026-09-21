import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { projects, pastProjects } from "@/data/projects";
import { t } from "@/lib/i18n";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { ProjectCover } from "./ProjectCover";
import { AppleIcon, ExternalIcon, GitHubIcon, PlayIcon } from "./Icons";
import { SpotlightCard } from "./SpotlightCard";

const statusTone: Record<string, string> = {
  live: "text-teal",
  beta: "text-accent",
  wip: "text-muted",
  internal: "text-muted",
};

export function Projects({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section id="projects" title={dict.projects.title} subtitle={dict.projects.subtitle}>
      <ul className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => {
          const links = [
            p.links.appStore && { href: p.links.appStore, label: dict.projects.appStore, Icon: AppleIcon },
            p.links.playStore && { href: p.links.playStore, label: dict.projects.playStore, Icon: PlayIcon },
            p.links.github && { href: p.links.github, label: dict.projects.github, Icon: GitHubIcon },
            p.links.web && { href: p.links.web, label: dict.projects.web, Icon: ExternalIcon },
          ].filter(Boolean) as { href: string; label: string; Icon: typeof AppleIcon }[];

          return (
            <Reveal as="li" key={p.slug} delay={(i % 2) * 80}>
              <SpotlightCard className="gradient-border h-full rounded-2xl bg-surface transition-transform duration-300 hover:-translate-y-1.5 hover:glow">
              <article className="flex h-full flex-col overflow-hidden rounded-2xl">
                <ProjectCover project={p} />
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <header className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-xl font-bold tracking-tight">{p.name}</h3>
                    <span className={`font-mono text-[11px] uppercase tracking-[0.08em] ${statusTone[p.status]}`}>
                      {dict.projects.status[p.status]}
                    </span>
                  </header>
                  <p className="text-[15px] leading-relaxed text-muted">{t(p.description, locale)}</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {p.tech.map((tech) => (
                      <li key={tech} className="rounded border border-line px-2 py-0.5 font-mono text-[11.5px] text-muted">
                        {tech}
                      </li>
                    ))}
                  </ul>
                  {links.length > 0 && (
                    <ul className="mt-auto flex flex-wrap gap-4 pt-2">
                      {links.map(({ href, label, Icon }) => (
                        <li key={href}>
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline underline-offset-4"
                          >
                            <Icon width={15} height={15} />
                            {label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </ul>

      {pastProjects.length > 0 && (
        <div className="mt-16">
          <Reveal>
            <h3 className="font-display text-xl font-bold tracking-tight">{dict.projects.earlier}</h3>
            <p className="mt-2 max-w-2xl text-[15px] text-muted">{dict.projects.earlierSubtitle}</p>
          </Reveal>
          <ol className="mt-6 divide-y divide-line border-y border-line">
            {pastProjects.map((p, i) => (
              <Reveal as="li" key={`${p.year}-${p.name}`} delay={Math.min(i, 4) * 40}>
                <div className="grid gap-x-6 gap-y-1 py-4 md:grid-cols-[56px_220px_1fr]">
                  <span className="font-mono text-xs text-muted tabular-nums md:pt-1">{p.year}</span>
                  <span>
                    <span className="block font-semibold">{p.name}</span>
                    <span className="block font-mono text-[11.5px] text-muted">{p.platform}</span>
                  </span>
                  <p className="text-[15px] leading-relaxed text-muted">{t(p.description, locale)}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      )}
    </Section>
  );
}
