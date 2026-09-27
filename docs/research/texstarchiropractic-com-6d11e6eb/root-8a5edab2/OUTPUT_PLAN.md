# Output Plan — texstarchiropractic.com

## Pre-Flight Status

- **Browser automation:** available (browser MCP tools confirmed working; target loaded, title "Texstar Chiropractic").
- **App root:** fresh `git clone` of `https://github.com/JCodesMore/ai-website-cloner-template.git`
  at `C:\Users\pierr\.local\share\opencode\worktree\e930b1\texstarchiropractic-clone`.
  Cloned per user instruction ("Clone the repo, don't go from this repo") — the
  `clika-online-master` repo was **not** used or modified.
- **Dependencies:** `npm install` OK (622 packages).
- **Base build:** `npm run build` PASSES (Next.js 16.3.5, Turbopack). Scaffold is
  Next.js 16 + shadcn/ui + Tailwind v4, as required.
- **Node:** v22.23.3 (template declares `>=24`; builds fine, warning only).

## Scaffold Inventory (pre-existing state)

| Kind | Finding |
|---|---|
| Routes | `src/app/page.tsx` only — untouched scaffold placeholder ("Clone target not yet built") |
| Site namespaces | `src/components/sites/` — does not exist |
| Research artifacts | `docs/research/` — empty (no `research` subdir yet) |
| Screenshots | `docs/design-references/comparison.png` (template placeholder only) |
| Public assets | `public/images`, `public/videos`, `public/seo` — all empty (`.gitkeep` only) |
| shadcn primitives | `src/components/ui/` present |
| Types | `src/types/.gitkeep` only |

**Verdict: untouched template scaffold.** No cloned or user-authored work exists.

## Key Derivation

- Normalized origin: `https://texstarchiropractic.com` (default port 443, omitted)
  - SHA-256[0:8] = `6d11e6eb`
  - `<site-key>` = **`texstarchiropractic-com-6d11e6eb`**
- Normalized pathname: `/` (no query, no fragment → no stateful-query sharing concerns)
  - SHA-256[0:8] = `8a5edab2`
  - `<page-key>` = **`root-8a5edab2`**

## Target → Route Mapping

| # | Source URL | Destination route | Route file |
|---|---|---|---|
| 1 | `https://texstarchiropractic.com/` | `/` | `src/app/page.tsx` |

**Replacements approved by skill routing defaults:** first single-URL clone in an
untouched template → the scaffold `src/app/page.tsx` may be replaced so the clone
is served at `/`. It contains only the template placeholder text; no real work lost.

## Namespace Roots (all unique — no collisions)

| Purpose | Path |
|---|---|
| Artifact root | `docs/research/texstarchiropractic-com-6d11e6eb/root-8a5edab2/` |
| Component specs | `docs/research/texstarchiropractic-com-6d11e6eb/root-8a5edab2/components/` |
| Screenshot root | `docs/design-references/texstarchiropractic-com-6d11e6eb/root-8a5edab2/` |
| Component root | `src/components/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/` |
| Shared site components | `src/components/sites/texstarchiropractic-com-6d11e6eb/shared/` |
| Asset root | `public/sites/texstarchiropractic-com-6d11e6eb/root-8a5edab2/` |
| Shared site assets | `public/sites/texstarchiropractic-com-6d11e6eb/shared/` |
| Asset downloader | `scripts/download-assets-texstarchiropractic-com-6d11e6eb-root-8a5edab2.mjs` |

## Foundation Files That Will Change

Sequential, foreman-owned (Phase 2):

- `src/app/globals.css` — merge target palette/type/radius tokens; add keyframes,
  global UI patterns. Single-origin app, so target tokens own `:root`.
- `src/app/layout.tsx` — replace Geist with the target's real font families via
  `next/font/google`; set real site metadata.
- `src/types/<site-key>.ts` — namespaced TypeScript interfaces for observed content.
- `src/components/sites/texstarchiropractic-com-6d11e6eb/shared/icons.tsx` — deduplicated
  extracted SVG icons.

## Preserved / Untouched

- `src/components/ui/*` (shadcn primitives) — kept, reused by builders.
- `docs/design-references/comparison.png` — template placeholder, left in place.
- Template files (`README.md`, `LICENSE`, `Dockerfile`, CI, etc.) — untouched.

## Out of Scope (skill defaults)

Real backend/auth/forms submission, SEO optimisation work, accessibility audit.
Forms are cloned visually and client-side only.
