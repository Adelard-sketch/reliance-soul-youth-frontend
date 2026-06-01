// Image optimization script
// Run with: node scripts/optimize-images.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, '../src/assets');
const outputDir = path.join(__dirname, '../src/assets/optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all image files
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
const files = fs.readdirSync(assetsDir)
  .filter(file => imageExtensions.includes(path.extname(file).toLowerCase()));

console.log(`Found ${files.length} images to analyze:`);

files.forEach(file => {
  const filePath = path.join(assetsDir, file);
  const stats = fs.statSync(filePath);
  const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
  
  console.log(`${file}: ${sizeInMB}MB`);
  
  // Flag large files
  if (stats.size > 1024 * 1024) { // > 1MB
    console.log(`  ⚠️  Large file - consider compressing`);
  }
});

console.log('\n📋 Optimization Recommendations:');
console.log('1. Compress images over 1MB');
console.log('2. Convert to WebP format for 70% size reduction');
console.log('3. Use online tools like TinyPNG or Squoosh.app');
console.log('4. Consider removing unused images');

// List potentially unused files (basic check)
console.log('\n🔍 Potentially unused files (manual verification needed):');
const sourceFiles = [
  ...fs.readdirSync(path.join(__dirname, '../src/Pages')),
  ...fs.readdirSync(path.join(__dirname, '../src/Components'))
];

files.forEach(file => {
  const fileName = path.parse(file).name;
  const isReferenced = sourceFiles.some(sourceFile => {
    if (!sourceFile.endsWith('.tsx') && !sourceFile.endsWith('.ts')) return false;
    const content = fs.readFileSync(
      path.join(__dirname, '../src/Pages', sourceFile), 
      'utf8'
    ).catch(() => 
      fs.readFileSync(
        path.join(__dirname, '../src/Components', sourceFile), 
        'utf8'
      ).catch(() => '')
    );
    return content.includes(fileName);
  });
  
  if (!isReferenced) {
    console.log(`  ${file} - might be unused`);
  }
});