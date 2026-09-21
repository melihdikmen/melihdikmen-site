import type { Dictionary } from "@/i18n/tr";
import { skills, type SkillGroup } from "@/data/skills";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { SpotlightCard } from "./SpotlightCard";

const order: SkillGroup[] = ["mobile", "backend", "database", "tools"];

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const row = [...items, ...items];
  return (
    <ul className={`${reverse ? "marquee-track-rev" : "marquee-track"} flex w-max gap-4 whitespace-nowrap`}>
      {row.map((item, i) => (
        <li
          key={`${item}-${i}`}
          className="rounded-full border border-line bg-surface px-5 py-2.5 font-display text-lg font-bold tracking-tight"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Skills({ dict }: { dict: Dictionary }) {
  return (
    <Section id="skills" title={dict.skills.title}>
      <div className="marquee space-y-4 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]" aria-hidden>
        <Row items={[...skills.mobile, ...skills.tools]} />
        <Row items={[...skills.backend, ...skills.database, ...skills.mobile.slice(0, 4)]} reverse />
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {order.map((group, i) => (
          <Reveal key={group} delay={i * 60} className="h-full">
            <SpotlightCard className="gradient-border h-full rounded-2xl bg-surface p-6">
              <h3 className="font-display text-lg font-bold tracking-tight">
                {dict.skills.groups[group]}
                <span className="text-gradient">.</span>
              </h3>
              <ul className="mt-4 space-y-2 text-[15px]">
                {skills[group].map((s, j) => (
                  <li key={s} className={`flex items-center gap-2.5 ${j < 2 && group === "mobile" ? "font-semibold" : ""}`}>
                    <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-[linear-gradient(135deg,var(--g1),var(--g2))]" />
                    {s}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
