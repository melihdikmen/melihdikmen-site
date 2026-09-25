"use client";

import { useEffect, useRef, useState } from "react";

type Stat = { value: number; suffix: string; label: string };

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(value);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1400;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          setN(Math.round(value * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        setN(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);
  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix && <span className="text-accent">{suffix}</span>}
    </span>
  );
}

export function Stats({ items }: { items: Stat[] }) {
  return (
    <dl className="grid grid-cols-2 rule-t md:grid-cols-4">
      {items.map((s, i) => (
        <div
          key={s.label}
          className={`flex flex-col rule-b py-6 md:py-8 ${i % 2 === 1 ? "border-l border-rule pl-5 md:pl-6" : ""} ${i >= 2 ? "md:border-l md:border-rule md:pl-6" : ""}`}
        >
          <dd className="font-display order-1 text-[clamp(2.75rem,6vw,5rem)] font-light leading-none tracking-[-0.03em]">
            <CountUp value={s.value} suffix={s.suffix} />
          </dd>
          <dt className="order-2 mt-3 max-w-[16ch] text-[13.5px] leading-snug text-ink-2">{s.label}</dt>
        </div>
      ))}
    </dl>
  );
}
