"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/i18n/tr";

type State = "idle" | "sending" | "sent" | "error";

export function ContactForm({ dict, email }: { dict: Dictionary; email: string }) {
  const [state, setState] = useState<State>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("sent");
      form.reset();
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4">
        <label className="grid gap-2">
          <span className="label">{dict.contact.name}</span>
          <input id="contact-name" name="name" required autoComplete="name" className="field bg-paper" />
        </label>
        <label className="grid gap-2">
          <span className="label">{dict.contact.email}</span>
          <input id="contact-email" name="email" type="email" required autoComplete="email" className="field bg-paper" />
        </label>
      </div>
      <label className="grid gap-2">
        <span className="label">{dict.contact.message}</span>
        <textarea id="contact-message" name="message" required minLength={10} rows={4} className="field resize-y bg-paper" />
      </label>
      {/* Honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <div className="grid gap-3 pt-1">
        <button type="submit" id="contact-submit" disabled={state === "sending"} className="btn btn-acid w-full">
          {state === "sending" ? dict.contact.sending : dict.contact.send}
          
        </button>
        <span className="text-center text-[13px] text-ink-3">
          {dict.contact.orMail}{" "}
          <a href={`mailto:${email}`} className="u font-medium">
            {email}
          </a>
        </span>
      </div>

      <p role="status" aria-live="polite" className="text-[14px] font-medium empty:hidden">
        {state === "sent" && <span className="pill pill-green">{dict.contact.sent}</span>}
        {state === "error" && (
          <span className="block rounded-xl bg-hot/10 px-3 py-2 text-hot">
            {dict.contact.error}{" "}
            <a href={`mailto:${email}`} className="underline">
              {email}
            </a>
          </span>
        )}
      </p>
    </form>
  );
}
