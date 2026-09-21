import type { Dictionary } from "@/i18n/tr";
import { skills, type SkillGroup } from "@/data/skills";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

const order: SkillGroup[] = ["mobile", "backend", "database", "tools"];

export function Skills({ dict }: { dict: Dictionary }) {
  return (
    <Section id="skills" title={dict.skills.title}>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {order.map((group, i) => (
          <Reveal key={group} delay={i * 60}>
            <h3 className="font-mono text-xs uppercase tracking-[0.1em] text-muted">{dict.skills.groups[group]}</h3>
            <ul className="mt-3 space-y-1.5 text-[15px]">
              {skills[group].map((s, j) => (
                <li key={s} className={j < 2 && group === "mobile" ? "font-semibold" : ""}>
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
