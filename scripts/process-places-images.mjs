/**
 * Script to process places-to-visit images:
 * 1. Rename folders and files to SEO-friendly names (lowercase, hyphens)
 * 2. Optimize large images (resize to max 1200px width)
 * 3. Generate thumbnails (400px width, 70% quality)
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PLACES_DIR = path.join(process.cwd(), 'public/images/places-to-visit');
const MAX_WIDTH = 1200;
const THUMB_WIDTH = 400;
const QUALITY = 80;
const THUMB_QUALITY = 70;

// Convert string to slug (lowercase, hyphens)
function toSlug(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/['']/g, '') // Remove apostrophes
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single
}

// Check if file is an image
function isImage(filename) {
  const ext = path.extname(filename).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
}

// Process a single image
async function processImage(imagePath, outputPath, maxWidth, quality) {
  try {
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    
    // Only resize if larger than max width
    if (metadata.width > maxWidth) {
      await image
        .resize(maxWidth, null, { withoutEnlargement: true })
        .jpeg({ quality })
        .toFile(outputPath);
      return { resized: true, originalWidth: metadata.width };
    } else {
      // Just optimize without resizing
      await image
        .jpeg({ quality })
        .toFile(outputPath);
      return { resized: false, originalWidth: metadata.width };
    }
  } catch (error) {
    console.error(`Error processing ${imagePath}:`, error.message);
    return null;
  }
}

// Create thumbnail
async function createThumbnail(imagePath, thumbPath) {
  try {
    await sharp(imagePath)
      .resize(THUMB_WIDTH, null, { withoutEnlargement: true })
      .jpeg({ quality: THUMB_QUALITY })
      .toFile(thumbPath);
    return true;
  } catch (error) {
    console.error(`Error creating thumbnail for ${imagePath}:`, error.message);
    return false;
  }
}

async function processPlaces() {
  console.log('🏝️  Processing places-to-visit images...\n');
  
  const folders = fs.readdirSync(PLACES_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('.'));
  
  let totalImages = 0;
  let processedImages = 0;
  let thumbnailsCreated = 0;
  let foldersRenamed = 0;
  let filesRenamed = 0;
  
  for (const folder of folders) {
    const originalFolderPath = path.join(PLACES_DIR, folder.name);
    const newFolderName = toSlug(folder.name);
    const newFolderPath = path.join(PLACES_DIR, newFolderName);
    
    // Rename folder if needed
    let folderPath = originalFolderPath;
    
    if (folder.name !== newFolderName) {
      // On macOS, file system is case-insensitive, so we need to handle this
      // by first renaming to a temp name, then to the final name
      const tempPath = path.join(PLACES_DIR, '_temp_' + newFolderName);
      
      try {
        // Move to temp first
        fs.renameSync(originalFolderPath, tempPath);
        // Then move to final destination
        fs.renameSync(tempPath, newFolderPath);
        foldersRenamed++;
        console.log(`📁 Renamed folder: ${folder.name} → ${newFolderName}`);
        folderPath = newFolderPath;
      } catch (err) {
        console.log(`⚠️  Could not rename ${folder.name}: ${err.message}`);
        // Clean up temp if it exists
        if (fs.existsSync(tempPath)) {
          fs.renameSync(tempPath, originalFolderPath);
        }
        folderPath = originalFolderPath;
      }
    }
    
    // Skip nested "Not Resized" folders
    const items = fs.readdirSync(folderPath, { withFileTypes: true })
      .filter(item => !item.name.startsWith('.') && item.name !== 'Not Resized' && item.name !== 'thumbnails');
    
    // Create thumbnails folder
    const thumbsDir = path.join(folderPath, 'thumbnails');
    if (!fs.existsSync(thumbsDir)) {
      fs.mkdirSync(thumbsDir, { recursive: true });
    }
    
    // Process images in this folder
    for (const item of items) {
      if (item.isFile() && isImage(item.name)) {
        totalImages++;
        
        const originalPath = path.join(folderPath, item.name);
        const ext = path.extname(item.name);
        const baseName = path.basename(item.name, ext);
        const newFileName = toSlug(baseName) + '.jpg';
        const newPath = path.join(folderPath, newFileName);
        const thumbPath = path.join(thumbsDir, newFileName);
        
        // Process/optimize the main image
        const tempPath = path.join(folderPath, '_temp_' + newFileName);
        const result = await processImage(originalPath, tempPath, MAX_WIDTH, QUALITY);
        
        if (result) {
          // Remove original and rename temp
          if (originalPath !== newPath) {
            fs.unlinkSync(originalPath);
            filesRenamed++;
          } else {
            // Same name, just replace
            fs.unlinkSync(originalPath);
          }
          fs.renameSync(tempPath, newPath);
          processedImages++;
          
          if (result.resized) {
            console.log(`  ✓ ${item.name} → ${newFileName} (resized from ${result.originalWidth}px)`);
          } else {
            console.log(`  ✓ ${item.name} → ${newFileName}`);
          }
          
          // Create thumbnail
          if (!fs.existsSync(thumbPath)) {
            const thumbCreated = await createThumbnail(newPath, thumbPath);
            if (thumbCreated) {
              thumbnailsCreated++;
            }
          }
        }
      }
    }
    
    // Clean up "Not Resized" folder if it exists
    const notResizedDir = path.join(folderPath, 'Not Resized');
    if (fs.existsSync(notResizedDir)) {
      const notResizedFiles = fs.readdirSync(notResizedDir);
      for (const file of notResizedFiles) {
        if (isImage(file)) {
          const srcPath = path.join(notResizedDir, file);
          const newFileName = toSlug(path.basename(file, path.extname(file))) + '.jpg';
          const destPath = path.join(folderPath, newFileName);
          const thumbPath = path.join(thumbsDir, newFileName);
          
          if (!fs.existsSync(destPath)) {
            totalImages++;
            const tempPath = path.join(folderPath, '_temp_' + newFileName);
            const result = await processImage(srcPath, tempPath, MAX_WIDTH, QUALITY);
            if (result) {
              fs.renameSync(tempPath, destPath);
              processedImages++;
              console.log(`  ✓ Not Resized/${file} → ${newFileName}`);
              
              // Create thumbnail
              if (!fs.existsSync(thumbPath)) {
                const thumbCreated = await createThumbnail(destPath, thumbPath);
                if (thumbCreated) thumbnailsCreated++;
              }
            }
          }
        }
      }
      // Remove the Not Resized folder
      fs.rmSync(notResizedDir, { recursive: true });
      console.log(`  🗑️  Removed "Not Resized" folder`);
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 Summary:');
  console.log(`   Folders renamed: ${foldersRenamed}`);
  console.log(`   Files renamed: ${filesRenamed}`);
  console.log(`   Images processed: ${processedImages}/${totalImages}`);
  console.log(`   Thumbnails created: ${thumbnailsCreated}`);
  console.log('='.repeat(50));
}

processPlaces().catch(console.error);
