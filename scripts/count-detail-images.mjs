/**
 * Count unique image paths used on detail pages (places, activities, beaches).
 * Run from repo root: node scripts/count-detail-images.mjs
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const imageRe = /"(\/images\/[^"]+\.(?:jpg|jpeg|png|webp))"/g;

const files = [
  join(root, 'src/data/place-details.ts'),
  join(root, 'src/data/activity-details.ts'),
  join(root, 'src/data/beach-details.ts'),
];

const unique = new Set();
const bySource = { places: 0, activities: 0, beaches: 0 };

for (const file of files) {
  const content = readFileSync(file, 'utf-8');
  const source = file.includes('place-details') ? 'places' : file.includes('activity-details') ? 'activities' : 'beaches';
  let match;
  while ((match = imageRe.exec(content)) !== null) {
    const path = match[1];
    if (path.includes('thumbnails')) continue;
    unique.add(path);
    bySource[source]++;
  }
}

console.log('Unique images on detail pages (places + activities + beaches):', unique.size);
console.log('\nBy source file (references, not unique):');
console.log('  place-details.ts:', bySource.places);
console.log('  activity-details.ts:', bySource.activities);
console.log('  beach-details.ts:', bySource.beaches);
console.log('\nTotal references:', bySource.places + bySource.activities + bySource.beaches);

// Optional: breakdown by prefix
const byPrefix = {};
for (const p of unique) {
  const prefix = p.startsWith('/images/places-to-visit') ? 'places-to-visit' : p.startsWith('/images/beaches') ? 'beaches' : 'other';
  byPrefix[prefix] = (byPrefix[prefix] || 0) + 1;
}
console.log('\nUnique by folder:');
Object.entries(byPrefix).forEach(([k, v]) => console.log('  ', k + ':', v));
