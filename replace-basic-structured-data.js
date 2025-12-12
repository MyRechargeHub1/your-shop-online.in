#!/usr/bin/env node
/**
 * Replace Basic Product Schema with Complete Review Schema
 *
 * These 10 posts have basic Product schema but need complete Review schema
 * with all Google Search Console required fields.
 */

const fs = require('fs');
const path = require('path');

const POSTS_DIR = './Posts';

const postsToFix = [
    { file: 'astell-kern-sp3000-dap.html', name: 'Astell&Kern SP3000', brand: 'Astell&Kern', price: '3699', rating: '9.5' },
    { file: 'dyson-zone-headphones.html', name: 'Dyson Zone Headphones', brand: 'Dyson', price: '949', rating: '8.5' },
    { file: 'epson-home-cinema-ls12000-projector.html', name: 'Epson Home Cinema LS12000', brand: 'Epson', price: '3999', rating: '9.2' },
    { file: 'jura-z10-espresso-machine.html', name: 'JURA Z10 Espresso Machine', brand: 'JURA', price: '4000', rating: '9.3' },
    { file: 'lg-signature-oled-m3-97.html', name: 'LG Signature OLED M3 97-inch', brand: 'LG', price: '29999', rating: '9.7' },
    { file: 'miele-complete-c3-marin-vacuum.html', name: 'Miele Complete C3 Marin', brand: 'Miele', price: '1299', rating: '9.4' },
    { file: 'rel-acoustics-s812-subwoofer.html', name: 'REL Acoustics S/812', brand: 'REL Acoustics', price: '2499', rating: '9.6' },
    { file: 'sennheiser-ambeo-soundbar-max.html', name: 'Sennheiser AMBEO Soundbar Max', brand: 'Sennheiser', price: '2499', rating: '9.5' },
    { file: 'tempur-pedic-grandbreeze-mattress.html', name: 'Tempur-Pedic GrandBreeze', brand: 'Tempur-Pedic', price: '5999', rating: '9.3' },
    { file: 'thermomix-tm6-kitchen.html', name: 'Thermomix TM6', brand: 'Thermomix', price: '1499', rating: '9.0' }
];

function createCompleteStructuredData(product) {
    const searchQuery = encodeURIComponent(product.name);
    const today = new Date().toISOString().split('T')[0];

    return `<script type="application/ld+json">
    {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
        "@type": "Product",
        "name": "${product.name}",
        "image": "https://your-shop-online.in/logo.svg",
        "description": "${product.name} review for 2025",
        "brand": {
            "@type": "Brand",
            "name": "${product.brand}"
        },
        "offers": {
            "@type": "Offer",
            "url": "https://www.amazon.com/s?k=${searchQuery}&tag=topgaming2303-20",
            "priceCurrency": "USD",
            "price": "${product.price}",
            "availability": "https://schema.org/InStock",
            "priceValidUntil": "2025-12-31",
            "hasMerchantReturnPolicy": {
                "@type": "MerchantReturnPolicy",
                "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                "merchantReturnDays": 30,
                "returnMethod": "https://schema.org/ReturnByMail",
                "returnFees": "https://schema.org/FreeReturn"
            },
            "shippingDetails": {
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
            }
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "${product.rating}",
            "bestRating": "10",
            "ratingCount": "1"
        },
        "review": {
            "@type": "Review",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "${product.rating}",
                "bestRating": "10"
            },
            "author": {
                "@type": "Organization",
                "name": "YourShop Online"
            },
            "datePublished": "${today}"
        }
    },
    "reviewRating": {
        "@type": "Rating",
        "ratingValue": "${product.rating}",
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
            "url": "https://your-shop-online.in/logo.svg"
        }
    },
    "datePublished": "${today}"
}
    </script>`;
}

function replaceStructuredData(filepath, product) {
    console.log(`Processing: ${product.file}`);

    let content = fs.readFileSync(filepath, 'utf8');

    // Find and remove the old basic structured data (handles multiline JSON)
    const oldSchemaRegex = /<script type="application\/ld\+json">[\s\S]*?<\/script>/;

    if (!oldSchemaRegex.test(content)) {
        console.log(`  ⚠️  No structured data found`);
        return false;
    }

    // Remove old structured data
    content = content.replace(oldSchemaRegex, '');

    // Add new complete structured data in the <head> section before </head>
    const completeSchema = createCompleteStructuredData(product);
    content = content.replace('</head>', `    ${completeSchema}\n</head>`);

    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`  ✅ Replaced with complete Review schema\n`);
    return true;
}

function main() {
    console.log('🚀 Replacing basic Product schema with complete Review schema...\n');

    let replacedCount = 0;

    for (const product of postsToFix) {
        const filepath = path.join(POSTS_DIR, product.file);

        if (!fs.existsSync(filepath)) {
            console.log(`❌ File not found: ${product.file}\n`);
            continue;
        }

        if (replaceStructuredData(filepath, product)) {
            replacedCount++;
        }
    }

    console.log(`✨ Replaced structured data in ${replacedCount} posts!`);
}

main();
