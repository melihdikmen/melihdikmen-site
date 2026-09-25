import type { ReactNode } from "react";
import { container } from "@/lib/ui";
import { Reveal } from "./Reveal";

type Props = {
  id: string;
  number: string;
  kicker: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

/** Numaralı bölüm: solda yapışkan başlık sütunu, sağda içerik. */
export function Section({ id, number, kicker, title, subtitle, children }: Props) {
  return (
    <section id={id} className="rule-t scroll-mt-16">
      <div className={`${container} grid gap-8 py-16 md:grid-cols-[minmax(0,220px)_1fr] md:gap-12 md:py-24 lg:grid-cols-[minmax(0,300px)_1fr]`}>
        <Reveal className="md:sticky md:top-20 md:self-start">
          <p className="smallcaps">
            {kicker} {number}
          </p>
          <h2 className="font-display mt-3 text-[clamp(2.4rem,5vw,4.25rem)] font-normal leading-[0.95] tracking-[-0.02em] text-balance">
            {title}
          </h2>
          {subtitle && <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-ink-2">{subtitle}</p>}
        </Reveal>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
