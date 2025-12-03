#!/bin/bash

# Fix Navigation for Posts Missing Navbar

POSTS=(
    "apple-watch-se.html"
    "blink-video-doorbell.html"
    "fire-tv-stick-4k.html"
    "instant-pot-duo.html"
    "jbl-flip-6.html"
    "kindle-paperwhite.html"
    "ninja-air-fryer.html"
    "ninja-foodi-smart-xl-grill.html"
    "roku-streaming-stick.html"
    "roomba-694.html"
    "sony-a7r-v-camera.html"
    "sony-wh-1000xm5.html"
)

NAVBAR='    <!-- Navigation -->
    <nav class="navbar">
        <div class="container">
            <div class="nav-wrapper">
                <div class="logo">
                    <img src="../logo.svg" alt="YourShop Logo" class="logo-img">
                    <span>YourShop</span>
                </div>
                <ul class="nav-menu">
                    <li><a href="../index.html">Home</a></li>
                    <li><a href="../about.html">About</a></li>
                    <li><a href="../contact.html">Contact</a></li>
                </ul>
                <div class="nav-icons">
                    <button class="icon-btn" id="search-btn">
                        <i class="fas fa-search"></i>
                    </button>
                    <button class="mobile-menu-btn" id="mobile-menu-btn">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </div>
        </div>
    </nav>

'

echo "🔧 Adding Navigation to Posts..."
echo ""

for post in "${POSTS[@]}"; do
    filepath="Posts/$post"

    if [ ! -f "$filepath" ]; then
        echo "⚠️  File not found: $post"
        continue
    fi

    # Check if navbar already exists
    if grep -q 'class="navbar"' "$filepath"; then
        echo "⏭️  $post (already has navbar)"
        continue
    fi

    # Create temp file with navbar inserted after <body>
    awk -v navbar="$NAVBAR" '
        /<body>/ {
            print
            print navbar
            next
        }
        { print }
    ' "$filepath" > "${filepath}.tmp"

    # Replace original file
    mv "${filepath}.tmp" "$filepath"

    echo "✅ $post"
done

echo ""
echo "===================================="
echo "✅ Navigation added successfully!"
echo "===================================="
