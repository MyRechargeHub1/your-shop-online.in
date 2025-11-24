# Your Shop Online

A modern, responsive e-commerce website built with HTML, CSS, and JavaScript, hosted on GitHub Pages.

## Features

- 🎨 Modern and clean design
- 📱 Fully responsive layout (mobile, tablet, desktop)
- 🛒 Interactive shopping cart
- 🎯 Smooth scrolling navigation
- ✨ Animations and transitions
- 🚀 Fast and lightweight
- 🔍 Product showcase with categories
- 📝 Blog with Amazon Best Sellers reviews (Amazon Affiliate integration)
- 📧 Contact form and newsletter subscription

## Live Demo

Visit the live website at: `https://your-username.github.io/your-shop-online.in/`

## Structure

```
your-shop-online.in/
├── index.html          # Main HTML file
├── blog.html           # Blog page with Amazon Best Sellers
├── styles.css          # Main stylesheet
├── blog-styles.css     # Blog-specific styles
├── script.js           # JavaScript functionality
└── README.md           # Documentation
```

## Sections

### Home Page (index.html)
1. **Hero Section** - Welcome banner with call-to-action
2. **Features** - Key benefits (Free Shipping, Easy Returns, Secure Payment, 24/7 Support)
3. **Products** - Showcase of featured products with add-to-cart functionality
4. **About** - Information about the business
5. **Contact** - Contact information and form
6. **Footer** - Links, newsletter subscription, and social media

### Blog Page (blog.html)
- **10 Blog Posts** featuring Amazon Best Sellers 2024
- Categories: VR Gaming, Audio, Gaming Accessories, Tablets, Fitness Trackers, and more
- Amazon Affiliate links with Store ID: topgaming2303-20
- Detailed product reviews and recommendations

## Functionality

### Shopping Cart
- Add products to cart
- View cart contents in modal
- Remove items from cart
- Real-time cart count updates
- Calculate total price

### Responsive Navigation
- Smooth scrolling to sections
- Active link highlighting
- Mobile-friendly hamburger menu

### Interactive Elements
- Product cards with hover effects
- Animated notifications
- Form submissions
- Newsletter subscription

## Customization

### Adding Products

Edit the `products` array in `script.js`:

```javascript
{
    id: 1,
    name: "Product Name",
    category: "Category",
    price: 99.99,
    description: "Product description",
    icon: "🎁"
}
```

### Changing Colors

Update CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #f59e0b;
    /* ... other variables */
}
```

### Contact Information

Update contact details in the Contact section of `index.html`.

## GitHub Pages Setup

1. Go to your repository settings
2. Navigate to "Pages" section
3. Under "Source", select the branch you want to deploy (e.g., `main` or `claude/setup-github-pages-shop-...`)
4. Click "Save"
5. Your site will be published at `https://your-username.github.io/your-shop-online.in/`

## Technologies Used

- HTML5
- CSS3 (Flexbox, Grid, Animations)
- Vanilla JavaScript (ES6+)
- Font Awesome Icons
- Google Fonts

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Future Enhancements

- [ ] Product search functionality
- [ ] Product filtering and sorting
- [ ] Individual product pages
- [ ] Checkout process
- [ ] Payment gateway integration
- [ ] User authentication
- [ ] Backend API integration
- [ ] Order history
- [ ] Product reviews and ratings
- [ ] Wishlist feature

## License

This project is open source and available under the MIT License.

## Contact

For questions or support, please contact: info@your-shop-online.in

---

Built with ❤️ for GitHub Pages
