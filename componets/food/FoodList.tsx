"use client";

import useFoodList from "@/customHooks/foodList/useFoodList";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FoodCard from "./foodCard";
import FoodSkeleton from "./FoodSkeleton";
import FoodFilters from "./FoodFilters";
import { socket } from "@/lib/socket/socket";
import Swal from "sweetalert2";
import { 
  Utensils, 
  RefreshCw, 
  XCircle,
  Search,
  Filter,
  Grid3x3,
  List,
  AlertCircle,
  Coffee,
  Pizza,
  Sandwich,
  Cake,
  IceCream,
  Beef,
  Fish,
  Salad,
  Soup,
  Heart,
  Star,
  Clock,
  Flame,
  Sparkles,
  ChevronDown,
  SlidersHorizontal
} from "lucide-react";

// Pull the searchable text out of a food item
function getSearchableText(food: any) {
  const name = food.name || food.foodName || food.itemName || "";
  const description = food.description || "";
  const category = food.category || "";
  return `${name} ${description} ${category}`.toLowerCase();
}

export default function FoodList({ restaurantId }: { restaurantId?: string }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<string>("popularity");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [socketConnected, setSocketConnected] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get("search")?.trim() || "";

  const { foods, loading, error } = useFoodList(restaurantId);

  // Socket Connection
  useEffect(() => {
    socket.connect();

    const handleConnect = () => {
      console.log("Connected:", socket.id);
      setSocketConnected(true);
    };

    const handleDisconnect = () => {
      setSocketConnected(false);
    };

    const handleRestaurantStatus = (data: any) => {
      console.log("Restaurant:", data);
      
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: data.isOpen ? "success" : "error",
        title: data.isOpen ? "🟢 Open" : "🔴 Closed",
        html: `
          <div style="text-align: center; padding: 2px 0;">
            <p style="font-size: 15px; font-weight: 600; margin: 0; color: #1f2937;">
              ${data.restaurantName}
            </p>
            <p style="font-size: 12px; margin: 2px 0 0 0; 
              color: ${data.isOpen ? "#16a34a" : "#dc2626"}; 
              font-weight: 500;">
              ${data.isOpen ? "🟢 Now Open" : "🔴 Currently Closed"}
            </p>
          </div>
        `,
        background: "#ffffff",
        iconColor: data.isOpen ? "#22c55e" : "#ef4444",
        width: 320,
        padding: "12px",
      });
    };

    const handleFoodStatus = (data: any) => {
      console.log("Food:", data);

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
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
              color: ${data.isAvailable ? "#16a34a" : "#dc2626"}; 
              font-weight: 500;">
              ${data.isAvailable ? "🟢 Available" : "🔴 Out of Stock"}
            </p>
          </div>
        `,
        background: "#ffffff",
        iconColor: data.isAvailable ? "#22c55e" : "#ef4444",
        width: 320,
        padding: "12px",
      });
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("restaurant:status", handleRestaurantStatus);
    socket.on("food:status", handleFoodStatus);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("restaurant:status", handleRestaurantStatus);
      socket.off("food:status", handleFoodStatus);
      socket.disconnect();
    };
  }, []);

  const filteredFoods = useMemo(() => {
    if (!foods?.length) return [];

    let filtered = [...foods];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((food: any) =>
        getSearchableText(food).includes(query),
      );
    }

    if (selectedCategory === "veg") {
      filtered = filtered.filter((food) => food.isVeg);
    } else if (selectedCategory === "non-veg") {
      filtered = filtered.filter((food) => !food.isVeg);
    }

    filtered = filtered.filter(
      (food) =>
        food.discountPrice >= priceRange[0] &&
        food.discountPrice <= priceRange[1],
    );

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
  }, [foods, searchQuery, selectedCategory, priceRange, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setPriceRange([0, 1000]);
    setSortBy("popularity");
    // Clear search param
    const params = new URLSearchParams(searchParams);
    params.delete("search");
    router.push(`?${params.toString()}`);
  };

  const clearSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("search");
    router.push(`?${params.toString()}`);
  };

  if (loading) {
    return <FoodSkeleton />;
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-20 h-20 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-red-500 text-center max-w-md">{error}</p>
          <p className="text-gray-400 text-sm mt-2">
            Please try refreshing the page
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
          >
            Refresh Page
          </button>
        </div>
      </section>
    );
  }

  if (!foods.length) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-24 h-24 bg-gradient-to-br from-orange-50 to-orange-100 rounded-full flex items-center justify-center mb-6">
            <Utensils className="w-12 h-12 text-orange-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Food Items Available
          </h3>
          <p className="text-gray-500 text-center max-w-md">
            {restaurantId 
              ? "This restaurant doesn't have any food items yet."
              : "No food items available at the moment."}
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Check back later for new additions
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Socket Connection Status */}
      <div className="flex items-center justify-end mb-4">
        <div className={`flex items-center gap-2 text-xs ${
          socketConnected ? "text-green-500" : "text-gray-400"
        }`}>
          <span className={`w-2 h-2 rounded-full ${
            socketConnected ? "bg-green-500 animate-pulse" : "bg-gray-300"
          }`} />
          {socketConnected ? "🟢 Live Updates" : "🔴 Connecting..."}
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {searchQuery ? (
              <span className="flex items-center gap-2">
                <Search className="w-6 h-6 text-orange-500" />
                Results for "{searchQuery}"
              </span>
            ) : (
              "🍽️ Popular Food"
            )}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {searchQuery
              ? `${filteredFoods.length} dishes matching your search`
              : `Discover delicious food near you (${filteredFoods.length} items)`}
          </p>
        </div>
        
        {/* View Toggle */}
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all duration-200 ${
                viewMode === "grid"
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-400 hover:text-gray-600"
              }`}
              title="Grid view"
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all duration-200 ${
                viewMode === "list"
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-400 hover:text-gray-600"
              }`}
              title="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <FoodFilters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Results Count & Active Filters */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-700">{filteredFoods.length}</span> items
          </span>
          {(searchQuery || selectedCategory !== "all" || priceRange[0] > 0 || priceRange[1] < 1000 || sortBy !== "popularity") && (
            <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
              Filters applied
            </span>
          )}
        </div>
        
        {(searchQuery || selectedCategory !== "all" || priceRange[0] > 0 || priceRange[1] < 1000 || sortBy !== "popularity") && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors flex items-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Clear all filters
          </button>
        )}
      </div>

      {/* Food Grid or Empty State */}
      {filteredFoods.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-2xl border-2 border-dashed border-gray-200">
          <div className="w-24 h-24 bg-gradient-to-br from-orange-50 to-orange-100 rounded-full flex items-center justify-center mb-6">
            <Utensils className="w-12 h-12 text-orange-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {searchQuery ? `No results for "${searchQuery}"` : "No items found"}
          </h3>
          <p className="text-gray-500 text-center max-w-md mb-6">
            {searchQuery
              ? `We couldn't find any dishes matching your search. Try adjusting your keywords or filters.`
              : `No dishes match your current filters. Try adjusting your search or filter criteria.`}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={clearAllFilters}
              className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Clear All Filters
            </button>
            
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all duration-300 flex items-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                Clear Search
              </button>
            )}
          </div>

          {/* Suggestions */}
          {searchQuery && (
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400 mb-3">Try these popular items:</p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {["Pizza", "Burger", "Sushi", "Pasta", "Salad", "Dessert", "Coffee", "Sandwich"].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      const params = new URLSearchParams(searchParams);
                      params.set("search", item);
                      router.push(`?${params.toString()}`);
                    }}
                    className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm rounded-full transition-all duration-200 hover:scale-105"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
            : "space-y-4"
        }>
          {filteredFoods.map((food) => (
            <FoodCard key={food._id} food={food} variant={viewMode} />
          ))}
        </div>
      )}
    </section>
  );
}