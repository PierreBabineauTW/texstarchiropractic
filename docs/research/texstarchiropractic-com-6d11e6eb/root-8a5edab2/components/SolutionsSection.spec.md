# SolutionsSection Specification

## Overview
- **Target file:** `src/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/SolutionsSection.tsx`
- **Screenshot:** `.../desktop-1440-sec-05-solutions.png`
- **Interaction model:** static.

## DOM structure
```
<section>                       .ts-gradient-cream ; padding 80px 0 50px
  └─ inner (max-width 1220, mx-auto)
       ├─ header block (centred)
       │    ├─ <h2> Personalized Treatment and Solutions
       │    └─ <p> Wherever your pain, …
       └─ grid  2 x 2, gap ~24px
            └─ <article> × 4
                 ├─ <img> icon
                 ├─ <h4> title
                 ├─ <p> description
                 └─ <Button variant="solidOrange">Learn More
```

## Computed Styles

### Section
- `position: relative`, `display: block`
- `background-image: linear-gradient(rgb(250, 249, 246) 0%, rgb(255, 255, 255) 100%)`
  → the `.ts-gradient-cream` utility in `globals.css`
- `padding: 80px 0px 50px`
- height `1215px` at 1440

### Header block
- centred, `max-width ~`760px`, `margin: 0 auto`
- `<h2>`: `38px / 44px` w700 `#005EB8`, margin-bottom ~`16px`
- `<p>`: Poppins `19px / 31px` w500 `#382F2D`, centred, wraps to 2 lines
  (measured max-width ~`660px`)

### Grid
- `display: grid`, `grid-template-columns: repeat(2, 1fr)`, `gap: 24px`
- Cards measured `586 × 348` at 1440 (the row-1 pair spans 1220 with a 24px gap → 598 each;
  use `1fr 1fr` and let content size the height)
- `margin-top ~`64px` below the header block

### Card (`<article>`)
- `background-color: #FFFFFF`
- `box-shadow: rgba(1, 7, 39, 0.05) 0px 10px 20px 0px`
- `border-radius: 0` (no rounding measured on the cards)
- `border: 1px solid #E5E3DF` (a faint 1px outline is visible in the screenshot)
- `padding: 40px 48px`
- `display: flex`, `flex-direction: column`, `align-items: center`, `text-align: center`

### Card icon
- rendered `100 × 100` at 1440 (natural `100 × 100` for the condition rasters)
- `margin-bottom ~`24px`
- `position: relative`
- Files: `solution-back-pain.png`, `solution-neck-pain.png`, `solution-knee-pain.png`,
  `solution-headaches.png` under
  `public/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/images/`
- These are blue/orange line-art rasters — render them as-is with `next/image`.

### Card title (`<h4>`)
- `24px / 29px`, `font-weight: 700`, `color: #382F2D`
- `margin-bottom ~`12px`

### Card description (`<p>`)
- `16px / 26px`, `font-weight: 400`, `color: #382F2D`
- `max-width ~`480px`, centred, 3 lines
- `margin-bottom ~`24px`

### Card CTA
- `Button variant="solidOrange"` — "Learn More", measured `126 × 51`
- `margin-top: auto` so the buttons sit consistently at the bottom of each card

## States & Behaviors
**No hover state on the cards and none on the Learn More button** (verified by A/B diff).
Do not add lift/scale/shadow transitions — that would be a visible deviation.

## Text Content (verbatim, from `siteContent.solutions`)
- heading: `Personalized Treatment and Solutions`
- subheading: `Wherever your pain, we have highly trained and trusted doctors who will deliver long-lasting solutions.`
- items, in DOM order (this is the 2×2 reading order — do **not** reorder):
  1. `Back Pain` — `Lower back pain is one of the most common conditions we treat. Let the TexStar experts identify the source of pain, any underlying issues, and begin a plan of recovery.`
  2. `Neck Pain` — `Whether it's whiplash from a car accident or something deeper—TexStar has a solution. We'll locate the pain and develop a care program tailored to your needs.`
  3. `Knee Pain` — `Knee pain is a very common issue that can hold you back from everyday activities. Let the TexStar team help you get back on your feet with long-lasting recovery.`
  4. `Headaches` — `Research shows that chiropractic treatment of the spine is an effective solution for tension headaches. Alleviate your chronic headaches with a personalized treatment plan.`

## Responsive
- **1440:** 2 × 2 grid, `h2 38/44`, icons `100×100`, card padding `40px 48px`.
- **768:** 2 × 2 grid retained; `h2 32/37`, `h4 20/25`; card padding reduces to `32px`.
  Section height grows.
- **390:** **single column, 1 × 4**. `h2 ~28/33`, icons `80×80`, card padding `28px 20px`,
  `gap: 16px`. Descriptions go to 4–5 lines.

## Assets
- `public/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/images/solution-back-pain.png` (100×100)
- `.../solution-neck-pain.png` (103×99)
- `.../solution-knee-pain.png` (103×99)
- `.../solution-headaches.png` (88×99)
