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
    <section id="contact" className="rule-t scroll-mt-16">
      <div className={`${container} py-16 md:py-24`}>
        <Reveal>
          <p className="smallcaps">
            {dict.section} {number} — {dict.contact.title}
          </p>
          <h2 className="font-display mt-4 text-[clamp(3.5rem,12vw,11rem)] font-light italic leading-[0.9] tracking-[-0.04em]">
            {trailing}
            <span className="text-accent not-italic">.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-12 rule-t pt-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="max-w-sm text-[17px] leading-relaxed text-ink-2">{dict.contact.subtitle}</p>
            <h3 className="smallcaps mt-10 rule-b border-ink pb-3">{dict.contact.elsewhere}</h3>
            <ul>
              {[
                { href: `mailto:${profile.email}`, label: profile.email, Icon: MailIcon, ext: false },
                { href: profile.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon, ext: true },
                { href: profile.social.github, label: "GitHub", Icon: GitHubIcon, ext: true },
              ].map(({ href, label, Icon, ext }) => (
                <li key={href} className="rule-b">
                  <a
                    href={href}
                    {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-3 py-3 text-[15px]"
                  >
                    <Icon width={15} height={15} className="text-ink-3 transition-colors group-hover:text-accent" />
                    <span className="u-draw">{label}</span>
                    <span className="ml-auto text-ink-3 transition-colors group-hover:text-accent">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-7 lg:col-start-6">
            <ContactForm dict={dict} email={profile.email} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
