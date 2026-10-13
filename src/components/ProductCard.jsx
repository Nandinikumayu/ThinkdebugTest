import React from "react";
import { useShop } from "../context/ShopContext";

export default function ProductCard({ product }) {
  const {
    addToCart,
    updateCartQty,
    getCartItemQty,
    toggleWishlist,
    isInWishlist
  } = useShop();

  const isWishlisted = isInWishlist(product.id);
  const cartQty = getCartItemQty(product.id);

  return (
    <div className="product-card">
      <button
        className={`wishlist-heart-btn ${isWishlisted ? "active" : ""}`}
        onClick={() => toggleWishlist(product)}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill={isWishlisted ? "#ef4444" : "none"}
          stroke={isWishlisted ? "#ef4444" : "#e11d48"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>

      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="product-thumbnail"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80";
          }}
        />
      </div>

      <div className="product-info-box">
        <h3 className="product-card-title" title={product.title}>
          {product.title}
        </h3>

        <div className="product-price-row">
          <span className="price-prefix">From </span>
          <span className="price-value">${Number(product.price).toFixed(product.price % 1 === 0 ? 0 : 2)}</span>
        </div>

        {product.rating && (
          <div className="product-rating-row">
            <span className="rating-stars">★ {product.rating.rate}</span>
            <span className="rating-count">({product.rating.count})</span>
          </div>
        )}

        <div className="product-action-zone">
          {cartQty === 0 ? (
            <button
              className="btn-add-to-cart"
              onClick={() => addToCart(product)}
              aria-label={`Add ${product.title} to cart`}
            >
              <span className="btn-lightning-icon">⚡</span>
              <span className="btn-text">ADD TO CART</span>
            </button>
          ) : (
            <div className="cart-counter-wrap">
              <div className="cart-qty-pill">
                <button
                  className="qty-btn-minus"
                  onClick={() => updateCartQty(product.id, -1)}
                  aria-label="Decrease quantity"
                  title={cartQty === 1 ? "Remove item" : "Decrease quantity"}
                >
                  {cartQty === 1 ? (
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  ) : (
                    "−"
                  )}
                </button>
                <span className="cart-qty-value">{cartQty}</span>
                <button
                  className="qty-btn-plus"
                  onClick={() => updateCartQty(product.id, 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <div className="added-to-cart-feedback">
                <span className="green-dot">●</span> Added To Cart
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
