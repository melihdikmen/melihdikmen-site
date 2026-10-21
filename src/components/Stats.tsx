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
        const dur = 1200;
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
      {suffix && <span className="text-hot">{suffix}</span>}
    </span>
  );
}

const tones = ["block-acid", "block-pink", "block-sky", "block-hot"];

/** Dört sert gölgeli karo; her biri farklı renk bloğu. */
export function Stats({ items }: { items: Stat[] }) {
  return (
    <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s, i) => (
        <div key={s.label} className={`box lift flex flex-col p-5 shadow-hard ${tones[i % tones.length]}`}>
          <dd className="font-display neon order-1 text-[clamp(2.6rem,5vw,4.2rem)] font-extrabold leading-none">
            <CountUp value={s.value} suffix={s.suffix} />
          </dd>
          <dt className="order-2 mt-3 border-t border-current/30 pt-3 font-mono text-[11px] font-bold uppercase leading-snug tracking-[0.12em] text-ink-2">{s.label}</dt>
        </div>
      ))}
    </dl>
  );
}
