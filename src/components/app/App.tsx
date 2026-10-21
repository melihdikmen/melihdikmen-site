"use client";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { LocalTime } from "../LocalTime";
import { useAppRoute } from "./route";
import { TabBar } from "./TabBar";
import { HomeScreen } from "./screens/HomeScreen";
import { ProjectsScreen, ProjectDetail } from "./screens/ProjectsScreen";
import { CareerScreen } from "./screens/CareerScreen";
import { SkillsScreen } from "./screens/SkillsScreen";
import { ContactScreen } from "./screens/ContactScreen";

export type ScreenProps = { locale: Locale; dict: Dictionary; on: boolean };

/**
 * Uygulama kabuğu. Mobilde tam ekran, masaüstünde telefon çerçevesinin içinde;
 * ikisi de aynı DOM, fark CSS'te. Sekme ve detay durumu URL hash'inde.
 */
export function App({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { tab, slug, navigate } = useAppRoute();
  const detailOn = tab === "projects" && Boolean(slug);

  return (
    <div className="app">
      {/* Masaüstü: sahte durum çubuğu ve dynamic island */}
      <div className="island hidden lg:block" aria-hidden />
      <div className="statusbar hidden lg:flex" aria-hidden>
        <LocalTime locale={locale} seconds={false} />
        <span className="flex items-center gap-1.5">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="0.8" /><rect x="5" y="5.5" width="3" height="6.5" rx="0.8" /><rect x="10" y="3" width="3" height="9" rx="0.8" /><rect x="15" y="0" width="3" height="12" rx="0.8" /></svg>
          <svg width="27" height="13" viewBox="0 0 27 13" fill="none"><rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke="currentColor" opacity="0.4" /><rect x="2" y="2" width="19" height="9" rx="2" fill="currentColor" /><path d="M24.5 4.5v4a2 2 0 0 0 0-4z" fill="currentColor" opacity="0.4" /></svg>
        </span>
      </div>

      {/* Açılış */}
      <div className="splash" aria-hidden>
        <span className="splash-mark">
          MD<span className="text-accent">.</span>
        </span>
      </div>

      <div className="screens">
        <HomeScreen locale={locale} dict={dict} on={tab === "home"} onContact={() => navigate("contact")} onProjects={() => navigate("projects")} />
        <ProjectsScreen locale={locale} dict={dict} on={tab === "projects"} under={detailOn} onOpen={(s) => navigate("projects", s)} />
        <ProjectDetail locale={locale} dict={dict} on={detailOn} slug={slug} onBack={() => navigate("projects")} />
        <CareerScreen locale={locale} dict={dict} on={tab === "career"} />
        <SkillsScreen locale={locale} dict={dict} on={tab === "skills"} />
        <ContactScreen locale={locale} dict={dict} on={tab === "contact"} />
      </div>

      <TabBar active={tab} dict={dict} onSelect={(t) => navigate(t)} />
    </div>
  );
}
