import type { Dictionary } from "@/i18n/tr";
import { profile } from "@/data/profile";
import { container } from "@/lib/ui";
import { ContactForm } from "../ContactForm";
import { SectionHead } from "./SectionHead";

/** "Destek": iletişim formu, App Store'un destek kartı gibi gri kutuda. */
export function Support({ dict }: { dict: Dictionary }) {
  return (
    <section id="contact" className={`${container} scroll-mt-14 py-10 md:py-14`}>
      <div className="border-t border-rule pt-8">
        <SectionHead title={dict.store.support} />
        <p className="max-w-xl text-[15px] leading-[1.6] text-ink-2">{dict.store.supportSubtitle}</p>
        <div className="card mt-5 p-5 md:p-7">
          <ContactForm dict={dict} email={profile.email} />
        </div>
      </div>
    </section>
  );
}
