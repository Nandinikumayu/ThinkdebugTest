import React, { useState } from "react";
import { useShop } from "../context/ShopContext";

export default function CartModal() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQty,
    removeFromCart,
    clearCart,
    cartSubtotal,
    totalCartCount,
    showToast
  } = useShop();

  const [checkoutComplete, setCheckoutComplete] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutComplete(true);
    setTimeout(() => {
      clearCart();
      setCheckoutComplete(false);
      setIsCartOpen(false);
      showToast("Order placed successfully! Thank you for shopping with us 🎉", "success");
    }, 2000);
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsCartOpen(false)}>
      <div
        className="modal-container cart-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="cart-modal-title"
      >
        <div className="modal-header">
          <div className="modal-title-wrap">
            <h2 id="cart-modal-title" className="modal-title">Shopping Cart</h2>
            <span className="modal-count-pill">{totalCartCount} items</span>
          </div>
          <button
            className="modal-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart modal"
          >
            ✕
          </button>
        </div>

        {checkoutComplete ? (
          <div className="checkout-success-view">
            <div className="success-icon-animation">✓</div>
            <h3>Processing Your Order...</h3>
            <p>Your payment is being confirmed. Thank you for your purchase!</p>
          </div>
        ) : cart.length === 0 ? (
          <div className="cart-empty-view">
            <div className="empty-cart-icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Explore our special products and add items to your cart!</p>
            <button
              className="btn-continue-shopping"
              onClick={() => setIsCartOpen(false)}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-scroll">
              {cart.map((item) => (
                <div key={item.id} className="cart-item-row">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cart-item-img"
                  />
                  <div className="cart-item-details">
                    <h4 className="cart-item-title">{item.title}</h4>
                    <p className="cart-item-unit-price">
                      ${Number(item.price).toFixed(2)} each
                    </p>
                    <div className="cart-item-stepper">
                      <button
                        className="stepper-btn"
                        onClick={() => updateCartQty(item.id, -1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="stepper-value">{item.quantity}</span>
                      <button
                        className="stepper-btn"
                        onClick={() => updateCartQty(item.id, 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-right">
                    <span className="cart-item-total-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      className="cart-item-remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      title="Remove item"
                      aria-label="Remove item"
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

            <div className="modal-footer cart-footer">
              <div className="cart-summary-line">
                <span>Subtotal</span>
                <strong>${cartSubtotal.toFixed(2)}</strong>
              </div>
              <div className="cart-summary-line">
                <span>Shipping</span>
                <span className="free-shipping-tag">FREE</span>
              </div>
              <div className="cart-summary-total">
                <span>Total Amount:</span>
                <span className="total-highlight">${cartSubtotal.toFixed(2)}</span>
              </div>

              <div className="cart-action-buttons">
                <button className="btn-clear-cart" onClick={clearCart}>
                  Clear Cart
                </button>
                <button className="btn-checkout" onClick={handleCheckout}>
                  Proceed to Checkout (${cartSubtotal.toFixed(2)})
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
