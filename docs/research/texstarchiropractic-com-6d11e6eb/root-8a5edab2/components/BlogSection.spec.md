# BlogSection Specification

## Overview
- **Target file:** `src/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/BlogSection.tsx`
- **Screenshot:** `.../desktop-1440-sec-11-blog.png`
- **Interaction model:** static.

## DOM structure
```
<section>                        .ts-gradient-cream ; padding 30px 0 50px
  └─ inner (max-width 1220, mx-auto)
       ├─ header row (flex, justify-between, items-start)
       │    ├─ <div> <h2> The TexStar Health Blog  +  <p> A vast chiropractic knowledge base
       │    └─ <Button variant="solidOrange">View All Blog Posts
       └─ grid  3 across, gap 24px
            └─ <article> × 3
                 ├─ <img> thumbnail
                 ├─ <h5> title
                 ├─ <p> excerpt
                 └─ <Button variant="whiteOnOrange">Read more
```

## Computed Styles

### Section
- `position: relative`, `display: block`
- `background-image: linear-gradient(rgb(250, 249, 246) 0%, rgb(255, 255, 255) 100%)`
  → `.ts-gradient-cream` in `globals.css`
- `padding: 30px 0px 50px`
- height `1009px` at 1440

### Header row
- `display: flex`, `justify-content: space-between`, `align-items: flex-start`
- `<h2>`: `38px / 44px` w700 `#005EB8`
- `<p>`: `16px / 26px` w400 `#382F2D`, `margin-top ~`8px`,
  text: `A vast chiropractic knowledge base`
- Button: `Button variant="solidOrange"`, "View All Blog Posts", `margin-top ~`8px`

### Grid
- `display: grid`, `grid-template-columns: repeat(3, 1fr)`, `gap: 24px`
- cards `~356 × 640` at 1440
- `margin-top ~`64px` below the header

### Card (`<article>`)
- `background-color: #FFFFFF`
- `border: 1px solid #E5E3DF`
- `box-shadow: rgba(1, 7, 39, 0.05) 0px 10px 20px 0px`
- `border-radius: 0`
- `padding: 32px`
- `display: flex`, `flex-direction: column`, `align-items: stretch`
- **Card heights are NOT equalised.** The screenshot shows card 1 tall (5-line title + 6-line
  excerpt, button at y≈700), card 2 short (2-line title + 4-line excerpt, button at y≈648),
  card 3 tallest (4-line title + 7-line excerpt, button at y≈750). The grid row is
  `align-items: start` and each card's "Read more" sits **directly under its own excerpt** —
  *not* pushed to a common baseline. This is a specific, easy-to-miss detail: using
  `margin-top: auto` on the button would visibly differ from the original.

### Thumbnail
- natural `307 × 239`, rendered `307 × 240`
- `object-fit: cover`
- `margin: 0 auto 24px` inside the card (centred horizontally, with white gutters either side —
  the card is `~356px` wide and the image `~307px`)
- files: `blog-child-spine.jpg`, `blog-radio.jpg`, `blog-glp1.jpg`

### Title (`<h5>`)
- `font-size: 20px`, `line-height: 25px`, `font-weight: 600`, `color: #382F2D`
- `margin-bottom ~`20px`
- line counts at 1440: card 1 → 3 lines, card 2 → 2 lines, card 3 → 4 lines

### Excerpt (`<p>`)
- `16px / 26px` w400 `#382F2D`
- ends with a literal `[...]` (already in the content string — keep it)
- line counts: card 1 → 6, card 2 → 4, card 3 → 7
- `margin-bottom ~`24px`

### CTA
- `Button variant="whiteOnOrange"` — white fill, orange text and border
- text: `Read more` (lowercase "m" — this differs from every other CTA, which is "Learn More")
- measured `~245 × 51`
- `align-self: flex-start` (not stretched full width)

## States & Behaviors
**No hover state** on the cards, thumbnails, titles or buttons (verified by A/B diff).
No carousel — three static cards.

## Text Content (verbatim, from `siteContent.blog`)
- heading: `The TexStar Health Blog`
- subheading: `A vast chiropractic knowledge base`
- cta: `View All Blog Posts`
- posts, in DOM order (this is the correct reading order — the images do not match the titles
  in an obvious way, so do not reshuffle):
  1. `Top 5 Ways to Protect Your Child's Spine During the Back to School Season`
     — excerpt `Students fill their daily bags with heavy textbooks, bulky laptops, dynamic school supplies, and lunchboxes. Consequently, the heavy physical weight of these everyday items places excessive [...]`
     — image `blog-child-spine.jpg`
  2. `Did You Hear TexStar Chiropractic on the Radio?`
     — excerpt `If you tune in to local radio, you might have heard a familiar voice talking about TexStar Chiropractic! Austin's own Aaron Hogan recently shared a personal [...]`
     — image `blog-radio.jpg`
  3. `The GLP-1 Skeleton: Managing Joint Pain During Rapid Weight Loss Recovery`
     — excerpt `Millions of people successfully shed pounds using modern GLP-1 medications like Ozempic, Wegovy, or Mounjaro. However, many patients experience a highly surprising and deeply frustrating physical [...]`
     — image `blog-glp1.jpg`

## Responsive
- **1440:** 3 across, `h2 38/44`, `h5 20/25`, thumbnails `307×240`.
- **768:** 3 across retained but cards narrow to ~`220px`; `h2 32/37`; `h5 ~18/23`;
  card padding reduces to `20px`; thumbnails become full card width. Section height grows
  sharply as the excerpts wrap to many more lines.
- **390:** **single column, 1 × 3**; `h2 ~28/33`; `h5 17/24`; thumbnails full width; card
  padding `20px`; gap `16px`; the header row stacks (`flex-col items-start gap 16px`).

## Assets
- `public/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/images/blog-child-spine.jpg` (307×239)
- `.../blog-radio.jpg` (307×239)
- `.../blog-glp1.jpg` (307×239)
