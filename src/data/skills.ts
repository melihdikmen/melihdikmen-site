export type SkillGroup = "mobile" | "backend" | "database" | "tools";

export const skills: Record<SkillGroup, string[]> = {
  mobile: [
    "React Native",
    "TypeScript",
    "Expo",
    "Flutter",
    "Redux Toolkit",
    "Zustand",
    "React Navigation",
    "Reanimated",
    "Native modules (Swift / Kotlin)",
  ],
  backend: [".NET Web API", "C#", "Node.js", "REST", "Firebase", "Supabase"],
  database: ["Oracle PL/SQL", "PostgreSQL", "MMKV", "SQLite"],
  tools: ["Git", "GitHub Actions", "EAS", "Fastlane", "Sentry", "Jest", "Testing Library", "Figma"],
};
