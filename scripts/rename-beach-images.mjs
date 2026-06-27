import fs from 'fs';
import path from 'path';

const BEACHES_DIR = './public/images/beaches';

function sanitizeFilename(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/~\d+/g, '')       // Remove ~01, ~02 suffixes
    .replace(/[^a-z0-9\-\.]/g, '') // Remove special chars except hyphens and dots
    .replace(/-+/g, '-')        // Replace multiple hyphens with single
    .replace(/^-|-$/g, '');     // Remove leading/trailing hyphens
}

function sanitizeFolderName(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

async function main() {
  console.log('📁 Renaming beach image folders and files...\n');
  
  const folders = fs.readdirSync(BEACHES_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory());
  
  // First pass: rename all files inside folders
  for (const folder of folders) {
    const folderPath = path.join(BEACHES_DIR, folder.name);
    const files = fs.readdirSync(folderPath);
    
    for (const file of files) {
      if (file.startsWith('.')) continue;
      
      const ext = path.extname(file).toLowerCase();
      const baseName = path.basename(file, path.extname(file));
      const newFileName = sanitizeFilename(baseName) + ext;
      
      const oldFilePath = path.join(folderPath, file);
      const newFilePath = path.join(folderPath, newFileName);
      
      if (file !== newFileName && fs.existsSync(oldFilePath)) {
        fs.renameSync(oldFilePath, newFilePath);
        console.log(`  ${folder.name}/${file} → ${newFileName}`);
      }
    }
  }
  
  console.log('\n📁 Renaming folders...\n');
  
  // Second pass: rename folders (sorted by length descending to avoid conflicts)
  const folderNames = fs.readdirSync(BEACHES_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .sort((a, b) => b.length - a.length);
  
  for (const oldFolderName of folderNames) {
    const newFolderName = sanitizeFolderName(oldFolderName);
    
    if (oldFolderName !== newFolderName) {
      const oldPath = path.join(BEACHES_DIR, oldFolderName);
      const newPath = path.join(BEACHES_DIR, newFolderName);
      
      if (fs.existsSync(oldPath) && !fs.existsSync(newPath)) {
        fs.renameSync(oldPath, newPath);
        console.log(`${oldFolderName} → ${newFolderName}`);
      } else if (fs.existsSync(oldPath) && fs.existsSync(newPath)) {
        // Target exists, merge contents
        const files = fs.readdirSync(oldPath);
        for (const file of files) {
          const src = path.join(oldPath, file);
          const dest = path.join(newPath, file);
          if (!fs.existsSync(dest)) {
            fs.renameSync(src, dest);
          }
        }
        // Remove old folder if empty
        const remaining = fs.readdirSync(oldPath);
        if (remaining.length === 0) {
          fs.rmdirSync(oldPath);
        }
        console.log(`${oldFolderName} → merged into ${newFolderName}`);
      }
    }
  }
  
  console.log('\n✅ Done! Final structure:\n');
  
  // List final structure
  const finalFolders = fs.readdirSync(BEACHES_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name));
  
  for (const folder of finalFolders) {
    const files = fs.readdirSync(path.join(BEACHES_DIR, folder.name))
      .filter(f => !f.startsWith('.'));
    console.log(`${folder.name}/  (${files.length} files)`);
    console.log(`  → ${files[0]}`);
  }
}

main().catch(console.error);
