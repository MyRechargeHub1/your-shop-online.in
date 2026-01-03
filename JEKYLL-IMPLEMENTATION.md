# Jekyll Implementation Guide

## Overview

This repository now uses a **hybrid Jekyll system** that combines:
- **Jekyll layouts** for page structure (_layouts/)
- **Jekyll data files** for post metadata (_data/posts-config.json)
- **Static HTML posts** for individual product reviews (Posts/)
- **Liquid templating** for dynamic content generation

This approach provides the benefits of Jekyll (templating, SEO, GitHub Pages integration) while maintaining the existing 580+ static HTML product review posts.

## System Architecture

### Directory Structure

```
your-shop-online.in/
├── _layouts/              # Jekyll layouts
│   ├── default.html      # Base layout (header, footer, navigation)
│   └── home.html         # Homepage layout (displays posts grid)
├── _data/                # Jekyll data files
│   └── posts-config.json # Post metadata (580 entries)
├── Posts/                # Static HTML product reviews (580 files)
│   ├── product-1.html
│   ├── product-2.html
│   └── ...
├── _config.yml           # Jekyll configuration
├── index.md              # Homepage (uses home layout)
├── all-posts.html        # All posts listing page
├── about.html            # About page
├── contact.html          # Contact page
├── styles.css            # Global styles
├── blog-styles.css       # Blog-specific styles
├── script.js             # Main JavaScript
├── posts-loader.js       # Legacy posts loader (backup)
└── sitemap.xml           # Auto-generated sitemap
```

## How It Works

### 1. Homepage (index.md)

The homepage uses Jekyll's **home layout** to display product reviews:

```yaml
---
layout: home
title: Amazon Best Sellers 2025 - Premium Product Reviews
---
```

The home layout (`_layouts/home.html`) iterates through `site.data.posts-config` to generate blog cards:

```liquid
{% for post in site.data.posts-config limit:12 %}
  <article class="blog-card">
    <a href="/Posts/{{ post.filename }}.html">
      <h2>{{ post.title }}</h2>
      <p>{{ post.description }}</p>
    </a>
  </article>
{% endfor %}
```

### 2. Data-Driven Posts

Post metadata is stored in `_data/posts-config.json`:

```json
{
  "filename": "product-name-2025",
  "title": "Product Title",
  "category": "Category Name",
  "date": "December 26, 2025",
  "read_time": "15 min",
  "icon": "star",
  "description": "Product description..."
}
```

Jekyll automatically loads this as `site.data.posts-config` for use in templates.

### 3. Static HTML Posts

Individual product reviews remain as static HTML files in `Posts/` directory. They are:
- **Not processed by Jekyll** (no Liquid templating)
- **Complete standalone pages** with their own HTML structure
- **SEO-optimized** with meta tags, Open Graph, structured data
- **Amazon affiliate links** integrated (topgaming2303-20)

### 4. All Posts Page

The `all-posts.html` page displays all 580 posts with:
- **Search functionality** (filter by title)
- **Category filtering** (dropdown)
- **Sorting options** (date, title)
- **Dynamic JavaScript filtering**

## Local Development

### Method 1: Jekyll Server (Recommended)

```bash
# Install dependencies
bundle install

# Serve site locally
bundle exec jekyll serve

# Visit http://localhost:4000
```

### Method 2: Python HTTP Server (Simple)

```bash
# Start server
python3 -m http.server 8000

# Visit http://localhost:8000
```

### Method 3: Node.js HTTP Server

```bash
# Install http-server (one-time)
npm install -g http-server

# Start server
http-server -p 8000

# Visit http://localhost:8000
```

### Method 4: VS Code Live Server

1. Install "Live Server" extension
2. Right-click `index.md` or any HTML file
3. Select "Open with Live Server"

## GitHub Pages Deployment

### Automatic Deployment

GitHub Pages will automatically:
1. **Detect Jekyll** from `_config.yml`
2. **Build the site** using Jekyll
3. **Deploy to** https://your-shop-online.in

### Configuration Steps

1. Go to repository **Settings** → **Pages**
2. Set **Source**: Deploy from branch
3. Select **Branch**: `main` or your working branch
4. Select **Folder**: `/ (root)`
5. Click **Save**

GitHub will build and deploy within 1-2 minutes.

## Key Features

### ✅ Advantages of This System

1. **Jekyll Benefits**
   - SEO optimization via jekyll-seo-tag
   - Automatic sitemap generation
   - Liquid templating for DRY code
   - GitHub Pages native support

2. **Data-Driven**
   - Single source of truth (posts-config.json)
   - Easy to update metadata
   - Fast rendering with Liquid

3. **Scalability**
   - Add new posts by updating posts-config.json
   - No need to rebuild entire site
   - Static HTML posts load instantly

4. **Backward Compatibility**
   - Existing 580 posts unchanged
   - No migration required
   - Legacy posts-loader.js as backup

### ⚠️ Important Notes

1. **Posts are static HTML**, not Jekyll markdown posts
2. **No `site.posts` collection** (using `site.data.posts-config` instead)
3. **Two copies of posts-config.json**:
   - `/posts-config.json` (for JavaScript loader)
   - `/_data/posts-config.json` (for Jekyll data)
4. **Keep both in sync** when adding new posts

## Adding New Posts

### Step 1: Create HTML Post

Create new post file in `Posts/` directory:

```html
<!-- Posts/new-product-2025.html -->
<!DOCTYPE html>
<html>
<head>
  <title>New Product Review</title>
  <!-- SEO meta tags, Open Graph, etc. -->
</head>
<body>
  <!-- Product review content -->
</body>
</html>
```

### Step 2: Update posts-config.json

Add entry to **both** config files:

```bash
# Update root config (for JavaScript)
# Edit: posts-config.json

# Update data config (for Jekyll)
# Edit: _data/posts-config.json
```

Add entry:

```json
{
  "filename": "new-product-2025",
  "title": "New Product Review",
  "category": "Category Name",
  "date": "January 3, 2026",
  "read_time": "15 min",
  "icon": "star",
  "description": "Product description..."
}
```

### Step 3: Update Sitemap

```bash
python3 generate-sitemap.py
```

### Step 4: Commit and Push

```bash
git add Posts/new-product-2025.html
git add posts-config.json
git add _data/posts-config.json
git add sitemap.xml
git commit -m "Add new product review"
git push
```

## Maintaining Posts Config Sync

To keep both copies of posts-config.json in sync:

```bash
# Copy from root to _data
cp posts-config.json _data/posts-config.json

# Or copy from _data to root
cp _data/posts-config.json posts-config.json
```

**Recommendation:** Make _data/posts-config.json the primary source, then copy to root.

## Troubleshooting

### Issue: Posts not showing on homepage

**Cause:** Jekyll not processing `site.data.posts-config`

**Fix:**
1. Check `_data/posts-config.json` exists
2. Verify JSON is valid (use JSONLint)
3. Rebuild site: `bundle exec jekyll build --verbose`

### Issue: GitHub Pages build failing

**Cause:** Jekyll configuration error

**Fix:**
1. Check `_config.yml` syntax
2. Verify all plugins are GitHub Pages compatible
3. Check `.gitignore` isn't excluding necessary files

### Issue: Styles not loading

**Cause:** CSS files excluded from build

**Fix:**
1. Check `_config.yml` include section
2. Ensure CSS files are in root directory
3. Verify paths in `_layouts/default.html`

### Issue: Posts showing "404 Not Found"

**Cause:** Posts directory not copied to _site

**Fix:**
1. Add `Posts` to `include:` section in `_config.yml`
2. Ensure Posts/ directory is not in `.gitignore`

## Performance

### Current Stats

- **Total Posts:** 580 HTML files
- **Total Size:** ~17.4 MB
- **Average Post Size:** 30 KB
- **Build Time:** ~2-3 seconds (Jekyll)
- **Deploy Time:** ~1-2 minutes (GitHub Pages)

### Optimization

- Jekyll compresses HTML automatically
- CSS is minified (sass compressed)
- Static HTML posts load instantly
- No database queries needed

## SEO Features

### Implemented

✅ jekyll-seo-tag plugin
✅ Automatic meta tags generation
✅ Open Graph tags
✅ Twitter Cards
✅ Canonical URLs
✅ XML Sitemap (580 URLs)
✅ Structured data (schema.org)
✅ Google Analytics integration

### Configuration

All SEO settings in `_config.yml`:

```yaml
title: "YourShop Online - Premium Product Reviews"
description: "Your trusted source for premium product reviews..."
url: "https://your-shop-online.in"
google_analytics: G-EV8RGKBESY
```

## Migration Path (Future)

To fully migrate to Jekyll posts (optional):

1. **Convert HTML to Markdown**
   - Extract content from Posts/*.html
   - Create _posts/*.md with front matter
   - Move to _posts/ directory

2. **Update Layouts**
   - Create _layouts/post.html
   - Add Liquid templating for product reviews

3. **Remove Static Posts**
   - Delete Posts/ directory
   - Remove posts-config.json
   - Use site.posts collection

**Note:** This is optional. Current hybrid system works perfectly.

## Support

For issues or questions:
- Review TESTING-GUIDE.md
- Check POSTS-REVIEW-REPORT.md
- See Jekyll documentation: https://jekyllrb.com

---

**Last Updated:** January 3, 2026
**Jekyll Version:** 4.3
**Posts Count:** 580
**System Status:** ✅ Production Ready
