export type SkillGroup = "mobile" | "ai" | "backend" | "database" | "tools";

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
  ai: ["AI-assisted development", "Claude Code", "Agentic coding workflows", "Prompt engineering", "Claude API"],
  backend: [".NET Web API", "C#", "Node.js", "REST", "Firebase", "Supabase"],
  database: ["Oracle PL/SQL", "PostgreSQL", "SQL", "MMKV", "SQLite"],
  tools: ["Git", "GitHub Actions", "Jenkins", "EAS", "CodePush", "Sentry", "Smartlook", "Jest", "Testing Library", "Figma"],
};
