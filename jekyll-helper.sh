#!/bin/bash
#
# Jekyll Helper Script for YourShop Online
# Provides easy commands for Jekyll site management
#
# Usage:
#   ./jekyll-helper.sh setup      # Install dependencies
#   ./jekyll-helper.sh build      # Build the site
#   ./jekyll-helper.sh serve      # Serve locally
#   ./jekyll-helper.sh sitemap    # Generate sitemap
#   ./jekyll-helper.sh validate   # Validate sitemap
#   ./jekyll-helper.sh deploy     # Build and deploy
#

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Functions
print_header() {
    echo -e "${BLUE}================================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}================================================${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "${CYAN}→ $1${NC}"
}

# Setup function
setup() {
    print_header "Jekyll Setup"

    # Check if Ruby is installed
    if ! command -v ruby &> /dev/null; then
        print_error "Ruby is not installed. Please install Ruby first."
        exit 1
    fi

    print_info "Ruby version: $(ruby -v)"

    # Check if Bundler is installed
    if ! command -v bundle &> /dev/null; then
        print_info "Installing Bundler..."
        gem install bundler
    fi

    print_info "Bundler version: $(bundle -v)"

    # Install dependencies
    print_info "Installing Jekyll and dependencies..."
    if [ -f "Gemfile" ]; then
        bundle install
        print_success "Dependencies installed successfully"
    else
        print_error "Gemfile not found"
        exit 1
    fi

    print_success "Jekyll setup completed"
}

# Build function
build() {
    print_header "Building Jekyll Site"

    # Generate sitemap first
    print_info "Generating sitemap..."
    python3 generate-sitemap.py || print_warning "Sitemap generation failed (continuing anyway)"

    # Build with Jekyll
    if command -v bundle &> /dev/null && [ -f "Gemfile" ]; then
        print_info "Building site with Jekyll..."
        bundle exec jekyll build
        print_success "Site built successfully in _site/"
    else
        print_warning "Jekyll not properly set up. Skipping Jekyll build."
        print_info "Site uses static HTML files in current directory"
    fi
}

# Serve function
serve() {
    print_header "Starting Jekyll Development Server"

    # Generate sitemap first
    print_info "Generating sitemap..."
    python3 generate-sitemap.py || print_warning "Sitemap generation failed (continuing anyway)"

    # Serve with Jekyll
    if command -v bundle &> /dev/null && [ -f "Gemfile" ]; then
        print_info "Starting Jekyll server at http://localhost:4000"
        bundle exec jekyll serve --livereload
    else
        print_error "Jekyll not properly set up. Run './jekyll-helper.sh setup' first"
        exit 1
    fi
}

# Sitemap generation
generate_sitemap() {
    print_header "Generating Sitemap"

    if [ ! -f "generate-sitemap.py" ]; then
        print_error "generate-sitemap.py not found"
        exit 1
    fi

    python3 generate-sitemap.py
    print_success "Sitemap generated"
}

# Validate sitemap
validate_sitemap() {
    print_header "Validating Sitemap"

    if [ ! -f "sitemap.xml" ]; then
        print_error "sitemap.xml not found"
        exit 1
    fi

    # Check if sitemap is valid XML
    if xmllint --noout sitemap.xml 2>/dev/null; then
        print_success "Sitemap is valid XML"

        # Count URLs
        URL_COUNT=$(grep -c "<url>" sitemap.xml)
        print_info "Total URLs in sitemap: $URL_COUNT"

        # Check for common issues
        if grep -q "localhost" sitemap.xml; then
            print_warning "Found localhost URLs in sitemap"
        fi

        if grep -q "http://" sitemap.xml; then
            print_warning "Found http:// URLs (should be https://)"
        fi

        print_success "Sitemap validation completed"
    else
        print_error "Sitemap is not valid XML"
        exit 1
    fi
}

# Deploy function
deploy() {
    print_header "Deploying Site"

    # Generate sitemap
    print_info "Generating sitemap..."
    python3 generate-sitemap.py

    # Build site
    print_info "Building site..."
    build

    # Git operations
    if git diff --quiet sitemap.xml; then
        print_info "Sitemap unchanged"
    else
        print_info "Sitemap has changes"
        git add sitemap.xml
    fi

    print_success "Site ready for deployment"
    print_info "Next steps:"
    print_info "  1. Review changes: git status"
    print_info "  2. Commit: git commit -m 'Update sitemap'"
    print_info "  3. Push: git push"
}

# Main command handler
case "$1" in
    setup)
        setup
        ;;
    build)
        build
        ;;
    serve)
        serve
        ;;
    sitemap)
        generate_sitemap
        ;;
    validate)
        validate_sitemap
        ;;
    deploy)
        deploy
        ;;
    *)
        echo "Jekyll Helper Script for YourShop Online"
        echo
        echo "Usage: $0 {setup|build|serve|sitemap|validate|deploy}"
        echo
        echo "Commands:"
        echo "  setup      Install Jekyll and dependencies"
        echo "  build      Build the Jekyll site"
        echo "  serve      Start local development server"
        echo "  sitemap    Generate sitemap.xml"
        echo "  validate   Validate sitemap.xml"
        echo "  deploy     Prepare site for deployment"
        echo
        exit 1
        ;;
esac

exit 0
