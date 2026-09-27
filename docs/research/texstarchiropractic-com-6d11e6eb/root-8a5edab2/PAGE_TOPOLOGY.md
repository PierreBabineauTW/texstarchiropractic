# PAGE_TOPOLOGY.md — texstarchiropractic.com `/`

Assembly blueprint. Vertical order = DOM order. Heights measured at 1440px.

## Scroll container / layering

- Normal document scroll on `<body>`. `html { scroll-behavior: auto }`. No smooth-scroll lib.
- No scroll-snap, no `position: sticky` content sections.
- z-index layers (highest first):
  | z | Element | Notes |
  |---|---|---|
  | 10000 | `#mfn-sidemenu-tmpl-2314` | side menu drawer, fixed right |
  | 9002 | `#body_overlay` | dim behind drawer, `rgba(0,0,0,0.6)` |
  | 3 | `#mfn-header-template` | fixed after 192px of scroll |
  | auto | section content | normal flow |

## Section order

| # | Working name | DOM anchor | h@1440 | Interaction model | Screenshot |
|---|---|---|---|---|---|
| 0 | `SiteHeader` | `#mfn-header-template` | 192 → 65 | **scroll-driven** position swap | `*-sec-01-header.png` |
| 0b | `SideMenu` | `#mfn-sidemenu-tmpl-2314` | 100dvh | **click-driven** drawer + accordion | `mobile-390-sidemenu-open.png` |
| 1 | `HeroSection` | `section.mcb-section-beiedfajb` | 998 | static | `*-sec-02-hero.png` |
| 2 | `RootPainSection` | `section.mcb-section-4666cc2d3` | 496 | static | `*-sec-03-photo-left-1.png` |
| 3 | `OfferSection` | `section.mcb-section-776947401` | 1098 | static | `*-sec-04-dark-1.png` |
| 4 | `SolutionsSection` | `section.mcb-section-b08e61f82` | 1215 | static | `*-sec-05-solutions.png` |
| 5 | `CommitSection` | `section.mcb-section-5xnio06og` | 767 | static | `*-sec-06-commit.png` |
| 6 | `MapSection` | `section.mcb-section-kbdh2bibb` | 305 | static (3rd-party map canvas) | `*-sec-07-map.png` |
| 7 | `LocalTeamSection` | `section.mcb-section-bekgzsjfu` | 838 | static | `*-sec-08-local.png` |
| 8 | `DedicateSection` | `section.mcb-section-zhdt1y41o` | 502 | static | `*-sec-09-dedicate.png` |
| 9 | `ReviewsSection` | `section.mcb-section-5c58779c4` | 354 | **click-driven** carousel (3rd-party) | `*-sec-10-review.png` |
| 10 | `BlogSection` | `section.mcb-section-yry5f1s20` | 1009 | static | `*-sec-11-blog.png` |
| 11 | `FooterNewsletter` | `section.mcb-section-p9hbc90lf` | 202 | static (3rd-party form iframe) | `*-sec-12-footer-cta.png` |
| 12 | `FooterColumns` | `section.mcb-section-rs3j8ywn7` | 694 | static, links have hover | `*-sec-13-footer-main.png` |
| 13 | `FooterAbout` | `section.mcb-section-93jz56vrl` | 444 | static, links have hover | `*-sec-14-footer-nav.png` |
| 14 | `FooterBottom` | `section.mcb-section-xku1fndsw` | 122 | static | `*-sec-15-footer-bottom.png` |

Structural skeleton of the live DOM (Beaver Builder), reproduced by the clone's layout:

```
#mfn-header-template           (fixed after 192px scroll)
  └─ 3 <section> variants      (mobile / desktop / sticky — exactly one display:block)
[#mfn-sidemenu-tmpl-2314]      (fixed, right, 250px, z 10000)
#body_overlay                  (fixed, dim, z 9002)
main.sections_group
  └─ .entry-content
       └─ <section> × 11       (each: > .section_wrapper > .wrap > .mcb-wrap-inner > .column)
footer#mfn-footer-tmpl
       └─ <section> × 4
```

## Section internals (what each one actually contains)

**HeroSection** — orange radial gradient bg, 2-column.
Left: eyebrow "TRUST TEXSTAR CHIROPRACTIC" (white 15px) → H1 (50/53 w700 white) → paragraph
(Poppins 19/31 w500 white, phone number is an underlined link) → award card
(`rgba(255,255,255,0.25)` panel, white bold caption + `Best-of-Austin` badge image).
Right: doctor photo, `Dr-John-and-Amy-Website-Hero-Pic` webp, bleeding to the section bottom.

**RootPainSection** — white bg, 2-column, photo LEFT with a curved right edge
(baked border-radius on the image container), text RIGHT.
H2 blue 38/44 → paragraph. The image has `texstar-01@2x.png`.

**OfferSection** — blue gradient panel (`linear-gradient(0deg,#005EB8,#339BFF)`) inset from the
section edges, inside a transparent section (`padding 60px 0`). Contains:
orange starburst badge (bg image `Frame-62@2x.png`, 230×230) with "$98" (H1 white 50/53) and
"New Patient Special:" (H2 white 38/44); "Mention this Special Offer when Scheduling" (H4);
"This Includes:" (H3, twice — one is a duplicate in the DOM); 4 rows, each a
`linear-gradient(#EA7600,#FFB262)` bar with `border-radius: 0 100px 100px 0`, a white icon
and an H4 label; fine print; "*Read More" link.

**SolutionsSection** — cream→white gradient, 2×2 card grid. Each card: white panel,
`box-shadow rgba(1,7,39,0.05) 0 10px 20px`, blue/orange line-art icon, H4 title (24/29
`#382F2D`), paragraph, orange "Learn More" button. Cards: Back Pain, Neck Pain, Knee Pain,
Headaches. Icons are `HUMANBACK-1.png`, `NECK-1.png`, `KNEE-1.png`, `FRECKLES-1.png`.

**CommitSection** — cream→white gradient (0deg), 2-column, text LEFT, photo RIGHT with a
curved left edge. H2 + paragraph + 3 rows, each: orange 5-point star icon, H4 title,
paragraph. Rows: Personalized Care / Long-lasting Results / Holistic Solutions.

**MapSection** — "TexStar Locations" H2 + "Serving the Central Texas area with 4 chiropractic
locations" + a link, then the grey map canvas with 4 orange star markers.

**LocalTeamSection** — 2-column, team photo LEFT (`TexStar-Chiropractic-7.jpg`, with a soft
drop shadow), text RIGHT: H2 + 3 paragraphs with inline links ("Dr. Henry" is a link).

**DedicateSection** — light panel, 2-column. LEFT: orange quote swoosh (`slim-icon-101x500.png`,
73×361) + a pull-quote in H3 33/40 + attribution "– Dr. Michael P. Henry" + orange
"Learn More About Us" button. RIGHT: Dr Henry portrait (`texstar-04@2x-1.png`) with a curved
left edge. Below: "TexStar Chiropractic offers more than just a quick fix" (blue H2, on the
next section).

**ReviewsSection** — cream→white gradient. H2 "Reviews and Testimonials from our Clients" +
"See More Reviews" orange button on the right; subtitle "True stories from pain-free patients";
then the Elfsight review carousel (3 per view, 32×32 next arrow, Google avatars 40×40,
"Read more" toggles, relative timestamps, verified badges).

**BlogSection** — H2 "The TexStar Health Blog" + "View All Blog Posts" orange button;
subtitle "A vast chiropractic knowledge base"; 3 cards: image (`iStock-*` jpg, 307×239),
H5 title 20/25 w600, excerpt, and a **white-filled orange-bordered** "Read more" button
(`button_size_2`: bg `#FFF`, color `#EA7600`, border `0`). Card heights are **not** equalised —
each card's button sits directly under its own text.

**FooterNewsletter** — orange panel (`bg #EA7600`), 2-column. Left: H5 white
"Receive TexStar Health Tips Right in your Inbox". Right: the LeadConnector form iframe
(593×218) — **clone as static inputs**: "Full Name", "Email*" (with an envelope icon), and a
"SUBMIT" button (translucent white border, white uppercase text).

**FooterColumns** — cream→white gradient (`0deg,#F3F0E8,#FFF`) top area. 4 link columns:
OUR LOCATIONS, TEXSTAR SOLUTIONS, CONDITIONS TREATED, TEXSTAR RESOURCES. H6 headings
17/28 w700 uppercase; links 16/26 w600 `#382F2D` with the blue hover.

**FooterAbout** — 4 columns: ABOUT US links, TEXSTAR SOCIAL icons
(Facebook / Instagram / YouTube / Yelp — Font Awesome 5 Brands), the `best-of-atx-vector.svg`
award badge with the "Voted Best Chiropractor in the Austin area by Statesman" H5 below it,
and a right block with the Google reviews pill ("648 reviews ★★★★★ Google") plus a
"Call us: +1 (512) 899-2228" orange button.

**FooterBottom** — `Frame-17.png` colour logo (left) + "© 2024 TexStar Chiropractic. Designed by Voixly." (right).

## Cross-section dependencies

- `SiteHeader` is `position: absolute` at scroll 0 and **overlays** the hero — the hero must not
  reserve space for it and must paint *under* it.
- `SiteHeader` and `SideMenu` are siblings outside `main`; `SideMenu` needs a trigger from
  `SiteHeader` (the burger). Lift that state to a shared client component.
- `FooterNewsletter` form and `ReviewsSection` carousel and `MapSection` are third-party
  embeds — clone them as static emulations, no external requests at runtime.

## Not cloned (deliberate)

- `.grecaptcha-badge` (reCAPTCHA fixed badge)
- LeadConnector/GoHighLevel form iframe internals → static input emulation
- Elfsight runtime scripts → static + locally-interactive clone
- Google Maps tile requests → static styled placeholder with the 4 orange star markers
- `date_label` decorative stripes element (0×0, never painted)
