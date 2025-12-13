#!/usr/bin/env node
/**
 * Update Buy Now button text across ALL posts
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const POSTS_DIR = './Posts';

console.log('🔧 Updating Buy Now button text across all posts...\n');

// Find all posts with "BUY NOW ON AMAZON"
const output = execSync('grep -l "BUY NOW ON AMAZON" Posts/*.html', { encoding: 'utf8' });
const postsToFix = output.trim().split('\n').map(p => path.basename(p));

console.log(`Found ${postsToFix.length} posts to update:\n`);

let updatedCount = 0;

for (const filename of postsToFix) {
    const filepath = path.join(POSTS_DIR, filename);

    if (!fs.existsSync(filepath)) {
        console.log(`❌ File not found: ${filename}`);
        continue;
    }

    let content = fs.readFileSync(filepath, 'utf8');

    // Count occurrences before
    const beforeCount = (content.match(/BUY NOW ON AMAZON/g) || []).length;

    // Replace "BUY NOW ON AMAZON" with "BUY NOW"
    content = content.replace(/BUY NOW ON AMAZON/g, 'BUY NOW');

    // Count occurrences after
    const afterCount = (content.match(/BUY NOW ON AMAZON/g) || []).length;

    if (beforeCount > 0) {
        fs.writeFileSync(filepath, content, 'utf8');
        console.log(`✅ ${filename}: Updated ${beforeCount} button(s)`);
        updatedCount++;
    }
}

console.log(`\n✨ Updated ${updatedCount} files!`);
console.log('\nVerifying all posts now have correct button text...\n');

// Verify no posts have old text
try {
    execSync('grep -l "BUY NOW ON AMAZON" Posts/*.html 2>/dev/null', { encoding: 'utf8' });
    console.log('⚠️  Some posts still have old button text!');
} catch (error) {
    console.log('✅ All posts now have "🛒 BUY NOW" button text!');
}
