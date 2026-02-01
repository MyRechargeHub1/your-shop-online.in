# Testing Guide - Your Shop Online
**How to test the website locally and troubleshoot posts not loading**

---

## 🚨 Common Issue: Posts Not Appearing on Homepage

If you're seeing an empty homepage with no blog posts, you're likely testing the site using the **file:// protocol** (opening HTML files directly in your browser). This doesn't work because modern browsers block fetch() requests for security reasons.

---

## ✅ Solution: Run a Local Web Server

You **must** run a local web server to test the site properly. Here are several easy options:

### Option 1: Python (Recommended - Built into most systems)

```bash
# Navigate to your project folder
cd /path/to/your-shop-online.in

# Python 3 (recommended)
python3 -m http.server 8000

# OR Python 2
python -m SimpleHTTPServer 8000
```

Then open: **http://localhost:8000**

### Option 2: Node.js (npx - No installation required)

```bash
# Navigate to your project folder
cd /path/to/your-shop-online.in

# Run http-server via npx
npx http-server -p 8000
```

Then open: **http://localhost:8000**

### Option 3: VS Code Live Server Extension

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Your browser will open automatically

### Option 4: Jekyll (For full Jekyll support)

```bash
# Navigate to your project folder
cd /path/to/your-shop-online.in

# Install dependencies (first time only)
bundle install

# Start Jekyll server
bundle exec jekyll serve

# Or use the helper script
./jekyll-helper.sh serve
```

Then open: **http://localhost:4000**

---

## 🧪 Diagnostic Tool

We've created a diagnostic page to help troubleshoot issues:

**Access:** `http://localhost:8000/test-posts-loading.html`

This tool will:
- ✅ Check if posts-config.json loads properly
- ✅ Validate JSON structure
- ✅ Show sample posts
- ✅ Detect protocol issues (file:// vs http://)
- ✅ Provide detailed error messages

---

## 🔍 How Posts Loading Works

### The System

1. **posts-config.json** - Contains metadata for all 580 posts
2. **posts-loader.js** - JavaScript that fetches and displays posts
3. **index.html** - Homepage with `.blog-grid` container

### The Process

```
1. Page loads → posts-loader.js runs
2. Fetches /posts-config.json
3. Parses 580 post entries
4. Generates HTML for each post
5. Inserts into .blog-grid container
6. Updates post count (#post-count)
```

### Why It Requires a Server

The `fetch('/posts-config.json')` call requires HTTP protocol because:
- **file://** = Blocked by CORS (security)
- **http://** or **https://** = Works perfectly

---

## 📋 Verification Checklist

### Before Testing

- [ ] Posts are in `/Posts/` directory (580 HTML files)
- [ ] `posts-config.json` exists in root directory
- [ ] `posts-loader.js` exists in root directory
- [ ] `index.html` includes `<script src="posts-loader.js"></script>`

### During Testing

- [ ] Using a local web server (not file:// protocol)
- [ ] Browser console shows no errors (F12 → Console)
- [ ] Homepage shows post count: "580 Product Reviews"
- [ ] Homepage displays blog post cards
- [ ] Click on a post card navigates to the post

### Browser Console Check

Open browser console (F12) and look for:

**Success:**
```
Successfully loaded 580 posts
```

**Error:**
```
Error loading posts: Failed to fetch
CORS policy: file:// protocol
```
→ This means you need to use a web server!

---

## 🚀 GitHub Pages Deployment

### On GitHub Pages, posts will load automatically!

Once deployed to GitHub Pages:
1. Visit: `https://your-shop-online.in`
2. Posts load via HTTPS (no issues)
3. All 580 posts should display

### Deployment Checklist

- [ ] Push code to GitHub repository
- [ ] Enable GitHub Pages in repository settings
- [ ] Set custom domain: `your-shop-online.in`
- [ ] Configure DNS A records
- [ ] Wait for DNS propagation (up to 24 hours)
- [ ] Visit site and verify posts load

---

## 🐛 Troubleshooting

### Problem: Blank homepage / No posts

**Cause:** Using file:// protocol
**Solution:** Run a web server (see above)

**Quick Test:**
```bash
python3 -m http.server 8000
```

### Problem: "Failed to fetch" error

**Cause:** CORS or network issue
**Solutions:**
1. Check if posts-config.json exists
2. Verify you're using http:// or https://
3. Check browser console for specific errors

### Problem: Some posts missing

**Cause:** posts-config.json doesn't match Post files
**Solution:**
```bash
# Check mismatch
python3 << 'EOF'
import json
from pathlib import Path

with open('posts-config.json') as f:
    config = {p['filename'] for p in json.load(f)}

files = {f.stem for f in Path('Posts').glob('*.html')}

print(f"In config: {len(config)}")
print(f"In Posts/: {len(files)}")
print(f"Missing from config: {files - config}")
EOF
```

### Problem: Post count shows wrong number

**Cause:** posts-config.json count mismatch
**Solution:** Regenerate sitemap and verify
```bash
python3 generate-sitemap.py
```

---

## 📊 Current Site Stats

- **Total Posts:** 580
- **Categories:** 89
- **Posts Config:** `/posts-config.json`
- **Posts Directory:** `/Posts/`
- **Sitemap:** `/sitemap.xml`

---

## 🔧 Manual Testing Steps

### 1. Start Server

```bash
python3 -m http.server 8000
```

### 2. Open Homepage

Visit: `http://localhost:8000`

### 3. Check Console

Press F12 → Console tab
Should see: `Successfully loaded 580 posts`

### 4. Verify Posts Display

- Homepage should show grid of blog posts
- Post count should show "580"
- Clicking a post should open it

### 5. Test Navigation

- Click on different post cards
- Verify they open the correct post
- Check social share buttons work

---

## 📝 Notes for Developers

### Adding New Posts

When adding new posts:

1. Create HTML file in `/Posts/`
2. Add entry to `posts-config.json`
3. Run: `python3 generate-sitemap.py`
4. Test locally with web server
5. Commit and push to GitHub

### Modifying Posts Loader

The `posts-loader.js` file handles:
- Fetching posts-config.json
- Generating blog card HTML
- Updating post count
- Error handling

Edit this file to change post display.

### Debugging

Add this to your browser console:

```javascript
// Check if posts loaded
fetch('/posts-config.json')
  .then(r => r.json())
  .then(posts => console.log(`Found ${posts.length} posts`, posts[0]))
  .catch(e => console.error('Error:', e));

// Check if elements exist
console.log('Blog grid:', document.querySelector('.blog-grid'));
console.log('Post count:', document.querySelector('#post-count'));
```

---

## ✅ Success Indicators

When everything works correctly, you should see:

1. ✅ Homepage loads without errors
2. ✅ "580 Product Reviews" displayed
3. ✅ Grid of blog post cards visible
4. ✅ Post cards have images, titles, descriptions
5. ✅ Clicking a card opens the full post
6. ✅ Console shows: "Successfully loaded 580 posts"
7. ✅ No errors in browser console
8. ✅ Social share buttons present on each card

---

## 🆘 Still Having Issues?

1. Use the diagnostic tool: `test-posts-loading.html`
2. Check browser console for errors
3. Verify all files exist and are in correct locations
4. Ensure using a web server (not file://)
5. Try a different browser
6. Clear browser cache and reload

---

**Last Updated:** January 3, 2026
**Repository:** your-shop-online.in
**Total Posts:** 580
**Post Loader:** posts-loader.js
