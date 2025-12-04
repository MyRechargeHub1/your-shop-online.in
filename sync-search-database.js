#!/usr/bin/env node
/**
 * Automatic Search Database Sync
 *
 * This script scans all HTML posts in the Posts/ directory and automatically
 * generates the searchProducts array in script.js based on each post's metadata.
 *
 * Usage: node sync-search-database.js
 */

const fs = require('fs');
const path = require('path');

const POSTS_DIR = './Posts';
const SCRIPT_FILE = './script.js';

// Category mapping based on post content/title keywords
const categoryMap = {
    'audio': 'Audio',
    'headphone': 'Audio',
    'earbuds': 'Audio',
    'speaker': 'Audio',
    'soundbar': 'Audio',
    'gaming': 'Gaming',
    'vr': 'VR/AR',
    'quest': 'Gaming',
    'xbox': 'Gaming',
    'laptop': 'Laptops',
    'macbook': 'Laptops',
    'desktop': 'Gaming Desktops',
    'alienware': 'Gaming Desktops',
    'phone': 'Smartphones',
    'iphone': 'Smartphones',
    'galaxy': 'Smartphones',
    'tablet': 'Tablets',
    'ipad': 'Tablets',
    'watch': 'Wearables',
    'fitbit': 'Trackers',
    'airtag': 'Trackers',
    'tile': 'Trackers',
    'camera': 'Cameras',
    'gopro': 'Action Cameras',
    'tv': 'Displays',
    'oled': 'Premium TVs',
    'monitor': 'Displays',
    'router': 'Networking',
    'wifi': 'Networking',
    'echo': 'Smart Home',
    'alexa': 'Smart Home',
    'homepod': 'Smart Home',
    'hue': 'Smart Home',
    'ring': 'Smart Home',
    'blink': 'Smart Home',
    'wyze': 'Cameras',
    'drone': 'Drones',
    'stream deck': 'Streaming Gear',
    'fire tv': 'Streaming Devices',
    'roku': 'Streaming Devices',
    'kindle': 'E-Readers',
    'charging': 'Power & Charging',
    'power bank': 'Power & Charging',
    'power station': 'Power & Energy',
    'solix': 'Power & Energy',
    'vacuum': 'Home Appliances',
    'roomba': 'Home Appliances',
    'dyson': 'Home Appliances',
    'air fryer': 'Kitchen',
    'espresso': 'Kitchen',
    'coffee': 'Kitchen',
    'blender': 'Kitchen',
    'mixer': 'Kitchen',
    'instant pot': 'Kitchen',
    'ninja': 'Kitchen',
    'grill': 'Kitchen',
    'chair': 'Gaming',
    'keyboard': 'Accessories',
    'mouse': 'Accessories',
    'hub': 'Accessories',
    'peloton': 'Fitness',
    'bike': 'Fitness',
    'theragun': 'Wellness & Fitness',
    'massage': 'Wellness & Fitness'
};

function extractMetadata(htmlContent, filename) {
    // Extract title
    const titleMatch = htmlContent.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i) ||
                      htmlContent.match(/<title>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : filename.replace('.html', '');

    // Extract description
    const descMatch = htmlContent.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
    const description = descMatch ? descMatch[1].trim() : '';

    // Determine category based on title/filename
    let category = 'Products'; // Default category
    const searchText = (title + ' ' + filename).toLowerCase();

    for (const [keyword, cat] of Object.entries(categoryMap)) {
        if (searchText.includes(keyword)) {
            category = cat;
            break;
        }
    }

    return {
        title,
        description,
        category,
        url: `Posts/${filename}`
    };
}

function generateSearchProducts() {
    console.log('🔍 Scanning Posts directory...');

    const files = fs.readdirSync(POSTS_DIR)
        .filter(file => file.endsWith('.html'))
        .sort();

    console.log(`📄 Found ${files.length} HTML files`);

    const products = [];

    for (const file of files) {
        const filepath = path.join(POSTS_DIR, file);
        const content = fs.readFileSync(filepath, 'utf8');
        const metadata = extractMetadata(content, file);

        if (metadata.title && metadata.description) {
            products.push(metadata);
        } else {
            console.warn(`⚠️  Warning: Missing metadata in ${file}`);
        }
    }

    console.log(`✅ Extracted metadata from ${products.length} posts`);
    return products;
}

function updateScriptJS(products) {
    console.log('📝 Updating script.js...');

    let scriptContent = fs.readFileSync(SCRIPT_FILE, 'utf8');

    // Generate the searchProducts array as a formatted string
    const productsJS = products.map(p => {
        // Escape quotes in strings
        const title = p.title.replace(/"/g, '\\"');
        const description = p.description.replace(/"/g, '\\"');
        const category = p.category.replace(/"/g, '\\"');

        return `    { title: "${title}", description: "${description}", category: "${category}", url: "${p.url}" }`;
    }).join(',\n');

    const newArrayContent = `const searchProducts = [\n${productsJS}\n];`;

    // Replace the existing searchProducts array
    const regex = /const searchProducts = \[[\s\S]*?\];/;

    if (regex.test(scriptContent)) {
        scriptContent = scriptContent.replace(regex, newArrayContent);
        fs.writeFileSync(SCRIPT_FILE, scriptContent, 'utf8');
        console.log('✅ script.js updated successfully!');
        return true;
    } else {
        console.error('❌ Error: Could not find searchProducts array in script.js');
        return false;
    }
}

function main() {
    console.log('🚀 Starting automatic search database sync...\n');

    try {
        // Check if directories exist
        if (!fs.existsSync(POSTS_DIR)) {
            console.error(`❌ Error: ${POSTS_DIR} directory not found`);
            process.exit(1);
        }

        if (!fs.existsSync(SCRIPT_FILE)) {
            console.error(`❌ Error: ${SCRIPT_FILE} not found`);
            process.exit(1);
        }

        // Generate search products from posts
        const products = generateSearchProducts();

        if (products.length === 0) {
            console.error('❌ Error: No products found');
            process.exit(1);
        }

        // Update script.js
        const success = updateScriptJS(products);

        if (success) {
            console.log('\n✨ Search database synchronized successfully!');
            console.log(`📊 Total posts indexed: ${products.length}`);
        } else {
            process.exit(1);
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

// Run the script
main();
