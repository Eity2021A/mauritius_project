/**
 * Add missing folder images to place-details.ts and activity-details.ts.
 * Run from repo root: node scripts/fix-missing-detail-images.mjs
 */
import fs from 'fs';
import path from 'path';

const PLACES_DIR = path.join(process.cwd(), 'public/images/places-to-visit');
const PLACE_DETAILS_PATH = path.join(process.cwd(), 'src/data/place-details.ts');
const ACTIVITY_DETAILS_PATH = path.join(process.cwd(), 'src/data/activity-details.ts');

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

function extractByFolder(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const byFolder = {};
  const regex = /\/images\/places-to-visit\/([^/]+)\/([^"]+\.(?:jpg|jpeg|png|webp))/gi;
  let m;
  while ((m = regex.exec(text)) !== null) {
    const folder = m[1];
    if (!byFolder[folder]) byFolder[folder] = new Set();
    byFolder[folder].add(m[2]);
  }
  return byFolder;
}

const placePaths = extractByFolder(PLACE_DETAILS_PATH);
const activityPaths = extractByFolder(ACTIVITY_DETAILS_PATH);

// Which folder is used by which slug in place-details? Parse "slug": "x" then images with folder.
const placeDetailsText = fs.readFileSync(PLACE_DETAILS_PATH, 'utf8');
const placeSlugToFolder = {};
const blockRe = /"([^"]+)":\s*\{\s*slug:\s*"[^"]*"[\s\S]*?images:\s*\[\s*"\/images\/places-to-visit\/([^/]+)\//g;
let b;
while ((b = blockRe.exec(placeDetailsText)) !== null) {
  placeSlugToFolder[b[1]] = b[2];
}

const activityDetailsText = fs.readFileSync(ACTIVITY_DETAILS_PATH, 'utf8');
const activitySlugToFolder = {};
const blockRe2 = /"([^"]+)":\s*\{\s*slug:\s*"[^"]*"[\s\S]*?images:\s*\[\s*"\/images\/places-to-visit\/([^/]+)\//g;
while ((b = blockRe2.exec(activityDetailsText)) !== null) {
  activitySlugToFolder[b[1]] = b[2];
}

function addMissingToFile(filePath, slugToFolder, pathsByFolder) {
  let text = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  for (const [slug, folder] of Object.entries(slugToFolder)) {
    const onDisk = disk[folder] || [];
    const inData = pathsByFolder[folder] || new Set();
    const missing = onDisk.filter(f => !inData.has(f));
    if (missing.length === 0) continue;
    const prefix = `/images/places-to-visit/${folder}/`;
    const newPaths = missing.map(f => `      "${prefix}${f}"`);
    if (newPaths.length === 0) continue;
    // Find the images array for this slug and add before the closing ];
    const slugKey = `"${slug}"`;
    const idx = text.indexOf(slugKey);
    if (idx === -1) continue;
    const afterSlug = text.slice(idx);
    const imagesStart = afterSlug.indexOf('images: [');
    if (imagesStart === -1) continue;
    const arrayStart = afterSlug.indexOf('[', afterSlug.indexOf('images:'));
    const arrayEnd = afterSlug.indexOf('],', arrayStart);
    const arrayContent = afterSlug.slice(arrayStart, arrayEnd + 1);
    const lastLine = arrayContent.trimEnd().split('\n').pop();
    const insertBefore = lastLine.trim();
    const newBlock = arrayContent.slice(0, -lastLine.length) + (arrayContent.trimEnd().endsWith(',') ? '' : ',') + '\n' + newPaths.join(',\n') + '\n    ]';
    const oldBlock = arrayContent;
    if (oldBlock === newBlock) continue;
    const fullOld = afterSlug.slice(0, arrayStart) + oldBlock + afterSlug.slice(arrayEnd + 1);
    const fullNew = afterSlug.slice(0, arrayStart) + newBlock + afterSlug.slice(arrayEnd + 1);
    text = text.slice(0, idx) + fullNew + text.slice(idx + fullOld.length);
    changed = true;
    console.log(`  Added ${missing.length} image(s) to ${slug} in ${path.basename(filePath)}`);
  }
  if (changed) fs.writeFileSync(filePath, text);
  return changed;
}

// Build path set per file (place has its own, activity has its own) so we only add to the file that owns that slug's folder
const placeDataByFolder = extractByFolder(PLACE_DETAILS_PATH);
const activityDataByFolder = extractByFolder(ACTIVITY_DETAILS_PATH);

console.log('Fixing place-details.ts...');
addMissingToFile(PLACE_DETAILS_PATH, placeSlugToFolder, placeDataByFolder);

console.log('Fixing activity-details.ts...');
addMissingToFile(ACTIVITY_DETAILS_PATH, activitySlugToFolder, activityDataByFolder);

console.log('Done. Re-run verify-detail-images.mjs to confirm.');
