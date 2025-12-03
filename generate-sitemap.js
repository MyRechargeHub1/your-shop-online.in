#!/usr/bin/env node

/**
 * Automated Sitemap Generator
 * Automatically generates sitemap.xml from all posts in Posts/ directory
 * Run this script whenever you add new posts: node generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const DOMAIN = 'https://your-shop-online.in';
const POSTS_DIR = path.join(__dirname, 'Posts');
const SITEMAP_PATH = path.join(__dirname, 'sitemap.xml');

// Static pages configuration
const STATIC_PAGES = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/about.html', priority: '0.6', changefreq: 'monthly' },
    { path: '/contact.html', priority: '0.6', changefreq: 'monthly' },
    { path: '/privacy-policy.html', priority: '0.4', changefreq: 'yearly' },
    { path: '/404.html', priority: '0.3', changefreq: 'yearly' }
];

/**
 * Get all HTML files from Posts directory
 */
function getPostFiles() {
    try {
        const files = fs.readdirSync(POSTS_DIR);
        return files
            .filter(file => file.endsWith('.html'))
            .map(file => ({
                filename: file,
                path: `Posts/${file}`,
                stats: fs.statSync(path.join(POSTS_DIR, file))
            }))
            .sort((a, b) => b.stats.mtime - a.stats.mtime); // Sort by modification time (newest first)
    } catch (error) {
        console.error('Error reading Posts directory:', error);
        return [];
    }
}

/**
 * Format date for sitemap (YYYY-MM-DD)
 */
function formatDate(date) {
    return date.toISOString().split('T')[0];
}

/**
 * Generate sitemap XML content
 */
function generateSitemap(posts) {
    const today = formatDate(new Date());

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add static pages
    xml += '\n    <!-- Static Pages -->\n';
    STATIC_PAGES.forEach(page => {
        xml += '    <url>\n';
        xml += `        <loc>${DOMAIN}${page.path}</loc>\n`;
        xml += `        <lastmod>${today}</lastmod>\n`;
        xml += `        <changefreq>${page.changefreq}</changefreq>\n`;
        xml += `        <priority>${page.priority}</priority>\n`;
        xml += '    </url>\n';
    });

    // Add product review posts
    xml += '\n    <!-- Product Review Posts -->\n';
    posts.forEach(post => {
        const lastmod = formatDate(post.stats.mtime);
        xml += '    <url>\n';
        xml += `        <loc>${DOMAIN}/${post.path}</loc>\n`;
        xml += `        <lastmod>${lastmod}</lastmod>\n`;
        xml += '        <changefreq>monthly</changefreq>\n';
        xml += '        <priority>0.8</priority>\n';
        xml += '    </url>\n';
    });

    xml += '</urlset>\n';

    return xml;
}

/**
 * Main function
 */
function main() {
    console.log('🔍 Scanning Posts directory...');
    const posts = getPostFiles();

    if (posts.length === 0) {
        console.error('❌ No posts found in Posts/ directory');
        process.exit(1);
    }

    console.log(`📝 Found ${posts.length} posts`);

    console.log('🔨 Generating sitemap...');
    const sitemapContent = generateSitemap(posts);

    // Write sitemap to file
    fs.writeFileSync(SITEMAP_PATH, sitemapContent, 'utf8');

    console.log(`✅ Sitemap generated successfully!`);
    console.log(`📊 Statistics:`);
    console.log(`   - Product Posts: ${posts.length}`);
    console.log(`   - Static Pages: ${STATIC_PAGES.length}`);
    console.log(`   - Total URLs: ${posts.length + STATIC_PAGES.length}`);
    console.log(`   - File: ${SITEMAP_PATH}`);
    console.log('');
    console.log('💡 Submit your sitemap to Google Search Console:');
    console.log(`   ${DOMAIN}/sitemap.xml`);
}

// Run the script
main();
