# SiteHeader Specification

## Overview
- **Target file:** `src/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/SiteHeader.tsx`
- **Screenshots:** `.../desktop-1440-sec-01-header.png`, `.../desktop-1440-fold.png`, `.../desktop-1440-sec-04-dark-1.png` (scrolled state), `.../mobile-390-sec-01-header.png`
- **Interaction model:** **SCROLL-DRIVEN** (position/height swap) + a click-driven burger that opens `SideMenu`.

## CRITICAL: there is no horizontal nav
The live `.mfn-header-menu` computes to **0 × 0 at 1440, 768 and 390**. The desktop header is
logo + two CTAs + burger, nothing else. All navigation lives in the side menu. Do **not** build
a nav bar. Do **not** build a "Solutions / Conditions / About / Locations" inline row.

## DOM structure
```
<header>                                  position absolute -> fixed; z-index 3
  └─ inner row (max-width 1220, mx-auto)
       ├─ <a> logo
       ├─ (no nav)
       ├─ <Button variant=solidWhite|outlineWhite> "Schedule Appointment"
       ├─ <Button …> "Contact Us"
       └─ <button> burger  -> MenuFineIcon
```

## States & Behaviors

### Scroll-driven swap (the one real behaviour)
- **Trigger:** `window.scrollY >= 192`. Measured: `scrollY 180 → position:absolute`,
  `scrollY 200 → position:fixed`. 192 is the header's rendered height at ≥1024px.
- **State A (top, scrollY 0–191):**
  - header `position: absolute`, height `192px`, background `transparent`
  - logo rendered `486 × 168`
  - CTAs use `Button` variant `solidWhite`
- **State B (scrolled, scrollY >= 192):**
  - header `position: fixed`, `top: 0`, height `65px`, background `#005EB8`
  - logo shrinks (keep the 486:168 aspect ratio; height ≈ 48px, width auto)
  - CTAs switch to `Button` variant `outlineWhite`
- **Transition:** none. The height change is instantaneous — the live site toggles
  `display` between three header sections. Do **not** add a height transition; a fade/height
  animation here would be a visible deviation.
- **Implementation:** `"use client"`, `useState` + a `scroll` listener (passive), compare
  against a `192` constant. Render the two button sets conditionally. Keep it cheap — this runs
  on every scroll frame.

### Burger
- `<a class="mfn-header-menu-burger">` wrapping `<i class="icon-menu-fine">`.
- `i` computed: `color #FDFCFA`, `font-size 25px` at desktop, `18px` at mobile,
  `transition: 0.2s ease-in-out`.
- In the screenshots the burger sits inside a **white outlined square** (~50×50 at 1440,
  ~42×43 at 390) with a transparent interior, on the blue header. Reproduce as:
  `border-2 border-[#FDFCFA] rounded-[2px] w-[50px] h-[50px] flex items-center justify-center`
  at ≥1024px, and `w-[42px] h-[43px]` below. The three rules are `currentColor`
  (#FDFCFA), ~25px wide, 1.5px stroke, evenly spaced.
- Clicking it opens `SideMenu` — lift that state to the page shell and pass
  `onToggleMenu` down. Do not render `SideMenu` from inside this component.

### Mobile header (< 1024px)
- `position: fixed` from scroll 0. Height `89px`. Background `#005EB8`. Padding `8px`.
- Logo is the **spine icon**, not the horizontal wordmark:
  `public/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/images/logo-texstar-spine-icon.png`
  rendered `42 × 73`, `alt=""`, linking to `https://texstarchiropractic.com`.
- CTAs: `Button variant="outlineWhite"` "Online Scheduler" → `/schedule-consultation/`
  (box `158×50`) and "Call Us" → `tel:+15128992228` (box `87×50`).
- Burger box `38 × 39` (inside the ~42px outlined square).

## Responsive
| Width | Header height | Logo | CTAs | position |
|---|---|---|---|---|
| 1440 | 192 → 65 | horizontal wordmark `486×168` | "Schedule Appointment" + "Contact Us" | absolute → fixed |
| 768 | 103 | horizontal wordmark (smaller) | same two | absolute → fixed |
| 390 | 89 (constant) | spine icon `42×73` | "Online Scheduler" + "Call Us" | **always fixed** |

The desktop/mobile variant swap happens at **1024px** (the live classes are `mfn-hasMobile`
/ `mfn-mobile-header-tmpl-fixed`; 768 still uses the desktop wordmark, 390 uses the icon).
Use Tailwind's `lg:` breakpoint (1024px).

## Assets
- `public/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/images/logo-texstar-white-horizontal.svg` — desktop wordmark (white, horizontal, natural `432×149`)
- `public/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/images/logo-texstar-spine-icon.png` — mobile mark (natural `86×150`)
- Icons: `MenuFineIcon` from `src/components/sites/texstarchiropractic-com-6d11e6eb/shared/icons.tsx`

## Text Content (verbatim)
- "Schedule Appointment" → `https://texstarchiropractic.com/schedule-consultation/`
- "Contact Us" → `https://texstarchiropractic.com/contact-us/`
- "Online Scheduler" → `https://texstarchiropractic.com/schedule-consultation/`
- "Call Us" → `tel:+15128992228`

## Notes
- Use `next/image` for both logos with explicit `width`/`height` so the rendered box matches.
- The header must **overlay** the hero (absolute, transparent) — the hero does not reserve space
  for it and paints underneath.
- No shadow, no border-bottom in either state (`box-shadow: none` measured in both).
