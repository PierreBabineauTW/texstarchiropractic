"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";

import { siteContent } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/content";
import { EnvelopeIcon } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/icons";
import { cn } from "@/lib/utils";

/**
 * Local stand-in for the GoHighLevel/LeadConnector widget the live site embeds
 * in an iframe.
 *
 * Submission is honest: it posts to /api/contact and reports whatever the route
 * actually did. With no provider configured the route answers 503 and the panel
 * says so — it never implies a subscription was taken.
 */
const FIELD =
  "h-[50px] w-full rounded-[4px] border-0 bg-white px-4 text-base font-normal text-[#382F2D] placeholder:text-[#737373] focus:outline-none focus:ring-2 focus:ring-white/60 lg:h-[53px]";

type Status = "idle" | "submitting" | "sent" | "error";

export function FooterNewsletter() {
  const { heading } = siteContent.newsletter;
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: "Health tips newsletter sign-up",
          intent: "newsletter",
        }),
      });
      const payload = (await response.json()) as { message?: string };
      if (response.ok) {
        setStatus("sent");
        setMessage(payload.message ?? "Thanks — you are subscribed.");
        form.reset();
        return;
      }
      setStatus("error");
      setMessage(payload.message ?? "That did not go through. Please try again.");
    } catch {
      setStatus("error");
      setMessage("We could not reach the server. Please try again.");
    }
  }

  return (
    <section className="relative">
      <div className="mx-auto w-full max-w-[1220px] md:px-[30px] lg:px-0">
        <div className="mx-auto flex w-full max-w-[976px] flex-col items-center rounded-[3px] bg-[#EA7600] px-[11px] pt-[28px] pb-[40px] md:h-[263px] md:flex-row md:items-center md:px-[25px] md:pt-[25px] md:pb-[15px]">
          {/* h2 keeps the footer heading hierarchy contiguous under the page's
              last h2; the classes are unchanged so it still looks identical. */}
          <h2 className="w-full px-0 text-center text-[20px] leading-[25px] font-semibold text-white md:w-1/3 md:px-3 md:text-left md:text-[18px] md:leading-[23px] lg:text-[20px] lg:leading-[25px]">
            {heading}
          </h2>
          {/* `h-[223px]` reproduces the 218px widget iframe plus its 5px offset, so the
              panel keeps the reference height of 263px while the fields sit at the top. */}
          <form
            onSubmit={handleSubmit}
            className="mt-[26px] w-full md:mt-0 md:h-[223px] md:w-2/3 md:px-3 md:pt-[5px]"
          >
            <div className="flex w-[112px] flex-col gap-[18px] md:ml-[6px] md:w-[124px] lg:ml-[30px] lg:w-[168px]">
              {/* Visually hidden labels: the placeholder is not an accessible name. */}
              <label htmlFor={`${id}-name`} className="sr-only">
                Full name
              </label>
              <input
                id={`${id}-name`}
                type="text"
                name="name"
                placeholder="Full Name"
                autoComplete="name"
                maxLength={120}
                className={FIELD}
              />
              <div className="relative">
                <label htmlFor={`${id}-email`} className="sr-only">
                  Email address
                </label>
                <EnvelopeIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#73748C]" />
                <input
                  id={`${id}-email`}
                  type="email"
                  name="email"
                  placeholder="Email*"
                  required
                  autoComplete="email"
                  maxLength={200}
                  className={cn(FIELD, "pl-10")}
                />
              </div>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="h-[50px] w-full rounded-[4px] border-2 border-white bg-[#D07234] text-base font-normal tracking-[0.5px] text-white uppercase lg:h-[53px] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "submitting" ? "SENDING…" : "SUBMIT"}
              </button>
            </div>

            {message ? (
              <p
                role="status"
                aria-live="polite"
                className={cn(
                  "mt-3 max-w-[640px] text-[14px] leading-[20px] font-semibold",
                  status === "sent" ? "text-white" : "text-[#FFE9D6]"
                )}
              >
                {message}{" "}
                {status === "error" ? (
                  <Link href="/contact" className="underline underline-offset-2">
                    Contact us instead
                  </Link>
                ) : null}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
