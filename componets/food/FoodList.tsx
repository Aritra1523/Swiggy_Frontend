"use client";

import useFoodList from "@/customHooks/foodList/useFoodList";
import { useState, useMemo, useEffect } from "react";
import FoodCard from "./foodCard";
import FoodSkeleton from "./FoodSkeleton";
import FoodFilters from "./FoodFilters";
import { socket } from "@/lib/socket/socket";
import Swal from "sweetalert2";

export default function FoodList() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<string>("popularity");

  const { foods, loading, error } = useFoodList();

  useEffect(() => {
    socket.connect();

    const handleConnect = () => {
      console.log("Connected:", socket.id);
    };

    const handleRestaurantStatus = (data: any) => {
      console.log("Restaurant:", data);

      alert(`${data.restaurantName} is ${data.isOpen ? "OPEN" : "CLOSED"}`);
    };

  const handleFoodStatus = (data: any) => {
  console.log("Food:", data);
  
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  Toast.fire({
    icon: data.isAvailable ? "success" : "error",
    title: data.isAvailable ? "✅ Available" : "❌ Out of Stock",
    html: `
      <div style="text-align: center; padding: 2px 0;">
        <p style="font-size: 15px; font-weight: 600; margin: 0; color: #1f2937;">
          ${data.itemName}
        </p>
        <p style="font-size: 12px; margin: 2px 0 0 0; 
          color: ${data.isAvailable ? '#16a34a' : '#dc2626'}; 
          font-weight: 500;">
          ${data.isAvailable ? "🟢 Available" : "🔴 Out of Stock"}
        </p>
      </div>
    `,
    background: '#ffffff',
    iconColor: data.isAvailable ? '#22c55e' : '#ef4444',
    width: 320,
    padding: '12px',
  });
};

    socket.on("connect", handleConnect);
    socket.on("restaurant:status", handleRestaurantStatus);
    socket.on("food:status", handleFoodStatus);
    return () => {
      socket.off("connect", handleConnect);
      socket.off("restaurant:status", handleRestaurantStatus);
      socket.off("food:status", handleFoodStatus);
      socket.disconnect();
    };
  }, []);
  const filteredFoods = useMemo(() => {
    if (!foods.length) return [];

    let filtered = [...foods];

    // Filter by category (veg/non-veg)
    if (selectedCategory === "veg") {
      filtered = filtered.filter((food) => food.isVeg);
    } else if (selectedCategory === "non-veg") {
      filtered = filtered.filter((food) => !food.isVeg);
    }

    // Filter by price range
    filtered = filtered.filter(
      (food) =>
        food.discountPrice >= priceRange[0] &&
        food.discountPrice <= priceRange[1],
    );

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.discountPrice - b.discountPrice);
        break;
      case "price-high":
        filtered.sort((a, b) => b.discountPrice - a.discountPrice);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "popularity":
      default:
        filtered.sort((a, b) => (b.totalRatings || 0) - (a.totalRatings || 0));
        break;
    }

    return filtered;
  }, [foods, selectedCategory, priceRange, sortBy]);

  if (loading) {
    return <FoodSkeleton />;
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center py-20">
          <div className="text-6xl mb-4">😕</div>
          <p className="text-red-500 text-lg font-medium">{error}</p>
          <p className="text-gray-400 mt-2">Please try refreshing the page</p>
        </div>
      </section>
    );
  }

  if (!foods.length) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🍽️</div>
          <p className="text-gray-500 text-lg">No food items available</p>
          <p className="text-gray-400 text-sm mt-2">
            Check back later for new additions
          </p>
        </div>
      </section>
    );
  }
  // useEffect(() => {

  // }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Popular Food</h2>
          <p className="text-gray-500 mt-1">Discover delicious food near you</p>
        </div>
        <div className="mt-4 md:mt-0">
          <span className="text-sm text-gray-500">
            {filteredFoods.length} items found
          </span>
        </div>
      </div>

      <FoodFilters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {filteredFoods.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No items match your filters</p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setPriceRange([0, 1000]);
              setSortBy("popularity");
            }}
            className="mt-4 text-orange-500 hover:text-orange-600 font-medium"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFoods.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>
      )}
    </section>
  );
}
