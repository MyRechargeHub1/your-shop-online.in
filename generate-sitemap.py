#!/usr/bin/env python3
"""
Automated Sitemap Generator for YourShop Online
Generates sitemap.xml from posts-config.json with validation and error handling
"""

import json
import os
from datetime import datetime
from pathlib import Path
import xml.etree.ElementTree as ET
from xml.dom import minidom

class SitemapGenerator:
    def __init__(self, config_file='_config.yml', posts_file='posts-config.json', output_file='sitemap.xml'):
        self.config_file = config_file
        self.posts_file = posts_file
        self.output_file = output_file
        self.base_url = 'https://your-shop-online.in'
        self.posts = []
        self.config = {}

    def load_config(self):
        """Load Jekyll configuration (simplified YAML parsing for this use case)"""
        try:
            if os.path.exists(self.config_file):
                with open(self.config_file, 'r') as f:
                    for line in f:
                        if line.startswith('url:'):
                            self.base_url = line.split(':', 1)[1].strip().strip('"').strip("'")
                print(f"✓ Loaded config from {self.config_file}")
                print(f"  Base URL: {self.base_url}")
        except Exception as e:
            print(f"⚠ Warning: Could not load config file: {e}")
            print(f"  Using default base URL: {self.base_url}")

    def load_posts(self):
        """Load posts from posts-config.json"""
        try:
            with open(self.posts_file, 'r') as f:
                self.posts = json.load(f)
            print(f"✓ Loaded {len(self.posts)} posts from {self.posts_file}")
            return True
        except FileNotFoundError:
            print(f"✗ Error: {self.posts_file} not found")
            return False
        except json.JSONDecodeError as e:
            print(f"✗ Error: Invalid JSON in {self.posts_file}: {e}")
            return False

    def parse_date(self, date_string):
        """Parse date string to ISO format for sitemap"""
        try:
            if ',' in date_string:
                # Format: "December 26, 2025"
                date_obj = datetime.strptime(date_string, "%B %d, %Y")
                return date_obj.strftime("%Y-%m-%d")
            else:
                # Assume already in correct format or default
                return "2025-12-26"
        except:
            return datetime.now().strftime("%Y-%m-%d")

    def validate_post_file(self, filename):
        """Check if post HTML file exists"""
        post_path = Path('Posts') / f"{filename}.html"
        return post_path.exists()

    def generate_sitemap(self):
        """Generate sitemap.xml"""
        # Create root element
        urlset = ET.Element('urlset')
        urlset.set('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')

        # Add homepage
        homepage = ET.SubElement(urlset, 'url')
        ET.SubElement(homepage, 'loc').text = f"{self.base_url}/"
        ET.SubElement(homepage, 'lastmod').text = datetime.now().strftime("%Y-%m-%d")
        ET.SubElement(homepage, 'changefreq').text = 'daily'
        ET.SubElement(homepage, 'priority').text = '1.0'

        # Add static pages
        static_pages = ['about.html', 'contact.html']
        for page in static_pages:
            if os.path.exists(page):
                url = ET.SubElement(urlset, 'url')
                ET.SubElement(url, 'loc').text = f"{self.base_url}/{page}"
                ET.SubElement(url, 'lastmod').text = datetime.now().strftime("%Y-%m-%d")
                ET.SubElement(url, 'changefreq').text = 'monthly'
                ET.SubElement(url, 'priority').text = '0.8'

        # Add posts
        valid_posts = 0
        invalid_posts = 0

        for post in self.posts:
            filename = post.get('filename', '')
            if not filename:
                invalid_posts += 1
                continue

            # Validate post file exists
            if not self.validate_post_file(filename):
                print(f"  ⚠ Warning: Post file not found: Posts/{filename}.html")
                invalid_posts += 1
                continue

            # Create URL entry
            url = ET.SubElement(urlset, 'url')
            ET.SubElement(url, 'loc').text = f"{self.base_url}/Posts/{filename}.html"

            # Parse and add lastmod date
            date_string = post.get('date', datetime.now().strftime("%B %d, %Y"))
            lastmod = self.parse_date(date_string)
            ET.SubElement(url, 'lastmod').text = lastmod

            # Add changefreq and priority
            ET.SubElement(url, 'changefreq').text = 'monthly'
            ET.SubElement(url, 'priority').text = '0.9'

            valid_posts += 1

        # Pretty print XML
        xml_string = ET.tostring(urlset, encoding='unicode')
        dom = minidom.parseString(xml_string)
        pretty_xml = dom.toprettyxml(indent='    ')

        # Remove extra blank lines
        pretty_xml = '\n'.join([line for line in pretty_xml.split('\n') if line.strip()])

        # Write to file
        with open(self.output_file, 'w', encoding='utf-8') as f:
            f.write(pretty_xml)

        print(f"\n✓ Sitemap generated successfully: {self.output_file}")
        print(f"  Total URLs: {valid_posts + 1 + len(static_pages)}")
        print(f"  Homepage: 1")
        print(f"  Static pages: {len(static_pages)}")
        print(f"  Blog posts: {valid_posts}")
        if invalid_posts > 0:
            print(f"  ⚠ Skipped (missing files): {invalid_posts}")

        return True

    def run(self):
        """Main execution flow"""
        print("=" * 60)
        print("YourShop Online - Automated Sitemap Generator")
        print("=" * 60)
        print()

        # Load configuration
        self.load_config()

        # Load posts
        if not self.load_posts():
            return False

        # Generate sitemap
        if not self.generate_sitemap():
            return False

        print("\n✓ Sitemap generation completed successfully!")
        print("=" * 60)
        return True

def main():
    """Main entry point"""
    generator = SitemapGenerator()
    success = generator.run()
    return 0 if success else 1

if __name__ == '__main__':
    exit(main())
