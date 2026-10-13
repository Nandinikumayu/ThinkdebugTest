import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { initialProducts } from "../data/initialProducts";

const ShopContext = createContext();

const CART_STORAGE_KEY = "thinkdebug_ecommerce_cart_v1";
const WISHLIST_STORAGE_KEY = "thinkdebug_ecommerce_wishlist_v1";
const API_CACHE_KEY = "thinkdebug_products_cache_v1";

export function ShopProvider({ children }) {
  // Products state
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  // Cart state persisted to localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted to localStorage (set of IDs)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "info") => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 2800);
  }, []);

  // Sync Cart with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
      console.warn("Could not persist cart to localStorage", err);
    }
  }, [cart]);

  // Sync Wishlist with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (err) {
      console.warn("Could not persist wishlist to localStorage", err);
    }
  }, [wishlist]);

  // Debounce search query to optimize filtering and bonus points
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 250);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch products from public API with caching (fakestoreapi.com/products)
  useEffect(() => {
    let isMounted = true;
    async function fetchProducts() {
      // Check cache first
      try {
        const cached = sessionStorage.getItem(API_CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0 && isMounted) {
            // Merge with initial preview products (avoiding ID collisions)
            const combined = [...initialProducts];
            parsed.forEach((apiItem) => {
              if (!combined.some((item) => item.title.toLowerCase() === apiItem.title.toLowerCase())) {
                combined.push(apiItem);
              }
            });
            setProducts(combined);
            return;
          }
        }
      } catch (e) {
        console.warn("Cache read error", e);
      }

      setLoading(true);
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);
        const res = await fetch("https://fakestoreapi.com/products", {
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        if (isMounted && Array.isArray(data)) {
          try {
            sessionStorage.setItem(API_CACHE_KEY, JSON.stringify(data));
          } catch {}

          const combined = [...initialProducts];
          data.forEach((apiItem) => {
            if (!combined.some((item) => item.title.toLowerCase() === apiItem.title.toLowerCase())) {
              combined.push(apiItem);
            }
          });
          setProducts(combined);
        }
      } catch (err) {
        if (isMounted) {
          console.log("Using rich fallback products due to API status/offline", err.message);
          // initialProducts is already loaded and ready
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  // Cart operations
  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    showToast(`Added "${product.title}" to cart`, "success");
  }, [showToast]);

  const updateCartQty = useCallback((productId, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    showToast("Removed item from cart", "info");
  }, [showToast]);

  const clearCart = useCallback(() => {
    setCart([]);
    showToast("Cart cleared", "info");
  }, [showToast]);

  const getCartItemQty = useCallback(
    (productId) => {
      const item = cart.find((i) => i.id === productId);
      return item ? item.quantity : 0;
    },
    [cart]
  );

  // Wishlist operations
  const toggleWishlist = useCallback(
    (product) => {
      setWishlist((prev) => {
        const exists = prev.some((item) => item.id === product.id);
        if (exists) {
          showToast(`Removed from wishlist`, "info");
          return prev.filter((item) => item.id !== product.id);
        } else {
          showToast(`Added to wishlist! ❤️`, "success");
          return [...prev, product];
        }
      });
    },
    [showToast]
  );

  const isInWishlist = useCallback(
    (productId) => {
      return wishlist.some((item) => item.id === productId);
    },
    [wishlist]
  );

  const removeFromWishlist = useCallback(
    (productId) => {
      setWishlist((prev) => prev.filter((item) => item.id !== productId));
      showToast("Removed from wishlist", "info");
    },
    [showToast]
  );

  // Derived counts & totals
  const totalCartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const totalWishlistCount = useMemo(() => {
    return wishlist.length;
  }, [wishlist]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["all", ...Array.from(set)];
  }, [products]);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    return products
      .filter((p) => {
        const matchesCategory =
          selectedCategory === "all" ||
          p.category?.toLowerCase() === selectedCategory.toLowerCase();
        const matchesQuery =
          !q ||
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q);
        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return (b.rating?.rate || 0) - (a.rating?.rate || 0);
        return 0; // default order
      });
  }, [products, debouncedQuery, selectedCategory, sortBy]);

  const value = {
    products: filteredProducts,
    allProducts: products,
    loading,
    error,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    cart,
    addToCart,
    updateCartQty,
    removeFromCart,
    clearCart,
    getCartItemQty,
    totalCartCount,
    cartSubtotal,
    isCartOpen,
    setIsCartOpen,
    wishlist,
    toggleWishlist,
    isInWishlist,
    removeFromWishlist,
    totalWishlistCount,
    isWishlistOpen,
    setIsWishlistOpen,
    toast,
    showToast
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}
