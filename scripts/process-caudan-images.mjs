/**
 * One-off: optimize the single Caudan Waterfront image and create thumbnail.
 * Run from repo root: node scripts/process-caudan-images.mjs
 */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const DIR = path.join(process.cwd(), 'public/images/places-to-visit/caudan-waterfront');
const SOURCE = path.join(DIR, 'caudan-waterfront-port-louis.jpeg');
const OUTPUT_MAIN = path.join(DIR, 'caudan-waterfront.jpg');
const THUMB_DIR = path.join(DIR, 'thumbnails');
const THUMB_PATH = path.join(THUMB_DIR, 'caudan-waterfront.jpg');

const MAX_WIDTH = 1200;
const MAIN_QUALITY = 80;
const THUMB_WIDTH = 400;
const THUMB_QUALITY = 70;

async function main() {
  if (!fs.existsSync(SOURCE)) {
    console.error('Source image not found:', SOURCE);
    process.exit(1);
  }

  console.log('Optimizing Caudan Waterfront image...');
  const pipeline = sharp(SOURCE).resize(MAX_WIDTH, null, { withoutEnlargement: true });
  await pipeline
    .jpeg({ quality: MAIN_QUALITY, mozjpeg: true })
    .toFile(OUTPUT_MAIN);
  const mainStat = fs.statSync(OUTPUT_MAIN);
  console.log('  Main image:', OUTPUT_MAIN, `(${(mainStat.size / 1024).toFixed(1)} KB)`);

  if (!fs.existsSync(THUMB_DIR)) {
    fs.mkdirSync(THUMB_DIR, { recursive: true });
  }
  await sharp(OUTPUT_MAIN)
    .resize(THUMB_WIDTH, null, { withoutEnlargement: true, fit: 'inside' })
    .jpeg({ quality: THUMB_QUALITY, mozjpeg: true })
    .toFile(THUMB_PATH);
  const thumbStat = fs.statSync(THUMB_PATH);
  console.log('  Thumbnail:', THUMB_PATH, `(${(thumbStat.size / 1024).toFixed(1)} KB)`);

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
