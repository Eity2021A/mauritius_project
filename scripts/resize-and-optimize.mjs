import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = './public';

// Image optimization configurations
const configs = {
  // Hero/background images - keep 1920px wide, high quality but compressed
  hero: {
    pattern: /^bg_\d+\.jpg$/,
    maxWidth: 1920,
    quality: 75,
    targetSize: '~100KB'
  },
  // Place cards - displayed at max 640px on desktop
  place: {
    pattern: /^place-\d+\.jpg$/,
    maxWidth: 640,
    quality: 75,
    targetSize: '~50KB'
  },
  // Destination cards - displayed at max 288px in marquee
  destination: {
    pattern: /^destination-\d+\.jpg$/,
    maxWidth: 400,
    quality: 75,
    targetSize: '~40KB'
  },
  // About images
  about: {
    pattern: /^about.*\.jpg$/,
    maxWidth: 800,
    quality: 75,
    targetSize: '~60KB'
  },
  // Service images
  services: {
    pattern: /^services-\d+\.jpg$/,
    maxWidth: 640,
    quality: 75,
    targetSize: '~50KB'
  },
  // Hotel/restaurant images
  hotelResto: {
    pattern: /^hotel-resto-\d+\.jpg$/,
    maxWidth: 640,
    quality: 75,
    targetSize: '~50KB'
  },
  // Person images (testimonials)
  person: {
    pattern: /^person_\d+\.jpg$/,
    maxWidth: 200,
    quality: 80,
    targetSize: '~15KB'
  },
  // Generic images
  image: {
    pattern: /^image_\d+\.jpg$/,
    maxWidth: 800,
    quality: 75,
    targetSize: '~60KB'
  }
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

async function processImage(filePath, config) {
  const filename = path.basename(filePath);
  const before = await getImageInfo(filePath);
  
  // Read the image
  let image = sharp(filePath);
  const metadata = await image.metadata();
  
  // Only resize if wider than maxWidth
  if (metadata.width > config.maxWidth) {
    image = image.resize(config.maxWidth, null, {
      withoutEnlargement: true,
      fit: 'inside'
    });
  }
  
  // Optimize with JPEG compression
  const buffer = await image
    .jpeg({
      quality: config.quality,
      mozjpeg: true, // Use mozjpeg for better compression
      progressive: true
    })
    .toBuffer();
  
  // Write back to file
  fs.writeFileSync(filePath, buffer);
  
  const after = await getImageInfo(filePath);
  const savings = before.size - after.size;
  const savingsPercent = ((savings / before.size) * 100).toFixed(1);
  
  console.log(`✓ ${filename}`);
  console.log(`  Dimensions: ${before.width}x${before.height} → ${after.width}x${after.height}`);
  console.log(`  Size: ${formatSize(before.size)} → ${formatSize(after.size)} (saved ${savingsPercent}%)`);
  console.log('');
  
  return { before: before.size, after: after.size };
}

async function main() {
  console.log('🖼️  Image Resize & Optimization Script');
  console.log('=====================================\n');
  
  const files = fs.readdirSync(PUBLIC_DIR);
  let totalBefore = 0;
  let totalAfter = 0;
  let processed = 0;
  
  for (const file of files) {
    const filePath = path.join(PUBLIC_DIR, file);
    
    // Skip directories and non-jpg files
    if (fs.statSync(filePath).isDirectory()) continue;
    if (!file.endsWith('.jpg')) continue;
    
    // Find matching config
    let matchedConfig = null;
    for (const [name, config] of Object.entries(configs)) {
      if (config.pattern.test(file)) {
        matchedConfig = { name, ...config };
        break;
      }
    }
    
    if (matchedConfig) {
      try {
        const result = await processImage(filePath, matchedConfig);
        totalBefore += result.before;
        totalAfter += result.after;
        processed++;
      } catch (err) {
        console.error(`✗ Error processing ${file}:`, err.message);
      }
    }
  }
  
  console.log('=====================================');
  console.log(`📊 Summary: ${processed} images processed`);
  console.log(`   Total before: ${formatSize(totalBefore)}`);
  console.log(`   Total after:  ${formatSize(totalAfter)}`);
  console.log(`   Saved: ${formatSize(totalBefore - totalAfter)} (${((totalBefore - totalAfter) / totalBefore * 100).toFixed(1)}%)`);
}

main().catch(console.error);
