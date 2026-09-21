import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = { id: string; title: string; subtitle?: string; children: ReactNode; className?: string };

export function Section({ id, title, subtitle, children, className = "" }: Props) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 md:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-5">
        <Reveal>
          <div className="flex items-end gap-6">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-none tracking-[-0.03em] text-balance">
              {title}
              <span className="text-gradient">.</span>
            </h2>
            <span aria-hidden className="mb-2 h-px flex-1 bg-[linear-gradient(90deg,var(--line),transparent)]" />
          </div>
          {subtitle && <p className="mt-5 max-w-2xl text-lg text-muted">{subtitle}</p>}
        </Reveal>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
