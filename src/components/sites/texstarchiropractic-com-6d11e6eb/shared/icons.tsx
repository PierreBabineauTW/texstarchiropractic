import type { SVGProps } from "react";

/**
 * Icons extracted from texstarchiropractic.com.
 * The live site loads mfn-icons (via a webfont) plus Font Awesome 5 Free/Brands;
 * the handful of glyphs actually painted are reproduced here as inline SVG so the
 * clone has no font-icon dependency. Names are by visual function.
 */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Solid 5-point star. Used for commit-section bullets (orange) and map markers. */
export function StarIcon({ filled = true, ...props }: IconProps & { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 1.6l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.4l-6.2 3.3L7 14.7l-5-4.9 6.9-1L12 1.6z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={filled ? 0 : 1.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** mfn-icons `icon-menu-fine` — three stacked rules, the header burger. */
export function MenuFineIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 18" aria-hidden="true" {...base} {...props}>
      <path d="M1 4h22M1 9h22M1 14h22" />
    </svg>
  );
}

/** mfn-icons `icon-down-open` — the side-menu accordion chevron. Rotates 180° when open. */
export function ChevronDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 12" aria-hidden="true" {...base} {...props}>
      <path d="M2 2l8 8 8-8" />
    </svg>
  );
}

/** Side-menu close button. The live markup is the literal character U+2715. */
export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

/** Reviews carousel next arrow (blue circular button, white chevron). */
export function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}

/** Envelope glyph inside the newsletter Email field. */
export function EnvelopeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <rect x="2.5" y="5" width="19" height="14" rx="1.5" />
      <path d="M3 6.5l9 6.5 9-6.5" />
    </svg>
  );
}

/** Offer-step 1 — consultation / chart with trend line. */
export function OfferChartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <path d="M3 20h18" />
      <path d="M5 20v-5M10 20V9M15 20v-8M20 20V5" />
      <path d="M4 11l4-4 3 3 5-6 4 4" />
    </svg>
  );
}

/** Offer-step 2 — spine column. */
export function OfferSpineIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <path d="M12 2v20" />
      <path d="M8.5 4.5h7M8 8h8M8 11.5h8M8 15h8M8.5 18.5h7" />
      <path d="M12 4.5v15" />
    </svg>
  );
}

/** Offer-step 3 — treatment table with a plus. */
export function OfferTreatmentIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <path d="M3 18h18M4 18v-5h16v5" />
      <path d="M12 8.5V4M9.8 6.2h4.4" />
    </svg>
  );
}

/** Offer-step 4 — two people (doctor + patient). */
export function OfferPeopleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <circle cx="9" cy="7" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17.5" cy="8.5" r="2.2" />
      <path d="M15.5 14.4c2.9.3 5.5 2.6 5.5 5.6" />
    </svg>
  );
}

/* ---------------- social (Font Awesome 5 Brands equivalents) ---------------- */

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.63A22 22 0 0 0 14.3 3.5c-2.4 0-4 1.46-4 4.14V9.9H7.6V13h2.7v8h3.2z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={1.9} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15.2V8.8L15.5 12 10 15.2z" />
    </svg>
  );
}

export function YelpIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M12 2.6l1.5 3.6-4.2 1.3a.6.6 0 0 0-.34.86l2.5 3.9 4.3-1.1 1.5 3.2a.6.6 0 0 1-.42.83l-4.5 1.5a.6.6 0 0 1-.8-.5l-.4-3.2-4.3 1.1-1.4 3.1a.6.6 0 0 1-.88.26L4.4 15l4-2.2-1.9-3.7-3.4.4a.6.6 0 0 1-.55-.73L4.2 4.7a.6.6 0 0 1 .72-.7l3.2 1.1 2.1-2.5a.6.6 0 0 1 .78 0z" />
    </svg>
  );
}

/** Google "G" mark for the reviews pill and the small "Read more" brand badge. */
export function GoogleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.45a5.5 5.5 0 0 1-2.39 3.62v3h3.86c2.26-2.08 3.58-5.15 3.58-8.81z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.08 7.94-2.92l-3.86-3a7.2 7.2 0 0 1-10.72-3.78H1.3v3.09A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.36 14.3a7.2 7.2 0 0 1 0-4.6V6.61H1.3a12 12 0 0 0 0 10.78l4.06-3.09z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.3 6.61l4.06 3.09A7.2 7.2 0 0 1 12 4.75z" />
    </svg>
  );
}

/** Small blue tick used for the "verified" badge on reviews. */
export function VerifiedIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 1.5l2.6 2.1 3.3-.3 1 3.2 2.8 1.8-1.4 3 1.4 3-2.8 1.8-1 3.2-3.3-.3L12 22.5l-2.6-2.1-3.3.3-1-3.2L2.3 15.7l1.4-3-1.4-3 2.8-1.8 1-3.2 3.3.3L12 1.5z"
        fill="#1A73E8"
      />
      <path d="M8 12.2l2.6 2.6L16 9.4" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Empty star outline, for un-filled rating slots. */
export function StarOutlineIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 2.6l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.5l-5.8 3.05 1.1-6.5-4.7-4.6 6.5-.95L12 2.6z"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
    </svg>
  );
}
