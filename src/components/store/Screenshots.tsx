"use client";

import { useRef } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { projects, type Platform, type Project } from "@/data/projects";
import { t } from "@/lib/i18n";
import { container } from "@/lib/ui";
import { AndroidIcon, AppleIcon, ChevronIcon, DesktopIcon, ExternalIcon, GitHubIcon, GlobeIcon, PlayIcon } from "../Icons";
import { SectionHead } from "./SectionHead";

const platformIcon: Record<Platform, typeof AppleIcon> = { ios: AppleIcon, android: AndroidIcon, web: GlobeIcon, desktop: DesktopIcon };

function Links({ p, dict }: { p: Project; dict: Dictionary }) {
  const links = [
    p.links.appStore && { href: p.links.appStore, label: dict.projects.appStore, Icon: AppleIcon },
    p.links.playStore && { href: p.links.playStore, label: dict.projects.playStore, Icon: PlayIcon },
    p.links.github && { href: p.links.github, label: dict.projects.github, Icon: GitHubIcon },
    p.links.web && { href: p.links.web, label: dict.projects.web, Icon: ExternalIcon },
  ].filter(Boolean) as { href: string; label: string; Icon: typeof AppleIcon }[];
  if (links.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {links.map(({ href, label, Icon }) => (
        <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-[#1c1c1e]">
          <Icon width={12} height={12} />
          {label}
        </a>
      ))}
    </div>
  );
}

/** Yatay kaydırılan telefon çerçeveli proje kartları; masaüstünde ok düğmeleri. */
export function Screenshots({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * 280, behavior: "smooth" });

  return (
    <section id="projects" className={`${container} scroll-mt-14 pt-10 md:pt-14`}>
      <SectionHead
        title={dict.store.screenshots}
        action={
          <span className="hidden gap-1 md:inline-flex">
            <button type="button" onClick={() => scrollBy(-1)} className="icon-btn" aria-label={dict.store.prev}>
              <ChevronIcon width={16} height={16} strokeWidth={2.2} className="rotate-180" />
            </button>
            <button type="button" onClick={() => scrollBy(1)} className="icon-btn" aria-label={dict.store.next}>
              <ChevronIcon width={16} height={16} strokeWidth={2.2} />
            </button>
          </span>
        }
      />
      <div ref={ref} className="shots -mx-5 px-5 md:-mx-10 md:px-10">
        {projects.map((p, i) => (
          <article key={p.slug} className="shot">
            <div className="shot-frame">
              <div className="shot-screen" style={{ background: `linear-gradient(170deg, ${p.accent} 0%, color-mix(in srgb, ${p.accent} 60%, #000) 100%)` }}>
                {/* Durum çubuğu */}
                <div className="flex items-center justify-between px-5 pt-3 text-[11px] font-semibold text-white/90">
                  <span>9:41</span>
                  <span className="h-[14px] w-[48px] rounded-full bg-black/70" aria-hidden />
                  <span className="flex items-end gap-[2px]" aria-hidden>
                    {[3, 5, 7, 9].map((h) => (
                      <span key={h} className="w-[3px] rounded-sm bg-white" style={{ height: h }} />
                    ))}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-white/70">{String(i + 1).padStart(2, "0")}</span>
                    <span className="badge">{dict.projects.status[p.status]}</span>
                  </div>
                  <span className="app-icon mt-6 h-14 w-14 bg-white text-[28px]" style={{ color: p.accent }}>
                    {(p.short ?? p.name)[0]}
                  </span>
                  <h3 className="display mt-4 text-[24px] leading-[1.1]">{p.name}</h3>
                  {i === 0 && <span className="mt-2 inline-block self-start rounded-full bg-white/20 px-2 py-0.5 text-[10.5px] font-semibold">{dict.store.featured}</span>}
                  <p className="mt-3 line-clamp-5 text-[12.5px] leading-[1.5] text-white/85">{t(p.description, locale)}</p>
                  <div className="mt-auto space-y-3 pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {p.platforms.map((pl) => {
                        const Icon = platformIcon[pl];
                        return (
                          <span key={pl} className="badge">
                            <Icon width={11} height={11} />
                            {dict.projects.platforms[pl]}
                          </span>
                        );
                      })}
                    </div>
                    <Links p={p} dict={dict} />
                  </div>
                </div>
                <span className="mx-auto mb-2 block h-[4px] w-[90px] rounded-full bg-white/80" aria-hidden />
              </div>
            </div>
            <p className="mt-3 truncate px-1 text-[12px] text-ink-3">{p.tech.slice(0, 4).join(" · ")}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
