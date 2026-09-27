# FooterColumns Specification

## Overview
- **Target file:** `src/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/FooterColumns.tsx`
- **Screenshot:** `.../desktop-1440-sec-13-footer-main.png`
- **Interaction model:** static, **but this is the only place on the site with a hover state.**

## DOM structure
```
<section>                        padding 65px 0 0 ; .ts-gradient-footer
  └─ inner (max-width 1220, mx-auto)
       └─ grid  4 equal columns, gap 48px
            └─ <div> × 4
                 ├─ <h6> heading
                 └─ <ul>  flex column, gap ~10px
                      └─ <li><a/></li>
```

## Computed Styles

### Section
- `position: relative`, `display: block`
- `background-image: linear-gradient(0deg, rgb(243, 240, 232) 0%, rgb(255, 255, 255) 100%)`
  → the `.ts-gradient-footer` utility in `globals.css`
  (this is the **0deg** variant; the solutions/reviews/blog sections use the un-suffixed one)
- `padding: 65px 0px 0px`
- height `694px` at 1440

### Inner / grid
- `display: grid`, `grid-template-columns: repeat(4, 1fr)`, `gap: 48px`
- measured each column ~`273px` wide within a `1220px` inner
- The 4 columns are top-aligned; they do **not** stretch to a common height (the last column
  has 7 links and simply runs longer)

### Heading (`<h6>`)
- `font-size: 17px`, `line-height: 28px`, `font-weight: 700`, `color: #382F2D`
- `text-transform: uppercase` (text is already uppercase in the content)
- `margin-bottom ~`12px`

### Links (`<a>`)
- `font-size: 16px`, `line-height: 26px`, `font-weight: 600`, `color: #382F2D`
- `text-decoration: none`
- `transition: all`
- vertical gap between links ~`10px` (`ul` is `display: flex; flex-direction: column`)

### Hover — the measured behaviour
A/B diff on `footer a` (this section and `FooterAbout`):
| Property | Rest | Hover |
|---|---|---|
| `color` | `rgb(56, 47, 45)` `#382F2D` | `rgb(0, 94, 184)` `#005EB8` |
| `borderColor` | `rgb(56, 47, 45)` | `rgb(0, 94, 184)` |
| `transition` | `all` | — |

So: `hover:text-[#005EB8]`. The `border-color` change is a side effect of a global
`transition: all` on a 0-width border; **only the colour change is actually visible** — do not
add a visible underline or border. No other property changes.

## States & Behaviors
| Behaviour | Trigger | Detail |
|---|---|---|
| link hover | pointer over any link | `color: #382F2D → #005EB8`, `transition: all` |

Nothing else. No section-level animation, no accordion (all four columns are always open).

## Text Content (verbatim, from `siteContent.footerColumns`)

**OUR LOCATIONS** — Austin, Bee Cave, Buda, Dripping Springs

**TEXSTAR SOLUTIONS** — Chiropractic Care, Spinal Decompression, Physical Rehab,
Knee on Trac© Decompression, Cryotherapy, Cold Laser Therapy, Other Advanced Technologies

**CONDITIONS TREATED** — Neck Pain, Back Pain, Knee Pain, Headaches, Pinched Nerves,
Disc Injuries, Whiplash

**TEXSTAR RESOURCES** — Health Blog, FAQ's, Reviews and Testimonials, Contact Us,
Schedule Appointment

All hrefs are absolute external URLs already in the content file. Render a plain `<a>` —
these point at another origin, so `next/link` would be wrong.

## Responsive
- **1440:** 4 equal columns, gap `48px`, `h6 17/28`, links `16/26`.
- **768:** 2 × 2 grid, gap `32px 40px`.
- **390:** **single column**, all four stacked, gap `32px`. Links `16/26` unchanged; headings
  unchanged. Add a `~40px` bottom margin below the last column.

## Assets
None.
