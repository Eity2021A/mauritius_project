/**
 * Create thumbnails for Château de Bel Ombre images.
 * Run from repo root: node scripts/process-chateau-thumbnails.mjs
 */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const DIR = path.join(process.cwd(), 'public/images/places-to-visit/chateau-de-bel-ombre');
const THUMB_DIR = path.join(DIR, 'thumbnails');
const THUMB_WIDTH = 400;
const THUMB_QUALITY = 70;

async function main() {
  const entries = fs.readdirSync(DIR, { withFileTypes: true });
  if (!fs.existsSync(THUMB_DIR)) {
    fs.mkdirSync(THUMB_DIR, { recursive: true });
  }

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const ext = path.extname(entry.name).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;
    if (entry.name === '.gitkeep') continue;

    const srcPath = path.join(DIR, entry.name);
    const thumbName = entry.name.replace(/\.(jpg|jpeg|png)$/i, '.jpg');
    const thumbPath = path.join(THUMB_DIR, thumbName);

    await sharp(srcPath)
      .resize(THUMB_WIDTH, null, { withoutEnlargement: true, fit: 'inside' })
      .jpeg({ quality: THUMB_QUALITY, mozjpeg: true })
      .toFile(thumbPath);
    console.log('  Thumb:', thumbName);
  }
  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
