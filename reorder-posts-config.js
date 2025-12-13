#!/usr/bin/env node
/**
 * Reorder posts-config.json to put newest posts first
 */

const fs = require('fs');

const configPath = './posts-config.json';
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

console.log('📝 Reordering posts-config.json...\n');

// The 10 newest posts (Jan 18, 2025)
const newPosts = [
    'tonal-home-gym',
    'hydrow-rower',
    'normatec-3-legs',
    'festool-kapex-ks120',
    'rimowa-original-trunk-plus',
    'yeti-tundra-350',
    'trek-domane-slr9',
    'specialized-turbo-levo',
    'adam-audio-a7v',
    'big-green-egg-xlarge'
];

// Separate new posts from older posts
const newPostsData = [];
const olderPosts = [];

for (const post of config) {
    if (newPosts.includes(post.filename)) {
        newPostsData.push(post);
    } else {
        olderPosts.push(post);
    }
}

// Sort new posts in the order we want them
const sortedNewPosts = newPosts.map(filename =>
    newPostsData.find(p => p.filename === filename)
).filter(Boolean);

// Combine: new posts first, then older posts
const reorderedConfig = [...sortedNewPosts, ...olderPosts];

// Write back to file
fs.writeFileSync(configPath, JSON.stringify(reorderedConfig, null, 4), 'utf8');

console.log(`✅ Moved ${sortedNewPosts.length} new posts to the beginning`);
console.log(`📊 Total posts: ${reorderedConfig.length}`);
console.log('\nNew order:');
console.log('First 10 posts (newest):');
reorderedConfig.slice(0, 10).forEach((post, i) => {
    console.log(`  ${i + 1}. ${post.title} (${post.date})`);
});

console.log('\n✨ Done! New posts will now appear first on the home page.');
