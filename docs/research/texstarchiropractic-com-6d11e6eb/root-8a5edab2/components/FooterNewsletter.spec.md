# FooterNewsletter Specification

## Overview
- **Target file:** `src/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/FooterNewsletter.tsx`
- **Screenshot:** `.../desktop-1440-sec-12-footer-cta.png`
- **Interaction model:** static visual clone. The live widget is a GoHighLevel/LeadConnector
  form **inside an iframe** (`https://api.leadconnectorhq.com/widget/form/ovVLOuB785HzbPbvtcXR`,
  measured `593 × 218`) plus an invisible reCAPTCHA. Build a local static form — do **not**
  embed the iframe, do not post anywhere.

## DOM structure
```
<section>                        padding 0 ; white
  └─ panel (max-width ~1104, mx-auto)  bg #EA7600
       ├─ LEFT  <h5> heading (white)
       └─ RIGHT  <form>
            ├─ <input> Full Name
            ├─ <div> envelope icon + <input> Email*
            └─ <button> SUBMIT
```

## Computed Styles

### Section / panel
- `position: relative`, `display: block`
- `padding: 0px`
- height `202px` at 1440
- panel `background-color: #EA7600` (`rgb(234, 118, 0)`) — a **flat** orange, no gradient
- panel measures `~1104 × 202`, centred, with white gutters either side at 1440
- `display: flex`, `align-items: center`, `justify-content: space-between`
- `padding: 40px 60px`

### Heading (`<h5>`)
- `font-size: 20px`, `line-height: 25px`, `font-weight: 600`, `color: #FFFFFF`
- Renders to 2 lines: "Receive TexStar Health Tips / Right in your Inbox"
- `max-width: ~320px`

### Form
- `display: flex`, `flex-direction: column`, `gap: 16px`
- `width: 170px` per the screenshot proportions — the inputs are noticeably **narrow**
  (~170px wide) and stacked, with the SUBMIT button full-panel-width below
- measured iframe `593 × 218`, so keep the form's total height ~`218px`

### Inputs
- `background-color: #FFFFFF`
- `border: 0` (no visible border in the screenshot)
- `border-radius: 4px`
- `height: 50px`
- `padding: 0 16px`
- `font-size: 16px`, `font-weight: 400`, `color: #382F2D`
- `placeholder-color`: a muted grey, `#8A8A8A` (present in the site's measured greys)
- placeholders, verbatim: `Full Name` and `Email*` (the asterisk is literal, not a required marker)
- the Email field is wrapped in a `position: relative` div holding a small
  `EnvelopeIcon` (`16 × 16`, `color: #73748C`) at `left: 12px`, `top: 50%`, and the input gets
  `padding-left: 40px`
- **No visible focus ring in the capture.** Add a subtle `focus:outline-none focus:ring-2
  focus:ring-white/60` for usability — this is an accessibility affordance, not a design change.

### SUBMIT button
- measured `168 × 51` in the side-menu clone; in this panel it spans the full form width
- `background-color`: translucent white over the orange — reads as roughly
  `rgba(255, 255, 255, 0.28)`
- `color: #FFFFFF`
- `border: 1px solid rgba(255, 255, 255, 0.75)`
- `border-radius: 4px`
- `height: 51px`
- `font-size: 16px`, `font-weight: 400`, `letter-spacing: 0.5px`,
  `text-transform: uppercase`
- text: `SUBMIT`
- **Not** the shared `Button` — the shape, uppercase treatment and translucent fill all differ.
  Build it locally.

## States & Behaviors
| Behaviour | Trigger | Detail |
|---|---|---|
| submit | click SUBMIT | `onSubmit` calls `e.preventDefault()`. Real submission is out of scope. Optionally toggle a local "Thanks" line — but the original shows nothing, so **do not** add one. |
| hover | — | no hover state was captured; keep it flat |

No client-side validation, no error states, no success state — the original has none.

## Text Content (verbatim, from `siteContent.newsletter`)
- heading: `Receive TexStar Health Tips Right in your Inbox`
- placeholders: `Full Name`, `Email*`
- button: `SUBMIT`

## Responsive
- **1440:** side-by-side, heading left, form right. Panel `~1104 × 202`.
- **768:** still side-by-side but the form widens to ~`260px`; heading `h5 18/23`; panel
  padding `32px 40px`.
- **390:** **stacked** — heading first, form below, form `width: 100%`, panel padding
  `28px 20px`. Panel height grows to ~`360px`. Button stays full width.

## Assets
No images. Icon: `EnvelopeIcon` from
`src/components/sites/texstarchiropractic-com-6d11e6eb/shared/icons.tsx`.
