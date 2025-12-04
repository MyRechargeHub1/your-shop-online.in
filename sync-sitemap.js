#!/usr/bin/env node
/**
 * Automatic Sitemap Generator
 *
 * This script automatically generates sitemap.xml based on all HTML posts
 * in the Posts/ directory and static pages in the root.
 *
 * Usage: node sync-sitemap.js
 */

const fs = require('fs');
const path = require('path');

const POSTS_DIR = './Posts';
const SITEMAP_FILE = './sitemap.xml';
const BASE_URL = 'https://your-shop-online.in';

// Static pages configuration
const STATIC_PAGES = [
    { path: '/', changefreq: 'daily', priority: '1.0' },
    { path: '/about.html', changefreq: 'monthly', priority: '0.6' },
    { path: '/contact.html', changefreq: 'monthly', priority: '0.6' },
    { path: '/privacy-policy.html', changefreq: 'yearly', priority: '0.4' },
    { path: '/404.html', changefreq: 'yearly', priority: '0.3' }
];

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getFileModificationDate(filepath) {
    try {
        const stats = fs.statSync(filepath);
        return formatDate(stats.mtime);
    } catch (error) {
        // If file doesn't exist or error, return today's date
        return formatDate(new Date());
    }
}

function generateSitemap() {
    console.log('🗺️  Generating sitemap.xml...\n');

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n';

    // Add static pages
    xml += '    <!-- Static Pages -->\n';
    for (const page of STATIC_PAGES) {
        const filepath = page.path === '/' ? './index.html' : `.${page.path}`;
        const lastmod = getFileModificationDate(filepath);

        xml += '    <url>\n';
        xml += `        <loc>${BASE_URL}${page.path}</loc>\n`;
        xml += `        <lastmod>${lastmod}</lastmod>\n`;
        xml += `        <changefreq>${page.changefreq}</changefreq>\n`;
        xml += `        <priority>${page.priority}</priority>\n`;
        xml += '    </url>\n';
    }

    console.log(`✅ Added ${STATIC_PAGES.length} static pages`);

    // Scan Posts directory
    if (!fs.existsSync(POSTS_DIR)) {
        console.error(`❌ Error: ${POSTS_DIR} directory not found`);
        process.exit(1);
    }

    const files = fs.readdirSync(POSTS_DIR)
        .filter(file => file.endsWith('.html'))
        .sort();

    console.log(`📄 Found ${files.length} posts in ${POSTS_DIR}`);

    // Add product review posts
    xml += '\n    <!-- Product Review Posts -->\n';

    for (const file of files) {
        const filepath = path.join(POSTS_DIR, file);
        const lastmod = getFileModificationDate(filepath);

        xml += '    <url>\n';
        xml += `        <loc>${BASE_URL}/Posts/${file}</loc>\n`;
        xml += `        <lastmod>${lastmod}</lastmod>\n`;
        xml += '        <changefreq>monthly</changefreq>\n';
        xml += '        <priority>0.8</priority>\n';
        xml += '    </url>\n';
    }

    xml += '</urlset>\n';

    console.log(`✅ Added ${files.length} product review posts`);

    return xml;
}

function main() {
    console.log('🚀 Starting automatic sitemap generation...\n');

    try {
        const sitemapContent = generateSitemap();

        // Write sitemap.xml
        fs.writeFileSync(SITEMAP_FILE, sitemapContent, 'utf8');

        console.log('\n✨ Sitemap generated successfully!');
        console.log(`📍 Location: ${SITEMAP_FILE}`);
        console.log(`🔗 URL: ${BASE_URL}/sitemap.xml`);

        // Get file size
        const stats = fs.statSync(SITEMAP_FILE);
        console.log(`📦 Size: ${(stats.size / 1024).toFixed(2)} KB`);

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

// Run the script
main();
