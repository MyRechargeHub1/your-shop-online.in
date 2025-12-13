#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const POSTS_DIR = './Posts';

const postsNeedingFix = [
    'astell-kern-sp3000-dap.html',
    'dyson-zone-headphones.html',
    'epson-home-cinema-ls12000-projector.html',
    'jura-z10-espresso-machine.html',
    'lg-signature-oled-m3-97.html',
    'miele-complete-c3-marin-vacuum.html',
    'rel-acoustics-s812-subwoofer.html',
    'sennheiser-ambeo-soundbar-max.html',
    'tempur-pedic-grandbreeze-mattress.html',
    'thermomix-tm6-kitchen.html'
];

console.log('Adding second button to 10 posts...\n');

for (const file of postsNeedingFix) {
    const filepath = path.join(POSTS_DIR, file);
    let content = fs.readFileSync(filepath, 'utf8');

    const searchQuery = file.replace('.html', '').replace(/-/g, '+');
    const buyButton = `
            <div style="text-align: center; margin: 40px 0;">
                <a href="https://www.amazon.com/s?k=${searchQuery}&tag=topgaming2303-20" class="btn btn-primary" target="_blank" rel="noopener" style="font-size: 1.3em; padding: 18px 45px; font-weight: 700; border-radius: 10px; display: inline-block; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5); background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none;">
                    🛒 BUY NOW
                </a>
            </div>`;

    // Add button after featured image
    const pattern = /(<\/div>\s*<\/div>)\s*(<div class="post-content">)/;
    if (pattern.test(content) && !content.match(/🛒 BUY NOW[\s\S]{0,500}post-content/)) {
        content = content.replace(pattern, `$1${buyButton}\n\n            $2`);
        fs.writeFileSync(filepath, content, 'utf8');
        console.log(`✅ ${file}: Added top button`);
    } else {
        console.log(`⏭️  ${file}: Already has top button`);
    }
}

console.log('\n✨ Done!\n');

// Final verification
const { execSync } = require('child_process');
execSync('node check-button-count.js', { stdio: 'inherit' });
