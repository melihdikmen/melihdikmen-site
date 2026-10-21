import type { ReactNode } from "react";
import { container } from "@/lib/ui";
import { Reveal } from "./Reveal";

export type SectionTone = "paper" | "acid" | "ink" | "hot" | "sky" | "pink";

type Props = {
  id: string;
  number: string;
  kicker: string;
  title: string;
  subtitle?: string;
  tone?: SectionTone;
  children: ReactNode;
};

const toneClass: Record<SectionTone, string> = {
  paper: "",
  acid: "block-acid",
  hot: "block-hot",
  sky: "block-sky",
  pink: "block-pink",
  ink: "inverted",
};

/**
 * Poster bölümü: üstte kalın cetvel, dev kontur numara ve siyah kutuda başlık.
 * `tone` ile bölümün zemini renk bloğuna ya da siyaha döner.
 */
export function Section({ id, number, kicker, title, subtitle, tone = "paper", children }: Props) {
  return (
    <section id={id} className={`scroll-mt-16 ${toneClass[tone]}`}>
      <div className={`${container} py-20 md:py-28`}>
        <Reveal className="mb-12 max-w-3xl md:mb-16">
          <p className="label">
            {kicker} {number}
          </p>
          <h2 className="font-display mt-3 text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.035em]">{title}</h2>
          {subtitle && <p className="mt-4 max-w-xl text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.5] text-ink-2">{subtitle}</p>}
        </Reveal>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
