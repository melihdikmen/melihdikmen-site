import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { projects, pastProjects, type Project } from "@/data/projects";
import { t } from "@/lib/i18n";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { AppleIcon, ExternalIcon, GitHubIcon, PlayIcon } from "./Icons";

const statusTone: Record<string, string> = {
  live: "block-acid",
  beta: "block-pink",
  wip: "block-sky",
  internal: "",
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
            className="inline-flex items-center gap-2 border-2 border-ink bg-paper px-3 py-2 font-mono text-[12px] font-bold uppercase tracking-[0.08em] shadow-hard-sm transition-colors hover:bg-acid hover:text-[#0b0b0b]"
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
          <Reveal as="li" key={p.slug} delay={(i % 2) * 60} className="box lift row-hover flex flex-col shadow-hard-lg">
            {/* Kapak: proje rengi ya da görsel */}
            <div className="relative flex min-h-[170px] items-end justify-between gap-4 overflow-hidden border-b-2 border-ink p-5" style={{ background: p.accent }}>
              {p.image ? (
                <Image src={p.image} alt={p.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              ) : (
                <span aria-hidden className="font-display absolute -bottom-6 -right-2 select-none text-[9rem] font-extrabold leading-none text-white/15">
                  {String(i + 1).padStart(2, "0")}
                </span>
              )}
              <span className="relative font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-white">№ {i + 1}</span>
              <span className={`sticker relative ${statusTone[p.status]}`} style={{ "--r": "3deg" } as React.CSSProperties}>
                {dict.projects.status[p.status]}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-5 md:p-6">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <h3 className="row-title font-display text-[clamp(2.2rem,4vw,3.4rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em]">{p.name}</h3>
                {i === 0 && <span className="label bg-hot px-2 py-1 text-[#0b0b0b]">{dict.projects.featured}</span>}
              </div>
              <p className="mt-4 text-[16px] leading-relaxed">{t(p.description, locale)}</p>
              <p className="mt-5 flex flex-wrap gap-1.5">
                {p.tech.map((x) => (
                  <span key={x} className="border border-ink px-1.5 py-0.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.05em] text-ink-2">
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
            <h3 className="font-display inline-block bg-ink px-3 py-1 text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold uppercase leading-none tracking-[-0.02em] text-paper">
              {dict.projects.earlier}
            </h3>
            <p className="mt-3 max-w-2xl text-[15px]">{dict.projects.earlierSubtitle}</p>
          </Reveal>
          <Reveal className="box mt-6 shadow-hard">
            <ol>
              {pastProjects.map((p, i) => (
                <li
                  key={`${p.year}-${p.name}`}
                  className={`grid gap-x-6 gap-y-1 border-t-2 border-ink px-5 py-4 first:border-t-0 md:grid-cols-[72px_260px_1fr] ${i % 2 ? "bg-paper-2" : ""}`}
                >
                  <span className="font-display text-[1.5rem] font-extrabold leading-none tabular-nums">{p.year}</span>
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
