import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { story } from "@/data/story";
import { projects, pastProjects } from "@/data/projects";
import { profile } from "@/data/profile";
import { t } from "@/lib/i18n";
import { Section } from "./Section";
import { StoryPlayer, type PlayerApp, type PlayerChapter } from "./StoryPlayer";

function initials(name: string) {
  const words = name.split(/\s+/).filter(Boolean);
  return (words.length > 1 ? words[0][0] + words[1][0] : name.slice(0, 1)).toUpperCase();
}

export function Story({ locale, dict, number }: { locale: Locale; dict: Dictionary; number: string }) {
  const chapters: PlayerChapter[] = story.map((c) => ({
    scene: c.scene,
    mark: c.mark,
    label: t(c.label, locale),
    eyebrow: t(c.eyebrow, locale),
    title: t(c.title, locale),
    body: t(c.body, locale),
    chips: c.chips,
  }));

  // Telefonun ana ekranı: sitedeki tüm projeler.
  const apps: PlayerApp[] = [
    ...projects.map((p) => ({ name: p.name.replace(/^Turkcell /, ""), mark: initials(p.name.replace(/^Turkcell /, "")) })),
    ...[...pastProjects].reverse().map((p) => ({ name: p.name, mark: initials(p.name) })),
  ];

  // Harita sahnesindeki liste: Başarsoft dönemi projeleri.
  const mapRows = pastProjects.filter((p) => Number(p.year) >= 2019).slice(0, 4).map((p) => ({ name: p.name, platform: p.platform.split(" · ")[0] }));

  const s = dict.story.phone;
  const statLabels = [s.years, s.companies, s.apps, s.platforms];
  const stats = profile.stats.map((st, i) => ({ value: st.value, suffix: st.suffix, label: statLabels[i] ?? t(st.label, locale) }));

  return (
    <Section id="story" number={number} kicker={dict.section} title={dict.story.title} subtitle={dict.story.subtitle} tone="acid">
      <StoryPlayer locale={locale} chapters={chapters} apps={apps} mapRows={mapRows} stats={stats} ui={dict.story} />
    </Section>
  );
}
