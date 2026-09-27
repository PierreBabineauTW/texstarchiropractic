# MapSection Specification

## Overview
- **Target file:** `src/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/MapSection.tsx`
- **Screenshot:** `.../desktop-1440-sec-07-map.png`
- **Interaction model:** static. The live section is a **third-party Elfsight Google Map** — see
  "Third-party substitution" below.

## Third-party substitution (IMPORTANT)
The live map is injected by Elfsight's JS into a container; the enclosing `<iframe>` reports
`src: ""` and the tiles come from `maps.googleapis.com` at runtime. Reproducing a live Google
Map is neither possible offline nor pixel-identical. Build a **static styled map placeholder**
that matches the captured geometry:
- a light neutral-grey rounded panel filling the content width
- the four orange star markers at the percentage offsets in `siteContent.locations.markers`
  (`x`, `y` are 0–100 percentages of the panel box)
- a subtle shadow on the panel

The four locations photos (`files.elfsightcdn.com/.../TexStar-Chiropractic-*.jpg`, rendered
`114×76` each) were Elfsight popovers that only appear on marker interaction. They are
**out of scope** — do not download or build them.

## DOM structure
```
<section>                        padding 25px 0 100px ; white bg
  └─ inner (max-width 1220, mx-auto)
       ├─ <h2> TexStar Locations
       ├─ row: <p> subheading   +   <Button variant="solidOrange">Locations & Hours
       └─ <div map panel>
            ├─ (grey canvas)
            └─ <a marker> × 4    position absolute
```

## Computed Styles

### Section
- `position: relative`, `display: block`, `background-color: transparent`
- `padding: 25px 0px 100px`
- height `305px` at 1440

### `<h2>`
- `38px / 44px` w700 `#005EB8`
- In the screenshot the button sits on the **same visual row as the h2, right-aligned**.
  The h2 and the subheading are on the left, the button on the right, vertically centred
  against the h2. Implement as a `flex items-center justify-between` row:
  left = h2 + p, right = the button.

### Subheading `<p>`
- `16px / 26px` w400 `#382F2D`

### Button
- `Button variant="solidOrange"`, "Locations & Hours", measured `176 × 51`

### Map panel
- `position: relative`
- `width: 100%` of the `1220px` inner, `height: 225px` at 1440
- `background-color`: a light neutral grey — the live map's water/land base reads as
  `rgb(115, 116, 140)`-adjacent; use a flat `#E8EAED` (a value present in the site's own
  palette as `rgb(232, 234, 237)`)
- `border-radius: 0`
- `overflow: hidden` (so markers clip at the edges)
- `box-shadow: rgba(0, 0, 0, 0.2) 2px 0px 4px 0px` — a soft left-edge shadow is visible in the
  screenshot along the left border of the panel

### Markers
- `<a>` per location, `position: absolute`, `left: {x}%`, `top: {y}%`,
  `transform: translate(-50%, -50%)`
- marker glyph: the downloaded `map-marker-star.svg`, rendered `44 × 45`
  (natural `48 × 49`)
- `alt=""`, `aria-label={location.name}`
- No hover state captured. Keep them flat.

## States & Behaviors
None. Static. The markers are links only.

## Text Content (verbatim, from `siteContent.locations`)
- heading: `TexStar Locations`
- subheading: `Serving the Central Texas area with 4 chiropractic locations`
- cta: `Locations & Hours`
- markers: Austin `(34, 47)`, Bee Cave `(40, 30)`, Buda `(58, 55)`, Dripping Springs `(40, 68)`

## Responsive
- **1440:** panel `1220 × 225`; heading row is `justify-between`.
- **768:** panel height ~`300px`; `h2 32/37`; the button drops below the subheading
  (stack to `flex-col items-start gap 16px`).
- **390:** panel `height: 260px`, full-bleed to the viewport edges (drop the inner padding
  on the panel only). `h2 ~28/33`. Markers stay at the same percentages, `32×32` glyph.

## Assets
- marker → `public/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/images/map-marker-star.svg`
