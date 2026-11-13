import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const lessonsDir = './src/content/lessons';

// Required sections for published lessons
const REQUIRED_SECTIONS = [
  '## Warm-up',
  '## Direct Instruction',
  '## Guided Practice',
  '## Independent Practice',
  '## Differentiation',
  '## Extensions',
  '## Notes for Parent/Instructor',
];

let totalChecked = 0;
let publishedCount = 0;
let draftCount = 0;
let errors = [];

async function checkLessons() {
  console.log('🔍 Starting lesson validation...\n');
  
  const files = await readdir(lessonsDir);
  const mdxFiles = files.filter(f => f.endsWith('.mdx'));
  
  for (const file of mdxFiles) {
    const filepath = join(lessonsDir, file);
    const content = await readFile(filepath, 'utf-8');
    totalChecked++;
    
    // Extract frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) {
      errors.push(`❌ ${file}: No frontmatter found`);
      continue;
    }
    
    const frontmatter = frontmatterMatch[1];
    const statusMatch = frontmatter.match(/status:\s*"(draft|published)"/);
    
    // A lesson with no status field is a draft, matching the schema default
    const status = statusMatch ? statusMatch[1] : 'draft';
    
    if (status === 'draft') {
      draftCount++;
      continue; // Skip validation for draft lessons
    }
    
    publishedCount++;
    
    // Check for required sections in published lessons
    const missingSections = [];
    for (const section of REQUIRED_SECTIONS) {
      if (!content.includes(section)) {
        missingSections.push(section);
      }
    }
    
    if (missingSections.length > 0) {
      errors.push(`❌ ${file}: Missing required sections for published lesson: ${missingSections.join(', ')}`);
    }
    
    // Additional checks for published lessons
    const solCodesMatch = frontmatter.match(/solCodes:\s*\[(.*?)\]/s);
    if (!solCodesMatch || solCodesMatch[1].trim() === '') {
      errors.push(`❌ ${file}: Published lesson must have at least one SOL code`);
    }
    
    const objectiveMatch = frontmatter.match(/objective:\s*"(.+)"/);
    if (!objectiveMatch || objectiveMatch[1].trim().length < 10) {
      errors.push(`❌ ${file}: Published lesson must have a meaningful objective`);
    }
    
    const materialsMatch = frontmatter.match(/materials:\s*\n([\s\S]*?)(?=\n\w+:|---)/);
    if (!materialsMatch || materialsMatch[1].trim() === '') {
      errors.push(`❌ ${file}: Published lesson must have at least one material`);
    }
  }
  
  // Print summary
  console.log('📊 Validation Summary');
  console.log('═'.repeat(50));
  console.log(`Total lessons checked: ${totalChecked}`);
  console.log(`  📝 Draft lessons: ${draftCount} (skipped validation)`);
  console.log(`  ✅ Published lessons: ${publishedCount}`);
  console.log('');
  
  if (errors.length > 0) {
    console.log(`❌ Found ${errors.length} error(s):\n`);
    errors.forEach(error => console.log(error));
    console.log('');
    process.exit(1);
  } else {
    console.log('✅ All published lessons passed validation!');
    console.log('');
  }
}

checkLessons().catch((error) => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});
