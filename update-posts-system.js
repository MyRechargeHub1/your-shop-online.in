#!/usr/bin/env node

/**
 * Automated Posts Update System
 *
 * This script automatically updates:
 * 1. posts-config.json - Post metadata for the website
 * 2. sitemap.xml - SEO sitemap with all URLs
 *
 * Usage: node update-posts-system.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const POSTS_DIR = path.join(__dirname, 'Posts');
const POSTS_CONFIG_FILE = path.join(__dirname, 'posts-config.json');
const SITEMAP_FILE = path.join(__dirname, 'sitemap.xml');
const SITE_URL = 'https://your-shop-online.in';

// Icon mapping based on categories/keywords
const ICON_MAP = {
    'camera': 'camera',
    'phone': 'mobile',
    'smartphone': 'mobile',
    'laptop': 'laptop',
    'desktop': 'desktop',
    'monitor': 'desktop',
    'tablet': 'tablet',
    'watch': 'watch',
    'headphone': 'headphones',
    'earbud': 'headphones',
    'speaker': 'volume-up',
    'soundbar': 'volume-up',
    'tv': 'tv',
    'projector': 'film',
    'drone': 'drone',
    'robot': 'robot',
    'vacuum': 'robot',
    'coffee': 'coffee',
    'espresso': 'coffee',
    'blender': 'blender',
    'mixer': 'blender',
    'grill': 'fire',
    'oven': 'fire',
    'bike': 'bicycle',
    'treadmill': 'running',
    'rower': 'water',
    'rowing': 'water',
    'dumbbell': 'dumbbell',
    'fitness': 'heartbeat',
    'gym': 'dumbbell',
    'chair': 'chair',
    'desk': 'desk',
    'mattress': 'bed',
    'air': 'wind',
    'purifier': 'wind',
    'default': 'shopping-cart'
};

/**
 * Extract metadata from HTML file
 */
function extractMetadata(htmlPath) {
    try {
        const html = fs.readFileSync(htmlPath, 'utf-8');

        // Extract title
        const titleMatch = html.match(/<title>(.*?)<\/title>/i);
        const title = titleMatch ? titleMatch[1].replace(/ \| Your Shop Online| Review \d{4}|-/g, '').trim() : '';

        // Extract description
        const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
        const description = descMatch ? descMatch[1] : '';

        // Extract date from post-meta or use file modified date
        let date = '';
        const dateMatch = html.match(/<span><i class="far fa-calendar"><\/i>\s*(.*?)<\/span>/i);
        if (dateMatch) {
            date = dateMatch[1].trim();
        } else {
            // Fallback to file modification date
            const stats = fs.statSync(htmlPath);
            const modDate = new Date(stats.mtime);
            date = modDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }

        // Extract read time
        const readMatch = html.match(/<span><i class="far fa-clock"><\/i>\s*(\d+)\s*min read<\/span>/i);
        const readTime = readMatch ? readMatch[1] + ' min' : '10 min';

        // Extract category
        const catMatch = html.match(/<span><i class="fas fa-tag"><\/i>\s*(.*?)<\/span>/i);
        let category = catMatch ? catMatch[1].trim() : 'Products';

        // Determine icon based on title and description
        const iconKey = (title + ' ' + description).toLowerCase();
        let icon = 'shopping-cart';
        for (const [key, value] of Object.entries(ICON_MAP)) {
            if (iconKey.includes(key)) {
                icon = value;
                break;
            }
        }

        return {
            filename: path.basename(htmlPath, '.html'),
            title: title,
            category: category,
            date: date,
            read_time: readTime,
            icon: icon,
            description: description
        };
    } catch (error) {
        console.error(`Error extracting metadata from ${htmlPath}:`, error.message);
        return null;
    }
}

/**
 * Update posts-config.json
 */
function updatePostsConfig(posts) {
    try {
        // Sort posts by date (newest first)
        posts.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        });

        // Write to file with nice formatting
        fs.writeFileSync(POSTS_CONFIG_FILE, JSON.stringify(posts, null, 4));
        console.log(`✅ Updated ${POSTS_CONFIG_FILE} with ${posts.length} posts`);
        return true;
    } catch (error) {
        console.error('Error updating posts-config.json:', error.message);
        return false;
    }
}

/**
 * Update sitemap.xml
 */
function updateSitemap(posts) {
    try {
        let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

    <!-- Static Pages -->
    <url>
        <loc>${SITE_URL}/</loc>
        <lastmod>${getCurrentDate()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${SITE_URL}/about.html</loc>
        <lastmod>${getCurrentDate()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>
    <url>
        <loc>${SITE_URL}/contact.html</loc>
        <lastmod>${getCurrentDate()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>
    <url>
        <loc>${SITE_URL}/privacy-policy.html</loc>
        <lastmod>${getCurrentDate()}</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.4</priority>
    </url>
    <url>
        <loc>${SITE_URL}/404.html</loc>
        <lastmod>${getCurrentDate()}</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.3</priority>
    </url>

    <!-- Product Review Posts -->
`;

        // Group posts by date for organization
        const postsByDate = {};
        posts.forEach(post => {
            const dateKey = formatDateForSitemap(post.date);
            if (!postsByDate[dateKey]) {
                postsByDate[dateKey] = [];
            }
            postsByDate[dateKey].push(post);
        });

        // Add posts to sitemap, sorted by date (newest first)
        const sortedDates = Object.keys(postsByDate).sort((a, b) => new Date(b) - new Date(a));

        sortedDates.forEach(dateKey => {
            const datePosts = postsByDate[dateKey];
            const formattedDate = formatDateLabel(datePosts[0].date);

            xml += `    <!-- ${formattedDate} -->\n`;

            datePosts.forEach(post => {
                const priority = isRecentPost(post.date) ? '0.9' : '0.8';
                xml += `    <url>
        <loc>${SITE_URL}/Posts/${post.filename}.html</loc>
        <lastmod>${dateKey}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>${priority}</priority>
    </url>
`;
            });
            xml += '\n';
        });

        xml += `</urlset>
`;

        fs.writeFileSync(SITEMAP_FILE, xml);
        console.log(`✅ Updated ${SITEMAP_FILE} with ${posts.length} posts`);
        return true;
    } catch (error) {
        console.error('Error updating sitemap.xml:', error.message);
        return false;
    }
}

/**
 * Helper functions
 */
function getCurrentDate() {
    return new Date().toISOString().split('T')[0];
}

function formatDateForSitemap(dateStr) {
    try {
        const date = new Date(dateStr);
        return date.toISOString().split('T')[0];
    } catch {
        return getCurrentDate();
    }
}

function formatDateLabel(dateStr) {
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } catch {
        return dateStr;
    }
}

function isRecentPost(dateStr) {
    try {
        const postDate = new Date(dateStr);
        const now = new Date();
        const daysDiff = (now - postDate) / (1000 * 60 * 60 * 24);
        return daysDiff <= 30; // Posts within last 30 days get higher priority
    } catch {
        return false;
    }
}

/**
 * Main execution
 */
function main() {
    console.log('🔄 Starting automated posts update system...\n');

    // Check if Posts directory exists
    if (!fs.existsSync(POSTS_DIR)) {
        console.error('❌ Posts directory not found:', POSTS_DIR);
        process.exit(1);
    }

    // Get all HTML files from Posts directory
    const files = fs.readdirSync(POSTS_DIR)
        .filter(file => file.endsWith('.html'))
        .map(file => path.join(POSTS_DIR, file));

    console.log(`📁 Found ${files.length} HTML files in Posts directory\n`);

    // Extract metadata from all posts
    const posts = [];
    let successCount = 0;
    let errorCount = 0;

    files.forEach(file => {
        const metadata = extractMetadata(file);
        if (metadata) {
            posts.push(metadata);
            successCount++;
        } else {
            errorCount++;
        }
    });

    console.log(`\n📊 Extraction Results:`);
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Errors: ${errorCount}\n`);

    if (posts.length === 0) {
        console.error('❌ No posts found to process');
        process.exit(1);
    }

    // Update both files
    const configSuccess = updatePostsConfig(posts);
    const sitemapSuccess = updateSitemap(posts);

    if (configSuccess && sitemapSuccess) {
        console.log('\n✨ All files updated successfully!');
        console.log(`\n📝 Summary:`);
        console.log(`   • Total posts processed: ${posts.length}`);
        console.log(`   • posts-config.json: Updated`);
        console.log(`   • sitemap.xml: Updated`);
        console.log(`\n💡 Tip: Run this script whenever you add new posts to keep everything synchronized.`);
    } else {
        console.error('\n❌ Some files failed to update');
        process.exit(1);
    }
}

// Run the script
if (require.main === module) {
    main();
}

module.exports = { extractMetadata, updatePostsConfig, updateSitemap };
