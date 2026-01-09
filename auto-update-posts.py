#!/usr/bin/env python3
"""
Automated Posts Configuration Generator
Scans Posts/ directory and automatically generates posts-config.json and sitemap.xml
No manual updates needed - just run this script after adding new posts!
"""

import os
import re
import json
from datetime import datetime
from pathlib import Path
from bs4 import BeautifulSoup
import xml.etree.ElementTree as ET
from xml.dom import minidom

class PostsAutoUpdater:
    def __init__(self):
        self.posts_dir = Path('Posts')
        self.config_file = Path('_data/posts-config.json')
        self.sitemap_file = Path('sitemap.xml')
        self.base_url = 'https://your-shop-online.in'
        self.posts = []

    def extract_metadata_from_html(self, html_file):
        """Extract metadata from HTML post file"""
        try:
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
                soup = BeautifulSoup(content, 'html.parser')

            # Extract metadata
            metadata = {}

            # Get title
            title_tag = soup.find('meta', {'property': 'og:title'})
            if title_tag:
                metadata['title'] = title_tag.get('content', '')
            else:
                title_tag = soup.find('title')
                metadata['title'] = title_tag.text if title_tag else html_file.stem

            # Get description
            desc_tag = soup.find('meta', {'name': 'description'})
            if desc_tag:
                metadata['description'] = desc_tag.get('content', '')
            else:
                metadata['description'] = ''

            # Check if it's a book by looking at structured data
            is_book = False
            script_tags = soup.find_all('script', {'type': 'application/ld+json'})
            for script in script_tags:
                if script.string and '"@type": "Book"' in script.string:
                    is_book = True
                    break

            # Get category from meta or infer from content
            category_tag = soup.find('meta', {'name': 'article:section'})
            if category_tag:
                metadata['category'] = category_tag.get('content', 'Products')
            else:
                # Determine category based on structured data or title
                if is_book or 'book' in metadata['title'].lower():
                    metadata['category'] = 'The Best-Selling Books'
                elif 'gaming' in metadata['title'].lower():
                    metadata['category'] = 'Gaming'
                elif any(word in metadata['title'].lower() for word in ['vacuum', 'kitchen', 'cooking', 'household', 'home']):
                    metadata['category'] = 'Everyday Household Products'
                else:
                    metadata['category'] = 'Products'

            # Get file modification time for date
            mod_time = datetime.fromtimestamp(html_file.stat().st_mtime)
            metadata['date'] = mod_time.strftime('%B %d, %Y')

            # Estimate read time based on content length
            text_content = soup.get_text()
            word_count = len(text_content.split())
            read_time = max(1, word_count // 200)  # Average reading speed
            metadata['read_time'] = f"{read_time} min"

            # Determine icon based on category
            if 'book' in metadata['category'].lower():
                metadata['icon'] = 'book'
            elif 'gaming' in metadata['category'].lower():
                metadata['icon'] = 'shopping-cart'
            else:
                metadata['icon'] = 'star'

            return metadata

        except Exception as e:
            print(f"  ⚠ Warning: Could not extract metadata from {html_file.name}: {e}")
            return None

    def scan_posts_directory(self):
        """Scan Posts/ directory and extract all post metadata"""
        print(f"→ Scanning {self.posts_dir}/ directory...")

        if not self.posts_dir.exists():
            print(f"✗ Error: {self.posts_dir}/ directory not found")
            return False

        html_files = sorted(self.posts_dir.glob('*.html'),
                           key=lambda x: x.stat().st_mtime,
                           reverse=True)  # Newest first

        print(f"  Found {len(html_files)} HTML files")

        posts_list = []

        for html_file in html_files:
            filename = html_file.stem  # Filename without extension

            # Extract metadata
            metadata = self.extract_metadata_from_html(html_file)

            if metadata:
                post_entry = {
                    'filename': filename,
                    'title': metadata['title'],
                    'category': metadata['category'],
                    'date': metadata['date'],
                    'read_time': metadata['read_time'],
                    'icon': metadata['icon'],
                    'description': metadata['description']
                }
                posts_list.append(post_entry)

        self.posts = posts_list
        print(f"✓ Extracted metadata from {len(self.posts)} posts")
        return True

    def generate_posts_config(self):
        """Generate posts-config.json from scanned posts"""
        print(f"\n→ Generating {self.config_file}...")

        try:
            # Ensure _data directory exists
            self.config_file.parent.mkdir(parents=True, exist_ok=True)

            # Write posts config
            with open(self.config_file, 'w', encoding='utf-8') as f:
                json.dump(self.posts, f, indent=4, ensure_ascii=False)

            print(f"✓ Generated {self.config_file}")
            print(f"  Total posts: {len(self.posts)}")

            # Count by category
            categories = {}
            for post in self.posts:
                cat = post['category']
                categories[cat] = categories.get(cat, 0) + 1

            print(f"  Categories:")
            for cat, count in sorted(categories.items()):
                print(f"    - {cat}: {count}")

            return True

        except Exception as e:
            print(f"✗ Error generating posts-config.json: {e}")
            return False

    def generate_sitemap(self):
        """Generate sitemap.xml from posts"""
        print(f"\n→ Generating {self.sitemap_file}...")

        try:
            # Create root element
            urlset = ET.Element('urlset')
            urlset.set('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')

            # Add homepage
            homepage = ET.SubElement(urlset, 'url')
            ET.SubElement(homepage, 'loc').text = f"{self.base_url}/"
            ET.SubElement(homepage, 'lastmod').text = datetime.now().strftime("%Y-%m-%d")
            ET.SubElement(homepage, 'changefreq').text = 'daily'
            ET.SubElement(homepage, 'priority').text = '1.0'

            # Add all posts
            for post in self.posts:
                url = ET.SubElement(urlset, 'url')
                ET.SubElement(url, 'loc').text = f"{self.base_url}/Posts/{post['filename']}.html"

                # Parse date
                try:
                    date_obj = datetime.strptime(post['date'], "%B %d, %Y")
                    lastmod = date_obj.strftime("%Y-%m-%d")
                except:
                    lastmod = datetime.now().strftime("%Y-%m-%d")

                ET.SubElement(url, 'lastmod').text = lastmod
                ET.SubElement(url, 'changefreq').text = 'monthly'
                ET.SubElement(url, 'priority').text = '0.9'

            # Pretty print XML
            xml_string = ET.tostring(urlset, encoding='unicode')
            dom = minidom.parseString(xml_string)
            pretty_xml = dom.toprettyxml(indent='    ')

            # Remove extra blank lines
            pretty_xml = '\n'.join([line for line in pretty_xml.split('\n') if line.strip()])

            # Write to file
            with open(self.sitemap_file, 'w', encoding='utf-8') as f:
                f.write(pretty_xml)

            print(f"✓ Generated {self.sitemap_file}")
            print(f"  Total URLs: {len(self.posts) + 1}")

            return True

        except Exception as e:
            print(f"✗ Error generating sitemap.xml: {e}")
            return False

    def run(self):
        """Main execution flow"""
        print("=" * 70)
        print("🚀 YourShop Online - Automated Posts & Sitemap Generator")
        print("=" * 70)
        print()
        print("This script automatically:")
        print("  1. Scans Posts/ directory for HTML files")
        print("  2. Extracts metadata from each post")
        print("  3. Generates posts-config.json (newest posts first)")
        print("  4. Generates sitemap.xml")
        print()
        print("No manual updates needed! ✨")
        print()

        # Scan posts directory
        if not self.scan_posts_directory():
            return False

        # Generate posts config
        if not self.generate_posts_config():
            return False

        # Generate sitemap
        if not self.generate_sitemap():
            return False

        print()
        print("=" * 70)
        print("✓ All files generated successfully!")
        print("=" * 70)
        print()
        print("Next steps:")
        print("  1. Review the generated files")
        print("  2. Commit: git add _data/posts-config.json sitemap.xml")
        print("  3. Push: git commit -m 'Auto-update posts and sitemap'")
        print()

        return True

def main():
    """Main entry point"""
    updater = PostsAutoUpdater()
    success = updater.run()
    return 0 if success else 1

if __name__ == '__main__':
    import sys
    # Check if BeautifulSoup is available
    try:
        from bs4 import BeautifulSoup
    except ImportError:
        print("✗ Error: BeautifulSoup4 not installed")
        print("Install it with: pip install beautifulsoup4")
        sys.exit(1)

    sys.exit(main())
