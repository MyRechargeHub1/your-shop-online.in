#!/bin/bash
#
# Simple wrapper script to update everything automatically
# Usage: ./update-all.sh [--commit]
#
# Options:
#   --commit    Automatically commit and push changes after updating
#

set -e

echo ""
echo "🚀 YourShop Online - Automatic Update Script"
echo "============================================="
echo ""

# Run the Python automation script
python3 auto-update-posts.py

# Check if --commit flag is provided
if [ "$1" == "--commit" ]; then
    echo ""
    echo "→ Committing changes..."

    # Stage the files
    git add _data/posts-config.json sitemap.xml

    # Check if there are changes to commit
    if git diff --cached --quiet; then
        echo "✓ No changes to commit"
    else
        # Commit with auto-generated message
        git commit -m "chore: auto-update sitemap.xml [skip ci]"

        echo "✓ Changes committed"
        echo ""
        echo "→ Pushing to remote..."

        # Push to current branch
        CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
        git push -u origin "$CURRENT_BRANCH"

        echo "✓ Changes pushed to $CURRENT_BRANCH"
    fi
fi

echo ""
echo "✅ All done!"
echo ""
