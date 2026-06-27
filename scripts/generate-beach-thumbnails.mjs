import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const BEACHES_DIR = './public/images/beaches';
const THUMBNAIL_FOLDER = 'thumbnails';

// Thumbnail config - optimized for cards/previews
const CONFIG = {
  maxWidth: 400,
  quality: 70,
};

function formatSize(bytes) {
  if (bytes < 1024) return bytes + 'B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + 'KB';
  return (bytes / (1024 * 1024)).toFixed(2) + 'MB';
}

async function generateThumbnail(sourcePath, thumbnailDir) {
  const filename = path.basename(sourcePath);
  const ext = path.extname(filename).toLowerCase();
  
  // Create thumbnail filename (always jpg for smaller size)
  const thumbFilename = filename.replace(/\.(jpg|jpeg|png)$/i, '.jpg');
  const thumbPath = path.join(thumbnailDir, thumbFilename);
  
  // Skip if thumbnail already exists and is newer than source
  if (fs.existsSync(thumbPath)) {
    const sourceStats = fs.statSync(sourcePath);
    const thumbStats = fs.statSync(thumbPath);
    if (thumbStats.mtime > sourceStats.mtime) {
      return { filename, skipped: true };
    }
  }
  
  const sourceStats = fs.statSync(sourcePath);
  
  // Generate thumbnail
  const buffer = await sharp(sourcePath)
    .resize(CONFIG.maxWidth, null, {
      withoutEnlargement: true,
      fit: 'inside'
    })
    .jpeg({
      quality: CONFIG.quality,
      mozjpeg: true,
      progressive: true
    })
    .toBuffer();
  
  // Ensure thumbnail directory exists
  if (!fs.existsSync(thumbnailDir)) {
    fs.mkdirSync(thumbnailDir, { recursive: true });
  }
  
  // Write thumbnail
  fs.writeFileSync(thumbPath, buffer);
  
  const thumbStats = fs.statSync(thumbPath);
  
  return {
    filename,
    sourceSize: sourceStats.size,
    thumbSize: thumbStats.size,
    skipped: false
  };
}

async function processDirectory(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  // Create thumbnails folder path for this directory
  const thumbnailDir = path.join(dir, THUMBNAIL_FOLDER);
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory() && entry.name !== THUMBNAIL_FOLDER) {
      // Recursively process subdirectories (skip thumbnail folders)
      const subResults = await processDirectory(fullPath);
      results.push(...subResults);
    } else if (entry.isFile()) {
      // Process image files
      const ext = path.extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        try {
          const result = await generateThumbnail(fullPath, thumbnailDir);
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
  console.log('🖼️  Beach Thumbnails Generation Script');
  console.log('=======================================\n');
  console.log(`Config: ${CONFIG.maxWidth}px wide, ${CONFIG.quality}% quality\n`);
  
  const results = await processDirectory(BEACHES_DIR);
  
  let totalSourceSize = 0;
  let totalThumbSize = 0;
  let created = 0;
  let skipped = 0;
  
  for (const result of results) {
    if (result.skipped) {
      skipped++;
      console.log(`○ ${result.filename}: already exists`);
    } else {
      created++;
      totalSourceSize += result.sourceSize;
      totalThumbSize += result.thumbSize;
      console.log(`✓ ${result.filename}: ${formatSize(result.sourceSize)} → ${formatSize(result.thumbSize)}`);
    }
  }
  
  console.log('\n=======================================');
  console.log(`📊 Summary:`);
  console.log(`   Created: ${created} thumbnails`);
  console.log(`   Skipped: ${skipped} (already exist)`);
  if (created > 0) {
    console.log(`   Thumbnail size: ${formatSize(totalThumbSize)} (vs ${formatSize(totalSourceSize)} original)`);
  }
}

main().catch(console.error);
