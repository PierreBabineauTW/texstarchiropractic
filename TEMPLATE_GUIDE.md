# TEMPLATE_GUIDE

A complete, production-ready Next.js 16 site for a multi-location chiropractic
clinic, cloned from `texstarchiropractic.com` and reworked into a reusable
starting point for any business in the same sector.

Everything a new owner needs to change lives in **two files**. Everything else is
presentation.

| What | Where |
| --- | --- |
| Site-wide config: URL, name, booking link, form provider | `src/lib/site.ts` |
| All copy, images, navigation, footer, services, conditions, team, locations | `src/components/sites/texstarchiropractic-com-6d11e6eb/shared/content.ts` |

---

## 1. Required before launch

### 1.1 Environment

```bash
cp .env.example .env.local
```

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | **yes** | Canonical origin. Drives canonical tags, OpenGraph URLs, `robots.txt` and `sitemap.xml`. |
| `CONTACT_FORM_ENDPOINT` | to enable forms | Server-only. URL that receives `POST /api/contact`. |
| `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` | no | Public hint only; never put a secret in a `NEXT_PUBLIC_*` var. |
| `NEXT_PUBLIC_GA_ID` | no | Only if you add the matching integration. Nothing ships with it. |

### 1.2 Fields that are deliberately empty

These have no verified source value, so they ship empty rather than invented.
**A component omits the element when the value is empty — nothing renders a
placeholder to a visitor.** Fill them in before you go live.

| Field | File | Why it is empty |
| --- | --- | --- |
| `siteConfig.legalName` | `src/lib/site.ts` | Registered entity name is unknown. |
| `servicesPage.items[].summary` (6 of 7) | `content.ts` | No source copy existed for the advanced technologies. |
| `teamPage.members[].bio` (all 5) | `content.ts` | Doctor bios are not published. Names and `DC` credentials are real. |
| `teamPage.members[].photo` (all 5) | `content.ts` | No portraits were available. |
| `locationsPage.items[].addressLines` | `content.ts` | Street addresses are not published. Area names are real. |
| `locationsPage.items[].phone` | `content.ts` | Per-location numbers are not published. The main number is real. |
| `locationsPage.items[].hours` | `content.ts` | Opening hours are not published. |

Until an address is set, the locations page says *"Street address not published
yet — call for directions"* and the directions button falls back to a maps
**search** for the clinic plus the area name. That is a real link, not a
fabricated pin.

### 1.3 Content to replace

`content.ts` still carries the source business's real copy: name, phone,
reviews, blog posts, award claim and social profiles. If you are **not** TexStar
Chiropractic, replace all of it. Nothing is invented, but it is all
TexStar-specific:

- `brand.name`, `brand.phone`, `brand.phoneHref`, `brand.address`
- `social[].href` (Facebook, Instagram, Yelp, YouTube)
- `reviews.items[]` — real reviews; delete rather than keep if untrue for you
- `blog.posts[]` — real posts; `hero.awardImage` / `awardCaption` — a real award
  claim, which must be removed if it does not apply to you
- `offer` — the `$98` special, its inclusions and fine print
- `hero.awardImageAlt` / `photoAlt` / `imageAlt` — alt text describing real photos

Images live in
`public/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/images/`. Replace
the files, keep the names, and nothing else needs touching. The SEO icons are in
the sibling `seo/` folder.

---

## 2. SEO

Already implemented — verify rather than rebuild:

- **Per-page metadata** through `pageMetadata()` in `src/lib/metadata.ts`. Every
  route has a unique title, description and canonical. Add new pages with it.
- **`<title>`** uses `title.absolute` so the root layout's `%s | <name>` template
  cannot double the brand name.
- **OpenGraph + Twitter card** on every page; `/blog/[slug]` uses `type: "article"`.
- **Sitemap** — `src/app/sitemap.ts`, 18 URLs. Add a route there when you add a
  page.
- **robots.txt** — `src/app/robots.ts`.
- **Web app manifest** — `src/app/manifest.ts`.
- **Structured data** — `src/lib/json-ld.tsx`. Emits `MedicalBusiness`, `Service`,
  `BreadcrumbList`, `FAQPage`, `Article` and `Person`. **Every property is read
  from config and unconfigured properties are omitted**, so the markup cannot
  claim hours, ratings or addresses you have not entered. Once you fill in
  `locationsPage.items[].addressLines`, the `MedicalBusiness` schema starts
  emitting real `MedicalClinic` locations automatically.
- **AEO** — each page opens with an answer-first `summary` directly under the H1
  that states who the business is, what it does, where it operates and how to
  reach it, in plain HTML.

Google Search Console verification goes in the commented `verification` field in
`src/app/layout.tsx`.

---

## 3. Optional integrations

Nothing is wired by default, and nothing tracks visitors.

**Contact form** — set `CONTACT_FORM_ENDPOINT` to a Formspree/Basin/CRM webhook
URL. Until then `POST /api/contact` answers **503** and both forms say plainly
that they are not connected. A message is never reported as sent when nothing
was delivered. The route validates server-side, caps body size and timing, and
uses a honeypot field.

**Newsletter** — the footer sign-up posts to the same route with
`intent: "newsletter"`, which relaxes the name requirement.

**Booking** — `siteConfig.bookingUrl` is the single "Schedule Appointment"
target. Point it at your own scheduler (Calendly, Square, etc.).

**Maps** — the locations page uses `siteConfig.mapsQuery` for its search
fallback. Replace it with your clinic name.

**Analytics** — add the provider yourself and set `NEXT_PUBLIC_GA_ID`. If you
add anything that loads third-party scripts, widen the CSP below.

---

## 4. Security

Applied in `next.config.ts`:

| Header | Value |
| --- | --- |
| `Content-Security-Policy` | `default-src 'self'`, `frame-ancestors 'self'`, `object-src 'none'`, plus per-directive allowances |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `SAMEORIGIN` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | camera, microphone, geolocation and interest-cohort disabled |
| `poweredByHeader` | disabled |

`script-src` currently allows `'unsafe-inline' 'unsafe-eval'`, which Next.js
needs for the React/Next bootstrap in production. **If you add a strict CSP
(nonces or hashes), tighten this and test the pages you actually use** rather
than removing the header. `form-action 'self'` means the browser will block a
form posting straight to a third-party host — which is exactly why the form goes
through `/api/contact` on the server.

Also: no secrets in the repo, no `.env` committed (`.env*` is git-ignored), no
analytics or tracking pixels, no debug routes. `npm audit` reports 0
vulnerabilities.

**No link opens in a new tab.** External destinations (the booking scheduler,
`tel:`, `mailto:`) stay in the same tab, matching the reference site. If you add
one that should open in a new tab, give it `rel="noopener noreferrer"` — that
attribute only matters for `target="_blank"`, and forcing every outbound link
into a new tab would take the back button away from visitors.

---

## 5. Adding a page

1. Create `src/app/<route>/page.tsx`.
2. Wrap the body in `<PageShell>` so the header, side menu and footer render.
3. Use `<PageHero>` for the banner — it takes `eyebrow`, `heading`, `summary`
   and `crumbs`.
4. Use `<PageSection tone="cream" | "creamUp" | "plain">` and
   `<SectionHeading>`.
5. Use the type scale from
   `src/components/sites/texstarchiropractic-com-6d11e6eb/shared/type-scale.ts`
   (`H1`, `H2`, `H3`, `H4`, `H5`, `BODY`, `EYEBROW`, `SECTION`, `CONTAINER`,
   `CARD`) rather than restating Tailwind classes, so a design change is made
   in one place.
6. End with `<BookingCta />`.
7. Export `metadata` via `pageMetadata({ title, description, path })`.
8. Add the route to `src/app/sitemap.ts`.
9. Put the copy in `content.ts`, not in the component.

Heading order must run `h1` (page hero) → `h2` (section) → `h3` (item). The
header, footer and inner pages currently pass with zero heading skips, alt text
or unnamed controls — keep it that way.

---

## 6. Commands

```bash
npm run dev        # dev server
npm run build      # production build (standalone output)
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run check      # lint + typecheck + build
```

### Verification scripts

Run these against a **production build**, not `next dev` (dev HMR does not
hydrate reliably in every environment):

```bash
npm run build
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
# PORT=3112 HOSTNAME=127.0.0.1 node .next/standalone/server.js

node scripts/prod-audit.mjs      # 15 routes x 8 viewports: overflow, h1, alt, links, errors
node scripts/prod-crawl.mjs      # link crawl, status codes, fragments, headers, form API
node scripts/audit-a11y.mjs      # landmarks, heading order, names, ARIA, focus, contrast
node scripts/measure-perf.mjs    # LCP, CLS, transferred bytes
node scripts/check-links.mjs     # static href validation (no server needed)
node scripts/measure-sections.mjs  # per-section heights vs the source reference
node scripts/polish-interactions.mjs  # 12 interaction checks
```

Latest verified state: 15 routes × 8 viewports with zero horizontal overflow,
zero console/network errors, 0 accessibility issues, 0 broken links, and the
home page's 14 section heights within 4px of the source (document height 9214px,
identical to the source).

---

## 7. Known trade-offs

Two brand colours fail WCAG AA for body text. Both are part of the approved
palette, so neither was changed here — the numbers and the exact remediation are
below so you can decide. Re-check with `node scripts/check-contrast.mjs`.

| Combination | Ratio | AA needs | Smallest change that passes |
| --- | --- | --- | --- |
| White on `#EA7600` (solid CTA buttons) | 2.96:1 | 4.5:1 | `#B45309` → 5.02:1 |
| White on `#D07234` (newsletter SUBMIT) | 3.42:1 | 4.5:1 | `#B05E20` → 4.70:1 |
| Muted `#73748C` on the cream wash `#FDFCFA` | 4.45:1 | 4.5:1 | `#6E6F86` → 4.78:1 |

To apply: update `#EA7600` in `src/app/globals.css`, the `Button` variant map in
`shared/Button.tsx`, the starburst in `OfferSection.tsx`, and `#D07234` /
`#73748C` where they are used. Everything else already passes:

| Combination | Ratio |
| --- | --- |
| Body `#382F2D` on white | 13.02:1 |
| Primary `#005EB8` on white | 6.38:1 |
| White on primary blue | 6.38:1 |
| Muted `#73748C` on white | 4.56:1 |
| White on the footer blue | 8.68:1 |

**The offer starburst overhangs its panel by 7px** and is clipped at 1024/1280.
Verified identical on the source site, so it is left as-is.

**Third-party embeds are static local stand-ins.** The review widget, the map and
the newsletter form were local emulations in the original clone and remain so by
design. They are clearly marked in the component comments. Do not add the real
GoHighLevel / Elfsight / reCAPTCHA embeds without also widening the CSP.
