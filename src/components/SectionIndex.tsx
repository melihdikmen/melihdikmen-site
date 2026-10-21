"use client";

import { useEffect, useState } from "react";
import type { SectionInfo } from "@/lib/sections";

/** Sol alt köşede o an okunan bölümü gösterir; masaüstünde görünür. */
export function SectionIndex({ sections, kicker }: { sections: SectionInfo[]; kicker: string }) {
  void kicker;
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const els = sections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    const onScroll = () => {
      if (window.scrollY < 200) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [sections]);

  const current = sections.find((s) => s.id === active);
  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed bottom-5 left-5 z-30 hidden items-center gap-3 rounded-full bg-paper/80 px-4 py-2 text-[12px] font-medium text-ink-2 shadow-hard-sm backdrop-blur-xl transition-opacity duration-300 lg:flex ${current ? "opacity-100" : "opacity-0"}`}
    >
      <span className="flex gap-1">
        {sections.map((s) => (
          <span key={s.id} className={`h-1.5 w-1.5 rounded-full transition-colors ${s.id === active ? "bg-accent" : "bg-rule"}`} />
        ))}
      </span>
      <span>
        <span className="text-ink">{current?.label}</span>
      </span>
    </div>
  );
}
