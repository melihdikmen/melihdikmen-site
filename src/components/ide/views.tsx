"use client";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { projects, pastProjects, type Project } from "@/data/projects";
import { skills, type SkillGroup } from "@/data/skills";
import { story } from "@/data/story";
import { formatMonth, t } from "@/lib/i18n";
import { StoryPlayer, type PlayerApp, type PlayerChapter } from "../StoryPlayer";
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from "../Icons";
import { LocalTime } from "../LocalTime";
import { CodeBlock, attr, cm, fn, ind, key, kw, num, pl, str, tag, ty, type Line } from "./code";

type Ctx = { locale: Locale; dict: Dictionary; open: (id: string) => void };

/* ---------- README.md ---------- */
export function ReadmeView({ locale, dict, open }: Ctx) {
  const years = profile.stats[0];
  const files = ["about.md", "experience.json", "projects/", "skills.yaml", "story.mp4", "contact.ts"];
  const ids = ["about", "experience", `projects/${projects[0].slug}`, "skills", "story", "contact"];
  return (
    <div className="md">
      <p className="hint">
        <span aria-hidden>→</span>
        <span className="hint-d">{dict.ide.hint}</span>
        <span className="hint-m">{dict.ide.hintMobile}</span>
      </p>
      <p className="flex flex-wrap gap-2">
        <span className="badge badge-green">
          <span className="blink inline-block h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
          {dict.hero.available}
        </span>
        <span className="badge">
          <b>
            {years.value}
            {years.suffix}
          </b>{" "}
          {t(years.label, locale)}
        </span>
        <span className="badge badge-blue">✦ {dict.hero.aiBadge}</span>
      </p>
      <h1>
        <span className="k">#</span>
        {profile.name}
        <span className="text-accent">.</span>
      </h1>
      <p className="lead">{dict.hero.eyebrow}</p>
      <p>{t(profile.tagline, locale)}</p>
      <p className="flex flex-wrap gap-2.5 pt-1">
        <button type="button" className="btn" onClick={() => open("contact")}>
          {dict.hero.contact}
        </button>
        <a href={profile.cvPath} download className="btn btn-ghost">
          <DownloadIcon width={15} height={15} strokeWidth={2} />
          {dict.hero.cv}
        </a>
      </p>

      <h2>
        <span className="k">##</span>
        {dict.ide.readme.stats}
      </h2>
      <table>
        <tbody>
          {profile.stats.map((s) => (
            <tr key={s.label.en}>
              <th className="w-24 font-mono text-[18px] tabular-nums">
                {s.value}
                <span className="text-accent">{s.suffix}</span>
              </th>
              <td>{t(s.label, locale)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>
        <span className="k">##</span>
        {dict.ide.readme.focus}
      </h2>
      <ul>
        {profile.focus.map((f) => (
          <li key={f.en}>{t(f, locale)}</li>
        ))}
      </ul>

      <h2>
        <span className="k">##</span>
        {dict.ide.readme.getStarted}
      </h2>
<ul>
        {files.map((f, i) => (
          <li key={f}>
            <button type="button" className="u" onClick={() => open(ids[i])}>
              <code>{f}</code>
            </button>
          </li>
        ))}
      </ul>

      <h2>
        <span className="k">##</span>
        {dict.ide.readme.links}
      </h2>
      <ul>
        <li>
          <a className="u" href={profile.social.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </li>
        <li>
          <a className="u" href={profile.social.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </li>
        <li>
          <a className="u" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </li>
      </ul>
    </div>
  );
}

/* ---------- about.md ---------- */
export function AboutView({ locale, dict }: Ctx) {
  const [first, ...rest] = profile.about[locale];
  return (
    <div className="md">
      <h1>
        <span className="k">#</span>
        {dict.about.title}
      </h1>
      <p className="lead">{first}</p>
      {rest.map((p) => (
        <p key={p.slice(0, 24)}>{p}</p>
      ))}
      <h2>
        <span className="k">##</span>
        {dict.about.focusTitle}
      </h2>
      <ol>
        {profile.focus.map((f) => (
          <li key={f.en}>{t(f, locale)}</li>
        ))}
      </ol>
      <h2>
        <span className="k">##</span>
        {dict.about.leadTitle}
      </h2>
      <blockquote>{t(profile.leadership, locale)}</blockquote>
      <h2>
        <span className="k">##</span>
        {dict.about.educationTitle}
      </h2>
      {profile.education.map((e) => (
        <p key={e.school.en}>
          <strong className="text-fg">{t(e.school, locale)}</strong> — {t(e.degree, locale)}, {e.period} · {t(e.location, locale)}
        </p>
      ))}
      <h2>
        <span className="k">##</span>
        {dict.about.facts}
      </h2>
      <table>
        <tbody>
          <tr>
            <th className="w-40">{dict.facts.location}</th>
            <td>{t(profile.location, locale)}</td>
          </tr>
          <tr>
            <th>{dict.facts.time}</th>
            <td className="font-mono tabular-nums">
              <LocalTime locale={locale} />
            </td>
          </tr>
          <tr>
            <th>{dict.facts.status}</th>
            <td>
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-green" aria-hidden />
              {dict.facts.statusValue}
            </td>
          </tr>
          <tr>
            <th>{dict.facts.now}</th>
            <td>{dict.facts.nowValue}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* ---------- experience.json ---------- */
function jsonStr(k: string, v: string, last = false, depth = 2): Line {
  return [ind(depth), key(`"${k}"`), pl(": "), str(v), pl(last ? "" : ",")];
}
export function ExperienceView({ locale, dict }: Ctx) {
  const lines: Line[] = [[pl("[")]];
  experience.forEach((job, i) => {
    const period = job.start ? `${formatMonth(job.start, locale)} — ${job.end ? formatMonth(job.end, locale) : dict.experience.present}` : "";
    lines.push([ind(1), pl("{")]);
    lines.push(jsonStr("company", job.company));
    lines.push(jsonStr("role", t(job.role, locale)));
    lines.push(jsonStr("period", period));
    lines.push(jsonStr("location", t(job.location, locale)));
    lines.push([ind(2), key('"current"'), pl(": "), kw(job.end ? "false" : "true"), pl(",")]);
    lines.push(jsonStr("summary", t(job.summary, locale), job.highlights.length === 0 && job.tags.length === 0));
    if (job.highlights.length) {
      lines.push([ind(2), key('"highlights"'), pl(": [")]);
      job.highlights.forEach((h, j) => lines.push([ind(3), str(t(h, locale)), pl(j === job.highlights.length - 1 ? "" : ",")]));
      lines.push([ind(2), pl(job.tags.length ? "]," : "]")]);
    }
    if (job.tags.length) {
      lines.push([ind(2), key('"tags"'), pl(": ["), ...job.tags.flatMap((tg, j) => [str(tg), pl(j === job.tags.length - 1 ? "" : ", ")]), pl("]")]);
    }
    lines.push([ind(1), pl(i === experience.length - 1 ? "}" : "},")]);
  });
  lines.push([pl("]")]);
  return <CodeBlock lines={lines} />;
}

/* ---------- projects/<slug>.tsx ---------- */
function pascal(slug: string) {
  return slug
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join("");
}
export function ProjectView({ p, locale, dict }: Ctx & { p: Project }) {
  const name = pascal(p.slug);
  const linkEntries = Object.entries(p.links).filter(([, v]) => Boolean(v)) as [string, string][];
  const lines: Line[] = [
    [kw("import"), pl(" { "), ty("App"), pl(" } "), kw("from"), pl(" "), str("@/components/App"), pl(";")],
    [],
    [cm("/**")],
    [cm(` * ${t(p.description, locale)}`)],
    [cm(" */")],
    [kw("export default function"), pl(" "), fn(name), pl("() {")],
    [ind(1), kw("return"), pl(" (")],
    [ind(2), pl("<"), tag("App")],
    [ind(3), attr("name"), pl("="), str(p.name)],
    [ind(3), attr("status"), pl("="), str(p.status), pl("  "), cm(`// ${dict.projects.status[p.status]}`)],
    [ind(3), attr("platforms"), pl("={["), ...p.platforms.flatMap((x, i) => [str(x), pl(i === p.platforms.length - 1 ? "" : ", ")]), pl("]}")],
    [ind(3), attr("stack"), pl("={[")],
    ...p.tech.map((x, i): Line => [ind(4), str(x), pl(i === p.tech.length - 1 ? "" : ",")]),
    [ind(3), pl("]}")],
  ];
  if (linkEntries.length) {
    lines.push([ind(3), attr("links"), pl("={{")]);
    linkEntries.forEach(([k, v], i) => lines.push([ind(4), key(k), pl(": "), str(v, v), pl(i === linkEntries.length - 1 ? "" : ",")]));
    lines.push([ind(3), pl("}}")]);
  } else {
    lines.push([ind(3), attr("links"), pl("={{}}"), pl("  "), cm(`// ${dict.projects.status.internal}`)]);
  }
  lines.push([ind(2), pl("/>")], [ind(1), pl(");")], [pl("}")]);
  return <CodeBlock lines={lines} />;
}

/* ---------- projects/earlier.json ---------- */
export function EarlierView({ locale, dict }: Ctx) {
  const lines: Line[] = [[cm(`// ${dict.projects.earlierSubtitle}`)], [pl("[")]];
  pastProjects.forEach((p, i) => {
    lines.push([ind(1), pl("{")]);
    lines.push([ind(2), key('"year"'), pl(": "), num(p.year), pl(",")]);
    lines.push(jsonStr("name", p.name));
    lines.push(jsonStr("platform", p.platform));
    lines.push(jsonStr("description", t(p.description, locale), true));
    lines.push([ind(1), pl(i === pastProjects.length - 1 ? "}" : "},")]);
  });
  lines.push([pl("]")]);
  return <CodeBlock lines={lines} />;
}

/* ---------- skills.yaml ---------- */
const order: SkillGroup[] = ["mobile", "ai", "backend", "database", "tools"];
export function SkillsView({ dict }: Ctx) {
  const lines: Line[] = [[cm(`# ${dict.skills.subtitle}`)], []];
  order.forEach((g) => {
    lines.push([key(g), pl(":"), pl("  "), cm(`# ${dict.skills.groups[g]}`)]);
    skills[g].forEach((s) => lines.push([ind(1), pl("- "), { v: s, c: "tk-str" }]));
    lines.push([]);
  });
  lines.push([key("build"), pl(": "), { v: dict.skills.buildDone, c: "tk-str" }]);
  return <CodeBlock lines={lines} />;
}

/* ---------- story.mp4 ---------- */
function initials(name: string) {
  const words = name.split(/\s+/).filter(Boolean);
  return (words.length > 1 ? words[0][0] + words[1][0] : name.slice(0, 1)).toUpperCase();
}
export function StoryView({ locale, dict }: Ctx) {
  const chapters: PlayerChapter[] = story.map((c) => ({
    scene: c.scene,
    mark: c.mark,
    label: t(c.label, locale),
    eyebrow: t(c.eyebrow, locale),
    title: t(c.title, locale),
    body: t(c.body, locale),
    chips: c.chips,
  }));
  const apps: PlayerApp[] = [
    ...projects.map((p) => ({ name: p.short ?? p.name, mark: initials(p.short ?? p.name) })),
    ...[...pastProjects].reverse().map((p) => ({ name: p.name, mark: initials(p.name) })),
  ];
  const mapRows = pastProjects
    .filter((p) => Number(p.year) >= 2019)
    .slice(0, 4)
    .map((p) => ({ name: p.name, platform: p.platform.split(" · ")[0] }));
  const s = dict.story.phone;
  const statLabels = [s.years, s.companies, s.apps, s.platforms];
  const stats = profile.stats.map((st, i) => ({ value: st.value, suffix: st.suffix, label: statLabels[i] ?? t(st.label, locale) }));
  return (
    <div className="story-skin">
      <p className="mb-6 max-w-xl text-[14px] text-fg-2">{dict.story.subtitle}</p>
      <StoryPlayer locale={locale} chapters={chapters} apps={apps} mapRows={mapRows} stats={stats} ui={dict.story} />
    </div>
  );
}

/* ---------- contact.ts ---------- */
export function ContactView({ locale, dict }: Ctx) {
  const lines: Line[] = [
    [cm(`// ${dict.contact.subtitle}`)],
    [kw("export const"), pl(" "), key("contact"), pl(" = {")],
    [ind(1), key("name"), pl(": "), str(profile.name), pl(",")],
    [ind(1), key("email"), pl(": "), str(profile.email, `mailto:${profile.email}`), pl(",")],
    [ind(1), key("linkedin"), pl(": "), str(profile.social.linkedin, profile.social.linkedin), pl(",")],
    [ind(1), key("github"), pl(": "), str(profile.social.github, profile.social.github), pl(",")],
    [ind(1), key("location"), pl(": "), str(t(profile.location, locale)), pl(",")],
    [ind(1), key("timezone"), pl(": "), str("Europe/Istanbul"), pl(",")],
    [ind(1), key("status"), pl(": "), str(dict.facts.statusValue), pl(",")],
    [ind(1), key("remote"), pl(": "), kw("true"), pl(",")],
    [pl("};")],
    [],
    [cm(`// ${dict.ide.sim.message} → ${dict.ide.simulator}`)],
  ];
  return (
    <div>
      <CodeBlock lines={lines} />
      <div className="flex flex-wrap gap-2 px-[52px] pb-10">
        <a href={`mailto:${profile.email}`} className="btn btn-ghost">
          <MailIcon width={15} height={15} /> {profile.email}
        </a>
        <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
          <LinkedInIcon width={15} height={15} /> LinkedIn
        </a>
        <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
          <GitHubIcon width={15} height={15} /> GitHub
        </a>
      </div>
    </div>
  );
}
