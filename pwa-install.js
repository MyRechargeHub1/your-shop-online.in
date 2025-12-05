// PWA Installation Handler for Your Shop Online
// Handles app installation prompts and service worker registration

(function() {
    'use strict';

    let deferredPrompt;
    let installButton;

    // Register Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                    console.log('✅ Service Worker registered successfully:', registration.scope);

                    // Check for updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                console.log('🔄 New content available! Please refresh.');
                                showUpdateNotification();
                            }
                        });
                    });
                })
                .catch((error) => {
                    console.log('❌ Service Worker registration failed:', error);
                });
        });
    }

    // Create install button
    function createInstallButton() {
        // Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
            console.log('✅ App is already installed');
            return;
        }

        // Create install button HTML
        const installButtonHTML = `
            <div id="pwa-install-banner" style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 15px 20px;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
                z-index: 9999;
                display: flex;
                align-items: center;
                gap: 15px;
                max-width: 350px;
                animation: slideInUp 0.5s ease-out;
            ">
                <div style="flex: 1;">
                    <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">
                        📱 Install Our App
                    </div>
                    <div style="font-size: 12px; opacity: 0.9;">
                        Quick access to best deals and reviews
                    </div>
                </div>
                <button id="pwa-install-btn" style="
                    background: white;
                    color: #667eea;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 8px;
                    font-weight: 600;
                    font-size: 13px;
                    cursor: pointer;
                    transition: transform 0.2s;
                    white-space: nowrap;
                ">
                    Install
                </button>
                <button id="pwa-close-btn" style="
                    background: transparent;
                    color: white;
                    border: none;
                    padding: 4px;
                    cursor: pointer;
                    font-size: 20px;
                    line-height: 1;
                    opacity: 0.7;
                    transition: opacity 0.2s;
                ">
                    ×
                </button>
            </div>
            <style>
                @keyframes slideInUp {
                    from {
                        transform: translateY(100px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                #pwa-install-btn:hover {
                    transform: scale(1.05);
                }
                #pwa-close-btn:hover {
                    opacity: 1;
                }
                @media (max-width: 768px) {
                    #pwa-install-banner {
                        bottom: 10px;
                        right: 10px;
                        left: 10px;
                        max-width: none;
                    }
                }
            </style>
        `;

        // Insert banner into page
        document.body.insertAdjacentHTML('beforeend', installButtonHTML);

        installButton = document.getElementById('pwa-install-btn');
        const closeButton = document.getElementById('pwa-close-btn');
        const banner = document.getElementById('pwa-install-banner');

        // Handle install button click
        installButton.addEventListener('click', async () => {
            if (!deferredPrompt) {
                showManualInstallInstructions();
                return;
            }

            // Show the install prompt
            deferredPrompt.prompt();

            // Wait for the user to respond to the prompt
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response to install prompt: ${outcome}`);

            if (outcome === 'accepted') {
                console.log('✅ User accepted the install prompt');
                banner.style.display = 'none';
            } else {
                console.log('❌ User dismissed the install prompt');
            }

            // Clear the deferredPrompt
            deferredPrompt = null;
        });

        // Handle close button click
        closeButton.addEventListener('click', () => {
            banner.style.display = 'none';
            // Remember user dismissed the banner
            localStorage.setItem('pwa-install-dismissed', Date.now());
        });
    }

    // Show manual installation instructions for iOS/other browsers
    function showManualInstallInstructions() {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

        let instructions = '';

        if (isIOS && isSafari) {
            instructions = `
                <div style="text-align: left; line-height: 1.6;">
                    <strong>To install on iOS:</strong><br>
                    1. Tap the Share button (square with arrow)<br>
                    2. Scroll and tap "Add to Home Screen"<br>
                    3. Tap "Add" to confirm
                </div>
            `;
        } else {
            instructions = `
                <div style="text-align: left; line-height: 1.6;">
                    <strong>To install:</strong><br>
                    • Look for the install icon in your browser's address bar<br>
                    • Or check your browser's menu for "Install App" option
                </div>
            `;
        }

        // Create modal
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                padding: 20px;
            ">
                <div style="
                    background: white;
                    padding: 30px;
                    border-radius: 12px;
                    max-width: 400px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                ">
                    <h3 style="margin: 0 0 15px 0; color: #667eea;">Install Your Shop Online</h3>
                    ${instructions}
                    <button onclick="this.closest('[style*=fixed]').remove()" style="
                        background: #667eea;
                        color: white;
                        border: none;
                        padding: 10px 24px;
                        border-radius: 8px;
                        font-weight: 600;
                        margin-top: 20px;
                        cursor: pointer;
                        width: 100%;
                    ">
                        Got it!
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Show update notification
    function showUpdateNotification() {
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: #4CAF50;
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 10000;
                max-width: 300px;
                animation: slideInDown 0.5s ease-out;
            ">
                <div style="font-weight: 600; margin-bottom: 8px;">🎉 Update Available!</div>
                <div style="font-size: 13px; margin-bottom: 12px;">New content is ready. Refresh to get the latest updates.</div>
                <button onclick="window.location.reload()" style="
                    background: white;
                    color: #4CAF50;
                    border: none;
                    padding: 6px 16px;
                    border-radius: 6px;
                    font-weight: 600;
                    cursor: pointer;
                    font-size: 13px;
                ">
                    Refresh Now
                </button>
            </div>
            <style>
                @keyframes slideInDown {
                    from {
                        transform: translateY(-100px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            </style>
        `;
        document.body.appendChild(notification);

        // Auto-dismiss after 10 seconds
        setTimeout(() => {
            notification.remove();
        }, 10000);
    }

    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
        console.log('💡 Install prompt available');

        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();

        // Stash the event so it can be triggered later
        deferredPrompt = e;

        // Check if user previously dismissed
        const dismissed = localStorage.getItem('pwa-install-dismissed');
        if (dismissed && (Date.now() - parseInt(dismissed)) < 7 * 24 * 60 * 60 * 1000) {
            // Don't show again for 7 days
            console.log('⏸️  Install banner dismissed recently');
            return;
        }

        // Show install button after a short delay
        setTimeout(() => {
            createInstallButton();
        }, 3000);
    });

    // Detect if app was successfully installed
    window.addEventListener('appinstalled', () => {
        console.log('✅ PWA was installed successfully');
        deferredPrompt = null;

        // Hide install button if visible
        const banner = document.getElementById('pwa-install-banner');
        if (banner) {
            banner.style.display = 'none';
        }

        // Show success message
        const successMsg = document.createElement('div');
        successMsg.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: #4CAF50;
                color: white;
                padding: 15px 30px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 10000;
                font-weight: 600;
                animation: fadeIn 0.5s ease-out;
            ">
                ✅ App installed successfully!
            </div>
            <style>
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                    to { opacity: 1; transform: translateX(-50%) translateY(0); }
                }
            </style>
        `;
        document.body.appendChild(successMsg);

        setTimeout(() => {
            successMsg.remove();
        }, 3000);
    });

    // Log if running as installed PWA
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
        console.log('✅ Running as installed PWA');

        // Track PWA usage
        if (typeof gtag !== 'undefined') {
            gtag('event', 'pwa_launch', {
                'event_category': 'PWA',
                'event_label': 'App Launched'
            });
        }
    }

})();
