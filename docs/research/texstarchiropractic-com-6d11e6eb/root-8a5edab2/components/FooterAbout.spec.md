# FooterAbout Specification

## Overview
- **Target file:** `src/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/FooterAbout.tsx`
- **Screenshot:** `.../desktop-1440-sec-14-footer-nav.png`
- **Interaction model:** static, with the same footer link hover as `FooterColumns`.

## DOM structure
```
<section>                        padding 15px 0 0 ; white bg
  └─ inner (max-width 1220, mx-auto, flex, 4 blocks, gap 48px)
       ├─ BLOCK 1  About Us
       │    ├─ <h6> ABOUT US
       │    └─ <ul> 4 links
       ├─ BLOCK 2  Social
       │    ├─ <h6> TEXSTAR SOCIAL
       │    └─ <ul> 4 icon links (row, gap 24px)
       ├─ BLOCK 3  Award
       │    ├─ <img> badge (best-of-atx-vector.svg)
       │    └─ <h5> Voted Best Chiropractor in the Austin area by Statesman
       └─ BLOCK 4  Reviews + phone
            ├─ <a> Google reviews pill   ("648 reviews ★★★★★ Google")
            └─ <Button variant="solidOrange">Call us: +1 (512) 899-2228
```

## Computed Styles

### Section
- `position: relative`, `display: block`, `background-color: transparent` (white)
- `padding: 15px 0px 0px`
- height `444px` at 1440

### Inner
- `display: flex`, `align-items: flex-start`, gap ~`48px`
- Block widths at 1440: About Us ~`150px`, Social ~`250px`, Award ~`260px`, Reviews ~`380px`
- The award block is **centred**; the reviews block is flush right

### `<h6>` headings
- identical to `FooterColumns`: `17px / 28px` w700 `#382F2D`, `text-transform: uppercase`,
  `margin-bottom ~`12px`

### Block 1 links
- `16px / 26px` w600 `#382F2D`, `transition: all`, hover `color: #005EB8`
- vertical gap ~`10px`
- text: `The TexStar Difference`, `Meet Our Doctors`, `Hours and Locations`, `Join the Team`

### Block 2 social icons
- `ul` is `display: flex`, `flex-direction: row`, `gap: 24px`, `margin-top: 4px`
- each icon rendered `22 × 22`, `color: #382F2D`
- **No visible circular background** in the capture — the glyphs sit directly on the white
  background. They become `#005EB8` on hover (same `transition: all` rule).
- `aria-label` = the network name; add a visually-hidden `<span>` for the accessible name
- icons from the shared module: `FacebookIcon`, `InstagramIcon`, `YoutubeIcon`, `YelpIcon`
- map from `SocialLink.icon` (`"facebook" | "instagram" | "youtube" | "yelp"`)

### Block 3 award badge
- `public/.../images/badge-best-of-atx.svg`, natural `239 × 150`, rendered `~281 × 176`
- centred in its block
- `margin-bottom ~`16px`

### Block 3 caption (`<h5>`)
- `font-size: 20px`, `line-height: 25px`, `font-weight: 600`, `color: #382F2D`
- `text-align: center`
- `max-width: ~300px`
- renders 3 lines: "Voted Best Chiropractor in / the Austin area by / Statesman"

### Block 4 Google reviews pill
- an `<a>` shaped as a horizontal bar
- `background-color: #EA7600` (`rgb(234, 118, 0)`) — flat orange
- `border-radius: 0`
- `height: 60px`, `width: 100%` of the block
- `display: flex`, `align-items: center`, `justify-content: space-between`,
  `padding: 0 20px`, `gap: 12px`
- contents, left to right:
  - text `648 reviews` — `16px / 24px` w600 `#FFFFFF`
  - 5 × `StarIcon` filled, `18 × 18`, `color: #FFFFFF`
  - the word `Google` — rendered in the **Google logo colours** via `GoogleIcon`
    (blue `#4285F4` G, red `#EA4335` o, yellow `#FBBC05` o, blue `#4285F4` g, green `#34A853` l, red `#EA4335` e)
- In the screenshot "Google" is a coloured wordmark. Either use the `GoogleIcon` component
  from the shared module at `~120 × 28`, or set the word in `font-sans font-medium text-[22px]`
  with the four brand spans. `GoogleIcon` is preferred.
- `margin-bottom ~`40px`

### Block 4 phone button
- `Button variant="solidOrange"` — text `Call us: +1 (512) 899-2228`
- `href: tel:+15128992228`
- measured `~334 × 51`
- **No hover state** (it is a `Button`, and buttons have none)

## States & Behaviors
| Element | Trigger | Change |
|---|---|---|
| About Us links | hover | `color: #382F2D → #005EB8`, `transition: all` |
| social icons | hover | `color: #382F2D → #005EB8` |
| reviews pill | hover | none measured — keep flat |
| phone button | hover | none (buttons are flat site-wide) |

## Text Content (verbatim)
- `ABOUT US` → links from `siteContent.footerAboutLinks`
- `TEXSTAR SOCIAL` → 4 icons from `siteContent.social`
- award caption: `Voted Best Chiropractor in the Austin area by Statesman`
- reviews pill: `648 reviews` + 5 stars + `Google`
- phone button: `Call us: +1 (512) 899-2228`

## Responsive
- **1440:** 4 blocks in a row, awards centred, reviews block flush right.
- **768:** 2 × 2 — About Us + Social on row 1, Award + Reviews on row 2. Award and reviews
  blocks each take half the width. `h5 18/23`.
- **390:** **single column**, stacked in DOM order (About Us, Social, Award, Reviews), all
  left-aligned except the award caption which stays centred; the award badge scales to
  `~200 × 126`; the reviews pill and phone button both go full width.

## Assets
- `public/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/images/badge-best-of-atx.svg` (239×150)
- Icons: `FacebookIcon`, `InstagramIcon`, `YoutubeIcon`, `YelpIcon`, `StarIcon`, `GoogleIcon`
  from `src/components/sites/texstarchiropractic-com-6d11e6eb/shared/icons.tsx`
