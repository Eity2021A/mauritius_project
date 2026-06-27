# Cursor Context — Mauritius Explored (Front-end)

Context file for onboarding a new Cursor instance / laptop. Use this to quickly bring an AI assistant up to speed on the project.

---

## 1. Project Overview

- **Purpose:** Public-facing Mauritius travel guide website (beaches, places, activities, itineraries, blog).
- **Stack:** Next.js 16, React 19, Tailwind CSS 4, Supabase.
- **Current deployment:** Vercel (everything built for `*.vercel.app` initially). Custom domain to connect: **mauritiusexplored.com**
- **Data source:** Content lives in `src/data/*` (beaches, places, activities, blog). Images served from Supabase storage (mauritius-explored-v2 project).

---

## 2. When You Connect a Custom Domain — Checklist

The site is configured for a Vercel deployment URL. When you connect your custom domain (**mauritiusexplored.com**), update the following:

### 2.1 Environment variables (Vercel project settings)

| Variable | What to set | Where |
|----------|-------------|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://mauritiusexplored.com` | Vercel → Project → Settings → Environment Variables |

**Why:** Used in `src/app/layout.tsx` for `metadataBase`, `openGraph.url`, canonical links, favicon URLs, and **OG image** (required for link previews in WhatsApp, iMessage, etc.). Set it **now** for Vercel production: `https://mauritius-explored.vercel.app`. Without it, `VERCEL_URL` can resolve to a preview deployment URL and break og:image.

### 2.2 Sitemap base URL

**File:** `src/app/sitemap.ts`  
**Line 4:** Change `BASE_URL` to `https://mauritiusexplored.com` (or refactor to use `process.env.NEXT_PUBLIC_SITE_URL`).

### 2.3 Robots.txt

**File:** `public/robots.txt`  
**Line 9:** `Sitemap: https://mauritiusexplored.com/sitemap.xml`

### 2.4 Google Search Console

- Add the property for your custom domain.
- Submit `https://mauritiusexplored.com/sitemap.xml`.
- Indexing is allowed (`Allow: /` in robots.txt); no code change needed.

---

## 3. URL Mapping (Old Site → New Site)

Legacy redirects are defined in `next.config.ts` under `redirects()`. These map old URLs to new ones:

| Old URL pattern | New URL |
|-----------------|---------|
| `/about/places`, `/explore/places` | `/best-places-to-visit-in-mauritius` |
| `/attractions-mauritius/:slug` | `/top-activities-mauritius/:slug` |
| `/destinations/:slug` | `/beaches-in-mauritius/:slug` |
| `/beaches` | `/beaches-in-mauritius` |
| `/activities` | `/mauritius-activities` |
| `/top-10-things-to-do-in-mauritius` | `/top-15-things-to-do-in-mauritius` |

If you discover more legacy URLs from the old site, add them to `next.config.ts` as permanent (301) redirects.

---

## 4. Images

- **Storage:** Supabase project `wpktirmzveoovxjqbqpq` (mauritius-explored-v2). Buckets: `images`, `banners`.
- **Logic:** `src/lib/image-url.ts` — resolves plain filenames to Supabase public URLs.
- **Local-only:** `/images/og-image.jpg` and `*.svg` are served from `public/`, not Supabase.
- **Optional:** Set `NEXT_PUBLIC_ENABLE_IMAGE_TRANSFORMS=true` when Supabase Image Transformations are enabled (Storage → Settings). Provides responsive sizes (400, 800, 1200).
- **Optional:** `NEXT_PUBLIC_IMAGE_BASE_URL` for dev override (see `.env.example`).

---

## 5. SEO & Page Speed (Important)

### 5.1 SEO

- **Metadata:** Centralized in `src/app/layout.tsx` (title, description, Open Graph, Twitter Cards, canonical).
- **JSON-LD:** `OrganizationJsonLd`, `WebsiteJsonLd` in `@/components/seo/JsonLd`.
- **Sitemap:** Dynamic at `src/app/sitemap.ts` — includes static pages, beaches, places, activities, blog.
- **robots.txt:** Allows indexing; blocks `/api/` and `/_next/`.
- **Per-page metadata:** Beaches, activities, places, blog use `generateMetadata` with proper titles and canonical URLs.

### 5.2 Page speed (already optimized)

- **Images:** All use `next/image` with AVIF/WebP. No raw `<img>`. Hero/LCP images use `priority`.
- **Code splitting:** Maps (Leaflet), PhotoMosaic, FeaturedDestinationsMarquee, InstagramFeed loaded via `next/dynamic` with `ssr: false` where needed.
- **Fonts:** Montserrat + Water_Brush via `next/font/google` with `display: "swap"`.
- **Polyfill:** Modern-only browsers — polyfill-module stubbed to save ~14 KiB (see `next.config.ts`).
- **Bundle analyzer:** `npm run analyze` (when `ANALYZE=true`) to audit bundle size.
- **AUDIT.md:** Full speed/code audit with recommendations. See "Recommended follow-ups" section.

**Further improvements if needed:**

- Self-host Leaflet CSS (copy to `public/leaflet.css`).
- Add `placeholder="blur"` and `blurDataURL` (e.g. `SHIMMER_PLACEHOLDER`) to more card grids to reduce CLS.

---

## 6. Environment Variables

**File:** `.env.example` (see project root)

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL — **required for newsletter signup** (subscribers table). Same project as admin (mauritius-explored-v2). |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key — **required for newsletter signup**. |
| `NEXT_PUBLIC_IMAGE_BASE_URL` | Override Supabase image base for local dev (optional) |
| `NEXT_PUBLIC_SITE_URL` | Production domain: `https://mauritiusexplored.com` (set when connecting domain) |

Vercel automatically sets `VERCEL_URL`; the layout uses it as fallback when `NEXT_PUBLIC_SITE_URL` is not set. **Newsletter subscribe will fail if Supabase URL/anon key are missing** (server action needs them to insert into `subscribers`).

---

## 7. Key Files & Structure

- **Layout / SEO:** `src/app/layout.tsx`
- **Image URL logic:** `src/lib/image-url.ts`
- **Content data:** `src/data/*` (beaches, places, activities, blog, place-details, etc.)
- **Redirects:** `next.config.ts` → `redirects()`
- **Sitemap:** `src/app/sitemap.ts`
- **Robots:** `public/robots.txt`
- **Audit / performance notes:** `AUDIT.md`

---

## 8. Things to Import to New Laptop / Cursor

1. Copy this `CURSOR_CONTEXT.md` into the project root (or pin it).
2. Ensure `.env.local` exists with required vars (create from `.env.example` if needed).
3. If using Cursor rules: add `.cursor/rules` or `AGENTS.md` referencing this file for domain/SEO/speed context.
4. After cloning: `npm install`, then `npm run dev` to verify local build.
