#!/bin/bash
# Icon Generator Script for PWA
# Generates PNG icons from SVG logo

echo "🎨 PWA Icon Generator"
echo "===================="
echo ""

# Check if logo.svg exists
if [ ! -f "logo.svg" ]; then
    echo "❌ Error: logo.svg not found in current directory"
    exit 1
fi

# Check for available tools
if command -v convert &> /dev/null; then
    echo "✅ Using ImageMagick (convert)"
    TOOL="imagemagick"
elif command -v inkscape &> /dev/null; then
    echo "✅ Using Inkscape"
    TOOL="inkscape"
else
    echo "❌ No conversion tool found!"
    echo ""
    echo "Please install one of the following:"
    echo "  - ImageMagick: sudo apt-get install imagemagick"
    echo "  - Inkscape: sudo apt-get install inkscape"
    echo ""
    echo "Or use online tool: https://favicon.io/favicon-converter/"
    exit 1
fi

echo ""
echo "🔨 Generating icons..."
echo ""

# Generate icons based on available tool
if [ "$TOOL" = "imagemagick" ]; then
    # Generate 192x192
    echo "  → Creating logo-192.png (192x192)"
    convert logo.svg -resize 192x192 -background none logo-192.png

    # Generate 512x512
    echo "  → Creating logo-512.png (512x512)"
    convert logo.svg -resize 512x512 -background none logo-512.png

    # Generate maskable icon with padding
    echo "  → Creating logo-maskable.png (512x512 with safe zone)"
    convert logo.svg -resize 410x410 -background none -gravity center -extent 512x512 logo-maskable.png

elif [ "$TOOL" = "inkscape" ]; then
    # Generate 192x192
    echo "  → Creating logo-192.png (192x192)"
    inkscape logo.svg --export-filename=logo-192.png --export-width=192 --export-height=192 2>/dev/null

    # Generate 512x512
    echo "  → Creating logo-512.png (512x512)"
    inkscape logo.svg --export-filename=logo-512.png --export-width=512 --export-height=512 2>/dev/null

    # Generate maskable (with padding)
    echo "  → Creating logo-maskable.png (512x512 with safe zone)"
    inkscape logo.svg --export-filename=logo-maskable.png --export-width=410 --export-height=410 2>/dev/null
    convert logo-maskable.png -gravity center -extent 512x512 logo-maskable-temp.png 2>/dev/null
    mv logo-maskable-temp.png logo-maskable.png 2>/dev/null
fi

echo ""
echo "✅ Icons generated successfully!"
echo ""
echo "📦 Created files:"
ls -lh logo-*.png 2>/dev/null | awk '{print "  - " $9 " (" $5 ")"}'
echo ""
echo "🎯 Next steps:"
echo "  1. Test PWA installation: https://your-shop-online.in"
echo "  2. Run Lighthouse audit in Chrome DevTools"
echo "  3. Commit icons: git add logo-*.png && git commit -m 'Add PWA icons'"
echo ""
