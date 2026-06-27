/**
 * Script to rename activity images to URL-safe names
 * Removes spaces and special characters from filenames
 */

import fs from 'fs';
import path from 'path';

const ACTIVITIES_DIR = './public/images/activities';

// Function to sanitize filename
function sanitizeFilename(filename) {
  const ext = path.extname(filename);
  const name = path.basename(filename, ext);
  
  // Convert to lowercase, replace spaces and special chars with hyphens
  const sanitized = name
    .toLowerCase()
    .replace(/[_']/g, '-')  // Replace underscores and apostrophes with hyphens
    .replace(/\s+/g, '-')   // Replace spaces with hyphens
    .replace(/-+/g, '-')    // Replace multiple hyphens with single hyphen
    .replace(/[^a-z0-9-]/g, '') // Remove any other special characters
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  
  return sanitized + ext.toLowerCase();
}

// Process all files in the activities directory
function renameFiles() {
  if (!fs.existsSync(ACTIVITIES_DIR)) {
    console.error(`Directory not found: ${ACTIVITIES_DIR}`);
    return;
  }

  const files = fs.readdirSync(ACTIVITIES_DIR);
  const renames = [];
  
  for (const file of files) {
    // Skip hidden files and directories
    if (file.startsWith('.')) continue;
    
    const filePath = path.join(ACTIVITIES_DIR, file);
    const stat = fs.statSync(filePath);
    
    // Only process files
    if (!stat.isFile()) continue;
    
    const sanitized = sanitizeFilename(file);
    
    if (file !== sanitized) {
      const newPath = path.join(ACTIVITIES_DIR, sanitized);
      
      // Check if target already exists
      if (fs.existsSync(newPath)) {
        console.log(`⚠️  Skipping ${file} - target ${sanitized} already exists`);
        continue;
      }
      
      renames.push({ from: file, to: sanitized, fromPath: filePath, toPath: newPath });
    }
  }
  
  console.log(`\nFound ${renames.length} files to rename:\n`);
  
  // Print rename plan
  for (const rename of renames) {
    console.log(`  ${rename.from}`);
    console.log(`  → ${rename.to}\n`);
  }
  
  // Perform renames
  console.log('\nRenaming files...\n');
  
  let successCount = 0;
  for (const rename of renames) {
    try {
      fs.renameSync(rename.fromPath, rename.toPath);
      console.log(`✅ ${rename.from} → ${rename.to}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to rename ${rename.from}: ${error.message}`);
    }
  }
  
  console.log(`\n✨ Successfully renamed ${successCount}/${renames.length} files`);
  
  // Print updated file list
  console.log('\n📁 Updated file list:\n');
  const updatedFiles = fs.readdirSync(ACTIVITIES_DIR)
    .filter(f => !f.startsWith('.') && fs.statSync(path.join(ACTIVITIES_DIR, f)).isFile())
    .sort();
  
  for (const file of updatedFiles) {
    console.log(`  /images/activities/${file}`);
  }
}

renameFiles();
