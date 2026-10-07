import type { Dictionary } from "@/i18n/tr";
import { skills, type SkillGroup } from "@/data/skills";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

const order: SkillGroup[] = ["mobile", "ai", "backend", "database", "tools"];
const groupTone: Record<SkillGroup, string> = {
  mobile: "block-acid",
  ai: "block-hot",
  backend: "block-sky",
  database: "block-pink",
  tools: "",
};
/** Deterministik hafif açı: her sticker farklı yöne eğik durur. */
const angles = [-3, 2, -1.5, 3.5, -2.5, 1, -4, 2.5, -1, 3, -2, 1.5];

export function Skills({ dict, number }: { dict: Dictionary; number: string }) {
  return (
    <Section id="skills" number={number} kicker={dict.section} title={dict.skills.title} subtitle={dict.skills.subtitle} tone="ink">
      <div className="grid gap-10">
        {order.map((group, gi) => (
          <Reveal key={group} delay={gi * 60} className="grid gap-5 md:grid-cols-[200px_1fr]">
            <h3 className={`${groupTone[group]} sticker sticker-sq self-start justify-self-start text-[13px]`} style={{ "--r": `${angles[gi]}deg` } as React.CSSProperties}>
              {String(gi + 1).padStart(2, "0")} · {dict.skills.groups[group]}
            </h3>
            <ul className="flex flex-wrap gap-3">
              {skills[group].map((s, j) => {
                const primary = (group === "mobile" && j < 2) || (group === "ai" && j === 0);
                return (
                  <li
                    key={s}
                    className={`sticker ${primary ? groupTone[group] : ""} text-[13px] md:text-[14px]`}
                    style={{ "--r": `${angles[(j + gi * 3) % angles.length]}deg` } as React.CSSProperties}
                  >
                    {primary && <span aria-hidden>★</span>}
                    {s}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
