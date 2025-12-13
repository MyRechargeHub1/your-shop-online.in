#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const POSTS_DIR = './Posts';
const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.html'));

console.log('🧹 Removing middle buttons from posts...\n');

let fixed = 0;

for (const file of files) {
    const filepath = path.join(POSTS_DIR, file);
    let content = fs.readFileSync(filepath, 'utf8');

    // Remove buttons that appear IN THE MIDDLE of post-content
    // These have different styling: margin: 30px, simpler styles
    const middleButtonPattern = /\s*<div style="text-align: center; margin: 30px 0;">\s*<a href="https:\/\/www\.amazon\.com\/s\?k=[^"]*&tag=topgaming2303-20"[^>]*>\s*🛒 BUY NOW\s*<\/a>\s*<\/div>\s*/g;

    if (middleButtonPattern.test(content)) {
        content = content.replace(middleButtonPattern, '\n');
        fs.writeFileSync(filepath, content, 'utf8');
        console.log(`✅ ${file}: Removed middle button`);
        fixed++;
    }
}

console.log(`\n✨ Removed middle buttons from ${fixed} posts!\n`);

// Verify
const { execSync} = require('child_process');
execSync('node check-button-count.js', { stdio: 'inherit' });
