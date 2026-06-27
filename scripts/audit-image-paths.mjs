#!/usr/bin/env node
/**
 * Audit: find all image paths referenced in src and check if files exist.
 * If missing, search for the filename elsewhere in public/images.
 */
import { readFileSync, readdirSync, existsSync } from "fs";
import { join } from "path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");
const PUBLIC = join(ROOT, "public");

// Extract all "/images/..." paths from a file
function extractPaths(content) {
  const re = /["'`](\/images\/[a-zA-Z0-9/_.-]+\.(jpg|jpeg|png|webp))["'`]/g;
  const paths = new Set();
  let m;
  while ((m = re.exec(content)) !== null) paths.add(m[1]);
  return paths;
}

// Recursively list all files under dir
function* walkFiles(dir, prefix = "") {
  try {
    for (const name of readdirSync(dir, { withFileTypes: true })) {
      const path = prefix ? `${prefix}/${name.name}` : name.name;
      if (name.isDirectory()) {
        if (name.name === "node_modules" || name.name === ".git") continue;
        yield* walkFiles(join(dir, name.name), path);
      } else {
        yield path;
      }
    }
  } catch (_) {}
}

// Collect all image paths from src
const srcPaths = new Set();
function scanDir(dir) {
  try {
    for (const name of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, name.name);
      if (name.isDirectory()) {
        if (name.name === "node_modules" || name.name === ".git") continue;
        scanDir(full);
      } else if (/\.(ts|tsx|js|jsx|json)$/.test(name.name)) {
        const content = readFileSync(full, "utf8");
        extractPaths(content).forEach((p) => srcPaths.add(p));
      }
    }
  } catch (_) {}
}
scanDir(SRC);

// Build map: basename -> list of full paths under public/images
const filenameToLocations = new Map();
for (const rel of walkFiles(join(PUBLIC, "images"))) {
  const base = rel.split("/").pop();
  if (!filenameToLocations.has(base)) filenameToLocations.set(base, []);
  filenameToLocations.get(base).push("/images/" + rel);
}

const missing = [];
const found = [];

for (const path of [...srcPaths].sort()) {
  const fullPath = join(PUBLIC, path.replace(/^\//, ""));
  if (existsSync(fullPath)) {
    found.push(path);
  } else {
    const base = path.split("/").pop();
    const elsewhere = filenameToLocations.get(base) || [];
    missing.push({ referenced: path, elsewhere });
  }
}

console.log("=== Image path audit ===\n");
console.log("Total unique paths in src:", srcPaths.size);
console.log("Found on disk:", found.length);
console.log("Missing (referenced path does not exist):", missing.length);
if (missing.length > 0) {
  console.log("\n--- MISSING (code points to path that does not exist) ---");
  for (const { referenced, elsewhere } of missing) {
    console.log("\nReferenced:", referenced);
    if (elsewhere.length > 0) {
      console.log("  -> File EXISTS elsewhere:");
      elsewhere.forEach((p) => console.log("     ", p));
    } else {
      console.log("  -> File NOT FOUND anywhere under public/images");
    }
  }
}
