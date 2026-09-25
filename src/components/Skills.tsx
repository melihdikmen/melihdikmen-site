import type { Dictionary } from "@/i18n/tr";
import { skills, type SkillGroup } from "@/data/skills";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

const order: SkillGroup[] = ["mobile", "backend", "database", "tools"];

export function Skills({ dict, number }: { dict: Dictionary; number: string }) {
  return (
    <Section id="skills" number={number} kicker={dict.section} title={dict.skills.title} subtitle={dict.skills.subtitle}>
      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {order.map((group, i) => (
          <Reveal key={group} delay={i * 60}>
            <h3 className="smallcaps rule-b border-ink pb-3">{dict.skills.groups[group]}</h3>
            <ol className="mt-1">
              {skills[group].map((s, j) => {
                const primary = group === "mobile" && j < 2;
                return (
                  <li key={s} className="flex items-baseline gap-3 rule-b py-2.5">
                    <span className="w-5 shrink-0 font-mono text-[10px] text-ink-3">{String(j + 1).padStart(2, "0")}</span>
                    <span className={`font-display display-text text-[18px] leading-snug ${primary ? "italic text-accent" : ""}`}>{s}</span>
                  </li>
                );
              })}
            </ol>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
