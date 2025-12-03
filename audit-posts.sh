#!/bin/bash

# Post Audit Script - Check US Targeting and SEO Optimization

echo "==================================="
echo "Post Audit: US Targeting & SEO"
echo "==================================="
echo ""

total_posts=$(find Posts -name "*.html" -type f | wc -l)
echo "Total Posts: $total_posts"
echo ""

echo "--- US Geographic Targeting ---"
geo_region=$(grep -l "geo.region.*US" Posts/*.html | wc -l)
geo_position=$(grep -l "geo.position" Posts/*.html | wc -l)
content_lang=$(grep -l "content-language.*en-US" Posts/*.html | wc -l)
hreflang=$(grep -l "hreflang.*en-us" Posts/*.html | wc -l)

echo "✓ geo.region US: $geo_region / $total_posts"
echo "✓ geo.position: $geo_position / $total_posts"
echo "✓ content-language en-US: $content_lang / $total_posts"
echo "✓ hreflang en-us: $hreflang / $total_posts"
echo ""

echo "--- SEO Meta Tags ---"
og_tags=$(grep -l "og:locale.*en_US" Posts/*.html | wc -l)
twitter_card=$(grep -l "twitter:card" Posts/*.html | wc -l)
canonical=$(grep -l "rel=\"canonical\"" Posts/*.html | wc -l)
structured_data=$(grep -l "application/ld\+json" Posts/*.html | wc -l)

echo "✓ Open Graph (og:locale en_US): $og_tags / $total_posts"
echo "✓ Twitter Card: $twitter_card / $total_posts"
echo "✓ Canonical URL: $canonical / $total_posts"
echo "✓ Structured Data (Schema.org): $structured_data / $total_posts"
echo ""

echo "--- Amazon Integration ---"
amazon_links=$(grep -l "tag=topgaming2303-20" Posts/*.html | wc -l)
amazon_images=$(grep -l "m.media-amazon.com" Posts/*.html | wc -l)

echo "✓ Amazon Affiliate Links: $amazon_links / $total_posts"
echo "✓ Amazon Product Images: $amazon_images / $total_posts"
echo ""

echo "--- Site Features ---"
search_modal=$(grep -l "search-modal" Posts/*.html | wc -l)
footer=$(grep -l "<footer" Posts/*.html | wc -l)
nav=$(grep -l "navbar" Posts/*.html | wc -l)

echo "✓ Search Modal: $search_modal / $total_posts"
echo "✓ Footer: $footer / $total_posts"
echo "✓ Navigation: $nav / $total_posts"
echo ""

echo "--- Content Analysis ---"
echo "Posts by line count:"
echo "  < 100 lines: $(wc -l Posts/*.html | awk '$1 < 100 {count++} END {print count+0}')"
echo "  100-200 lines: $(wc -l Posts/*.html | awk '$1 >= 100 && $1 < 200 {count++} END {print count+0}')"
echo "  200-300 lines: $(wc -l Posts/*.html | awk '$1 >= 200 && $1 < 300 {count++} END {print count+0}')"
echo "  300-400 lines: $(wc -l Posts/*.html | awk '$1 >= 300 && $1 < 400 {count++} END {print count+0}')"
echo "  400+ lines: $(wc -l Posts/*.html | awk '$1 >= 400 {count++} END {print count+0}')"
echo ""

echo "==================================="
echo "Posts Needing Updates:"
echo "==================================="
echo ""

echo "Missing US Geo Targeting:"
for file in Posts/*.html; do
    grep -q "geo.region.*US" "$file" || echo "  - $(basename $file)"
done

echo ""
echo "Missing en-US Language Tag:"
for file in Posts/*.html; do
    grep -q "content-language.*en-US" "$file" || echo "  - $(basename $file)"
done

echo ""
echo "Missing Hreflang:"
for file in Posts/*.html; do
    grep -q "hreflang.*en-us" "$file" || echo "  - $(basename $file)"
done

echo ""
echo "Missing Search Modal:"
for file in Posts/*.html; do
    grep -q "search-modal" "$file" || echo "  - $(basename $file)"
done

echo ""
echo "Posts Under 250 Lines (Need Expansion):"
wc -l Posts/*.html | awk '$1 < 250 {print "  -", $2, "(" $1, "lines)"}'

echo ""
echo "==================================="
