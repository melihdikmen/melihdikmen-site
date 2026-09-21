import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { projects, pastProjects, type Project } from "@/data/projects";
import { t } from "@/lib/i18n";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { ProjectCover } from "./ProjectCover";
import { AppleIcon, ExternalIcon, GitHubIcon, PlayIcon } from "./Icons";
import { TiltCard } from "./TiltCard";

const statusTone: Record<string, string> = {
  live: "text-g3",
  beta: "text-g2",
  wip: "text-muted",
  internal: "text-muted",
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
    <ul className="mt-auto flex flex-wrap gap-4 pt-3">
      {links.map(({ href, label, Icon }) => (
        <li key={href}>
          <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline underline-offset-4">
            <Icon width={15} height={15} />
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function Tech({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((tech) => (
        <li key={tech} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11.5px] text-muted">
          {tech}
        </li>
      ))}
    </ul>
  );
}

export function Projects({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [featured, ...rest] = projects;
  return (
    <Section id="projects" title={dict.projects.title} subtitle={dict.projects.subtitle}>
      {featured && (
        <Reveal>
          <TiltCard max={4} className="gradient-border glow rounded-3xl bg-surface">
            <article className="grid overflow-hidden rounded-3xl md:grid-cols-[1.1fr_1fr]">
              <div className="[&>div]:h-full [&>div]:rounded-none [&>div]:md:rounded-l-3xl">
                <ProjectCover project={featured} />
              </div>
              <div className="flex flex-col gap-4 p-7 md:p-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-g2">{dict.projects.featured}</p>
                <header className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">{featured.name}</h3>
                  <span className={`font-mono text-[11px] uppercase tracking-[0.1em] ${statusTone[featured.status]}`}>
                    {dict.projects.status[featured.status]}
                  </span>
                </header>
                <p className="text-[16px] leading-relaxed text-muted">{t(featured.description, locale)}</p>
                <Tech items={featured.tech} />
                <Links p={featured} dict={dict} />
              </div>
            </article>
          </TiltCard>
        </Reveal>
      )}

      <ul className="mt-6 grid gap-5 md:grid-cols-3">
        {rest.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={i * 80} className="h-full">
            <TiltCard className="gradient-border h-full rounded-2xl bg-surface">
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
                  <Tech items={p.tech} />
                  <Links p={p} dict={dict} />
                </div>
              </article>
            </TiltCard>
          </Reveal>
        ))}
      </ul>

      {pastProjects.length > 0 && (
        <div className="mt-20">
          <Reveal>
            <h3 className="font-display text-2xl font-extrabold tracking-tight">
              {dict.projects.earlier}
              <span className="text-gradient">.</span>
            </h3>
            <p className="mt-2 max-w-2xl text-[15px] text-muted">{dict.projects.earlierSubtitle}</p>
          </Reveal>
          <ol className="mt-6 divide-y divide-line border-y border-line">
            {pastProjects.map((p, i) => (
              <Reveal as="li" key={`${p.year}-${p.name}`} delay={Math.min(i, 4) * 40}>
                <div className="group grid gap-x-6 gap-y-1 py-4 transition-colors md:grid-cols-[64px_230px_1fr]">
                  <span className="font-display text-xl font-extrabold text-muted/70 tabular-nums transition-colors group-hover:text-gradient md:pt-0.5">
                    {p.year}
                  </span>
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
