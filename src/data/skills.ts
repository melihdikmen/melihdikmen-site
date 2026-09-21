export type SkillGroup = "mobile" | "backend" | "database" | "tools";

export const skills: Record<SkillGroup, string[]> = {
  mobile: [
    "React Native",
    "TypeScript",
    "Flutter",
    "Android (Java / Kotlin)",
    "iOS (Swift)",
    "Expo",
    "Redux Toolkit",
    "Zustand",
    "React Navigation",
    "Reanimated",
    "Jitsi Meet / WebRTC",
  ],
  backend: [".NET Web API", "C#", "Node.js", "REST", "Firebase", "Supabase"],
  database: ["Oracle PL/SQL", "PostgreSQL", "SQL", "MMKV", "SQLite"],
  tools: ["Git", "GitHub Actions", "Jenkins", "EAS", "CodePush", "Sentry", "Smartlook", "Jest", "Testing Library", "Figma"],
};
