# LocalTeamSection Specification

## Overview
- **Target file:** `src/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/LocalTeamSection.tsx`
- **Screenshot:** `.../desktop-1440-sec-08-local.png`
- **Interaction model:** static.

## DOM structure
```
<section>                        padding 80px 0 50px ; white bg
  └─ inner (max-width 1220, mx-auto, flex, 2 cols, gap ~80px)
       ├─ LEFT photo
       │    └─ <div frame>   soft drop shadow, no curve
       │         └─ <img>
       └─ RIGHT text
            ├─ <h2>
            └─ <p> × 3   (paragraph 3 contains an inline link)
```

## Computed Styles

### Section
- `position: relative`, `display: block`, `background-color: transparent`
- `padding: 80px 0px 50px`
- height `838px` at 1440

### Inner row
- `display: flex`, `align-items: center`, gap ~`96px`
- photo column `556 × 466` at 1440; text column ~`556px`

### Photo frame
- **No curved edge here** (unlike Hero/RootPain/Commit) — a plain rectangle
- natural `556 × 466`, rendered `556 × 466`
- `object-fit: cover`
- `box-shadow`: a soft, wide, low-opacity drop shadow is clearly visible in the screenshot,
  falling down-right. Use `0 18px 40px rgba(0, 0, 0, 0.18)`.
- `border-radius: 0`

### `<h2>`
- `38px / 44px` w700 `#005EB8`
- Text wraps to 2 lines: "Your TexStar Local / Chiropractic Team"
- `margin-bottom ~`16px`

### Paragraphs (`<p>`)
- `16px / 26px`, `font-weight: 400`, `color: #382F2D`
- Paragraph 1: 5 lines, no trailing gap beyond the standard margin
- Paragraph 2: 5 lines
- Paragraph 3: 4 lines
- vertical gap between paragraphs ~`24px`
- max-width ~`556px`

### Inline link (paragraph 3)
- the text `Dr. Henry` is an `<a>` → `https://texstarchiropractic.com/about-us/michael-p-henry-dc/`
- rendered **blue** `#005EB8`, **not** underlined in the screenshot
- `transition: all`
- This is the same colour it is at rest — the footer link hover (`#382F2D → #005EB8`) does not
  apply here because this link is already blue.

## States & Behaviors
None. Static. Only the inline link is a link; no card, no hover lift.

## Text Content (verbatim, from `siteContent.localTeam`)
- heading: `Your TexStar Local Chiropractic Team`
- paragraphs, in order:
  1. `Dr. Michael P. Henry, was born and raised here in Austin and has worked in the health care field for over 20 years. Early in his career he realized that the standard health care model in our area is designed to simply cover up symptoms with treatments that can have devastating long term effects.`
  2. `In 2011, Dr. Henry established TexStar Chiropractic with the mission of providing access for all central Texans to a better approach to health care. With a team of likeminded doctors and staff TexStar has helped hundreds of patients get back the quality of life that they deserve by addressing the root causes of their conditions and giving patients the tools they needed to overcome them.`
  3. `The results that TexStar has produced earned Dr. Henry multiple awards and honors over the years and led to his appointment to the Texas Board of Chiropractic Examiners. With 4 local locations, highly skilled doctors and a dedicated staff—the TexStar team is here to help you achieve your healthcare goals.`
     — with `Dr. Henry` rendered as the blue inline link.

The content model splits each paragraph into `text` + `links[]`. Render by walking the string
and wrapping the matching label; do not hand-concatenate two hardcoded strings (the link label
`Dr. Henry` also occurs inside paragraph 3's prose, so a naive `replace` can mis-target —
wrap the **first** match that is a whole word).

## Responsive
- **1440:** photo left, text right, gap ~`96px`.
- **768:** gap ~`48px`; `h2 32/37`; photo shrinks to ~`46%` width.
- **390:** **single column, photo first then text**; `h2 ~28/33`; photo full-width;
  paragraph gap `20px`.

## Assets
- image → `public/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/images/local-team.jpg`
  (natural `556 × 466`)
- alt: `TexStar team of doctors standing on stairs`
