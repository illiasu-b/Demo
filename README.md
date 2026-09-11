# StyleNest — Fashion E-Commerce Demo

A complete, static fashion e-commerce website built with HTML5, CSS3 and vanilla
JavaScript (ES6). No build step, no dependencies, no backend required — the cart
and wishlist are stored in the browser via `localStorage`, and orders are placed
through a WhatsApp checkout link.

Use this as a sales demo for clothing store owners, or as a starting template
for a real client project.

## Project Structure

```
stylenest/
├── index.html          Home page
├── shop.html            Full catalog with filters + sorting
├── product.html         Single product detail page
├── about.html            Brand story, mission, stats
├── contact.html          Contact form + WhatsApp + map
├── css/
│   ├── style.css         Core design system + components
│   └── responsive.css    Breakpoints (desktop/tablet/mobile)
├── js/
│   ├── products.js       Product database (30 items) + helpers
│   ├── cart.js            Cart logic (localStorage)
│   ├── wishlist.js        Wishlist logic (localStorage)
│   ├── search.js          Live search dropdown
│   └── app.js             Dark mode, animations, testimonials, forms
└── images/               (placeholder — see Image note below)
```

## 1. Run Locally

No build tools needed. Either:

- **Double-click `index.html`** to open it directly in a browser, or
- **Use a local server** (recommended, avoids some browser file:// restrictions):
  ```bash
  # Python
  python3 -m http.server 5500

  # Node (if you have npx)
  npx serve .
  ```
  Then visit `http://localhost:5500`.

## 2. Deploy to Netlify

**Option A — Drag and drop (fastest):**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the whole `stylenest` folder onto the page
3. Netlify gives you a live URL in seconds

**Option B — Git-based deploy:**
1. Push this folder to a GitHub repository
2. Netlify → **Add new site → Import an existing project**
3. Connect the repo — no build command needed, publish directory is `/` (root)
4. Deploy

## 3. Deploy to GitHub Pages

1. Push the folder to a GitHub repo
2. Repo → **Settings → Pages**
3. Source: **Deploy from a branch** → select `main` → folder `/ (root)`
4. Your site will be live at `https://yourusername.github.io/repo-name/`

## 4. Customize Products

All product data lives in `js/products.js` as a single `PRODUCTS` array. Each
product looks like this:

```js
{
  id: 1,
  name: "Classic Crew Neck Tee",
  section: "Men",              // Men / Women / Kids / Shoes / Accessories
  category: "T-Shirts",        // subcategory shown on product cards
  price: 24.99,
  oldPrice: 34.99,
  discount: 29,                // % shown on the badge
  rating: 4.6,
  reviews: 128,
  description: "...",
  sizes: ["S", "M", "L", "XL"],// leave as [] for sizeless items
  colors: ["Black", "White"],  // leave as [] if not applicable
  stock: 42,
  image: "https://...",
  featured: true                // shows on the home page featured grid
}
```

To add, edit, or remove a product, just edit this array — every page (shop,
search, product detail, related products) reads from it automatically.

### Replacing placeholder images

Product photos currently use [Picsum](https://picsum.photos) seeded placeholder
images so the site looks complete without real product photography. For a real
client, replace each `image` URL with an actual hosted product photo (e.g. from
Cloudinary, the client's own CDN, or a folder inside `images/`).

## 5. Customize Branding

- **Colors, fonts, spacing:** all defined as CSS variables at the top of
  `css/style.css` under `:root`. Change these once and the whole site updates.
- **Logo/store name:** search-and-replace "StyleNest" across the HTML files.
- **WhatsApp number:** search for `10000000000` in `js/cart.js`,
  `product.html`, and `contact.html` — replace with the real store's WhatsApp
  number (international format, no `+` or spaces).
- **Contact details, social links, footer:** edit directly in the footer
  markup of each HTML page.

## Features Included

- Responsive design (4 / 3 / 2 product columns across desktop / tablet / mobile)
- Mobile bottom navigation bar
- Live search with highlighted matches
- Category and price filtering + sorting (newest, price, rating) on the shop page
- Product detail page with size/color selection, quantity, image gallery
- Shopping cart (add/remove/update quantity, subtotal, shipping, total) via `localStorage`
- Wishlist via `localStorage`
- WhatsApp checkout — generates a pre-filled order message
- Dark mode toggle with saved preference
- Scroll fade-in animations, hover effects, image zoom on product cards
- Testimonials carousel
- Newsletter and contact forms (client-side validation + confirmation toast)
- "Need a Website Like This?" sales CTA on every page — the built-in pitch to
  convert store owners into clients
