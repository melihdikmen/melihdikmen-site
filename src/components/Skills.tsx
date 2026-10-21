import type { Dictionary } from "@/i18n/tr";
import { skills, type SkillGroup } from "@/data/skills";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

const order: SkillGroup[] = ["mobile", "ai", "backend", "database", "tools"];

export function Skills({ dict, number }: { dict: Dictionary; number: string }) {
  return (
    <Section id="skills" number={number} kicker={dict.section} title={dict.skills.title} subtitle={dict.skills.subtitle}>
      {/* Build log: mobil yığın bir derleme çıktısı gibi */}
      <Reveal className="terminal mb-16 max-w-3xl">
        <div className="terminal-bar">
          <i aria-hidden />
          <i aria-hidden />
          <i aria-hidden />
          <span className="ml-2 text-[12px] text-[#86868b]">~/melih — {dict.skills.buildTitle}</span>
        </div>
        <div className="space-y-1.5 p-4 text-[12.5px] leading-relaxed md:p-6 md:text-[13.5px]">
          <p>
            <span className="text-[#30d158]">$</span> npx react-native run-ios && ./gradlew assembleRelease
          </p>
          {skills.mobile.slice(0, 7).map((s, i) => (
            <p key={s} className="flex gap-3">
              <span className="text-[#86868b]">[{String(i + 1).padStart(2, "0")}/07]</span>
              <span className="flex-1 truncate">{s}</span>
              <span className="text-[#30d158]">✓</span>
            </p>
          ))}
          <p className="pt-2 font-bold text-[#30d158]">
            {dict.skills.buildDone}
            <span className="blink ml-1 inline-block h-[1em] w-[0.55em] translate-y-[2px] bg-[#30d158]" aria-hidden />
          </p>
        </div>
      </Reveal>

      <div className="grid gap-8">
        {order.map((group, gi) => (
          <Reveal key={group} delay={gi * 60} className="grid gap-4 border-t border-rule pt-6 md:grid-cols-[200px_1fr]">
            <h3 className="text-[15px] font-semibold">{dict.skills.groups[group]}</h3>
            <ul className="flex flex-wrap gap-2">
              {skills[group].map((s, j) => {
                const primary = (group === "mobile" && j < 2) || (group === "ai" && j === 0);
                return (
                  <li
                    key={s}
                    className={`sticker ${primary ? "block-acid" : ""} text-[14px]`}
                  >
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
