/**
 * Rename all inshot-* and other non-SEO image files to {folder-name}-{n}.jpg
 * Also renames corresponding thumbnails. Updates place-details.ts path references.
 * Run from repo root: node scripts/rename-inshot-seo.mjs
 */
import fs from 'fs';
import path from 'path';

const PLACES_DIR = path.join(process.cwd(), 'public/images/places-to-visit');

// Files that need SEO rename: inshot-* or timestamp-like
function needsRename(filename) {
  return /^inshot-\d{8}-\d{6,}(-\d+)?\.(jpg|jpeg|png)$/i.test(filename);
}

const renames = []; // { oldWebPath, newWebPath } for code updates

const dirs = fs.readdirSync(PLACES_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory() && !d.name.startsWith('.'));

for (const dir of dirs) {
  const dirPath = path.join(PLACES_DIR, dir.name);
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })
    .filter(e => e.isFile() && /\.(jpg|jpeg|png)$/i.test(e.name));
  const toRename = entries.filter(e => needsRename(e.name)).map(e => e.name).sort();
  if (toRename.length === 0) continue;

  const thumbDir = path.join(dirPath, 'thumbnails');
  const hasThumbs = fs.existsSync(thumbDir);

  toRename.forEach((filename, i) => {
    const n = i + 1;
    const ext = path.extname(filename).toLowerCase();
    const newName = `${dir.name}-${n}.jpg`;
    const oldPath = path.join(dirPath, filename);
    const newPath = path.join(dirPath, newName);
    if (oldPath === newPath) return;
    if (fs.existsSync(newPath)) {
      console.warn(`Skip (target exists): ${filename} -> ${newName}`);
      return;
    }
    fs.renameSync(oldPath, newPath);
    console.log(`  ${dir.name}/${filename} -> ${newName}`);

    const oldWeb = `/images/places-to-visit/${dir.name}/${filename}`;
    const newWeb = `/images/places-to-visit/${dir.name}/${newName}`;
    renames.push({ oldWebPath: oldWeb, newWebPath: newWeb });

    if (hasThumbs) {
      const thumbOld = path.join(thumbDir, filename);
      const thumbNew = path.join(thumbDir, newName);
      if (fs.existsSync(thumbOld)) {
        fs.renameSync(thumbOld, thumbNew);
        console.log(`    thumb: ${filename} -> ${newName}`);
      }
    }
  });
}

// Write mapping for place-details updates (only paths that are referenced in code)
const refs = [
  '/images/places-to-visit/aapravasi-ghat/inshot-20200130-165903744.jpg',
  '/images/places-to-visit/aapravasi-ghat/inshot-20200130-165944191.jpg',
  '/images/places-to-visit/port-louis/inshot-20200127-093649602.jpg',
  '/images/places-to-visit/port-louis/inshot-20200127-093716556.jpg',
  '/images/places-to-visit/grse-waterfall/inshot-20200127-095257872.jpg',
  '/images/places-to-visit/champ-de-mars/inshot-20200130-172516537.jpg',
  '/images/places-to-visit/petrin-forest/inshot-20200127-124712543.jpg',
  '/images/places-to-visit/petrin-forest/inshot-20200127-124737745.jpg',
];
const mapping = {};
renames.forEach(r => { mapping[r.oldWebPath] = r.newWebPath; });
const updates = refs.map(old => ({ old, new: mapping[old] })).filter(u => u.new);
fs.writeFileSync(
  path.join(process.cwd(), 'scripts/rename-inshot-mapping.json'),
  JSON.stringify(updates, null, 2)
);
console.log('\nMapping for place-details.ts:', updates.length, 'paths');
updates.forEach(u => console.log('  ', u.old, '->', u.new));
