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

// Search Products Database - All product reviews
const searchProducts = [
    { title: "3-in-1 Wireless Charging Station Review - iPhone, Apple Watch, AirPods 2025", description: "3-in-1 wireless charging station review for iPhone 16/15, Apple Watch, and AirPods. Fast charging dock with MagSafe compatibility tested for 2025 - Perfect for US shoppers.", category: "Power & Charging", url: "Posts/3in1-charging-station.html" },
    { title: "Amazon Echo Hub Review 2025 - Smart Home Control Center", description: "Amazon Echo Hub review 2025 - The ultimate smart home control panel with 8-inch touchscreen, Matter support, and Alexa integration.", category: "Smart Home", url: "Posts/amazon-echo-hub.html" },
    { title: "Amazon Fire TV Stick 4K Max 2025 Review - Ultimate Streaming", description: "Fire TV Stick 4K Max Review: Alexa voice control, Wi-Fi 6E, cloud gaming, 4K HDR streaming. Best Amazon streaming device at $59.99.", category: "Streaming Devices", url: "Posts/fire-tv-stick-4k.html" },
    { title: "Amazon Kindle Paperwhite 16GB (2024) Review - Best E-Reader", description: "Kindle Paperwhite 2024 Review: 16GB storage, 6.8-inch glare-free display, 10-week battery, waterproof design.", category: "E-Readers", url: "Posts/kindle-paperwhite.html" },
    { title: "Anker 20K mAh Power Bank Review - Reliable Portable Power", description: "Anker 20K mAh power bank review testing charging speed, capacity, and build quality.", category: "Power & Charging", url: "Posts/anker-power-bank.html" },
    { title: "Anker PowerCore 26800 Review - Best Portable Charger 2025", description: "Anker PowerCore 26800 portable charger review with fast charging, triple ports, and massive capacity.", category: "Power & Charging", url: "Posts/anker-powercore-26800.html" },
    { title: "Anker USB-C Hub 7-in-1 Review - Best Laptop Adapter 2025", description: "Anker 7-in-1 USB-C hub review with HDMI 4K, USB 3.0 ports, and SD card reader.", category: "Accessories", url: "Posts/anker-usb-c-hub.html" },
    { title: "Apple AirPods Pro 2 Review - Premium Wireless Earbuds", description: "Apple AirPods Pro 2 review with detailed analysis of active noise cancellation, sound quality, and battery life.", category: "Audio", url: "Posts/airpods-pro-2.html" },
    { title: "Apple AirTag 4 Pack Review - Smart Item Tracking", description: "Apple AirTag 4 Pack review detailing tracking accuracy, battery life, and setup process.", category: "Trackers", url: "Posts/apple-airtag.html" },
    { title: "Apple HomePod 2 Review 2025 - Premium Audio Excellence", description: "Apple HomePod 2 review 2025 - Premium smart speaker with exceptional audio, Siri integration, and smart home hub capabilities.", category: "Smart Home", url: "Posts/apple-homepod-2.html" },
    { title: "Apple iPad 11-inch Review - Ultimate Tablet Experience", description: "Apple iPad 11-inch with A16 chip review covering performance, display quality, and features.", category: "Tablets", url: "Posts/ipad-11-inch.html" },
    { title: "Apple Vision Pro Review 2025 - Revolutionary Spatial Computing", description: "Apple Vision Pro review for 2025 - Revolutionary spatial computing headset with stunning display and immersive experiences.", category: "VR/AR", url: "Posts/apple-vision-pro.html" },
    { title: "Apple Watch SE (2nd Gen) 2025 Review - Best Value Smartwatch", description: "Apple Watch SE 2025 Review: GPS tracking, heart rate monitoring, crash detection, and 50m water resistance.", category: "Wearables", url: "Posts/apple-watch-se.html" },
    { title: "Apple Watch Ultra 2 Review - Premium Adventure Smartwatch 2025", description: "Apple Watch Ultra 2 review: Premium titanium smartwatch with 49mm display, dual-frequency GPS, dive computer to 100m.", category: "Wearables", url: "Posts/apple-watch-ultra-2.html" },
    { title: "Asus ROG Zephyrus G16 Review - Best Gaming Laptop 2025", description: "Asus ROG Zephyrus G16 review with Intel Core Ultra 9, RTX 4070, 240Hz OLED display, and premium design.", category: "Laptops", url: "Posts/asus-rog-zephyrus-g16.html" },
    { title: "BENGOO G9000 Gaming Headset Review - Budget Gaming Excellence", description: "BENGOO G9000 gaming headset review covering sound quality, microphone performance, and comfort.", category: "Gaming", url: "Posts/bengoo-g9000.html" },
    { title: "Blink Video Doorbell 2025 Review - Best Budget Smart Doorbell", description: "Blink Video Doorbell Review: 1080p HD video, two-year battery life, two-way audio, motion detection.", category: "Smart Home", url: "Posts/blink-video-doorbell.html" },
    { title: "Bose QuietComfort Ultra Headphones Review", description: "Comprehensive review of Bose QuietComfort Ultra Headphones with advanced features.", category: "Audio", url: "Posts/bose-quietcomfort-ultra-headphones.html" },
    { title: "Bowers & Wilkins Px8 Review - Audiophile Wireless Headphones 2025", description: "Bowers & Wilkins Px8 review: Premium wireless headphones with carbon fiber construction and audiophile sound quality.", category: "Audio", url: "Posts/bowers-wilkins-px8.html" },
    { title: "Breville Barista Express Review - Best Home Espresso Machine 2025", description: "Breville Barista Express espresso machine review with built-in grinder, 15-bar Italian pump.", category: "Kitchen", url: "Posts/breville-barista-express.html" },
    { title: "Canon EOS R6 Mark II Review - Best Pro Mirrorless Camera 2025", description: "Canon EOS R6 Mark II review with 24.2MP full-frame sensor, 40fps burst shooting, 6K video.", category: "Cameras", url: "Posts/canon-eos-r6-mark-ii.html" },
    { title: "Dell XPS 17 (2025) Review - Premium Windows Powerhouse", description: "Dell XPS 17 2025 review - Premium Windows laptop with stunning 17-inch 4K OLED display.", category: "Laptops", url: "Posts/dell-xps-17-2025.html" },
    { title: "DeLonghi La Specialista Maestro Review - Premium Espresso 2025", description: "DeLonghi La Specialista Maestro review: Premium espresso machine with LatteArt System.", category: "Kitchen", url: "Posts/delonghi-specialista-maestro.html" },
    { title: "DJI Mini 4 Pro Review - Best Compact Drone 2025", description: "DJI Mini 4 Pro review with 4K/60fps HDR, omnidirectional obstacle avoidance, 34-min flight time.", category: "Drones", url: "Posts/dji-mini-4-pro.html" },
    { title: "Dyson Purifier Hot+Cool HP07 Review - Best Air Purifier 2025", description: "Dyson Purifier Hot+Cool HP07 review with HEPA filtration, heating, cooling, and air quality monitoring.", category: "Home Appliances", url: "Posts/dyson-purifier-hot-cool.html" },
    { title: "Dyson V15 Detect Review - Best Cordless Vacuum 2025", description: "Dyson V15 Detect cordless vacuum review with laser dust detection, HEPA filtration, and powerful suction.", category: "Home Appliances", url: "Posts/dyson-v15-detect.html" },
    { title: "Echo Dot 5th Gen Review - Best Alexa Smart Speaker 2025", description: "Echo Dot 5th Generation review covering sound quality, Alexa features, and smart home control.", category: "Audio", url: "Posts/echo-dot-5th-gen.html" },
    { title: "Fitbit Inspire 3 Review - Complete Fitness Tracker", description: "Fitbit Inspire 3 fitness tracker review covering health monitoring, battery life, and app features.", category: "Trackers", url: "Posts/fitbit-inspire-3.html" },
    { title: "Herman Miller Embody Gaming Chair Review - Best Premium Gaming Chair 2025", description: "Herman Miller x Logitech Embody Gaming Chair review with advanced ergonomics and 12-year warranty.", category: "Gaming", url: "Posts/herman-miller-embody-gaming.html" },
    { title: "Instant Pot Duo 7-in-1 2025 Review - Best Multi-Cooker", description: "Instant Pot Duo Review: 7-in-1 multi-cooker, pressure cooker, slow cooker, rice cooker.", category: "Kitchen", url: "Posts/instant-pot-duo.html" },
    { title: "iPad Pro 12.9-inch M2 Review - Best Premium Tablet 2025", description: "iPad Pro 12.9-inch M2 review with desktop-class M2 chip, stunning Liquid Retina XDR display.", category: "Tablets", url: "Posts/ipad-pro-12-9-m2.html" },
    { title: "iPhone 16 Pro Max Review 2025 - Ultimate Flagship Smartphone", description: "iPhone 16 Pro Max review 2025 - Apple's ultimate flagship with A18 Pro chip, titanium design, advanced camera system.", category: "Smartphones", url: "Posts/iphone-16-pro-max.html" },
    { title: "iRobot Roomba 694 2025 Review - Best Entry-Level Robot Vacuum", description: "Roomba 694 Review: Smart mapping, app control, automatic charging, 3-stage cleaning system.", category: "Home Appliances", url: "Posts/roomba-694.html" },
    { title: "iRobot Roomba j7+ Review - Best Self-Emptying Robot Vacuum 2025", description: "iRobot Roomba j7+ review with self-emptying base, advanced obstacle avoidance, and smart mapping.", category: "Home Appliances", url: "Posts/irobot-roomba-j7.html" },
    { title: "JBL Flip 6 Portable Speaker 2025 Review - Best Waterproof Bluetooth Speaker", description: "JBL Flip 6 Review: Waterproof IP67 rating, 12-hour battery, powerful bass, PartyBoost feature.", category: "Audio", url: "Posts/jbl-flip-6.html" },
    { title: "Keychron Q1 Pro Review - Best Premium Mechanical Keyboard 2025", description: "Keychron Q1 Pro mechanical keyboard review with hot-swappable switches and wireless connectivity.", category: "Accessories", url: "Posts/keychron-q1-pro.html" },
    { title: "KitchenAid Pro Line Stand Mixer Review - Professional Baking 2025", description: "KitchenAid Pro Line Stand Mixer review: Professional 7-quart stand mixer with 1.3HP motor.", category: "Kitchen", url: "Posts/kitchenaid-pro-line-mixer.html" },
    { title: "LG 27-Inch 4K UHD Monitor Review - Best Display for Professionals 2025", description: "LG 27-inch 4K UHD Monitor review with HDR10 support, USB-C connectivity, and professional color accuracy.", category: "Displays", url: "Posts/lg-27-4k-monitor.html" },
    { title: "LG C3 OLED 65-inch TV Review - Best Premium OLED TV 2025", description: "LG C3 OLED 65-inch TV review with self-lit pixels, perfect blacks, 120Hz gaming, α9 AI processor.", category: "Displays", url: "Posts/lg-c3-oled-65.html" },
    { title: "Logitech G502 HERO Gaming Mouse Review - Precision Gaming", description: "Logitech G502 HERO gaming mouse review with analysis of sensor accuracy and customization options.", category: "Gaming", url: "Posts/logitech-g502.html" },
    { title: "Logitech MX Master 3S Review - Best Productivity Mouse 2025", description: "Logitech MX Master 3S review with silent clicks, 8K DPI sensor, and multi-device connectivity.", category: "Accessories", url: "Posts/logitech-mx-master-3s.html" },
    { title: "MacBook Pro 16-inch (M3 Max) Review 2025 – The Ultimate Laptop for Power Users", description: "Full review of Apple MacBook Pro 16-inch (2025) with M3 Max chip.", category: "Laptops", url: "Posts/macbook-pro-16-m3-max.html" },
    { title: "MacBook Pro 16-inch M3 Max Review - Best Pro Laptop 2025", description: "MacBook Pro 16-inch M3 Max review with exceptional performance and stunning Liquid Retina XDR display.", category: "Laptops", url: "Posts/macbook-pro-16-m3.html" },
    { title: "MacBook Pro 16-inch M4 Max Review 2025 - Ultimate Creative Powerhouse", description: "MacBook Pro 16-inch M4 Max review for 2025 - Apple's most powerful laptop with next-gen performance.", category: "Laptops", url: "Posts/macbook-pro-16-m4-max.html" },
    { title: "Meta Quest 3 Review 2025 - Ultimate Mixed Reality Gaming", description: "Meta Quest 3 review 2025 - Premium mixed reality headset with breakthrough passthrough and powerful performance.", category: "Gaming", url: "Posts/meta-quest-3.html" },
    { title: "Meta Quest 3S 128GB Review - The Ultimate VR Experience", description: "Complete Meta Quest 3S 128GB review covering performance, visual quality, and gaming experience.", category: "Gaming", url: "Posts/meta-quest-3s.html" },
    { title: "Microsoft Surface Laptop Studio 2 Review - Best Creative Workstation 2025", description: "Microsoft Surface Laptop Studio 2 review with 13th Gen Intel Core i7, NVIDIA RTX 4060.", category: "Laptops", url: "Posts/microsoft-surface-laptop-studio-2.html" },
    { title: "Microsoft Surface Pro 10 Review 2025 - Ultimate 2-in-1 Tablet", description: "Microsoft Surface Pro 10 review 2025 - Premium 2-in-1 tablet with Intel Core Ultra, OLED display option.", category: "Laptops", url: "Posts/microsoft-surface-pro-10.html" },
    { title: "Nespresso Creatista Plus Review - Barista-Quality Espresso 2025", description: "Nespresso Creatista Plus review: Premium espresso machine with automatic steam wand and 8 coffee styles.", category: "Kitchen", url: "Posts/nespresso-creatista-plus.html" },
    { title: "Ninja Air Fryer Pro 2025 Review - Best Air Fryer for Healthy Cooking", description: "Ninja Air Fryer Pro Review: 5-quart capacity, 400°F heat, healthier cooking with 75% less fat.", category: "Kitchen", url: "Posts/ninja-air-fryer.html" },
    { title: "Ninja Foodi Smart XL Grill Review", description: "A comprehensive review of the Ninja Foodi Smart XL Grill featuring Cyclonic Grilling Technology.", category: "Kitchen", url: "Posts/ninja-foodi-smart-xl-grill.html" },
    { title: "Peloton Bike+ Review - Premium Connected Fitness 2025", description: "Peloton Bike+ review: Premium exercise bike with auto-follow resistance and rotating touchscreen.", category: "Fitness", url: "Posts/peloton-bike-plus.html" },
    { title: "Razer Blade 15 2024 Review - Premium Gaming Laptop", description: "Razer Blade 15 2024 review: Premium gaming laptop with 14th Gen Intel Core i9, RTX 4070.", category: "Laptops", url: "Posts/razer-blade-15-2024.html" },
    { title: "Ring Video Doorbell Pro 2 Review - Best Smart Doorbell 2025", description: "Ring Video Doorbell Pro 2 review with 1536p HD video, 3D motion detection, and Alexa integration.", category: "Smart Home", url: "Posts/ring-doorbell-pro-2.html" },
    { title: "Roku Streaming Stick 4K Plus 2025 Review - Best Streaming Device", description: "Roku Streaming Stick 4K Plus Review: 4K HDR streaming, voice remote, 500+ channels.", category: "Streaming Devices", url: "Posts/roku-streaming-stick.html" },
    { title: "Samsung Galaxy S24 Ultra Review - Best Flagship Phone 2025", description: "Samsung Galaxy S24 Ultra review with revolutionary AI features, Snapdragon 8 Gen 3 processor, 200MP camera.", category: "Smartphones", url: "Posts/samsung-galaxy-s24-ultra.html" },
    { title: "Samsung Galaxy S25 Ultra Review 2025 - Ultimate Android Flagship", description: "Samsung Galaxy S25 Ultra review 2025 - The ultimate Android flagship with 200MP camera, S Pen, AI features.", category: "Smartphones", url: "Posts/samsung-galaxy-s25-ultra.html" },
    { title: "Samsung Galaxy Tab A9+ Review - Best Budget Android Tablet", description: "Samsung Galaxy Tab A9+ review testing performance, display, and battery life.", category: "Tablets", url: "Posts/galaxy-tab-a9.html" },
    { title: "Samsung Galaxy Z Fold 6 Review 2025 - Ultimate Foldable Smartphone", description: "Samsung Galaxy Z Fold 6 review 2025 - The ultimate foldable smartphone with 7.6-inch Dynamic AMOLED display.", category: "Smartphones", url: "Posts/samsung-galaxy-z-fold-6.html" },
    { title: "Samsung Odyssey OLED G9 Review - Ultimate Gaming Monitor 2025", description: "Samsung Odyssey OLED G9 review: Ultra-wide 49-inch OLED gaming monitor with 240Hz refresh rate.", category: "Gaming", url: "Posts/samsung-odyssey-oled-g9.html" },
    { title: "Samsung The Frame 65 Review - Art-Inspired QLED TV 2025", description: "Samsung The Frame 65-inch QLED TV review: Art-inspired 4K TV with Quantum Dot technology, Art Mode.", category: "Displays", url: "Posts/samsung-frame-tv-65.html" },
    { title: "Secretlab TITAN Evo 2022 Review - Best Premium Gaming Chair 2025", description: "Secretlab TITAN Evo 2022 gaming chair review with premium ergonomics and adjustable lumbar support.", category: "Gaming", url: "Posts/secretlab-titan-evo.html" },
    { title: "Smart Watch 2025 Review - Best Fitness Tracker with Heart Rate Monitor", description: "Comprehensive smart watch review with heart rate monitoring, sleep tracking, and 100+ sport modes.", category: "Wearables", url: "Posts/smart-watch-2025.html" },
    { title: "Sonos Arc Soundbar Review - Best Premium Soundbar 2025", description: "Sonos Arc soundbar review with Dolby Atmos, 11 speakers, Trueplay tuning, voice control.", category: "Audio", url: "Posts/sonos-arc-soundbar.html" },
    { title: "Sony A7 IV Review - Professional Full-Frame Camera 2025", description: "Sony A7 IV review: Professional 33MP full-frame mirrorless camera with 4K 60p video.", category: "Cameras", url: "Posts/sony-a7-iv-camera.html" },
    { title: "Sony A7R V Camera Review", description: "Sony A7R V Camera review: 61MP sensor, 8K video, AI autofocus.", category: "Cameras", url: "Posts/sony-a7r-v-camera.html" },
    { title: "Sony WF-1000XM6 Review 2025 - Best Noise Cancelling Earbuds", description: "Sony WF-1000XM6 review 2025 - Industry-leading wireless earbuds with best-in-class noise cancellation.", category: "Audio", url: "Posts/sony-wf-1000xm6.html" },
    { title: "Sony WH-1000XM5 Headphones 2025 Review - Best Noise Cancelling", description: "Sony WH-1000XM5 Review: Industry-leading noise cancellation, 30-hour battery, superior sound quality.", category: "Audio", url: "Posts/sony-wh-1000xm5.html" },
    { title: "TAGRY X08 Bluetooth Headphones Review - 60H Playtime Wireless Earbuds 2025", description: "TAGRY X08 Bluetooth headphones review with 60-hour battery life, wireless charging, and IPX5 waterproof rating.", category: "Audio", url: "Posts/tagry-x08-headphones.html" },
    { title: "Tile Pro Bluetooth Tracker Review - Best Item Finder 2025", description: "Tile Pro Bluetooth tracker review with 400-foot range, replaceable battery, and loud ring.", category: "Trackers", url: "Posts/tile-pro-tracker.html" },
    { title: "Vitamix A3500 Ascent Blender Review - Best Premium Blender 2025", description: "Vitamix A3500 Ascent blender review with self-detect technology, touchscreen controls, variable speed.", category: "Kitchen", url: "Posts/vitamix-a3500-ascent.html" },
    { title: "WYZE Cam v4 Review - Best Smart Home Security Camera 2025", description: "WYZE Cam v4 security camera review covering video quality, night vision, AI detection.", category: "Cameras", url: "Posts/wyze-cam-v4.html" },
    { title: "Xbox Wireless Controller Review - Ultimate Gaming Control", description: "Xbox Wireless Controller review analyzing ergonomics, battery life, and compatibility.", category: "Gaming", url: "Posts/xbox-controller.html" },
    { title: "Sony A95L 77-inch QD-OLED TV Review 2025 - Ultimate Premium Display", description: "Sony A95L 77-inch QD-OLED TV with Quantum Dot OLED technology, XR Cognitive Processor, and perfect blacks.", category: "Premium TVs", url: "Posts/sony-a95l-qd-oled-77.html" },
    { title: "Alienware Aurora R16 Gaming Desktop Review 2025 - Ultimate Gaming PC", description: "Alienware Aurora R16 with Intel Core i9-14900KF, NVIDIA RTX 4090, 64GB RAM, and liquid cooling.", category: "Gaming Desktops", url: "Posts/alienware-aurora-r16.html" },
    { title: "GoPro HERO 12 Black Review 2025 - Ultimate Action Camera", description: "GoPro HERO 12 Black with 5.3K60 video, HyperSmooth 6.0 stabilization, and HDR capture.", category: "Action Cameras", url: "Posts/gopro-hero-12-black.html" },
    { title: "Theragun PRO Plus Review 2025 - Premium Wellness & Fitness", description: "Theragun PRO Plus premium massage gun for muscle recovery and pain relief.", category: "Wellness & Fitness", url: "Posts/theragun-pro-plus.html" },
    { title: "Elgato Stream Deck XL Review 2025 - Premium Streaming Gear", description: "Elgato Stream Deck XL with 32 customizable keys for streamers and content creators.", category: "Streaming Gear", url: "Posts/elgato-stream-deck-xl.html" },
    { title: "Netgear Nighthawk RAXE500 Review 2025 - Premium Networking", description: "Netgear Nighthawk RAXE500 tri-band Wi-Fi 6E router with blazing fast speeds.", category: "Networking", url: "Posts/netgear-nighthawk-raxe500.html" },
    { title: "Philips Hue Play HDMI Sync Box Review 2025 - Premium Smart Home", description: "Philips Hue Play HDMI Sync Box syncs your lights with on-screen content for immersive entertainment.", category: "Smart Home", url: "Posts/philips-hue-play-sync-box.html" },
    { title: "Anker SOLIX F3800 Power Station Review 2025 - Premium Power & Energy", description: "Anker SOLIX F3800 portable power station with massive capacity for home backup and outdoor adventures.", category: "Power & Energy", url: "Posts/anker-solix-f3800.html" },
    { title: "Beats Studio Pro Wireless Headphones Review 2025 - Premium Audio", description: "Beats Studio Pro wireless headphones with active noise cancellation and premium sound quality.", category: "Audio", url: "Posts/beats-studio-pro.html" },
    { title: "Bose Ultra Open Earbuds Review 2025 - Premium Audio", description: "Bose Ultra Open Earbuds with unique open-ear design and exceptional sound quality.", category: "Audio", url: "Posts/bose-ultra-open-earbuds.html" }
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
    if (!productsGrid) return; // Exit if element doesn't exist

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
    if (!cartCount) return; // Exit if element doesn't exist
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
    const closeSearch = document.getElementById('close-search');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const clearSearch = document.getElementById('clear-search');

    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            searchModal.classList.add('active');
            setTimeout(() => searchInput.focus(), 100);
        });
    }

    if (closeSearch) {
        closeSearch.addEventListener('click', function() {
            searchModal.classList.remove('active');
            searchInput.value = '';
            clearSearch.style.display = 'none';
            showSearchPlaceholder();
        });
    }

    if (searchModal) {
        searchModal.addEventListener('click', function(e) {
            if (e.target === searchModal) {
                searchModal.classList.remove('active');
                searchInput.value = '';
                clearSearch.style.display = 'none';
                showSearchPlaceholder();
            }
        });
    }

    if (clearSearch) {
        clearSearch.addEventListener('click', function() {
            searchInput.value = '';
            clearSearch.style.display = 'none';
            searchInput.focus();
            showSearchPlaceholder();
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.trim();

            if (query.length > 0) {
                clearSearch.style.display = 'block';
                performSearch(query);
            } else {
                clearSearch.style.display = 'none';
                showSearchPlaceholder();
            }
        });

        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                searchModal.classList.remove('active');
                searchInput.value = '';
                clearSearch.style.display = 'none';
                showSearchPlaceholder();
            }
        });
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

// Search helper functions
function showSearchPlaceholder() {
    const searchResults = document.getElementById('search-results');
    if (searchResults) {
        searchResults.innerHTML = `
            <div class="search-placeholder">
                <i class="fas fa-search"></i>
                <p>Start typing to search through 84 product reviews...</p>
            </div>
        `;
    }
}

function performSearch(query) {
    const searchResults = document.getElementById('search-results');
    if (!searchResults) return;

    const lowerQuery = query.toLowerCase();

    // Filter products based on title, description, and category
    const results = searchProducts.filter(product => {
        return product.title.toLowerCase().includes(lowerQuery) ||
               product.description.toLowerCase().includes(lowerQuery) ||
               product.category.toLowerCase().includes(lowerQuery);
    });

    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="search-no-results">
                <i class="fas fa-search"></i>
                <p>No products found for "${query}"</p>
                <p class="search-hint">Try searching for: MacBook, iPhone, headphones, camera, etc.</p>
            </div>
        `;
        return;
    }

    // Limit to 10 results for better UX
    const limitedResults = results.slice(0, 10);

    searchResults.innerHTML = `
        <div class="search-results-header">
            <p>Found ${results.length} product${results.length !== 1 ? 's' : ''}</p>
        </div>
        <div class="search-results-list">
            ${limitedResults.map(product => `
                <a href="${product.url}" class="search-result-item">
                    <div class="search-result-content">
                        <h4 class="search-result-title">${highlightText(product.title, query)}</h4>
                        <p class="search-result-description">${truncateText(product.description, 120)}</p>
                        <span class="search-result-category">${product.category}</span>
                    </div>
                    <div class="search-result-icon">
                        <i class="fas fa-arrow-right"></i>
                    </div>
                </a>
            `).join('')}
        </div>
        ${results.length > 10 ? `<div class="search-results-footer"><p>Showing top 10 of ${results.length} results</p></div>` : ''}
    `;
}

function highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
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
