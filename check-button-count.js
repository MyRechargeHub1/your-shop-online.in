#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const POSTS_DIR = './Posts';
const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.html'));

console.log('Checking button count in all posts...\n');

let postsWithLessThan2 = [];
let totalButtons = 0;

for (const file of files) {
    const filepath = path.join(POSTS_DIR, file);
    const content = fs.readFileSync(filepath, 'utf8');
    const count = (content.match(/🛒 BUY NOW/g) || []).length;

    totalButtons += count;

    if (count < 2) {
        postsWithLessThan2.push({ file, count });
    }
}

if (postsWithLessThan2.length > 0) {
    console.log(`⚠️  Found ${postsWithLessThan2.length} posts with less than 2 Buy Now buttons:\n`);
    postsWithLessThan2.forEach(({ file, count }) => {
        console.log(`   ${file}: ${count} button(s)`);
    });
} else {
    console.log('✅ All posts have 2 Buy Now buttons!');
}

console.log(`\n📊 Total: ${files.length} posts, ${totalButtons} buttons total`);
console.log(`   Average: ${(totalButtons / files.length).toFixed(1)} buttons per post`);
