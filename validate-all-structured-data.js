const fs = require('fs');
const path = require('path');

const POSTS_DIR = './Posts';
let errorCount = 0;
let validCount = 0;

const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.html')).sort();

console.log(`Validating ${files.length} files...\n`);

files.forEach(file => {
    const filepath = path.join(POSTS_DIR, file);
    const content = fs.readFileSync(filepath, 'utf8');
    const match = content.match(/<script type="application\/ld\+json">\s*(\{[\s\S]*?\})\s*<\/script>/);
    
    if (!match) {
        console.log(`❌ ${file}: No structured data found`);
        errorCount++;
        return;
    }
    
    try {
        const data = JSON.parse(match[1]);
        
        // Check for price field
        if (data.itemReviewed && data.itemReviewed.offers) {
            if (!data.itemReviewed.offers.price) {
                console.log(`❌ ${file}: Missing price field`);
                errorCount++;
            } else {
                validCount++;
            }
        } else {
            console.log(`❌ ${file}: Missing offers structure`);
            errorCount++;
        }
    } catch(e) {
        console.log(`❌ ${file}: Invalid JSON - ${e.message}`);
        errorCount++;
    }
});

console.log(`\n✨ Validation complete!`);
console.log(`✅ Valid: ${validCount}`);
console.log(`❌ Errors: ${errorCount}`);
