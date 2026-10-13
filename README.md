# E-Commerce Web Application (Thinkdebug React System Test)

A responsive, high-performance E-Commerce frontend built with **React**, **Vite**, and **Pure Custom CSS** (no UI component libraries like MUI, Bootstrap, or Ant Design).

## ✨ Features

- **Custom Product Slider / Hero Banner**:
  - Pure React implementation (no 3rd party carousel libraries).
  - Autoplay functionality with smooth pause on hover.
  - Previous / Next navigation controls and interactive dot pagination.
  - Promotional sales badges ("NEW SALE UP TO 50% OFF").

- **Product Catalog & Management**:
  - Fetches product list from public API (`https://fakestoreapi.com/products`) with in-memory / session caching.
  - Fallback catalog with realistic high-resolution items.
  - Category filtering (All, Electronics, Jewelery, Men's Clothing, Women's Clothing, Groceries).
  - Sorting by Featured, Price (Low to High), Price (High to Low), and Customer Rating.
  - Debounced search functionality to find products by title, category, or description.

- **Shopping Cart**:
  - Add to cart with live quantity counter (`-` / `+`) and `Added To Cart` feedback badge.
  - Header cart counter badge updated in real time.
  - Persistent state saved to `localStorage`.
  - Comprehensive Cart Modal with quantity adjustments, item removal, price calculation, free shipping badge, and simulated checkout flow.

- **Wishlist**:
  - Heart toggle icon on each product card.
  - Persistent state saved to `localStorage`.
  - Header wishlist counter badge.
  - Dedicated Wishlist Modal with "Move All to Cart" and individual item controls.

- **Architecture & Styling**:
  - **React Context API** (`ShopContext`) for global state management.
  - Custom CSS design system adhering to the assignment requirements and visual mockup.

## 🚀 Getting Started

### 1. Install dependencies:
```bash
npm install
```

### 2. Run the development server:
```bash
npm run dev
```

Open the printed URL (usually [http://localhost:5173](http://localhost:5173)) in your browser.

### 3. Build for production:
```bash
npm run build
```
