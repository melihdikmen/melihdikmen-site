"use client";

import { useCallback, useRef, type ReactNode } from "react";

type Props = {

  title: string;
  on: boolean;
  under?: boolean;
  detail?: boolean;
  left?: ReactNode;
  right?: ReactNode;
  /** false: büyük başlık basılmaz (detay ekranı kendi başlığını çizer). */
  largeTitle?: boolean;
  children: ReactNode;
};

/** Bir sekme ekranı: yapışkan küçük çubuk + büyük başlık; kaydırınca küçük başlık belirir. */
export function Screen({ title, on, under, detail, left, right, largeTitle = true, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const onScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const scrolled = el.scrollTop > 36;
    if (scrolled) el.setAttribute("data-scrolled", "");
    else el.removeAttribute("data-scrolled");
  }, []);
  return (
    <section
      ref={ref}
      className={`screen ${detail ? "screen-detail" : ""} ${on ? "is-on" : ""} ${under ? "is-under" : ""}`}
      aria-hidden={!on}
      onScroll={onScroll}
    >
      <header className="navbar">
        {left && <div className="nav-left">{left}</div>}
        <span className="nav-title">{title}</span>
        {right && <div className="nav-right">{right}</div>}
      </header>
      {largeTitle && <h1 className="largetitle">{title}</h1>}
      {children}
    </section>
  );
}
