/**
 * Generate thumbnails for all images in caudan-waterfront folder.
 * Run from repo root: node scripts/process-caudan-thumbnails.mjs
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const DIR = path.join(process.cwd(), 'public/images/places-to-visit/caudan-waterfront');
const THUMB_DIR = path.join(DIR, 'thumbnails');
const THUMB_WIDTH = 400;
const THUMB_QUALITY = 70;

async function main() {
  if (!fs.existsSync(THUMB_DIR)) {
    fs.mkdirSync(THUMB_DIR, { recursive: true });
  }

  const entries = fs.readdirSync(DIR, { withFileTypes: true });
  const imageFiles = entries
    .filter((e) => e.isFile() && /\.(jpg|jpeg|png|webp)$/i.test(e.name))
    .map((e) => e.name);

  for (const filename of imageFiles) {
    const sourcePath = path.join(DIR, filename);
    const thumbFilename = path.basename(filename, path.extname(filename)) + '.jpg';
    const thumbPath = path.join(THUMB_DIR, thumbFilename);

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
    console.log('  Created:', thumbFilename);
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
