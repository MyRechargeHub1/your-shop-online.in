// Posts Loader - Dynamic Blog Post Generation
// Fetches posts from posts-config.json and generates HTML dynamically

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        postsJsonPath: '/posts-config.json',
        blogGridSelector: '.blog-grid',
        postCountSelector: '#post-count',
        postsDirectory: '/Posts/'
    };

    // Icon mapping for categories
    const categoryIcons = {
        'VR Gaming': 'fa-vr-cardboard',
        'Audio': 'fa-headphones',
        'Gaming Audio': 'fa-headset',
        'Gaming': 'fa-gamepad',
        'Gaming Mice': 'fa-mouse',
        'Gaming Accessories': 'fa-gamepad',
        'Gaming Controllers': 'fa-gamepad',
        'Smart Tech': 'fa-map-marker-alt',
        'Tracker': 'fa-location-dot',
        'Fitness': 'fa-heartbeat',
        'Power & Charging': 'fa-battery-full',
        'Power': 'fa-battery-full',
        'Charging': 'fa-charging-station',
        'Charging Devices': 'fa-battery-full',
        'Tablets': 'fa-tablet-alt',
        'Audio 2025': 'fa-headphones',
        'Smart Home': 'fa-video',
        'Accessories': 'fa-plug',
        'Wearables': 'fa-watch',
        'Wearables 2025': 'fa-watch',
        'E-Readers': 'fa-book-reader',
        'Streaming': 'fa-tv',
        'Smart Speaker': 'fa-circle-dot',
        'Home Robotics': 'fa-robot',
        'Kitchen': 'fa-utensils',
        'Portable Audio': 'fa-music',
        'Premium Laptops': 'fa-laptop',
        'Premium Audio': 'fa-headphones-alt',
        'Monitors': 'fa-tv',
        'Gaming Furniture': 'fa-chair',
        'Home Cleaning': 'fa-broom',
        'Kitchen Appliances': 'fa-coffee',
        'Computer Accessories': 'fa-mouse',
        'Keyboards': 'fa-keyboard',
        'Home Air Quality': 'fa-wind',
        'Laptops': 'fa-laptop',
        'Photography': 'fa-camera',
        'Smartphones': 'fa-mobile-alt',
        'Televisions': 'fa-tv',
        'Office Equipment': 'fa-mouse',
        'Stationery': 'fa-pen',
        'Networking': 'fa-wifi',
        'Outdoor Cooking': 'fa-fire',
        'Home Appliances': 'fa-wind',
        'Furniture': 'fa-couch'
    };

    // Create a blog card HTML
    function createBlogCard(post) {
        const iconClass = categoryIcons[post.category] || 'fa-star';
        const postUrl = `${CONFIG.postsDirectory}${post.filename}.html`;
        const fullUrl = `https://your-shop-online.in${postUrl}`;
        const encodedUrl = encodeURIComponent(fullUrl);
        const encodedTitle = encodeURIComponent(post.title);
        
        return `
            <article class="blog-card">
                <a href="${postUrl}">
                    <div class="blog-image">
                        <div class="blog-category">${post.category}</div>
                        <div class="blog-placeholder">
                            <i class="fas ${iconClass}"></i>
                        </div>
                    </div>
                </a>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span><i class="far fa-calendar"></i> ${post.date}</span>
                        <span><i class="far fa-clock"></i> ${post.read_time}</span>
                    </div>
                    <h2><a href="${postUrl}" style="text-decoration: none; color: inherit;">${post.title}</a></h2>
                    <p>${post.description}</p>
                    <a href="${postUrl}" class="btn-blog">
                        Read Full Review <i class="fas fa-arrow-right"></i>
                    </a>
                    <div class="social-share">
                        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           class="social-share-btn facebook" 
                           aria-label="Share on Facebook"
                           title="Share on Facebook">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           class="social-share-btn twitter" 
                           aria-label="Share on Twitter"
                           title="Share on Twitter">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           class="social-share-btn linkedin" 
                           aria-label="Share on LinkedIn"
                           title="Share on LinkedIn">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                        <a href="https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           class="social-share-btn pinterest" 
                           aria-label="Share on Pinterest"
                           title="Share on Pinterest">
                            <i class="fab fa-pinterest-p"></i>
                        </a>
                        <a href="https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           class="social-share-btn whatsapp" 
                           aria-label="Share on WhatsApp"
                           title="Share on WhatsApp">
                            <i class="fab fa-whatsapp"></i>
                        </a>
                        <button class="social-share-btn copy-link copy-link-btn" 
                                data-url="${fullUrl}" 
                                aria-label="Copy link"
                                title="Copy link">
                            <i class="fas fa-link"></i>
                        </button>
                    </div>
                </div>
            </article>
        `;
    }

    // Load and display posts
    async function loadPosts() {
        const blogGrid = document.querySelector(CONFIG.blogGridSelector);
        const postCountElement = document.querySelector(CONFIG.postCountSelector);

        if (!blogGrid) {
            console.error('Blog grid container not found');
            return;
        }

        // Show loading state
        blogGrid.innerHTML = '<div class="loading-message">Loading posts...</div>';

        try {
            // Fetch posts from JSON
            const response = await fetch(CONFIG.postsJsonPath);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const posts = await response.json();

            // Update post count
            if (postCountElement) {
                postCountElement.textContent = posts.length;
            }

            // Clear loading message
            blogGrid.innerHTML = '';

            // Generate and insert blog cards
            posts.forEach(post => {
                const cardHTML = createBlogCard(post);
                blogGrid.insertAdjacentHTML('beforeend', cardHTML);
            });

            console.log(`Successfully loaded ${posts.length} posts`);

        } catch (error) {
            console.error('Error loading posts:', error);
            blogGrid.innerHTML = `
                <div class="error-message">
                    <p>Unable to load posts. Please try refreshing the page.</p>
                    <p style="font-size: 0.9em; color: #666;">Error: ${error.message}</p>
                </div>
            `;
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadPosts);
    } else {
        loadPosts();
    }

})();