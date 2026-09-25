"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import type { StoryScene } from "@/data/story";
import "./story.css";

export type PlayerChapter = {
  scene: StoryScene;
  mark: string;
  label: string;
  eyebrow: string;
  title: string;
  body: string;
  chips: string[];
};
export type PlayerApp = { name: string; mark: string };

type Props = {
  locale: Locale;
  chapters: PlayerChapter[];
  apps: PlayerApp[];
  mapRows: { name: string; platform: string }[];
  stats: { value: number; suffix: string; label: string }[];
  ui: Dictionary["story"];
};

const DURATION = 6500;
/** Kağıt zeminli sahneler; diğerleri mürekkep zeminli (ters) çizilir. */
const LIGHT_SCENES: StoryScene[] = ["splash", "map", "wallet", "home"];

export function StoryPlayer({ locale, chapters, apps, mapRows, stats, ui }: Props) {
  const [cur, setCur] = useState(0);
  const [run, setRun] = useState(0);
  const [playing, setPlaying] = useState(true);
  const clockRef = useRef<HTMLSpanElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLElement | null)[]>([]);
  const elapsed = useRef(0);
  const inView = useRef(false);
  const reduce = useRef(false);

  const go = useCallback(
    (i: number) => {
      const n = chapters.length;
      setCur(((i % n) + n) % n);
      setRun((r) => r + 1);
      elapsed.current = 0;
    },
    [chapters.length],
  );

  // İlk yükleme: hareket azaltma tercihi ve telefon saati.
  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const d = new Date();
    if (clockRef.current) clockRef.current.textContent = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
    if (!reduce.current) return;
    const id = requestAnimationFrame(() => setPlaying(false));
    return () => cancelAnimationFrame(id);
  }, []);

  // Bölüm ekranda değilken zaman ilerlemez.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !("IntersectionObserver" in window)) {
      inView.current = true;
      return;
    }
    const io = new IntersectionObserver(([e]) => (inView.current = e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Hikâye çubuğu ve otomatik geçiş.
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (playing && inView.current && !document.hidden) {
        elapsed.current += dt;
        if (elapsed.current >= DURATION) {
          go(cur + 1);
          return;
        }
      }
      const bar = barsRef.current[cur];
      if (bar) bar.style.width = `${Math.min(100, (elapsed.current / DURATION) * 100)}%`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [cur, playing, go]);

  // Sahneye özel JS efektleri: rota, arama süresi, sayaçlar.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const scene = root.querySelector<HTMLElement>(`[data-scene-index="${cur}"]`);
    if (!scene) return;
    let alive = true;
    const cleanups: (() => void)[] = [];
    const still = reduce.current;

    const countTo = (el: HTMLElement, to: number, ms: number, fmt: (v: number) => string) => {
      if (still) {
        el.textContent = fmt(to);
        return;
      }
      const start = performance.now();
      const step = (n: number) => {
        if (!alive) return;
        const p = Math.min(1, (n - start) / ms);
        el.textContent = fmt(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const kind = chapters[cur].scene;
    if (kind === "map") {
      const path = scene.querySelector<SVGPathElement>(".st-route");
      const dot = scene.querySelector<SVGCircleElement>(".st-truck");
      if (path && dot) {
        const L = path.getTotalLength();
        path.style.strokeDasharray = `${L}`;
        const place = (q: number) => {
          const pt = path.getPointAtLength(L * q);
          dot.setAttribute("cx", `${pt.x}`);
          dot.setAttribute("cy", `${pt.y}`);
          path.style.strokeDashoffset = `${L * (1 - q)}`;
        };
        if (still) place(1);
        else {
          place(0);
          const start = performance.now() + 500;
          const mv = (n: number) => {
            if (!alive) return;
            const p = Math.max(0, Math.min(1, (n - start) / 4200));
            place(p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
            if (p < 1) requestAnimationFrame(mv);
          };
          requestAnimationFrame(mv);
        }
      }
    }
    if (kind === "call") {
      const el = scene.querySelector<HTMLElement>(".st-timer");
      if (el) {
        let sec = 0;
        el.textContent = "00:00";
        const id = setInterval(() => {
          sec++;
          el.textContent = `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;
        }, 1000);
        cleanups.push(() => clearInterval(id));
      }
    }
    if (kind === "wallet") {
      const el = scene.querySelector<HTMLElement>(".st-bal");
      const nf = new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      if (el) countTo(el, 12480.5, 1800, (v) => `₺${nf.format(v)}`);
    }
    if (kind === "home") {
      scene.querySelectorAll<HTMLElement>("[data-to]").forEach((b) => {
        const to = Number(b.dataset.to);
        const suf = b.dataset.suf ?? "";
        countTo(b, to, 1200, (v) => `${Math.round(v)}${suf}`);
      });
    }
    return () => {
      alive = false;
      cleanups.forEach((f) => f());
    };
  }, [cur, run, chapters, locale]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(cur + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(cur - 1);
    }
  };

  const onPhoneTap = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest(".st-stories")) return;
    const r = e.currentTarget.getBoundingClientRect();
    go(e.clientX - r.left < r.width / 3 ? cur - 1 : cur + 1);
  };

  const c = chapters[cur];
  const light = LIGHT_SCENES.includes(c.scene);
  const p = ui.phone;

  return (
    <div ref={rootRef} className="st" onKeyDown={onKey}>
      <div className="st-stage">
        <div className="st-mark" aria-hidden key={`mark-${c.mark}`}>
          {c.mark}
        </div>

        <div className="st-phone-col">
          <div className="st-phone" onPointerDown={onPhoneTap}>
            <div className="st-screen">
              <div className="st-island" />
              <div className={`st-status ${light ? "is-dark" : ""}`}>
                <span ref={clockRef}>09:41</span>
                <span>5G ▮▮▮</span>
              </div>
              <div className={`st-stories ${light ? "is-dark" : ""}`}>
                {chapters.map((ch, i) => (
                  <button
                    key={ch.label}
                    type="button"
                    aria-label={`${ui.chapter} ${i + 1}: ${ch.label}`}
                    aria-current={i === cur ? "step" : undefined}
                    onClick={() => go(i)}
                  >
                    <i
                      ref={(el) => {
                        barsRef.current[i] = el;
                      }}
                      style={{ width: i < cur ? "100%" : "0%" }}
                    />
                  </button>
                ))}
              </div>

              {chapters.map((ch, i) => (
                <div
                  key={`${ch.scene}-${i}-${i === cur ? run : "idle"}`}
                  data-scene-index={i}
                  className={`st-scene st-${ch.scene} ${i === cur ? "is-on" : ""}`}
                  aria-hidden={i !== cur}
                >
                  <Scene kind={ch.scene} p={p} apps={apps} mapRows={mapRows} stats={stats} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="st-panel">
          <div className="st-txt" key={`txt-${cur}`} aria-live="polite">
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">{c.eyebrow}</p>
            <h3 className="font-display text-[clamp(2rem,3.6vw,3.25rem)] font-normal leading-[1] tracking-[-0.02em] text-balance">{c.title}</h3>
            <p className="max-w-[46ch] text-[16px] leading-relaxed text-ink-2">{c.body}</p>
            <p className="flex flex-wrap gap-2">
              {c.chips.map((x) => (
                <span key={x} className="st-chip">
                  {x}
                </span>
              ))}
            </p>
          </div>
          <div className="st-controls">
            <button type="button" onClick={() => go(cur - 1)} aria-label={ui.prev}>
              <svg viewBox="0 0 24 24" aria-hidden>
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button type="button" onClick={() => setPlaying((v) => !v)} aria-label={playing ? ui.pause : ui.play}>
              <svg viewBox="0 0 24 24" aria-hidden>
                {playing ? <path d="M8 5v14M16 5v14" /> : <path d="M7 4l13 8-13 8z" />}
              </svg>
              <span>{playing ? ui.pause : ui.play}</span>
            </button>
            <button type="button" onClick={() => go(cur + 1)} aria-label={ui.next}>
              <svg viewBox="0 0 24 24" aria-hidden>
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
            <span className="font-mono text-[12px] tabular-nums text-ink-3">
              {String(cur + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      <ol className="st-timeline">
        {chapters.map((ch, i) => (
          <li key={ch.label}>
            <button type="button" className={i === cur ? "is-cur" : ""} onClick={() => go(i)}>
              <b>{ch.mark}</b>
              {ch.label}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

type SceneProps = {
  kind: StoryScene;
  p: Dictionary["story"]["phone"];
  apps: PlayerApp[];
  mapRows: { name: string; platform: string }[];
  stats: { value: number; suffix: string; label: string }[];
};

const dotColors = ["var(--accent)", "var(--ink)", "var(--ink-3)", "var(--accent)"];

function Scene({ kind, p, apps, mapRows, stats }: SceneProps) {
  switch (kind) {
    case "splash":
      return (
        <>
          <div className="st-logo">MD</div>
          <p className="st-name">Melih Dikmen</p>
          <p className="st-role">{p.role}</p>
          <div className="st-load">
            <b />
          </div>
          <p className="st-foot">ANKARA · 1996</p>
        </>
      );
    case "code": {
      const lines = [
        <span key="1" className="c">{"// Konya · 2015"}</span>,
        <>
          <span className="k">const</span> melih = <span className="k">new</span> <span className="f">Developer</span>{"({"}
        </>,
        <>
          {"  "}okul: <span className="s">&quot;Selçuk Üni.&quot;</span>,
        </>,
        <>
          {"  "}bölüm: <span className="s">&quot;Bilgisayar Müh.&quot;</span>,
        </>,
        <>
          {"  "}mezuniyet: <span className="p">2020</span>,
        </>,
        <>{"});"}</>,
        <>
          melih.<span className="f">ilkUygulama</span>(<span className="s">&quot;Splitpay&quot;</span>);
        </>,
        <span key="c" className="st-cursor" />,
      ];
      return (
        <>
          <div className="st-tabs">
            <span className="is-act">melih.ts</span>
            <span>konya.ts</span>
          </div>
          <div className="st-codebox">
            {lines.map((l, i) => (
              <span key={i} className="st-ln" style={{ "--d": `${0.2 + i * 0.55}s` } as CSSProperties}>
                <span className="n">{i + 1}</span>
                {l}
              </span>
            ))}
          </div>
          <div className="st-term">
            $ npx react-native run-android
            <br />
            <b>✓ BUILD SUCCESSFUL</b> · Splitpay, 2018
          </div>
        </>
      );
    }
    case "map":
      return (
        <>
          <svg className="st-map" viewBox="0 0 300 620" preserveAspectRatio="xMidYMid slice" aria-hidden>
            <rect width="300" height="620" className="m-ground" />
            <path d="M-10 170 L310 140 M-10 330 L310 360 M-10 470 L310 440 M60 -10 L90 630 M190 -10 L170 630 M260 -10 L280 630" className="m-street" strokeWidth="14" fill="none" />
            <path d="M-10 250 C80 240 120 300 310 270" className="m-avenue" strokeWidth="18" fill="none" />
            <rect x="100" y="180" width="60" height="70" className="m-block" />
            <rect x="205" y="380" width="55" height="45" className="m-block" />
            <circle cx="120" cy="410" r="30" className="m-water" />
            <path d="M76 520 L70 360 C68 330 90 300 130 296 L178 290 L186 160" className="st-route m-route" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="76" cy="520" r="6" className="m-start" />
            <g transform="translate(186 150)">
              <path d="M0 -26 C-11 -26 -17 -18 -17 -10 C-17 2 0 14 0 14 C0 14 17 2 17 -10 C17 -18 11 -26 0 -26Z" className="m-pin" />
              <circle cy="-11" r="6" className="m-pin-hole" />
            </g>
            <circle className="st-truck m-truck" r="8" strokeWidth="3" cx="76" cy="520" />
          </svg>
          <div className="st-mapcard">
            <div className="ic">B</div>
            <div>
              <strong>{p.mapTitle}</strong>
              <small>{p.mapSub}</small>
            </div>
          </div>
          <div className="st-sheet">
            <div className="grip" />
            <p className="h">{p.mapList}</p>
            {mapRows.map((r, i) => (
              <div key={r.name} className="st-row">
                <span className="dot" style={{ background: dotColors[i % dotColors.length] }} />
                <span className="nm">{r.name}</span>
                <em>{r.platform}</em>
              </div>
            ))}
          </div>
        </>
      );
    case "call":
      return (
        <>
          <div className="st-avatar">BiP</div>
          <p className="st-call-t">{p.call}</p>
          <p className="st-call-s">{p.callSub}</p>
          <p className="st-timer">00:00</p>
          <div className="st-tiles">
            <div className="talk">MD</div>
            <div>AK</div>
            <div>SE</div>
            <div>+3</div>
          </div>
          <div className="st-callbar">
            <span>
              <svg viewBox="0 0 24 24">
                <rect x="9" y="3" width="6" height="11" rx="3" />
                <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
              </svg>
            </span>
            <span>
              <svg viewBox="0 0 24 24">
                <rect x="3" y="7" width="12" height="10" rx="2" />
                <path d="M15 11l6-3v8l-6-3" />
              </svg>
            </span>
            <span className="end">
              <svg viewBox="0 0 24 24">
                <path d="M3 14c5-5 13-5 18 0l-2 3-4-1v-3c-2-1-4-1-6 0v3l-4 1z" />
              </svg>
            </span>
          </div>
        </>
      );
    case "wallet":
      return (
        <>
          <div className="st-whead">
            <b>{p.wallet}</b>
            <span>MD</span>
          </div>
          <div className="st-card">
            <small>{p.balance}</small>
            <div className="st-bal">₺0,00</div>
            <div className="num">•••• •••• •••• 2023</div>
          </div>
          <div className="st-actions">
            <div>
              <i />
              {p.send}
            </div>
            <div>
              <i />
              {p.qr}
            </div>
            <div>
              <i />
              {p.cards}
            </div>
          </div>
          <div className="st-tx">
            <div className="st-row">
              <span className="dot" style={{ background: "var(--ink-3)" }} />
              <span className="nm">{p.tx1}</span>
              <em>-₺184,90</em>
            </div>
            <div className="st-row">
              <span className="dot" style={{ background: "var(--accent)" }} />
              <span className="nm">{p.tx2}</span>
              <em>+₺1.000,00</em>
            </div>
            <div className="st-row">
              <span className="dot" style={{ background: "var(--ink-3)" }} />
              <span className="nm">{p.tx3}</span>
              <em>-₺62,00</em>
            </div>
          </div>
          <div className="st-toast">
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="12" />
              <path d="M7 12.5l3.2 3.2L17 9" />
            </svg>
            {p.paid}
          </div>
        </>
      );
    case "nfc":
      return (
        <>
          <p className="st-nfc-t">{p.nfcTitle}</p>
          <p className="st-nfc-s">{p.nfcSub}</p>
          <div className="st-ring">
            <span className="wave" />
            <span className="wave" />
            <span className="wave" />
            <div className="st-id">
              <span className="chip" />
              <span className="ph" />
              <span className="l" style={{ top: 62, width: 50 }} />
              <span className="l" style={{ top: 72, width: 38 }} />
            </div>
          </div>
          <div className="st-meter">
            <b />
          </div>
          <div className="st-verify">
            <span className="reading">{p.reading}</span>
            <span className="ok">{p.verified}</span>
          </div>
        </>
      );
    case "home":
      return (
        <>
          <div className="st-widget">
            {stats.map((s) => (
              <div key={s.label}>
                <b data-to={s.value} data-suf={s.suffix}>
                  {s.value}
                  {s.suffix}
                </b>
                <small>{s.label}</small>
              </div>
            ))}
          </div>
          <div className="st-apps">
            {apps.map((a, i) => (
              <div key={a.name} className="st-app" style={{ animationDelay: `${0.3 + i * 0.09}s` }}>
                <i className={i === 0 ? "is-lead" : ""}>{a.mark}</i>
                <span>{a.name}</span>
              </div>
            ))}
          </div>
          <div className="st-dock">
            <span>RN</span>
            <span>Android</span>
            <span>Flutter</span>
          </div>
        </>
      );
  }
}
