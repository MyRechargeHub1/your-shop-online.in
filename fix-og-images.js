const fs = require('fs');
const path = require('path');

// Get all HTML files in Posts directory
const postsDir = './Posts';
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.html'));

console.log(`Processing ${files.length} posts...\n`);

let fixedCount = 0;
let alreadyCorrect = 0;
let errors = [];

files.forEach(filename => {
    const filePath = path.join(postsDir, filename);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Check if already using Amazon image in og:image
    if (content.includes('og:image.*media-amazon')) {
        alreadyCorrect++;
        return;
    }

    // Extract Amazon image URL from the post content
    const amazonImageMatch = content.match(/src="(https:\/\/m\.media-amazon\.com\/images\/[^"]+)"/);

    if (!amazonImageMatch) {
        errors.push(filename + ' - No Amazon image found in content');
        return;
    }

    const amazonImageUrl = amazonImageMatch[1];

    // Replace og:image with Amazon image
    const ogImageRegex = /<meta property="og:image" content="https:\/\/your-shop-online\.in\/logo\.svg">/;
    const twitterImageRegex = /<meta property="twitter:image" content="https:\/\/your-shop-online\.in\/logo\.svg">/;

    if (content.match(ogImageRegex)) {
        content = content.replace(
            ogImageRegex,
            `<meta property="og:image" content="${amazonImageUrl}">`
        );

        content = content.replace(
            twitterImageRegex,
            `<meta property="twitter:image" content="${amazonImageUrl}">`
        );

        fs.writeFileSync(filePath, content, 'utf-8');
        fixedCount++;
        console.log(`✅ Fixed: ${filename}`);
    }
});

console.log(`\n${'='.repeat(50)}`);
console.log(`SUMMARY:`);
console.log(`Total posts processed: ${files.length}`);
console.log(`✅ Fixed: ${fixedCount}`);
console.log(`✓ Already correct: ${alreadyCorrect}`);
console.log(`❌ Errors: ${errors.length}`);

if (errors.length > 0) {
    console.log(`\nErrors:`);
    errors.forEach(err => console.log(`  - ${err}`));
}
