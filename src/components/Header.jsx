import React from "react";
import { useShop } from "../context/ShopContext";

export default function Header() {
  const {
    searchQuery,
    setSearchQuery,
    totalCartCount,
    totalWishlistCount,
    setIsCartOpen,
    setIsWishlistOpen
  } = useShop();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const productSection = document.getElementById("products-section");
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="site-header">
      <div className="header-container">
        <a href="#" className="brand-logo" aria-label="E-Commerce Home">
          <div className="logo-icon-wrap">
            <svg
              className="logo-cart-svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </div>
          <span className="brand-name">
            <span className="brand-e">e-</span>
            <span className="brand-commerce">commerce</span>
          </span>
        </a>

        <form className="header-search-form" onSubmit={handleSearchSubmit}>
          <div className="search-input-wrapper">
            <input
              type="text"
              id="search-input"
              className="search-input"
              placeholder="Search for Products, Brands and More"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search products"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery("")}
                title="Clear search"
              >
                ✕
              </button>
            )}
            <button type="submit" className="search-button" aria-label="Search">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </form>

        <div className="header-actions">
          <button
            className="action-btn wishlist-btn"
            onClick={() => setIsWishlistOpen(true)}
            aria-label={`Wishlist with ${totalWishlistCount} items`}
          >
            <div className="icon-with-badge">
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill={totalWishlistCount > 0 ? "#ef4444" : "none"}
                stroke="#1f2937"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span className="badge-count wishlist-badge">{totalWishlistCount}</span>
            </div>
            <span className="action-btn-text">Wishlist</span>
          </button>

          <button
            className="action-btn cart-btn"
            onClick={() => setIsCartOpen(true)}
            aria-label={`Cart with ${totalCartCount} items`}
          >
            <div className="icon-with-badge">
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="#1f2937"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className="badge-count cart-badge">{totalCartCount}</span>
            </div>
            <span className="action-btn-text">Cart</span>
          </button>
        </div>
      </div>
    </header>
  );
}
