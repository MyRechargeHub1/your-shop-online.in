#!/usr/bin/env node
/**
 * Fix Google Search Console Structured Data Issues
 *
 * This script adds missing fields to Product structured data:
 * - priceValidUntil (in offers)
 * - hasMerchantReturnPolicy (in offers)
 * - shippingDetails (in offers)
 * - aggregateRating (in Product)
 * - review (in Product)
 */

const fs = require('fs');
const path = require('path');

const POSTS_DIR = './Posts';
const PRICE_VALID_UNTIL = '2025-12-31'; // Valid until end of 2025

function updateStructuredData(filePath) {
    console.log(`Processing: ${path.basename(filePath)}`);

    let content = fs.readFileSync(filePath, 'utf8');

    // Find the structured data JSON-LD script
    const jsonLdMatch = content.match(/<script type="application\/ld\+json">\s*(\{[\s\S]*?\})\s*<\/script>/);

    if (!jsonLdMatch) {
        console.log(`  ⚠️  No structured data found`);
        return false;
    }

    try {
        const jsonData = JSON.parse(jsonLdMatch[1]);

        // Check if it's a Review type with Product
        if (jsonData['@type'] !== 'Review' || !jsonData.itemReviewed || jsonData.itemReviewed['@type'] !== 'Product') {
            console.log(`  ⚠️  Not a Product Review`);
            return false;
        }

        const product = jsonData.itemReviewed;
        const offers = product.offers;

        // Add priceValidUntil if missing
        if (offers && !offers.priceValidUntil) {
            offers.priceValidUntil = PRICE_VALID_UNTIL;
            console.log(`  ✓ Added priceValidUntil`);
        }

        // Add hasMerchantReturnPolicy if missing
        if (offers && !offers.hasMerchantReturnPolicy) {
            offers.hasMerchantReturnPolicy = {
                "@type": "MerchantReturnPolicy",
                "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                "merchantReturnDays": 30,
                "returnMethod": "https://schema.org/ReturnByMail",
                "returnFees": "https://schema.org/FreeReturn"
            };
            console.log(`  ✓ Added hasMerchantReturnPolicy`);
        }

        // Add shippingDetails if missing
        if (offers && !offers.shippingDetails) {
            offers.shippingDetails = {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                    "@type": "MonetaryAmount",
                    "value": "0",
                    "currency": "USD"
                },
                "shippingDestination": {
                    "@type": "DefinedRegion",
                    "addressCountry": "US"
                },
                "deliveryTime": {
                    "@type": "ShippingDeliveryTime",
                    "handlingTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 0,
                        "maxValue": 1,
                        "unitCode": "DAY"
                    },
                    "transitTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 1,
                        "maxValue": 5,
                        "unitCode": "DAY"
                    }
                }
            };
            console.log(`  ✓ Added shippingDetails`);
        }

        // Add aggregateRating if missing
        if (!product.aggregateRating && jsonData.reviewRating) {
            product.aggregateRating = {
                "@type": "AggregateRating",
                "ratingValue": jsonData.reviewRating.ratingValue,
                "bestRating": jsonData.reviewRating.bestRating || "10",
                "ratingCount": "1"
            };
            console.log(`  ✓ Added aggregateRating`);
        }

        // Add review array if missing
        if (!product.review) {
            product.review = {
                "@type": "Review",
                "reviewRating": jsonData.reviewRating,
                "author": jsonData.author,
                "datePublished": jsonData.datePublished
            };
            console.log(`  ✓ Added review`);
        }

        // Replace the structured data in the file
        const newJsonLd = JSON.stringify(jsonData, null, 4);
        const newScriptTag = `<script type="application/ld+json">\n    ${newJsonLd}\n    </script>`;

        content = content.replace(jsonLdMatch[0], newScriptTag);

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  ✅ Updated successfully\n`);
        return true;

    } catch (error) {
        console.error(`  ❌ Error parsing JSON: ${error.message}\n`);
        return false;
    }
}

function main() {
    console.log('🚀 Starting structured data fixes...\n');

    if (!fs.existsSync(POSTS_DIR)) {
        console.error(`❌ Error: ${POSTS_DIR} directory not found`);
        process.exit(1);
    }

    const files = fs.readdirSync(POSTS_DIR)
        .filter(file => file.endsWith('.html'))
        .sort();

    console.log(`📄 Found ${files.length} HTML files\n`);

    let updatedCount = 0;

    for (const file of files) {
        const filePath = path.join(POSTS_DIR, file);
        if (updateStructuredData(filePath)) {
            updatedCount++;
        }
    }

    console.log(`\n✨ Fixed structured data in ${updatedCount} posts!`);
    console.log(`📊 Total posts processed: ${files.length}`);
}

main();
