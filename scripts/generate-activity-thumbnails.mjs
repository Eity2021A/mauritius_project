/**
 * Generate thumbnails for activity images
 * Creates a thumbnails subfolder with optimized 400px wide versions
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ACTIVITIES_DIR = path.join(process.cwd(), 'public/images/activities');
const THUMBNAILS_DIR = path.join(ACTIVITIES_DIR, 'thumbnails');
const THUMBNAIL_WIDTH = 400;
const QUALITY = 70;

async function generateThumbnails() {
  console.log('🖼️  Generating activity thumbnails...\n');
  
  // Create thumbnails directory if it doesn't exist
  if (!fs.existsSync(THUMBNAILS_DIR)) {
    fs.mkdirSync(THUMBNAILS_DIR, { recursive: true });
    console.log('📁 Created thumbnails directory\n');
  }
  
  // Get all image files (excluding directories and hidden files)
  const files = fs.readdirSync(ACTIVITIES_DIR).filter(file => {
    const filePath = path.join(ACTIVITIES_DIR, file);
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
    const inputPath = path.join(ACTIVITIES_DIR, file);
    const outputFilename = file.replace(/\.(png|webp)$/i, '.jpg');
    const outputPath = path.join(THUMBNAILS_DIR, outputFilename);
    
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
      process.stdout.write(`\r✓ Processed: ${processed}/${files.length - skipped}`);
    } catch (err) {
      errors++;
      console.error(`\n❌ Error processing ${file}: ${err.message}`);
    }
  }
  
  console.log('\n');
  console.log('═══════════════════════════════════════');
  console.log(`✅ Thumbnails generated: ${processed}`);
  console.log(`⏭️  Skipped (already exist): ${skipped}`);
  if (errors > 0) {
    console.log(`❌ Errors: ${errors}`);
  }
  console.log('═══════════════════════════════════════');
}

generateThumbnails().catch(console.error);
