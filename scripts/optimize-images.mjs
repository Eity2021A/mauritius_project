import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../public');

// Images to optimize - focusing on hero/background images which are the largest
const heroImages = ['bg_1.jpg', 'bg_2.jpg', 'bg_3.jpg', 'bg_4.jpg', 'bg_5.jpg'];
const placeImages = ['place-1.jpg', 'place-2.jpg', 'place-3.jpg', 'place-4.jpg', 'place-5.jpg'];
const destinationImages = ['destination-1.jpg', 'destination-2.jpg', 'destination-3.jpg', 'destination-4.jpg', 'destination-5.jpg', 'destination-6.jpg'];

async function optimizeImage(filename, maxWidth = 1920, quality = 80) {
  const inputPath = path.join(publicDir, filename);
  const backupPath = path.join(publicDir, `_backup_${filename}`);
  
  if (!fs.existsSync(inputPath)) {
    console.log(`⚠️  ${filename}: File not found, skipping`);
    return;
  }
  
  const originalSize = fs.statSync(inputPath).size;
  
  // Create backup
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(inputPath, backupPath);
  }
  
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Only resize if larger than maxWidth
    let pipeline = image;
    if (metadata.width > maxWidth) {
      pipeline = pipeline.resize(maxWidth, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }
    
    // Optimize as JPEG with quality setting
    const optimizedBuffer = await pipeline
      .jpeg({ 
        quality, 
        progressive: true,
        mozjpeg: true 
      })
      .toBuffer();
    
    // Write optimized image back to original path
    fs.writeFileSync(inputPath, optimizedBuffer);
    
    const optimizedSize = optimizedBuffer.length;
    const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
    const originalKB = (originalSize / 1024).toFixed(0);
    const optimizedKB = (optimizedSize / 1024).toFixed(0);
    
    if (optimizedSize < originalSize) {
      console.log(`✅ ${filename}: ${originalKB} KB → ${optimizedKB} KB (${savings}% smaller)`);
    } else {
      console.log(`⏭️  ${filename}: ${originalKB} KB → already optimized`);
    }
  } catch (error) {
    console.error(`❌ Error optimizing ${filename}:`, error.message);
  }
}

async function main() {
  console.log('🖼️  Optimizing images for PageSpeed...\n');
  
  console.log('📸 Hero/Background Images (max 1920px, quality 80):');
  for (const image of heroImages) {
    await optimizeImage(image, 1920, 80);
  }
  
  console.log('\n📍 Place Images (max 800px, quality 85):');
  for (const image of placeImages) {
    await optimizeImage(image, 800, 85);
  }
  
  console.log('\n🌴 Destination Images (max 800px, quality 85):');
  for (const image of destinationImages) {
    await optimizeImage(image, 800, 85);
  }
  
  console.log('\n✅ Optimization complete!');
  console.log('💡 Backups saved with _backup_ prefix in public folder.');
  console.log('🔄 Run "npm run build" to test production performance.');
}

main().catch(console.error);
