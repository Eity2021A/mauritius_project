/**
 * Script to optimize activity images for web
 * Resizes images to appropriate web sizes and compresses them
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ACTIVITIES_DIR = './public/images/activities';
const MAX_WIDTH = 1200;  // Max width for activity images
const QUALITY = 80;      // JPEG quality

async function optimizeImages() {
  if (!fs.existsSync(ACTIVITIES_DIR)) {
    console.error(`Directory not found: ${ACTIVITIES_DIR}`);
    return;
  }

  const files = fs.readdirSync(ACTIVITIES_DIR)
    .filter(f => !f.startsWith('.') && /\.(jpg|jpeg|png)$/i.test(f));

  console.log(`Found ${files.length} images to optimize\n`);

  let totalOriginal = 0;
  let totalOptimized = 0;
  let optimizedCount = 0;

  for (const file of files) {
    const filePath = path.join(ACTIVITIES_DIR, file);
    const stat = fs.statSync(filePath);
    const originalSize = stat.size;
    totalOriginal += originalSize;

    try {
      // Read the image
      const image = sharp(filePath);
      const metadata = await image.metadata();

      // Skip if already small enough
      if (originalSize < 100 * 1024) {
        console.log(`⏭️  ${file} - already small (${(originalSize / 1024).toFixed(0)}KB)`);
        totalOptimized += originalSize;
        continue;
      }

      // Determine target width
      const targetWidth = Math.min(metadata.width || MAX_WIDTH, MAX_WIDTH);

      // Process the image
      const optimized = await image
        .resize(targetWidth, null, { withoutEnlargement: true })
        .jpeg({ quality: QUALITY, progressive: true, mozjpeg: true })
        .toBuffer();

      // Only save if smaller
      if (optimized.length < originalSize) {
        fs.writeFileSync(filePath, optimized);
        totalOptimized += optimized.length;
        optimizedCount++;
        
        const savings = ((1 - optimized.length / originalSize) * 100).toFixed(0);
        console.log(`✅ ${file}: ${(originalSize / 1024).toFixed(0)}KB → ${(optimized.length / 1024).toFixed(0)}KB (-${savings}%)`);
      } else {
        totalOptimized += originalSize;
        console.log(`⏭️  ${file} - already optimized`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${file}: ${error.message}`);
      totalOptimized += originalSize;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`📊 Summary:`);
  console.log(`   Files processed: ${files.length}`);
  console.log(`   Files optimized: ${optimizedCount}`);
  console.log(`   Original size:   ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Optimized size:  ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Total savings:   ${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}%`);
  console.log('='.repeat(60));
}

optimizeImages();
