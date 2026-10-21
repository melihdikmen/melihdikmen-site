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
  tools: "block-acid",
};

export function Skills({ dict, number }: { dict: Dictionary; number: string }) {
  return (
    <Section id="skills" number={number} kicker={dict.section} title={dict.skills.title} subtitle={dict.skills.subtitle} tone="ink">
      {/* Build log: mobil yığın bir derleme çıktısı gibi */}
      <Reveal className="terminal mb-14 max-w-3xl">
        <div className="terminal-bar">
          <i aria-hidden />
          <i aria-hidden />
          <i aria-hidden />
          <span className="ml-2 text-[12px] font-bold text-ink-3">~/melih — {dict.skills.buildTitle}</span>
        </div>
        <div className="space-y-1.5 p-4 text-[12.5px] leading-relaxed md:p-6 md:text-[13.5px]">
          <p>
            <span className="text-acid">$</span> npx react-native run-ios && ./gradlew assembleRelease
          </p>
          {skills.mobile.slice(0, 7).map((s, i) => (
            <p key={s} className="flex gap-3">
              <span className="text-ink-3">[{String(i + 1).padStart(2, "0")}/07]</span>
              <span className="flex-1 truncate">{s}</span>
              <span className="text-acid">✓</span>
            </p>
          ))}
          <p className="pt-2 font-bold text-acid">
            {dict.skills.buildDone}
            <span className="blink ml-1 inline-block h-[1em] w-[0.55em] translate-y-[2px] bg-acid" aria-hidden />
          </p>
        </div>
      </Reveal>

      <div className="grid gap-10">
        {order.map((group, gi) => (
          <Reveal key={group} delay={gi * 60} className="grid gap-5 md:grid-cols-[200px_1fr]">
            <h3 className={`${groupTone[group]} sticker self-start justify-self-start text-[12px]`}>
              {String(gi + 1).padStart(2, "0")} · {dict.skills.groups[group]}
            </h3>
            <ul className="flex flex-wrap gap-3">
              {skills[group].map((s, j) => {
                const primary = (group === "mobile" && j < 2) || (group === "ai" && j === 0);
                return (
                  <li
                    key={s}
                    className={`sticker ${primary ? groupTone[group] : ""} text-[12px] md:text-[13px]`}
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
