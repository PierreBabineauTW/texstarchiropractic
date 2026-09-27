# FooterBottom Specification

## Overview
- **Target file:** `src/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/FooterBottom.tsx`
- **Screenshot:** `.../desktop-1440-sec-15-footer-bottom.png`
- **Interaction model:** static. No hover on either element.

## DOM structure
```
<section>                        padding 30px 0 0
  └─ inner (max-width 1220, mx-auto, flex, justify-between, items-center)
       ├─ <img> colour logo (left)
       └─ <p> © 2024 TexStar Chiropractic. Designed by Voixly.   (right)
```

## Computed Styles

### Section
- `position: relative`, `display: block`
- `background-color`: white
- `padding: 30px 0px 0px`
- height `122px` at 1440
- A hairline top border is faintly visible in the screenshot across the full width —
  `border-top: 1px solid #E5E3DF`. Use it.

### Inner
- `display: flex`, `align-items: center`, `justify-content: space-between`, `gap: 24px`
- max-width `1220px`, centred

### Logo
- `public/.../images/logo-texstar-color-horizontal.png`, natural `150 × 50`,
  rendered `~150 × 50`
- This is the **full-colour** wordmark (blue "TEX" + orange "STAR" + grey "CHIROPRACTIC"),
  not the white one used in the header
- `alt="TexStar Chiropractic"`

### Copyright (`<p>`)
- `font-size: 12.8px` (measured — this is a fractional value, keep it or use `text-[13px]`
  which rounds to the same 13px glyph box)
- `line-height: 26px`
- `font-weight: 400`
- `color: #382F2D`
- `text-align: right`
- text: `© 2024 TexStar Chiropractic. Designed by Voixly.`

## States & Behaviors
None. No hover, no link wrapping (in the live capture "Voixly" is plain text, not a link —
check the screenshot: it is not underlined and not blue, so render it as plain text).

## Text Content (verbatim, from `siteContent.footerNote`)
- `© 2024 TexStar Chiropractic. Designed by Voixly.`

## Responsive
- **1440:** logo left, text right, one row. Logo `150×50`, text `12.8px`.
- **768:** unchanged, one row.
- **390:** **stacked and centred** — logo on top, text below, `text-align: center`.
  Logo scales to `~120×40`; text `12.8px`. Add `padding-bottom: 24px` so the footer does not
  end flush against the viewport edge.

## Assets
- `public/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/images/logo-texstar-color-horizontal.png` (150×50)
