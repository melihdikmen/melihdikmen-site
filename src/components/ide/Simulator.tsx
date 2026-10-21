"use client";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { projects, pastProjects } from "@/data/projects";
import { skills, type SkillGroup } from "@/data/skills";
import { story } from "@/data/story";
import { t } from "@/lib/i18n";
import { LocalTime } from "../LocalTime";
import { ContactForm } from "../ContactForm";
import { AndroidIcon, AppleIcon, DesktopIcon, GlobeIcon } from "../Icons";

type Props = { active: string; locale: Locale; dict: Dictionary; open: (id: string) => void };

const palette = ["#007aff", "#ff9500", "#5856d6", "#ff2d55", "#34c759", "#af52de"];
const platformIcon = { ios: AppleIcon, android: AndroidIcon, web: GlobeIcon, desktop: DesktopIcon };
const order: SkillGroup[] = ["mobile", "ai", "backend", "database", "tools"];

function Nav({ sub, title }: { sub: string; title: string }) {
  return (
    <div className="scr-nav">
      <div>
        {sub}
        <b>{title}</b>
      </div>
    </div>
  );
}

export function Simulator({ active, locale, dict, open }: Props) {
  const dark = active === "story";
  const project = active.startsWith("projects/") ? projects.find((p) => `projects/${p.slug}` === active) : undefined;

  let body: React.ReactNode;
  if (project) {
    const link = project.links.appStore ?? project.links.playStore ?? project.links.web ?? project.links.github;
    body = (
      <>
        <Nav sub={dict.ide.sim.app} title={project.name} />
        <div className="scr-body">
          <div className="flex items-center gap-3">
            <span className="app-icon h-16 w-16 text-[28px]" style={{ background: project.accent }}>
              {(project.short ?? project.name)[0]}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[15px] font-semibold">{project.name}</div>
              <div className="ios-sub">{project.tech.slice(0, 2).join(" · ")}</div>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="ios-pill">{dict.projects.status[project.status]}</span>
              </div>
            </div>
            {link ? (
              <a href={link} target="_blank" rel="noopener noreferrer" className="ios-btn">
                {dict.ide.sim.open}
              </a>
            ) : (
              <span className="ios-btn opacity-40">{dict.ide.sim.open}</span>
            )}
          </div>
          <div className="mt-3 flex gap-2">
            {project.platforms.map((pl) => {
              const Icon = platformIcon[pl];
              return (
                <span key={pl} className="inline-flex items-center gap-1 text-[11px] text-[#8e8e93]">
                  <Icon width={12} height={12} /> {dict.projects.platforms[pl]}
                </span>
              );
            })}
          </div>
          <p className="mt-4 text-[13px] leading-relaxed">{t(project.description, locale)}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.map((x) => (
              <span key={x} className="rounded-md bg-white px-2 py-0.5 text-[11px] font-medium text-[#3a3a3c] shadow-sm">
                {x}
              </span>
            ))}
          </div>
          <div className="ios-card mt-5">
            {Object.entries(project.links)
              .filter(([, v]) => Boolean(v))
              .map(([k, v]) => (
                <a key={k} href={v as string} target="_blank" rel="noopener noreferrer" className="ios-row text-[#007aff]">
                  {dict.projects[k as "appStore" | "playStore" | "github" | "web"]}
                  <small>›</small>
                </a>
              ))}
          </div>
        </div>
      </>
    );
  } else if (active === "projects/earlier") {
    body = (
      <>
        <Nav sub={dict.projects.title} title={dict.projects.earlier} />
        <div className="scr-body">
          <div className="ios-card">
            {pastProjects.map((p, i) => (
              <div key={p.name + p.year} className="ios-row">
                <span className="app-icon h-9 w-9 text-[14px]" style={{ background: palette[i % palette.length] }}>
                  {p.name[0]}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-medium">{p.name}</span>
                  <span className="ios-sub">{p.platform}</span>
                </span>
                <small>{p.year}</small>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  } else if (active === "about") {
    body = (
      <>
        <Nav sub={dict.ide.sim.profile} title={profile.firstName} />
        <div className="scr-body">
          <div className="flex flex-col items-center gap-2 py-4 text-center">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-[#007aff] text-[26px] font-bold text-white">MD</span>
            <div className="text-[17px] font-semibold">{profile.name}</div>
            <div className="ios-sub">{dict.hero.eyebrow}</div>
          </div>
          <div className="ios-card">
            <div className="ios-row">
              {dict.facts.location}
              <small>{t(profile.location, locale)}</small>
            </div>
            <div className="ios-row">
              {dict.facts.time}
              <small className="tabular-nums">
                <LocalTime locale={locale} seconds={false} />
              </small>
            </div>
            <div className="ios-row">
              {dict.facts.status}
              <small className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-[#34c759]" />
                {dict.hero.available}
              </small>
            </div>
            <div className="ios-row">
              {dict.facts.now}
              <small className="max-w-[55%] truncate">{dict.facts.nowValue}</small>
            </div>
          </div>
          <div className="ios-card mt-3">
            {profile.education.map((e) => (
              <div key={e.school.en} className="ios-row">
                <span>
                  <span className="block font-medium">{t(e.school, locale)}</span>
                  <span className="ios-sub">{t(e.degree, locale)}</span>
                </span>
                <small>{e.period}</small>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  } else if (active === "experience") {
    body = (
      <>
        <Nav sub={dict.ide.sim.timeline} title={dict.experience.title} />
        <div className="scr-body">
          <div className="tl mt-2">
            {experience.map((job) => (
              <div key={job.company + job.start}>
                <div className="ios-sub">
                  {job.start?.slice(0, 4)} — {job.end ? job.end.slice(0, 4) : dict.experience.present}
                </div>
                <div className="text-[14px] font-semibold">{job.company}</div>
                <div className="text-[12.5px] text-[#3a3a3c]">{t(job.role, locale)}</div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  } else if (active === "skills") {
    body = (
      <>
        <Nav sub={dict.ide.sim.skills} title={dict.skills.title} />
        <div className="scr-body">
          {order.map((g) => (
            <div key={g} className="mb-4">
              <div className="mb-1.5 px-3 text-[11px] uppercase tracking-wide text-[#8e8e93]">{dict.skills.groups[g]}</div>
              <div className="ios-card">
                {skills[g].map((s) => (
                  <div key={s} className="ios-row">
                    {s}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  } else if (active === "story") {
    body = (
      <>
        <Nav sub={dict.ide.sim.story} title={dict.ide.sim.chapters} />
        <div className="scr-body">
          <div className="ios-card">
            {story.map((c, i) => (
              <div key={c.mark} className="ios-row">
                <span className="w-7 font-mono text-[11px] text-[#8e8e93]">{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-0">
                  <span className="block truncate font-medium">{t(c.title, locale)}</span>
                  <span className="ios-sub">{t(c.eyebrow, locale)}</span>
                </span>
                <small>{c.mark}</small>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  } else if (active === "contact") {
    body = (
      <>
        <Nav sub={dict.contact.title} title={profile.firstName} />
        <div className="scr-body flex flex-col gap-2">
          <span className="bubble bubble-in">{dict.contact.subtitle}</span>
          <span className="bubble bubble-out">{dict.contact.big}</span>
          <div className="ios-card mt-3 p-3">
            <ContactForm dict={dict} email={profile.email} />
          </div>
        </div>
      </>
    );
  } else {
    // README → ana ekran
    const apps = [
      ...projects.map((p) => ({ id: `projects/${p.slug}`, name: p.short ?? p.name, bg: p.accent })),
      ...[...new Set(pastProjects.map((p) => p.name.split(" ")[0]))].map((name, i) => ({ id: "projects/earlier", name, bg: palette[i % palette.length] })),
    ].slice(0, 16);
    body = (
      <>
        <div className="scr-body pt-6">
          <div className="home">
            {apps.map((a, i) => (
              <figure key={a.id + i}>
                <button type="button" onClick={() => open(a.id)} className="app-icon h-[54px] w-[54px] text-[22px]" style={{ background: a.bg }} aria-label={a.name}>
                  {a.name[0]}
                </button>
                <figcaption>{a.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="dock">
          {[
            { id: "about", l: "MD", bg: "#007aff" },
            { id: "experience", l: "Ex", bg: "#34c759" },
            { id: "skills", l: "Sk", bg: "#af52de" },
            { id: "contact", l: "✉", bg: "#ff9500" },
          ].map((d) => (
            <button key={d.id} type="button" onClick={() => open(d.id)} className="app-icon h-12 w-12 text-[17px]" style={{ background: d.bg }}>
              {d.l}
            </button>
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="device">
      <div className={`screen ${dark ? "screen-dark" : ""}`}>
        <div className="sbar">
          <LocalTime locale={locale} seconds={false} />
          <span className="island" aria-hidden />
          <span className="text-[11px]">●●●</span>
        </div>
        {body}
        <span className="mx-auto mb-2 mt-1 block h-[5px] w-28 shrink-0 rounded-full bg-current opacity-80" aria-hidden />
      </div>
    </div>
  );
}
