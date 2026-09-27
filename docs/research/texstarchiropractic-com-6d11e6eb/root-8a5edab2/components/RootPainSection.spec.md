# RootPainSection Specification

## Overview
- **Target file:** `src/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/RootPainSection.tsx`
- **Screenshot:** `.../desktop-1440-sec-03-photo-left-1.png`
- **Interaction model:** static.

## DOM structure
```
<section>                       padding 80px 0 50px ; background #fff
  └─ inner (max-width 1220, mx-auto, flex, 2 cols, gap ~80px)
       ├─ LEFT  photo column (~556px)
       │    └─ <div image frame>   curved right edge
       │         └─ <img>
       └─ RIGHT text column
            ├─ <h2>
            └─ <p>
```

## Computed Styles

### Section
- `position: relative`, `display: block`
- `background-color: transparent` (white page)
- `padding: 80px 0px 50px`
- height `496px` at 1440

### Inner row
- `display: flex`, `align-items: center`
- content max-width `1220px`
- column gap ~`80px`
- photo column `556px` wide, text column ~`470px` wide at 1440

### Image frame
- The photo has a **convex curved right edge** — the image is clipped, not a plain rectangle.
  Implement with an SVG `clipPath` (a quarter-round bulge on the right side) or, equivalently,
  a `border-radius` large on the right corners. Looking at the screenshot the right edge bows
  outward from top-right down to bottom-right with a smooth ~120px radius.
- `box-shadow`: none measured. The image has `position: relative`.
- `object-fit: cover`
- natural `1169 × 888`, rendered `556 × 422` at 1440

### Heading (`<h2>`)
- `font-size: 38px`, `line-height: 44px`, `font-weight: 700`, `color: #005EB8`
- `font-family: Open Sans`, `text-transform: none`
- Text wraps to 2 lines: "Let us get to the Root of / your Pain"

### Body (`<p>`)
- `font-family: Poppins`, `font-size: 19px`, `line-height: 31px`, `font-weight: 500`
- `color: #382F2D`
- In the DOM the intro sentence is a `<p>`; the measured `<p>` font-size came back `16px / 26px`
  for some nodes, so the live section mixes a 19/31 lead paragraph with 16/26 body.
  **Use 19px/31px w500 for the whole paragraph** — that is what the screenshot renders.

## States & Behaviors
None. Static.

## Text Content (verbatim from `siteContent.rootPain`)
- h2: `Let us get to the Root of your Pain`
- p: `At TexStar Chiropractic, we believe you deserve more than a quick fix. We deliver long-lasting results to improve your quality of life. With cutting edge technology and an experienced team, we'll work to find the root of your pain and deliver a tailored treatment plan. We're committed to delivering excellent care to the Central Texas area, earning us a 5-star rating on Google Reviews from pain-free customers!`

## Responsive
- **1440:** 2 columns, photo left / text right, heading 38/44.
- **768:** heading `32px / 37px`; columns narrow, gap reduces to ~40px.
- **390:** **single column, photo first then text** (same order as desktop). Heading ~`28px / 33px`.
  Photo full-width, keeps the curved edge.

## Assets
- image → `public/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/images/root-pain-xray.png`
- alt: `Dr Smith pointing to an x-ray`
