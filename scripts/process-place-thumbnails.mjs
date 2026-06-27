/**
 * Generate thumbnails for images in a place folder (or multiple folders).
 * Run from repo root: node scripts/process-place-thumbnails.mjs <folder> [folder2 ...]
 * Example: node scripts/process-place-thumbnails.mjs national-post national-history-museum
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PLACES_BASE = path.join(process.cwd(), 'public/images/places-to-visit');
const THUMB_WIDTH = 400;
const THUMB_QUALITY = 70;

async function processFolder(folderName) {
  const dir = path.join(PLACES_BASE, folderName);
  const thumbDir = path.join(dir, 'thumbnails');

  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    console.log('  Skip (not found):', folderName);
    return;
  }

  if (!fs.existsSync(thumbDir)) {
    fs.mkdirSync(thumbDir, { recursive: true });
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const imageFiles = entries
    .filter((e) => e.isFile() && /\.(jpg|jpeg|png|webp)$/i.test(e.name))
    .map((e) => e.name);

  for (const filename of imageFiles) {
    const sourcePath = path.join(dir, filename);
    const thumbFilename = path.basename(filename, path.extname(filename)) + '.jpg';
    const thumbPath = path.join(thumbDir, thumbFilename);

    if (fs.existsSync(thumbPath)) {
      const sourceStat = fs.statSync(sourcePath);
      const thumbStat = fs.statSync(thumbPath);
      if (thumbStat.mtime >= sourceStat.mtime) {
        console.log('  Skip (up to date):', thumbFilename);
        continue;
      }
    }

    await sharp(sourcePath)
      .resize(THUMB_WIDTH, null, { withoutEnlargement: true, fit: 'inside' })
      .jpeg({ quality: THUMB_QUALITY, mozjpeg: true })
      .toFile(thumbPath);
    console.log('  Created:', folderName + '/' + thumbFilename);
  }
}

async function main() {
  const folders = process.argv.slice(2).filter(Boolean);
  if (folders.length === 0) {
    console.log('Usage: node scripts/process-place-thumbnails.mjs <folder> [folder2 ...]');
    process.exit(1);
  }
  for (const folder of folders) {
    console.log('Processing', folder + '...');
    await processFolder(folder);
  }
  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
