# Posts Config Enhanced Schema Documentation

## Overview

This document describes the enhanced schema for `posts-config.json`, which extends the original basic structure with additional fields for better content management, SEO, and user experience.

## Field Reference

### Core Fields (Original)

These fields were in the original schema and are **required** for all posts:

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `filename` | string | ✅ Yes | URL-safe identifier matching the HTML filename (without .html) | `"nikon-z9-flagship-camera-2025"` |
| `title` | string | ✅ Yes | SEO-optimized post title | `"Nikon Z9 Professional Mirrorless Camera Review 2025"` |
| `category` | string | ✅ Yes | Primary product category | `"Professional Cameras"` |
| `date` | string | ✅ Yes | Publication date in "Mon DD, YYYY" format | `"Jan 18, 2025"` |
| `read_time` | string | ✅ Yes | Estimated reading duration | `"21 min"` |
| `icon` | string | ✅ Yes | FontAwesome icon class name (without fa- prefix) | `"camera"` |
| `description` | string | ✅ Yes | 1-2 sentence summary for preview/SEO (150-160 chars ideal) | `"Nikon's flagship mirrorless camera with..."` |

---

### Enhanced Fields (New)

These fields are **optional** but recommended for improved functionality:

#### Content Management Fields

| Field | Type | Required | Description | Example | Default |
|-------|------|----------|-------------|---------|---------|
| `featured` | boolean | ⬜ No | Pin to featured section on homepage | `true` | `false` |
| `trending` | boolean | ⬜ No | Show trending badge | `true` | `false` |
| `author` | string | ⬜ No | Content author/team | `"Editorial Team"` | `"Editorial Team"` |
| `updated_date` | string | ⬜ No | Last update date (same format as date) | `"Jan 19, 2025"` | Same as `date` |
| `tags` | array[string] | ⬜ No | SEO tags and keywords | `["camera", "mirrorless", "nikon"]` | `[]` |
| `views` | number | ⬜ No | View counter (can be tracked dynamically) | `2847` | `0` |
| `content_type` | string | ⬜ No | Type of content | `"product-review"` | `"product-review"` |
| `update_frequency` | string | ⬜ No | How often to update this content | `"monthly"` | `"quarterly"` |

**Content Type Values:**
- `"product-review"` - Single product review
- `"buyers-guide"` - Top 10/Best of lists
- `"comparison"` - Head-to-head comparisons
- `"how-to-guide"` - Educational/tutorial content

**Update Frequency Values:**
- `"daily"` - For deals/time-sensitive content
- `"weekly"` - For trending products
- `"monthly"` - For popular products
- `"quarterly"` - For evergreen content
- `"annually"` - For one-time content

#### Product Information Fields

| Field | Type | Required | Description | Example | Default |
|-------|------|----------|-------------|---------|---------|
| `product_rating` | number | ⬜ No | Your rating (0-5, allows decimals) | `4.8` | `null` |
| `amazon_price` | string | ⬜ No | Current Amazon price (with $ symbol) | `"$5,496.95"` | `null` |
| `amazon_asin` | string | ⬜ No | Amazon Standard Identification Number | `"B09JZT6YK5"` | `null` |
| `price_range` | string | ⬜ No | Price tier indicator | `"$$$$"` | `null` |
| `best_for` | string | ⬜ No | Target audience one-liner | `"Professional photographers"` | `null` |
| `in_stock` | boolean | ⬜ No | Product availability status | `true` | `null` |
| `warranty_info` | string | ⬜ No | Warranty details | `"1-year manufacturer warranty"` | `null` |
| `last_price_check` | string | ⬜ No | Last time price was verified | `"Jan 19, 2025"` | `null` |

**Price Range Values:**
- `"$"` - Under $50
- `"$$"` - $50-$200
- `"$$$"` - $200-$1,000
- `"$$$$"` - $1,000+
- `"$$-$$$"` - Range for buying guides with multiple price points

#### Pros & Cons

| Field | Type | Required | Description | Example | Default |
|-------|------|----------|-------------|---------|---------|
| `pros` | array[string] | ⬜ No | List of product advantages | `["Excellent image quality", "Fast autofocus"]` | `null` |
| `cons` | array[string] | ⬜ No | List of product disadvantages | `["Expensive", "Heavy"]` | `null` |

**Note:** For product reviews, include 4-6 pros and 2-4 cons. For buying guides and how-to content, set to `null`.

#### Relationships & Links

| Field | Type | Required | Description | Example | Default |
|-------|------|----------|-------------|---------|---------|
| `related_posts` | array[string] | ⬜ No | Filenames of related posts (3-5 recommended) | `["sony-a1-camera-2025", "canon-r5-camera-2025"]` | `[]` |
| `comparison_links` | array[string] | ⬜ No | Filenames of comparison pages featuring this product | `["nikon-z9-vs-sony-a1"]` | `[]` |
| `affiliate_link` | string | ⬜ No | Full Amazon affiliate URL | `"https://amazon.com/dp/B09JZT6YK5?tag=yourshop-20"` | `null` |

#### Media & Assets

| Field | Type | Required | Description | Example | Default |
|-------|------|----------|-------------|---------|---------|
| `image` | string | ⬜ No | Featured image path (relative to root) | `"/assets/images/posts/nikon-z9.jpg"` | `null` |

**Image Recommendations:**
- Format: WebP preferred, JPG acceptable
- Dimensions: 1200x630px (Open Graph standard)
- File size: <200KB
- Alt text: Include in HTML, not config

#### Schema.org Integration

| Field | Type | Required | Description | Example | Default |
|-------|------|----------|-------------|---------|---------|
| `schema_type` | string | ⬜ No | Schema.org structured data type | `"Review"` | `"Review"` |

**Schema Type Values:**
- `"Review"` - For product reviews (includes rating, author, item reviewed)
- `"ItemList"` - For buying guides/top 10 lists
- `"HowTo"` - For how-to guides and tutorials
- `"Article"` - For comparisons and general articles

---

## Usage Guidelines

### Required vs Optional Fields

**All posts MUST have these fields:**
```json
{
  "filename": "required",
  "title": "required",
  "category": "required",
  "date": "required",
  "read_time": "required",
  "icon": "required",
  "description": "required"
}
```

**Product reviews SHOULD also include:**
```json
{
  "product_rating": 4.5,
  "amazon_price": "$99.99",
  "amazon_asin": "B0ABC123",
  "price_range": "$$",
  "best_for": "target audience",
  "pros": ["pro 1", "pro 2"],
  "cons": ["con 1", "con 2"],
  "affiliate_link": "amazon url",
  "image": "/assets/images/posts/filename.jpg",
  "tags": ["keyword1", "keyword2"],
  "related_posts": ["related-post-1", "related-post-2"]
}
```

**Buying guides SHOULD include:**
```json
{
  "featured": true,
  "content_type": "buyers-guide",
  "schema_type": "ItemList",
  "tags": ["buyers-guide", "category"],
  "related_posts": ["individual product reviews"],
  "image": "/assets/images/guides/filename.jpg"
}
```

**Comparison posts SHOULD include:**
```json
{
  "content_type": "comparison",
  "schema_type": "Article",
  "tags": ["comparison", "vs", "brand1", "brand2"],
  "related_posts": ["product-a-review", "product-b-review"],
  "image": "/assets/images/comparisons/filename.jpg"
}
```

**How-to guides SHOULD include:**
```json
{
  "content_type": "how-to-guide",
  "schema_type": "HowTo",
  "tags": ["how-to", "guide", "tutorial"],
  "related_posts": ["related buyers guides"],
  "image": "/assets/images/guides/filename.jpg"
}
```

---

## Migration Strategy

### Phase 1: Backward Compatible (Current)
- All original fields remain required
- All new fields are optional
- Existing posts work without modifications
- New posts can use enhanced fields

### Phase 2: Gradual Enhancement (Recommended)
1. Add enhanced fields to top 20 most-viewed posts first
2. Add enhanced fields to all new posts going forward
3. Gradually backfill enhanced fields for remaining posts
4. Priority order:
   - Featured posts
   - Trending posts
   - Recent posts (last 30 days)
   - Evergreen content
   - Archive content

### Phase 3: Full Enhancement (Future)
- All posts have complete enhanced fields
- Build features that depend on enhanced data
- Enable advanced filtering and sorting
- Implement automated updates

---

## Data Validation Rules

### String Fields
- **filename**: Lowercase, hyphens only, no spaces, alphanumeric
- **title**: 50-70 characters (SEO optimal)
- **description**: 150-160 characters (SEO meta description optimal)
- **date**: "Mon DD, YYYY" format (e.g., "Jan 18, 2025")
- **read_time**: Number + " min" format (e.g., "21 min")
- **amazon_price**: Start with "$", include commas for thousands
- **tags**: Lowercase, hyphens for multi-word, no special characters

### Number Fields
- **product_rating**: 0.0 to 5.0, one decimal place
- **views**: Positive integer

### Array Fields
- **tags**: 5-10 items recommended
- **related_posts**: 3-5 items recommended
- **pros**: 4-6 items for product reviews
- **cons**: 2-4 items for product reviews

### Boolean Fields
- **featured**: True for top 5-10 posts only
- **trending**: True for posts with >1000 views in last 7 days
- **in_stock**: True if available on Amazon

---

## Example: Complete Enhanced Post

```json
{
  "filename": "nikon-z9-flagship-camera-2025",
  "title": "Nikon Z9 Professional Mirrorless Camera Review 2025",
  "category": "Professional Cameras",
  "date": "Jan 18, 2025",
  "read_time": "21 min",
  "icon": "camera",
  "description": "Nikon's flagship mirrorless camera with 45.7MP stacked sensor, 20fps shooting, revolutionary autofocus, and professional 8K video.",

  "featured": true,
  "trending": false,
  "price_range": "$$$$",
  "author": "Editorial Team",
  "updated_date": "Jan 19, 2025",
  "tags": ["camera", "mirrorless", "professional", "photography", "8k-video", "nikon"],
  "product_rating": 4.8,
  "amazon_price": "$5,496.95",
  "amazon_asin": "B09JZT6YK5",
  "image": "/assets/images/posts/nikon-z9-flagship-camera-2025.jpg",
  "views": 2847,
  "related_posts": [
    "sony-a1-professional-camera-2025",
    "canon-r5-mark-ii-camera-2025",
    "fujifilm-gfx-100s-ii-medium-format-2025"
  ],
  "best_for": "Professional photographers and videographers",
  "pros": [
    "Exceptional 45.7MP image quality",
    "Revolutionary autofocus system",
    "20fps continuous shooting",
    "Professional 8K video capabilities",
    "Robust weather-sealed build"
  ],
  "cons": [
    "Very expensive",
    "Heavy and bulky",
    "Steep learning curve for beginners"
  ],
  "affiliate_link": "https://amazon.com/dp/B09JZT6YK5?tag=yourshop-20",
  "last_price_check": "Jan 19, 2025",
  "in_stock": true,
  "warranty_info": "1-year manufacturer warranty",
  "update_frequency": "monthly",
  "content_type": "product-review",
  "schema_type": "Review",
  "comparison_links": [
    "nikon-z9-vs-sony-a1",
    "nikon-z9-vs-canon-r5"
  ]
}
```

---

## Benefits of Enhanced Schema

### For Users
- ✅ Better filtering by price, rating, content type
- ✅ "Featured" and "Trending" badges for discovery
- ✅ Pros/cons visible in post cards
- ✅ Related posts for easier navigation
- ✅ Price and availability info upfront

### For SEO
- ✅ Rich snippets with ratings in search results
- ✅ Better keyword targeting with tags
- ✅ Proper Schema.org structured data
- ✅ Updated dates show freshness

### For Content Management
- ✅ Track which posts need updates
- ✅ Identify best-performing content
- ✅ Manage featured/trending programmatically
- ✅ Build automated update workflows
- ✅ Generate reports on content portfolio

### For Development
- ✅ Single source of truth for post metadata
- ✅ Easy to add new features (filtering, sorting, etc.)
- ✅ Backward compatible with existing code
- ✅ JSON structure is easy to validate and transform

---

## FAQ

### Q: Do I need to update all existing posts right away?
**A:** No. The schema is backward compatible. You can add enhanced fields gradually, starting with your most important posts.

### Q: What happens if I don't include an optional field?
**A:** The system will use the default value (usually `null` or `false`). Features that depend on that field simply won't display for that post.

### Q: Can I add custom fields not in this schema?
**A:** Yes, but they won't be processed by the built-in features. If you need custom fields, consider contributing them to this schema documentation.

### Q: How do I validate my posts-config.json?
**A:** Use a JSON validator and check against this schema. We'll provide a validation script in the future.

### Q: Should product prices be updated manually?
**A:** For now, yes. In the future, we can build automated price checking using Amazon Product Advertising API.

---

## Version History

- **v2.0** (Jan 2025) - Enhanced schema with 20+ new fields
- **v1.0** (Original) - Basic 7-field schema

---

## Support

For questions about this schema, please:
1. Check this documentation first
2. Review the sample file: `posts-config-enhanced-sample.json`
3. Look at the templates in `/templates/` directory
4. Open an issue in the repository
