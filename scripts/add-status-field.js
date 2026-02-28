import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const lessonsDir = './src/content/lessons';

async function addStatusField() {
  const files = await readdir(lessonsDir);
  const mdxFiles = files.filter(f => f.endsWith('.mdx'));
  
  let updated = 0;
  let skipped = 0;
  
  for (const file of mdxFiles) {
    const filepath = join(lessonsDir, file);
    const content = await readFile(filepath, 'utf-8');
    
    // Check if status field already exists
    if (content.includes('status:')) {
      console.log(`⏭️  Skipping ${file} (already has status field)`);
      skipped++;
      continue;
    }
    
    // Add status: "draft" after the title field
    const updatedContent = content.replace(
      /^(title: .+)$/m,
      '$1\nstatus: "draft"'
    );
    
    if (updatedContent !== content) {
      await writeFile(filepath, updatedContent, 'utf-8');
      console.log(`✅ Updated ${file}`);
      updated++;
    } else {
      console.log(`⚠️  Could not update ${file}`);
    }
  }
  
  console.log(`\n✨ Done! Updated ${updated} files, skipped ${skipped} files.`);
}

addStatusField().catch(console.error);
