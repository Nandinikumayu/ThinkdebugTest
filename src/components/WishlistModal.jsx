import React from "react";
import { useShop } from "../context/ShopContext";

export default function WishlistModal() {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    removeFromWishlist,
    addToCart,
    totalWishlistCount,
    showToast
  } = useShop();

  if (!isWishlistOpen) return null;

  const handleMoveAllToCart = () => {
    wishlist.forEach((item) => addToCart(item));
    showToast("Moved all wishlist items to cart!", "success");
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsWishlistOpen(false)}>
      <div
        className="modal-container wishlist-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="wishlist-modal-title"
      >
        <div className="modal-header">
          <div className="modal-title-wrap">
            <h2 id="wishlist-modal-title" className="modal-title">My Wishlist ❤️</h2>
            <span className="modal-count-pill">{totalWishlistCount} items</span>
          </div>
          <button
            className="modal-close-btn"
            onClick={() => setIsWishlistOpen(false)}
            aria-label="Close wishlist modal"
          >
            ✕
          </button>
        </div>

        {wishlist.length === 0 ? (
          <div className="cart-empty-view">
            <div className="empty-cart-icon">🤍</div>
            <h3>Your wishlist is empty</h3>
            <p>Save items you like by clicking the heart icon on any product.</p>
            <button
              className="btn-continue-shopping"
              onClick={() => setIsWishlistOpen(false)}
            >
              Explore Products
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-scroll">
              {wishlist.map((item) => (
                <div key={item.id} className="cart-item-row">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cart-item-img"
                  />
                  <div className="cart-item-details">
                    <h4 className="cart-item-title">{item.title}</h4>
                    <p className="cart-item-unit-price">
                      ${Number(item.price).toFixed(2)}
                    </p>
                    <span className="category-tag">{item.category}</span>
                  </div>
                  <div className="wishlist-actions-right">
                    <button
                      className="btn-wishlist-add-cart"
                      onClick={() => addToCart(item)}
                      title="Add to Cart"
                    >
                      ⚡ Add to Cart
                    </button>
                    <button
                      className="cart-item-remove-btn"
                      onClick={() => removeFromWishlist(item.id)}
                      title="Remove from wishlist"
                      aria-label="Remove from wishlist"
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="modal-footer wishlist-footer">
              <button
                className="btn-move-all"
                onClick={handleMoveAllToCart}
              >
                Add All To Cart
              </button>
              <button
                className="btn-continue-shopping secondary"
                onClick={() => setIsWishlistOpen(false)}
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
