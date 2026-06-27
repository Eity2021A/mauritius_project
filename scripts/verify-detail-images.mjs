/**
 * Verify all images in each place's folder appear in that place's images array.
 * Run from repo root: node scripts/verify-detail-images.mjs
 */
import fs from 'fs';
import path from 'path';

const PLACES_DIR = path.join(process.cwd(), 'public/images/places-to-visit');
const PLACE_DETAILS_PATH = path.join(process.cwd(), 'src/data/place-details.ts');
const ACTIVITY_DETAILS_PATH = path.join(process.cwd(), 'src/data/activity-details.ts');

// 1. List image files on disk per folder (exclude thumbnails, .DS_Store, .gitkeep)
const disk = {};
const dirs = fs.readdirSync(PLACES_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory() && !d.name.startsWith('.') && d.name !== 'thumbnails');
for (const d of dirs) {
  const dirPath = path.join(PLACES_DIR, d.name);
  const files = fs.readdirSync(dirPath, { withFileTypes: true })
    .filter(e => e.isFile() && /\.(jpg|jpeg|png|webp)$/i.test(e.name))
    .map(e => e.name);
  disk[d.name] = files.sort();
}

// 2. Extract (folder -> filenames) from place-details.ts and activity-details.ts
function extractImagesByFolder(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const byFolder = {};
  const regex = /\/images\/places-to-visit\/([^/]+)\/([^"]+\.(?:jpg|jpeg|png|webp))/gi;
  let m;
  while ((m = regex.exec(text)) !== null) {
    const folder = m[1];
    const filename = m[2];
    if (!byFolder[folder]) byFolder[folder] = [];
    if (!byFolder[folder].includes(filename)) byFolder[folder].push(filename);
  }
  return byFolder;
}

const placePaths = extractImagesByFolder(PLACE_DETAILS_PATH);
const activityPaths = extractImagesByFolder(ACTIVITY_DETAILS_PATH);

// Merge: if both have same folder, union the filenames
const dataByFolder = {};
for (const f of Object.keys(placePaths)) {
  dataByFolder[f] = [...new Set(placePaths[f] || [])];
}
for (const f of Object.keys(activityPaths)) {
  if (!dataByFolder[f]) dataByFolder[f] = [];
  dataByFolder[f] = [...new Set([...dataByFolder[f], ...(activityPaths[f] || [])])];
}

// 3. Find missing: folders that have images on disk but not all are in data
const missing = [];
for (const folder of Object.keys(disk)) {
  const onDisk = new Set(disk[folder]);
  const inData = new Set(dataByFolder[folder] || []);
  const missingFiles = disk[folder].filter(f => !inData.has(f));
  if (missingFiles.length > 0) {
    missing.push({ folder, slug: folder, missingFiles });
  }
}

// Also check: places that use a folder but we need slug for reporting. Get slug from place-details by finding which slug uses this folder.
const placeDetailsText = fs.readFileSync(PLACE_DETAILS_PATH, 'utf8');
const slugToFolder = {};
const slugBlockRegex = /"([a-z0-9-]+)":\s*\{\s*slug:\s*"\1"[^}]*?images:\s*\[\s*"\/images\/places-to-visit\/([^/]+)\//g;
let b;
while ((b = slugBlockRegex.exec(placeDetailsText)) !== null) {
  slugToFolder[b[1]] = b[2];
}

console.log('=== Detail pages: images on disk not in data ===\n');
if (missing.length === 0) {
  console.log('None – all folder images are referenced in place-details or activity-details.');
  process.exit(0);
}
for (const { folder, missingFiles } of missing) {
  const slug = Object.entries(slugToFolder).find(([, f]) => f === folder)?.[0] || folder;
  console.log(`Slug / Page: ${slug} (folder: ${folder})`);
  console.log(`  Missing ${missingFiles.length} image(s): ${missingFiles.join(', ')}`);
  console.log('');
}
console.log('Total folders with missing images:', missing.length);
process.exit(1);
