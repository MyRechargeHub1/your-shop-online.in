# Jekyll System Documentation
# YourShop Online - Automated Sitemap & Jekyll Implementation

## Overview

This repository now includes a comprehensive Jekyll-based system with automated sitemap generation and management. The system is designed to work seamlessly with GitHub Pages and provides automated tools for maintaining your site's sitemap.

## Features

✅ **Automated Sitemap Generation** - Automatically generates sitemap.xml from posts-config.json
✅ **Jekyll Integration** - Full Jekyll configuration with SEO plugins
✅ **Validation Tools** - Sitemap validation and error checking
✅ **Helper Scripts** - Easy-to-use automation scripts
✅ **Git Hook Support** - Automatic sitemap updates on commit
✅ **CI/CD Ready** - Compatible with GitHub Actions and other CI/CD systems

## File Structure

```
your-shop-online.in/
├── _config.yml                 # Jekyll configuration
├── Gemfile                     # Ruby dependencies
├── sitemap.xml                 # Generated sitemap (auto-updated)
├── posts-config.json           # Posts metadata (source of truth)
├── generate-sitemap.py         # Python sitemap generator
├── update-sitemap-auto.sh      # Automated update script
├── jekyll-helper.sh            # Jekyll management helper
├── JEKYLL-README.md            # This file
└── Posts/                      # Blog posts directory
```

## Quick Start

### 1. Setup Jekyll (Optional - for local development)

```bash
# Install dependencies
./jekyll-helper.sh setup

# This will install:
# - Jekyll (~4.3)
# - jekyll-sitemap
# - jekyll-seo-tag
# - jekyll-feed
# - jekyll-redirect-from
```

### 2. Generate Sitemap

```bash
# Manual generation
python3 generate-sitemap.py

# Or use the helper
./jekyll-helper.sh sitemap
```

### 3. Validate Sitemap

```bash
./jekyll-helper.sh validate
```

## Usage Guide

### Sitemap Generation

The sitemap is automatically generated from `posts-config.json`. The generator:

1. Reads all posts from `posts-config.json`
2. Validates that corresponding HTML files exist in `Posts/`
3. Generates SEO-friendly sitemap with proper dates and priorities
4. Creates clean, valid XML output

**Manual Generation:**
```bash
python3 generate-sitemap.py
```

**Output:**
```
============================================================
YourShop Online - Automated Sitemap Generator
============================================================

✓ Loaded config from _config.yml
  Base URL: https://your-shop-online.in
✓ Loaded 579 posts from posts-config.json

✓ Sitemap generated successfully: sitemap.xml
  Total URLs: 582
  Homepage: 1
  Static pages: 2
  Blog posts: 579

✓ Sitemap generation completed successfully!
============================================================
```

### Automated Updates

The `update-sitemap-auto.sh` script automatically regenerates the sitemap when:
- `posts-config.json` is modified
- New `.html` files are added to `Posts/`
- Run with `--force` flag

**Usage:**
```bash
# Auto-detect changes and update
./update-sitemap-auto.sh

# Force update regardless of changes
./update-sitemap-auto.sh --force
```

### Jekyll Helper Commands

The `jekyll-helper.sh` script provides easy access to common Jekyll operations:

```bash
# Setup Jekyll environment
./jekyll-helper.sh setup

# Build the site
./jekyll-helper.sh build

# Start local development server
./jekyll-helper.sh serve

# Generate sitemap
./jekyll-helper.sh sitemap

# Validate sitemap
./jekyll-helper.sh validate

# Prepare for deployment
./jekyll-helper.sh deploy
```

## Configuration

### Jekyll Configuration (`_config.yml`)

Key settings in `_config.yml`:

```yaml
# Site Settings
url: "https://your-shop-online.in"
title: "YourShop Online - Premium Product Reviews"

# SEO
google_analytics: G-EV8RGKBESY

# Plugins
plugins:
  - jekyll-sitemap
  - jekyll-seo-tag
  - jekyll-feed

# Custom Sitemap Settings
sitemap_generator:
  auto_update: true
  source_file: posts-config.json
  output_file: sitemap.xml
  post_priority: "0.9"
  post_changefreq: "monthly"
```

### Sitemap Priorities

The sitemap uses the following priority structure:

| Page Type | Priority | Change Frequency |
|-----------|----------|------------------|
| Homepage | 1.0 | daily |
| Static Pages | 0.8 | monthly |
| Blog Posts | 0.9 | monthly |

## Integration

### Git Hooks

To automatically update the sitemap on every commit, create a pre-commit hook:

```bash
# Create pre-commit hook
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
./update-sitemap-auto.sh
EOF

# Make it executable
chmod +x .git/hooks/pre-commit
```

Now the sitemap will automatically update whenever you commit changes to posts-config.json or Post files.

### GitHub Actions

Add this to `.github/workflows/update-sitemap.yml`:

```yaml
name: Update Sitemap

on:
  push:
    paths:
      - 'posts-config.json'
      - 'Posts/*.html'

jobs:
  update-sitemap:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.x'

      - name: Generate Sitemap
        run: python3 generate-sitemap.py

      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add sitemap.xml
          git diff --quiet && git diff --staged --quiet || git commit -m "Auto-update sitemap"
          git push
```

## Adding New Posts

When adding new posts, follow this workflow:

1. **Add post HTML file** to `Posts/` directory
2. **Update posts-config.json** with post metadata:
   ```json
   {
     "filename": "my-new-post-2025",
     "title": "My New Post 2025",
     "category": "Product Reviews",
     "date": "December 26, 2025",
     "read_time": "10 min",
     "icon": "star",
     "description": "Post description"
   }
   ```
3. **Generate sitemap**:
   ```bash
   python3 generate-sitemap.py
   ```
4. **Commit and push**:
   ```bash
   git add Posts/my-new-post-2025.html posts-config.json sitemap.xml
   git commit -m "Add new post: My New Post"
   git push
   ```

Or simply use the automated script:
```bash
./update-sitemap-auto.sh
git add -A
git commit -m "Add new post"
git push
```

## Troubleshooting

### Sitemap not updating

1. Check if `posts-config.json` is valid JSON:
   ```bash
   python3 -m json.tool posts-config.json > /dev/null
   ```

2. Manually regenerate sitemap:
   ```bash
   python3 generate-sitemap.py
   ```

3. Check for missing post files:
   - The generator will warn about missing files
   - Ensure HTML files exist in `Posts/` directory

### Invalid XML errors

Validate the sitemap:
```bash
xmllint --noout sitemap.xml
# Or use the helper
./jekyll-helper.sh validate
```

### Jekyll not building

1. Ensure dependencies are installed:
   ```bash
   ./jekyll-helper.sh setup
   ```

2. Check for errors in `_config.yml`:
   ```bash
   bundle exec jekyll doctor
   ```

## Maintenance

### Regular Tasks

- **Weekly**: Validate sitemap for broken links
- **Monthly**: Review and update static page priorities
- **After bulk updates**: Manually verify sitemap generation

### Best Practices

1. **Always validate** sitemap after major changes
2. **Keep posts-config.json in sync** with actual HTML files
3. **Use the automation scripts** to avoid manual errors
4. **Monitor sitemap size** - Google recommends <50MB and <50,000 URLs
5. **Submit sitemap** to Google Search Console after major updates

## Advanced Features

### Custom Sitemap Configuration

Edit `_config.yml` to customize sitemap settings:

```yaml
sitemap_generator:
  auto_update: true
  source_file: posts-config.json
  homepage_priority: "1.0"
  post_priority: "0.9"
  page_priority: "0.8"
```

### Batch Operations

Generate sitemap for multiple environments:

```bash
# Production
python3 generate-sitemap.py

# Staging (with custom config)
BASE_URL="https://staging.your-shop-online.in" python3 generate-sitemap.py
```

## Support

For issues or questions:
1. Check this documentation
2. Validate your sitemap: `./jekyll-helper.sh validate`
3. Review error messages in sitemap generation output
4. Ensure `posts-config.json` is properly formatted

## License

This Jekyll implementation is part of the YourShop Online project.

---

**Last Updated**: December 26, 2025
**Version**: 1.0.0
**Maintainer**: YourShop Online Team
