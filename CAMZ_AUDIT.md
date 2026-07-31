# Camz Cleaning — Audit & Remediation Log

## Phase 1 — SEO & metadata (2026-07-31, branch `phase1/seo-metadata`)

Canonical domain: **non-www** `https://camzcleaning.com`. `trailingSlash: true`
is set in `next.config.ts`, so every canonical/sitemap URL ends with `/`.
The www→non-www redirect is handled at the hosting layer, not in code.

### What was changed

**City copy fixes (client-reported bug)**

- `src/components/common/AreaCTA.tsx` — the CTA subtext hardcoded
  "today in Cochrane" and was shared by all four area pages. It now takes a
  required `city` prop.
- `src/app/(public)/(areas)/{calgary,airdrie,chestermere,cochrane}-cleaning-services/page.tsx`
  — each passes its own city to `<AreaCTA/>`.
- `src/components/calgary/ProfessionalServicesGrid.tsx` — vehicle-cleaning card
  said "without leaving home in Cochrane" on the Calgary page → Calgary.
- `src/components/chestermere/ChestermereCleaningServices.tsx` — badge said
  "Cochrane" and the image alt said "Professional Cleaning in Cochrane" on the
  Chestermere page → Chestermere.
- `src/components/chestermere/ProfessionalServicesGrid.tsx` — residential card
  said "transparent Airdrie house cleaning prices" on the Chestermere page →
  Chestermere.

**SEO infrastructure**

- `src/lib/site-config.ts` (new) — `SITE_URL` (from `NEXT_PUBLIC_SITE_URL`,
  default `https://camzcleaning.com`), `SITE_NAME`, `DEFAULT_DESCRIPTION`,
  business NAP (phone `+1 587-837-1977`, `info@camzcleaning.com`,
  Calgary, AB, Canada), areas served, social URLs. **No street address exists
  anywhere in the codebase** (contact page and footer only show
  "Calgary, AB, Canada"), so no street field was added.
- `src/lib/seo.ts` (new) — `buildPageMetadata()` helper producing title,
  description, `alternates.canonical` (absolute, trailing slash), and Open
  Graph block per page.
- `src/app/layout.tsx` — added `metadataBase`, default Open Graph / Twitter
  card metadata, and a LocalBusiness JSON-LD script (NAP, areaServed
  Calgary/Airdrie/Chestermere/Cochrane, sameAs = the footer's real social
  URLs). Ratings, review counts, opening days, and street address are omitted
  because they are not published in the code (the footer shows
  "9:00 AM – 5:00 PM" but without days, so `openingHours` would have required
  inventing days).
- Per-route `export const metadata` added to 13 public server pages:
  `/`, `/about-us`, `/services`, `/commercial-cleaning-services`,
  `/residential-cleaning-services`, `/vehicle-cleaning-service`,
  `/seasonal-property-service`, `/calgary-cleaning-services`,
  `/airdrie-cleaning-services`, `/chestermere-cleaning-services`,
  `/cochrane-cleaning-services`, `/contact-us`, `/gallery`.
  Three titles are verbatim from the client's SEO team (`/`, `/services/`,
  `/calgary-cleaning-services/`); the rest are unique, <60 chars, with
  140–160-char descriptions.
- `src/app/sitemap.ts` (new) replaces `public/sitemap.xml` (deleted). Includes
  all public routes above plus `/blogs/`; excludes the non-existent
  `/privacy-policy/` (the old sitemap advertised a 404), and all dashboard,
  auth, and booking routes.
- `src/app/robots.ts` (new) replaces `public/robots.txt` (deleted). Keeps the
  existing disallow rules (`/login/`, `/api/`, `/_next/static/`) and points
  Sitemap at `${SITE_URL}/sitemap.xml`.
- `public/googlec25102e8cc599022.html` and `public/llms.txt` untouched.
- `.env.example` (new, placeholders only); `NEXT_PUBLIC_SITE_URL` added to
  `.env.local`; `.gitignore` now allows `.env.example` and ignores
  `AUDIT_STATE.md`.

### Deferred (cannot export metadata while they are client components)

- `/blogs`, `/blogs/[id]`, `/booking`, all `/customer-dashboard/*`, and the
  auth routes (`/login`, `/register`, `/forgot-password`, `/reset-password`).
  A later phase converts these to server components (or wraps them) before
  adding metadata. `/blogs/` is still listed in the sitemap since it is a
  public indexable page.
- Favicon is still the 510 KiB `favicon.png` — icon config intentionally left
  unchanged (later phase).
- Performance work (images, client-bundle size, server-side data fetching),
  middleware auth enforcement, and Supabase query changes are out of scope for
  Phase 1 per the audit plan.

### Left as-is / noted

- The Chestermere FAQ contains a question about booking "in Airdrie or
  Calgary" (`src/app/(public)/(areas)/chestermere-cleaning-services/page.tsx`)
  — reads as intentional cross-area FAQ content, not a copy-paste bug; left
  unchanged. Flag to the client if they want it localized.
- `src/components/chestermere/AreasServed.tsx` has a trailing space in the
  city label `"Airdrie "` — cosmetic only.

### Needs manual verification

- Set `NEXT_PUBLIC_SITE_URL=https://camzcleaning.com` in the hosting
  provider's environment variables (only `.env.local` was updated locally).
- Confirm the hosting-layer www→non-www redirect is in place.
- After deploy: re-submit the sitemap in Google Search Console and confirm
  `https://camzcleaning.com/googlec25102e8cc599022.html` still resolves.
- `npm run build` (Turbopack) fails locally on darwin/arm64 due to a missing
  native SWC binary; `npm run build -- --webpack` is the verified local build
  path. Confirm the production build environment is unaffected.
