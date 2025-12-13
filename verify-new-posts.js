#!/usr/bin/env node
/**
 * Comprehensive verification of all 10 new posts
 */

const fs = require('fs');
const path = require('path');

const newPosts = [
    'tonal-home-gym.html',
    'hydrow-rower.html',
    'normatec-3-legs.html',
    'festool-kapex-ks120.html',
    'rimowa-original-trunk-plus.html',
    'yeti-tundra-350.html',
    'trek-domane-slr9.html',
    'specialized-turbo-levo.html',
    'adam-audio-a7v.html',
    'big-green-egg-xlarge.html'
];

const POSTS_DIR = './Posts';

console.log('🔍 Starting comprehensive post verification...\n');

let allPassed = true;
let issuesFound = [];

for (const filename of newPosts) {
    const filepath = path.join(POSTS_DIR, filename);
    console.log(`\n📄 Checking: ${filename}`);

    if (!fs.existsSync(filepath)) {
        console.log(`  ❌ File does not exist!`);
        issuesFound.push(`${filename}: File missing`);
        allPassed = false;
        continue;
    }

    const content = fs.readFileSync(filepath, 'utf8');

    // Check 1: Amazon affiliate links with correct StoreID
    const affiliateLinkPattern = /tag=topgaming2303-20/g;
    const affiliateLinks = content.match(affiliateLinkPattern);
    if (!affiliateLinks || affiliateLinks.length < 2) {
        console.log(`  ❌ Missing affiliate links (found ${affiliateLinks ? affiliateLinks.length : 0}, need at least 2)`);
        issuesFound.push(`${filename}: Insufficient affiliate links`);
        allPassed = false;
    } else {
        console.log(`  ✅ Affiliate links: ${affiliateLinks.length}`);
    }

    // Check 2: Buy Now buttons (should have 2)
    const buyNowButtons = content.match(/🛒 BUY NOW/g);
    if (!buyNowButtons || buyNowButtons.length < 2) {
        console.log(`  ❌ Missing Buy Now buttons (found ${buyNowButtons ? buyNowButtons.length : 0}, need 2)`);
        issuesFound.push(`${filename}: Missing Buy Now buttons`);
        allPassed = false;
    } else {
        console.log(`  ✅ Buy Now buttons: ${buyNowButtons.length}`);
    }

    // Check 3: Product image from Amazon CDN
    const amazonImagePattern = /https:\/\/m\.media-amazon\.com\/images/;
    if (!amazonImagePattern.test(content)) {
        console.log(`  ❌ Missing Amazon CDN image`);
        issuesFound.push(`${filename}: No Amazon CDN image`);
        allPassed = false;
    } else {
        console.log(`  ✅ Amazon CDN image present`);
    }

    // Check 4: Complete structured data
    const hasStructuredData = content.includes('"@context": "https://schema.org"');
    const hasPrice = content.includes('"price":');
    const hasPriceValidUntil = content.includes('"priceValidUntil": "2025-12-31"');
    const hasReturnPolicy = content.includes('"hasMerchantReturnPolicy"');
    const hasShippingDetails = content.includes('"shippingDetails"');
    const hasAggregateRating = content.includes('"aggregateRating"');
    const hasReview = content.includes('"review"');

    if (!hasStructuredData || !hasPrice || !hasPriceValidUntil || !hasReturnPolicy || !hasShippingDetails || !hasAggregateRating || !hasReview) {
        console.log(`  ❌ Incomplete structured data:`);
        if (!hasStructuredData) console.log(`     - Missing schema.org context`);
        if (!hasPrice) console.log(`     - Missing price`);
        if (!hasPriceValidUntil) console.log(`     - Missing priceValidUntil`);
        if (!hasReturnPolicy) console.log(`     - Missing hasMerchantReturnPolicy`);
        if (!hasShippingDetails) console.log(`     - Missing shippingDetails`);
        if (!hasAggregateRating) console.log(`     - Missing aggregateRating`);
        if (!hasReview) console.log(`     - Missing review`);
        issuesFound.push(`${filename}: Incomplete structured data`);
        allPassed = false;
    } else {
        console.log(`  ✅ Complete structured data`);
    }

    // Check 5: PositiveLifes.com footer
    const hasPositiveLifesFooter = content.includes('positivelifes.com') && content.includes('promotional-footer');
    if (!hasPositiveLifesFooter) {
        console.log(`  ❌ Missing PositiveLifes.com footer`);
        issuesFound.push(`${filename}: Missing promotional footer`);
        allPassed = false;
    } else {
        console.log(`  ✅ PositiveLifes.com footer present`);
    }

    // Check 6: US-targeted SEO
    const hasGeoRegion = content.includes('geo.region') && content.includes('US');
    const hasHreflang = content.includes('hreflang="en-us"');
    if (!hasGeoRegion || !hasHreflang) {
        console.log(`  ❌ Missing US SEO targeting`);
        issuesFound.push(`${filename}: Missing US SEO meta tags`);
        allPassed = false;
    } else {
        console.log(`  ✅ US-targeted SEO`);
    }

    // Check 7: Meta tags
    const hasOgTags = content.includes('og:title') && content.includes('og:description');
    const hasTwitterTags = content.includes('twitter:card');
    if (!hasOgTags || !hasTwitterTags) {
        console.log(`  ❌ Missing social meta tags`);
        issuesFound.push(`${filename}: Missing Open Graph or Twitter tags`);
        allPassed = false;
    } else {
        console.log(`  ✅ Social meta tags present`);
    }
}

console.log('\n\n📊 VERIFICATION SUMMARY\n' + '='.repeat(50));

if (allPassed) {
    console.log('✅ ALL CHECKS PASSED!');
    console.log(`\n✨ All ${newPosts.length} posts are properly configured with:`);
    console.log('   - Amazon affiliate links (tag=topgaming2303-20)');
    console.log('   - Dual Buy Now buttons');
    console.log('   - Amazon CDN product images');
    console.log('   - Complete structured data (price, returns, shipping, ratings)');
    console.log('   - PositiveLifes.com promotional footer');
    console.log('   - US-targeted SEO optimization');
    console.log('   - Social media meta tags');
} else {
    console.log('❌ ISSUES FOUND:\n');
    issuesFound.forEach(issue => console.log(`   - ${issue}`));
    console.log(`\n⚠️  ${issuesFound.length} issue(s) need to be addressed.`);
}

// Check posts-config.json
console.log('\n\n📋 Checking posts-config.json...');
const configPath = './posts-config.json';
const configContent = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configContent);

const newPostFilenames = newPosts.map(p => p.replace('.html', ''));
const configFilenames = config.map(entry => entry.filename);

let allInConfig = true;
for (const postFilename of newPostFilenames) {
    if (!configFilenames.includes(postFilename)) {
        console.log(`  ❌ ${postFilename} not found in posts-config.json`);
        allInConfig = false;
    }
}

if (allInConfig) {
    console.log(`  ✅ All ${newPosts.length} posts are in posts-config.json`);
    console.log(`  📊 Total posts in config: ${config.length}`);
} else {
    console.log(`  ❌ Some posts missing from config`);
}

// Final summary
console.log('\n\n🎯 FINAL STATUS\n' + '='.repeat(50));
if (allPassed && allInConfig) {
    console.log('🎉 EVERYTHING IS PERFECT!');
    console.log(`   - All ${newPosts.length} posts created successfully`);
    console.log(`   - All quality checks passed`);
    console.log(`   - Configuration files updated`);
    console.log(`   - Ready for deployment!`);
} else {
    console.log('⚠️  Some issues need attention. Please review above.');
}

console.log('');
