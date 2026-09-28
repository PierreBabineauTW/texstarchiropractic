"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { siteContent } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/content";
import { Button } from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/Button";
import {
  ArrowRightIcon,
  StarIcon,
  StarOutlineIcon,
  VerifiedIcon,
} from "@/components/sites/texstarchiropractic-com-6d11e6eb/shared/icons";

const GAP = 20;
const VISIBLE_WIDE = 4;
const VISIBLE_MID = 2;
const VISIBLE_NARROW = 1;
const SLOTS = 5;
const CARD_TEXT = "text-[16px] leading-[23px] font-normal text-[#382F2D]";

const AVATAR_FILLS = [
  "#1A73E8",
  "#9334E6",
  "#12B5CB",
  "#EA4335",
  "#34A853",
  "#FBBC04",
] as const;

type Layout = { visible: number; step: number };

function readVisible(): number {
  if (typeof window === "undefined") return VISIBLE_WIDE;
  if (window.matchMedia("(min-width: 1024px)").matches) return VISIBLE_WIDE;
  if (window.matchMedia("(min-width: 768px)").matches) return VISIBLE_MID;
  return VISIBLE_NARROW;
}

function Stars({ value }: { value: number }) {
  return (
    <div className="mb-1.5 flex gap-0.5" role="img" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: SLOTS }, (_, slot) =>
        slot < value ? (
          <StarIcon key={slot} className="size-4 flex-none text-[#EA7600]" />
        ) : (
          <StarOutlineIcon key={slot} className="size-4 flex-none text-[#EA7600]" />
        ),
      )}
    </div>
  );
}

export function ReviewsSection() {
  const { heading, subheading, cta, ctaHref, items } = siteContent.reviews;

  const trackRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<Layout>({ visible: VISIBLE_WIDE, step: 0 });
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());

  const measure = useCallback(() => {
    const card = trackRef.current?.firstElementChild;
    if (!(card instanceof HTMLElement)) return;
    const step = Math.round(card.getBoundingClientRect().width) + GAP;
    const visible = readVisible();
    setLayout((prev) =>
      prev.visible === visible && prev.step === step ? prev : { visible, step },
    );
  }, []);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const mid = window.matchMedia("(min-width: 768px)");
    const onChange = () => measure();
    wide.addEventListener("change", onChange);
    mid.addEventListener("change", onChange);
    const observer = new ResizeObserver(measure);
    // ResizeObserver fires once on observe(), which seeds the first measurement.
    if (trackRef.current) observer.observe(trackRef.current);
    return () => {
      wide.removeEventListener("change", onChange);
      mid.removeEventListener("change", onChange);
      observer.disconnect();
    };
  }, [measure]);

  const lastIndex = Math.max(0, items.length - layout.visible);
  const active = Math.min(index, lastIndex);

  const advance = () =>
    setIndex((current) => {
      const at = Math.min(current, lastIndex);
      return at >= lastIndex ? 0 : at + 1;
    });

  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <section className="ts-gradient-cream relative px-[21px] pt-20 pb-[50px] md:px-[30px]">
      <div className="mx-auto w-full max-w-[1220px]">
        <div className="flex min-h-[113px] flex-col items-center gap-4 text-center md:flex-row md:items-start md:text-left">
          <div className="w-full px-3 md:w-4/5">
            <h2 className="text-[24px] leading-[31px] font-bold text-[#005EB8] md:text-[38px] md:leading-[44px]">
              {heading}
            </h2>
            <p className="mt-3 text-base leading-[26px] font-normal text-[#382F2D]">
              {subheading}
            </p>
          </div>
          <div className="w-full px-3 text-center md:w-1/5">
            {/* The label is nowrap, which is wider than a 1/5 column at md, so
                the button was clipped by the viewport edge. Letting it wrap
                only bites in that column; from lg up it stays on one line. */}
            <Button
              href={ctaHref}
              variant="solidOrange"
              className="whitespace-normal text-center"
            >
              {cta}
            </Button>
          </div>
        </div>

        <div className="relative mx-3 mt-[58px] mb-10">
          <div className="w-full overflow-hidden">
            <div
              ref={trackRef}
              className="flex items-start gap-5 transition-transform duration-300 ease-[ease]"
              style={{ transform: `translateX(-${active * layout.step}px)` }}
            >
              {items.map((review, i) => {
                const isOpen = expanded.has(review.id);
                const isLonger = review.truncated !== review.text;
                return (
                  <article
                    key={review.id}
                    className="flex w-full flex-none flex-col items-start md:w-[calc(50%_-_10px)] lg:w-[calc(25%_-_15px)]"
                  >
                    <div className="flex w-full flex-col items-start border border-[#E5E3DF] bg-white p-6 shadow-[0_10px_20px_0_rgba(1,7,39,0.05)]">
                      <Stars value={review.stars} />
                      <p className={CARD_TEXT}>{isOpen ? review.truncated : review.text}</p>
                      {isLonger ? (
                        <button
                          type="button"
                          onClick={() => toggle(review.id)}
                          /* -my-1.5 py-1.5 lifts the 23px line box to a 35px tap
                             target; the negative margin cancels the padding so
                             the surrounding text does not move */
                          className={CARD_TEXT + " -my-1.5 py-1.5 text-left text-[#73748C]"}
                        >
                          {isOpen ? "Read less" : "Read more"}
                        </button>
                      ) : null}
                    </div>
                    <div className="mt-[21px] flex items-center gap-2.5">
                      <div
                        aria-hidden="true"
                        className="flex size-10 flex-none items-center justify-center rounded-full text-[14px] font-semibold text-white"
                        style={{ backgroundColor: AVATAR_FILLS[i % AVATAR_FILLS.length] }}
                      >
                        {review.avatar}
                      </div>
                      <div className="flex flex-col">
                        <span className="flex items-center gap-1 text-base leading-[21px] font-medium text-[#382F2D]">
                          {review.author}
                          {review.verified ? (
                            <VerifiedIcon className="size-[14px] flex-none" />
                          ) : null}
                        </span>
                        <span className="text-base leading-[21px] font-normal text-[#73748c]">
                          {review.timeAgo}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
          <button
            type="button"
            onClick={advance}
            aria-label="Next reviews"
            className="z-10 ml-auto mt-4 flex size-8 flex-none items-center justify-center rounded-full bg-[#005EB8] text-white md:absolute md:right-0 md:top-1/2 md:mt-0 md:size-7 md:-translate-y-1/2 md:translate-x-1/2 lg:size-8"
          >
            <ArrowRightIcon className="size-4 flex-none" />
          </button>
        </div>
      </div>
    </section>
  );
}
