#!/usr/bin/env node
/**
 * Fix posts with wrong button count
 */

const fs = require('fs');
const path = require('path');

const POSTS_DIR = './Posts';
const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.html'));

console.log('🔧 Fixing button counts...\n');

let fixed = 0;

for (const file of files) {
    const filepath = path.join(POSTS_DIR, file);
    let content = fs.readFileSync(filepath, 'utf8');

    const matches = content.match(/🛒 BUY NOW/g) || [];
    const count = matches.length;

    if (count === 1) {
        console.log(`📝 ${file}: Adding missing second button...`);
        // Add button before promotional footer or before closing divs
        if (content.includes('promotional-footer')) {
            const pattern = /(\s+)<div class="promotional-footer"/;
            const buyButton = `
            <div style="text-align: center; margin: 40px 0;">
                <a href="https://www.amazon.com/s?k=${file.replace('.html', '').replace(/-/g, '+')}&tag=topgaming2303-20" class="btn btn-primary" target="_blank" rel="noopener" style="font-size: 1.3em; padding: 18px 45px; font-weight: 700; border-radius: 10px; display: inline-block; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5); background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none;">
                    🛒 BUY NOW
                </a>
            </div>`;
            content = content.replace(pattern, `${buyButton}$1<div class="promotional-footer"`);
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`   ✅ Added second button\n`);
            fixed++;
        }
    } else if (count > 2) {
        console.log(`📝 ${file}: Removing ${count - 2} extra button(s)...`);
        // Find all button occurrences
        const buttonPattern = /\s*<div style="text-align: center; margin: 40px 0;">\s*<a href="https:\/\/www\.amazon\.com\/s\?k=[^"]*&tag=topgaming2303-20"[^>]*>\s*🛒 BUY NOW\s*<\/a>\s*<\/div>/g;

        const buttons = [];
        let match;
        while ((match = buttonPattern.exec(content)) !== null) {
            buttons.push({ text: match[0], index: match.index });
        }

        if (buttons.length > 2) {
            // Keep first and last button, remove middle ones
            for (let i = 1; i < buttons.length - 1; i++) {
                content = content.replace(buttons[i].text, '');
            }
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`   ✅ Removed ${buttons.length - 2} extra button(s)\n`);
            fixed++;
        }
    }
}

console.log(`\n✨ Fixed ${fixed} posts!`);

// Run verification
console.log('\nRunning final verification...\n');
const { execSync } = require('child_process');
execSync('node check-button-count.js', { stdio: 'inherit' });
