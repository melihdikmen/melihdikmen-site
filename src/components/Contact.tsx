import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { profile } from "@/data/profile";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { ContactForm } from "./ContactForm";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./Icons";

export function Contact({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  void locale;
  return (
    <Section id="contact" title={dict.contact.title}>
      <div className="grid gap-10 rounded-2xl bg-tint p-6 md:grid-cols-[2fr_3fr] md:p-10">
        <Reveal>
          <h3 className="font-display text-2xl font-bold tracking-tight text-balance md:text-3xl">{dict.contact.subtitle}</h3>
          <ul className="mt-8 space-y-3 text-[15px]">
            <li>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2.5 hover:text-accent">
                <MailIcon /> {profile.email}
              </a>
            </li>
            <li>
              <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 hover:text-accent">
                <LinkedInIcon /> LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 hover:text-accent">
                <GitHubIcon /> GitHub
              </a>
            </li>
          </ul>
        </Reveal>
        <Reveal delay={80}>
          <ContactForm dict={dict} email={profile.email} />
        </Reveal>
      </div>
    </Section>
  );
}
