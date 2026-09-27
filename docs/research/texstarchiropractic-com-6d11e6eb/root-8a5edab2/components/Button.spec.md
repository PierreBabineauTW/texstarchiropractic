# Button Specification

## Overview
- **Target file:** `src/components/sites/texstarchiropractic-com-6d11e6eb/shared/Button.tsx`
- **Screenshot:** `docs/design-references/texstarchiropractic-com-6d11e6eb/root-8a5edab2/desktop-1440-fold.png` (header CTAs), `.../desktop-1440-sec-05-solutions.png` (solid orange)
- **Interaction model:** static link. **There is NO hover state on any button on this site** — measured A/B hover diff across `a.button` / `.button` produced zero changed properties. Do not add hover styling.

## API
```ts
type ButtonVariant = "solidOrange" | "solidWhite" | "outlineWhite" | "whiteOnOrange";
type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;   // default "solidOrange"
  className?: string;
};
```
Render a plain `<a href>` (no `next/link` — every href is an absolute external URL or a `tel:`).

## Variants — exact computed values

| variant | background | background-image | color | border | padding | border-radius | font | line-height | rendered box |
|---|---|---|---|---|---|---|---|---|---|
| `solidWhite` | `rgb(253, 252, 250)` | none | `rgb(234, 118, 0)` | `2px solid rgb(253, 252, 250)` | `16px 20px` | `2px` | `16px` w600 | normal | `220×55`, `128×55` |
| `outlineWhite` | `rgba(234,118,0,0)` (transparent) | none | `rgb(253, 252, 250)` | `2px solid rgb(253, 252, 250)` | `16px 20px` | `2px` | `16px` w600 | normal | `220×55` |
| `solidOrange` | `rgb(234, 118, 0)` | none | `rgb(255, 255, 255)` | `0px solid rgba(0,0,0,0)` | `16px 20px` | `2px` | `16px` w400 | `19.2px` | `126×51`, `176×51`, `168×51`, `121×51` |
| `whiteOnOrange` | `rgb(255, 255, 255)` | none | `rgb(234, 118, 0)` | `2px solid rgb(255,255,255)` | `16px 20px` | `2px` | `16px` w400 | — | `223×55` |

## Tailwind mapping
- `solidWhite` → `bg-[#FDFCFA] text-[#EA7600] border-2 border-[#FDFCFA] rounded-[2px] px-5 py-4 text-base font-semibold`
- `outlineWhite` → `bg-transparent text-[#FDFCFA] border-2 border-[#FDFCFA] rounded-[2px] px-5 py-4 text-base font-semibold`
- `solidOrange` → `bg-[#EA7600] text-white rounded-[2px] px-5 py-4 text-base font-normal leading-[1.2]`
- `whiteOnOrange` → `bg-white text-[#EA7600] border-2 border-white rounded-[2px] px-5 py-4 text-base font-normal`

All variants: `inline-flex items-center justify-center whitespace-nowrap`.

`py-4` = 16px and `px-5` = 20px, so the padding matches. Because the border is `2px` on some
variants and `0` on others, rendered heights differ (55 vs 51) — that is correct, keep it.

## Buttons in use
| Where | text | variant |
|---|---|---|
| header (top state) | "Schedule Appointment", "Contact Us" | `solidWhite` |
| header (scrolled state) | "Schedule Appointment", "Contact Us" | `outlineWhite` |
| mobile header | "Online Scheduler", "Call Us" | `outlineWhite` |
| side menu footer | "Online Scheduler", "Contact Us" | `solidOrange` |
| solutions cards | "Learn More" ×4 | `solidOrange` |
| commit | "Locations & Hours" | `solidOrange` |
| dedicate | "Learn More About Us" | `solidOrange` |
| map | "Locations & Hours" | `solidOrange` |
| reviews | "See More Reviews" | `solidOrange` |
| blog cards | "Read more" ×3 | `whiteOnOrange` |
| blog header | "View All Blog Posts" | `solidOrange` |
| footer about | "Call us: +1 (512) 899-2228" | `solidOrange` |
| footer newsletter | "SUBMIT" | custom — see `FooterNewsletter` spec, not this component |

## States & Behaviors
- **Hover:** none (verified).
- **Focus:** leave the browser default.
- **Active:** none.

## Responsive
No variant-specific responsive rules; the button keeps its padding at all widths. The mobile
header buttons measure `158×50` and `87×50` at 390px purely from text length + padding.

## Assets
None. Icons come from `shared/icons.tsx` if a caller passes one as `children`.
