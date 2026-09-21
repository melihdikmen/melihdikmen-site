import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { profile } from "@/data/profile";
import { t } from "@/lib/i18n";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <footer className="stage border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-6 font-mono text-xs text-muted">
        <span>
          © {new Date().getFullYear()} {profile.name}. {dict.footer.rights}
        </span>
        <span>
          {t(profile.location, locale)} · {dict.footer.built}
        </span>
      </div>
    </footer>
  );
}
