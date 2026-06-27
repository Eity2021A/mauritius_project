#!/usr/bin/env node
/**
 * Report: Which beaches, places, or activities have NO image or use fallback?
 * Run from repo root: node scripts/report-missing-content-images.mjs
 * You can ask the AI to run this and fix any gaps.
 */
import { existsSync, readFileSync } from "fs";
import { join } from "path";

const ROOT = process.cwd();
const PUBLIC = join(ROOT, "public");

function exists(path) {
  return existsSync(join(PUBLIC, path.replace(/^\//, "")));
}

// Parse data files (simple regex extraction to avoid TS/imports)
const src = join(ROOT, "src");
const dataPath = (f) => join(src, "data", f);

const report = { beaches: [], places: [], activities: [] };

// ---- Beaches (itinerary page uses BEACHES_BY_REGION → BEACH_IMAGES; fallback if slug not in map or file missing)
const beachesContent = readFileSync(dataPath("beaches.ts"), "utf8");
const itineraryContent = readFileSync(join(src, "data", "itinerary.ts"), "utf8");
const beachSlugImageRe = /slug:\s*["']([^"']+)["'][^}]*?image:\s*["']([^"']+)["']/gs;
const beachEntries = [];
let m;
while ((m = beachSlugImageRe.exec(beachesContent)) !== null) {
  beachEntries.push({ slug: m[1], image: m[2] });
}
const itineraryBeachSlugs = [...itineraryContent.matchAll(/slug:\s*["']([^"']+)["'].*?regionLabel/g)].map((x) => x[1]);
const beachSlugToImage = new Map(beachEntries.map((b) => [b.slug, b.image]));

for (const slug of itineraryBeachSlugs) {
  const image = beachSlugToImage.get(slug);
  if (!image) {
    report.beaches.push({ name: slug, reason: "No image in beaches data (will use fallback on itinerary)", slug });
  } else if (!exists(image)) {
    report.beaches.push({ name: slug, reason: "Image path does not exist on disk", slug, path: image });
  }
}

// ---- Places (place-details: empty images array or first image missing)
const placeDetailsContent = readFileSync(dataPath("place-details.ts"), "utf8");
const placeBlockRe = /"([a-z0-9-]+)":\s*\{\s*slug:\s*"[^"]+",\s*name:\s*"([^"]+)",[\s\S]*?images:\s*(\[[\s\S]*?\]),/g;
let pm;
while ((pm = placeBlockRe.exec(placeDetailsContent)) !== null) {
  const slug = pm[1];
  const name = pm[2];
  const imagesStr = pm[3];
  const firstPathMatch = imagesStr.match(/["'](\/images\/[^"']+)["']/);
  if (!firstPathMatch) {
    report.places.push({ slug, name, reason: "Empty images array" });
  } else {
    const firstPath = firstPathMatch[1];
    if (!exists(firstPath)) {
      report.places.push({ slug, name, reason: "First image path does not exist", path: firstPath });
    }
  }
}

// ---- Activities (activities.ts: each has image; check existence)
const activitiesContent = readFileSync(dataPath("activities.ts"), "utf8");
const activityBlockRe = /slug:\s*["']([^"']+)["'],\s*name:\s*["']([^"']+)["'][^}]*?image:\s*["']([^"']+)["']/g;
let am;
while ((am = activityBlockRe.exec(activitiesContent)) !== null) {
  const slug = am[1];
  const name = am[2];
  const image = am[3];
  if (!exists(image)) {
    report.activities.push({ slug, name, reason: "Image path does not exist", path: image });
  }
}

// ---- Output
console.log("=== Missing content images report ===\n");
console.log("Run this anytime to see which items have no image or a broken path.\n");

if (report.beaches.length === 0) {
  console.log("Beaches (itinerary): All " + itineraryBeachSlugs.length + " have an image that exists.");
} else {
  console.log("Beaches (itinerary) – missing or fallback:");
  report.beaches.forEach((b) => console.log("  -", b.slug, "|", b.reason, b.path ? "| " + b.path : ""));
}

console.log("");
if (report.places.length === 0) {
  console.log("Places (best-places / place details): All have at least one image.");
} else {
  console.log("Places – no image or first image missing:");
  report.places.forEach((p) => console.log("  -", p.slug, "(" + p.name + ") |", p.reason, p.path ? "| " + p.path : ""));
}

console.log("");
if (report.activities.length === 0) {
  console.log("Activities: All have an image that exists.");
} else {
  console.log("Activities – image path missing:");
  report.activities.forEach((a) => console.log("  -", a.slug, "(" + a.name + ") |", a.path));
}

console.log("\n--- Summary ---");
console.log("Beaches (itinerary) missing/fallback:", report.beaches.length);
console.log("Places with no/failed image:", report.places.length);
console.log("Activities with missing image:", report.activities.length);
