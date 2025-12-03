# Automated Sitemap Generation

## Overview

Your website now has an automated sitemap generator that keeps `sitemap.xml` updated with all your product posts.

## Current Statistics

- **Product Review Posts**: 84
- **Static Pages**: 5
- **Total URLs in Sitemap**: 89

## How It Works

The `generate-sitemap.js` script automatically:
1. Scans the `Posts/` directory for all HTML files
2. Extracts modification dates from each post
3. Generates a complete `sitemap.xml` with proper formatting
4. Includes all static pages (home, about, contact, privacy, 404)
5. Uses optimal SEO settings (priorities, change frequencies)

## Usage

### When to Run

Run the sitemap generator whenever you:
- Add new product review posts
- Delete posts
- Want to refresh modification dates

### How to Run

```bash
# From the website root directory
node generate-sitemap.js
```

Or make it executable and run directly:
```bash
chmod +x generate-sitemap.js
./generate-sitemap.js
```

### Expected Output

```
🔍 Scanning Posts directory...
📝 Found 84 posts
🔨 Generating sitemap...
✅ Sitemap generated successfully!
📊 Statistics:
   - Product Posts: 84
   - Static Pages: 5
   - Total URLs: 89
   - File: /home/user/your-shop-online.in/sitemap.xml

💡 Submit your sitemap to Google Search Console:
   https://your-shop-online.in/sitemap.xml
```

## Automatic Updates for New Posts

### Workflow for Adding New Posts

1. **Create New Post**: Add your new product review HTML file to the `Posts/` directory
2. **Run Generator**: Execute `node generate-sitemap.js`
3. **Commit Changes**:
   ```bash
   git add Posts/your-new-post.html sitemap.xml
   git commit -m "Add new product post: Your Product Name"
   git push
   ```
4. **Done!**: Your sitemap is now updated with the new post

### Example

```bash
# After creating a new post file
node generate-sitemap.js

# Commit and push
git add Posts/new-product.html sitemap.xml
git commit -m "Add new product review and update sitemap"
git push
```

## Configuration

You can customize the generator by editing `generate-sitemap.js`:

- **Domain**: Change `DOMAIN` constant
- **Static Pages**: Modify `STATIC_PAGES` array
- **Post Priority**: Adjust priority values (currently 0.8 for posts)
- **Change Frequency**: Modify changefreq values (currently "monthly" for posts)

## SEO Benefits

✅ **Always Up-to-Date**: Never miss a post in Google indexing
✅ **Proper Dates**: Uses actual file modification times
✅ **SEO Optimized**: Correct priorities and change frequencies
✅ **Fast Indexing**: Helps Google discover new content quickly

## Troubleshooting

### No posts found
- Ensure `Posts/` directory exists
- Check that posts have `.html` extension

### Permission denied
- Make script executable: `chmod +x generate-sitemap.js`

### Sitemap not updating
- Delete old sitemap: `rm sitemap.xml`
- Run generator again: `node generate-sitemap.js`

## Google Search Console

After generating sitemap, submit it to Google:

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property (your-shop-online.in)
3. Navigate to Sitemaps
4. Submit: `https://your-shop-online.in/sitemap.xml`

---

**Last Updated**: December 3, 2025
**Current Posts**: 84
**Script Version**: 1.0
