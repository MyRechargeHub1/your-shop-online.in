# GitHub Pages Setup Guide for your-shop-online.in

## ✅ What's Already Done (Code Side)

- ✅ All HTML files have subdomain redirect scripts
- ✅ CNAME file is configured with `your-shop-online.in`
- ✅ _config.yml is set up for GitHub Pages
- ✅ Custom 404 page is created
- ✅ All 13 pages have inline redirect scripts in `<head>` section
- ✅ All code is committed and pushed to GitHub

## 🔧 What You Need to Do Now

### Step 1: Enable GitHub Pages in Repository Settings

1. Go to your repository: `https://github.com/MyRechargeHub1/your-shop-online.in`
2. Click on **Settings** (top menu)
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select:
   - Branch: `claude/setup-github-pages-shop-013dzQCHH25zXTnXKRHtUx8a`
   - Folder: `/ (root)`
5. Click **Save**
6. Under **Custom domain**, enter: `your-shop-online.in`
7. Click **Save** again
8. Wait 1-2 minutes for the DNS check to complete
9. Once DNS check passes, enable **Enforce HTTPS** (checkbox will appear)

### Step 2: Configure DNS Records at Your Domain Registrar

You need to configure DNS records where you purchased `your-shop-online.in` (e.g., GoDaddy, Namecheap, Google Domains, etc.)

#### For Apex Domain (your-shop-online.in):

Add **4 A Records** pointing to GitHub Pages:

| Type | Name/Host | Value/Points To | TTL |
|------|-----------|-----------------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |

#### Important DNS Notes:

- **Remove any existing A records** for `@` or `your-shop-online.in`
- **Do NOT add** CNAME records for the apex domain (it won't work with A records)
- DNS propagation can take **24-48 hours** (usually much faster)
- You can check DNS propagation at: https://dnschecker.org/

### Step 3: Test the Setup

After completing Steps 1 & 2, wait 5-10 minutes, then test:

#### Test 1: Main Domain
```
https://your-shop-online.in
```
Should load your website.

#### Test 2: GitHub Pages Default URL
```
https://myrechargehub1.github.io/your-shop-online.in/
```
Should redirect to `https://your-shop-online.in/` (GitHub Pages default redirect + your script)

#### Test 3: Subdomain Redirects
Once the main domain works, test these URLs - they should ALL redirect to `https://your-shop-online.in/`:

```
https://www.your-shop-online.in/
https://shopping.your-shop-online.in/
https://de.your-shop-online.in/
https://fr.your-shop-online.in/
https://au.your-shop-online.in/
https://ca.your-shop-online.in/
```

**Note:** These will ONLY work AFTER you set up wildcard DNS (Step 4).

### Step 4: Configure Wildcard Subdomain (Optional but Recommended)

To handle ALL subdomains (www, de, fr, shopping, etc.), add a wildcard CNAME:

| Type | Name/Host | Value/Points To | TTL |
|------|-----------|-----------------|-----|
| CNAME | * | your-shop-online.in | 3600 |

**Important:** Some registrars don't allow wildcard CNAME with A records. If you get an error:
- Use your registrar's forwarding/redirect feature instead
- Or manually add CNAME records for specific subdomains you want to support:

```
CNAME  www       your-shop-online.in
CNAME  shopping  your-shop-online.in
CNAME  de        your-shop-online.in
CNAME  fr        your-shop-online.in
CNAME  au        your-shop-online.in
CNAME  ca        your-shop-online.in
```

## 🔍 Troubleshooting

### Problem: "DNS check failed" in GitHub Pages Settings

**Solution:**
- Make sure you added all 4 A records correctly
- Wait 10-15 minutes and try again
- Check DNS propagation: https://dnschecker.org/
- Make sure you didn't add a CNAME for the apex domain

### Problem: "Site not loading" or "404 Not Found"

**Solution:**
- Verify GitHub Pages is enabled in Settings → Pages
- Verify you selected the correct branch: `claude/setup-github-pages-shop-013dzQCHH25zXTnXKRHtUx8a`
- Wait 5-10 minutes after saving settings
- Try accessing via GitHub Pages URL first: `https://myrechargehub1.github.io/your-shop-online.in/`
- Clear your browser cache (Ctrl+Shift+Delete)

### Problem: "Subdomain redirects not working"

**Causes:**
1. **Main domain not working yet** - Redirects only work after main site is live
2. **Wildcard DNS not configured** - Subdomains need DNS records to reach GitHub Pages first
3. **Browser caching** - Clear cache or try incognito mode
4. **DNS not propagated yet** - Wait 24-48 hours

**Solution:**
- First, make sure `https://your-shop-online.in/` works
- Then, configure wildcard CNAME or individual subdomain CNAMEs
- Test in incognito mode to avoid cache issues
- Use this to check DNS: `nslookup www.your-shop-online.in`

### Problem: "Certificate errors" or "Not Secure"

**Solution:**
- Enable "Enforce HTTPS" in GitHub Pages Settings
- Wait 10-15 minutes for certificate provisioning
- GitHub Pages uses Let's Encrypt for free SSL certificates

## 📋 DNS Configuration Checklist

Use this checklist at your domain registrar:

- [ ] Add A record: @ → 185.199.108.153
- [ ] Add A record: @ → 185.199.109.153
- [ ] Add A record: @ → 185.199.110.153
- [ ] Add A record: @ → 185.199.111.153
- [ ] Add CNAME: * → your-shop-online.in (wildcard for all subdomains)
- [ ] Remove any conflicting A or CNAME records
- [ ] Save changes and wait for propagation

## 🎯 GitHub Pages Configuration Checklist

- [ ] Go to repository Settings → Pages
- [ ] Set Source to branch: `claude/setup-github-pages-shop-013dzQCHH25zXTnXKRHtUx8a`
- [ ] Set Custom domain to: `your-shop-online.in`
- [ ] Wait for DNS check to pass
- [ ] Enable "Enforce HTTPS"
- [ ] Verify site loads at `https://your-shop-online.in/`

## 🚀 Expected Timeline

| Task | Time |
|------|------|
| Enable GitHub Pages | Immediate |
| Add DNS records | 5 minutes |
| DNS propagation | 10 minutes - 48 hours (usually 1-2 hours) |
| SSL certificate provisioning | 10-15 minutes after DNS works |
| Subdomain redirects working | After main domain + wildcard DNS setup |

## 🧪 Testing Commands

To check if DNS is configured correctly:

```bash
# Check apex domain
nslookup your-shop-online.in

# Check www subdomain
nslookup www.your-shop-online.in

# Check if A records point to GitHub Pages
dig your-shop-online.in +short
```

Expected output for `dig` command:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

## 📞 Need Help?

If you're stuck on any step:
1. Check which step you're on in the checklist above
2. Review the troubleshooting section
3. Most common issue: DNS records not configured correctly at registrar
4. Second most common: Waiting for DNS propagation (be patient!)

## ✨ How the Redirect Works

When someone visits a subdomain like `www.your-shop-online.in`:

1. **DNS lookup**: Browser queries DNS for www.your-shop-online.in
2. **CNAME resolution**: DNS responds with your-shop-online.in
3. **GitHub Pages serves**: GitHub Pages serves your index.html
4. **Redirect script runs**: The inline script in `<head>` immediately executes
5. **Client-side redirect**: Browser redirects to https://your-shop-online.in/

**This is why DNS must be configured first** - without DNS records, the browser can't reach GitHub Pages to load the HTML with the redirect script.

---

**Current Status:**
- ✅ Code is ready and pushed
- ⏳ Waiting for you to configure GitHub Pages Settings
- ⏳ Waiting for you to configure DNS records at registrar
