# 🚀 Automated Posts Management

This directory contains automated tools to eliminate manual updates when adding new posts.

## The Problem (Before)

Previously, when adding new posts, you had to:
1. Create HTML files in `Posts/` directory
2. Manually update `_data/posts-config.json`
3. Manually update `sitemap.xml`
4. Commit and push changes

This was tedious and error-prone!

## The Solution (Now)

Now you just need to:
1. Add your HTML files to the `Posts/` directory
2. Run: `./update-all.sh`

That's it! Everything is automated! ✨

## Quick Start

### Option 1: Update Only (Review Before Committing)
```bash
./update-all.sh
```
This will:
- Scan all posts in `Posts/` directory
- Auto-generate `posts-config.json` (newest posts first)
- Auto-generate `sitemap.xml`
- Let you review changes before committing

### Option 2: Update AND Auto-Commit
```bash
./update-all.sh --commit
```
This will:
- Do everything from Option 1
- Automatically commit changes
- Automatically push to current branch

## How It Works

### 1. `auto-update-posts.py` (Main Script)

This Python script:
- **Scans** the `Posts/` directory for all HTML files
- **Extracts** metadata from each HTML file:
  - Title (from meta tags)
  - Description (from meta tags)
  - Category (auto-detected from structured data)
  - Date (from file modification time)
  - Read time (calculated from word count)
  - Icon (based on category)
- **Generates** `_data/posts-config.json` with newest posts first
- **Generates** `sitemap.xml` for SEO

**Smart Category Detection:**
- Books: Detected from `@type: "Book"` in structured data
- Gaming: Detected from "gaming" in title
- Household: Detected from keywords (vacuum, kitchen, cooking, etc.)
- Default: "Products" for everything else

### 2. `update-all.sh` (Convenience Wrapper)

Simple bash script that:
- Runs `auto-update-posts.py`
- Optionally commits and pushes changes

## Features

✅ **Zero Manual Updates** - Just add HTML files and run the script
✅ **Newest Posts First** - Automatically sorted by modification time
✅ **Smart Categorization** - Detects categories from HTML content
✅ **SEO Optimized** - Automatically updates sitemap.xml
✅ **Safe** - Review changes before committing
✅ **Fast** - Processes 500+ posts in seconds

## Examples

### Adding New Book Posts

```bash
# 1. Create your HTML files in Posts/ directory
# (They will automatically be detected as books if they have @type: "Book")

# 2. Run the automation
./update-all.sh

# 3. Review the generated files
git diff _data/posts-config.json
git diff sitemap.xml

# 4. Commit if everything looks good
git add _data/posts-config.json sitemap.xml
git commit -m "Add new book posts"
git push
```

### Or do it all in one command:

```bash
# After creating your HTML files:
./update-all.sh --commit
```

Done! 🎉

## Requirements

- Python 3
- BeautifulSoup4: `pip install beautifulsoup4`

## Troubleshooting

### "BeautifulSoup4 not installed"
```bash
pip install beautifulsoup4
```

### Posts not appearing in correct order
The script sorts by file modification time (newest first). If you need to adjust the order, you can `touch` files to update their modification time:
```bash
touch Posts/my-new-post.html
./update-all.sh
```

### Category detection not working
The script looks for:
- Books: `"@type": "Book"` in structured data
- Gaming: "gaming" keyword in title
- Household: "vacuum", "kitchen", "cooking", "household" in title

Make sure your HTML has the appropriate structured data or keywords.

## Old vs New Workflow

### Old Workflow ❌
```
1. Create HTML file
2. Open posts-config.json
3. Find the right place to insert entry
4. Manually type all metadata
5. Open sitemap.xml
6. Add new URL
7. Format correctly
8. Commit multiple files
9. Repeat for each post... 😫
```

### New Workflow ✅
```
1. Create HTML file
2. Run: ./update-all.sh --commit
3. Done! 🎉
```

## Support

If you encounter any issues:
1. Check that your HTML files have proper meta tags
2. Ensure BeautifulSoup4 is installed
3. Run with verbose output: `python3 auto-update-posts.py`

---

**Made with ❤️ to eliminate tedious manual work!**
