#!/usr/bin/env node
/**
 * Verify that all image paths referenced in src/ exist in Supabase Storage.
 * Run: node scripts/verify-supabase-images.mjs
 * Optional: set NEXT_PUBLIC_IMAGE_BASE_URL (no trailing slash) to override the default.
 *
 * Skips local-only paths (not in Supabase): /images/banners/*, /images/og-image.jpg, *.svg
 * Mapping for the rest: /images/beaches/x.jpg → SUPABASE_BASE/beaches/x.jpg
 */

import { readdirSync, readFileSync } from "fs";
import { join } from "path";

const root = process.cwd();
const srcDir = join(root, "src");

const SUPABASE_BASE =
  process.env.NEXT_PUBLIC_IMAGE_BASE_URL ||
  "https://htyodxbntlnwefjkcudc.supabase.co/storage/v1/object/public/mauritius_explored";

function isLocalOnlyPath(path) {
  if (!path || !path.startsWith("/images")) return false;
  if (path === "/images/og-image.jpg") return true;
  if (path.toLowerCase().endsWith(".svg")) return true;
  if (path.startsWith("/images/banners/")) return true;
  return false;
}

function extractPathsSync() {
  const out = new Set();
  function walk(dir) {
    for (const name of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, name.name);
      if (name.name === "node_modules" || name.name === ".next") continue;
      if (name.isDirectory()) {
        walk(full);
      } else if (/\.(ts|tsx|js|jsx|json)$/.test(name.name)) {
        const text = readFileSync(full, "utf8");
        const re = /["'`](\/images\/[^"'`\s]+)["'`]/g;
        let m;
        while ((m = re.exec(text)) !== null) out.add(m[1]);
      }
    }
  }
  walk(srcDir);
  return out;
}

function hasImageExtension(p) {
  return /\.(jpg|jpeg|png|gif|webp|avif)(\?|$)/i.test(p);
}

function appPathToSupabaseUrl(appPath) {
  const withoutPrefix = appPath.replace(/^\/images\/?/, "");
  return `${SUPABASE_BASE}/${withoutPrefix}`;
}

const allPaths = extractPathsSync();
const contentPaths = [...allPaths].filter((p) => {
  if (p.endsWith("/") || p.includes("*")) return false;
  if (!hasImageExtension(p)) return false;
  return !isLocalOnlyPath(p);
});

console.log(`Checking ${contentPaths.length} content image paths against Supabase...`);
console.log(`Base: ${SUPABASE_BASE}\n`);

const missing = [];
const failed = [];
let checked = 0;

// Check in batches to avoid overwhelming the server
const BATCH_SIZE = 10;
for (let i = 0; i < contentPaths.length; i += BATCH_SIZE) {
  const batch = contentPaths.slice(i, i + BATCH_SIZE);
  const results = await Promise.all(
    batch.map(async (appPath) => {
      const url = appPathToSupabaseUrl(appPath);
      try {
        const res = await fetch(url, { method: "HEAD", redirect: "follow" });
        let body = null;
        if (res.status === 400) {
          const getRes = await fetch(url, { redirect: "follow" });
          body = await getRes.text();
        }
        return { appPath, url, status: res.status, body };
      } catch (err) {
        return { appPath, url, status: 0, error: err.message, body: null };
      }
    })
  );
  for (const r of results) {
    checked++;
    const isNotFound =
      r.status === 404 ||
      (r.status === 400 && r.body && r.body.includes("not_found"));
    if (r.status === 200) {
      process.stdout.write(".");
    } else if (isNotFound) {
      missing.push({ path: r.appPath, url: r.url });
    } else {
      failed.push({ path: r.appPath, status: r.status, error: r.error });
    }
  }
  if (checked % 50 === 0 && checked < contentPaths.length) {
    console.log(` ${checked}/${contentPaths.length}`);
  }
}

console.log(`\n\nChecked ${checked} URLs.`);

if (missing.length > 0) {
  console.error("\n❌ MISSING IN SUPABASE (404 or 400 not_found):");
  missing.forEach(({ path, url }) => {
    console.error(`  App:    ${path}`);
    console.error(`  URL:    ${url}`);
    console.error("");
  });
}

if (failed.length > 0) {
  console.error("\n⚠️  OTHER ERRORS (non-200, non-404):");
  failed.forEach(({ path, status, error }) => {
    console.error(`  ${path} → ${status}${error ? ` (${error})` : ""}`);
  });
}

if (missing.length === 0 && failed.length === 0) {
  console.log("✓ All content images exist in Supabase.");
  process.exit(0);
}

process.exit(missing.length > 0 ? 1 : 0);
