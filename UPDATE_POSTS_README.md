# Automated Posts Update System

This system automatically updates `posts-config.json` and `sitemap.xml` whenever you add new posts to your website.

## How It Works

The script (`update-posts-system.js`) automatically:

1. **Scans** all HTML files in the `Posts/` directory
2. **Extracts** metadata from each post (title, description, date, category, etc.)
3. **Updates** `posts-config.json` with all post information
4. **Generates** `sitemap.xml` with proper SEO URLs and priorities
5. **Sorts** posts by date (newest first)
6. **Assigns** appropriate icons based on content

## Usage

### Method 1: NPM Script (Recommended)
```bash
npm run update-posts
```

### Method 2: Direct Execution
```bash
node update-posts-system.js
```

### Method 3: Make it executable (Linux/Mac)
```bash
chmod +x update-posts-system.js
./update-posts-system.js
```

## When to Run

Run this script whenever you:
- ✅ Add new blog posts
- ✅ Update existing post metadata
- ✅ Want to refresh the sitemap
- ✅ Need to regenerate posts-config.json

## What Gets Updated

### posts-config.json
- Post filename
- Title (from `<title>` tag)
- Description (from meta description)
- Category (from post tags)
- Date (from post meta or file date)
- Read time (from post meta)
- Icon (auto-assigned based on content)

### sitemap.xml
- All static pages (home, about, contact, etc.)
- All blog posts with proper URLs
- Last modified dates
- Change frequency
- SEO priority (0.9 for recent posts, 0.8 for older)

## Features

- ⚡ **Automatic metadata extraction** from HTML files
- 📅 **Date sorting** - newest posts appear first
- 🎯 **Smart icon assignment** based on keywords
- 🔍 **SEO optimization** with proper priorities
- 📊 **Error reporting** for any issues
- 🎨 **Pretty formatting** of JSON output

## Icon Mapping

The system automatically assigns icons based on keywords in titles/descriptions:

| Keywords | Icon |
|----------|------|
| camera | 📷 camera |
| phone, smartphone | 📱 mobile |
| laptop | 💻 laptop |
| monitor, desktop | 🖥️ desktop |
| watch | ⌚ watch |
| headphone, earbud | 🎧 headphones |
| speaker, soundbar | 🔊 volume-up |
| tv | 📺 tv |
| bike, bicycle | 🚴 bicycle |
| fitness, gym | ❤️ heartbeat |
| coffee, espresso | ☕ coffee |

## Troubleshooting

### Script won't run
```bash
# Make sure Node.js is installed
node --version

# Install dependencies (if needed)
npm install
```

### Posts not appearing
- Check that HTML files are in the `Posts/` directory
- Ensure HTML files have proper meta tags
- Check console output for error messages

### Wrong metadata extracted
- Verify HTML structure matches expected format
- Check that meta tags are properly formatted
- Review the script's extraction patterns

## Automation Ideas

### Git Hook (Automatic on commit)
Create `.git/hooks/pre-commit`:
```bash
#!/bin/bash
node update-posts-system.js
git add posts-config.json sitemap.xml
```

### GitHub Actions (Automatic on push)
Add to `.github/workflows/update-posts.yml`:
```yaml
name: Update Posts
on: [push]
jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: node update-posts-system.js
      - run: |
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add posts-config.json sitemap.xml
          git commit -m "Auto-update posts config and sitemap" || true
          git push || true
```

### Scheduled Updates
Add to crontab (runs daily at 2 AM):
```bash
0 2 * * * cd /path/to/your-shop-online.in && node update-posts-system.js
```

## Example Output

```
🔄 Starting automated posts update system...

📁 Found 213 HTML files in Posts directory

📊 Extraction Results:
   ✅ Success: 213
   ❌ Errors: 0

✅ Updated posts-config.json with 213 posts
✅ Updated sitemap.xml with 213 posts

✨ All files updated successfully!

📝 Summary:
   • Total posts processed: 213
   • posts-config.json: Updated
   • sitemap.xml: Updated

💡 Tip: Run this script whenever you add new posts to keep everything synchronized.
```

## Support

If you encounter any issues:
1. Check the console output for error messages
2. Verify your HTML files have proper structure
3. Ensure all required meta tags are present
4. Check file permissions

## License

This script is part of the Your Shop Online website project.
