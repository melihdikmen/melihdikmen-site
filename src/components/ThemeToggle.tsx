"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "./Icons";

/** İkon seçimi CSS ile (dark: variant) yapılır, böylece hydration uyuşmazlığı olmaz. */
export function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      type="button"
      id="theme-toggle"
      aria-label={label}
      title={label}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-paper-2 hover:text-accent"
    >
      <MoonIcon className="dark:hidden" />
      <SunIcon className="hidden dark:block" />
    </button>
  );
}
