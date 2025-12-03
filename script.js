// Subdomain redirect handler - redirects all subdomains to apex domain
(function() {
    // Get the current hostname
    const hostname = window.location.hostname;
    const targetDomain = 'your-shop-online.in';

    // Check if we're on a subdomain (e.g., www.your-shop-online.in, blog.your-shop-online.in, etc.)
    if (hostname !== targetDomain && hostname.endsWith('.' + targetDomain)) {
        // Redirect to apex domain with same path and query string
        const newUrl = window.location.protocol + '//' + targetDomain + window.location.pathname + window.location.search + window.location.hash;
        window.location.replace(newUrl);
    }

    // Also handle GitHub Pages default domain redirect
    if (hostname.endsWith('.github.io')) {
        const newUrl = window.location.protocol + '//' + targetDomain + window.location.pathname + window.location.search + window.location.hash;
        window.location.replace(newUrl);
    }
})();

// Sample Products Data
const products = [
    {
        id: 1,
        name: "Premium Headphones",
        category: "Electronics",
        price: 129.99,
        description: "High-quality wireless headphones with noise cancellation",
        icon: "🎧"
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "Electronics",
        price: 249.99,
        description: "Feature-rich smartwatch with health tracking",
        icon: "⌚"
    },
    {
        id: 3,
        name: "Laptop Backpack",
        category: "Accessories",
        price: 59.99,
        description: "Durable backpack with laptop compartment",
        icon: "🎒"
    },
    {
        id: 4,
        name: "Wireless Mouse",
        category: "Electronics",
        price: 39.99,
        description: "Ergonomic wireless mouse with precision tracking",
        icon: "🖱️"
    },
    {
        id: 5,
        name: "Phone Case",
        category: "Accessories",
        price: 19.99,
        description: "Protective case with stylish design",
        icon: "📱"
    },
    {
        id: 6,
        name: "USB-C Cable",
        category: "Electronics",
        price: 14.99,
        description: "Fast charging USB-C cable, 6ft length",
        icon: "🔌"
    },
    {
        id: 7,
        name: "Desk Lamp",
        category: "Home",
        price: 45.99,
        description: "LED desk lamp with adjustable brightness",
        icon: "💡"
    },
    {
        id: 8,
        name: "Water Bottle",
        category: "Lifestyle",
        price: 24.99,
        description: "Insulated stainless steel water bottle",
        icon: "🍶"
    }
];

// Shopping Cart
let cart = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupEventListeners();
    updateCartCount();
});

// Load products into the grid
function loadProducts() {
    const productsGrid = document.getElementById('products-grid');

    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
        <div class="product-image">
            <span style="font-size: 5rem;">${product.icon}</span>
        </div>
        <div class="product-info">
            <div class="product-category">${product.category}</div>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
                <span class="product-price">$${product.price.toFixed(2)}</span>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Add
                </button>
            </div>
        </div>
    `;

    return card;
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    if (product) {
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        updateCartCount();
        showNotification('Product added to cart!');
    }
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCart();
}

// Update cart count badge
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Render cart items in modal
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = '$0.00';
        return;
    }

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <span>${item.icon}</span>
            </div>
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Cart modal
    const cartBtn = document.getElementById('cart-btn');
    const cartModal = document.getElementById('cart-modal');
    const closeCart = document.getElementById('close-cart');

    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            cartModal.classList.add('active');
            renderCart();
        });
    }

    if (closeCart) {
        closeCart.addEventListener('click', function() {
            cartModal.classList.remove('active');
        });
    }

    // Close modal when clicking outside
    if (cartModal) {
        cartModal.addEventListener('click', function(e) {
            if (e.target === cartModal) {
                cartModal.classList.remove('active');
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update active nav link
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');

                // Close mobile menu if open
                navMenu.classList.remove('active');
            }
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Newsletter form submission
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Thank you for subscribing to our newsletter!');
            form.reset();
        });
    });

    // Search functionality
    const searchBtn = document.getElementById('search-btn');
    const searchModal = document.getElementById('search-modal');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    // Blog posts database
    const blogPosts = [
        {title: "Meta Quest 3S 128GB: The Ultimate VR Experience", category: "VR Gaming", url: "Posts/meta-quest-3s.html", description: "Experience next-generation virtual reality with the Meta Quest 3S."},
        {title: "Apple AirPods Pro 2nd Generation", category: "Audio", url: "Posts/airpods-pro-2.html", description: "Premium wireless earbuds with Active Noise Cancellation"},
        {title: "BENGOO G9000 Stereo Gaming Headset", category: "Gaming", url: "Posts/bengoo-g9000.html", description: "Affordable gaming headset with LED lights"},
        {title: "Logitech G502 HERO Gaming Mouse", category: "Gaming", url: "Posts/logitech-g502.html", description: "High performance gaming mouse with customizable weights"},
        {title: "Apple AirTag 4 Pack", category: "Accessories", url: "Posts/apple-airtag.html", description: "Keep track of your items with precision finding"},
        {title: "Fitbit Inspire 3 Health & Fitness Tracker", category: "Fitness", url: "Posts/fitbit-inspire-3.html", description: "Track your health and fitness goals"},
        {title: "Anker Portable Charger 10000mAh", category: "Electronics", url: "Posts/anker-power-bank.html", description: "Compact portable charger for on-the-go power"},
        {title: "Xbox Wireless Controller", category: "Gaming", url: "Posts/xbox-controller.html", description: "Premium gaming controller with enhanced comfort"},
        {title: "Apple iPad 10.9 inch 11th Gen", category: "Tablets", url: "Posts/ipad-11-inch.html", description: "Powerful and versatile tablet for work and play"},
        {title: "Samsung Galaxy Tab A9+", category: "Tablets", url: "Posts/galaxy-tab-a9.html", description: "Entertainment tablet with large display"},
        {title: "TAGRY X08 Bluetooth Headphones", category: "Audio", url: "Posts/tagry-x08-headphones.html", description: "True wireless earbuds with premium sound"},
        {title: "Wyze Cam v4 Security Camera", category: "Smart Home", url: "Posts/wyze-cam-v4.html", description: "Smart security camera with color night vision"},
        {title: "3-in-1 Wireless Charging Station", category: "Accessories", url: "Posts/3in1-charging-station.html", description: "Charge multiple devices simultaneously"},
        {title: "Smart Watch 2025 Fitness Tracker", category: "Wearables", url: "Posts/smart-watch-2025.html", description: "Advanced smartwatch with health monitoring"},
        {title: "Anker PowerCore 26800 Portable Charger", category: "Electronics", url: "Posts/anker-powercore-26800.html", description: "High capacity power bank for extended use"},
        {title: "Ring Video Doorbell Pro 2", category: "Smart Home", url: "Posts/ring-doorbell-pro-2.html", description: "Smart doorbell with 3D motion detection"},
        {title: "Amazon Echo Dot 5th Gen", category: "Smart Home", url: "Posts/echo-dot-5th-gen.html", description: "Smart speaker with Alexa voice control"},
        {title: "Tile Pro (2022) 4-Pack", category: "Accessories", url: "Posts/tile-pro-tracker.html", description: "Bluetooth tracker with longest range"},
        {title: "Anker USB C Hub Adapter", category: "Electronics", url: "Posts/anker-usb-c-hub.html", description: "Expand your laptop connectivity"},
        {title: "Apple Watch SE 2nd Gen", category: "Wearables", url: "Posts/apple-watch-se.html", description: "Essential Apple Watch features at great value"},
        {title: "Amazon Kindle Paperwhite", category: "Electronics", url: "Posts/kindle-paperwhite.html", description: "Premium waterproof e-reader"},
        {title: "Roku Streaming Stick 4K", category: "Entertainment", url: "Posts/roku-streaming-stick.html", description: "Stream 4K content with voice control"},
        {title: "Amazon Fire TV Stick 4K", category: "Entertainment", url: "Posts/fire-tv-stick-4k.html", description: "Stream in brilliant 4K Ultra HD"},
        {title: "Blink Video Doorbell", category: "Smart Home", url: "Posts/blink-video-doorbell.html", description: "Wireless smart doorbell with HD video"},
        {title: "Sony WH-1000XM5 Wireless Headphones", category: "Audio", url: "Posts/sony-wh-1000xm5.html", description: "Industry-leading noise cancellation headphones"},
        {title: "iRobot Roomba 694 Robot Vacuum", category: "Home", url: "Posts/roomba-694.html", description: "Smart robot vacuum with WiFi connectivity"},
        {title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker", category: "Kitchen", url: "Posts/instant-pot-duo.html", description: "Multi-functional kitchen appliance"},
        {title: "Ninja AF101 Air Fryer", category: "Kitchen", url: "Posts/ninja-air-fryer.html", description: "Healthy cooking with air frying technology"},
        {title: "JBL Flip 6 Portable Speaker", category: "Audio", url: "Posts/jbl-flip-6.html", description: "Waterproof Bluetooth speaker with powerful sound"},
        {title: "MacBook Pro 16-inch M3 Max: The Ultimate Professional Laptop", category: "Premium Laptops", url: "Posts/macbook-pro-16-m3.html", description: "Desktop-class performance in portable form"},
        {title: "Sony WH1000XM5: Premium Noise Cancellation", category: "Premium Headphones", url: "Posts/sony-wh1000xm5.html", description: "Industry-leading noise cancellation"},
        {title: "iRobot Roomba j7+: Smart Vacuum Excellence", category: "Premium Home", url: "Posts/irobot-roomba-j7.html", description: "Self-emptying robot vacuum with AI obstacle avoidance"},
        {title: "LG 27-inch 4K Monitor: Professional Display", category: "Monitors", url: "Posts/lg-27-4k-monitor.html", description: "4K UHD monitor for professionals"},
        {title: "Secretlab Titan Evo: Gaming Chair Excellence", category: "Gaming Chairs", url: "Posts/secretlab-titan-evo.html", description: "Premium ergonomic gaming chair"},
        {title: "Dyson V15 Detect: Advanced Cleaning Technology", category: "Premium Vacuums", url: "Posts/dyson-v15-detect.html", description: "Laser dust detection vacuum"},
        {title: "Breville Barista Express: Home Espresso Machine", category: "Coffee Machines", url: "Posts/breville-barista-express.html", description: "Professional espresso at home"},
        {title: "Logitech MX Master 3S: Professional Mouse", category: "Accessories", url: "Posts/logitech-mx-master-3s.html", description: "Premium wireless mouse for professionals"},
        {title: "Keychron Q1 Pro: Premium Mechanical Keyboard", category: "Keyboards", url: "Posts/keychron-q1-pro.html", description: "QMK/VIA programmable keyboard"},
        {title: "Dyson Purifier Hot+Cool HP07", category: "Home Air Quality", url: "Posts/dyson-purifier-hot-cool.html", description: "Year-round air quality excellence"},
        {title: "Samsung Galaxy S24 Ultra: The Ultimate AI-Powered Flagship", category: "Premium Smartphones", url: "Posts/samsung-galaxy-s24-ultra.html", description: "Revolutionary Galaxy AI features"},
        {title: "iPad Pro 12.9-inch M2: The Ultimate Creative Powerhouse", category: "Premium Tablets", url: "Posts/ipad-pro-12-9-m2.html", description: "Desktop-class M2 performance"},
        {title: "Microsoft Surface Laptop Studio 2", category: "Creative Workstations", url: "Posts/microsoft-surface-laptop-studio-2.html", description: "Versatile creative workstation"},
        {title: "Canon EOS R6 Mark II: Professional Mirrorless Excellence", category: "Professional Cameras", url: "Posts/canon-eos-r6-mark-ii.html", description: "24.2MP full-frame sensor with 40fps burst"},
        {title: "DJI Mini 4 Pro: The Ultimate Compact Drone", category: "Premium Drones", url: "Posts/dji-mini-4-pro.html", description: "4K/60fps HDR video in sub-250g package"},
        {title: "Herman Miller Embody Gaming Chair", category: "Premium Gaming Chairs", url: "Posts/herman-miller-embody-gaming.html", description: "Ultimate ergonomic excellence"},
        {title: "Asus ROG Zephyrus G16: Premium Gaming Powerhouse", category: "Gaming Laptops", url: "Posts/asus-rog-zephyrus-g16.html", description: "Intel Core Ultra 9 with RTX 4070"},
        {title: "LG C3 OLED 65-inch: The Ultimate Home Theater", category: "Premium TVs", url: "Posts/lg-c3-oled-65.html", description: "Self-lit OLED pixels deliver perfect blacks"},
        {title: "Sonos Arc: Premium Dolby Atmos Soundbar", category: "Premium Audio", url: "Posts/sonos-arc-soundbar.html", description: "11 speakers deliver immersive sound"},
        {title: "Vitamix A3500 Ascent: Professional Blender", category: "Premium Kitchen", url: "Posts/vitamix-a3500-ascent.html", description: "2.2HP motor with 10-year warranty"},
        {title: "Sony A7 IV: The Ultimate Full-Frame Hybrid Camera", category: "Professional Cameras", url: "Posts/sony-a7-iv-camera.html", description: "33MP sensor with 4K/60p video"},
        {title: "Apple Watch Ultra 2: Ultimate Adventure Smartwatch", category: "Premium Smartwatches", url: "Posts/apple-watch-ultra-2.html", description: "Titanium construction with dual-frequency GPS"},
        {title: "Samsung Odyssey OLED G9: Ultra-Wide Gaming Monitor", category: "Gaming Monitors", url: "Posts/samsung-odyssey-oled-g9.html", description: "49-inch OLED with 240Hz refresh"},
        {title: "Razer Blade 15: Premium Gaming Laptop", category: "Gaming Laptops", url: "Posts/razer-blade-15-2024.html", description: "14th Gen Intel with RTX 4070"},
        {title: "KitchenAid Pro Line Stand Mixer", category: "Kitchen Appliances", url: "Posts/kitchenaid-pro-line-mixer.html", description: "7-quart capacity professional mixer"},
        {title: "Nespresso Creatista Plus: Barista-Quality Coffee", category: "Coffee Machines", url: "Posts/nespresso-creatista-plus.html", description: "Automatic steam wand espresso machine"},
        {title: "Peloton Bike+: Connected Fitness Experience", category: "Fitness Equipment", url: "Posts/peloton-bike-plus.html", description: "Auto-follow resistance with rotating screen"},
        {title: "Samsung The Frame 65\" QLED: Art Meets Technology", category: "Premium TVs", url: "Posts/samsung-frame-tv-65.html", description: "QLED TV with Art Mode"},
        {title: "Bowers & Wilkins Px8: Audiophile Wireless Excellence", category: "Audiophile Headphones", url: "Posts/bowers-wilkins-px8.html", description: "Carbon fiber headphones with 40mm drivers"},
        {title: "DeLonghi La Specialista Maestro: Professional Espresso", category: "Espresso Machines", url: "Posts/delonghi-specialista-maestro.html", description: "LatteArt System with Smart Tamping"},
        {title: "Alienware Aurora R15: Ultimate Gaming Desktop", category: "Gaming Desktops", url: "Posts/alienware-aurora-r15.html", description: "13th Gen Intel i9 with RTX 4090"},
        {title: "Traeger Timberline 850: Premium Wood Pellet Grill", category: "Outdoor Cooking", url: "Posts/traeger-timberline-850.html", description: "WiFIRE technology with double-wall insulation"},
        {title: "Breville Oracle Touch: Automatic Espresso Perfection", category: "Espresso Machines", url: "Posts/breville-oracle-touch.html", description: "Touchscreen automatic espresso machine"},
        {title: "Miele Complete C3: German Engineering Excellence", category: "Premium Vacuums", url: "Posts/miele-complete-c3.html", description: "HEPA filtration with ultra-quiet operation"},
        {title: "Google Pixel 8 Pro: AI-Powered Android Excellence", category: "Flagship Smartphones", url: "Posts/google-pixel-8-pro.html", description: "Tensor G3 chip with advanced AI features"},
        {title: "Fujifilm X-T5: Premium APS-C Photography", category: "Mirrorless Cameras", url: "Posts/fujifilm-x-t5.html", description: "40MP sensor with film simulations"},
        {title: "Theragun PRO Plus: Professional Massage Device", category: "Recovery Devices", url: "Posts/theragun-pro-plus.html", description: "60lbs force with 6 attachments"},
        {title: "Bose QuietComfort Ultra: Premium ANC Excellence", category: "Premium Headphones", url: "Posts/bose-quietcomfort-ultra.html", description: "Spatial audio with 24-hour battery"},
        {title: "Dyson Airwrap Complete: Revolutionary Hair Styling", category: "Hair Styling", url: "Posts/dyson-airwrap-complete.html", description: "Coanda effect with 6 attachments"},
        {title: "Weber Summit S-670: The Ultimate Gas Grill", category: "Gas Grills", url: "Posts/weber-summit-s-670.html", description: "6 burners with 60,000 BTU"}
    ];

    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            searchModal.classList.add('active');
            searchInput.focus();
        });
    }

    if (searchClose) {
        searchClose.addEventListener('click', function() {
            searchModal.classList.remove('active');
            searchInput.value = '';
            searchResults.innerHTML = '<p class="search-placeholder">Start typing to search through 69 premium product reviews...</p>';
        });
    }

    // Close search modal when clicking outside
    if (searchModal) {
        searchModal.addEventListener('click', function(e) {
            if (e.target === searchModal) {
                searchModal.classList.remove('active');
                searchInput.value = '';
                searchResults.innerHTML = '<p class="search-placeholder">Start typing to search through 69 premium product reviews...</p>';
            }
        });
    }

    // Close search on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchModal.classList.contains('active')) {
            searchModal.classList.remove('active');
            searchInput.value = '';
            searchResults.innerHTML = '<p class="search-placeholder">Start typing to search through 69 premium product reviews...</p>';
        }
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.trim().toLowerCase();

            if (query.length === 0) {
                searchResults.innerHTML = '<p class="search-placeholder">Start typing to search through 69 premium product reviews...</p>';
                return;
            }

            const results = blogPosts.filter(post => {
                return post.title.toLowerCase().includes(query) ||
                       post.category.toLowerCase().includes(query) ||
                       post.description.toLowerCase().includes(query);
            });

            displaySearchResults(results, query);
        });
    }

    function displaySearchResults(results, query) {
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="search-no-results">
                    <i class="fas fa-search"></i>
                    <p>No results found for "${query}"</p>
                    <p class="suggestion">Try searching for: laptops, cameras, headphones, gaming, or kitchen</p>
                </div>
            `;
            return;
        }

        searchResults.innerHTML = results.map(post => {
            const highlightedTitle = highlightText(post.title, query);
            const highlightedDescription = highlightText(post.description, query);

            return `
                <div class="search-result-item" onclick="window.location.href='${post.url}'">
                    <div class="search-result-title">
                        ${highlightedTitle}
                        <span class="search-result-category">${post.category}</span>
                    </div>
                    <div class="search-result-description">${highlightedDescription}</div>
                </div>
            `;
        }).join('');
    }

    function highlightText(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(card);
    });
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;

    // Add animation keyframes
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Update active navigation link on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});
