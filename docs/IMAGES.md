# Images – where they come from

- **Supabase Storage** (bucket `mauritius_explored`): content images — beaches, places, activities, itinerary, mosaic, etc. One source of truth for all of these.
- **Repo / Vercel** (under `public/images/`): kept local only — **banners/** (hero images), **og-image.jpg**, and **logos** (e.g. `mauritius-explored-logo.svg`, `mauritius-explored.svg`). Do not upload these to Supabase; the app serves them from the deployment.

## Do not duplicate content images

- **Do not** add content image files (beaches, places-to-visit, activities, itinerary, mosaic, etc.) under `public/images/` in the repo. Those live in Supabase only and are loaded via `getImageUrl()`.

## How it works

1. **Paths in code** use the site-root convention, e.g. `/images/beaches/...`, `/images/places-to-visit/leon/...`, `/images/banners/...`, `/images/mauritius-explored-logo.svg`.
2. **Local-only (no Supabase):** `/images/banners/*`, `/images/og-image.jpg`, `/images/*.svg` — returned as-is by `getImageUrl()`; served from the app (Vercel or local `public/`).
3. **From Supabase:** All other `/images/...` are rewritten by `getImageUrl(path)` to:  
   `IMAGE_BASE / <path without /images/>`  
   Example: `/images/places-to-visit/leon/leon-1.jpg` →  
   `https://<project>.supabase.co/storage/v1/object/public/mauritius_explored/places-to-visit/leon/leon-1.jpg`
4. **Bucket structure** in Supabase (bucket `mauritius_explored`): object names have **no** `images/` prefix. Top-level folders are:
   - `avatar/`, `beaches/`, `blog/`, `festivals/`, `itinerary/`, `mosaic/`, `places-to-visit/`
   - (Banners also exist in Supabase but the app serves them from the repo; content images above are the ones loaded from Supabase.)
5. **Exact URL for local and deployed:**  
   `https://htyodxbntlnwefjkcudc.supabase.co/storage/v1/object/public/mauritius_explored/<object_path>`  
   where `<object_path>` = path without `/images/` (e.g. `beaches/albion/albion-beach-morning.jpg`, `places-to-visit/leon/leon-1.jpg`).  
   Both local (with `NEXT_PUBLIC_IMAGE_BASE_URL` set) and the deployed site use this same base; `getImageUrl()` builds it from `/images/...` paths.

## Adding or changing images

- **Content images** (beaches, places, activities, itinerary, mosaic): upload or replace in **Supabase** bucket `mauritius_explored`; update paths in `src/data/` if needed. Do not add them to the repo.
- **Banners, og-image, logos:** add or replace under `public/images/` in the repo (banners in `public/images/banners/`, og-image at `public/images/og-image.jpg`, logos as `.svg` in `public/images/`). These are not in Supabase.

## Local development

- Set `NEXT_PUBLIC_IMAGE_BASE_URL` in `.env.local` to your Supabase bucket URL (same as production, no trailing slash).  
  Example: `https://<project-ref>.supabase.co/storage/v1/object/public/mauritius_explored`
- Then local and production both load images from the same place, so debugging is consistent.

## Verifying images in Supabase

Run:

```bash
npm run verify-supabase-images
```

This checks that every `/images/...` path referenced in `src/` exists in the Supabase bucket.
