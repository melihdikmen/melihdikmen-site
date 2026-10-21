import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { profile } from "@/data/profile";
import { container } from "@/lib/ui";
import { Reveal } from "./Reveal";
import { ContactForm } from "./ContactForm";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./Icons";

export function Contact({ locale, dict, number }: { locale: Locale; dict: Dictionary; number: string }) {
  void locale;
  const big = dict.contact.big;
  const trailing = big.endsWith(".") ? big.slice(0, -1) : big;
  return (
    <section id="contact" className="scroll-mt-16 bg-paper-2">
      <div className={`${container} py-20 md:py-28`}>
        <Reveal>
          <p className="label">
            {dict.section} {number} — {dict.contact.title}
          </p>
          <h2 className="font-display mt-3 text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            {trailing}
            <span className="text-accent">.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <p className="max-w-sm text-[17px] leading-relaxed text-ink-2">{dict.contact.subtitle}</p>
            <h3 className="label mt-10 pb-3">{dict.contact.elsewhere}</h3>
            <ul className="flex flex-col gap-2.5">
              {[
                { href: `mailto:${profile.email}`, label: profile.email, Icon: MailIcon, ext: false },
                { href: profile.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon, ext: true },
                { href: profile.social.github, label: "GitHub", Icon: GitHubIcon, ext: true },
              ].map(({ href, label, Icon, ext }) => (
                <li key={href}>
                  <a
                    href={href}
                    {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="box lift group flex items-center gap-3 px-4 py-3.5 text-[15px] font-medium shadow-hard-sm"
                  >
                    <Icon width={16} height={16} strokeWidth={2.2} />
                    <span className="truncate">{label}</span>
                    <span className="ml-auto text-ink-3 transition-transform group-hover:translate-x-0.5">›</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-7 lg:col-start-6">
            <div className="box shadow-hard p-6 md:p-8">
              <ContactForm dict={dict} email={profile.email} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
