/**
 * Export all detail pages (places, activities, beaches) with gallery image names
 * for pasting into Google Sheets. Run from repo root: node scripts/export-detail-gallery-images.mjs
 */

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function extractEntries(content) {
  const entries = [];
  const slugRe = /slug:\s*"([^"]+)"/g;
  const pathRe = /"(\/images\/[^"]+\.(?:jpg|jpeg|png|webp))"/g;

  let slugMatch;
  while ((slugMatch = slugRe.exec(content)) !== null) {
    const slug = slugMatch[1];
    const afterSlug = content.slice(slugMatch.index);
    const imagesStart = afterSlug.indexOf("images:");
    if (imagesStart === -1) {
      entries.push({ slug, imageNames: [] });
      continue;
    }
    const bracketStart = afterSlug.indexOf("[", imagesStart);
    if (bracketStart === -1) {
      entries.push({ slug, imageNames: [] });
      continue;
    }
    let depth = 1;
    let end = bracketStart + 1;
    for (; end < afterSlug.length && depth > 0; end++) {
      const c = afterSlug[end];
      if (c === "[") depth++;
      else if (c === "]") depth--;
    }
    const block = afterSlug.slice(bracketStart, end);
    const paths = [];
    let p;
    const pathRe2 = /"(\/images\/[^"]+\.(?:jpg|jpeg|png|webp))"/g;
    while ((p = pathRe2.exec(block)) !== null) paths.push(p[1]);
    entries.push({
      slug,
      imageNames: paths.map((path) => path.split("/").pop()),
    });
  }
  return entries;
}

function escapeCsv(val) {
  const s = String(val);
  if (s.includes(",") || s.includes('"') || s.includes("\n"))
    return `"${s.replace(/"/g, '""')}"`;
  return s;
}

const configs = [
  {
    type: "Place",
    route: "/top-activities-mauritius",
    file: "src/data/place-details.ts",
  },
  {
    type: "Activity",
    route: "/top-activities-mauritius",
    file: "src/data/activity-details.ts",
  },
  {
    type: "Beach",
    route: "/beaches-in-mauritius",
    file: "src/data/beach-details.ts",
  },
];

const lines = [];
const header = ["Type", "#", "Slug", "Route", "Gallery image names"];
lines.push(header.map(escapeCsv).join(","));

let index = 0;
for (const { type, route, file } of configs) {
  const content = readFileSync(join(root, file), "utf-8");
  const entries = extractEntries(content);
  for (const { slug, imageNames } of entries) {
    index++;
    const row = [
      type,
      index,
      slug,
      `${route}/${slug}`,
      imageNames.join(", "),
    ];
    lines.push(row.map(escapeCsv).join(","));
  }
}

const csv = lines.join("\n");
console.log(csv);
