import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = { id: string; title: string; subtitle?: string; children: ReactNode; className?: string };

export function Section({ id, title, subtitle, children, className = "" }: Props) {
  return (
    <section id={id} className={`scroll-mt-24 py-16 md:py-24 ${className}`}>
      <div className="mx-auto w-full max-w-5xl px-5">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-muted">
            <span>{title}</span>
            <span aria-hidden className="h-px flex-1 bg-line" />
          </p>
          {subtitle && <p className="mt-4 max-w-2xl text-lg text-muted">{subtitle}</p>}
        </Reveal>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
