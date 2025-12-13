#!/usr/bin/env node
/**
 * Final fix: Ensure exactly 2 buttons per post
 */

const fs = require('fs');
const path = require('path');

const POSTS_DIR = './Posts';
const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.html'));

console.log('🔧 Final button count fix...\n');

let fixed = 0;

for (const file of files) {
    const filepath = path.join(POSTS_DIR, file);
    let content = fs.readFileSync(filepath, 'utf8');

    // Count buttons
    const count = (content.match(/🛒 BUY NOW/g) || []).length;

    if (count !== 2) {
        console.log(`📝 ${file}: ${count} buttons`);

        // Remove ALL buttons first
        content = content.replace(/\s*<div style="text-align: center; margin: 40px 0;">\s*<a href="https:\/\/www\.amazon\.com\/s\?k=[^"]*&tag=topgaming2303-20"[^>]*>\s*🛒 BUY NOW\s*<\/a>\s*<\/div>/g, '');

        // Create proper buy button
        const searchQuery = file.replace('.html', '').replace(/-/g, '+');
        const buyButton = `
            <div style="text-align: center; margin: 40px 0;">
                <a href="https://www.amazon.com/s?k=${searchQuery}&tag=topgaming2303-20" class="btn btn-primary" target="_blank" rel="noopener" style="font-size: 1.3em; padding: 18px 45px; font-weight: 700; border-radius: 10px; display: inline-block; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5); background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none;">
                    🛒 BUY NOW
                </a>
            </div>`;

        // Add button 1: After featured image, before post-content
        const topPattern = /(<\/div>\s*<\/div>)\s*(<div class="post-content">)/;
        content = content.replace(topPattern, `$1${buyButton}\n\n            $2`);

        // Add button 2: Before promotional footer
        const bottomPattern = /(\s+)<div class="promotional-footer"/;
        content = content.replace(bottomPattern, `${buyButton}$1<div class="promotional-footer"`);

        fs.writeFileSync(filepath, content, 'utf8');
        const newCount = (content.match(/🛒 BUY NOW/g) || []).length;
        console.log(`   ✅ Fixed: ${count} → ${newCount} buttons\n`);
        fixed++;
    }
}

console.log(`✨ Fixed ${fixed} posts!\n`);

// Final verification
const { execSync } = require('child_process');
execSync('node check-button-count.js', { stdio: 'inherit' });
