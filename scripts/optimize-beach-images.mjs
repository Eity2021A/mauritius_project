import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const BEACHES_DIR = './public/images/beaches';

// Beach card images - displayed at max ~400px in grid
const CONFIG = {
  maxWidth: 800,
  quality: 75,
};

async function getImageInfo(filePath) {
  const stats = fs.statSync(filePath);
  const metadata = await sharp(filePath).metadata();
  return {
    size: stats.size,
    width: metadata.width,
    height: metadata.height
  };
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + 'B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + 'KB';
  return (bytes / (1024 * 1024)).toFixed(2) + 'MB';
}

async function processImage(filePath) {
  const filename = path.basename(filePath);
  const before = await getImageInfo(filePath);
  
  // Read the image
  let image = sharp(filePath);
  const metadata = await image.metadata();
  
  // Only resize if wider than maxWidth
  if (metadata.width > CONFIG.maxWidth) {
    image = image.resize(CONFIG.maxWidth, null, {
      withoutEnlargement: true,
      fit: 'inside'
    });
  }
  
  // Determine output format based on input
  const ext = path.extname(filePath).toLowerCase();
  let buffer;
  
  if (ext === '.png') {
    buffer = await image.png({ quality: CONFIG.quality, compressionLevel: 9 }).toBuffer();
  } else {
    // JPEG for jpg/jpeg
    buffer = await image
      .jpeg({
        quality: CONFIG.quality,
        mozjpeg: true,
        progressive: true
      })
      .toBuffer();
  }
  
  // Write back to file
  fs.writeFileSync(filePath, buffer);
  
  const after = await getImageInfo(filePath);
  const savings = before.size - after.size;
  const savingsPercent = ((savings / before.size) * 100).toFixed(1);
  
  return { 
    filename,
    beforeWidth: before.width,
    afterWidth: after.width,
    beforeSize: before.size, 
    afterSize: after.size,
    savingsPercent
  };
}

async function processDirectory(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // Recursively process subdirectories
      const subResults = await processDirectory(fullPath);
      results.push(...subResults);
    } else {
      // Process image files
      const ext = path.extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        try {
          const result = await processImage(fullPath);
          results.push(result);
        } catch (err) {
          console.error(`✗ Error processing ${fullPath}:`, err.message);
        }
      }
    }
  }
  
  return results;
}

async function main() {
  console.log('🏖️  Beach Images Optimization Script');
  console.log('=====================================\n');
  
  const results = await processDirectory(BEACHES_DIR);
  
  let totalBefore = 0;
  let totalAfter = 0;
  
  for (const result of results) {
    totalBefore += result.beforeSize;
    totalAfter += result.afterSize;
    
    if (result.savingsPercent > 0) {
      console.log(`✓ ${result.filename}: ${result.beforeWidth}→${result.afterWidth}px, ${formatSize(result.beforeSize)}→${formatSize(result.afterSize)} (-${result.savingsPercent}%)`);
    } else {
      console.log(`○ ${result.filename}: already optimized`);
    }
  }
  
  console.log('\n=====================================');
  console.log(`📊 Summary: ${results.length} images processed`);
  console.log(`   Total before: ${formatSize(totalBefore)}`);
  console.log(`   Total after:  ${formatSize(totalAfter)}`);
  console.log(`   Saved: ${formatSize(totalBefore - totalAfter)} (${((totalBefore - totalAfter) / totalBefore * 100).toFixed(1)}%)`);
}

main().catch(console.error);
