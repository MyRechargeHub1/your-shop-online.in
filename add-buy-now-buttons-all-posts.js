#!/usr/bin/env node
/**
 * Add dual Buy Now buttons to ALL posts
 */

const fs = require('fs');
const path = require('path');

const POSTS_DIR = './Posts';

// Read posts-config.json to get product info
const config = JSON.parse(fs.readFileSync('./posts-config.json', 'utf8'));

console.log('🛒 Adding Buy Now buttons to all posts...\n');

let updatedCount = 0;
let skippedCount = 0;

for (const post of config) {
    const filename = `${post.filename}.html`;
    const filepath = path.join(POSTS_DIR, filename);

    if (!fs.existsSync(filepath)) {
        console.log(`⚠️  File not found: ${filename}`);
        continue;
    }

    let content = fs.readFileSync(filepath, 'utf8');

    // Check current button count
    const currentCount = (content.match(/🛒 BUY NOW/g) || []).length;

    if (currentCount >= 2) {
        skippedCount++;
        continue;
    }

    // Extract product name from title for search query
    const productName = post.title
        .replace(/Review \d{4}/gi, '')
        .replace(/\s+\d{4}\s*/g, ' ')
        .replace(/\s+/g, '+')
        .trim();

    const buyNowButton = `
            <div style="text-align: center; margin: 40px 0;">
                <a href="https://www.amazon.com/s?k=${productName}&tag=topgaming2303-20" class="btn btn-primary" target="_blank" rel="noopener" style="font-size: 1.3em; padding: 18px 45px; font-weight: 700; border-radius: 10px; display: inline-block; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5); background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none;">
                    🛒 BUY NOW
                </a>
            </div>`;

    // Add top button after featured image
    if (!content.includes('</div>\n\n            <div style="text-align: center; margin: 40px 0;">') &&
        content.includes('</div>\n        </div>')) {

        // Find the end of post-featured-image section
        const featuredImageEnd = content.indexOf('</div>\n        </div>\n\n        <article');
        if (featuredImageEnd > -1) {
            content = content.substring(0, featuredImageEnd + 22) +
                     buyNowButton + '\n' +
                     content.substring(featuredImageEnd + 22);
        } else {
            // Alternative pattern
            const altPattern = /<\/div>\s*<\/div>\s*<div class="post-content">/;
            if (altPattern.test(content)) {
                content = content.replace(altPattern, `</div>\n        </div>${buyNowButton}\n\n            <div class="post-content">`);
            }
        }
    }

    // Add bottom button before promotional footer or closing content div
    if (content.includes('promotional-footer')) {
        // Add before promotional footer
        const footerPattern = /(\s*)<div class="promotional-footer"/;
        if (!content.match(/BUY NOW[\s\S]{0,100}promotional-footer/)) {
            content = content.replace(footerPattern, `${buyNowButton}$1<div class="promotional-footer"`);
        }
    } else {
        // Add before closing content div
        const contentClosePattern = /(\s*)<\/div>\s*<\/div>\s*<\/article>/;
        if (!content.match(/BUY NOW[\s\S]{0,100}<\/div>\s*<\/div>\s*<\/article>/)) {
            content = content.replace(contentClosePattern, `${buyNowButton}$1</div>\n        </div>\n    </article>`);
        }
    }

    // Write updated content
    fs.writeFileSync(filepath, content, 'utf8');

    // Verify buttons were added
    const newCount = (content.match(/🛒 BUY NOW/g) || []).length;
    console.log(`✅ ${filename}: ${currentCount} → ${newCount} buttons`);
    updatedCount++;
}

console.log(`\n✨ Updated ${updatedCount} posts, skipped ${skippedCount} (already have 2 buttons)`);
