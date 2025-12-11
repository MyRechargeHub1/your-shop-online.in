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
    { title: "All-Clad D5 Brushed 14-Piece Set Review 2025 | Worth $1,899?", description: "All-Clad D5 Brushed 14-Piece Cookware Set review - Premium 5-ply stainless steel cookware handcrafted in USA. Is this $1,899 set worth the investment? Our honest 2025 review for home cooks.", category: "Products", url: "Posts/all-clad-d5-brushed-14-piece.html" },
    { title: "Amazon Echo Hub Review 2025 - Smart Home Control Center | Your Shop Online", description: "Amazon Echo Hub review 2025 - The ultimate smart home control panel with 8-inch touchscreen, Matter support, and Alexa integration. Complete buyer's guide for US shoppers.", category: "Smart Home", url: "Posts/amazon-echo-hub.html" },
    { title: "Anker 20K mAh Power Bank Review - Reliable Portable Power | Your Shop Online", description: "Anker 20K mAh power bank review testing charging speed, capacity, and build quality. Find the best portable charger for your devices in 2024 - Perfect for US shoppers.", category: "Power & Charging", url: "Posts/anker-power-bank.html" },
    { title: "Anker PowerCore 26800 Review - Best Portable Charger 2025", description: "Anker PowerCore 26800 portable charger review with fast charging, triple ports, and massive capacity. Best power bank for travel and daily use in 2025 - Perfect for US shoppers.", category: "Products", url: "Posts/anker-powercore-26800.html" },
    { title: "Anker SOLIX F3800 Review: Ultimate 3840Wh Portable Power Station", description: "Comprehensive Anker SOLIX F3800 review: 3840Wh portable power station with 6000W output, expandable capacity, and ultra-fast charging for home backup and outdoor adventures.", category: "Power & Energy", url: "Posts/anker-solix-f3800.html" },
    { title: "Anker USB-C Hub 7-in-1 Review - Best Laptop Adapter 2025 | Your Shop Online", description: "Anker 7-in-1 USB-C hub review with HDMI 4K, USB 3.0 ports, and SD card reader. Best portable adapter for MacBook Pro, iPad Pro, and laptops.", category: "Laptops", url: "Posts/anker-usb-c-hub.html" },
    { title: "Anova Precision Cooker Pro Review 2025 - Ultimate Commercial Sous Vide | Your Shop Online", description: "Anova Precision Cooker Pro review for 2025 - Commercial-grade sous vide with 1200W power and precision control. Complete buyer's guide for serious home cooks in the United States.", category: "Products", url: "Posts/anova-precision-cooker-pro.html" },
    { title: "Apple AirTag 4 Pack Review - Smart Item Tracking | Your Shop Online", description: "Apple AirTag 4 Pack review detailing tracking accuracy, battery life, and setup process. Complete guide to Apple's item tracking solution for 2024 - Perfect for US shoppers.", category: "Trackers", url: "Posts/apple-airtag.html" },
    { title: "Apple HomePod 2 Review 2025 - Premium Audio Excellence | Your Shop Online", description: "Apple HomePod 2 review 2025 - Premium smart speaker with exceptional audio, Siri integration, and smart home hub capabilities. Complete buyer's guide for US shoppers.", category: "Audio", url: "Posts/apple-homepod-2.html" },
    { title: "Apple Vision Pro Review 2025 - Revolutionary Spatial Computing | Your Shop Online", description: "Apple Vision Pro review for 2025 - Revolutionary spatial computing headset with stunning display, immersive experiences, and seamless Apple ecosystem integration. Complete buyer's guide for US shoppers.", category: "Products", url: "Posts/apple-vision-pro.html" },
    { title: "Apple Watch SE (2nd Gen) 2025 Review - Best Value Smartwatch", description: "Apple Watch SE 2025 Review: GPS tracking, heart rate monitoring, crash detection, and 50m water resistance. Best affordable Apple smartwatch at $249. Full specs and buying guide - Perfect for US shoppers.", category: "Wearables", url: "Posts/apple-watch-se.html" },
    { title: "Apple Watch Ultra 2 Review - Premium Adventure Smartwatch 2025 | Your Shop Online", description: "Apple Watch Ultra 2 review: Premium titanium smartwatch with 49mm display, dual-frequency GPS, dive computer to 100m, and extreme battery life. Perfect for athletes and adventurers in the US.", category: "Wearables", url: "Posts/apple-watch-ultra-2.html" },
    { title: "Arlo Ultra 2 Camera System Review 2025 | 4K Security Worth $1,599?", description: "Arlo Ultra 2 Spotlight Camera System delivers true 4K HDR video with color night vision and 180� field of view. Is this $1,599 security system worth it? Our comprehensive 2025 review.", category: "Cameras", url: "Posts/arlo-ultra-2-spotlight-camera.html" },
    { title: "Astell&Kern SP3000 DAP Review 2025 - Ultimate Audiophile Player | Your Shop Online", description: "Astell&Kern SP3000 review 2025 - Flagship digital audio player with quad DAC, native DSD512, and stainless steel chassis. Ultimate audiophile DAP at $3,699. Complete US buyer's guide.", category: "Audio", url: "Posts/astell-kern-sp3000-dap.html" },
    { title: "Asus ROG Zephyrus G16 Review - Best Gaming Laptop 2025 | Your Shop Online", description: "Asus ROG Zephyrus G16 review with Intel Core Ultra 9, RTX 4070, 240Hz OLED display, and premium design. Best gaming laptop 2025 - Perfect for US gamers and creators.", category: "Gaming", url: "Posts/asus-rog-zephyrus-g16.html" },
    { title: "Bang & Olufsen Beovision Harmony Review 2025 | Your Shop Online", description: "Bang & Olufsen Beovision Harmony review - Luxurious OLED TV with motorized speaker panels, premium audio, and stunning design. The ultimate TV experience for US luxury homes 2025.", category: "Products", url: "Posts/bang-olufsen-beovision-harmony.html" },
    { title: "Baratza Sette 270Wi Review 2025 - Revolutionary Grind-by-Weight Espresso Grinder | Your Shop Online", description: "Baratza Sette 270Wi espresso grinder review for 2025 - Revolutionary grind-by-weight technology meets exceptional precision. Complete buyer's guide for serious coffee enthusiasts in the United States.", category: "Kitchen", url: "Posts/baratza-sette-270wi-grinder.html" },
    { title: "Beats Studio Pro Wireless Headphones Review 2025 - Premium Audio | Your Shop Online", description: "Beats Studio Pro review 2025: Premium wireless headphones with lossless USB-C audio, personalized spatial audio, active noise cancelling, 40-hour battery life, and custom 40mm drivers.", category: "Audio", url: "Posts/beats-studio-pro.html" },
    { title: "BENGOO G9000 Gaming Headset Review - Budget Gaming Excellence | Your Shop Online", description: "BENGOO G9000 gaming headset review covering sound quality, microphone performance, and comfort. Is this budget gaming headset worth buying in 2024? - Perfect for US shoppers.", category: "Gaming", url: "Posts/bengoo-g9000.html" },
    { title: "BenQ SW321C PhotoVue Review 2025 | Professional 4K Display Worth $1,599?", description: "BenQ SW321C PhotoVue Monitor review - This 32-inch 4K display delivers 99% Adobe RGB for professional photo and video editing. Is it worth $1,599? Our detailed 2025 review for creatives.", category: "Displays", url: "Posts/benq-sw321c-photoview-monitor.html" },
    { title: "Bernina 770 QE Review 2025 - The Ultimate Professional Sewing Machine | Your Shop Online", description: "Bernina 770 QE sewing machine review for 2025 - Swiss precision engineering meets quilting excellence. Complete buyer's guide for serious sewers and quilters in the United States.", category: "Products", url: "Posts/bernina-770-qe-sewing-machine.html" },
    { title: "Blink Video Doorbell 2025 Review - Best Budget Smart Doorbell", description: "Blink Video Doorbell Review: 1080p HD video, two-year battery life, two-way audio, motion detection. Best affordable smart doorbell at $59.99. Complete guide - Perfect for US shoppers.", category: "Smart Home", url: "Posts/blink-video-doorbell.html" },
    { title: "Bose Lifestyle 650 Home Theater System Review 2025 | Your Shop Online", description: "Bose Lifestyle 650 Home Entertainment System review - Premium 5.1 surround sound with Adaptiq calibration, wireless connectivity, and stunning audio. Best home theater system for US homes.", category: "Products", url: "Posts/bose-lifestyle-650.html" },
    { title: "Bose QuietComfort Ultra Headphones Review 2025 - Ultimate Noise Cancellation", description: "Comprehensive Bose QuietComfort Ultra Headphones review 2025. Expert analysis of world-class noise cancellation, Immersive Audio, and premium comfort. US buyers guide.", category: "Audio", url: "Posts/bose-quietcomfort-ultra-headphones.html" },
    { title: "Bose Ultra Open Earbuds Review 2025 - Premium Audio | Your Shop Online", description: "Bose Ultra Open Earbuds review 2025: Revolutionary open-ear design with Immersive Audio, 7.5-hour battery, IPX4 water resistance, and premium comfort. Experience sound without blocking your ears.", category: "Audio", url: "Posts/bose-ultra-open-earbuds.html" },
    { title: "Bowers & Wilkins Px8 Review - Audiophile Wireless Headphones 2025 | Your Shop Online", description: "Bowers & Wilkins Px8 review: Premium wireless headphones with carbon fiber construction, 40mm drivers, adaptive ANC, and audiophile sound quality. Perfect for music lovers in the US.", category: "Audio", url: "Posts/bowers-wilkins-px8.html" },
    { title: "Bowflex VeloCore Review 2025 - Revolutionary Exercise Bike | Your Shop Online", description: "Bowflex VeloCore exercise bike review for 2025 - Revolutionary lean mode, exceptional build quality, and immersive workouts. Complete buyer's guide for fitness enthusiasts in the United States.", category: "Fitness", url: "Posts/bowflex-velocore-bike.html" },
    { title: "Breville Barista Express Review - Best Home Espresso Machine 2025 | Your Shop Online", description: "Breville Barista Express espresso machine review with built-in grinder, 15-bar Italian pump, and precise temperature control. Best home espresso machine 2025 - Perfect for US shoppers.", category: "Kitchen", url: "Posts/breville-barista-express.html" },
    { title: "Breville Oracle Jet Review 2025 | Your Shop Online", description: "Breville Oracle Jet review - Super-automatic espresso machine with integrated grinder and milk system. Best automatic espresso maker for US homes 2025.", category: "Products", url: "Posts/breville-oracle-jet.html" },
    { title: "Bugaboo Fox 5 Review 2025 - The Ultimate Luxury Stroller | Your Shop Online", description: "Bugaboo Fox 5 luxury stroller review for 2025 - Premium design meets superior comfort with innovative features. Complete buyer's guide for discerning parents in the United States.", category: "Products", url: "Posts/bugaboo-fox-5-stroller.html" },
    { title: "Canon EOS R6 Mark II Review - Best Pro Mirrorless Camera 2025 | Your Shop Online", description: "Canon EOS R6 Mark II review with 24.2MP full-frame sensor, 40fps burst shooting, 6K video, and incredible autofocus. Best professional mirrorless camera 2025 - Perfect for US photographers.", category: "Cameras", url: "Posts/canon-eos-r6-mark-ii.html" },
    { title: "Canon RF 70-200mm F2.8 L IS USM Review - Professional Telephoto Lens 2025 | Your Shop Online", description: "Canon RF 70-200mm F2.8 L IS USM review - Professional telephoto lens with incredible image quality, dual Nano USM motors, 5-stop image stabilization, and weather sealing. Best telephoto lens 2025 for US photographers.", category: "Products", url: "Posts/canon-rf-70-200mm-f28.html" },
    { title: "Celestron NexStar Evolution 9.25 Review 2025 - Ultimate Premium Telescope | Your Shop Online", description: "Celestron NexStar Evolution 9.25 telescope review for 2025 - Premium Schmidt-Cassegrain optics with WiFi control. Complete buyer's guide for serious astronomers in the United States.", category: "Products", url: "Posts/celestron-nexstar-evolution-9.html" },
    { title: "CORSAIR iCUE 5000X RGB Build Review 2025 | Premium PC Worth $2,500?", description: "CORSAIR iCUE 5000X RGB Premium Gaming PC Build review - Complete $2,500 build with tempered glass, RGB lighting, and enthusiast components. Is this showcase build worth it? Our 2025 review.", category: "Products", url: "Posts/corsair-icue-5000x-rgb-build.html" },
    { title: "Dell XPS 17 (2025) Review - Premium Windows Powerhouse | Your Shop Online", description: "Dell XPS 17 2025 review - Premium Windows laptop with stunning 17-inch 4K OLED display, Intel Core Ultra processors, and professional-grade performance. Complete buyer's guide for US shoppers.", category: "Products", url: "Posts/dell-xps-17-2025.html" },
    { title: "De'Longhi La Specialista Arte Review 2025 - Luxury Espresso Machine | Your Shop Online", description: "De'Longhi La Specialista Arte review 2025 - Luxury espresso machine with manual brewing system, built-in grinder, advanced milk frothing, and barista-level control. The ultimate home espresso experience for US coffee enthusiasts.", category: "Kitchen", url: "Posts/delonghi-la-specialista-arte.html" },
    { title: "DeLonghi La Specialista Maestro Review - Premium Espresso 2025 | Your Shop Online", description: "DeLonghi La Specialista Maestro review: Premium espresso machine with LatteArt System, Smart Tamping Station, dual heating, and bean-to-cup convenience. Perfect for espresso enthusiasts in the US.", category: "Kitchen", url: "Posts/delonghi-specialista-maestro.html" },
    { title: "DJI Inspire 3 Review 2025 | Your Shop Online", description: "DJI Inspire 3 drone review - Professional cinema drone with 8K camera, 360° obstacle avoidance, and cinema-grade features. Best professional drone for US filmmakers 2025.", category: "Products", url: "Posts/dji-inspire-3.html" },
    { title: "DJI Mavic 4 Pro Review 2025 - Professional Drone | Your Shop Online", description: "DJI Mavic 4 Pro review 2025 - Professional drone with Hasselblad camera, 8K video, 50MP photos, omnidirectional obstacle sensing, and 48-minute flight time. The ultimate aerial photography platform for US creators.", category: "Drones", url: "Posts/dji-mavic-4-pro.html" },
    { title: "DJI Mini 4 Pro Review - Best Compact Drone 2025 | Your Shop Online", description: "DJI Mini 4 Pro review with 4K/60fps HDR, omnidirectional obstacle avoidance, 34-min flight time, and advanced intelligent features. Best compact drone 2025 - Perfect for US aerial photographers.", category: "Drones", url: "Posts/dji-mini-4-pro.html" },
    { title: "Dreame L50 Ultra Complete Robot Vacuum Review - Revolutionary Retractable Legs 2025 | Your Shop Online", description: "Dreame L50 Ultra Complete Robot Vacuum review - Revolutionary retractable leg technology, advanced mopping, obstacle avoidance, and powerful 11,000Pa suction. Best premium robot vacuum 2025 for US homes.", category: "Home Appliances", url: "Posts/dreame-l50-ultra-robot-vacuum.html" },
    { title: "Dyson Purifier Hot+Cool HP07 Review - Best Air Purifier 2025 | Your Shop Online", description: "Dyson Purifier Hot+Cool HP07 review with HEPA filtration, heating, cooling, and air quality monitoring. Best all-in-one air treatment for 2025 - Perfect for US shoppers.", category: "Home Appliances", url: "Posts/dyson-purifier-hot-cool.html" },
    { title: "Dyson V15 Detect Review - Best Cordless Vacuum 2025 | Your Shop Online", description: "Dyson V15 Detect cordless vacuum review with laser dust detection, HEPA filtration, and powerful suction. Best cordless vacuum for 2025 - Perfect for US shoppers.", category: "Home Appliances", url: "Posts/dyson-v15-detect.html" },
    { title: "Dyson Zone Headphones Review 2025 - Premium Audio Meets Innovation | Your Shop Online", description: "Dyson Zone headphones review 2025 - Premium noise-cancelling headphones with optional air purification. Ultra-low distortion audio, 50-hour battery. Complete US buyer's guide at $949.", category: "Audio", url: "Posts/dyson-zone-headphones.html" },
    { title: "Echo Dot 5th Gen Review - Best Alexa Smart Speaker 2025 | Your Shop Online", description: "Echo Dot 5th Generation review covering sound quality, Alexa features, and smart home control. Best affordable smart speaker with improved audio - Perfect for US shoppers.", category: "Audio", url: "Posts/echo-dot-5th-gen.html" },
    { title: "Ecovacs Deebot X9 Pro Omni Review 2025 - Ultimate Robot Vacuum & Mop | Your Shop Online", description: "Ecovacs Deebot X9 Pro Omni review 2025 - Premium robot vacuum and mop with dual rotating mopping pads, 5,500Pa suction, AI obstacle avoidance, and all-in-one station. The ultimate automated cleaning solution for US homes.", category: "Home Appliances", url: "Posts/ecovacs-deebot-x9-pro-omni.html" },
    { title: "Elgato Stream Deck XL Review 2025 - Premium Streaming Gear | Your Shop Online", description: "Elgato Stream Deck XL review 2025: 32 customizable LCD keys, plugin marketplace, multi-action support, and seamless streaming integration. Ultimate control for creators and streamers.", category: "Streaming Gear", url: "Posts/elgato-stream-deck-xl.html" },
    { title: "Elgato Wave DX Podcast Bundle Review 2025 | Complete Streaming Studio", description: "Elgato Wave DX Podcast Bundle review - Complete streaming studio with XLR microphone, Wave XLR interface, boom arm, and accessories. Is this $1,299 kit worth it? Our comprehensive 2025 review.", category: "Products", url: "Posts/elgato-wave-dx-podcast-bundle.html" },
    { title: "Epson Home Cinema LS12000 Projector Review 2025 - Ultimate 4K Laser | Your Shop Online", description: "Epson Home Cinema LS12000 4K laser projector review 2025 - 2,700 lumens, 2,500,000:1 contrast, HDR10+, 4K PRO-UHD. Best home theater projector at $4,999. Complete US buyer's guide.", category: "Products", url: "Posts/epson-home-cinema-ls12000-projector.html" },
    { title: "Fanatec Podium DD2 Review 2025 - Ultimate Luxury Excellence | Your Shop Online", description: "Fanatec Podium DD2 2025 review - Premium luxury product with exceptional build quality and professional-grade performance. The ultimate choice for discerning customers in the United States.", category: "Products", url: "Posts/fanatec-podium-dd2.html" },
    { title: "Amazon Fire TV Stick 4K Max 2025 Review - Ultimate Streaming", description: "Fire TV Stick 4K Max Review: Alexa voice control, Wi-Fi 6E, cloud gaming, 4K HDR streaming. Best Amazon streaming device at $59.99. Full buying guide - Perfect for US shoppers.", category: "Displays", url: "Posts/fire-tv-stick-4k.html" },
    { title: "Fitbit Inspire 3 Review - Complete Fitness Tracker | Your Shop Online", description: "Fitbit Inspire 3 fitness tracker review covering health monitoring, battery life, and app features. Discover if this affordable tracker meets your needs - Perfect for US shoppers.", category: "Trackers", url: "Posts/fitbit-inspire-3.html" },
    { title: "FlexiSpot E7 Pro Plus Standing Desk Review - Premium Dual Motor 2025 | Your Shop Online", description: "FlexiSpot E7 Pro Plus Standing Desk review - Dual motor power, 355 lb capacity, whisper-quiet operation, programmable memory, and premium build quality. Best electric standing desk 2025 for US professionals.", category: "Products", url: "Posts/flexispot-e7-pro-plus.html" },
    { title: "Focal Utopia Review 2025 - Ultimate Audiophile Headphones | Your Shop Online", description: "Focal Utopia 2025 review - Flagship open-back headphones with beryllium drivers, exceptional clarity, and luxurious build quality. The ultimate audiophile headphones for discerning listeners in the United States.", category: "Audio", url: "Posts/focal-utopia-headphones.html" },
    { title: "Fully Jarvis Bamboo Standing Desk Review 2025 - Premium Standing Desk | Your Shop Online", description: "Fully Jarvis Bamboo Standing Desk review 2025 - Premium standing desk with sustainable bamboo top, dual-motor lift system, programmable height presets, and commercial-grade construction. The ultimate ergonomic workspace for US professionals.", category: "Products", url: "Posts/fully-jarvis-bamboo-standing-desk.html" },
    { title: "FURNIMAT 2025 Premium Massage Chair Review - 4D Full Body Massage | Your Shop Online", description: "FURNIMAT 2025 Premium Massage Chair review - Luxury 4D full-body massage chair with SL-track, zero gravity, heat therapy, foot rollers, and smart AI technology. The ultimate relaxation experience for US homes.", category: "Gaming", url: "Posts/furnimat-2025-premium-massage-chair.html" },
    { title: "Gaggenau 400 Series Oven Review 2025 - Ultimate Luxury Kitchen Appliance | Your Shop Online", description: "Gaggenau 400 Series Oven 2025 review - German-engineered luxury wall oven with precise temperature control, advanced convection, and professional-grade features. The ultimate kitchen appliance for culinary enthusiasts in the United States.", category: "Products", url: "Posts/gaggenau-400-series-oven.html" },
    { title: "Samsung Galaxy Tab A9+ Review - Best Budget Android Tablet | Your Shop Online", description: "Samsung Galaxy Tab A9+ review testing performance, display, and battery life. Is this budget Android tablet worth buying? Complete guide and analysis - Perfect for US shoppers.", category: "Smartphones", url: "Posts/galaxy-tab-a9.html" },
    { title: "GoPro HERO 12 Black Review 2025 - Ultimate Action Camera | Your Shop Online", description: "GoPro HERO 12 Black review 2025 - The ultimate action camera with 5.3K60 video, HyperSmooth 6.0 stabilization, HDR photo and video. Best action cam for US adventurers and content creators.", category: "Cameras", url: "Posts/gopro-hero-12-black.html" },
    { title: "Hasselblad X2D 100C Review 2025 - Professional Medium Format | Your Shop Online", description: "Hasselblad X2D 100C 2025 review - Professional medium format camera with 100MP sensor, 16-bit color depth, HNCS technology, and exceptional build quality. The ultimate tool for commercial photographers in the United States.", category: "Products", url: "Posts/hasselblad-x2d-100c.html" },
    { title: "Herman Miller Eames Lounge Chair Review 2025 | Your Shop Online", description: "Herman Miller Eames Lounge Chair review - Iconic design with premium leather and molded plywood. Best luxury chair for US homes 2025.", category: "Gaming", url: "Posts/herman-miller-eames-lounge.html" },
    { title: "Herman Miller Embody Gaming Chair Review - Best Premium Gaming Chair 2025 | Your Shop Online", description: "Herman Miller x Logitech Embody Gaming Chair review with advanced ergonomics, pixelated support, cooling foam, and 12-year warranty. Best premium gaming chair 2025 - Perfect for US gamers.", category: "Gaming", url: "Posts/herman-miller-embody-gaming.html" },
    { title: "Hisense PX3-Pro Review 2025 - Ultimate 4K Laser Projector | Your Shop Online", description: "Hisense PX3-Pro review 2025 - Premium 4K laser projector with 3,000 ANSI lumens, 120Hz refresh rate, Dolby Vision, and ultra-short throw design. The ultimate home theater experience for US consumers.", category: "Products", url: "Posts/hisense-px3-pro.html" },
    { title: "Instant Pot Duo 7-in-1 2025 Review - Best Multi-Cooker", description: "Instant Pot Duo Review: 7-in-1 multi-cooker, pressure cooker, slow cooker, rice cooker. Best kitchen appliance at $99.99. Complete cooking guide included - Perfect for US shoppers.", category: "Kitchen", url: "Posts/instant-pot-duo.html" },
    { title: "Apple iPad 11-inch Review - Ultimate Tablet Experience | Your Shop Online", description: "Apple iPad 11-inch with A16 chip review covering performance, display quality, and features. Complete analysis of Apple's latest tablet for 2024 - Perfect for US shoppers.", category: "Tablets", url: "Posts/ipad-11-inch.html" },
    { title: "iPad Pro 12.9-inch M2 Review - Best Premium Tablet 2025 | Your Shop Online", description: "iPad Pro 12.9-inch M2 review with desktop-class M2 chip, stunning Liquid Retina XDR display, Apple Pencil hover, and all-day battery life. Best premium tablet 2025 - Perfect for US shoppers.", category: "Tablets", url: "Posts/ipad-pro-12-9-m2.html" },
    { title: "iPhone 16 Pro Max Review 2025 - Ultimate Flagship Smartphone | Your Shop Online", description: "iPhone 16 Pro Max review 2025 - Apple's ultimate flagship with A18 Pro chip, titanium design, advanced camera system with 5x telephoto, ProMotion 120Hz display, and iOS 18. The best iPhone ever made for power users in the United States.", category: "Smartphones", url: "Posts/iphone-16-pro-max.html" },
    { title: "IQAir HealthPro Plus Review 2025 - Medical Grade Air Purifier | Your Shop Online", description: "IQAir HealthPro Plus review 2025 - Medical-grade air purifier with HyperHEPA filtration, 99.97% particle removal down to 0.003 microns, gas and odor filtration, and Swiss engineering. The ultimate air quality solution for US homes.", category: "Products", url: "Posts/iqair-healthpro-plus.html" },
    { title: "iRobot Roomba j7+ Review - Best Self-Emptying Robot Vacuum 2025 | Your Shop Online", description: "iRobot Roomba j7+ review with self-emptying base, advanced obstacle avoidance, and smart mapping technology. Best premium robot vacuum for 2025 - Perfect for US shoppers.", category: "Home Appliances", url: "Posts/irobot-roomba-j7.html" },
    { title: "JBL Flip 6 Portable Speaker 2025 Review - Best Waterproof Bluetooth Speaker", description: "JBL Flip 6 Review: Waterproof IP67 rating, 12-hour battery, powerful bass, PartyBoost feature. Best portable speaker at $129.99. Complete audio guide - Perfect for US shoppers.", category: "Audio", url: "Posts/jbl-flip-6.html" },
    { title: "JURA Z10 Espresso Machine Review 2025 - Ultimate Automatic Coffee | Your Shop Online", description: "JURA Z10 review 2025 - Revolutionary automatic espresso machine with cold brew function, Product Recognizing Grinder, and 32 specialty drinks. Swiss engineering at $4,000. Complete US buyer's guide.", category: "Kitchen", url: "Posts/jura-z10-espresso-machine.html" },
    { title: "Keychron Q1 Pro Review - Best Premium Mechanical Keyboard 2025 | Your Shop Online", description: "Keychron Q1 Pro mechanical keyboard review with hot-swappable switches, wireless connectivity, and premium aluminum build. Best custom keyboard for 2025 - Perfect for US shoppers.", category: "Accessories", url: "Posts/keychron-q1-pro.html" },
    { title: "Amazon Kindle Paperwhite 16GB (2024) Review - Best E-Reader", description: "Kindle Paperwhite 2024 Review: 16GB storage, 6.8-inch glare-free display, 10-week battery, waterproof design. Best e-reader for book lovers at $149. Complete buying guide - Perfect for US shoppers.", category: "E-Readers", url: "Posts/kindle-paperwhite.html" },
    { title: "KitchenAid Commercial 8-Quart Mixer Review 2025 - Ultimate Professional Stand Mixer | Your Shop Online", description: "KitchenAid Commercial 8-Quart Stand Mixer review for 2025 - Professional-grade power meets massive capacity. Complete buyer's guide for serious bakers in the United States.", category: "Kitchen", url: "Posts/kitchenaid-commercial-8qt-mixer.html" },
    { title: "KitchenAid Pro Line Stand Mixer Review - Professional Baking 2025 | Your Shop Online", description: "KitchenAid Pro Line Stand Mixer review: Professional 7-quart stand mixer with 1.3HP motor, 11 speeds, and premium design. Perfect for serious bakers and home chefs in the US.", category: "Kitchen", url: "Posts/kitchenaid-pro-line-mixer.html" },
    { title: "La Marzocco Linea Mini Review 2025 | Your Shop Online", description: "La Marzocco Linea Mini review - Dual boiler espresso machine with commercial-grade components and PID control. Best home espresso machine for US coffee enthusiasts 2025.", category: "Products", url: "Posts/la-marzocco-linea-mini.html" },
    { title: "Leica Q3 Review 2025 - Ultimate Luxury Compact Camera | Your Shop Online", description: "Leica Q3 2025 review - Premium full-frame compact camera with 60MP sensor, 8K video, hybrid autofocus, and legendary Summilux lens. The ultimate luxury camera for professionals and enthusiasts in the United States.", category: "Cameras", url: "Posts/leica-q3-camera.html" },
    { title: "LG 27-Inch 4K UHD Monitor Review - Best Display for Professionals 2025 | Your Shop Online", description: "LG 27-inch 4K UHD Monitor review with HDR10 support, USB-C connectivity, and professional color accuracy. Best monitor for creative professionals in 2025.", category: "Displays", url: "Posts/lg-27-4k-monitor.html" },
    { title: "LG C3 OLED 65-inch TV Review - Best Premium OLED TV 2025 | Your Shop Online", description: "LG C3 OLED 65-inch TV review with self-lit pixels, perfect blacks, 120Hz gaming, α9 AI processor, and webOS 23. Best premium OLED TV 2025 - Perfect for US home theaters.", category: "Displays", url: "Posts/lg-c3-oled-65.html" },
    { title: "LG InstaView Door-in-Door Refrigerator Review - Premium Kitchen 2025", description: "LG InstaView Door-in-Door refrigerator review - premium kitchen with 25 cu ft capacity, smart technology, and dual cooling. Best luxury fridge 2025 - Perfect for US kitchens.", category: "Products", url: "Posts/lg-instaview-door-in-door.html" },
    { title: "LG Signature OLED M3 97-inch Review 2025 - World's First Wireless OLED TV | Your Shop Online", description: "LG Signature OLED M3 97-inch review 2025 - World's first wireless 97-inch 4K OLED TV with Zero Connect Box. Ultimate luxury home theater experience at $30,000. Complete buyer's guide for US shoppers.", category: "Displays", url: "Posts/lg-signature-oled-m3-97.html" },
    { title: "LG Z3 OLED 77-inch 8K TV Review 2025 | Your Shop Online", description: "LG Z3 OLED 77-inch Smart TV 2025 review - Revolutionary 8K OLED display with AI processing, Dolby Vision, and premium audio. Best luxury TV for US homes.", category: "Displays", url: "Posts/lg-z3-oled-77.html" },
    { title: "Logitech G502 HERO Gaming Mouse Review - Precision Gaming | Your Shop Online", description: "Logitech G502 HERO gaming mouse review with analysis of sensor accuracy, customization options, and ergonomics. The ultimate precision gaming mouse tested - Perfect for US shoppers.", category: "Gaming", url: "Posts/logitech-g502.html" },
    { title: "Logitech MX Master 3S Review - Best Productivity Mouse 2025 | Your Shop Online", description: "Logitech MX Master 3S review with silent clicks, 8K DPI sensor, and multi-device connectivity. Best productivity mouse for professionals in 2025 - Perfect for US shoppers.", category: "Accessories", url: "Posts/logitech-mx-master-3s.html" },
    { title: "MacBook Pro 16-inch M3 Max Review 2025 - Professional Powerhouse", description: "Comprehensive MacBook Pro 16-inch M3 Max review 2025. Expert analysis of performance, display, battery life, and value for creative professionals. US buyers guide.", category: "Laptops", url: "Posts/macbook-pro-16-m3-max.html" },
    { title: "MacBook Pro 16-inch M3 Max Review - Best Pro Laptop 2025 | Your Shop Online", description: "MacBook Pro 16-inch M3 Max review with exceptional performance, stunning Liquid Retina XDR display, and up to 22 hours battery. Best professional laptop 2025 - Perfect for US shoppers.", category: "Laptops", url: "Posts/macbook-pro-16-m3.html" },
    { title: "MacBook Pro 16-inch M4 Max Review 2025 - Ultimate Creative Powerhouse | Your Shop Online", description: "MacBook Pro 16-inch M4 Max review for 2025 - Apple's most powerful laptop with next-gen performance, stunning Liquid Retina XDR display, and all-day battery. Complete buyer's guide for US shoppers.", category: "Laptops", url: "Posts/macbook-pro-16-m4-max.html" },
    { title: "Masterbuilt Gravity Series 1050 Review 2025 - Revolutionary Digital Charcoal Grill | Your Shop Online", description: "Masterbuilt Gravity Series 1050 review for 2025 - Revolutionary digital charcoal grill and smoker with set-it-and-forget-it convenience. Complete buyer's guide for BBQ enthusiasts in the United States.", category: "Kitchen", url: "Posts/masterbuilt-gravity-1050-grill.html" },
    { title: "McIntosh MC275 Review 2025 - Legendary Tube Amplifier | Your Shop Online", description: "McIntosh MC275 2025 review - Legendary tube amplifier with 75 watts per channel, iconic blue meters, and audiophile-grade sound quality. The ultimate luxury amplifier for music enthusiasts in the United States.", category: "Products", url: "Posts/mcintosh-mc275-amplifier.html" },
    { title: "Meta Quest 3 Review 2025 - Ultimate Mixed Reality Gaming | Your Shop Online", description: "Meta Quest 3 review 2025 - Premium mixed reality headset with breakthrough passthrough, powerful performance, and vast game library. Complete buyer's guide for US shoppers.", category: "Gaming", url: "Posts/meta-quest-3.html" },
    { title: "Meta Quest 3S 128GB Review - The Ultimate VR Experience | Your Shop Online", description: "Complete Meta Quest 3S 128GB review covering performance, visual quality, and gaming experience. Discover why it's the best standalone VR headset in 2024 - Perfect for US shoppers.", category: "VR/AR", url: "Posts/meta-quest-3s.html" },
    { title: "Microsoft Surface Laptop Studio 2 Review - Best Creative Workstation 2025 | Your Shop Online", description: "Microsoft Surface Laptop Studio 2 review with 13th Gen Intel Core i7, NVIDIA RTX 4060, unique convertible design, and vibrant PixelSense touchscreen. Best creative workstation 2025 - Perfect for US shoppers.", category: "Laptops", url: "Posts/microsoft-surface-laptop-studio-2.html" },
    { title: "Microsoft Surface Pro 10 Review 2025 - Ultimate 2-in-1 Tablet | Your Shop Online", description: "Microsoft Surface Pro 10 review 2025 - Premium 2-in-1 tablet with Intel Core Ultra, OLED display option, Copilot+ AI features, and versatile design. Complete buyer's guide for US shoppers.", category: "Tablets", url: "Posts/microsoft-surface-pro-10.html" },
    { title: "Miele Complete C3 Marin Vacuum Review 2025 - Premium German Engineering | Your Shop Online", description: "Miele Complete C3 Marin review 2025 - Premium German canister vacuum with HEPA filtration, 1200W motor, and 20-year lifespan. Best vacuum for allergy sufferers at $1,499. Complete US buyer's guide.", category: "Smart Home", url: "Posts/miele-complete-c3-marin-vacuum.html" },
    { title: "Montblanc Meisterstück 149 Review 2025 - Ultimate Luxury Excellence | Your Shop Online", description: "Montblanc Meisterstück 149 2025 review - Premium luxury product with exceptional build quality and professional-grade performance. The ultimate choice for discerning customers in the United States.", category: "Products", url: "Posts/montblanc-meisterstuck-149.html" },
    { title: "Narwal Freo X Ultra Robot Vacuum Review - Zero-Maintenance Cleaning 2025 | Your Shop Online", description: "Narwal Freo X Ultra Robot Vacuum review - Zero-tangle floating brush, 12,000Pa suction, intelligent dirt detection, EdgeSwing mopping, and industry-first zero-maintenance cleaning system. Best for US homes 2025.", category: "Home Appliances", url: "Posts/narwal-freo-x-ultra.html" },
    { title: "Nespresso Creatista Plus Review - Barista-Quality Espresso 2025 | Your Shop Online", description: "Nespresso Creatista Plus review: Premium espresso machine with automatic steam wand, 8 coffee styles, barista-quality results, and sleek stainless steel design. Perfect for coffee lovers in the US.", category: "Kitchen", url: "Posts/nespresso-creatista-plus.html" },
    { title: "Netgear Nighthawk RAXE500 Review 2025 - Premium Networking | Your Shop Online", description: "Netgear Nighthawk RAXE500 review 2025: Wi-Fi 6E tri-band router with 6GHz band, 10.8 Gbps speeds, 8-stream connectivity, 2.5G ethernet, and coverage for 3,500 sq ft. Ultimate gaming and streaming router.", category: "Products", url: "Posts/netgear-nighthawk-raxe500.html" },
    { title: "Ninja Air Fryer Pro 2025 Review - Best Air Fryer for Healthy Cooking", description: "Ninja Air Fryer Pro Review: 5-quart capacity, 400°F heat, healthier cooking with 75% less fat. Best air fryer at $119.99. Complete cooking guide included - Perfect for US shoppers.", category: "Kitchen", url: "Posts/ninja-air-fryer.html" },
    { title: "Ninja Foodi Smart XL Grill Review 2025 - 6-in-1 Indoor Grill", description: "Comprehensive Ninja Foodi Smart XL Grill review 2025. Expert analysis of Cyclonic Grilling Technology, 6-in-1 cooking modes, and Smart Cook System. US buyers guide with pros, cons, and recipes.", category: "Kitchen", url: "Posts/ninja-foodi-smart-xl-grill.html" },
    { title: "NordicTrack Commercial 1750 Review 2025 - Premium Treadmill | Your Shop Online", description: "NordicTrack Commercial 1750 review 2025 - Premium treadmill with 14-inch HD touchscreen, iFit integration, powerful 4.0 CHP motor, and commercial-grade construction. The ultimate home treadmill for US fitness enthusiasts.", category: "Products", url: "Posts/nordictrack-commercial-1750.html" },
    { title: "Peloton Bike+ Review - Premium Connected Fitness 2025 | Your Shop Online", description: "Peloton Bike+ review: Premium exercise bike with auto-follow resistance, rotating 23.8-inch HD touchscreen, immersive live and on-demand classes. Perfect for home fitness enthusiasts in the US.", category: "Fitness", url: "Posts/peloton-bike-plus.html" },
    { title: "Philips Hue Play HDMI Sync Box Review 2025 - Premium Smart Home | Your Shop Online", description: "Philips Hue Play HDMI Sync Box review 2025: 4K 120Hz HDMI sync box with 4 inputs, Dolby Vision, HDR10+, gradient lightstrip support, and intelligent entertainment sync modes. Transform your viewing experience with immersive lighting.", category: "Smart Home", url: "Posts/philips-hue-play-sync-box.html" },
    { title: "Purple Hybrid Premier 4 Mattress Review 2025 | Worth $3,599?", description: "Purple Hybrid Premier 4 mattress review - This $3,599 luxury king mattress uses GelFlex Grid technology for pressure relief. Is it worth the investment? Our honest 2025 review reveals all.", category: "Products", url: "Posts/purple-hybrid-premier-4-mattress.html" },
    { title: "Razer Blade 15 2024 Review - Premium Gaming Laptop | Your Shop Online", description: "Razer Blade 15 2024 review: Premium gaming laptop with 14th Gen Intel Core i9, RTX 4070, QHD 240Hz display, and sleek aluminum design. Perfect for gamers and creators in the US.", category: "Gaming", url: "Posts/razer-blade-15-2024.html" },
    { title: "Razer Blade 16 2025 Review - Ultimate Gaming Laptop | Your Shop Online", description: "Razer Blade 16 2025 review - Ultimate gaming laptop with Intel Core Ultra 9, NVIDIA RTX 5090, 240Hz Mini LED display, and premium build quality. The most powerful portable gaming machine for US gamers.", category: "Gaming", url: "Posts/razer-blade-16-2025.html" },
    { title: "REL Acoustics S/812 Subwoofer Review 2025 - Audiophile Bass | Your Shop Online", description: "REL Acoustics S/812 subwoofer review 2025 - 12-inch driver, 500W Class D amp, high-level input. Audiophile bass integration at $2,499. Complete US buyer's guide.", category: "Audio", url: "Posts/rel-acoustics-s812-subwoofer.html" },
    { title: "Ring Video Doorbell Pro 2 Review - Best Smart Doorbell 2025 | Your Shop Online", description: "Ring Video Doorbell Pro 2 review with 1536p HD video, 3D motion detection, and Alexa integration. Best smart doorbell for home security in 2025 - Perfect for US shoppers.", category: "Smart Home", url: "Posts/ring-doorbell-pro-2.html" },
    { title: "Roborock Saros 10R Review 2025 - Ultimate Robot Vacuum & Mop | Your Shop Online", description: "Roborock Saros 10R review 2025 - Premium robot vacuum and mop with 10,000Pa suction, AI obstacle avoidance, and auto-empty dock. The ultimate hands-free cleaning solution for US homes.", category: "Home Appliances", url: "Posts/roborock-saros-10r.html" },
    { title: "Roku Streaming Stick 4K Plus 2025 Review - Best Streaming Device", description: "Roku Streaming Stick 4K Plus Review: 4K HDR streaming, voice remote, 500+ channels, and private listening. Best streaming stick at $49.99. Complete guide - Perfect for US shoppers.", category: "Streaming Devices", url: "Posts/roku-streaming-stick.html" },
    { title: "iRobot Roomba 694 2025 Review - Best Entry-Level Robot Vacuum", description: "Roomba 694 Review: Smart mapping, app control, automatic charging, 3-stage cleaning system. Best affordable robot vacuum at $274.99. Complete buying guide - Perfect for US shoppers.", category: "Home Appliances", url: "Posts/roomba-694.html" },
    { title: "Saatva Classic Luxury Mattress Review 2025 - Premium Sleep Perfected | Your Shop Online", description: "Saatva Classic Luxury Mattress King review 2025 - Premium innerspring hybrid with euro pillow top and dual-coil system. Complete buyer's guide for luxury sleep in the United States.", category: "Displays", url: "Posts/saatva-classic-luxury-mattress.html" },
    { title: "Samsung Bespoke 4-Door Flex Review 2025 | Smart Fridge Worth $3,699?", description: "Samsung Bespoke 4-Door Flex refrigerator review - This $3,699 smart fridge features customizable panels, Family Hub, and FlexZone drawer. Is it worth the premium price? Our detailed 2025 review.", category: "Products", url: "Posts/samsung-bespoke-4-door-flex.html" },
    { title: "Samsung The Frame 65 Review - Art-Inspired QLED TV 2025 | Your Shop Online", description: "Samsung The Frame 65-inch QLED TV review: Art-inspired 4K TV with Quantum Dot technology, Art Mode, customizable bezels, anti-reflection screen. Perfect for design-conscious home theater in the US.", category: "Displays", url: "Posts/samsung-frame-tv-65.html" },
    { title: "Samsung Galaxy S24 Ultra Review - Best Flagship Phone 2025 | Your Shop Online", description: "Samsung Galaxy S24 Ultra review with revolutionary AI features, powerful Snapdragon 8 Gen 3 processor, stunning 200MP camera, and integrated S Pen. Best flagship smartphone 2025 - Perfect for US shoppers.", category: "Smartphones", url: "Posts/samsung-galaxy-s24-ultra.html" },
    { title: "Samsung Galaxy S25 Ultra Review 2025 - Ultimate Android Flagship | Your Shop Online", description: "Samsung Galaxy S25 Ultra review 2025 - The ultimate Android flagship with 200MP camera, S Pen, AI features, and Snapdragon 8 Gen 4 power. Complete buyer's guide for US shoppers.", category: "Smartphones", url: "Posts/samsung-galaxy-s25-ultra.html" },
    { title: "Samsung Galaxy Z Fold 6 Review 2025 - Ultimate Foldable Smartphone | Your Shop Online", description: "Samsung Galaxy Z Fold 6 review 2025 - The ultimate foldable smartphone with 7.6-inch Dynamic AMOLED display, S Pen support, and powerful performance. Complete buyer's guide for US shoppers.", category: "Smartphones", url: "Posts/samsung-galaxy-z-fold-6.html" },
    { title: "Samsung HW-Q990D Soundbar Review - Ultimate 11.1.4 Dolby Atmos System 2025 | Your Shop Online", description: "Samsung HW-Q990D Soundbar review - 11.1.4 channel Dolby Atmos system with wireless rear speakers and subwoofer. The ultimate home theater soundbar for 2025.", category: "Audio", url: "Posts/samsung-hw-q990d-soundbar.html" },
    { title: "Samsung Odyssey Ark 55 Review 2025 - Ultimate Luxury Excellence | Your Shop Online", description: "Samsung Odyssey Ark 55 2025 review - Premium luxury product with exceptional build quality and professional-grade performance. The ultimate choice for discerning customers in the United States.", category: "Products", url: "Posts/samsung-odyssey-ark-55-curved.html" },
    { title: "Samsung Odyssey OLED G9 Review - Ultimate Gaming Monitor 2025 | Your Shop Online", description: "Samsung Odyssey OLED G9 review: Ultra-wide 49-inch OLED gaming monitor with 240Hz refresh rate, 0.03ms response time, 1800R curve, and stunning HDR. Perfect for immersive gaming in the US.", category: "Gaming", url: "Posts/samsung-odyssey-oled-g9.html" },
    { title: "Secretlab TITAN Evo Plus 2025 Review - Next-Gen Gaming Chair | Your Shop Online", description: "Secretlab TITAN Evo Plus 2025 review - Next-gen gaming chair with self-adjusting lumbar support, intelligent temperature regulation, premium materials, and ergonomic excellence. Best gaming chair 2025 for US gamers.", category: "Gaming", url: "Posts/secretlab-titan-evo-plus.html" },
    { title: "Secretlab TITAN Evo 2022 Review - Best Premium Gaming Chair 2025 | Your Shop Online", description: "Secretlab TITAN Evo 2022 gaming chair review with premium ergonomics, adjustable lumbar support, and luxury materials. Best gaming chair for 2025 - Perfect for US shoppers.", category: "Gaming", url: "Posts/secretlab-titan-evo.html" },
    { title: "Segway Ninebot Max G2 Review - Premium Electric Scooter 2025", description: "Segway Ninebot Max G2 electric scooter review. Premium urban mobility with 40-mile range, 600W motor, and dual braking. Best electric scooter 2025 for commuters - Perfect for US riders.", category: "Products", url: "Posts/segway-ninebot-max-g2.html" },
    { title: "Sennheiser Ambeo Soundbar Max Review 2025 - Ultimate Home Theater Sound | Your Shop Online", description: "Sennheiser Ambeo Soundbar Max review 2025 - 13 drivers, 5.1.4 Dolby Atmos, 500W, room calibration. Best premium soundbar for home theater at $2,500. Complete US buyer's guide.", category: "Audio", url: "Posts/sennheiser-ambeo-soundbar-max.html" },
    { title: "Smart Watch 2025 Review - Best Fitness Tracker with Heart Rate Monitor", description: "Comprehensive smart watch review with heart rate monitoring, sleep tracking, and 100+ sport modes. Best affordable fitness smartwatch for 2025 - Perfect for US shoppers.", category: "Wearables", url: "Posts/smart-watch-2025.html" },
    { title: "Sole F85 Folding Treadmill Review - Premium Home Fitness 2025", description: "Sole F85 Folding Treadmill review - premium home fitness with 3-HP motor, 22 MP/H speed, and cushioned deck. Best treadmill 2025 for serious runners - Perfect for US home gyms.", category: "Products", url: "Posts/sole-f85-folding-treadmill.html" },
    { title: "Sonos Arc Soundbar Review - Best Premium Soundbar 2025 | Your Shop Online", description: "Sonos Arc soundbar review with Dolby Atmos, 11 speakers, Trueplay tuning, voice control, and seamless multi-room audio. Best premium soundbar 2025 - Perfect for US home theaters.", category: "Audio", url: "Posts/sonos-arc-soundbar.html" },
    { title: "Sony A1 II Camera Review 2025 | Your Shop Online", description: "Sony A1 II mirrorless camera review - 50MP full-frame sensor, 8K video, AI-powered autofocus, and professional performance. Best camera for US photographers 2025.", category: "Cameras", url: "Posts/sony-a1-ii-camera.html" },
    { title: "Sony A7 IV Review - Professional Full-Frame Camera 2025 | Your Shop Online", description: "Sony A7 IV review: Professional 33MP full-frame mirrorless camera with 4K 60p video, 10fps burst shooting, advanced Real-time Eye AF, and exceptional image quality. Perfect for pro photographers in the US.", category: "Cameras", url: "Posts/sony-a7-iv-camera.html" },
    { title: "Sony A7R V Review: 61MP Full-Frame Mirrorless Masterpiece", description: "In-depth Sony A7R V review: 61MP full-frame mirrorless camera with AI autofocus, 8K video, 8-stop IBIS, and revolutionary sensor technology for professional photographers.", category: "Cameras", url: "Posts/sony-a7r-v-camera.html" },
    { title: "Sony A95L 77-inch QD-OLED TV Review 2025 - Ultimate Premium Display | Your Shop Online", description: "Sony A95L 77-inch QD-OLED TV review 2025 - The ultimate premium TV with Quantum Dot OLED technology, XR Cognitive Processor, 4K 120Hz gaming, and perfect blacks. Best high-end television for US home theaters.", category: "Displays", url: "Posts/sony-a95l-qd-oled-77.html" },
    { title: "Sony FE 24-70mm F2.8 GM II Review 2025 - Professional Standard Zoom Perfected | Your Shop Online", description: "Sony FE 24-70mm F2.8 GM II review 2025 - Professional standard zoom lens with breakthrough optical quality and lightning-fast autofocus. Complete guide for serious photographers in the United States.", category: "Products", url: "Posts/sony-fe-24-70mm-gm-ii.html" },
    { title: "Sony VPL-XW5000ES Review 2025 - Premium 4K Laser Projector | Your Shop Online", description: "Sony VPL-XW5000ES 4K HDR laser projector review for 2025 - Premium home theater performance with native 4K SXRD, 2000 lumens brightness, and cinema-quality picture. Complete buyer's guide for US home theater enthusiasts.", category: "Products", url: "Posts/sony-vpl-xw5000es-projector.html" },
    { title: "Sony WF-1000XM6 Review 2025 - Best Noise Cancelling Earbuds | Your Shop Online", description: "Sony WF-1000XM6 review 2025 - Industry-leading wireless earbuds with best-in-class noise cancellation, exceptional sound quality, and premium features. Complete buyer's guide for US shoppers.", category: "Audio", url: "Posts/sony-wf-1000xm6.html" },
    { title: "Sony WH-1000XM5 Headphones 2025 Review - Best Noise Cancelling", description: "Sony WH-1000XM5 Review: Industry-leading noise cancellation, 30-hour battery, superior sound quality. Best premium headphones at $398. Complete guide - Perfect for US shoppers.", category: "Audio", url: "Posts/sony-wh-1000xm5.html" },
    { title: "Steelcase Leap V2 Review 2025 | Ergonomic Chair Worth $1,143?", description: "Steelcase Leap V2 ergonomic office chair review - Premium adjustable chair with LiveBack technology. Is this $1,143 chair worth it for your back? Our honest 2025 review.", category: "Gaming", url: "Posts/steelcase-leap-v2-chair.html" },
    { title: "Tag Heuer Connected Calibre E4 Review 2025 - Ultimate Luxury Excellence | Your Shop Online", description: "Tag Heuer Connected Calibre E4 2025 review - Premium luxury product with exceptional build quality and professional-grade performance. The ultimate choice for discerning customers in the United States.", category: "Products", url: "Posts/tag-heuer-connected-calibre-e4.html" },
    { title: "TAGRY X08 Bluetooth Headphones Review - 60H Playtime Wireless Earbuds 2025", description: "TAGRY X08 Bluetooth headphones review with 60-hour battery life, wireless charging, and IPX5 waterproof rating. Best budget earbuds for 2025 tested - Perfect for US shoppers.", category: "Audio", url: "Posts/tagry-x08-headphones.html" },
    { title: "Technics SL-1200GR Review 2025 | Your Shop Online", description: "Technics SL-1200GR turntable review - Direct drive turntable with coreless motor and precision engineering. Best audiophile turntable for US vinyl lovers 2025.", category: "Products", url: "Posts/technics-sl1200gr-turntable.html" },
    { title: "Tempur-Pedic GrandBreeze King Mattress Review 2025 - Ultimate Sleep | Your Shop Online", description: "Tempur-Pedic GrandBreeze King Mattress review 2025 - Ultimate cooling technology, pressure relief, and 25-year warranty. Premium sleep at $5,499. Complete US buyer's guide.", category: "Products", url: "Posts/tempur-pedic-grandbreeze-mattress.html" },
    { title: "Theragun PRO Plus Review 2025 - Premium Wellness & Fitness | Your Shop Online", description: "Theragun PRO Plus review 2025: Professional-grade percussion massage device with 60 lbs force, 16mm amplitude, biometric sensor, rotating arm, 6 attachments, and 150-minute battery. Ultimate recovery tool for athletes.", category: "Wellness & Fitness", url: "Posts/theragun-pro-plus.html" },
    { title: "Thermomix TM6 Review 2025 - The Ultimate Smart Kitchen Appliance | Your Shop Online", description: "Thermomix TM6 review 2025 - All-in-one smart kitchen appliance with 20+ functions: cooking, blending, steaming, weighing. German precision at $1,499. Complete US buyer's guide.", category: "Products", url: "Posts/thermomix-tm6-kitchen.html" },
    { title: "Tile Pro Bluetooth Tracker Review - Best Item Finder 2025 | Your Shop Online", description: "Tile Pro Bluetooth tracker review with 400-foot range, replaceable battery, and loud ring. Best alternative to AirTag for Android and iPhone users - Perfect for US shoppers.", category: "Trackers", url: "Posts/tile-pro-tracker.html" },
    { title: "Traeger Timberline 1300 Review 2025 | WiFi Pellet Grill Worth $2,499?", description: "Traeger Timberline 1300 WiFi Pellet Grill review - This $2,499 smart grill delivers restaurant-quality results with full app control. Is it worth the investment? Our comprehensive 2025 review.", category: "Networking", url: "Posts/traeger-timberline-1300.html" },
    { title: "Vitamix A3500 Ascent Blender Review - Best Premium Blender 2025 | Your Shop Online", description: "Vitamix A3500 Ascent blender review with self-detect technology, touchscreen controls, variable speed, 10-year warranty, and professional performance. Best premium blender 2025 - Perfect for US home chefs.", category: "Kitchen", url: "Posts/vitamix-a3500-ascent.html" },
    { title: "Weber Genesis EX-335 Smart Grill Review 2025 | Your Shop Online", description: "Weber Genesis EX-335 Smart Gas Grill review - Premium 3-burner grill with smart technology, side burner, and restaurant-quality cooking. Best outdoor grill for US homes 2025.", category: "Kitchen", url: "Posts/weber-genesis-ex-335.html" },
    { title: "Wolf Dual Fuel Range Review 2025 - Ultimate Luxury Excellence | Your Shop Online", description: "Wolf Dual Fuel Range 2025 review - Premium luxury product with exceptional build quality and professional-grade performance. The ultimate choice for discerning customers in the United States.", category: "Products", url: "Posts/wolf-dual-fuel-range.html" },
    { title: "WOLF Gourmet Elite Countertop Oven Review 2025 - Professional Countertop Cooking | Your Shop Online", description: "WOLF Gourmet Elite Countertop Oven review for 2025 - Professional-grade convection cooking meets precision engineering. Complete buyer's guide for serious home cooks in the United States.", category: "Products", url: "Posts/wolf-gourmet-countertop-oven.html" },
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
