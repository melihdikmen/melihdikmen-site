import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { profile } from "@/data/profile";
import { t } from "@/lib/i18n";
import { container } from "@/lib/ui";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const site = profile.siteUrl.replace(/^https?:\/\//, "");
  return (
    <footer className="hidden lg:block">
      <div className={`${container} flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-5 text-[12px] text-stage-ink-2`}>
        <span>
          © {new Date().getFullYear()} {profile.name} · {dict.footer.rights}
        </span>
        <span>
          {site} · {t(profile.location, locale)} · {dict.footer.built}
        </span>
      </div>
    </footer>
  );
}
