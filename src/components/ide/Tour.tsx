"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import type { Dictionary } from "@/i18n/tr";

type Props = { step: number | null; onStep: (s: number | null) => void; dict: Dictionary["ide"]["tour"] };

const DESKTOP = ["nav", "editor", "sim"] as const;
const MOBILE = ["chips", "editor", "sim-mobile"] as const;

type Rect = { top: number; left: number; width: number; height: number };

/**
 * Üç adımlık ipucu turu. Yalnızca istemcide çizilir; hedef panel mavi halkayla
 * öne çıkar, kalan alan karartılır. Esc kapatır.
 */
export function Tour({ step, onStep, dict }: Props) {
  const [rect, setRect] = useState<Rect | null>(null);
  const [mobile, setMobile] = useState(false);

  const total = 3;
  const targets = mobile ? MOBILE : DESKTOP;

  // Hedefin konumunu ölç; yeniden boyutlanınca ve kaydırınca güncelle.
  useLayoutEffect(() => {
    if (step === null) return;
    const measure = () => {
      const m = window.innerWidth < 1024;
      setMobile(m);
      const cls = (m ? MOBILE : DESKTOP)[step];
      let el = document.querySelector<HTMLElement>(`.${cls}`);
      if (m && cls === "sim-mobile") el = el?.querySelector<HTMLElement>("summary") ?? el;
      if (m && cls === "editor") el = el?.querySelector<HTMLElement>(".pane:not([hidden])") ?? el;
      if (!el || el.offsetParent === null) el = document.querySelector<HTMLElement>(".editor");
      if (!el) return setRect(null);
      const r = el.getBoundingClientRect();
      // Editör uzun olabilir: görünür ilk ~320px yeter.
      const h = cls === "editor" ? Math.min(r.height, 320) : r.height;
      setRect({ top: r.top, left: r.left, width: r.width, height: h });
    };
    const target = document.querySelector<HTMLElement>(`.${targets[step]}`);
    if (mobile && target) target.scrollIntoView({ block: step === 2 ? "center" : "start", behavior: "auto" });
    const raf = requestAnimationFrame(measure);
    const late = window.setTimeout(measure, 300); // yazı tipleri yüklenince ölçüler oturur
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(late);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  useEffect(() => {
    if (step === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onStep(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, onStep]);

  if (step === null || !rect) return null;

  const t = mobile ? (["m1", "m2", "m3"] as const)[step] : (["s1", "s2", "s3"] as const)[step];
  const title = dict[`${t}t`];
  const body = dict[`${t}b`];
  const last = step === total - 1;

  // Balon konumu: hedefin sağına, sığmazsa soluna, o da olmazsa altına.
  const W = 300;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  let style: React.CSSProperties;
  if (!mobile && rect.left + rect.width + W + 24 < vw) {
    style = { top: Math.min(rect.top + 72, vh - 220), left: rect.left + rect.width + 16 };
  } else if (!mobile && rect.left - W - 24 > 0) {
    style = { top: Math.min(rect.top + 72, vh - 220), left: rect.left - W - 16 };
  } else if (!mobile) {
    style = { top: Math.min(rect.top + 120, vh - 220), left: rect.left + Math.max(12, rect.width / 2 - W / 2) };
  } else {
    const below = rect.top + rect.height + 12;
    style = below + 190 < vh ? { top: below, left: 12, right: 12 } : { top: Math.max(12, rect.top - 200), left: 12, right: 12 };
  }

  return (
    <div className="tour" role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" className="tour-veil" aria-label={dict.skip} onClick={() => onStep(null)} />
      <div className="tour-ring" style={{ top: rect.top - 4, left: rect.left - 4, width: rect.width + 8, height: rect.height + 8 }} aria-hidden />
      <div className="tour-box" style={{ ...style, width: mobile ? undefined : W }}>
        <p className="tour-step">{dict.step.replace("{a}", String(step + 1)).replace("{b}", String(total))}</p>
        <h3>{title}</h3>
        <p>{body}</p>
        <div className="tour-actions">
          <button type="button" className="btn btn-ghost" onClick={() => onStep(null)}>
            {dict.skip}
          </button>
          <button type="button" className="btn" onClick={() => onStep(last ? null : step + 1)}>
            {last ? dict.start : dict.next}
          </button>
        </div>
      </div>
    </div>
  );
}
