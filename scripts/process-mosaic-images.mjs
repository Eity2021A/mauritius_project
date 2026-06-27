/**
 * Optimize and rename mosaic images for SEO:
 * - Resize to max 1200px width, 80% JPEG quality
 * - Rename to lowercase, hyphenated, descriptive filenames
 */

import fs from "fs";
import path from "path";
import sharp from "sharp";

const MOSAIC_DIR = path.join(process.cwd(), "public/images/mosaic");
const MAX_WIDTH = 1200;
const QUALITY = 80;

// Map original filename -> new SEO-friendly filename (lowercase, hyphens)
const RENAME_MAP = {
  "Activities for everyone.jpg": "activities-for-everyone-mauritius.jpg",
  "Activities in Mauritius.jpg": "activities-in-mauritius.jpg",
  "Amazing Places to visit in mauritius.jpg": "amazing-places-to-visit-mauritius.jpg",
  "Best Beaches of Mauritius.jpg": "best-beaches-of-mauritius.jpg",
  "Best Snorkeling Spots in Mauritius.jpg": "best-snorkeling-spots-mauritius.jpg",
  "Best Time To Visit.jpg": "best-time-to-visit-mauritius.jpg",
  "Best eaches to Visit in mauritius.jpg": "best-beaches-to-visit-mauritius.jpg",
  "Best place to swim with sea Turtles in mauritius.jpg": "swim-with-sea-turtles-mauritius.jpg",
  "Discover hidden spots in Mauritius.jpg": "discover-hidden-spots-mauritius.jpg",
  "Discover over 40 Beaches in mauritius.jpg": "discover-over-40-beaches-mauritius.jpg",
  "Eco frendly activities in mauritius.jpg": "eco-friendly-activities-mauritius.jpg",
  "Eco friendly Activities.jpg": "eco-friendly-nature-activities-mauritius.jpg",
  "Helicopter tour and whale whatch in Mauritius.jpg": "helicopter-tour-whale-watch-mauritius.jpg",
  "Most Popuar Activities in Mauritius.jpg": "most-popular-activities-mauritius.jpg",
  "Top 10 Beaches in mauritius.jpg": "top-10-beaches-mauritius.jpg",
  "Undersea Walk in Mauritius.jpg": "undersea-walk-mauritius.jpg",
  "Weather forcast and Cyclone Updates for Mauritius.jpg": "weather-forecast-cyclone-updates-mauritius.jpg",
};

async function processImage(inputPath, outputPath) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    const resized = metadata.width > MAX_WIDTH;
    await image
      .resize(MAX_WIDTH, null, { withoutEnlargement: true })
      .jpeg({ quality: QUALITY })
      .toFile(outputPath);
    return { ok: true, resized, width: metadata.width };
  } catch (err) {
    console.error(`Error processing ${path.basename(inputPath)}:`, err.message);
    return { ok: false };
  }
}

async function main() {
  console.log("🖼️  Processing mosaic images (optimize + rename for SEO)...\n");

  const files = fs.readdirSync(MOSAIC_DIR).filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return [".jpg", ".jpeg", ".png", ".webp"].includes(ext) && !f.startsWith(".");
  });

  const toDelete = [];
  let processed = 0;

  for (const file of files) {
    const newName = RENAME_MAP[file];
    if (!newName) {
      console.log(`⏭️  Skip (no mapping): ${file}`);
      continue;
    }
    const inputPath = path.join(MOSAIC_DIR, file);
    const outputPath = path.join(MOSAIC_DIR, newName);
    if (inputPath === outputPath) continue;

    const result = await processImage(inputPath, outputPath);
    if (result.ok) {
      toDelete.push(inputPath);
      processed++;
      console.log(`✓ ${file} → ${newName}${result.resized ? " (resized)" : ""}`);
    }
  }

  for (const oldPath of toDelete) {
    try {
      fs.unlinkSync(oldPath);
    } catch (e) {
      console.warn(`Could not remove ${oldPath}:`, e.message);
    }
  }

  console.log(`\n✅ Done. Processed ${processed} images.`);
}

main().catch(console.error);
