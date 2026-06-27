/**
 * Generate thumbnails for any flat image folder
 * Usage: node scripts/generate-all-thumbnails.mjs [folder-name]
 * Example: node scripts/generate-all-thumbnails.mjs blog
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const THUMBNAIL_WIDTH = 400;
const QUALITY = 70;

async function generateThumbnails(folderName) {
  const sourceDir = path.join(process.cwd(), 'public/images', folderName);
  const thumbnailsDir = path.join(sourceDir, 'thumbnails');
  
  if (!fs.existsSync(sourceDir)) {
    console.error(`❌ Folder not found: ${sourceDir}`);
    process.exit(1);
  }
  
  console.log(`🖼️  Generating thumbnails for: ${folderName}\n`);
  
  // Create thumbnails directory if it doesn't exist
  if (!fs.existsSync(thumbnailsDir)) {
    fs.mkdirSync(thumbnailsDir, { recursive: true });
    console.log('📁 Created thumbnails directory\n');
  }
  
  // Get all image files (excluding directories and hidden files)
  const files = fs.readdirSync(sourceDir).filter(file => {
    const filePath = path.join(sourceDir, file);
    const isFile = fs.statSync(filePath).isFile();
    const isImage = /\.(jpg|jpeg|png|webp)$/i.test(file);
    const isNotHidden = !file.startsWith('.');
    return isFile && isImage && isNotHidden;
  });
  
  console.log(`Found ${files.length} images to process\n`);
  
  let processed = 0;
  let skipped = 0;
  let errors = 0;
  
  for (const file of files) {
    const inputPath = path.join(sourceDir, file);
    const outputFilename = file.replace(/\.(png|webp)$/i, '.jpg');
    const outputPath = path.join(thumbnailsDir, outputFilename);
    
    // Skip if thumbnail already exists
    if (fs.existsSync(outputPath)) {
      skipped++;
      continue;
    }
    
    try {
      await sharp(inputPath)
        .resize(THUMBNAIL_WIDTH, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .jpeg({ quality: QUALITY })
        .toFile(outputPath);
      
      processed++;
      console.log(`✓ ${file}`);
    } catch (err) {
      errors++;
      console.error(`❌ Error processing ${file}: ${err.message}`);
    }
  }
  
  console.log('\n═══════════════════════════════════════');
  console.log(`✅ Thumbnails generated: ${processed}`);
  console.log(`⏭️  Skipped (already exist): ${skipped}`);
  if (errors > 0) {
    console.log(`❌ Errors: ${errors}`);
  }
  console.log('═══════════════════════════════════════');
}

// Get folder name from command line args
const folderName = process.argv[2];
if (!folderName) {
  console.log('Usage: node scripts/generate-all-thumbnails.mjs [folder-name]');
  console.log('Example: node scripts/generate-all-thumbnails.mjs blog');
  process.exit(1);
}

generateThumbnails(folderName).catch(console.error);
