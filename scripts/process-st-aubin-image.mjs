/**
 * Optimize St Aubin image and create thumbnail.
 * Run from repo root: node scripts/process-st-aubin-image.mjs
 */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const DIR = path.join(process.cwd(), 'public/images/places-to-visit/st-aubin');
const SOURCE = path.join(DIR, 'st-aubin-in-mauritius.jpg');
const TEMP = path.join(DIR, '_temp-st-aubin.jpg');
const THUMB_DIR = path.join(DIR, 'thumbnails');
const THUMB_PATH = path.join(THUMB_DIR, 'st-aubin-in-mauritius.jpg');

const MAX_WIDTH = 1200;
const MAIN_QUALITY = 80;
const THUMB_WIDTH = 400;
const THUMB_QUALITY = 70;

async function main() {
  if (!fs.existsSync(SOURCE)) {
    console.error('Source image not found:', SOURCE);
    process.exit(1);
  }

  const meta = await sharp(SOURCE).metadata();
  const needsResize = meta.width > MAX_WIDTH;

  console.log('Optimizing St Aubin image...');
  await sharp(SOURCE)
    .resize(MAX_WIDTH, null, { withoutEnlargement: true })
    .jpeg({ quality: MAIN_QUALITY, mozjpeg: true })
    .toFile(TEMP);
  fs.renameSync(TEMP, SOURCE);
  const mainStat = fs.statSync(SOURCE);
  console.log('  Main:', (mainStat.size / 1024).toFixed(1), 'KB');

  if (!fs.existsSync(THUMB_DIR)) {
    fs.mkdirSync(THUMB_DIR, { recursive: true });
  }
  await sharp(SOURCE)
    .resize(THUMB_WIDTH, null, { withoutEnlargement: true, fit: 'inside' })
    .jpeg({ quality: THUMB_QUALITY, mozjpeg: true })
    .toFile(THUMB_PATH);
  const thumbStat = fs.statSync(THUMB_PATH);
  console.log('  Thumbnail:', (thumbStat.size / 1024).toFixed(1), 'KB');
  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
