# OfferSection Specification

## Overview
- **Target file:** `src/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/OfferSection.tsx`
- **Screenshot:** `.../desktop-1440-sec-04-dark-1.png`
- **Interaction model:** static.

This is the "New Patient Special $98" panel — the site's most distinctive block: a blue
gradient panel with an orange starburst seal and four orange gradient bars with rounded right ends.

## DOM structure
```
<section>                          padding 60px 0 ; transparent
  └─ inner wrap  (max-width 1220, mx-auto)
       └─ PANEL  .ts-gradient-blue   (1220 x 949 measured)
            ├─ LEFT  (text + starburst badge, overlapping the panel's top-left corner)
            │    ├─ <div badge>  bg-image offer-starburst.png, 230x230
            │    │    ├─ <h1> $98
            │    │    └─ <h2> New Patient Special:
            │    ├─ <h4> Mention this Special Offer when Scheduling
            │    └─ <h3> This Includes:
            ├─ RIGHT
            │    ├─ <ul>  (4 bars)
            │    │    └─ <li> × 4   .ts-gradient-orange
            │    │         ├─ <Icon/>
            │    │         └─ <h4>
            │    ├─ <p> fine print
            │    └─ <a> * Read More
            └─ (a second "This Includes:" <h3> exists in the live DOM as a duplicate —
                 render it ONCE. This is a known DOM duplication, not a design feature.)
```

## Computed Styles

### Section
- `position: relative`, `display: block`, `background-color: transparent`
- `padding: 60px 0px`
- height `1098px` at 1440

### Panel
- `background-image: linear-gradient(0deg, rgb(0, 94, 184) 0%, rgb(51, 155, 255) 100%)`
  → the `.ts-gradient-blue` utility in `globals.css`
- measured `1220 × 949`
- `display: flex`, `align-items: center`, gap ~`60px`
- No border-radius, no box-shadow.

### Starburst badge
- `background-image: url(".../offer-starburst.png")`, `background-size` cover
- measured `230 × 230`, `position: relative`
- It **overlaps the panel's top-left corner** — it sits partly outside/above the panel
  (the screenshot shows the orange seal breaking out of the blue panel's top-left).
- Anchor: `absolute`, `top: -57px` (i.e. ~57px above the panel top), `left: -29px`
  relative to the panel. Sits in the LEFT column, above/left of the "$98" text.
- Text inside: `$98` as `<h1>` and `New Patient Special:` as `<h2>`, both white.
  From the screenshot the two lines are **centred on the seal**, overlapping it.

### Headings inside the badge
- `<h1>` `$98`: `50px / 53px` w700 `#FFFFFF`
- `<h2>` `New Patient Special:`: `38px / 44px` w700 `#FFFFFF`

### `<h4>` "Mention this Special Offer when Scheduling"
- `24px / 29px` w700 `#FFFFFF`

### `<h3>` "This Includes:"
- `33px / 40px` w700 `#FFFFFF`

### The 4 bars (`<li>`)
- `background-image: linear-gradient(rgb(234, 118, 0), rgb(255, 178, 98))` → `.ts-gradient-orange`
- `border-radius: 0px 100px 100px 0px` (flat left edge, fully rounded right cap)
- measured `1160 × 104` each
- vertical gap ~`32px` (tops at 1739, 1875, 2011, 2147)
- `display: flex`, `align-items: center`, gap ~`24px`
- padding-left ~`40px`
- icon: white, ~`24 × 24`, `flex: none`
- label `<h4>`: `24px / 29px` w700 `#FFFFFF`

### Icons per bar
From `OfferStep.icon` in the content file, map to the shared icon module:
| `icon` value | component |
|---|---|
| `chart` | `OfferChartIcon` |
| `spine` | `OfferSpineIcon` |
| `treatment` | `OfferTreatmentIcon` |
| `people` | `OfferPeopleIcon` |

All four are already implemented in
`src/components/sites/texstarchiropractic-com-6d11e6eb/shared/icons.tsx`. Import them; do not
redraw them and do not use the downloaded `offer-icon-0*.png` files (those are the white
raster icons; the SVG line versions match the screenshot more closely — if you prefer the
rasters, use `offer-icon-01..04.png` at `24×24`).

### Fine print
- `<p>`, `16px / 26px`, `font-weight: 500`, `color #FFFFFF`
- centred within the right column
- margin-top ~`40px`

### "* Read More"
- `<a>`, `16px / 26px` w500 `#FFFFFF`, centred, `margin-top ~`40px`
- No hover state (buttons/links in main content have none).
- Not a `Button` — it is a bare underlined-off text link.

## States & Behaviors
None. Static. No hover on the bars or the Read More link.

## Text Content (verbatim from `siteContent.offer`)
- price: `$98`
- title: `New Patient Special:`
- note: `Mention this Special Offer when Scheduling`
- includesHeading: `This Includes:`
- steps:
  1. `An initial consultation to identify your health goals`
  2. `A thorough neuro-musculo-skeletal exam to identify issues`
  3. `A treatment session using one of our advanced service options`
  4. `A one-on-one follow up consultation with your doctor to review your exam findings and any recommendations`
- finePrint: `Due to federal regulations, some restrictions may apply. Services may be covered by your insurance.*`
- readMore: `* Read More`

## Responsive
- **1440:** panel `1220 × 949`; badge overlapping top-left; text left, 4 bars right.
- **768:** heading scale drops (`h3 28/34`, `h4 20/25`, `h2 32/37`); bars stay full width,
  text left-aligned inside; the badge shrinks to ~`160px` and stays overlapping.
- **390:** **single column** — badge first (still overlapping the panel top-left), then
  "This Includes:", then the 4 bars stacked full-width. The bar `border-radius` stays
  `0 100px 100px 0`; bar height reduces to ~`72px` as the 4th label wraps to 2 lines.
  Fine print and Read More are centred and the panel padding reduces to ~`24px`.

## Assets
- starburst → `public/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/images/offer-starburst.png`
  (background image, NOT an `<img>` — it is a `background-image` in the live DOM)
