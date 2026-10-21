"use client";

import { useCallback, useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { LocalTime } from "../LocalTime";
import { LocaleSwitch } from "../LocaleSwitch";
import { ThemeToggle } from "../ThemeToggle";
import { Simulator } from "./Simulator";
import { Tour } from "./Tour";
import { AboutView, ContactView, EarlierView, ExperienceView, ProjectView, ReadmeView, SkillsView, StoryView } from "./views";

type Ext = "md" | "json" | "tsx" | "ts" | "yaml" | "mp4";
type FileDef = { id: string; name: string; ext: Ext; dir?: string; desc: keyof Dictionary["ide"]["desc"] };

const files: FileDef[] = [
  { id: "readme", name: "README.md", ext: "md", desc: "readme" },
  { id: "about", name: "about.md", ext: "md", desc: "about" },
  { id: "experience", name: "experience.json", ext: "json", desc: "experience" },
  ...projects.map((p): FileDef => ({ id: `projects/${p.slug}`, name: `${p.slug}.tsx`, ext: "tsx", dir: "projects", desc: "projects" })),
  { id: "projects/earlier", name: "earlier.json", ext: "json", dir: "projects", desc: "earlier" },
  { id: "skills", name: "skills.yaml", ext: "yaml", desc: "skills" },
  { id: "story", name: "story.mp4", ext: "mp4", desc: "story" },
  { id: "contact", name: "contact.ts", ext: "ts", desc: "contact" },
];
const byId = Object.fromEntries(files.map((f) => [f.id, f])) as Record<string, FileDef>;
const extLabel: Record<Ext, string> = { md: "MD", json: "{ }", tsx: "TSX", ts: "TS", yaml: "YML", mp4: "▶" };

function Fx({ ext }: { ext: Ext }) {
  return <span className={`fx fx-${ext}`}>{extLabel[ext]}</span>;
}

type Props = { locale: Locale; dict: Dictionary };

export function Ide({ locale, dict }: Props) {
  const [tabs, setTabs] = useState<string[]>(["readme"]);
  const [active, setActive] = useState("readme");
  const [projOpen, setProjOpen] = useState(true);
  const [tour, setTour] = useState<number | null>(null);

  // Tur bir kez gösterilir; localStorage okunamazsa yine gösterilir.
  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem("ide-tour") === "1";
    } catch {}
    if (seen) return;
    const id = window.setTimeout(() => setTour(0), 400);
    return () => window.clearTimeout(id);
  }, []);
  const onTour = useCallback((s: number | null) => {
    setTour(s);
    if (s === null) {
      try {
        localStorage.setItem("ide-tour", "1");
      } catch {}
    }
  }, []);

  const open = useCallback((id: string) => {
    if (!byId[id]) return;
    setTabs((ts) => (ts.includes(id) ? ts : [...ts, id]));
    setActive(id);
    if (id.startsWith("projects/")) setProjOpen(true);
    try {
      history.replaceState(null, "", id === "readme" ? location.pathname : `#${id}`);
    } catch {}
  }, []);

  const close = (id: string) => {
    setTabs((ts) => {
      const next = ts.filter((x) => x !== id);
      if (next.length === 0) next.push("readme");
      if (active === id) {
        const i = ts.indexOf(id);
        const fallback = next[Math.max(0, Math.min(i - 1, next.length - 1))];
        setActive(fallback);
        try {
          history.replaceState(null, "", fallback === "readme" ? location.pathname : `#${fallback}`);
        } catch {}
      }
      return next;
    });
  };

  // URL hash ile senkron: #projects/param gibi.
  useEffect(() => {
    const fromHash = () => {
      const id = decodeURIComponent(location.hash.replace(/^#/, ""));
      if (id && byId[id]) open(id);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [open]);

  const cur = byId[active];
  const shipped = profile.stats[2].value;
  const ctx = { locale, dict, open };
  const rootFiles = files.filter((f) => !f.dir);
  const projFiles = files.filter((f) => f.dir === "projects");

  const desc = (k: keyof Dictionary["ide"]["desc"]) => dict.ide.desc[k].replace("{n}", String(projects.length));
  const TreeRow = ({ f, hideDesc }: { f: FileDef; hideDesc?: boolean }) => (
    <li>
      <button type="button" className={`tree-row ${active === f.id ? "is-act" : ""}`} onClick={() => open(f.id)}>
        <span className="car" aria-hidden />
        <Fx ext={f.ext} />
        {f.name}
        {!hideDesc && <small>{desc(f.desc)}</small>}
      </button>
    </li>
  );

  return (
    <div className="ide">
      {/* Başlık çubuğu */}
      <header className="ide-title">
        <div className="flex items-center gap-3">
          <span className="lights" aria-hidden>
            <i />
            <i />
            <i />
          </span>
          <button type="button" className="run-btn" onClick={() => open("story")} title={dict.ide.run}>
            <b>▶</b>
            <span className="hidden sm:inline">{dict.ide.scheme}</span>
          </button>
        </div>
        <div className="truncate text-center font-medium text-fg">
          {dict.ide.folder} — {cur.name}
        </div>
        <div className="flex items-center justify-end gap-2">
          <LocaleSwitch locale={locale} label={dict.lang.switch} short={dict.lang.short} />
          <ThemeToggle label={dict.theme.toggle} />
        </div>
      </header>

      <div className="ide-body">
        {/* Dosya ağacı (masaüstü) */}
        <nav className="nav" aria-label={dict.ide.navigator}>
          <p className="nav-head">{dict.ide.navigator}</p>
          <ul className="tree">
            <li>
              <span className="tree-row is-dir">
                <span className="car">▾</span>
                <span className="fx fx-dir">▸</span>
                {dict.ide.folder}
              </span>
              <ul className="tree-sub">
                {rootFiles.slice(0, 3).map((f) => (
                  <TreeRow key={f.id} f={f} />
                ))}
                <li>
                  <button type="button" className="tree-row is-dir" onClick={() => setProjOpen((v) => !v)} aria-expanded={projOpen}>
                    <span className="car">{projOpen ? "▾" : "▸"}</span>
                    <span className="fx fx-dir">▸</span>
                    projects
                    <small>{desc("projects")}</small>
                  </button>
                  {projOpen && (
                    <ul className="tree-sub">
                      {projFiles.map((f) => (
                        <TreeRow key={f.id} f={f} hideDesc={f.desc === "projects"} />
                      ))}
                    </ul>
                  )}
                </li>
                {rootFiles.slice(3).map((f) => (
                  <TreeRow key={f.id} f={f} />
                ))}
              </ul>
            </li>
          </ul>
        </nav>

        {/* Editör */}
        <main className="editor">
          {/* Mobil dosya çipleri */}
          <div className="chips" role="tablist" aria-label={dict.ide.navigator}>
            {files.map((f) => (
              <button key={f.id} type="button" className={`chip ${active === f.id ? "is-act" : ""}`} onClick={() => open(f.id)}>
                <Fx ext={f.ext} />
                {f.dir ? `${f.dir}/${f.name}` : f.name}
              </button>
            ))}
          </div>
          <div className="tabs" role="tablist">
            {tabs.map((id) => {
              const f = byId[id];
              return (
                <span key={id} role="tab" aria-selected={active === id} className={`tab ${active === id ? "is-act" : ""}`} onClick={() => open(id)}>
                  <Fx ext={f.ext} />
                  {f.name}
                  <button
                    type="button"
                    className="x"
                    aria-label={dict.ide.closeTab}
                    onClick={(e) => {
                      e.stopPropagation();
                      close(id);
                    }}
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>
          <div className="crumbs">
            <span>{dict.ide.folder}</span>
            {cur.dir && (
              <>
                <span>›</span>
                <span>{cur.dir}</span>
              </>
            )}
            <span>›</span>
            <b>{cur.name}</b>
          </div>

          {/* Tüm dosyalar DOM'da; yalnızca aktif olan görünür. */}
          {files.map((f) => {
            const p = projects.find((x) => `projects/${x.slug}` === f.id);
            return (
              <section key={f.id} className="pane" hidden={active !== f.id} aria-label={f.name}>
                {f.id === "readme" && <ReadmeView {...ctx} />}
                {f.id === "about" && <AboutView {...ctx} />}
                {f.id === "experience" && <ExperienceView {...ctx} />}
                {p && <ProjectView {...ctx} p={p} />}
                {f.id === "projects/earlier" && <EarlierView {...ctx} />}
                {f.id === "skills" && <SkillsView {...ctx} />}
                {f.id === "story" && <StoryView {...ctx} />}
                {f.id === "contact" && <ContactView {...ctx} />}
              </section>
            );
          })}

          {/* Mobilde simülatör altta açılır */}
          <details className="sim-mobile" open={active === "contact"} key={active}>
            <summary>
              <span>{dict.ide.simulator}</span>
              <span className="text-fg-3">iPhone 16</span>
            </summary>
            <div className="sim-stage">
              <Simulator active={active} locale={locale} dict={dict} open={open} />
            </div>
          </details>
        </main>

        {/* Simülatör (masaüstü) */}
        <aside className="sim" aria-label={dict.ide.simulator}>
          <div className="sim-head">
            <span>{dict.ide.simulator}</span>
            <span className="text-fg-3">iPhone 16 · iOS 18</span>
          </div>
          <div className="sim-stage">
            <Simulator active={active} locale={locale} dict={dict} open={open} />
          </div>
        </aside>
      </div>

      {/* Durum çubuğu */}
      <footer className="status">
        <span>✓ {dict.ide.buildOk}</span>
        <span>⎇ {dict.ide.branch}</span>
        <span className="sp" />
        <span>{dict.ide.shipped.replace("{n}", String(shipped))}</span>
        <span>
          Ankara <LocalTime locale={locale} seconds={false} />
        </span>
        <button type="button" className="tour-btn" onClick={() => onTour(0)}>
          ? {dict.ide.tour.open}
        </button>
      </footer>

      <Tour step={tour} onStep={onTour} dict={dict.ide.tour} />
    </div>
  );
}
