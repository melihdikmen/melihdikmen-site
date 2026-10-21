"use client";

import { skills, type SkillGroup } from "@/data/skills";
import { Screen } from "../Screen";
import type { ScreenProps } from "../App";

const order: SkillGroup[] = ["mobile", "ai", "backend", "database", "tools"];
const tone: Record<SkillGroup, string> = { mobile: "bg-accent", ai: "bg-sky", backend: "bg-green", database: "bg-pink", tools: "bg-ink-3" };

export function SkillsScreen({ dict, on }: ScreenProps) {
  return (
    <Screen title={dict.app.tabs.skills} on={on}>
      <p className="group-f pb-2 pt-0">{dict.skills.subtitle}</p>
      {order.map((g) => (
        <div key={g}>
          <p className="group-h">{dict.skills.groups[g]}</p>
          <div className="group">
            {skills[g].map((s, j) => {
              const primary = (g === "mobile" && j < 2) || (g === "ai" && j === 0);
              return (
                <div key={s} className="cell has-icon">
                  <span className={`app-icon h-[30px] w-[30px] ${tone[g]} text-[13px]`} aria-hidden>
                    {s[0]}
                  </span>
                  <span>{s}</span>
                  {primary && (
                    <span className="val text-accent" title={dict.app.primary}>
                      ✓
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <p className="group-f pb-8">{dict.app.skillsFooter}</p>
    </Screen>
  );
}
