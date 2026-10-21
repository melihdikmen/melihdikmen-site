import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { profile } from "@/data/profile";
import { skills, type SkillGroup } from "@/data/skills";
import { pastProjects } from "@/data/projects";
import { t } from "@/lib/i18n";
import { container } from "@/lib/ui";
import { SectionHead } from "./SectionHead";

const order: SkillGroup[] = ["mobile", "ai", "backend", "database", "tools"];
const palette = ["#0a84ff", "#ff9f0a", "#5e5ce6", "#ff375f", "#30d158", "#64d2ff", "#bf5af2"];

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-4 py-3 text-[14px] md:grid-cols-[180px_1fr]">
      <dt className="text-ink-3">{label}</dt>
      <dd className="min-w-0">{children}</dd>
    </div>
  );
}

/** "Bilgiler" tablosu + yetenek grupları + "Bu geliştiricinin diğer uygulamaları". */
export function Information({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const s = dict.store;
  const edu = profile.education[0];
  return (
    <section id="skills" className={`${container} scroll-mt-14 pt-10 md:pt-14`}>
      <div className="border-t border-rule pt-8">
        <SectionHead title={s.info} />
        <dl className="rows">
          <Row label={s.provider}>{profile.name}</Row>
          <Row label={s.location}>{t(profile.location, locale)}</Row>
          <Row label={s.languages}>{s.languagesValue}</Row>
          <Row label={s.compat}>{s.compatValue}</Row>
          <Row label={s.education}>
            {t(edu.school, locale)} · {t(edu.degree, locale)}
            <span className="block text-ink-3">{edu.period}</span>
          </Row>
          <Row label={s.stack}>
            <div className="space-y-3">
              {order.map((g) => (
                <div key={g}>
                  <p className="mb-1.5 text-[12px] font-semibold text-ink-3">{dict.skills.groups[g]}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skills[g].map((x) => (
                      <span key={x} className="rounded-full bg-paper-2 px-2.5 py-1 text-[12.5px] font-medium">
                        {x}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Row>
          <Row label={s.links}>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                GitHub
              </a>
              <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                LinkedIn
              </a>
              <a href={`mailto:${profile.email}`} className="text-accent hover:underline">
                {profile.email}
              </a>
            </div>
          </Row>
        </dl>

        <div className="mt-12">
          <SectionHead title={s.moreBy} />
        </div>
        <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {pastProjects.map((p, i) => (
            <li key={`${p.year}-${p.name}`} className="flex items-center gap-3 py-1.5">
              <span className="app-icon h-12 w-12 shrink-0 text-[20px]" style={{ background: palette[i % palette.length] }}>
                {p.name[0]}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[14px] font-medium">{p.name}</span>
                <span className="block truncate text-[12px] text-ink-3">{p.platform}</span>
              </span>
              <span className="get get-ghost ml-auto h-7 min-w-0 px-3 text-[12px]">{p.year}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
