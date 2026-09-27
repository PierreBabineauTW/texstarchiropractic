# DedicateSection Specification

## Overview
- **Target file:** `src/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/DedicateSection.tsx`
- **Screenshot:** `.../desktop-1440-sec-09-dedicate.png`
- **Interaction model:** static.

Note: the blue H2 "TexStar Chiropractic offers more than just a quick fix" visible at the bottom
of the screenshot belongs to the **next** logical block (it is the tail of the local-team copy on
the live page at this width). It is **not** part of this component — do not add it.

## DOM structure
```
<section>                        padding 0 0 80px ; white bg
  └─ panel (max-width 1220, mx-auto, 2 cols)
       ├─ LEFT  (quote block)
       │    ├─ <img> quote swoosh   absolutely positioned, left
       │    └─ <blockquote>
       │         ├─ <h3> quote
       │         ├─ <p> attribution
       │         └─ <Button variant="solidOrange">Learn More About Us
       └─ RIGHT photo
            └─ <div frame>   curved LEFT edge, overflows the panel
                 └─ <img>
```

## Computed Styles

### Section
- `position: relative`, `display: block`, `background-color: transparent`
- `padding: 0px 0px 80px`
- height `502px` at 1440

### Panel
- `display: flex`, `align-items: stretch`, `gap: 0`
- The panel background is a very light warm off-white — effectively the page white with a
  barely-there tint. Use `#FDFCFA` (the site's own off-white) or plain white; the difference
  is ~1% and not visible at a glance.
- In the screenshot the panel's left portion is white and the photo occupies the right ~46%,
  bleeding to the panel's right edge and past its bottom.

### Quote swoosh
- `public/.../images/quote-swoosh.png`, natural `73 × 361`, rendered `73 × 360`
- `position: relative` in the live DOM but visually it sits at the **left edge** of the quote
  block, vertically centred, with the text indented past it.
- Implementation: `position: absolute`, `left: 0`, `top: 50%`, `translateY(-50%)`,
  inside the left block, and give the `<blockquote>` a `padding-left: ~120px`.
- `alt=""` (decorative)

### Quote (`<h3>`)
- `font-size: 33px`, `line-height: 40px`, `font-weight: 700`, `color: #382F2D`
- This is the only **dark** h3 on the page (all other h3s are white) — do not colour it blue
- `margin-bottom ~`24px`
- Renders to 5 lines: "We are dedicated to / the local Central / Texas community, / and proud to
  deliver / the highest standard / of care."
- `max-width ~`380px` (measured, giving the 5-line wrap)

### Attribution (`<p>`)
- `16px / 26px` w500 `#382F2D`
- text: `– Dr. Michael P. Henry` (en dash U+2013 + space)
- `margin-bottom ~`32px`

### Button
- `Button variant="solidOrange"`, "Learn More About Us"

### Photo frame
- **Concave curved left edge** — same treatment as `CommitSection` (mirror of `RootPainSection`).
  SVG `clipPath` bowing inward on the left, radius ~`140px`.
- natural `609 × 545`, rendered `609 × 546` at 1440
- `object-fit: cover`, no box-shadow, no border-radius beyond the clip
- The photo bleeds to the section's right edge (full-bleed on the right)

## States & Behaviors
None. Static. No hover on the swoosh or the quote.

## Text Content (verbatim, from `siteContent.dedicate`)
- quote: `We are dedicated to the local Central Texas community, and proud to deliver the highest standard of care.`
- attribution: `– Dr. Michael P. Henry`
- cta: `Learn More About Us` → `https://texstarchiropractic.com/about-us/`

## Responsive
- **1440:** two columns — quote left (`~46%`), photo right (`~54%`) full-bleed;
  `h3 33/40`.
- **768:** `h3 28/34`; gap reduces; the photo stops bleeding and gains side padding.
- **390:** **single column** — swoosh + quote + attribution + button, then the photo below,
  full-width with the curved left edge retained. `h3 ~26/31`; quote drops to 7–8 lines;
  swoosh shrinks to ~`36×178` and the blockquote `padding-left` reduces to ~`52px`.

## Assets
- swoosh → `public/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/images/quote-swoosh.png` (73×361)
- portrait → `public/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/images/dedicate-dr-henry.png` (609×545)
- alt: `portrait of Dr Michael P Henry`
