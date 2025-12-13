#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const posts = [
    'amazon-echo-hub.html',
    'anova-precision-cooker-pro.html',
    'apple-homepod-2.html',
    'apple-vision-pro.html',
    'baratza-sette-270wi-grinder.html',
    'bernina-770-qe-sewing-machine.html',
    'celestron-nexstar-evolution-9.html',
    'dell-xps-17-2025.html',
    'kitchenaid-commercial-8qt-mixer.html',
    'macbook-pro-16-m4-max.html',
    'masterbuilt-gravity-1050-grill.html',
    'meta-quest-3.html',
    'microsoft-surface-pro-10.html',
    'samsung-galaxy-s25-ultra.html',
    'samsung-galaxy-z-fold-6.html',
    'sony-wf-1000xm6.html',
    'wolf-gourmet-countertop-oven.html'
];

const POSTS_DIR = './Posts';

console.log('Removing extra buttons from 17 posts...\n');

for (const file of posts) {
    const filepath = path.join(POSTS_DIR, file);
    let content = fs.readFileSync(filepath, 'utf8');

    // Find all button divs
    const buttonRegex = /<div style="text-align: center;[^>]*>\s*<a href="https:\/\/www\.amazon\.com\/s\?[^>]*tag=topgaming2303-20[^>]*>\s*🛒 BUY NOW\s*<\/a>\s*<\/div>/g;

    const matches = [];
    let match;
    while ((match = buttonRegex.exec(content)) !== null) {
        matches.push({
            text: match[0],
            index: match.index
        });
    }

    if (matches.length === 3) {
        // Remove the middle one (index 1)
        content = content.replace(matches[1].text, '');
        fs.writeFileSync(filepath, content, 'utf8');
        console.log(`✅ ${file}: Removed middle button (had ${matches.length})`);
    }
}

console.log('\n✨ Done!\n');
const { execSync } = require('child_process');
execSync('node check-button-count.js', { stdio: 'inherit' });
