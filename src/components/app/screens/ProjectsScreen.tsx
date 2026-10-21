"use client";

import { projects, pastProjects, type Project } from "@/data/projects";
import { t } from "@/lib/i18n";
import { AndroidIcon, AppleIcon, DesktopIcon, ExternalIcon, GitHubIcon, GlobeIcon, PlayIcon } from "../../Icons";
import { Screen } from "../Screen";
import type { ScreenProps } from "../App";

const platformIcon = { ios: AppleIcon, android: AndroidIcon, web: GlobeIcon, desktop: DesktopIcon } as const;

function Mark({ p, size, className = "" }: { p: Project; size: number; className?: string }) {
  return (
    <span className={`app-icon ${className}`} style={{ width: size, height: size, background: p.accent, fontSize: size * 0.46 }} aria-hidden>
      {(p.short ?? p.name)[0]}
    </span>
  );
}

export function ProjectsScreen({ dict, on, under, onOpen }: ScreenProps & { under: boolean; onOpen: (slug: string) => void }) {
  return (
    <Screen title={dict.app.tabs.projects} on={on} under={under}>
      <p className="group-h">{dict.app.allProjects}</p>
      <div className="group">
        {projects.map((p) => (
          <button key={p.slug} type="button" className="cell cell-tap has-icon" onClick={() => onOpen(p.slug)}>
            <Mark p={p} size={44} />
            <span className="min-w-0">
              <span className="block truncate font-medium">{p.name}</span>
              <span className="sub">
                {dict.projects.status[p.status]} · {p.platforms.map((pl) => dict.projects.platforms[pl]).join(" · ")}
              </span>
            </span>
            <span className="chev">›</span>
          </button>
        ))}
      </div>

      <p className="group-h">{dict.app.earlier}</p>
      <div className="group">
        {pastProjects.map((p) => (
          <div key={`${p.year}-${p.name}`} className="cell">
            <span className="min-w-0">
              <span className="block truncate">{p.name}</span>
              <span className="sub">{p.platform}</span>
            </span>
            <span className="val tabular-nums">{p.year}</span>
          </div>
        ))}
      </div>
      <p className="group-f pb-6">{dict.projects.earlierSubtitle}</p>
    </Screen>
  );
}

export function ProjectDetail({ locale, dict, on, slug, onBack }: ScreenProps & { slug: string | null; onBack: () => void }) {
  const p = projects.find((x) => x.slug === slug) ?? null;
  const links = p
    ? ([
        p.links.appStore && { href: p.links.appStore, label: dict.projects.appStore, Icon: AppleIcon },
        p.links.playStore && { href: p.links.playStore, label: dict.projects.playStore, Icon: PlayIcon },
        p.links.github && { href: p.links.github, label: dict.projects.github, Icon: GitHubIcon },
        p.links.web && { href: p.links.web, label: dict.projects.web, Icon: ExternalIcon },
      ].filter(Boolean) as { href: string; label: string; Icon: typeof AppleIcon }[])
    : [];

  return (
    <Screen
      title={p?.name ?? ""}
      on={on}
      detail
      largeTitle={false}
      left={
        <button type="button" className="nav-btn" onClick={onBack}>
          <span className="text-[24px] leading-none">‹</span>
          {dict.app.back}
        </button>
      }
    >
      {p && (
        <>
          <div className="relative overflow-hidden px-6 pb-6 pt-4 text-center" style={{ background: `linear-gradient(180deg, color-mix(in srgb, ${p.accent} 22%, var(--paper)), var(--paper))` }}>
            <Mark p={p} size={96} className="mx-auto shadow-[0_12px_30px_-10px_rgba(0,0,0,0.4)]" />
            <h1 className="mt-4 text-[28px] font-bold leading-tight tracking-[-0.02em]">{p.name}</h1>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              <span className="pill pill-accent">{dict.projects.status[p.status]}</span>
              {p.platforms.map((pl) => {
                const Icon = platformIcon[pl];
                return (
                  <span key={pl} className="pill pill-dark">
                    <Icon width={12} height={12} />
                    {dict.projects.platforms[pl]}
                  </span>
                );
              })}
            </div>
          </div>

          <p className="group-h">{dict.app.description}</p>
          <div className="group">
            <p className="cell-text">{t(p.description, locale)}</p>
          </div>

          <p className="group-h">{dict.app.stack}</p>
          <div className="group">
            <div className="flex flex-wrap gap-2 px-4 py-3.5">
              {p.tech.map((x) => (
                <span key={x} className="pill">
                  {x}
                </span>
              ))}
            </div>
          </div>

          {links.length > 0 && (
            <>
              <p className="group-h">{dict.app.links}</p>
              <div className="group">
                {links.map(({ href, label, Icon }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="cell cell-tap has-icon">
                    <span className="app-icon h-[30px] w-[30px] bg-ink text-paper" aria-hidden>
                      <Icon width={15} height={15} />
                    </span>
                    <span className="text-accent">{label}</span>
                    <span className="chev">↗</span>
                  </a>
                ))}
              </div>
            </>
          )}
          <div className="h-8" />
        </>
      )}
    </Screen>
  );
}
