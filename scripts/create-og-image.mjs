/**
 * Create OG image (1200x630) from a banner image
 */

import sharp from 'sharp';
import path from 'path';

const SOURCE_IMAGE = path.join(process.cwd(), 'public/images/banners/le-morne-aerial-view-mauritius.jpg');
const OUTPUT_PATH = path.join(process.cwd(), 'public/images/og-image.jpg');

async function createOgImage() {
  console.log('Creating OG image...');
  
  await sharp(SOURCE_IMAGE)
    .resize(1200, 630, {
      fit: 'cover',
      position: 'center'
    })
    .jpeg({ quality: 85 })
    .toFile(OUTPUT_PATH);
  
  console.log('✓ Created OG image at public/images/og-image.jpg');
}

createOgImage().catch(console.error);
