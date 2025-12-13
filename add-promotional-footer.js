#!/usr/bin/env node
/**
 * Add promotional footer to all blog posts
 * Adds positivelifes.com promotion at the end of each article
 */

const fs = require('fs');
const path = require('path');

const POSTS_DIR = './Posts';

const promotionalFooter = `
    <div class="promotional-footer" style="margin-top: 40px; padding: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; text-align: center; color: white;">
        <h3 style="margin: 0 0 15px 0; font-size: 24px; font-weight: 600;">📚 Free Inspirational Resources</h3>
        <p style="margin: 0 0 10px 0; font-size: 16px; line-height: 1.6;">Free download of inspirational and life-changing PDF books. And there are many more articles to read! You can choose to go there if you want.</p>
        <a href="https://www.positivelifes.com" target="_blank" rel="noopener noreferrer" style="display: inline-block; margin-top: 15px; padding: 12px 30px; background: white; color: #667eea; text-decoration: none; border-radius: 6px; font-weight: 600; transition: transform 0.2s;">Visit PositiveLifes.com →</a>
    </div>
`;

function addPromotionalFooter(filepath) {
    const filename = path.basename(filepath);
    console.log(`Processing: ${filename}`);

    let content = fs.readFileSync(filepath, 'utf8');

    // Check if promotional footer already exists
    if (content.includes('positivelifes.com') || content.includes('promotional-footer')) {
        console.log(`  ⏭️  Already has promotional footer\n`);
        return false;
    }

    // Find the closing </article> tag and insert before it
    const articleCloseRegex = /(\s*)<\/article>/;

    if (!articleCloseRegex.test(content)) {
        console.log(`  ⚠️  No </article> tag found\n`);
        return false;
    }

    content = content.replace(articleCloseRegex, `${promotionalFooter}$1</article>`);

    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`  ✅ Added promotional footer\n`);
    return true;
}

function main() {
    console.log('🚀 Adding promotional footer to all blog posts...\n');

    const files = fs.readdirSync(POSTS_DIR)
        .filter(file => file.endsWith('.html'))
        .map(file => path.join(POSTS_DIR, file));

    let updatedCount = 0;

    for (const filepath of files) {
        if (addPromotionalFooter(filepath)) {
            updatedCount++;
        }
    }

    console.log(`✨ Added promotional footer to ${updatedCount} posts!`);
}

main();
