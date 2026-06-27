#!/usr/bin/env node
/**
 * Checks that a random sample of image URLs (Supabase rendered) return 200.
 * Run after changing getImageUrl usage to catch broken image URLs before deploy.
 *
 * Usage: node scripts/check-image-urls.mjs
 */

const PRODUCTION_SUPABASE_BASE =
  "https://htyodxbntlnwefjkcudc.supabase.co/storage/v1/object/public/mauritius_explored";

function buildRenderedUrl(path, { width, quality = 75 } = {}) {
  if (!path || !path.startsWith("/images")) return null;
  const localOnly =
    path === "/images/og-image.jpg" ||
    path.toLowerCase().endsWith(".svg") ||
    path.startsWith("/images/banners/");
  if (localOnly) return null;
  const withoutPrefix = path.replace(/^\/images\/?/, "");
  const objectUrl = `${PRODUCTION_SUPABASE_BASE}/${withoutPrefix}`;
  if (!width && !quality) return objectUrl;
  const renderUrl = objectUrl.replace(
    "/storage/v1/object/public/",
    "/storage/v1/render/image/public/"
  );
  const params = new URLSearchParams();
  if (width) params.set("width", String(width));
  params.set("quality", String(quality ?? 75));
  params.set("format", "origin");
  return `${renderUrl}?${params.toString()}`;
}

// Sample paths that use Supabase (not local-only), with the transform we use in the app
const SAMPLES = [
  // Mosaic (800/75)
  { path: "/images/mosaic/best-beaches-of-mauritius.jpg", width: 800, quality: 75 },
  { path: "/images/mosaic/best-snorkeling-spots-mauritius.jpg", width: 800, quality: 75 },
  // Top 10 hero + card (1200 + 400)
  { path: "/images/beaches/belle-mare/belle-mare-beach-on-the-east-coast.jpg", width: 1200, quality: 75 },
  { path: "/images/places-to-visit/coloured-earth/seven-coloured-earth.jpg", width: 400, quality: 75 },
  // Giveaway prize (800)
  { path: "/images/places-to-visit/catamaran-cruises/catamaran-cruises-in-mauritius.jpg", width: 800, quality: 75 },
  // Blog OG (1200)
  { path: "/images/blog/chamarel-heights.jpg", width: 1200, quality: 75 },
  // Beach detail hero (1200)
  { path: "/images/beaches/trou-aux-biches/trou-aux-biches-public-beach.jpg", width: 1200, quality: 75 },
  // Place/activity (1200 for OG)
  { path: "/images/places-to-visit/ile-aux-cerfs/boat-tours-at-ile-aux-cerfs.jpg", width: 1200, quality: 75 },
];

async function checkUrl(url, label) {
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "follow" });
    return { ok: res.ok, status: res.status, label, url };
  } catch (err) {
    return { ok: false, status: null, label, url, error: err.message };
  }
}

async function main() {
  console.log("Checking sample image URLs (Supabase rendered)...\n");
  const results = [];
  for (const { path, width, quality } of SAMPLES) {
    const url = buildRenderedUrl(path, { width, quality });
    if (!url) {
      console.log(`Skip (local): ${path}`);
      continue;
    }
    const label = `${path} (${width}/${quality})`;
    const result = await checkUrl(url, label);
    results.push(result);
    const status = result.status ?? result.error;
    const icon = result.ok ? "✓" : "✗";
    console.log(`${icon} ${result.status ?? "ERR"} ${label}`);
  }
  const failed = results.filter((r) => !r.ok);
  if (failed.length > 0) {
    console.log("\nFailed URLs:");
    failed.forEach((f) => console.log("  ", f.url));
    process.exit(1);
  }
  console.log("\nAll sample image URLs returned 200.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
