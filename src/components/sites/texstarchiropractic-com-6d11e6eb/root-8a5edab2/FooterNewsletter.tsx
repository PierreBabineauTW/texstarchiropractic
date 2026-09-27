"use client";

import type { FormEvent } from "react";

import { siteContent } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/content";
import { EnvelopeIcon } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/icons";
import { cn } from "@/lib/utils";

/**
 * Local stand-in for the GoHighLevel/LeadConnector widget that the live site
 * embeds in an iframe. Nothing is submitted anywhere.
 */
const FIELD =
  "h-[50px] w-full rounded-[4px] border-0 bg-white px-4 text-base font-normal text-[#382F2D] placeholder:text-[#737373] focus:outline-none focus:ring-2 focus:ring-white/60 lg:h-[53px]";

export function FooterNewsletter() {
  const { heading } = siteContent.newsletter;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <section className="relative">
      <div className="mx-auto w-full max-w-[1220px] md:px-[30px] lg:px-0">
        <div className="mx-auto flex w-full max-w-[976px] flex-col items-center rounded-[3px] bg-[#EA7600] px-[11px] pt-[28px] pb-[40px] md:h-[263px] md:flex-row md:items-center md:px-[25px] md:pt-[25px] md:pb-[15px]">
          <h5 className="w-full px-0 text-center text-[20px] leading-[25px] font-semibold text-white md:w-1/3 md:px-3 md:text-left md:text-[18px] md:leading-[23px] lg:text-[20px] lg:leading-[25px]">
            {heading}
          </h5>
          {/* `h-[223px]` reproduces the 218px widget iframe plus its 5px offset, so the
              panel keeps the reference height of 263px while the fields sit at the top. */}
          <form
            onSubmit={handleSubmit}
            className="mt-[26px] w-full md:mt-0 md:h-[223px] md:w-2/3 md:px-3 md:pt-[5px]"
          >
            <div className="flex w-[112px] flex-col gap-[18px] md:ml-[6px] md:w-[124px] lg:ml-[30px] lg:w-[168px]">
              <input type="text" name="name" placeholder="Full Name" className={FIELD} />
              <div className="relative">
                <EnvelopeIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#73748C]" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  className={cn(FIELD, "pl-10")}
                />
              </div>
              <button
                type="submit"
                className="h-[50px] w-full rounded-[4px] border-2 border-white bg-[#D07234] text-base font-normal tracking-[0.5px] text-white uppercase lg:h-[53px]"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
