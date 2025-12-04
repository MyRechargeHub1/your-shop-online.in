const fs = require('fs');
const path = require('path');

// Product database with categories (from script.js search database)
const products = {
    "3in1-charging-station.html": { title: "3-in-1 Wireless Charging Station", category: "Power & Charging" },
    "airpods-pro-2.html": { title: "Apple AirPods Pro 2", category: "Audio" },
    "alienware-aurora-r16.html": { title: "Alienware Aurora R16 Gaming Desktop", category: "Gaming Desktops" },
    "amazon-echo-hub.html": { title: "Amazon Echo Hub", category: "Smart Home" },
    "anker-power-bank.html": { title: "Anker 20K mAh Power Bank", category: "Power & Charging" },
    "anker-powercore-26800.html": { title: "Anker PowerCore 26800", category: "Power & Charging" },
    "anker-solix-f3800.html": { title: "Anker SOLIX F3800 Power Station", category: "Power & Energy" },
    "anker-usb-c-hub.html": { title: "Anker USB-C Hub 7-in-1", category: "Accessories" },
    "apple-airtag.html": { title: "Apple AirTag 4 Pack", category: "Trackers" },
    "apple-homepod-2.html": { title: "Apple HomePod 2", category: "Smart Home" },
    "apple-vision-pro.html": { title: "Apple Vision Pro", category: "VR/AR" },
    "apple-watch-se.html": { title: "Apple Watch SE (2nd Gen)", category: "Wearables" },
    "apple-watch-ultra-2.html": { title: "Apple Watch Ultra 2", category: "Wearables" },
    "asus-rog-zephyrus-g16.html": { title: "Asus ROG Zephyrus G16", category: "Laptops" },
    "beats-studio-pro.html": { title: "Beats Studio Pro Wireless Headphones", category: "Audio" },
    "bengoo-g9000.html": { title: "BENGOO G9000 Gaming Headset", category: "Gaming" },
    "blink-video-doorbell.html": { title: "Blink Video Doorbell", category: "Smart Home" },
    "bose-quietcomfort-ultra-headphones.html": { title: "Bose QuietComfort Ultra Headphones", category: "Audio" },
    "bose-ultra-open-earbuds.html": { title: "Bose Ultra Open Earbuds", category: "Audio" },
    "bowers-wilkins-px8.html": { title: "Bowers & Wilkins Px8", category: "Audio" },
    "breville-barista-express.html": { title: "Breville Barista Express", category: "Kitchen" },
    "canon-eos-r6-mark-ii.html": { title: "Canon EOS R6 Mark II", category: "Cameras" },
    "dell-xps-17-2025.html": { title: "Dell XPS 17 (2025)", category: "Laptops" },
    "delonghi-specialista-maestro.html": { title: "DeLonghi La Specialista Maestro", category: "Kitchen" },
    "dji-mini-4-pro.html": { title: "DJI Mini 4 Pro", category: "Drones" },
    "dyson-purifier-hot-cool.html": { title: "Dyson Purifier Hot+Cool HP07", category: "Home Appliances" },
    "dyson-v15-detect.html": { title: "Dyson V15 Detect", category: "Home Appliances" },
    "echo-dot-5th-gen.html": { title: "Echo Dot 5th Gen", category: "Audio" },
    "elgato-stream-deck-xl.html": { title: "Elgato Stream Deck XL", category: "Streaming Gear" },
    "fire-tv-stick-4k.html": { title: "Amazon Fire TV Stick 4K Max", category: "Streaming Devices" },
    "fitbit-inspire-3.html": { title: "Fitbit Inspire 3", category: "Trackers" },
    "galaxy-tab-a9.html": { title: "Samsung Galaxy Tab A9+", category: "Tablets" },
    "gopro-hero-12-black.html": { title: "GoPro HERO 12 Black", category: "Action Cameras" },
    "herman-miller-embody-gaming.html": { title: "Herman Miller Embody Gaming Chair", category: "Gaming" },
    "instant-pot-duo.html": { title: "Instant Pot Duo 7-in-1", category: "Kitchen" },
    "ipad-11-inch.html": { title: "Apple iPad 11-inch", category: "Tablets" },
    "ipad-pro-12-9-m2.html": { title: "iPad Pro 12.9-inch M2", category: "Tablets" },
    "iphone-16-pro-max.html": { title: "iPhone 16 Pro Max", category: "Smartphones" },
    "irobot-roomba-j7.html": { title: "iRobot Roomba j7+", category: "Home Appliances" },
    "jbl-flip-6.html": { title: "JBL Flip 6 Portable Speaker", category: "Audio" },
    "keychron-q1-pro.html": { title: "Keychron Q1 Pro", category: "Accessories" },
    "kindle-paperwhite.html": { title: "Amazon Kindle Paperwhite 16GB", category: "E-Readers" },
    "kitchenaid-pro-line-mixer.html": { title: "KitchenAid Pro Line Stand Mixer", category: "Kitchen" },
    "lg-27-4k-monitor.html": { title: "LG 27-Inch 4K UHD Monitor", category: "Displays" },
    "lg-c3-oled-65.html": { title: "LG C3 OLED 65-inch TV", category: "Displays" },
    "logitech-g502.html": { title: "Logitech G502 HERO Gaming Mouse", category: "Gaming" },
    "logitech-mx-master-3s.html": { title: "Logitech MX Master 3S", category: "Accessories" },
    "macbook-pro-16-m3.html": { title: "MacBook Pro 16-inch M3 Max", category: "Laptops" },
    "macbook-pro-16-m3-max.html": { title: "MacBook Pro 16-inch M3 Max", category: "Laptops" },
    "macbook-pro-16-m4-max.html": { title: "MacBook Pro 16-inch M4 Max", category: "Laptops" },
    "meta-quest-3.html": { title: "Meta Quest 3", category: "Gaming" },
    "meta-quest-3s.html": { title: "Meta Quest 3S 128GB", category: "Gaming" },
    "microsoft-surface-laptop-studio-2.html": { title: "Microsoft Surface Laptop Studio 2", category: "Laptops" },
    "microsoft-surface-pro-10.html": { title: "Microsoft Surface Pro 10", category: "Laptops" },
    "nespresso-creatista-plus.html": { title: "Nespresso Creatista Plus", category: "Kitchen" },
    "netgear-nighthawk-raxe500.html": { title: "Netgear Nighthawk RAXE500", category: "Networking" },
    "ninja-air-fryer.html": { title: "Ninja Air Fryer Pro", category: "Kitchen" },
    "ninja-foodi-smart-xl-grill.html": { title: "Ninja Foodi Smart XL Grill", category: "Kitchen" },
    "peloton-bike-plus.html": { title: "Peloton Bike+", category: "Fitness" },
    "philips-hue-play-sync-box.html": { title: "Philips Hue Play HDMI Sync Box", category: "Smart Home" },
    "razer-blade-15-2024.html": { title: "Razer Blade 15 2024", category: "Laptops" },
    "ring-doorbell-pro-2.html": { title: "Ring Video Doorbell Pro 2", category: "Smart Home" },
    "roku-streaming-stick.html": { title: "Roku Streaming Stick 4K Plus", category: "Streaming Devices" },
    "roomba-694.html": { title: "iRobot Roomba 694", category: "Home Appliances" },
    "samsung-frame-tv-65.html": { title: "Samsung The Frame 65", category: "Displays" },
    "samsung-galaxy-s24-ultra.html": { title: "Samsung Galaxy S24 Ultra", category: "Smartphones" },
    "samsung-galaxy-s25-ultra.html": { title: "Samsung Galaxy S25 Ultra", category: "Smartphones" },
    "samsung-galaxy-z-fold-6.html": { title: "Samsung Galaxy Z Fold 6", category: "Smartphones" },
    "samsung-odyssey-oled-g9.html": { title: "Samsung Odyssey OLED G9", category: "Gaming" },
    "secretlab-titan-evo.html": { title: "Secretlab TITAN Evo 2022", category: "Gaming" },
    "smart-watch-2025.html": { title: "Smart Watch 2025", category: "Wearables" },
    "sonos-arc-soundbar.html": { title: "Sonos Arc Soundbar", category: "Audio" },
    "sony-a7-iv-camera.html": { title: "Sony A7 IV", category: "Cameras" },
    "sony-a7r-v-camera.html": { title: "Sony A7R V Camera", category: "Cameras" },
    "sony-a95l-qd-oled-77.html": { title: "Sony A95L 77-inch QD-OLED TV", category: "Premium TVs" },
    "sony-wf-1000xm6.html": { title: "Sony WF-1000XM6", category: "Audio" },
    "sony-wh-1000xm5.html": { title: "Sony WH-1000XM5 Headphones", category: "Audio" },
    "sony-wh1000xm5.html": { title: "Sony WH-1000XM5", category: "Audio" },
    "tagry-x08-headphones.html": { title: "TAGRY X08 Bluetooth Headphones", category: "Audio" },
    "theragun-pro-plus.html": { title: "Theragun PRO Plus", category: "Wellness & Fitness" },
    "tile-pro-tracker.html": { title: "Tile Pro Bluetooth Tracker", category: "Trackers" },
    "vitamix-a3500-ascent.html": { title: "Vitamix A3500 Ascent Blender", category: "Kitchen" },
    "wyze-cam-v4.html": { title: "WYZE Cam v4", category: "Cameras" },
    "xbox-controller.html": { title: "Xbox Wireless Controller", category: "Gaming" }
};

// Group products by category
const categorizedProducts = {};
Object.entries(products).forEach(([filename, data]) => {
    if (!categorizedProducts[data.category]) {
        categorizedProducts[data.category] = [];
    }
    categorizedProducts[data.category].push({ filename, ...data });
});

// Function to get related posts for a given product
function getRelatedPosts(currentFilename) {
    const currentProduct = products[currentFilename];
    if (!currentProduct) return [];

    const sameCategoryProducts = categorizedProducts[currentProduct.category]
        .filter(p => p.filename !== currentFilename)
        .slice(0, 4); // Get up to 4 related posts

    // If less than 3 from same category, add some from other popular categories
    if (sameCategoryProducts.length < 3) {
        const otherCategories = ['Audio', 'Laptops', 'Smartphones', 'Gaming', 'Smart Home'];
        otherCategories.forEach(cat => {
            if (cat !== currentProduct.category && categorizedProducts[cat] && sameCategoryProducts.length < 3) {
                const additionalPosts = categorizedProducts[cat].slice(0, 3 - sameCategoryProducts.length);
                sameCategoryProducts.push(...additionalPosts);
            }
        });
    }

    return sameCategoryProducts.slice(0, 3);
}

// Function to generate related posts HTML
function generateRelatedPostsHTML(relatedPosts) {
    const cards = relatedPosts.map(post => {
        // Get appropriate icon based on category
        const iconMap = {
            'Audio': 'fa-headphones',
            'Laptops': 'fa-laptop',
            'Smartphones': 'fa-mobile-alt',
            'Gaming': 'fa-gamepad',
            'Smart Home': 'fa-home',
            'Cameras': 'fa-camera',
            'Kitchen': 'fa-utensils',
            'Wearables': 'fa-watch',
            'Tablets': 'fa-tablet-alt',
            'Displays': 'fa-tv',
            'Power & Charging': 'fa-bolt',
            'Accessories': 'fa-keyboard',
            'Home Appliances': 'fa-blender',
            'Trackers': 'fa-map-marker-alt',
            'Fitness': 'fa-dumbbell',
            'Drones': 'fa-helicopter',
            'E-Readers': 'fa-book-reader',
            'Streaming Devices': 'fa-stream',
            'VR/AR': 'fa-vr-cardboard',
            'Networking': 'fa-network-wired',
            'Action Cameras': 'fa-video',
            'Streaming Gear': 'fa-microphone',
            'Wellness & Fitness': 'fa-heartbeat',
            'Premium TVs': 'fa-tv',
            'Gaming Desktops': 'fa-desktop',
            'Power & Energy': 'fa-battery-full'
        };
        const icon = iconMap[post.category] || 'fa-star';

        return `                <a href="${post.filename}" class="related-card">
                    <div class="related-image"><i class="fas ${icon}"></i></div>
                    <h3>${post.title}</h3>
                </a>`;
    }).join('\n');

    return `    <section class="related-posts" aria-label="Related articles">
        <div class="container">
            <h2>You Might Also Like</h2>
            <div class="related-grid">
${cards}
            </div>
        </div>
    </section>`;
}

// Process all posts
const postsDir = './Posts';
const files = Object.keys(products);

console.log(`Processing ${files.length} posts to add related sections...\n`);

let addedCount = 0;
let alreadyHasRelated = 0;

files.forEach(filename => {
    const filePath = path.join(postsDir, filename);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Check if already has related posts section
    if (content.includes('class="related-posts"')) {
        alreadyHasRelated++;
        return;
    }

    // Get related posts
    const relatedPosts = getRelatedPosts(filename);
    if (relatedPosts.length === 0) return;

    // Generate HTML
    const relatedHTML = generateRelatedPostsHTML(relatedPosts);

    // Insert before footer
    const footerRegex = /(\s*<footer class="footer")/;
    if (content.match(footerRegex)) {
        content = content.replace(footerRegex, `${relatedHTML}\n$1`);
        fs.writeFileSync(filePath, content, 'utf-8');
        addedCount++;
        console.log(`✅ Added related posts to: ${filename}`);
    }
});

console.log(`\n${'='.repeat(50)}`);
console.log(`SUMMARY:`);
console.log(`Total posts processed: ${files.length}`);
console.log(`✅ Added related sections: ${addedCount}`);
console.log(`✓ Already had related posts: ${alreadyHasRelated}`);
