# ReviewsSection Specification

## Overview
- **Target file:** `src/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/ReviewsSection.tsx`
- **Screenshot:** `.../desktop-1440-sec-10-review.png`
- **Interaction model:** **CLICK-DRIVEN carousel.** Verified: the Swiper track is `display:flex`
  with `overflow:hidden` on the inner, and a `32×32` arrow control advances it. It is **not**
  scroll-driven, **not** time-driven, and does **not** auto-advance.

## Third-party substitution
The live widget is Elfsight's Google-Reviews feed (a React app injecting `es-carousel-*` classes
and a Swiper instance). Build a **local, self-contained clone** with the same geometry:
6 review cards in a flex track, 3 visible at 1440px, a next/prev arrow that translates the
track by one card. Do not load Swiper from npm and do not call any external API. Plain React
state + a CSS transform is enough and keeps the bundle small.

## DOM structure
```
<section>                        .ts-gradient-cream ; padding 80px 0 50px
  └─ inner (max-width 1220, mx-auto)
       ├─ header row  (flex, justify-between, items-start)
       │    ├─ <div>  <h2> + <p>
       │    └─ <Button variant="solidOrange">See More Reviews
       └─ carousel
            ├─ viewport   (overflow hidden, width 100%)
            │    └─ track  (flex, gap 20px, transform translateX(-n * step))
            │         └─ <article> × 6
            │              ├─ <div star row>  StarIcon × 5
            │              ├─ <p> text
            │              ├─ <span> Read more   (only when truncated)
            │              └─ <div author>
            │                   ├─ <div avatar>  initials, 40x40, circular
            │                   ├─ <span name> + VerifiedIcon
            │                   └─ <span timeAgo>
            └─ <button next>  32x32, blue circle, white chevron
```

## Computed Styles

### Section
- `position: relative`, `display: block`
- `background-image: linear-gradient(rgb(250, 249, 246) 0%, rgb(255, 255, 255) 100%)`
  → `.ts-gradient-cream` in `globals.css`
- `padding: 80px 0px 50px`
- height `354px` at 1440

### Header row
- `display: flex`, `justify-content: space-between`, `align-items: flex-start`
- `<h2>`: `38px / 44px` w700 `#005EB8`, on one line at 1440
- `<p>` subheading: `16px / 26px` w400 `#382F2D`, `margin-top ~`8px`,
  text: `True stories from pain-free patients`
- Button: `Button variant="solidOrange"` "See More Reviews", `margin-top ~`8px`

### Carousel
- viewport `overflow: hidden`, `width: 100%`
- track `display: flex`, `gap: 20px`
- each card `width: 292px`, `flex: none`
- **3 cards visible at 1440** (measured live: slides at `left` 0, 292+20, 292*2+40 within a
  916px inner)
- measured card heights vary (`234 / 188 / 211`) — **do not equalise the row height.** Let each
  card size to its own content (`align-items: flex-start` on the track). Forcing equal heights
  is a visible deviation from the original.
- section total inner width at 1440 is `1220`; the live widget renders at `916`, so give the
  carousel a `max-width: 916px` and let the next arrow hang just outside it (the live arrow sits
  at the right edge, vertically centred on the row).

### Card (`<article>`)
- `background-color: #FFFFFF`
- `border: 1px solid #E5E3DF`
- `border-radius: 0`
- `box-shadow: rgba(1, 7, 39, 0.05) 0px 10px 20px 0px`
- `padding: 16px`
- `display: flex`, `flex-direction: column`, `align-items: flex-start`
- measured heights `188–234px` depending on whether a "Read more" line is present

### Star row
- 5 × `StarIcon` with `filled`, `color: #EA7600`
- each `14 × 14` (live `viewBox="0 0 14 14"`)
- `gap: 2px`, `margin-bottom ~`8px`

### Review text (`<p>`)
- `16px / 26px` w400 `#382F2D`
- 2–3 lines, `text-wrap: pretty`
- clamped at 3 lines; when `review.truncated` is longer than `review.text`, render a
  `Read more` link beneath it

### "Read more"
- `16px / 26px` w400, `color: #73748C` (muted slate — visibly greyer than the body text)
- `margin-top ~`8px`
- **Click-driven:** toggles that card between the truncated and full text. Track a
  `Set<string>` of expanded ids in component state.

### Author block
- `display: flex`, `align-items: center`, `gap: 10px`, `margin-top: auto`
- avatar: `40 × 40`, `border-radius: 50%`, solid colour fill (a per-author Google-blue /
  purple / teal), initials centred in white `14px w600`
- name: `16px / 26px` w500 `#382F2D`
- `VerifiedIcon` `14 × 14` immediately after the name
- timestamp: `16px / 26px` w400, `color: #73748C` (e.g. "3 days ago")

### Next arrow (`<button>`)
- box `32 × 32`
- `background-color: #005EB8`, `border-radius: 50%`
- `color: #FFFFFF`
- `position: absolute`, right of the carousel, `top: 50%`, `translateY(-50%)`
- glyph: `ArrowRightIcon` at `16 × 16` (live `es-icon-container` is `16×16`)
- `z-index` above the viewport so it can overhang
- The live widget only renders a **next** arrow (no visible prev). Render only next, and
  **disable/loop** it: at the end, wrap to 0. Clamp the track index to `0 .. total-3`.

## States & Behaviors
| Behaviour | Trigger | Detail |
|---|---|---|
| advance | click next arrow | track `transform: translateX(-(i * 312px))` (292 card + 20 gap); `i` max = `total - 3`; at the end, wrap to `0` |
| expand | click "Read more" | that card's text swaps truncated ↔ full; label becomes "Read less" |
| star count | per review | `review.stars` filled stars |

`transition: transform 0.3s ease` on the track. Nothing auto-plays.

## Text Content (verbatim, from `siteContent.reviews`)
- heading: `Reviews and Testimonials from our Clients`
- subheading: `True stories from pain-free patients`
- cta: `See More Reviews`
- 6 items with the authors `Rachel Peanut` (3 days ago), `Mike May` (16 days ago),
  `Mariela Almanza Gomez` (20 days ago), `Samantha Smith` (23 days ago),
  `Greg Benitez` (1 month ago), `Chloe` (1 month ago) — all 5 stars, all verified.
- The live avatars are Google user photos hosted on `lh3.googleusercontent.com` via Elfsight;
  they were **not** downloaded. Render the `avatar` initials field as a coloured circle instead
  (already in the content model).

## Responsive
- **1440:** 3 cards visible, card `292px`, arrow `32×32`.
- **768:** 2 cards visible — set the step to `card + gap` and cap `i` at `total - 2`; card
  width ~`300px`; arrow `28×28`.
- **390:** 1 card visible, card `width: 100%` (≈`350px`); cap `i` at `total - 1`; arrow moves
  to the **bottom-right of the section** (below the track, `margin-top: 16px`, not absolute);
  `h2 ~28/33`; the header row stacks (`flex-col items-start gap 16px`).

## Assets
No raster assets. Icons from
`src/components/sites/texstarchiropractic-com-6d11e6eb/shared/icons.tsx`:
`StarIcon` (filled), `ArrowRightIcon`, `VerifiedIcon`.
