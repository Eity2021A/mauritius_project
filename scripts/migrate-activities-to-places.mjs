#!/usr/bin/env node
/**
 * Migrate images from public/images/activities to public/images/places-to-visit.
 * - Infers target folder from config (activity slug or filename prefix).
 * - If target already has same file (by content hash): skip copy, delete source.
 * - If same name but different content: copy with new name (-2, -3, etc.).
 * - Writes path-map.json for code updates.
 */

import fs from "fs";
import path from "path";
import { createHash } from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const ACTIVITIES_DIR = path.join(ROOT, "public", "images", "activities");
const PLACES_DIR = path.join(ROOT, "public", "images", "places-to-visit");
const CONFIG_PATH = path.join(__dirname, "migrate-activities-to-places.config.json");
const PATH_MAP_OUT = path.join(ROOT, "scripts", "migrate-activities-path-map.json");

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
const prefixToFolder = config.filenamePrefixToFolder || {};
const slugToFolder = config.activitySlugToFolder || {};

function getTargetFolder(filename) {
  const base = path.basename(filename, path.extname(filename)).toLowerCase().replace(/\s+/g, "-");
  let best = null;
  let bestLen = 0;
  for (const [prefix, folder] of Object.entries(prefixToFolder)) {
    const p = prefix.toLowerCase();
    if (base.startsWith(p) && p.length > bestLen) {
      best = folder;
      bestLen = p.length;
    }
  }
  return best;
}

function sha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return createHash("sha256").update(buf).digest("hex");
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function* listImages(dir, subdir = "") {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const rel = subdir ? `${subdir}/${e.name}` : e.name;
    if (e.isDirectory()) {
      if (e.name === "thumbnails") {
        yield* listImages(path.join(dir, e.name), `${subdir}/${e.name}`);
      }
      continue;
    }
    if (/\.(jpg|jpeg|png|webp)$/i.test(e.name)) yield rel;
  }
}

const pathMap = {}; // old path (e.g. /images/activities/x.jpg) -> new path
const moved = [];
const deleted = [];
const skipped = [];

for (const rel of listImages(ACTIVITIES_DIR)) {
  const srcPath = path.join(ACTIVITIES_DIR, rel);
  const filename = path.basename(rel);
  const folder = getTargetFolder(filename);
  if (!folder) {
    skipped.push(rel);
    continue;
  }
  const isThumb = rel.includes("thumbnails");
  const targetDir = isThumb
    ? path.join(PLACES_DIR, folder, "thumbnails")
    : path.join(PLACES_DIR, folder);
  ensureDir(targetDir);
  const targetPath = path.join(targetDir, filename);
  const oldUrl = `/images/activities/${rel.replace(/\\/g, "/")}`;

  if (fs.existsSync(targetPath)) {
    const srcHash = sha256(srcPath);
    const tgtHash = sha256(targetPath);
    if (srcHash === tgtHash) {
      fs.unlinkSync(srcPath);
      deleted.push(rel);
      pathMap[oldUrl] = `/images/places-to-visit/${folder}${isThumb ? "/thumbnails" : ""}/${filename}`;
      continue;
    }
    let newName = filename;
    const ext = path.extname(filename);
    const base = path.basename(filename, ext);
    for (let n = 2; n < 20; n++) {
      newName = `${base}-${n}${ext}`;
      const np = path.join(targetDir, newName);
      if (!fs.existsSync(np)) break;
    }
    fs.copyFileSync(srcPath, path.join(targetDir, newName));
    pathMap[oldUrl] = `/images/places-to-visit/${folder}${isThumb ? "/thumbnails" : ""}/${newName}`;
    moved.push({ from: rel, to: `${folder}/${isThumb ? "thumbnails/" : ""}${newName}` });
    fs.unlinkSync(srcPath);
  } else {
    fs.copyFileSync(srcPath, targetPath);
    pathMap[oldUrl] = `/images/places-to-visit/${folder}${isThumb ? "/thumbnails" : ""}/${filename}`;
    moved.push({ from: rel, to: `${folder}/${isThumb ? "thumbnails/" : ""}${filename}` });
    fs.unlinkSync(srcPath);
  }
}

fs.writeFileSync(PATH_MAP_OUT, JSON.stringify(pathMap, null, 2), "utf8");
console.log("Path map written to", PATH_MAP_OUT);
console.log("Moved:", moved.length);
console.log("Deleted (duplicates):", deleted.length);
console.log("Skipped (no folder match):", skipped.length);
if (skipped.length) console.log("Skipped files:", skipped.slice(0, 20).join(", "), skipped.length > 20 ? "..." : "");
