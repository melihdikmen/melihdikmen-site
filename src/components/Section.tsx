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
            className="font-display outline-text text-[clamp(4rem,11vw,8.5rem)] font-extrabold leading-[0.85]"
          >
            {number}
          </span>
          <div className="min-w-0 flex-1 pb-1">
            <p className="label text-acid">
              {"// "}{kicker} {number}
            </p>
            <h2 className="font-display glitch neon mt-2 text-[clamp(1.7rem,4.5vw,3.6rem)] font-extrabold uppercase leading-[1] text-ink" data-text={title}>
              {title}
            </h2>
            {subtitle && <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink-2">{subtitle}</p>}
          </div>
        </Reveal>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
