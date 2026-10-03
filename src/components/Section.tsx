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
    <section id={id} className={`rule-t rule-thick scroll-mt-16 ${toneClass[tone]}`}>
      <div className={`${container} py-14 md:py-20`}>
        <Reveal className="mb-10 flex flex-wrap items-end gap-x-6 gap-y-4 md:mb-14">
          <span
            aria-hidden
            className="font-display outline-text text-[clamp(5rem,14vw,11rem)] font-extrabold leading-[0.8] tracking-[-0.04em]"
          >
            {number}
          </span>
          <div className="min-w-0 flex-1 pb-1">
            <p className="label">
              {kicker} {number}
            </p>
            <h2 className="font-display mt-2 inline-block bg-ink px-3 py-1 text-[clamp(2rem,5.5vw,4.5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-paper md:px-4">
              {title}
            </h2>
            {subtitle && <p className="mt-4 max-w-xl text-[16px] leading-relaxed">{subtitle}</p>}
          </div>
        </Reveal>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
