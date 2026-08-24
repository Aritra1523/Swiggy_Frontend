"use client";

import { useState } from "react";

interface Props {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function FoodFilters({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  sortBy,
  onSortChange,
}: Props) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = [
    { value: "all", label: "All" },
    { value: "veg", label: "🌱 Veg" },
    { value: "non-veg", label: "🍖 Non-Veg" },
  ];

  const sortOptions = [
    { value: "popularity", label: "Popularity" },
    { value: "rating", label: "Rating" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
  ];

  return (
    <div className="mb-8">
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="md:hidden w-full bg-white border rounded-lg px-4 py-2 text-left font-medium mb-4"
      >
        {isFilterOpen ? "▼ Hide Filters" : "▶ Show Filters"}
      </button>

      <div className={`${isFilterOpen ? "block" : "hidden md:block"}`}>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => onCategoryChange(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat.value
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="md:ml-auto px-4 py-2 border rounded-lg bg-white text-sm focus:ring-2 focus:ring-orange-500 outline-none"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                Sort by: {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="mt-4 flex items-center gap-4">
          <span className="text-sm text-gray-600 font-medium">Price:</span>
          <div className="flex-1 max-w-xs flex items-center gap-3">
            <span className="text-xs text-gray-500">₹{priceRange[0]}</span>
            <input
              type="range"
              min="0"
              max="1000"
              step="50"
              value={priceRange[1]}
              onChange={(e) =>
                onPriceRangeChange([priceRange[0], parseInt(e.target.value)])
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <span className="text-xs text-gray-500">₹{priceRange[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}