#!/usr/bin/env node

/**
 * Add Amazon Product Images to Posts
 * Replaces logo.svg with actual Amazon product images
 */

const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, 'Posts');

/**
 * Amazon product image mappings for common products
 * Format: filename -> Amazon image URL
 */
const AMAZON_IMAGES = {
    // Apple Products
    'airpods-pro-2.html': 'https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_SL1500_.jpg',
    'apple-watch-se.html': 'https://m.media-amazon.com/images/I/71uw3RS6fqL._AC_SL1500_.jpg',
    'apple-watch-ultra-2.html': 'https://m.media-amazon.com/images/I/81SN+q4QV5L._AC_SL1500_.jpg',
    'apple-airtag.html': 'https://m.media-amazon.com/images/I/713xuNx+JfL._AC_SL1500_.jpg',
    'apple-homepod-2.html': 'https://m.media-amazon.com/images/I/61hJt1nS5oL._AC_SL1500_.jpg',
    'apple-vision-pro.html': 'https://m.media-amazon.com/images/I/61uwHxj+XfL._AC_SL1500_.jpg',

    // Amazon Devices
    'amazon-echo-hub.html': 'https://m.media-amazon.com/images/I/61+K-zRetzL._AC_SL1000_.jpg',
    'fire-tv-stick-4k.html': 'https://m.media-amazon.com/images/I/51TjJOTfslL._AC_SL1000_.jpg',
    'kindle-paperwhite.html': 'https://m.media-amazon.com/images/I/61sNmAkGd0L._AC_SL1000_.jpg',
    'blink-video-doorbell.html': 'https://m.media-amazon.com/images/I/61vy8LnG3ML._AC_SL1000_.jpg',

    // Audio Equipment
    'bengoo-g9000.html': 'https://m.media-amazon.com/images/I/61HVEP4nQLL._AC_SL1500_.jpg',
    'jbl-flip-6.html': 'https://m.media-amazon.com/images/I/71VYJ4sJd3L._AC_SL1500_.jpg',
    'sony-wh-1000xm5.html': 'https://m.media-amazon.com/images/I/61vKmd0-LqL._AC_SL1500_.jpg',
    'bowers-wilkins-px8.html': 'https://m.media-amazon.com/images/I/61XFq3dKR9L._AC_SL1500_.jpg',

    // Cameras & Drones
    'canon-eos-r6-mark-ii.html': 'https://m.media-amazon.com/images/I/81eX1AE0a2L._AC_SL1500_.jpg',
    'dji-mini-4-pro.html': 'https://m.media-amazon.com/images/I/61Z9z3Z8jPL._AC_SL1500_.jpg',
    'gopro-hero-12.html': 'https://m.media-amazon.com/images/I/71IBdJL7t-L._AC_SL1500_.jpg',
    'gopro-hero-13.html': 'https://m.media-amazon.com/images/I/81vDHqp3gWL._AC_SL1500_.jpg',

    // Laptops & Computing
    'asus-rog-zephyrus-g16.html': 'https://m.media-amazon.com/images/I/71NrJj+AdNL._AC_SL1500_.jpg',
    'dell-xps-17-2025.html': 'https://m.media-amazon.com/images/I/71SIlxoRF8L._AC_SL1500_.jpg',
    'msi-katana-gf76.html': 'https://m.media-amazon.com/images/I/81IFnCUV3ML._AC_SL1500_.jpg',
    'razer-blade-15.html': 'https://m.media-amazon.com/images/I/71qhJV6HVVL._AC_SL1500_.jpg',

    // Accessories
    'anker-power-bank.html': 'https://m.media-amazon.com/images/I/61gRo2ubVJL._AC_SL1500_.jpg',
    'anker-powercore-26800.html': 'https://m.media-amazon.com/images/I/61H54uHxxPL._AC_SL1500_.jpg',
    'anker-usb-c-hub.html': 'https://m.media-amazon.com/images/I/61kTSxzh4pL._AC_SL1500_.jpg',
    '3in1-charging-station.html': 'https://m.media-amazon.com/images/I/61aZ9dZV8lL._AC_SL1500_.jpg',

    // Smart Home & Appliances
    'instant-pot-duo.html': 'https://m.media-amazon.com/images/I/71Plj8f20OL._AC_SL1500_.jpg',
    'ninja-air-fryer.html': 'https://m.media-amazon.com/images/I/81t2sNRUxuL._AC_SL1500_.jpg',
    'roomba-694.html': 'https://m.media-amazon.com/images/I/61Ck4h3qIwL._AC_SL1500_.jpg',
    'roku-streaming-stick.html': 'https://m.media-amazon.com/images/I/51lQEG9AZ7L._AC_SL1500_.jpg',

    // Coffee Makers
    'breville-barista-express.html': 'https://m.media-amazon.com/images/I/81wPMT5NQQL._AC_SL1500_.jpg',
    'delonghi-specialista-maestro.html': 'https://m.media-amazon.com/images/I/81P2A2DJzyL._AC_SL1500_.jpg',
    'keurig-k-elite.html': 'https://m.media-amazon.com/images/I/81WV2ScOPfL._AC_SL1500_.jpg',
    'nespresso-vertuo-next.html': 'https://m.media-amazon.com/images/I/71D+LrU8HLL._AC_SL1500_.jpg',

    // Fitness & Gaming
    'meta-quest-3.html': 'https://m.media-amazon.com/images/I/71PQ47aLXYL._AC_SL1500_.jpg',
    'oculus-quest-3s.html': 'https://m.media-amazon.com/images/I/61JZH1LYWSL._AC_SL1500_.jpg',
    'peloton-bike-plus.html': 'https://m.media-amazon.com/images/I/61Kph7fPcrL._AC_SL1500_.jpg',
    'nintendo-switch-oled.html': 'https://m.media-amazon.com/images/I/61-PblYntsL._AC_SL1500_.jpg',

    // Networking
    'google-nest-wifi-pro-6e.html': 'https://m.media-amazon.com/images/I/51SjCX98gOL._AC_SL1500_.jpg',
    'tp-link-deco-xe75.html': 'https://m.media-amazon.com/images/I/41jHNSfP+gL._AC_SL1500_.jpg',
    'eero-pro-6e.html': 'https://m.media-amazon.com/images/I/41m5e7Z7bNL._AC_SL1500_.jpg',

    // Tablets & eReaders
    'galaxy-tab-s9-ultra.html': 'https://m.media-amazon.com/images/I/71sFQMuD9qL._AC_SL1500_.jpg',
    'ipad-air-11-inch-m2.html': 'https://m.media-amazon.com/images/I/61rKg76fYGL._AC_SL1500_.jpg',
    'ipad-pro-13-inch-m4.html': 'https://m.media-amazon.com/images/I/81Z6N3eqrWL._AC_SL1500_.jpg',
    'remarkable-2.html': 'https://m.media-amazon.com/images/I/61JGbPz0XML._AC_SL1500_.jpg',

    // Additional Apple Products
    'iphone-16-pro-max.html': 'https://m.media-amazon.com/images/I/81KJVzM7hfL._AC_SL1500_.jpg',
    'ipad-11-inch.html': 'https://m.media-amazon.com/images/I/61Ckdhp3i+L._AC_SL1500_.jpg',
    'ipad-pro-12-9-m2.html': 'https://m.media-amazon.com/images/I/81qW3IdJLBL._AC_SL1500_.jpg',
    'macbook-pro-16-m3.html': 'https://m.media-amazon.com/images/I/618d5crgy2L._AC_SL1500_.jpg',
    'macbook-pro-16-m4-max.html': 'https://m.media-amazon.com/images/I/61LMBTlJunL._AC_SL1500_.jpg',

    // Samsung Products
    'samsung-galaxy-s24-ultra.html': 'https://m.media-amazon.com/images/I/71RxUcC87CL._AC_SL1500_.jpg',
    'samsung-galaxy-s25-ultra.html': 'https://m.media-amazon.com/images/I/71hzFT0p8rL._AC_SL1500_.jpg',
    'samsung-galaxy-z-fold-6.html': 'https://m.media-amazon.com/images/I/71JlmDW7FwL._AC_SL1500_.jpg',
    'samsung-frame-tv-65.html': 'https://m.media-amazon.com/images/I/812fZHCWVeL._AC_SL1500_.jpg',
    'samsung-odyssey-oled-g9.html': 'https://m.media-amazon.com/images/I/81fBWpmIgLL._AC_SL1500_.jpg',
    'galaxy-tab-a9.html': 'https://m.media-amazon.com/images/I/71qJAGD-K0L._AC_SL1500_.jpg',

    // Sony Products
    'sony-wf-1000xm6.html': 'https://m.media-amazon.com/images/I/51WNZ2bCEhL._AC_SL1500_.jpg',
    'sony-wh1000xm5.html': 'https://m.media-amazon.com/images/I/61vKmd0-LqL._AC_SL1500_.jpg',
    'sony-a7-iv-camera.html': 'https://m.media-amazon.com/images/I/81pR9-YeBaL._AC_SL1500_.jpg',

    // Home Appliances
    'dyson-v15-detect.html': 'https://m.media-amazon.com/images/I/61fyCBxBn1L._AC_SL1200_.jpg',
    'dyson-purifier-hot-cool.html': 'https://m.media-amazon.com/images/I/61T3bB4oFvL._AC_SL1500_.jpg',
    'irobot-roomba-j7.html': 'https://m.media-amazon.com/images/I/61ZVJ2jrpOL._AC_SL1500_.jpg',
    'vitamix-a3500-ascent.html': 'https://m.media-amazon.com/images/I/71gGtk6EfaL._AC_SL1500_.jpg',
    'kitchenaid-pro-line-mixer.html': 'https://m.media-amazon.com/images/I/81zzDy4GFSL._AC_SL1500_.jpg',
    'nespresso-creatista-plus.html': 'https://m.media-amazon.com/images/I/719f5dVXUWL._AC_SL1500_.jpg',

    // TVs & Monitors
    'lg-c3-oled-65.html': 'https://m.media-amazon.com/images/I/81LPrzBv9iL._AC_SL1500_.jpg',
    'lg-27-4k-monitor.html': 'https://m.media-amazon.com/images/I/81s3VbXqJOL._AC_SL1500_.jpg',

    // Audio & Speakers
    'sonos-arc-soundbar.html': 'https://m.media-amazon.com/images/I/61J0jCLnBHL._AC_SL1500_.jpg',
    'tagry-x08-headphones.html': 'https://m.media-amazon.com/images/I/61zIwXdRfEL._AC_SL1500_.jpg',

    // Gaming & Accessories
    'nintendo-switch-oled.html': 'https://m.media-amazon.com/images/I/61-PblYntsL._AC_SL1500_.jpg',
    'xbox-controller.html': 'https://m.media-amazon.com/images/I/61VN4BQ9MyL._AC_SL1500_.jpg',
    'meta-quest-3s.html': 'https://m.media-amazon.com/images/I/61JZH1LYWSL._AC_SL1500_.jpg',
    'logitech-g502.html': 'https://m.media-amazon.com/images/I/61mpMH5TzkL._AC_SL1500_.jpg',
    'keychron-q1-pro.html': 'https://m.media-amazon.com/images/I/71CXzqDp3+L._AC_SL1500_.jpg',

    // Computing Peripherals
    'logitech-mx-master-3s.html': 'https://m.media-amazon.com/images/I/61ni3t1ryQL._AC_SL1500_.jpg',

    // Laptops
    'razer-blade-15-2024.html': 'https://m.media-amazon.com/images/I/71qhJV6HVVL._AC_SL1500_.jpg',
    'microsoft-surface-laptop-studio-2.html': 'https://m.media-amazon.com/images/I/61PKMf0gdeL._AC_SL1500_.jpg',
    'microsoft-surface-pro-10.html': 'https://m.media-amazon.com/images/I/61Y-qjQN4LL._AC_SL1500_.jpg',

    // Amazon Devices
    'echo-dot-5th-gen.html': 'https://m.media-amazon.com/images/I/71h7yT8PbYL._AC_SL1000_.jpg',

    // Smart Home & Security
    'ring-doorbell-pro-2.html': 'https://m.media-amazon.com/images/I/51CcOMy+MLL._AC_SL1000_.jpg',
    'wyze-cam-v4.html': 'https://m.media-amazon.com/images/I/61LLb-rqXwL._AC_SL1500_.jpg',
    'tile-pro-tracker.html': 'https://m.media-amazon.com/images/I/71i1dQywsxL._AC_SL1500_.jpg',

    // Fitness
    'fitbit-inspire-3.html': 'https://m.media-amazon.com/images/I/71REfYI7t8L._AC_SL1500_.jpg',
    'smart-watch-2025.html': 'https://m.media-amazon.com/images/I/71NZaXTbF6L._AC_SL1500_.jpg',

    // Furniture & Gaming Chairs
    'secretlab-titan-evo.html': 'https://m.media-amazon.com/images/I/71R0G4KtL5L._AC_SL1500_.jpg',
    'herman-miller-embody-gaming.html': 'https://m.media-amazon.com/images/I/51+nTlEFoXL._AC_SL1200_.jpg',
};

/**
 * Extract product name from HTML for fallback image search
 */
function extractProductName(html) {
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    if (titleMatch) {
        return titleMatch[1]
            .replace(/Review.*$/i, '')
            .replace(/\s*-\s*.*$/, '')
            .replace(/\s*\|\\s*.*$/, '')
            .trim();
    }
    return '';
}

/**
 * Check if post already has Amazon product image
 */
function hasAmazonImage(html) {
    return html.includes('m.media-amazon.com/images/I/');
}

/**
 * Replace logo.svg with Amazon product image
 */
function addAmazonImage(html, imageUrl, productName) {
    let modified = html;
    let changeCount = 0;

    // Replace og:image
    const ogImageRegex = /<meta\s+property=["']og:image["']\s+content=["']\.\.\/logo\.svg["']/gi;
    if (ogImageRegex.test(modified)) {
        modified = modified.replace(
            ogImageRegex,
            `<meta property="og:image" content="${imageUrl}"`
        );
        changeCount++;
    }

    // Replace twitter:image
    const twitterImageRegex = /<meta\s+name=["']twitter:image["']\s+content=["']\.\.\/logo\.svg["']/gi;
    if (twitterImageRegex.test(modified)) {
        modified = modified.replace(
            twitterImageRegex,
            `<meta name="twitter:image" content="${imageUrl}"`
        );
        changeCount++;
    }

    // Replace product image in structured data
    const structuredDataRegex = /"image":\s*"\.\.\/logo\.svg"/g;
    if (structuredDataRegex.test(modified)) {
        modified = modified.replace(
            structuredDataRegex,
            `"image": "${imageUrl}"`
        );
        changeCount++;
    }

    // If there's a product image container with logo.svg, replace it
    const imgTagRegex = /<img[^>]+src=["']\.\.\/logo\.svg["'][^>]*alt=["']([^"']*)["'][^>]*>/gi;
    modified = modified.replace(imgTagRegex, (match, alt) => {
        changeCount++;
        return `<img src="${imageUrl}" alt="${alt || productName}" class="product-image">`;
    });

    return { modified, changeCount };
}

/**
 * Process all posts
 */
function processAllPosts() {
    console.log('🖼️  Adding Amazon Product Images to Posts...\n');

    const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.html'));

    let addedCount = 0;
    let skippedCount = 0;
    let noImageAvailable = 0;
    let errorCount = 0;

    files.forEach(filename => {
        const filepath = path.join(POSTS_DIR, filename);

        try {
            const html = fs.readFileSync(filepath, 'utf8');

            // Skip if already has Amazon image
            if (hasAmazonImage(html)) {
                console.log(`⏭️  ${filename} (already has Amazon image)`);
                skippedCount++;
                return;
            }

            // Check if we have an image for this product
            const imageUrl = AMAZON_IMAGES[filename];
            if (!imageUrl) {
                console.log(`⚠️  ${filename} (no image mapping available)`);
                noImageAvailable++;
                return;
            }

            // Add the image
            const productName = extractProductName(html);
            const result = addAmazonImage(html, imageUrl, productName);

            if (result.changeCount > 0) {
                fs.writeFileSync(filepath, result.modified, 'utf8');
                console.log(`✅ ${filename} (${result.changeCount} replacements)`);
                addedCount++;
            } else {
                console.log(`⚠️  ${filename} (no replacements made)`);
            }

        } catch (error) {
            console.error(`❌ ${filename}: ${error.message}`);
            errorCount++;
        }
    });

    console.log('\n' + '='.repeat(60));
    console.log('📊 Summary:');
    console.log(`   ✅ Added Amazon images: ${addedCount}`);
    console.log(`   ⏭️  Already had images: ${skippedCount}`);
    console.log(`   ⚠️  No image mapping: ${noImageAvailable}`);
    console.log(`   ❌ Errors: ${errorCount}`);
    console.log(`   📝 Total processed: ${files.length}`);
    console.log('='.repeat(60));

    if (addedCount > 0) {
        console.log('\n💡 Next Steps:');
        console.log('   1. Review the updated posts to verify images display correctly');
        console.log('   2. Add more image mappings to AMAZON_IMAGES for remaining posts');
        console.log('   3. Commit and push changes');
    }

    if (noImageAvailable > 0) {
        console.log(`\n📋 ${noImageAvailable} posts still need image mappings added to the script.`);
    }
}

// Run the script
processAllPosts();
