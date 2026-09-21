"use client";

import type { PointerEvent, ReactNode } from "react";

/** Fare konumunu --mx/--my olarak yazar; ışık efekti CSS'te (.spotlight). */
export function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  function onMove(e: PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }
  return (
    <div onPointerMove={onMove} className={`spotlight ${className}`}>
      {children}
    </div>
  );
}
