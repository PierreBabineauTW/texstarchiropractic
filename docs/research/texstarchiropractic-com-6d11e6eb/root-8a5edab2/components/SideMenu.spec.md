# SideMenu Specification

## Overview
- **Target file:** `src/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/SideMenu.tsx`
- **Screenshot:** `docs/design-references/texstarchiropractic-com-6d11e6eb/root-8a5edab2/mobile-390-sidemenu-open.png`
- **Interaction model:** **CLICK-DRIVEN** drawer (open/close) + **CLICK-DRIVEN** accordion.
  Not scroll-driven. Confirmed by clicking the burger in a 390px context: the panel translates
  in over 0.3s.

## DOM structure
```
<>                                     fragment
  <div overlay />                      fixed inset-0, dim, z-9002, click closes
  <aside>                              fixed, right, 250px, z-10000, translate-x
    <button close>                     absolute top-12 right-18, 40x40, orange ✕
    <div content>                      padding 50px 8px 0
      <nav>
        <ul>                           width 210px
          <li>  × 4                    position relative
            <a label/>                 flex, 16px/600/26px, #73748C, padding 8px 0 9px
            <button toggle/>            absolute right-0 top-4, 30x20, ChevronDownIcon
            <ul submenu/>               padding-left 16px (collapsed = height 0)
              <li><a/></li>             16px/600/26px, #73748C, padding 10px 0
      </nav>
      <div ctas>                       2 stacked buttons, margin-top ~30px
        <Button variant="solidOrange"/> "Online Scheduler"
        <Button variant="solidOrange"/> "Contact Us"
    </div>
  </aside>
</>
```

## Computed Styles (exact)

### Panel
| Property | Value |
|---|---|
| position | `fixed` |
| top | `0` |
| width | `250px` |
| height | `100dvh` |
| background | `#FDFCFA` (`rgb(253, 252, 250)`) |
| z-index | `10000` |
| transition | `0.3s` |
| box-shadow | `none` |

### Overlay
| Property | Value |
|---|---|
| position | `fixed`, `inset: 0` |
| background | `rgba(0, 0, 0, 0.6)` |
| z-index | `9002` |
| opacity | `1` when open, `0` + `pointer-events-none` when closed |

### Close button
| Property | Value |
|---|---|
| position | `absolute` |
| top | `12px` |
| right | `18px` |
| box | `40 × 40` |
| color | `#EA7600` |
| font-size | `32px` |
| line-height | `32px` |
| glyph | the literal `✕` character (U+2715) — `CloseIcon` from shared/icons is the SVG equivalent |

### Content padding
`.mcb-wrap-inner` → `padding: 50px 8px 0`. The nav `<ul>` is `210px` wide
(250 − 8 − 8 = 234 column, 210 menu).

### Top-level items
`li.menu-item`: `display: flex`, `position: relative`, `font-size: 16px`, `line-height: 32px`,
width `210`, box height `49`.

`a.mfn-menu-link` (top level):
- `color: #73748C` (`rgb(115, 116, 140)`)
- `font-size: 16px`, `font-weight: 600`, `line-height: 26px`
- `padding: 8px 0 9px`
- `transition: all`
- No hover state was captured for the menu; keep it flat.

### Accordion toggle
- `a.outer-menu-sub`: `position: absolute`, `right: 0`, `top: 4px`, box `30 × 20`,
  `font-size: 20px`, `line-height: 20px`, anchor colour `#005EB8` (not painted).
- inner `<i class="icon-down-open">`: **`color: #EA7600`**, `font-size: 20px`,
  **`transition: transform 0.3s ease-out`**. This is the visible chevron colour.
- Open state: rotate `180deg`.

### Sub-menu
- `ul.sub-menu`: `padding: 0 0 0 16px`, `font-size: 16px`, `line-height: 26px`, `color: #382F2D`.
- Collapsed: height `0`, not visible.
- `li > a`: `color: #73748C`, `16px / 600 / 26px`, `padding: 10px 0`.

## States & Behaviors

### Open / close
- **Trigger:** burger click (`onToggleMenu` prop from the page shell) opens; close button,
  overlay click, or `Escape` closes.
- **Closed:** `transform: translateX(100%)` — measured `left: 390px` on a 390px viewport.
- **Open:** `transform: translateX(0)` — measured `left: 140px` (= viewport − 250).
- **Transition:** `0.3s` on the transform (matches the measured `transition: 0.3s`).
- Overlay fades with the same `0.3s`.
- While open, set `document.body.style.overflow = "hidden"` (the live site does this;
  measured `overflow: hidden auto` on `<body>`). Restore on close.
- **Only one group open at a time** (live classes: `mfn-menu-submenu-on mfn-menu-submenu-toggled`).
  Clicking an open group collapses it; clicking another closes the first and opens the second.

### Implementation
`"use client"`. Props: `{ open: boolean; onClose: () => void }`.
Render the group list from `siteContent.navigation` (already in
`src/components/sites/texstarchiropractic-com-6d11e6eb/shared/content.ts`) — **do not hardcode
the menu**. Use `NavGroup` / `NavChild` from
`src/types/texstarchiropractic-com-6d11e6eb.ts`.

Keep the panel mounted and animate `transform`, so the 0.3s slide is actually visible.
Add `aria-expanded` on each toggle and `aria-hidden` on the collapsed submenu.

## Responsive
Width is a fixed `250px` at every viewport — the drawer is 250px even on a 1440px screen.
It is anchored to the right edge. Available at all widths (the burger exists on desktop too).

## Assets
No images. Icons: `ChevronDownIcon`, `CloseIcon` from
`src/components/sites/texstarchiropractic-com-6d11e6eb/shared/icons.tsx`.
Buttons: `Button` from the site `shared` namespace, variant `solidOrange`.

## Text Content
Comes entirely from `siteContent.navigation` — 4 groups:
1. **TexStar Solutions** — 8 children
2. **Conditions Treated** — 8 children
3. **About Us** — 12 children
4. **Hours & Locations** — 5 children
Plus the two drawer CTAs: "Online Scheduler", "Contact Us".
