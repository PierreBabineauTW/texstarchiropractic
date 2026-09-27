# HeroSection Specification

## Overview
- **Target file:** `src/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/HeroSection.tsx`
- **Screenshot:** `.../desktop-1440-sec-02-hero.png`, `.../desktop-1440-fold.png`, `.../mobile-390-sec-02-hero.png`
- **Interaction model:** static. No animation, no carousel, no scroll effects. (The dots seen in
  one intermediate capture were an artifact of a probe click navigating to `/texstar-solutions/` —
  this hero has no slides.)

## DOM structure
```
<section>                          bg: .ts-gradient-hero ; padding 140px 0 0
  └─ inner (max-width 1220, mx-auto, flex, 2 cols)
       ├─ LEFT  (text, ~48% width)
       │    ├─ <p> eyebrow
       │    ├─ <h1> heading
       │    ├─ <p> body  (contains a link around the phone number)
       │    └─ award card
       │         ├─ <p> caption (white, bold)
       │         └─ <img> badge
       └─ RIGHT (photo, ~52%)
            └─ <img> hero photo
```

## Computed Styles

### Section
- `position: relative`, `display: block`
- `background-image: radial-gradient(at 50% 100%, rgb(255, 178, 98) 0%, rgb(234, 118, 0) 100%)`
  → use the `.ts-gradient-hero` utility already in `globals.css`
- `padding: 140px 0px 0px`
- height `998px` at 1440 (content-driven, do not hardcode)

### Inner row
- `display: flex`, `align-items: center`
- content wrapper max-width `1220px`, centred
- Left column and right column are roughly **50 / 50** (left text block measures ~470px wide at 1440)

### Eyebrow (`<p>`)
- `color: #FFFFFF`, `font-size: 15px`, `font-family: Open Sans`, `font-weight: 600`
- text-transform: none — the text is already uppercase in the content
- margin-bottom ~24px

### Heading (`<h1>`)
- `font-size: 50px`, `line-height: 53px`, `font-weight: 700`, `color: #FFFFFF`
- `font-family: Open Sans`
- max-width ~470px (it wraps to 4 lines at 1440: "Improve your / quality of life with / personalized / chiropractic care.")
- `margin: 0`

### Body (`<p>`)
- `font-family: Poppins`, `font-size: 19px`, `line-height: 31px`, `font-weight: 500`
- `color: #FFFFFF`
- max-width ~450px
- The phone number is an inline `<a>`: underlined, `text-decoration: underline`,
  same colour. Do not restyle it beyond the underline.

### Award card
- Container: `background: rgba(255, 255, 255, 0.25)` (a translucent white panel)
- inner `section_wrapper` measures `462 × 154` at 1440
- caption `<p>`: `color #FFFFFF`, `font-weight: 700`, `font-size 19px`, `line-height 31px`, Poppins
  — text wraps to 3 lines: "Voted Best Chiropractor / in the Austin area by / Statesman."
- badge `<img>`: natural `1439 × 1188`, rendered `162 × 133`, `position: relative`,
  to the **right** of the caption. Use `next/image` with explicit dims.
- Card is `display: flex`, `align-items: center`, `gap` ~20px, `padding` ~24px.

### Hero photo
- natural `1440 × 1477`, rendered `635 × 651` at 1440
- `position: relative`
- sits flush to the **bottom** of the section (bleeds off the bottom edge — the section has
  `padding-bottom: 0` for this reason)
- `object-fit: cover`
- File: `public/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/images/hero-doctors.webp`

## States & Behaviors
None. Static. No hover on the phone link beyond the underline.

## Text Content (verbatim from `siteContent.hero`)
- eyebrow: `TRUST TEXSTAR CHIROPRACTIC`
- h1: `Improve your quality of life with personalized chiropractic care.`
- body: `Fast relief, lasting results—it's time to invest in your long‑term health. Call today at +1 (512) 899-2228 for a personalized solution for your pain.`
- award caption: `Voted Best Chiropractor in the Austin area by Statesman.`

## Responsive
- **1440:** 2 columns, heading 50/53, photo 635×651 bleeding to the bottom.
- **768:** heading drops to `43px / 45px`; columns narrow but stay side-by-side.
- **390:** **single column**, stacked in this order: eyebrow → h1 → body → award card → photo.
  Heading drops further (~34/38). Photo is full-width. Section `padding` reduces to ~`40px 20px 0`.

## Assets
- badge → `public/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/images/badge-best-of-austin.webp`
- photo → `public/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/images/hero-doctors.webp`
