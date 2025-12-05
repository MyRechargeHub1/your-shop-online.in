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
    { title: "3-in-1 Wireless Charging Station Review - iPhone, Apple Watch, AirPods 2025", description: "3-in-1 wireless charging station review for iPhone 16/15, Apple Watch, and AirPods. Fast charging dock with MagSafe compatibility tested for 2025 - Perfect for US shoppers.", category: "Smartphones", url: "Posts/3in1-charging-station.html" },
    { title: "Apple AirPods Pro 2 Review - Premium Wireless Earbuds | Your Shop Online", description: "Apple AirPods Pro 2 review with detailed analysis of active noise cancellation, sound quality, and battery life. Find out why they're the best wireless earbuds - Perfect for US shoppers.", category: "Audio", url: "Posts/airpods-pro-2.html" },
    { title: "Alienware Aurora R16 Gaming Desktop Review 2025 - Ultimate Gaming PC | Your Shop Online", description: "Alienware Aurora R16 gaming desktop review 2025 - Ultimate gaming PC with Intel Core i9-14900KF, NVIDIA RTX 4090, 64GB RAM, and liquid cooling. Best premium gaming computer for US gamers.", category: "Gaming", url: "Posts/alienware-aurora-r16.html" },
    { title: "Amazon Echo Hub Review 2025 - Smart Home Control Center | Your Shop Online", description: "Amazon Echo Hub review 2025 - The ultimate smart home control panel with 8-inch touchscreen, Matter support, and Alexa integration. Complete buyer's guide for US shoppers.", category: "Smart Home", url: "Posts/amazon-echo-hub.html" },
    { title: "Anker 20K mAh Power Bank Review - Reliable Portable Power | Your Shop Online", description: "Anker 20K mAh power bank review testing charging speed, capacity, and build quality. Find the best portable charger for your devices in 2024 - Perfect for US shoppers.", category: "Power & Charging", url: "Posts/anker-power-bank.html" },
    { title: "Anker PowerCore 26800 Review - Best Portable Charger 2025", description: "Anker PowerCore 26800 portable charger review with fast charging, triple ports, and massive capacity. Best power bank for travel and daily use in 2025 - Perfect for US shoppers.", category: "Products", url: "Posts/anker-powercore-26800.html" },
    { title: "Anker SOLIX F3800 Review: Ultimate 3840Wh Portable Power Station", description: "Comprehensive Anker SOLIX F3800 review: 3840Wh portable power station with 6000W output, expandable capacity, and ultra-fast charging for home backup and outdoor adventures.", category: "Power & Energy", url: "Posts/anker-solix-f3800.html" },
    { title: "Anker USB-C Hub 7-in-1 Review - Best Laptop Adapter 2025 | Your Shop Online", description: "Anker 7-in-1 USB-C hub review with HDMI 4K, USB 3.0 ports, and SD card reader. Best portable adapter for MacBook Pro, iPad Pro, and laptops.", category: "Laptops", url: "Posts/anker-usb-c-hub.html" },
    { title: "Apple AirTag 4 Pack Review - Smart Item Tracking | Your Shop Online", description: "Apple AirTag 4 Pack review detailing tracking accuracy, battery life, and setup process. Complete guide to Apple's item tracking solution for 2024 - Perfect for US shoppers.", category: "Trackers", url: "Posts/apple-airtag.html" },
    { title: "Apple HomePod 2 Review 2025 - Premium Audio Excellence | Your Shop Online", description: "Apple HomePod 2 review 2025 - Premium smart speaker with exceptional audio, Siri integration, and smart home hub capabilities. Complete buyer's guide for US shoppers.", category: "Audio", url: "Posts/apple-homepod-2.html" },
    { title: "Apple Vision Pro Review 2025 - Revolutionary Spatial Computing | Your Shop Online", description: "Apple Vision Pro review for 2025 - Revolutionary spatial computing headset with stunning display, immersive experiences, and seamless Apple ecosystem integration. Complete buyer's guide for US shoppers.", category: "Products", url: "Posts/apple-vision-pro.html" },
    { title: "Apple Watch SE (2nd Gen) 2025 Review - Best Value Smartwatch", description: "Apple Watch SE 2025 Review: GPS tracking, heart rate monitoring, crash detection, and 50m water resistance. Best affordable Apple smartwatch at $249. Full specs and buying guide - Perfect for US shoppers.", category: "Wearables", url: "Posts/apple-watch-se.html" },
    { title: "Apple Watch Ultra 2 Review - Premium Adventure Smartwatch 2025 | Your Shop Online", description: "Apple Watch Ultra 2 review: Premium titanium smartwatch with 49mm display, dual-frequency GPS, dive computer to 100m, and extreme battery life. Perfect for athletes and adventurers in the US.", category: "Wearables", url: "Posts/apple-watch-ultra-2.html" },
    { title: "Asus ROG Zephyrus G16 Review - Best Gaming Laptop 2025 | Your Shop Online", description: "Asus ROG Zephyrus G16 review with Intel Core Ultra 9, RTX 4070, 240Hz OLED display, and premium design. Best gaming laptop 2025 - Perfect for US gamers and creators.", category: "Gaming", url: "Posts/asus-rog-zephyrus-g16.html" },
    { title: "Beats Studio Pro Wireless Headphones Review 2025 - Premium Audio | Your Shop Online", description: "Beats Studio Pro review 2025: Premium wireless headphones with lossless USB-C audio, personalized spatial audio, active noise cancelling, 40-hour battery life, and custom 40mm drivers.", category: "Audio", url: "Posts/beats-studio-pro.html" },
    { title: "BENGOO G9000 Gaming Headset Review - Budget Gaming Excellence | Your Shop Online", description: "BENGOO G9000 gaming headset review covering sound quality, microphone performance, and comfort. Is this budget gaming headset worth buying in 2024? - Perfect for US shoppers.", category: "Gaming", url: "Posts/bengoo-g9000.html" },
    { title: "Blink Video Doorbell 2025 Review - Best Budget Smart Doorbell", description: "Blink Video Doorbell Review: 1080p HD video, two-year battery life, two-way audio, motion detection. Best affordable smart doorbell at $59.99. Complete guide - Perfect for US shoppers.", category: "Smart Home", url: "Posts/blink-video-doorbell.html" },
    { title: "Bose QuietComfort Ultra Headphones Review 2025 - Ultimate Noise Cancellation", description: "Comprehensive Bose QuietComfort Ultra Headphones review 2025. Expert analysis of world-class noise cancellation, Immersive Audio, and premium comfort. US buyers guide.", category: "Audio", url: "Posts/bose-quietcomfort-ultra-headphones.html" },
    { title: "Bose Ultra Open Earbuds Review 2025 - Premium Audio | Your Shop Online", description: "Bose Ultra Open Earbuds review 2025: Revolutionary open-ear design with Immersive Audio, 7.5-hour battery, IPX4 water resistance, and premium comfort. Experience sound without blocking your ears.", category: "Audio", url: "Posts/bose-ultra-open-earbuds.html" },
    { title: "Bowers & Wilkins Px8 Review - Audiophile Wireless Headphones 2025 | Your Shop Online", description: "Bowers & Wilkins Px8 review: Premium wireless headphones with carbon fiber construction, 40mm drivers, adaptive ANC, and audiophile sound quality. Perfect for music lovers in the US.", category: "Audio", url: "Posts/bowers-wilkins-px8.html" },
    { title: "Breville Barista Express Review - Best Home Espresso Machine 2025 | Your Shop Online", description: "Breville Barista Express espresso machine review with built-in grinder, 15-bar Italian pump, and precise temperature control. Best home espresso machine 2025 - Perfect for US shoppers.", category: "Kitchen", url: "Posts/breville-barista-express.html" },
    { title: "Canon EOS R6 Mark II Review - Best Pro Mirrorless Camera 2025 | Your Shop Online", description: "Canon EOS R6 Mark II review with 24.2MP full-frame sensor, 40fps burst shooting, 6K video, and incredible autofocus. Best professional mirrorless camera 2025 - Perfect for US photographers.", category: "Cameras", url: "Posts/canon-eos-r6-mark-ii.html" },
    { title: "Dell XPS 17 (2025) Review - Premium Windows Powerhouse | Your Shop Online", description: "Dell XPS 17 2025 review - Premium Windows laptop with stunning 17-inch 4K OLED display, Intel Core Ultra processors, and professional-grade performance. Complete buyer's guide for US shoppers.", category: "Products", url: "Posts/dell-xps-17-2025.html" },
    { title: "DeLonghi La Specialista Maestro Review - Premium Espresso 2025 | Your Shop Online", description: "DeLonghi La Specialista Maestro review: Premium espresso machine with LatteArt System, Smart Tamping Station, dual heating, and bean-to-cup convenience. Perfect for espresso enthusiasts in the US.", category: "Kitchen", url: "Posts/delonghi-specialista-maestro.html" },
    { title: "DJI Mini 4 Pro Review - Best Compact Drone 2025 | Your Shop Online", description: "DJI Mini 4 Pro review with 4K/60fps HDR, omnidirectional obstacle avoidance, 34-min flight time, and advanced intelligent features. Best compact drone 2025 - Perfect for US aerial photographers.", category: "Drones", url: "Posts/dji-mini-4-pro.html" },
    { title: "Dyson Purifier Hot+Cool HP07 Review - Best Air Purifier 2025 | Your Shop Online", description: "Dyson Purifier Hot+Cool HP07 review with HEPA filtration, heating, cooling, and air quality monitoring. Best all-in-one air treatment for 2025 - Perfect for US shoppers.", category: "Home Appliances", url: "Posts/dyson-purifier-hot-cool.html" },
    { title: "Dyson V15 Detect Review - Best Cordless Vacuum 2025 | Your Shop Online", description: "Dyson V15 Detect cordless vacuum review with laser dust detection, HEPA filtration, and powerful suction. Best cordless vacuum for 2025 - Perfect for US shoppers.", category: "Home Appliances", url: "Posts/dyson-v15-detect.html" },
    { title: "Echo Dot 5th Gen Review - Best Alexa Smart Speaker 2025 | Your Shop Online", description: "Echo Dot 5th Generation review covering sound quality, Alexa features, and smart home control. Best affordable smart speaker with improved audio - Perfect for US shoppers.", category: "Audio", url: "Posts/echo-dot-5th-gen.html" },
    { title: "Elgato Stream Deck XL Review 2025 - Premium Streaming Gear | Your Shop Online", description: "Elgato Stream Deck XL review 2025: 32 customizable LCD keys, plugin marketplace, multi-action support, and seamless streaming integration. Ultimate control for creators and streamers.", category: "Streaming Gear", url: "Posts/elgato-stream-deck-xl.html" },
    { title: "Amazon Fire TV Stick 4K Max 2025 Review - Ultimate Streaming", description: "Fire TV Stick 4K Max Review: Alexa voice control, Wi-Fi 6E, cloud gaming, 4K HDR streaming. Best Amazon streaming device at $59.99. Full buying guide - Perfect for US shoppers.", category: "Displays", url: "Posts/fire-tv-stick-4k.html" },
    { title: "Fitbit Inspire 3 Review - Complete Fitness Tracker | Your Shop Online", description: "Fitbit Inspire 3 fitness tracker review covering health monitoring, battery life, and app features. Discover if this affordable tracker meets your needs - Perfect for US shoppers.", category: "Trackers", url: "Posts/fitbit-inspire-3.html" },
    { title: "Samsung Galaxy Tab A9+ Review - Best Budget Android Tablet | Your Shop Online", description: "Samsung Galaxy Tab A9+ review testing performance, display, and battery life. Is this budget Android tablet worth buying? Complete guide and analysis - Perfect for US shoppers.", category: "Smartphones", url: "Posts/galaxy-tab-a9.html" },
    { title: "GoPro HERO 12 Black Review 2025 - Ultimate Action Camera | Your Shop Online", description: "GoPro HERO 12 Black review 2025 - The ultimate action camera with 5.3K60 video, HyperSmooth 6.0 stabilization, HDR photo and video. Best action cam for US adventurers and content creators.", category: "Cameras", url: "Posts/gopro-hero-12-black.html" },
    { title: "Herman Miller Embody Gaming Chair Review - Best Premium Gaming Chair 2025 | Your Shop Online", description: "Herman Miller x Logitech Embody Gaming Chair review with advanced ergonomics, pixelated support, cooling foam, and 12-year warranty. Best premium gaming chair 2025 - Perfect for US gamers.", category: "Gaming", url: "Posts/herman-miller-embody-gaming.html" },
    { title: "Instant Pot Duo 7-in-1 2025 Review - Best Multi-Cooker", description: "Instant Pot Duo Review: 7-in-1 multi-cooker, pressure cooker, slow cooker, rice cooker. Best kitchen appliance at $99.99. Complete cooking guide included - Perfect for US shoppers.", category: "Kitchen", url: "Posts/instant-pot-duo.html" },
    { title: "Apple iPad 11-inch Review - Ultimate Tablet Experience | Your Shop Online", description: "Apple iPad 11-inch with A16 chip review covering performance, display quality, and features. Complete analysis of Apple's latest tablet for 2024 - Perfect for US shoppers.", category: "Tablets", url: "Posts/ipad-11-inch.html" },
    { title: "iPad Pro 12.9-inch M2 Review - Best Premium Tablet 2025 | Your Shop Online", description: "iPad Pro 12.9-inch M2 review with desktop-class M2 chip, stunning Liquid Retina XDR display, Apple Pencil hover, and all-day battery life. Best premium tablet 2025 - Perfect for US shoppers.", category: "Tablets", url: "Posts/ipad-pro-12-9-m2.html" },
    { title: "iPhone 16 Pro Max Review 2025 - Ultimate Flagship Smartphone | Your Shop Online", description: "iPhone 16 Pro Max review 2025 - Apple's ultimate flagship with A18 Pro chip, titanium design, advanced camera system with 5x telephoto, ProMotion 120Hz display, and iOS 18. The best iPhone ever made for power users in the United States.", category: "Smartphones", url: "Posts/iphone-16-pro-max.html" },
    { title: "iRobot Roomba j7+ Review - Best Self-Emptying Robot Vacuum 2025 | Your Shop Online", description: "iRobot Roomba j7+ review with self-emptying base, advanced obstacle avoidance, and smart mapping technology. Best premium robot vacuum for 2025 - Perfect for US shoppers.", category: "Home Appliances", url: "Posts/irobot-roomba-j7.html" },
    { title: "JBL Flip 6 Portable Speaker 2025 Review - Best Waterproof Bluetooth Speaker", description: "JBL Flip 6 Review: Waterproof IP67 rating, 12-hour battery, powerful bass, PartyBoost feature. Best portable speaker at $129.99. Complete audio guide - Perfect for US shoppers.", category: "Audio", url: "Posts/jbl-flip-6.html" },
    { title: "Keychron Q1 Pro Review - Best Premium Mechanical Keyboard 2025 | Your Shop Online", description: "Keychron Q1 Pro mechanical keyboard review with hot-swappable switches, wireless connectivity, and premium aluminum build. Best custom keyboard for 2025 - Perfect for US shoppers.", category: "Accessories", url: "Posts/keychron-q1-pro.html" },
    { title: "Amazon Kindle Paperwhite 16GB (2024) Review - Best E-Reader", description: "Kindle Paperwhite 2024 Review: 16GB storage, 6.8-inch glare-free display, 10-week battery, waterproof design. Best e-reader for book lovers at $149. Complete buying guide - Perfect for US shoppers.", category: "E-Readers", url: "Posts/kindle-paperwhite.html" },
    { title: "KitchenAid Pro Line Stand Mixer Review - Professional Baking 2025 | Your Shop Online", description: "KitchenAid Pro Line Stand Mixer review: Professional 7-quart stand mixer with 1.3HP motor, 11 speeds, and premium design. Perfect for serious bakers and home chefs in the US.", category: "Kitchen", url: "Posts/kitchenaid-pro-line-mixer.html" },
    { title: "LG 27-Inch 4K UHD Monitor Review - Best Display for Professionals 2025 | Your Shop Online", description: "LG 27-inch 4K UHD Monitor review with HDR10 support, USB-C connectivity, and professional color accuracy. Best monitor for creative professionals in 2025.", category: "Displays", url: "Posts/lg-27-4k-monitor.html" },
    { title: "LG C3 OLED 65-inch TV Review - Best Premium OLED TV 2025 | Your Shop Online", description: "LG C3 OLED 65-inch TV review with self-lit pixels, perfect blacks, 120Hz gaming, α9 AI processor, and webOS 23. Best premium OLED TV 2025 - Perfect for US home theaters.", category: "Displays", url: "Posts/lg-c3-oled-65.html" },
    { title: "Logitech G502 HERO Gaming Mouse Review - Precision Gaming | Your Shop Online", description: "Logitech G502 HERO gaming mouse review with analysis of sensor accuracy, customization options, and ergonomics. The ultimate precision gaming mouse tested - Perfect for US shoppers.", category: "Gaming", url: "Posts/logitech-g502.html" },
    { title: "Logitech MX Master 3S Review - Best Productivity Mouse 2025 | Your Shop Online", description: "Logitech MX Master 3S review with silent clicks, 8K DPI sensor, and multi-device connectivity. Best productivity mouse for professionals in 2025 - Perfect for US shoppers.", category: "Accessories", url: "Posts/logitech-mx-master-3s.html" },
    { title: "MacBook Pro 16-inch M3 Max Review 2025 - Professional Powerhouse", description: "Comprehensive MacBook Pro 16-inch M3 Max review 2025. Expert analysis of performance, display, battery life, and value for creative professionals. US buyers guide.", category: "Laptops", url: "Posts/macbook-pro-16-m3-max.html" },
    { title: "MacBook Pro 16-inch M3 Max Review - Best Pro Laptop 2025 | Your Shop Online", description: "MacBook Pro 16-inch M3 Max review with exceptional performance, stunning Liquid Retina XDR display, and up to 22 hours battery. Best professional laptop 2025 - Perfect for US shoppers.", category: "Laptops", url: "Posts/macbook-pro-16-m3.html" },
    { title: "MacBook Pro 16-inch M4 Max Review 2025 - Ultimate Creative Powerhouse | Your Shop Online", description: "MacBook Pro 16-inch M4 Max review for 2025 - Apple's most powerful laptop with next-gen performance, stunning Liquid Retina XDR display, and all-day battery. Complete buyer's guide for US shoppers.", category: "Laptops", url: "Posts/macbook-pro-16-m4-max.html" },
    { title: "Meta Quest 3 Review 2025 - Ultimate Mixed Reality Gaming | Your Shop Online", description: "Meta Quest 3 review 2025 - Premium mixed reality headset with breakthrough passthrough, powerful performance, and vast game library. Complete buyer's guide for US shoppers.", category: "Gaming", url: "Posts/meta-quest-3.html" },
    { title: "Meta Quest 3S 128GB Review - The Ultimate VR Experience | Your Shop Online", description: "Complete Meta Quest 3S 128GB review covering performance, visual quality, and gaming experience. Discover why it's the best standalone VR headset in 2024 - Perfect for US shoppers.", category: "VR/AR", url: "Posts/meta-quest-3s.html" },
    { title: "Microsoft Surface Laptop Studio 2 Review - Best Creative Workstation 2025 | Your Shop Online", description: "Microsoft Surface Laptop Studio 2 review with 13th Gen Intel Core i7, NVIDIA RTX 4060, unique convertible design, and vibrant PixelSense touchscreen. Best creative workstation 2025 - Perfect for US shoppers.", category: "Laptops", url: "Posts/microsoft-surface-laptop-studio-2.html" },
    { title: "Microsoft Surface Pro 10 Review 2025 - Ultimate 2-in-1 Tablet | Your Shop Online", description: "Microsoft Surface Pro 10 review 2025 - Premium 2-in-1 tablet with Intel Core Ultra, OLED display option, Copilot+ AI features, and versatile design. Complete buyer's guide for US shoppers.", category: "Tablets", url: "Posts/microsoft-surface-pro-10.html" },
    { title: "Nespresso Creatista Plus Review - Barista-Quality Espresso 2025 | Your Shop Online", description: "Nespresso Creatista Plus review: Premium espresso machine with automatic steam wand, 8 coffee styles, barista-quality results, and sleek stainless steel design. Perfect for coffee lovers in the US.", category: "Kitchen", url: "Posts/nespresso-creatista-plus.html" },
    { title: "Netgear Nighthawk RAXE500 Review 2025 - Premium Networking | Your Shop Online", description: "Netgear Nighthawk RAXE500 review 2025: Wi-Fi 6E tri-band router with 6GHz band, 10.8 Gbps speeds, 8-stream connectivity, 2.5G ethernet, and coverage for 3,500 sq ft. Ultimate gaming and streaming router.", category: "Products", url: "Posts/netgear-nighthawk-raxe500.html" },
    { title: "Ninja Air Fryer Pro 2025 Review - Best Air Fryer for Healthy Cooking", description: "Ninja Air Fryer Pro Review: 5-quart capacity, 400°F heat, healthier cooking with 75% less fat. Best air fryer at $119.99. Complete cooking guide included - Perfect for US shoppers.", category: "Kitchen", url: "Posts/ninja-air-fryer.html" },
    { title: "Ninja Foodi Smart XL Grill Review 2025 - 6-in-1 Indoor Grill", description: "Comprehensive Ninja Foodi Smart XL Grill review 2025. Expert analysis of Cyclonic Grilling Technology, 6-in-1 cooking modes, and Smart Cook System. US buyers guide with pros, cons, and recipes.", category: "Kitchen", url: "Posts/ninja-foodi-smart-xl-grill.html" },
    { title: "Peloton Bike+ Review - Premium Connected Fitness 2025 | Your Shop Online", description: "Peloton Bike+ review: Premium exercise bike with auto-follow resistance, rotating 23.8-inch HD touchscreen, immersive live and on-demand classes. Perfect for home fitness enthusiasts in the US.", category: "Fitness", url: "Posts/peloton-bike-plus.html" },
    { title: "Philips Hue Play HDMI Sync Box Review 2025 - Premium Smart Home | Your Shop Online", description: "Philips Hue Play HDMI Sync Box review 2025: 4K 120Hz HDMI sync box with 4 inputs, Dolby Vision, HDR10+, gradient lightstrip support, and intelligent entertainment sync modes. Transform your viewing experience with immersive lighting.", category: "Smart Home", url: "Posts/philips-hue-play-sync-box.html" },
    { title: "Razer Blade 15 2024 Review - Premium Gaming Laptop | Your Shop Online", description: "Razer Blade 15 2024 review: Premium gaming laptop with 14th Gen Intel Core i9, RTX 4070, QHD 240Hz display, and sleek aluminum design. Perfect for gamers and creators in the US.", category: "Gaming", url: "Posts/razer-blade-15-2024.html" },
    { title: "Ring Video Doorbell Pro 2 Review - Best Smart Doorbell 2025 | Your Shop Online", description: "Ring Video Doorbell Pro 2 review with 1536p HD video, 3D motion detection, and Alexa integration. Best smart doorbell for home security in 2025 - Perfect for US shoppers.", category: "Smart Home", url: "Posts/ring-doorbell-pro-2.html" },
    { title: "Roku Streaming Stick 4K Plus 2025 Review - Best Streaming Device", description: "Roku Streaming Stick 4K Plus Review: 4K HDR streaming, voice remote, 500+ channels, and private listening. Best streaming stick at $49.99. Complete guide - Perfect for US shoppers.", category: "Streaming Devices", url: "Posts/roku-streaming-stick.html" },
    { title: "iRobot Roomba 694 2025 Review - Best Entry-Level Robot Vacuum", description: "Roomba 694 Review: Smart mapping, app control, automatic charging, 3-stage cleaning system. Best affordable robot vacuum at $274.99. Complete buying guide - Perfect for US shoppers.", category: "Home Appliances", url: "Posts/roomba-694.html" },
    { title: "Samsung The Frame 65 Review - Art-Inspired QLED TV 2025 | Your Shop Online", description: "Samsung The Frame 65-inch QLED TV review: Art-inspired 4K TV with Quantum Dot technology, Art Mode, customizable bezels, anti-reflection screen. Perfect for design-conscious home theater in the US.", category: "Displays", url: "Posts/samsung-frame-tv-65.html" },
    { title: "Samsung Galaxy S24 Ultra Review - Best Flagship Phone 2025 | Your Shop Online", description: "Samsung Galaxy S24 Ultra review with revolutionary AI features, powerful Snapdragon 8 Gen 3 processor, stunning 200MP camera, and integrated S Pen. Best flagship smartphone 2025 - Perfect for US shoppers.", category: "Smartphones", url: "Posts/samsung-galaxy-s24-ultra.html" },
    { title: "Samsung Galaxy S25 Ultra Review 2025 - Ultimate Android Flagship | Your Shop Online", description: "Samsung Galaxy S25 Ultra review 2025 - The ultimate Android flagship with 200MP camera, S Pen, AI features, and Snapdragon 8 Gen 4 power. Complete buyer's guide for US shoppers.", category: "Smartphones", url: "Posts/samsung-galaxy-s25-ultra.html" },
    { title: "Samsung Galaxy Z Fold 6 Review 2025 - Ultimate Foldable Smartphone | Your Shop Online", description: "Samsung Galaxy Z Fold 6 review 2025 - The ultimate foldable smartphone with 7.6-inch Dynamic AMOLED display, S Pen support, and powerful performance. Complete buyer's guide for US shoppers.", category: "Smartphones", url: "Posts/samsung-galaxy-z-fold-6.html" },
    { title: "Samsung Odyssey OLED G9 Review - Ultimate Gaming Monitor 2025 | Your Shop Online", description: "Samsung Odyssey OLED G9 review: Ultra-wide 49-inch OLED gaming monitor with 240Hz refresh rate, 0.03ms response time, 1800R curve, and stunning HDR. Perfect for immersive gaming in the US.", category: "Gaming", url: "Posts/samsung-odyssey-oled-g9.html" },
    { title: "Secretlab TITAN Evo 2022 Review - Best Premium Gaming Chair 2025 | Your Shop Online", description: "Secretlab TITAN Evo 2022 gaming chair review with premium ergonomics, adjustable lumbar support, and luxury materials. Best gaming chair for 2025 - Perfect for US shoppers.", category: "Gaming", url: "Posts/secretlab-titan-evo.html" },
    { title: "Smart Watch 2025 Review - Best Fitness Tracker with Heart Rate Monitor", description: "Comprehensive smart watch review with heart rate monitoring, sleep tracking, and 100+ sport modes. Best affordable fitness smartwatch for 2025 - Perfect for US shoppers.", category: "Wearables", url: "Posts/smart-watch-2025.html" },
    { title: "Sonos Arc Soundbar Review - Best Premium Soundbar 2025 | Your Shop Online", description: "Sonos Arc soundbar review with Dolby Atmos, 11 speakers, Trueplay tuning, voice control, and seamless multi-room audio. Best premium soundbar 2025 - Perfect for US home theaters.", category: "Audio", url: "Posts/sonos-arc-soundbar.html" },
    { title: "Sony A7 IV Review - Professional Full-Frame Camera 2025 | Your Shop Online", description: "Sony A7 IV review: Professional 33MP full-frame mirrorless camera with 4K 60p video, 10fps burst shooting, advanced Real-time Eye AF, and exceptional image quality. Perfect for pro photographers in the US.", category: "Cameras", url: "Posts/sony-a7-iv-camera.html" },
    { title: "Sony A7R V Review: 61MP Full-Frame Mirrorless Masterpiece", description: "In-depth Sony A7R V review: 61MP full-frame mirrorless camera with AI autofocus, 8K video, 8-stop IBIS, and revolutionary sensor technology for professional photographers.", category: "Cameras", url: "Posts/sony-a7r-v-camera.html" },
    { title: "Sony A95L 77-inch QD-OLED TV Review 2025 - Ultimate Premium Display | Your Shop Online", description: "Sony A95L 77-inch QD-OLED TV review 2025 - The ultimate premium TV with Quantum Dot OLED technology, XR Cognitive Processor, 4K 120Hz gaming, and perfect blacks. Best high-end television for US home theaters.", category: "Displays", url: "Posts/sony-a95l-qd-oled-77.html" },
    { title: "Sony WF-1000XM6 Review 2025 - Best Noise Cancelling Earbuds | Your Shop Online", description: "Sony WF-1000XM6 review 2025 - Industry-leading wireless earbuds with best-in-class noise cancellation, exceptional sound quality, and premium features. Complete buyer's guide for US shoppers.", category: "Audio", url: "Posts/sony-wf-1000xm6.html" },
    { title: "Sony WH-1000XM5 Headphones 2025 Review - Best Noise Cancelling", description: "Sony WH-1000XM5 Review: Industry-leading noise cancellation, 30-hour battery, superior sound quality. Best premium headphones at $398. Complete guide - Perfect for US shoppers.", category: "Audio", url: "Posts/sony-wh-1000xm5.html" },
    { title: "Sony WH-1000XM5 Review - Best Noise Canceling Headphones 2025 | Your Shop Online", description: "Sony WH-1000XM5 review - Industry-leading noise cancellation, exceptional sound quality, and 30-hour battery life. Best premium headphones 2025 - Perfect for US shoppers.", category: "Audio", url: "Posts/sony-wh1000xm5.html" },
    { title: "TAGRY X08 Bluetooth Headphones Review - 60H Playtime Wireless Earbuds 2025", description: "TAGRY X08 Bluetooth headphones review with 60-hour battery life, wireless charging, and IPX5 waterproof rating. Best budget earbuds for 2025 tested - Perfect for US shoppers.", category: "Audio", url: "Posts/tagry-x08-headphones.html" },
    { title: "Theragun PRO Plus Review 2025 - Premium Wellness & Fitness | Your Shop Online", description: "Theragun PRO Plus review 2025: Professional-grade percussion massage device with 60 lbs force, 16mm amplitude, biometric sensor, rotating arm, 6 attachments, and 150-minute battery. Ultimate recovery tool for athletes.", category: "Wellness & Fitness", url: "Posts/theragun-pro-plus.html" },
    { title: "Tile Pro Bluetooth Tracker Review - Best Item Finder 2025 | Your Shop Online", description: "Tile Pro Bluetooth tracker review with 400-foot range, replaceable battery, and loud ring. Best alternative to AirTag for Android and iPhone users - Perfect for US shoppers.", category: "Trackers", url: "Posts/tile-pro-tracker.html" },
    { title: "Vitamix A3500 Ascent Blender Review - Best Premium Blender 2025 | Your Shop Online", description: "Vitamix A3500 Ascent blender review with self-detect technology, touchscreen controls, variable speed, 10-year warranty, and professional performance. Best premium blender 2025 - Perfect for US home chefs.", category: "Kitchen", url: "Posts/vitamix-a3500-ascent.html" },
    { title: "WYZE Cam v4 Review - Best Smart Home Security Camera 2025", description: "WYZE Cam v4 security camera review covering video quality, night vision, AI detection, and smart home integration. The best affordable security camera - Perfect for US shoppers.", category: "Cameras", url: "Posts/wyze-cam-v4.html" },
    { title: "Xbox Wireless Controller Review - Ultimate Gaming Control | Your Shop Online", description: "Xbox Wireless Controller review analyzing ergonomics, battery life, and compatibility. Is Microsoft's latest gamepad the best controller for gaming? - Perfect for US shoppers.", category: "Gaming", url: "Posts/xbox-controller.html" }
];

// Shopping Cart
let cart = [];

// Update post counter on homepage
function updatePostCount() {
    const totalPosts = searchProducts.length;

    // Update homepage counter
    const postCountElement = document.getElementById('post-count');
    if (postCountElement) {
        postCountElement.textContent = totalPosts;
    }

    // Update search modal counter
    const searchCountElement = document.getElementById('search-count');
    if (searchCountElement) {
        searchCountElement.textContent = totalPosts;
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupEventListeners();
    updateCartCount();
    updatePostCount();
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

// Handle copy link functionality for social share buttons
document.addEventListener('click', function(e) {
    if (e.target.closest('.copy-link-btn')) {
        const btn = e.target.closest('.copy-link-btn');
        const url = btn.dataset.url;
        const originalIcon = btn.innerHTML;
        
        // Function to show success feedback
        function showSuccess() {
            btn.innerHTML = '<i class="fas fa-check"></i>';
            btn.style.backgroundColor = '#10b981';
            btn.style.color = 'white';
            setTimeout(() => {
                btn.innerHTML = originalIcon;
                btn.style.backgroundColor = '';
                btn.style.color = '';
            }, 2000);
        }
        
        // Function to show error feedback
        function showError() {
            btn.innerHTML = '<i class="fas fa-times"></i>';
            btn.style.backgroundColor = '#ef4444';
            btn.style.color = 'white';
            setTimeout(() => {
                btn.innerHTML = originalIcon;
                btn.style.backgroundColor = '';
                btn.style.color = '';
            }, 2000);
        }
        
        // Try modern Clipboard API first
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(() => {
                showSuccess();
            }).catch(() => {
                // Try fallback method
                if (fallbackCopyText(url)) {
                    showSuccess();
                } else {
                    showError();
                }
            });
        } else {
            // Use fallback for older browsers
            if (fallbackCopyText(url)) {
                showSuccess();
            } else {
                showError();
            }
        }
    }
});

// Fallback copy method for older browsers
function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        return successful;
    } catch (err) {
        document.body.removeChild(textArea);
        return false;
    }
}
