#!/usr/bin/env node
/**
 * Add Missing Structured Data to Posts
 *
 * This script adds complete structured data to posts that are missing it entirely.
 */

const fs = require('fs');
const path = require('path');

const POSTS_DIR = './Posts';

const missingPosts = [
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

function createStructuredData(product) {
    const searchQuery = encodeURIComponent(product.name);
    const today = new Date().toISOString().split('T')[0];

    return `
    <!-- Structured Data -->
    <script type="application/ld+json">
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

function addStructuredData(filepath, product) {
    console.log(`Processing: ${product.file}`);

    let content = fs.readFileSync(filepath, 'utf8');

    // Check if it already has structured data
    if (content.includes('application/ld+json')) {
        console.log(`  ⚠️  Already has structured data`);
        return false;
    }

    // Add structured data before </body>
    const structuredData = createStructuredData(product);
    content = content.replace('</body>', `${structuredData}\n</body>`);

    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`  ✅ Added structured data\n`);
    return true;
}

function main() {
    console.log('🚀 Adding missing structured data...\n');

    let addedCount = 0;

    for (const product of missingPosts) {
        const filepath = path.join(POSTS_DIR, product.file);

        if (!fs.existsSync(filepath)) {
            console.log(`❌ File not found: ${product.file}\n`);
            continue;
        }

        if (addStructuredData(filepath, product)) {
            addedCount++;
        }
    }

    console.log(`✨ Added structured data to ${addedCount} posts!`);
}

main();
