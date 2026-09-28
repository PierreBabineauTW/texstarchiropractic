"use client";

import { useId, useState } from "react";

import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Contact form.
 *
 * It posts to /api/contact. When no form provider is configured the route
 * answers 503 and this component says so plainly — it never reports a message
 * as sent when nothing was delivered.
 */
export function ContactForm({ className }: { className?: string }) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const field =
    "h-[50px] w-full rounded-[4px] border border-[#E5E3DF] bg-white px-4 font-sans text-[16px] text-[#382F2D] outline-none transition-shadow focus:ring-2 focus:ring-[#005EB8]/40";

  const label = "block font-sans text-[15px] leading-[22px] font-semibold text-[#382F2D]";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const payload = (await response.json()) as { message?: string };

      if (response.ok) {
        setStatus("success");
        setMessage(payload.message ?? "Thanks — we will be in touch shortly.");
        form.reset();
        return;
      }

      setStatus("error");
      setMessage(payload.message ?? "Something went wrong. Please call us instead.");
    } catch {
      setStatus("error");
      setMessage("We could not reach the server. Please call us instead.");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate={false} className={cn("space-y-4", className)}>
      <div>
        <label htmlFor={`${id}-name`} className={label}>
          Full name
        </label>
        <input
          id={`${id}-name`}
          name="name"
          type="text"
          required
          autoComplete="name"
          maxLength={120}
          className={cn(field, "mt-1.5")}
        />
      </div>

      <div>
        <label htmlFor={`${id}-email`} className={label}>
          Email
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          maxLength={200}
          className={cn(field, "mt-1.5")}
        />
      </div>

      <div>
        <label htmlFor={`${id}-phone`} className={label}>
          Phone <span className="font-normal text-[#73748C]">(optional)</span>
        </label>
        <input
          id={`${id}-phone`}
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={40}
          className={cn(field, "mt-1.5")}
        />
      </div>

      <div>
        <label htmlFor={`${id}-message`} className={label}>
          Message
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          required
          rows={4}
          maxLength={2000}
          className={cn(field, "mt-1.5 h-auto py-3 leading-6")}
        />
      </div>

      {/* Honeypot: hidden from humans, catches naive bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-company`}>Company</label>
        <input id={`${id}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="h-[51px] w-full rounded-[4px] bg-[#EA7600] font-sans text-[16px] tracking-[0.5px] text-white uppercase transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>

      {message ? (
        <p
          role="status"
          aria-live="polite"
          className={cn(
            "font-sans text-[15px] leading-[22px]",
            status === "success" ? "text-[#0f6b3f]" : "text-[#b4341a]",
          )}
        >
          {message}
        </p>
      ) : null}

      {!siteConfig.contactFormEndpoint && status !== "success" ? (
        <p className="font-sans text-[13px] leading-[20px] text-[#73748C]">
          Demo build: no form provider is configured, so submitting returns a
          &ldquo;not configured&rdquo; message instead of pretending to deliver.
        </p>
      ) : null}
    </form>
  );
}
