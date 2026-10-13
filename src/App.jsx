import React from "react";
import { ShopProvider, useShop } from "./context/ShopContext";
import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import CategoryFilter from "./components/CategoryFilter";
import ProductCard from "./components/ProductCard";
import CartModal from "./components/CartModal";
import WishlistModal from "./components/WishlistModal";
import Toast from "./components/Toast";
import "./App.css";

function ShopContent() {
  const { products, loading, error, searchQuery, setSelectedCategory, setSearchQuery } = useShop();

  return (
    <div className="store-app">
      <Header />

      <main className="main-content">
        <div className="content-container">
          <HeroSlider />

          <CategoryFilter />

          {loading && products.length === 0 ? (
            <div className="products-loading-state">
              <div className="spinner"></div>
              <p>Loading fresh products from store...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="products-empty-state">
              <div className="empty-search-icon">🔍</div>
              <h3>No products found</h3>
              <p>We couldn't find anything matching your search criteria.</p>
              <button
                className="btn-reset-filters"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
              >
                Reset Filters & Search
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="store-footer">
        <div className="footer-container">
          <div className="footer-col">
            <h4 className="footer-title">e-commerce</h4>
            <p>Your one-stop destination for electronics, trending fashion, and everyday essentials.</p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#products">Special Products</a></li>
              <li><a href="#deals">Today's Deals</a></li>
              <li><a href="#about">About Thinkdebug</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Customer Service</h4>
            <ul>
              <li><a href="#shipping">Free Shipping Policy</a></li>
              <li><a href="#returns">30-Day Easy Returns</a></li>
              <li><a href="#track">Track Your Order</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Secure Shopping</h4>
            <p>100% Secure Checkout with 256-bit SSL encryption.</p>
            <div className="payment-badges">
              <span>💳 Visa</span>
              <span>💳 MasterCard</span>
              <span>⚡ PayPal</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} e-commerce | Thinkdebug React System Test. All rights reserved.</p>
        </div>
      </footer>

      <CartModal />
      <WishlistModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <ShopContent />
    </ShopProvider>
  );
}
