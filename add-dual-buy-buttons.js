#!/usr/bin/env node
/**
 * Add dual Buy Now buttons to ALL 163 posts
 */

const fs = require('fs');
const path = require('path');

const POSTS_DIR = './Posts';
const config = JSON.parse(fs.readFileSync('./posts-config.json', 'utf8'));

console.log('🛒 Adding dual Buy Now buttons to all posts...\n');

let added = 0;
let skipped = 0;
let errors = 0;

for (const post of config) {
    const filename = `${post.filename}.html`;
    const filepath = path.join(POSTS_DIR, filename);

    if (!fs.existsSync(filepath)) {
        console.log(`⚠️  Not found: ${filename}`);
        errors++;
        continue;
    }

    let content = fs.readFileSync(filepath, 'utf8');

    // Check current button count
    const currentCount = (content.match(/🛒 BUY NOW/g) || []).length;

    if (currentCount >= 2) {
        skipped++;
        continue;
    }

    // Create search query from product title
    const searchQuery = post.title
        .replace(/Review.*$/i, '')
        .replace(/\s*\d{4}\s*/g, '')
        .replace(/[-–—]/g, ' ')
        .replace(/\s+/g, '+')
        .trim();

    const buyButton = `
            <div style="text-align: center; margin: 40px 0;">
                <a href="https://www.amazon.com/s?k=${searchQuery}&tag=topgaming2303-20" class="btn btn-primary" target="_blank" rel="noopener" style="font-size: 1.3em; padding: 18px 45px; font-weight: 700; border-radius: 10px; display: inline-block; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5); background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none;">
                    🛒 BUY NOW
                </a>
            </div>`;

    let modified = false;

    // Add TOP button after featured image, before post-content
    if (currentCount === 0 || !content.match(/🛒 BUY NOW[\s\S]{0,500}post-content/)) {
        // Pattern: end of featured image div, before post-content div
        const topPattern = /(<\/div>\s*<\/div>)\s*(<div class="post-content">)/;
        if (topPattern.test(content)) {
            content = content.replace(topPattern, `$1${buyButton}\n\n            $2`);
            modified = true;
        }
    }

    // Add BOTTOM button before promotional footer or before closing </div></div>
    if (currentCount <= 1 || !content.match(/🛒 BUY NOW[\s\S]{0,500}promotional-footer/)) {
        if (content.includes('promotional-footer')) {
            // Add before promotional footer
            const bottomPattern = /(\s+)<div class="promotional-footer"/;
            if (!content.match(/🛒 BUY NOW[\s\S]{0,300}promotional-footer/)) {
                content = content.replace(bottomPattern, `${buyButton}$1<div class="promotional-footer"`);
                modified = true;
            }
        } else {
            // Add before closing content divs (fallback for posts without promotional footer)
            const altPattern = /(\s+)<\/div>\s*<\/div>\s*<\/article>/;
            if (!content.match(/🛒 BUY NOW[\s\S]{0,300}<\/article>/)) {
                content = content.replace(altPattern, `${buyButton}$1</div>\n        </div>\n    </article>`);
                modified = true;
            }
        }
    }

    if (modified) {
        fs.writeFileSync(filepath, content, 'utf8');
        const newCount = (content.match(/🛒 BUY NOW/g) || []).length;
        console.log(`✅ ${filename}: ${currentCount} → ${newCount} buttons`);
        added++;
    } else {
        console.log(`⏭️  ${filename}: No changes needed`);
        skipped++;
    }
}

console.log(`\n📊 Summary:`);
console.log(`   ✅ Added buttons: ${added} posts`);
console.log(`   ⏭️  Skipped: ${skipped} posts`);
console.log(`   ❌ Errors: ${errors} posts`);
console.log(`\nRunning verification...\n`);

// Verify all posts now have 2 buttons
const { execSync } = require('child_process');
execSync('node check-button-count.js', { stdio: 'inherit' });
