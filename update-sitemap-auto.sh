#!/bin/bash
#
# Automated Sitemap Update Script for YourShop Online
# This script automatically regenerates the sitemap when posts are added/modified
#
# Usage:
#   ./update-sitemap-auto.sh          # Run manually
#   git hook: Add to .git/hooks/pre-commit for automatic updates
#

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}YourShop Online - Automated Sitemap Updater${NC}"
echo -e "${BLUE}================================================${NC}"
echo

# Check if posts-config.json exists
if [ ! -f "posts-config.json" ]; then
    echo -e "${RED}✗ Error: posts-config.json not found${NC}"
    exit 1
fi

# Check if posts-config.json has been modified
POSTS_MODIFIED=false
if git diff --cached --name-only | grep -q "posts-config.json"; then
    POSTS_MODIFIED=true
    echo -e "${YELLOW}→ Detected changes in posts-config.json${NC}"
elif git diff --name-only | grep -q "posts-config.json"; then
    POSTS_MODIFIED=true
    echo -e "${YELLOW}→ Detected unstaged changes in posts-config.json${NC}"
fi

# Check if any new Posts/*.html files were added
NEW_POSTS=false
if git diff --cached --name-only | grep -q "^Posts/.*\.html$"; then
    NEW_POSTS=true
    echo -e "${YELLOW}→ Detected new post files${NC}"
fi

# Determine if sitemap needs update
if [ "$POSTS_MODIFIED" = true ] || [ "$NEW_POSTS" = true ] || [ "$1" = "--force" ]; then
    echo -e "${GREEN}→ Updating sitemap...${NC}"

    # Run Python sitemap generator
    if python3 generate-sitemap.py; then
        echo -e "${GREEN}✓ Sitemap updated successfully${NC}"

        # Stage sitemap.xml if running in git hook
        if [ -n "$GIT_INDEX_FILE" ]; then
            git add sitemap.xml
            echo -e "${GREEN}✓ Sitemap staged for commit${NC}"
        fi
    else
        echo -e "${RED}✗ Error: Sitemap generation failed${NC}"
        exit 1
    fi
else
    echo -e "${BLUE}ℹ No changes detected - sitemap up to date${NC}"
fi

echo
echo -e "${GREEN}✓ Sitemap update check completed${NC}"
echo -e "${BLUE}================================================${NC}"

exit 0
