import React from "react";
import { useShop } from "../context/ShopContext";

export default function CategoryFilter() {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    products,
    searchQuery
  } = useShop();

  const formatCategoryName = (cat) => {
    if (cat === "all") return "All Categories";
    return cat
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  return (
    <div className="catalog-header-bar" id="products-section">
      <div className="section-titles">
        <h2 className="main-section-title">Special Products For You</h2>
        <p className="sub-section-title">
          {searchQuery ? (
            <span>
              Showing results for "<strong>{searchQuery}</strong>" ({products.length} products found)
            </span>
          ) : (
            "Special Products For You"
          )}
        </p>
      </div>

      <div className="filter-sort-controls">
        <div className="category-chips-list">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-chip ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {formatCategoryName(cat)}
            </button>
          ))}
        </div>

        <div className="sort-wrapper">
          <label htmlFor="sort-select" className="sort-label">
            Sort by:
          </label>
          <select
            id="sort-select"
            className="sort-dropdown"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
          </select>
        </div>
      </div>
    </div>
  );
}
