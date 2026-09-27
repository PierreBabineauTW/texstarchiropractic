# CommitSection Specification

## Overview
- **Target file:** `src/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/CommitSection.tsx`
- **Screenshot:** `.../desktop-1440-sec-06-commit.png`
- **Interaction model:** static.

## DOM structure
```
<section>                        .ts-gradient-cream-up ; padding 30px 0 50px
  └─ inner (max-width 1220, mx-auto, flex, 2 cols, gap ~60px)
       ├─ LEFT  text
       │    ├─ <h2> Our Commitment to You
       │    ├─ <p> intro
       │    └─ <ul>  (3 rows, gap ~40px)
       │         └─ <li>  flex, gap ~32px
       │              ├─ <StarIcon/>  orange, 44x44
       │              └─ <div>
       │                   ├─ <h4> title
       │                   └─ <p> description
       └─ RIGHT photo column
            └─ <div image frame>   curved LEFT edge
                 └─ <img>
```

## Computed Styles

### Section
- `position: relative`, `display: block`
- `background-image: linear-gradient(0deg, rgb(250, 249, 246) 0%, rgb(255, 255, 255) 100%)`
  → the `.ts-gradient-cream-up` utility in `globals.css`
- `padding: 30px 0px 50px`
- height `767px` at 1440

### Inner row
- `display: flex`, `align-items: center`, gap ~`60px`
- left text column ~`556px`, right photo column ~`530px` at 1440

### `<h2>`
- `38px / 44px` w700 `#005EB8`

### Intro `<p>`
- `16px / 26px` w400 `#382F2D`, max-width ~`540px`
  (this section's lead paragraph measures 16/26, not the 19/31 used in the hero)
- `margin-bottom ~`48px`

### Rows (`<li>`)
- `display: flex`, `align-items: flex-start`, gap ~`32px`
- vertical gap ~`40px` between rows

### Row star
- `StarIcon` with `filled`, `color #EA7600`
- rendered `44 × 45`
- `flex: none`

### Row title (`<h4>`)
- `24px / 29px` w700 `#382F2D`, `margin-bottom ~`12px`

### Row description (`<p>`)
- `16px / 26px` w400 `#382F2D`, max-width ~`420px`, 2 lines

### Image frame
- The photo has a **concave curved left edge** — the mirror image of `RootPainSection`.
  Clip with an SVG `clipPath` that bows inward on the left, or a large
  `border-top-left-radius` + `border-bottom-left-radius`. Radius ~`120px`.
- natural `556 × 586`, rendered `530 × 597` at 1440
- `object-fit: cover`, `position: relative`, no box-shadow

## States & Behaviors
None. Static. No hover on the stars or rows.

## Text Content (verbatim, from `siteContent.commit`)
- heading: `Our Commitment to You`
- body: `We've been putting patients first for over a decade, delivering excellent quality care to the Central Texas area.`
- points, in DOM order:
  1. `Personalized Care` — `We'll identify the underlying causes of your pain and create a tailored recovery plan for your body.`
  2. `Long-lasting Results` — `Our highly trained doctors combine advanced treatment and the latest technology to provide lasting results.`
  3. `Holistic Solutions` — `That means less chronic medication dependance, and fewer surgical interventions.`

## Responsive
- **1440:** text left, photo right with the curved left edge.
- **768:** `h2 32/37`, `h4 20/25`; gap reduces to ~`40px`; still side-by-side.
- **390:** **single column** — text first, photo second. `h2 ~28/33`, stars `32×32`,
  row gap `20px`, item gap `16px`.

## Assets
- image → `public/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/images/commit-treatment.jpg`
  (natural `556 × 586`)
- alt: `Dr Henry assisting a client off the chiropractic table`
- icon: `StarIcon` from `src/components/sites/texstarchiropractic-com-6d11e6eb/shared/icons.tsx`
