#!/usr/bin/env node
/**
 * Update Buy Now button text in all new posts
 */

const fs = require('fs');
const path = require('path');

const newPosts = [
    'tonal-home-gym.html',
    'hydrow-rower.html',
    'normatec-3-legs.html',
    'festool-kapex-ks120.html',
    'rimowa-original-trunk-plus.html',
    'yeti-tundra-350.html',
    'trek-domane-slr9.html',
    'specialized-turbo-levo.html',
    'adam-audio-a7v.html',
    'big-green-egg-xlarge.html'
];

const POSTS_DIR = './Posts';

console.log('🔧 Updating Buy Now button text...\n');

let updatedCount = 0;

for (const filename of newPosts) {
    const filepath = path.join(POSTS_DIR, filename);

    if (!fs.existsSync(filepath)) {
        console.log(`❌ File not found: ${filename}`);
        continue;
    }

    let content = fs.readFileSync(filepath, 'utf8');

    // Replace "BUY NOW ON AMAZON" with "BUY NOW"
    const beforeCount = (content.match(/BUY NOW ON AMAZON/g) || []).length;
    content = content.replace(/BUY NOW ON AMAZON/g, 'BUY NOW');
    const afterCount = (content.match(/BUY NOW ON AMAZON/g) || []).length;

    if (beforeCount > 0) {
        fs.writeFileSync(filepath, content, 'utf8');
        console.log(`✅ ${filename}: Updated ${beforeCount} button(s)`);
        updatedCount++;
    } else {
        console.log(`⏭️  ${filename}: No changes needed`);
    }
}

console.log(`\n✨ Updated ${updatedCount} files!`);
