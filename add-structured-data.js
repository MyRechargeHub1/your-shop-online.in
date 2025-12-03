#!/usr/bin/env node

/**
 * Add Schema.org Structured Data to All Posts
 * Automatically adds Product/Review structured data for SEO rich snippets
 */

const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, 'Posts');
const AFFILIATE_TAG = 'topgaming2303-20';
const DOMAIN = 'https://your-shop-online.in';

/**
 * Extract product name from HTML title or h1
 */
function extractProductName(html) {
    // Try to get from <title> tag
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    if (titleMatch) {
        return titleMatch[1]
            .replace(/Review.*$/i, '')
            .replace(/\s*-\s*.*$/, '')
            .replace(/\s*\|\s*.*$/, '')
            .trim();
    }

    // Fallback to h1
    const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
    if (h1Match) {
        return h1Match[1]
            .replace(/<[^>]+>/g, '')
            .replace(/Review.*$/i, '')
            .trim();
    }

    return 'Product';
}

/**
 * Extract description from meta description
 */
function extractDescription(html) {
    const match = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
    return match ? match[1] : '';
}

/**
 * Extract product image URL
 */
function extractImageUrl(html) {
    // Try og:image first
    const ogMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
    if (ogMatch) return ogMatch[1];

    // Try product image
    const imgMatch = html.match(/<img[^>]+src=["'](https:\/\/m\.media-amazon\.com[^"']+)["']/i);
    if (imgMatch) return imgMatch[1];

    // Fallback to logo
    return `${DOMAIN}/logo.svg`;
}

/**
 * Extract brand name from product name
 */
function extractBrand(productName) {
    const brands = ['Apple', 'Samsung', 'Sony', 'Bose', 'Amazon', 'Google', 'Microsoft',
                    'LG', 'Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'Razer', 'Alienware',
                    'Logitech', 'Corsair', 'SteelSeries', 'HyperX', 'Canon', 'Nikon',
                    'GoPro', 'DJI', 'Fitbit', 'Garmin', 'Peloton', 'Nintendo', 'Xbox',
                    'PlayStation', 'Meta', 'Oculus', 'Anker', 'Belkin', 'TP-Link',
                    'Netgear', 'Dyson', 'iRobot', 'Roomba', 'Ninja', 'KitchenAid',
                    'Vitamix', 'Breville', 'Nespresso', 'Keurig', 'Instant Pot',
                    'Philips', 'Sonos', 'JBL', 'Beats', 'Sennheiser', 'Audio-Technica',
                    'Shure', 'Rode', 'Blue', 'Elgato', 'Theragun', 'Hyperice',
                    'Herman Miller', 'Secretlab', 'Keychron', 'Das Keyboard', 'Ducky',
                    'Tile', 'Wyze', 'Ring', 'Blink', 'Arlo', 'Nest'];

    for (const brand of brands) {
        if (productName.includes(brand)) {
            return brand;
        }
    }

    // Extract first word as brand
    const firstWord = productName.split(' ')[0];
    return firstWord || 'Brand';
}

/**
 * Generate estimated price based on product category
 */
function estimatePrice(productName) {
    const name = productName.toLowerCase();

    // High-end products
    if (name.includes('macbook pro') || name.includes('imac') || name.includes('mac studio')) return '2499';
    if (name.includes('iphone 16') || name.includes('iphone pro')) return '999';
    if (name.includes('samsung galaxy s2') || name.includes('galaxy fold')) return '999';
    if (name.includes('sony a7') || name.includes('canon eos r')) return '1999';
    if (name.includes('alienware') || name.includes('razer blade')) return '1799';

    // Mid-range products
    if (name.includes('ipad pro')) return '799';
    if (name.includes('macbook air')) return '1099';
    if (name.includes('airpods pro')) return '249';
    if (name.includes('apple watch ultra')) return '799';
    if (name.includes('sony wh-1000xm') || name.includes('bose quietcomfort')) return '379';
    if (name.includes('gopro')) return '399';
    if (name.includes('meta quest') || name.includes('oculus')) return '499';

    // Lower-mid range
    if (name.includes('echo dot') || name.includes('alexa')) return '49';
    if (name.includes('fire tv stick')) return '54';
    if (name.includes('chromecast')) return '49';
    if (name.includes('tile') || name.includes('airtag')) return '29';
    if (name.includes('anker') && name.includes('power')) return '39';

    // Default mid-range
    return '199';
}

/**
 * Generate Schema.org structured data
 */
function generateStructuredData(html, filename) {
    const productName = extractProductName(html);
    const description = extractDescription(html);
    const imageUrl = extractImageUrl(html);
    const brand = extractBrand(productName);
    const price = estimatePrice(productName);
    const postUrl = `${DOMAIN}/Posts/${filename}`;
    const searchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(productName)}&tag=${AFFILIATE_TAG}`;

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Review",
        "itemReviewed": {
            "@type": "Product",
            "name": productName,
            "image": imageUrl,
            "description": description,
            "brand": {
                "@type": "Brand",
                "name": brand
            },
            "offers": {
                "@type": "Offer",
                "url": searchUrl,
                "priceCurrency": "USD",
                "price": price,
                "availability": "https://schema.org/InStock"
            }
        },
        "reviewRating": {
            "@type": "Rating",
            "ratingValue": "9",
            "bestRating": "10"
        },
        "author": {
            "@type": "Organization",
            "name": "YourShop Online"
        },
        "publisher": {
            "@type": "Organization",
            "name": "YourShop Online",
            "logo": {
                "@type": "ImageObject",
                "url": `${DOMAIN}/logo.svg`
            }
        },
        "datePublished": "2025-12-03"
    };

    return `    <!-- Structured Data -->
    <script type="application/ld+json">
    ${JSON.stringify(structuredData, null, 4)}
    </script>`;
}

/**
 * Check if post already has structured data
 */
function hasStructuredData(html) {
    return html.includes('application/ld+json');
}

/**
 * Add structured data to HTML
 */
function addStructuredData(html, filename) {
    if (hasStructuredData(html)) {
        return { modified: false, html: html };
    }

    const structuredData = generateStructuredData(html, filename);

    // Insert before </body>
    const bodyCloseIndex = html.lastIndexOf('</body>');
    if (bodyCloseIndex === -1) {
        console.warn(`⚠️  No </body> tag found in ${filename}`);
        return { modified: false, html: html };
    }

    const modifiedHtml =
        html.substring(0, bodyCloseIndex) +
        '\n' + structuredData + '\n' +
        html.substring(bodyCloseIndex);

    return { modified: true, html: modifiedHtml };
}

/**
 * Process all posts
 */
function processAllPosts() {
    console.log('🔍 Adding Schema.org Structured Data to All Posts...\n');

    const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.html'));

    let addedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    files.forEach(filename => {
        const filepath = path.join(POSTS_DIR, filename);

        try {
            const html = fs.readFileSync(filepath, 'utf8');
            const result = addStructuredData(html, filename);

            if (result.modified) {
                fs.writeFileSync(filepath, result.html, 'utf8');
                console.log(`✅ ${filename}`);
                addedCount++;
            } else {
                console.log(`⏭️  ${filename} (already has structured data)`);
                skippedCount++;
            }
        } catch (error) {
            console.error(`❌ ${filename}: ${error.message}`);
            errorCount++;
        }
    });

    console.log('\n' + '='.repeat(50));
    console.log('📊 Summary:');
    console.log(`   ✅ Added structured data: ${addedCount}`);
    console.log(`   ⏭️  Already had data: ${skippedCount}`);
    console.log(`   ❌ Errors: ${errorCount}`);
    console.log(`   📝 Total processed: ${files.length}`);
    console.log('='.repeat(50));

    if (addedCount > 0) {
        console.log('\n💡 Next Steps:');
        console.log('   1. Test a few posts to verify structured data');
        console.log('   2. Use Google Rich Results Test: https://search.google.com/test/rich-results');
        console.log('   3. Commit and push changes');
        console.log('   4. Submit sitemap to Google Search Console');
    }
}

// Run the script
processAllPosts();
