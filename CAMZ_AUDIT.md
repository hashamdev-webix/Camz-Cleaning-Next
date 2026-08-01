# Camz Cleaning Audit Log

## Client SEO fixes — 2026-08-02

Branch: `seo/client-fixes`

Scope: client-requested wrong-city copy, route metadata, blog metadata and structured data, custom-request SEO, dynamic sitemap, robots rules, verified broken-image paths, and default OG-image assessment.

### Task 1 — Wrong-city content

Every audited bug and shared CTA call was changed as follows:

| file:line | before | after |
|---|---|---|
| `src/components/common/AreaCTA.tsx:36` | `Schedule your cleaning with Camz Cleaning today in Cochrane and` | `Schedule your cleaning with Camz Cleaning today in {city} and` with a required `city: string` prop |
| `src/app/(public)/(areas)/airdrie-cleaning-services/page.tsx:51` | `<AreaCTA/>` | `<AreaCTA city="Airdrie"/>` |
| `src/app/(public)/(areas)/calgary-cleaning-services/page.tsx:50` | `<AreaCTA/>` | `<AreaCTA city="Calgary"/>` |
| `src/app/(public)/(areas)/chestermere-cleaning-services/page.tsx:50` | `<AreaCTA/>` | `<AreaCTA city="Chestermere"/>` |
| `src/app/(public)/(areas)/cochrane-cleaning-services/page.tsx:53` | `<AreaCTA/>` | `<AreaCTA city="Cochrane"/>` |
| `src/components/airdrie/AirdrieCleaningServices.tsx:32` | `general cleaning services For Calgary prices` | `general cleaning services for Airdrie prices` |
| `src/components/airdrie/AirdrieCleaningServices.tsx:66` | `Professional Cleaning in Calgary` | `Professional Cleaning in Airdrie` |
| `src/components/calgary/ProfessionalServicesGrid.tsx:65` | `without leaving home in Cochrane` | `without leaving home in Calgary` |
| `src/components/chestermere/ChestermereCleaningServices.tsx:13` | `Cochrane` badge | `Chestermere` badge |
| `src/components/chestermere/ChestermereCleaningServices.tsx:71` | `Professional Cleaning in Cochrane` | `Professional Cleaning in Chestermere` |
| `src/components/chestermere/ProfessionalServicesGrid.tsx:53` | `transparent Airdrie house cleaning prices` | `transparent Chestermere house cleaning prices` |

Post-fix cross-city inventory:

- Airdrie retains the four-city fireplace/furnace FAQ answer and `AreaServed` list. Both explicitly describe all areas served.
- Calgary retains the four-city `AreasServed` list. It is intentionally an all-area list.
- Chestermere retains the four-city service-area FAQ answer, an FAQ specifically asking about service in Airdrie or Calgary, and the four-city `AreasServed` list. These are explicit cross-area availability statements, not false Chestermere attribution.
- Cochrane retains the four-city `AreasServed` paragraph. It is intentionally an all-area statement.
- No remaining cross-city mention was judged to be a wrong-city bug.

Rendered CTA verification:

```text
/airdrie-cleaning-services/: Schedule your cleaning with Camz Cleaning today in Airdrie and
/calgary-cleaning-services/: Schedule your cleaning with Camz Cleaning today in Calgary and
/chestermere-cleaning-services/: Schedule your cleaning with Camz Cleaning today in Chestermere and
/cochrane-cleaning-services/: Schedule your cleaning with Camz Cleaning today in Cochrane and
```

Commit: `441e89b fix(seo): correct area-specific city copy`

### Task 2 — Exact client titles

Applied verbatim:

- `/`: `Professional Cleaning Company in Calgary | Camz Cleaning`
- `/services/`: `Our Cleaning Services | Camz Cleaning`
- `/calgary-cleaning-services/`: `Cleaning Services in Calgary | Home & Office Cleaners`

The production-rendered title values were decoded and compared byte-for-byte to those strings; all three assertions passed. All 22 sitemap routes (17 fixed plus five current blog posts) were curled and no duplicate rendered title was found.

Commit: `5bfc4cc fix(seo): apply client-required page titles`

### Task 3 — Blog detail metadata and BlogPosting JSON-LD

- Added cached per-post lookup shared by `generateMetadata` and the detail page.
- Each post now uses its row title, HTML-stripped description (up to about 155 characters), image, publication date, and its own non-www trailing-slash canonical.
- Missing rows return safe noindex metadata before the page renders `notFound()`.
- Extended the existing `jsonLdSchemas.ts`/`PageJsonLd.tsx` system with a dynamic `BlogPosting` factory and schema prop; no parallel structured-data system was created.
- Scoped the collection `Blog` schema to `/blogs/` so detail pages render `BlogPosting` instead of inheriting collection-only JSON-LD.

Rendered structured-data check: `"@type":"BlogPosting"` was present on the sampled detail page.

All current blog canonicals:

```html
<link rel="canonical" href="https://camzcleaning.com/blogs/fdcb8f1e-f3e3-4c48-a540-9d8253a67dc2/"/>
<link rel="canonical" href="https://camzcleaning.com/blogs/c1415a13-af70-4462-9227-2655baacea75/"/>
<link rel="canonical" href="https://camzcleaning.com/blogs/fcc18fbd-9b8e-4906-8ada-23d47a4b0b03/"/>
<link rel="canonical" href="https://camzcleaning.com/blogs/0c370a7e-d1a3-449f-8548-0869f19f978f/"/>
<link rel="canonical" href="https://camzcleaning.com/blogs/ddf3a447-ff0c-4445-af1d-6b65d4889b41/"/>
```

Commit: `23671a7 fix(seo): add blog detail metadata and schema`

### Task 4 — Custom cleaning request metadata

- Replaced the local metadata object with `pageSeo`, adding `https://camzcleaning.com/custom-cleaning-request/` as the canonical.
- Added a `WebPage` plus `Service` graph to the existing JSON-LD map and rendered it from the route layout.
- Rendered structured-data check: `"@type":"Service"` was present.

Commit: `d8357f1 fix(seo): complete custom request metadata`

### Task 5 — Dynamic sitemap

- Replaced `public/sitemap.xml` with `src/app/sitemap.ts`.
- Deleted `public/sitemap-old.xml`.
- Included the original 16 fixed public URLs, `/custom-cleaning-request/`, and every ID returned by the public Supabase `blogs` query.
- Every emitted URL uses `https://camzcleaning.com` and ends in `/`.
- Auth, customer dashboard, admin dashboard, API, and not-found routes are absent.
- Supabase errors are caught, logged, and return the 17 fixed routes instead of failing the build.
- `public/robots.txt`, `public/googlec25102e8cc599022.html`, and `public/llms.txt` were preserved during this task.

Rendered dynamic entries:

```xml
<loc>https://camzcleaning.com/blogs/</loc>
<loc>https://camzcleaning.com/custom-cleaning-request/</loc>
<loc>https://camzcleaning.com/blogs/fdcb8f1e-f3e3-4c48-a540-9d8253a67dc2/</loc>
<loc>https://camzcleaning.com/blogs/c1415a13-af70-4462-9227-2655baacea75/</loc>
<loc>https://camzcleaning.com/blogs/fcc18fbd-9b8e-4906-8ada-23d47a4b0b03/</loc>
<loc>https://camzcleaning.com/blogs/0c370a7e-d1a3-449f-8548-0869f19f978f/</loc>
<loc>https://camzcleaning.com/blogs/ddf3a447-ff0c-4445-af1d-6b65d4889b41/</loc>
```

`/googlec25102e8cc599022.html` returned HTTP `200`.

Commit: `5b912e8 fix(seo): generate sitemap from public routes`

### Task 6 — robots.txt

Only `Disallow: /admin-dashboard/` was added. Rendered file:

```text
User-agent: *
Allow: /

Disallow: /login/
Disallow: /api/
Disallow: /admin-dashboard/

Sitemap: https://camzcleaning.com/sitemap.xml
```

`_next/static` is not disallowed.

Commit: `314bb71 fix(seo): disallow admin dashboard crawling`

### Task 7 — Broken image paths

Applied only replacements backed by exact existing files:

- Privacy hero: `/blog-bg.webp` → `/wp-admin/uploads/blog-bg.webp` (existing file: 33,446 bytes).
- Commercial `-3`: `/wp-admin/uploads/floor cleaning of home-3.webp` → `/wp-admin/uploads/floor-cleaning-of-home-3.webp` (exact hyphenated file exists).
- About kitchen: `/wp-admin/uploads/whole kitchen-cleaning.webp` → `/wp-admin/uploads/whole-kitchen-cleaning.webp` (exact hyphenated file exists).

Similar-file inventory for the three spaced references:

- `floor cleaning of home-2.webp`: `floor-cleaning-of-home.webp`, `cleaned-floor-2.webp`, `floor-cleaning-of-home-3.webp`, `floor-cleaning.webp`, `floor-cleaning-in-calgary.webp`, `cleaned-floor.webp`, and `dirty-floor.webp` exist. `/wp-admin/uploads/cleaned-floor-2.webp` is a plausible candidate, but there is no exact hyphenated basename or other unambiguous proof, so the source was left unchanged.
- `floor cleaning of home-3.webp`: the same floor-related files exist, including the exact hyphenated `/wp-admin/uploads/floor-cleaning-of-home-3.webp`; that verified replacement was applied.
- `whole kitchen-cleaning.webp`: `whole-kitchen-cleaning.webp`, `kitchen-cleaning.webp`, `kitchen-cleaning-2.webp`, `commercial-kitchen-cleaning.webp`, `cleaned-kitchen.webp`, and `dirty-kitchen.webp` exist. The exact hyphenated `/wp-admin/uploads/whole-kitchen-cleaning.webp` replacement was applied.

Commit: `c57811a fix(images): correct verified public asset paths`

### Task 8 — Default OG image assessment

No default was added to `src/lib/seo.ts`, per the instruction to skip rather than force an unsuitable asset.

- `public/constraints.png` is 1000×563 but is an unrelated MySQL course graphic.
- `public/wp-admin/uploads/comparing-cleaning-quotes.png` is 1200×700 but is a post-specific comparison graphic, not a suitable site-wide Camz preview.
- General Camz hero photography is predominantly 1600×1066 (3:2), square, or portrait—not approximately 1200×630.

Result: no existing image is both suitably branded/general and close to the requested social-card dimensions.

### Production verification

The first sandboxed build attempt could not fetch Google Fonts because network access was blocked. After allowing that required request, `npm run build` passed with successful compilation, zero TypeScript errors, and all 52 static pages generated.

Route table:

```text
Route (app)                                            Revalidate  Expire
┌ ○ /
├ ○ /_not-found
├ ○ /about-us
├ ƒ /admin-dashboard
├ ƒ /admin-dashboard/before-after
├ ƒ /admin-dashboard/blogs
├ ƒ /admin-dashboard/booking-records
├ ƒ /admin-dashboard/bookings
├ ƒ /admin-dashboard/custom-requests
├ ƒ /admin-dashboard/customers
├ ƒ /admin-dashboard/manage/[section]
├ ƒ /admin-dashboard/services
├ ƒ /admin-dashboard/users
├ ○ /airdrie-cleaning-services
├ ƒ /api/admin/before-after
├ ƒ /api/admin/blogs
├ ƒ /api/admin/booking-records
├ ƒ /api/admin/bookings
├ ƒ /api/admin/customers
├ ƒ /api/admin/services
├ ƒ /api/admin/users
├ ○ /blogs                                                     5m      1y
├ ● /blogs/[id]                                                5m      1y
│ ├ /blogs/fdcb8f1e-f3e3-4c48-a540-9d8253a67dc2                5m      1y
│ ├ /blogs/c1415a13-af70-4462-9227-2655baacea75                5m      1y
│ ├ /blogs/fcc18fbd-9b8e-4906-8ada-23d47a4b0b03                5m      1y
│ └ [+2 more paths]
├ ○ /booking                                                   5m      1y
├ ○ /calgary-cleaning-services
├ ○ /chestermere-cleaning-services
├ ○ /cochrane-cleaning-services
├ ○ /commercial-cleaning-services
├ ○ /contact-us
├ ○ /custom-cleaning-request
├ ○ /customer-dashboard
├ ○ /customer-dashboard/bookings
├ ƒ /customer-dashboard/bookings/[id]
├ ○ /customer-dashboard/favorites
├ ○ /customer-dashboard/settings
├ ○ /customer-dashboard/settings/help-center
├ ○ /customer-dashboard/settings/personal-information
├ ○ /customer-dashboard/settings/saved-addresses
├ ○ /forgot-password
├ ○ /gallery                                                   5m      1y
├ ○ /login
├ ○ /privacy-policy
├ ○ /register
├ ○ /reset-password
├ ○ /residential-cleaning-services
├ ○ /seasonal-property-service
├ ○ /services
├ ○ /sitemap.xml                                               5m      1y
└ ○ /vehicle-cleaning-service

ƒ Proxy (Middleware)

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```

Rendered metadata grep output from `npm run start -- -p 3100`:

```html
[/]
<title>Professional Cleaning Company in Calgary | Camz Cleaning</title>
<meta name="description" content="Trusted residential, commercial, vehicle and seasonal cleaning across Calgary, Airdrie, Cochrane and Chestermere. Book Camz Cleaning."/>
<link rel="canonical" href="https://camzcleaning.com/"/>

[/services/]
<title>Our Cleaning Services | Camz Cleaning</title>
<meta name="description" content="Explore residential, commercial, vehicle and seasonal property cleaning services available across Calgary and nearby communities."/>
<link rel="canonical" href="https://camzcleaning.com/services/"/>

[/calgary-cleaning-services/]
<title>Cleaning Services in Calgary | Home &amp; Office Cleaners</title>
<meta name="description" content="Choose Camz Cleaning for residential and commercial cleaning in Calgary, with flexible scheduling and detailed service for homes and workplaces."/>
<link rel="canonical" href="https://camzcleaning.com/calgary-cleaning-services/"/>

[/airdrie-cleaning-services/]
<title>Cleaning Services in Airdrie for Homes &amp; Businesses</title>
<meta name="description" content="Book residential and commercial cleaning services in Airdrie with a dependable team serving homes, offices and local businesses."/>
<link rel="canonical" href="https://camzcleaning.com/airdrie-cleaning-services/"/>

[/chestermere-cleaning-services/]
<title>Cleaning Services in Chestermere for Home &amp; Businesses</title>
<meta name="description" content="Book professional home and commercial cleaning in Chestermere with flexible service options and a dependable local cleaning team."/>
<link rel="canonical" href="https://camzcleaning.com/chestermere-cleaning-services/"/>

[/blogs/]
<title>Cleaning Tips &amp; Guides | Camz Cleaning Blog</title>
<meta name="description" content="Read practical cleaning tips, checklists and service guides for homeowners, renters and businesses in Calgary and nearby communities."/>
<link rel="canonical" href="https://camzcleaning.com/blogs/"/>

[/blogs/fdcb8f1e-f3e3-4c48-a540-9d8253a67dc2/]
<title>Blog 1</title>
<meta name="description" content="hi"/>
<link rel="canonical" href="https://camzcleaning.com/blogs/fdcb8f1e-f3e3-4c48-a540-9d8253a67dc2/"/>

[/custom-cleaning-request/]
<title>Custom Cleaning Request | Camz Cleaning</title>
<meta name="description" content="Build a room-by-room cleaning checklist and request a custom quote from Camz Cleaning."/>
<link rel="canonical" href="https://camzcleaning.com/custom-cleaning-request/"/>
```

The raw Calgary title contains `&amp;` because HTML escapes ampersands. Its decoded title text passed the exact-string assertion `Cleaning Services in Calgary | Home & Office Cleaners`.

### Files changed

| file | reason |
|---|---|
| `src/components/common/AreaCTA.tsx` | Require and render the page-specific city. |
| `src/app/(public)/(areas)/airdrie-cleaning-services/page.tsx` | Pass Airdrie to the shared CTA. |
| `src/app/(public)/(areas)/calgary-cleaning-services/page.tsx` | Pass Calgary to the shared CTA. |
| `src/app/(public)/(areas)/chestermere-cleaning-services/page.tsx` | Pass Chestermere to the shared CTA. |
| `src/app/(public)/(areas)/cochrane-cleaning-services/page.tsx` | Pass Cochrane to the shared CTA. |
| `src/components/airdrie/AirdrieCleaningServices.tsx` | Correct off-city pricing copy and image alt text. |
| `src/components/calgary/ProfessionalServicesGrid.tsx` | Correct Calgary vehicle-service copy. |
| `src/components/chestermere/ChestermereCleaningServices.tsx` | Correct the badge and image alt text. |
| `src/components/chestermere/ProfessionalServicesGrid.tsx` | Correct Chestermere pricing copy. |
| `src/app/(public)/page.tsx` | Apply the exact required homepage title. |
| `src/app/(public)/(services)/services/layout.tsx` | Apply the exact required services title. |
| `src/app/(public)/(areas)/calgary-cleaning-services/layout.tsx` | Apply the exact required Calgary title. |
| `src/app/(public)/blogs/[id]/page.tsx` | Add per-post metadata, canonical, cached fetching, safe missing-row metadata, and BlogPosting JSON-LD. |
| `src/app/(public)/blogs/layout.tsx` | Stop applying the collection schema to detail pages. |
| `src/app/(public)/blogs/page.tsx` | Render the collection schema only on the blog index. |
| `src/components/seo/PageJsonLd.tsx` | Accept dynamic schemas through the existing renderer. |
| `src/lib/jsonLdSchemas.ts` | Add the BlogPosting factory and custom-request schema. |
| `src/app/(public)/custom-cleaning-request/layout.tsx` | Add canonical metadata and JSON-LD through existing helpers. |
| `src/app/sitemap.ts` | Generate fixed and Supabase-backed blog sitemap entries with fallback handling. |
| `public/sitemap.xml` | Deleted in favor of the metadata route. |
| `public/sitemap-old.xml` | Deleted as requested. |
| `public/robots.txt` | Disallow crawling `/admin-dashboard/` only. |
| `src/app/(public)/privacy-policy/page.tsx` | Point the hero at the existing upload asset. |
| `src/components/commercial/CommercialCleaningContent.tsx` | Use the verified hyphenated `-3` floor image. |
| `src/components/about/AboutContent.tsx` | Use the verified hyphenated whole-kitchen image. |
| `CAMZ_AUDIT.md` | Record this phase, evidence, and unresolved/skipped items. |

### Unable to complete without guessing

- `src/components/commercial/CommercialCleaningContent.tsx:25` still references missing `/wp-admin/uploads/floor cleaning of home-2.webp`. The closest candidate is `/wp-admin/uploads/cleaned-floor-2.webp`, but the repository does not prove that it is the intended replacement.
- No default OG image was added because no existing asset met both the approximate 1200×630 shape and site-wide suitability requirements.

No file under the forbidden migration, Supabase library, middleware, auth-context, admin-dashboard, or API paths was changed.
