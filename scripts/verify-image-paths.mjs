#!/usr/bin/env node
/**
 * Verify that all /images/... paths referenced in src/ exist in the repo with exact casing.
 * Run: node scripts/verify-image-paths.mjs
 * Use before deploy to avoid broken images on case-sensitive hosts (e.g. Vercel).
 */

import { execSync } from "child_process";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";

const root = process.cwd();
const srcDir = join(root, "src");

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

const codePaths = extractPathsSync();

const gitList = execSync("git ls-files 'public/images/**'", { encoding: "utf8", cwd: root });
const gitPaths = new Set(
  gitList
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((p) => "/" + p.replace(/^public\//, ""))
);

const missing = [];
const caseMismatch = [];

const hasExtension = (p) => /\.(jpg|jpeg|png|gif|webp|svg|avif)(\?|$)/i.test(p);

for (const codePath of codePaths) {
  if (codePath.endsWith("/") || codePath.includes("*")) continue;
  if (!hasExtension(codePath)) continue; // skip directory/base paths like /images/mosaic
  if (gitPaths.has(codePath)) continue;
  const codeLower = codePath.toLowerCase();
  const actual = [...gitPaths].find((g) => g.toLowerCase() === codeLower);
  if (actual) {
    caseMismatch.push({ code: codePath, actual });
  } else {
    missing.push(codePath);
  }
}

if (caseMismatch.length === 0 && missing.length === 0) {
  console.log("✓ All", codePaths.size, "referenced image paths exist in the repo with correct casing.");
  process.exit(0);
}

let failed = false;
if (caseMismatch.length > 0) {
  failed = true;
  console.error("CASE MISMATCH (fix in code to match repo; deployment is case-sensitive):\n");
  for (const { code, actual } of caseMismatch) {
    console.error("  Code:  ", code);
    console.error("  Repo:  ", actual);
    console.error("");
  }
}
if (missing.length > 0) {
  failed = true;
  console.error("MISSING (referenced in code but not in repo):\n");
  missing.forEach((p) => console.error("  ", p));
}

process.exit(failed ? 1 : 0);
