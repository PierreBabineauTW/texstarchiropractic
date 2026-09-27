# BEHAVIORS.md — texstarchiropractic.com

All values below come from live `getComputedStyle()` capture (Playwright, 1440/768/390) and
from A/B diffs measured by triggering the state and re-reading the same properties.
Raw data: `RECON.json`, `BEHAVIOR-PROBE.json`, `HEADER-PROBE.json`, `RESPONSIVE-AND-MENU.txt`.

**Stack detected:** WordPress + Muffin theme (`mfn-*`) + Beaver Builder (`mcb-*`) + jQuery 3.7.1.
Third-party embeds: Elfsight (Google Reviews carousel, Google Map), GoHighLevel/LeadConnector
(newsletter form iframe), reCAPTCHA.
**No smooth-scroll library** — `html { scroll-behavior: auto }`, no `.lenis`, no `.locomotive-scroll`.
**No scroll-snap.** No IntersectionObserver reveal animations (only 5 `[data-aos]`-ish matches,
all class-name false positives; no `data-aos` attributes present).

---

## 1. Header — `position` swap on scroll (SCROLL-DRIVEN)

**INTERACTION MODEL: scroll-driven.** Not hover, not click. A scroll listener swaps the header
from an overlaid banner to a slim fixed bar. There is no separate "sticky header template"
visibility toggle in the DOM sense — the `<header id="mfn-header-template">` itself changes
`position`, and its child sections change `display`.

### Trigger
`scrollY >= 192` (the header's own rendered height at ≥1024px). Measured:
`scrollY=180 → position:absolute`, `scrollY=200 → position: fixed`. Threshold = 192px.

### State A — top (scrollY 0–191)
| Property | Value |
|---|---|
| `#mfn-header-template` position | `absolute` |
| header height | `192px` |
| header background | `rgba(0,0,0,0)` (transparent, hero gradient shows through) |
| visible section | `.mcb-section-8cqvr1s3e` (`display: block`, `bg #005EB8`, `padding: 12px 0`) |
| `.mfn-header-mobile-section` | `display: none` |
| `.mfn-header-sticky-section` | `display: none` |
| logo | horizontal white SVG, rendered `486 × 168` |
| CTA 1 | `a.button.button_size_2` "Schedule Appointment" — `background #FDFCFA`, `color #EA7600`, `border 2px solid #FDFCFA`, `padding 16px 20px`, `border-radius 2px`, `font 16px/600`, box `220 × 55` |
| CTA 2 | `a.button.button_size_2` "Contact Us" — same, box `128 × 55` |
| burger | `a.mfn-header-menu-burger` → `i.icon-menu-fine`, `color #FDFCFA`, `font-size 25px` |

### State B — scrolled (scrollY >= 192)
| Property | Value |
|---|---|
| `#mfn-header-template` position | `fixed` |
| header height | `65px` |
| visible section | `.mfn-header-sticky-section.mcb-section-zdpfqj6x6` (`display: block`, `bg #005EB8`, `padding: 5px 0`) |
| `.mcb-section-8cqvr1s3e` | `display: none` |
| CTA 1 | `a.button.button_size_1` — `background transparent`, `color #FDFCFA`, `border 2px solid #FDFCFA`, `padding 16px 20px`, `border-radius 2px`, `font 16px/600` |
| CTA 2 | `a.button.button_size_1` — same |

**Transition:** the section swap is instant (no CSS transition measured on the header).
Muffin toggles `display` on scroll. Implement with a `scroll` listener and a
`position: fixed` + reduced-height class; do **not** animate the height.

### Mobile header (< 1024px) — always fixed
`#mfn-header-template` is `position: fixed` at 390px from scroll 0. Height `89px`.
Visible section: `.mfn-header-mobile-section.mcb-section-wew3xtm6r` (`bg #005EB8`, `padding 8px`).
- logo = spine icon PNG, rendered `42 × 73`, `href https://texstarchiropractic.com`
- `a.button.button_size_1` "Online Scheduler" → `/schedule-consultation/`, box `158 × 50`
- `a.button.button_size_1` "Call Us" → `tel:+15128992228`, box `87 × 50`
- burger `38 × 39`, `i.icon-menu-fine` `font-size 18px`, `color #FDFCFA`

### Desktop horizontal nav
`.mfn-header-menu` exists but computes to **0 × 0 at every width tested** — the desktop
header shows logo + 2 CTAs + burger only. **All navigation lives in the side menu.**
Do not build a horizontal nav bar.

---

## 2. Side menu drawer (CLICK-DRIVEN)

**INTERACTION MODEL: click-driven.** Trigger: the burger `a.mfn-header-menu-burger`
(`data-sidemenu="2314"`) toggles `#mfn-sidemenu-tmpl-2314`. Available at every width.

| Property | Value |
|---|---|
| container | `#mfn-sidemenu-tmpl-2314` |
| position | `fixed`, `top: 0` |
| width | `250px` |
| height | `100dvh` (measured 844px at 390×844) |
| background | `rgb(253, 252, 250)` = `#FDFCFA` |
| z-index | `10000` |
| transition | `0.3s` |
| closed position | `left: 390px` on a 390px viewport → i.e. `left: 100%` (off-canvas right) |
| open position | `left: 140px` → `left: 0` (flush right) |
| content padding | `50px 8px 0` (`.mcb-wrap-inner`) |
| menu list width | `210px` |

### Overlay
`#body_overlay` — `position: fixed`, `background rgba(0,0,0,0.6)`, `z-index 9002`,
`display: none` when closed. Renders as the dim over page content in
`mobile-390-sidemenu-open.png`. `body` gets `overflow: hidden` while open.

### Close button
`<a class="mfn-sidemenu-closebutton">✕</a>` — `position: absolute`, `top: 12px`,
`right: 18px`, box `40 × 40`, `color #EA7600`, `font-size 32px`, `line-height 32px`.
The glyph is the literal character `✕` (U+2715), not an icon font.

### Top-level menu items (4 groups)
`li.menu-item` — `display: flex`, `position: relative`, `font-size 16px`, `line-height 32px`.

`a.mfn-menu-link` (top level):
- `color #73748C` (`rgb(115,116,140)`), `font-size 16px`, `font-weight 600`, `line-height 26px`
- `padding: 8px 0 9px`, width 210, box height 43
- `transition: all`

### Accordion toggle
`a.outer-menu-sub` — `position: absolute`, `right: 0`, `top: 4px`, box `30 × 20`,
anchor `color #005EB8`, `font-size 20px`, `line-height 20px`.
Inner `i.icon-down-open` — `color #EA7600` (the visible glyph colour), `font-size 20px`,
`content: "\e7a7"` (mfn-icons font), **`transition: transform 0.3s ease-out`** →
rotates 180° when the group is expanded.

### Sub-menu
`ul.sub-menu.mfn-submenu` — `padding: 0 0 0 16px`, `font-size 16px`, `line-height 26px`,
`color #382F2D`. Collapsed state has zero measured size.
`li > a.mfn-menu-link` (sub level) — `color #73748C`, `font-size 16px`, `font-weight 600`,
`line-height 26px`, `padding: 10px 0`.

### Menu tree (verbatim)
1. **TexStar Solutions** → `/texstar-solutions/`
   - TexStar Solutions `/texstar-solutions/`
   - Chiropractic Care `/texstar-solutions/chiropractic-care/`
   - Cold Laser Therapy `/texstar-solutions/cold-laser-therapy/`
   - Knee on Trac© Decompression `/texstar-solutions/knee-on-tracsup-decompression/`
   - Spinal Decompression Therapy `/texstar-solutions/spinal-decompression/`
   - Spot Cryotherapy `/texstar-solutions/cryotherapy/`
   - Physical Rehab Therapy
   - Other Advanced Technologies
2. **Conditions Treated** → `/conditions-treated/`
   - Conditions Treated, Whiplash, Pinched Nerves, Neck Pain, Lower Back Pain, Knee Pain, Headaches, Disc Injuries
3. **About Us** → `/about-us/`
   - About Us, Contact Us, Meet Our Doctors, Michael P. Henry DC, Ryan T. Woods DC,
     John E. Jacobson DC, Amy M. Ho DC, Corey J. Miller DC, Insurance & Self Pay, FAQ's,
     Join Our Team, The TexStar Health Blog, Patient Reviews & Testimonials
4. **Hours & Locations** → `/locations/`
   - Hours & Locations, Austin, Bee Cave, Buda, Dripping Springs

### Drawer footer CTAs (below the accordion, per `mobile-390-sidemenu-open.png`)
Two stacked `a.button.button_size_2` — `background #EA7600`, `color #FFFFFF`,
`padding 16px 20px`, `border-radius 2px`, `font-size 16px`, `font-weight 400`,
`line-height 19.2px`, boxes `168 × 51` and `121 × 51`:
- "Online Scheduler" → `/schedule-consultation/`
- "Contact Us"

---

## 3. Reviews carousel (CLICK-DRIVEN, third-party)

**INTERACTION MODEL: click-driven.** Elfsight Google-Reviews widget, Swiper-based.
Located in `section.mcb-section-5c58779c4` at `top: 6483`.

- outer: `es-carousel-layout-container` `display: grid`, `916 × 234`
- `es-carousel-inner` `overflow: hidden`
- `.swiper-wrapper` `display: flex`
- slides `.swiper-slide` width `292`; 3 visible per view
  (classes `swiper-slide-active`, `swiper-slide-visible`, `swiper-slide-next`)
- arrow controls `es-carousel-arrow-control` — box `32 × 32`,
  absolutely positioned at the right edge (`top 6584`), containing a `16 × 16` `es-icon-container`
- slide heights vary (234 / 188 / 211) — the row is **not** equalised; cards size to content
- verified badge `ReviewVerifiedBadge` (`viewBox 0 0 14 14`)
- star row `RatingItemFilledSvg` ×5 per review (`viewBox 0 0 14 14`)
- `ReviewBackground` (`viewBox 0 0 19 13`) behind the stars

The carousel is a live third-party feed. Clone it as a **static-but-interactive** Swiper
clone: same markup shape, same 3-per-view geometry, next/prev arrow that advances by one
slide with a horizontal transform, real review text captured from the live page.

---

## 4. Map section (STATIC)

`section.mcb-section-kbdh2bibb` contains an Elfsight **Google Maps** embed (not a plain
`<iframe>` — the outer `iframe` reports `src: ""` because the map is injected by JS).
Four custom **orange 5-point star** markers (images 19–22: `Star.svg`, natural `48 × 49`,
rendered `44 × 45`, `position: absolute`). A grey `rgba(115,116,140)`-ish map canvas
sits behind them.

Clone as a **static styled map placeholder**: light grey rounded panel + the four orange
star markers at the captured relative positions, plus the section's own link. Do not embed
a live Google Map (no API key, and it would not match pixel-for-pixel).

---

## 5. Hover states

Hover sweep across `a.button`, `.button`, `nav a`, `header a`, `#mfn-header-template a`,
`section a`, `footer a` at 1440px:

| Selector | Result |
|---|---|
| `a.button` | **no change** (`transition: 0.2s`, but no property differs) |
| `.button` | **no change** |
| `header a` | **no change** (`transition: all`) |
| `#mfn-header-template a` | **no change** |
| `section a` | **no change** |
| `footer a` | `color: #382F2D → #005EB8`, `borderColor: #382F2D → #005EB8`, `transition: all` |

**Only footer links have a hover state.** Buttons are flat — do not invent hover styling
for them (this is a common clone mistake here).

---

## 6. Other global behaviour

- `html { scroll-behavior: auto }` — native scrolling, no smooth-scroll library.
- No scroll-snap containers.
- No entrance/reveal animations, no parallax, no `position: sticky` sections.
- Body `overflow` toggles to `hidden` while the side menu is open.
- Third-party fixed overlays present on the live site and **should not** be cloned:
  `.grecaptcha-badge` (z `auto`, bottom-right) and the LeadConnector form iframe.
- Document heights (for scroll QA reference): 1440 → **8502px**, 768 → **9681px**, 390 → taller.

---

## 7. Responsive sweep

### Heading scale (driven by the theme, not hand-tuned per breakpoint)
| Element | 1440 | 768 | 390 |
|---|---|---|---|
| H1 | `50px / 53px` w700 | `43px / 45px` w700 | (see note) |
| H2 | `38px / 44px` w700 | `32px / 37px` w700 | (see note) |
| H3 | `33px / 40px` w700 | `28px / 34px` w700 | (see note) |
| H4 | `24px / 29px` w700 | `20px / 25px` w700 | — |
| H5 | `20px / 25px` w600 | — | `17px / 24px` w600 |

Body `<p>` = **Poppins** `19px / 31px` w500 at desktop. All headings and UI = **Open Sans**.

### Section geometry (1440 / 768 / 390 heights, from the section screenshots)
| Section | 1440 | 768 | 390 |
|---|---|---|---|
| header | 192 | 103 | 89 (fixed) |
| hero | 998 | — | — |
| photo-left (root pain) | 496 | — | — |
| offer box (dark) | 1098 | — | — |
| solutions | 1215 | — | — |
| commit | 767 | — | — |
| map | 305 | — | — |
| local team | 838 | — | — |
| dedicate | 502 | — | — |
| review | 354 | — | — |
| blog | 1009 | — | — |
| footer (total) | 1462 | — | — |

### Layout changes
- **≥1024px** — desktop header variant; 2-column split sections (photo left / text right and
  mirrored); solutions grid 2 × 2; blog 3 across; footer 4 link columns + award block;
  reviews carousel 3 per view.
- **768px** — heading scale drops one step; 2-column sections begin to stack or narrow;
  solutions grid still 2-up.
- **<1024px** — mobile header variant (spine icon + 2 outline buttons + burger),
  header permanently `position: fixed`.
- **390px** — everything single-column: hero stacks (badge above photo), solutions 1-up,
  blog 1-up, footer columns stack, side menu is the only nav.

Reference screenshots for every breakpoint are in
`docs/design-references/texstarchiropractic-com-6d11e6eb/root-8a5edab2/`
(`{viewport}-full.png`, `{viewport}-fold.png`, `{viewport}-sec-{NN}-{name}.png`).
