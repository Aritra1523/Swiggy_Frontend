"use client"
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Store,
  MapPin,
  Clock,
  Star,
  ChevronRight,
  Search,
  Filter,
  Grid3x3,
  List,
  RefreshCw,
  AlertCircle,
  Coffee,
  Utensils,
  Building2,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  XCircle,
  SlidersHorizontal,
  Heart,
  Share2,
  Clock8,
  Award,
  Flame,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Zap,
  Timer,
  Bike,
  ShoppingBag,
  Users,
  Sun,
  Moon,
} from "lucide-react";

// ============== Type Definitions ==============
interface Restaurant {
  _id: string;
  restaurantName: string;
  location: string;
  outletType: string;
  isOpen: boolean;
  status: string;
  workingDays: string[];
  openingClosing: {
    sameForAllDays: boolean;
    slots: Array<{
      open: string;
      close: string;
      _id: string;
    }>;
  };
  rating?: number;
  totalRatings?: number;
  deliveryTime?: string;
  minimumOrder?: number;
  cuisine?: string[];
  image?: string;
  banner?: string;
  isFeatured?: boolean;
  isTrending?: boolean;
  isNew?: boolean;
  distance?: string;
  discount?: string;
  offers?: string[];
  averageCost?: number;
  isFavorite?: boolean;
}

// ============== Constants ==============
const OUTLET_TYPES = [
  { value: "All", label: "All", icon: Store },
  { value: "Restaurant", label: "Restaurant", icon: Utensils },
  { value: "Cafe", label: "Cafe", icon: Coffee },
  { value: "Fast Food", label: "Fast Food", icon: Zap },
  { value: "Bakery", label: "Bakery", icon: Building2 },
];

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance", icon: Sparkles },
  { value: "rating", label: "Top Rated", icon: Award },
  { value: "deliveryTime", label: "Fast Delivery", icon: Timer },
  { value: "distance", label: "Nearest", icon: MapPin },
  { value: "name", label: "Name A-Z", icon: Store },
];

// ============== Sub-Components ==============

// Premium Skeleton Loading
const RestaurantCardSkeleton = ({ variant = "grid" }: { variant?: "grid" | "list" }) => (
  <div className={`bg-white rounded-2xl border border-gray-100 animate-pulse overflow-hidden ${
    variant === "grid" ? "p-4" : "p-4 flex items-center gap-4"
  }`}>
    <div className={variant === "grid" ? "space-y-4" : "flex items-center gap-4 w-full"}>
      <div className={`bg-gray-200 rounded-xl flex-shrink-0 ${
        variant === "grid" ? "w-full h-48" : "w-24 h-24"
      }`} />
      <div className="flex-1 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="flex gap-2">
          <div className="h-6 bg-gray-200 rounded-full w-16" />
          <div className="h-6 bg-gray-200 rounded-full w-16" />
        </div>
      </div>
    </div>
  </div>
);

// Premium Badge
const Badge = ({ 
  children, 
  variant = "primary",
  icon: Icon,
  className = "",
}: { 
  children: React.ReactNode;
  variant?: "primary" | "success" | "warning" | "danger" | "info" | "purple";
  icon?: any;
  className?: string;
}) => {
  const variants = {
    primary: "bg-orange-50 text-orange-600 border-orange-200",
    success: "bg-green-50 text-green-600 border-green-200",
    warning: "bg-yellow-50 text-yellow-600 border-yellow-200",
    danger: "bg-red-50 text-red-600 border-red-200",
    info: "bg-blue-50 text-blue-600 border-blue-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}>
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </span>
  );
};

// Premium Status Badge
const StatusBadge = ({ isOpen }: { isOpen: boolean }) => (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
    isOpen
      ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200"
      : "bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border border-red-200"
  }`}>
    <span className={`w-1.5 h-1.5 rounded-full ${
      isOpen ? "bg-green-500 animate-pulse" : "bg-red-400"
    }`} />
    {isOpen ? "Open Now" : "Closed"}
  </span>
);

// Rating Display
const RatingDisplay = ({ rating, totalRatings }: { rating?: number; totalRatings?: number }) => {
  if (!rating) return null;
  
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
      <Star className="w-3.5 h-3.5 fill-green-600 text-green-600" />
      <span className="text-sm font-bold text-green-700">{rating.toFixed(1)}</span>
      {totalRatings && (
        <span className="text-xs text-gray-500">({totalRatings})</span>
      )}
    </div>
  );
};

// Premium Restaurant Card
const RestaurantCard = ({ 
  restaurant, 
  variant = "grid",
  onFavoriteToggle,
}: { 
  restaurant: Restaurant;
  variant?: "grid" | "list";
  onFavoriteToggle?: (id: string) => void;
}) => {
  const [imageError, setImageError] = useState(false);
  const [isFavorite, setIsFavorite] = useState(restaurant.isFavorite || false);
  const [isHovered, setIsHovered] = useState(false);

  const formatTime = (time: string) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const h = parseInt(hours);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };

  const getOpeningHours = () => {
    const slot = restaurant.openingClosing?.slots?.[0];
    if (!slot) return "Hours not available";
    return `${formatTime(slot.open)} - ${formatTime(slot.close)}`;
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    onFavoriteToggle?.(restaurant._id);
  };

  // Determine if restaurant has special status
  const hasSpecialStatus = restaurant.isFeatured || restaurant.isTrending || restaurant.isNew;

  return (
    <Link
      href={`/restaurant/${restaurant._id}`}
      className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-400 hover:-translate-y-2 overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Special Status Banner */}
      {hasSpecialStatus && (
        <div className="absolute top-3 left-3 z-10 flex gap-1.5">
          {restaurant.isFeatured && (
            <Badge variant="primary" icon={Sparkles}>
              Featured
            </Badge>
          )}
          {restaurant.isTrending && (
            <Badge variant="danger" icon={Flame}>
              Trending
            </Badge>
          )}
          {restaurant.isNew && (
            <Badge variant="success" icon={CheckCircle2}>
              New
            </Badge>
          )}
        </div>
      )}

      {/* Favorite Button */}
      <button
        onClick={handleFavoriteClick}
        className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      >
        <Heart className={`w-4 h-4 transition-colors duration-300 ${
          isFavorite ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"
        }`} />
      </button>

      {/* Image Section */}
      <div className={`relative overflow-hidden ${
        variant === "grid" ? "h-56" : "h-40"
      } bg-gradient-to-br from-gray-100 to-gray-200`}>
        {restaurant.image && !imageError ? (
          <Image
            src={restaurant.image}
            alt={restaurant.restaurantName}
            fill
            className={`object-cover transition-transform duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-orange-500 bg-gradient-to-br from-orange-50 to-orange-100">
            {getInitials(restaurant.restaurantName)}
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Bottom Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StatusBadge isOpen={restaurant.isOpen} />
              {restaurant.discount && (
                <Badge variant="warning" icon={Zap}>
                  {restaurant.discount}
                </Badge>
              )}
            </div>
            {restaurant.distance && (
              <Badge variant="info" icon={MapPin}>
                {restaurant.distance}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 group-hover:text-orange-500 transition-colors duration-200 text-lg truncate">
              {restaurant.restaurantName}
            </h3>
            <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-0.5">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{restaurant.location}</span>
            </div>
          </div>
          <RatingDisplay rating={restaurant.rating} totalRatings={restaurant.totalRatings} />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
          <Badge variant="purple" icon={Store}>
            {restaurant.outletType}
          </Badge>
          <Badge variant="info" icon={Clock}>
            {getOpeningHours()}
          </Badge>
          {restaurant.averageCost && (
            <Badge variant="primary" icon={ShoppingBag}>
              ₹{restaurant.averageCost} avg
            </Badge>
          )}
        </div>

        {/* Cuisine Tags */}
        {restaurant.cuisine && restaurant.cuisine.length > 0 && (
          <div className="flex items-center gap-1.5 mt-2.5">
            <div className="flex-1 flex items-center gap-1.5 overflow-hidden">
              {restaurant.cuisine.slice(0, 3).map((cuisine, index) => (
                <span
                  key={index}
                  className="text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100 whitespace-nowrap"
                >
                  {cuisine}
                </span>
              ))}
              {restaurant.cuisine.length > 3 && (
                <span className="text-xs text-gray-400 font-medium px-2">
                  +{restaurant.cuisine.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Delivery Info */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
          {restaurant.deliveryTime && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Timer className="w-3.5 h-3.5 text-orange-500" />
              <span className="font-medium text-gray-700">{restaurant.deliveryTime}</span>
            </div>
          )}
          {restaurant.minimumOrder && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <ShoppingBag className="w-3.5 h-3.5 text-orange-500" />
              <span className="font-medium text-gray-700">Min ₹{restaurant.minimumOrder}</span>
            </div>
          )}
          {restaurant.offers && restaurant.offers.length > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-orange-500">
              <Flame className="w-3.5 h-3.5" />
              <span className="font-medium">{restaurant.offers.length} offers</span>
            </div>
          )}
        </div>

        {/* Hover Action Buttons */}
        <div className={`mt-3 flex items-center gap-2 overflow-hidden transition-all duration-300 ${
          isHovered ? "max-h-12 opacity-100" : "max-h-0 opacity-0"
        }`}>
          <button className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 flex items-center justify-center gap-2">
            View Menu
            <ChevronRightIcon className="w-4 h-4" />
          </button>
          <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
            <Share2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </Link>
  );
};

// Filter Chip Component
const FilterChip = ({
  label,
  icon: Icon,
  active,
  onClick,
  count,
}: {
  label: string;
  icon?: any;
  active: boolean;
  onClick: () => void;
  count?: number;
}) => (
  <button
    onClick={onClick}
    className={`
      group flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap
      ${
        active
          ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 scale-105"
          : "bg-white text-gray-600 border-2 border-gray-200 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50"
      }
    `}
  >
    {Icon && <Icon className={`w-4 h-4 transition-colors ${
      active ? "text-white" : "group-hover:text-orange-500"
    }`} />}
    <span>{label}</span>
    {count !== undefined && count > 0 && (
      <span
        className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold transition-colors ${
          active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500 group-hover:bg-orange-100 group-hover:text-orange-600"
        }`}
      >
        {count}
      </span>
    )}
  </button>
);

// Sort Option Button
const SortOption = ({
  label,
  icon: Icon,
  active,
  onClick,
}: {
  label: string;
  icon?: any;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
      ${
        active
          ? "bg-orange-50 text-orange-600 border border-orange-200"
          : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
      }
    `}
  >
    {Icon && <Icon className="w-4 h-4" />}
    {label}
  </button>
);

// ============== Main Component ==============

export default function RestaurantListPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  // Mock fetch function - using only the 4 actual restaurants
  const fetchRestaurants = async (refresh = false) => {
    try {
      if (refresh) setIsRefreshing(true);
      else setLoading(true);
      setError(null);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      // Actual restaurant data - only 4 restaurants
      const mockData: Restaurant[] = [
        {
          _id: "6a75584daf7104512c0742dc",
          restaurantName: "New Shop",
          location: "Kolkata",
          outletType: "Restaurant",
          isOpen: true,
          status: "approved",
          workingDays: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
          openingClosing: {
            sameForAllDays: true,
            slots: [{ open: "06:00", close: "01:00", _id: "1" }]
          },
          rating: 4.5,
          totalRatings: 120,
          cuisine: ["North Indian", "Chinese", "Beverages"],
          deliveryTime: "30-40 min",
          minimumOrder: 99,
          isFeatured: true,
          isTrending: true,
          distance: "2.5 km",
          discount: "20% OFF",
          offers: ["Free Delivery", "20% OFF"],
          averageCost: 250,
        },
        {
          _id: "6a7897d74132fb2304f88828",
          restaurantName: "Raju Caffe",
          location: "Tarakeswar",
          outletType: "Restaurant",
          isOpen: true,
          status: "approved",
          workingDays: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
          openingClosing: {
            sameForAllDays: true,
            slots: [{ open: "10:00", close: "22:00", _id: "2" }]
          },
          rating: 4.2,
          totalRatings: 85,
          cuisine: ["South Indian", "Beverages", "Snacks"],
          deliveryTime: "25-35 min",
          minimumOrder: 79,
          isNew: true,
          distance: "3.8 km",
          offers: ["10% OFF"],
          averageCost: 180,
        },
        {
          _id: "6a7be0da380d2f30284f72c1",
          restaurantName: "Soumyo Shop",
          location: "Kolkata",
          outletType: "Cafe",
          isOpen: true,
          status: "approved",
          workingDays: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
          openingClosing: {
            sameForAllDays: true,
            slots: [{ open: "10:00", close: "22:00", _id: "3" }]
          },
          rating: 4.8,
          totalRatings: 200,
          cuisine: ["Continental", "Bakery", "Beverages"],
          deliveryTime: "20-30 min",
          minimumOrder: 149,
          isTrending: true,
          distance: "1.2 km",
          discount: "15% OFF",
          offers: ["15% OFF", "Free Pastry"],
          averageCost: 350,
        },
        {
          _id: "6a852863a5f980013ac0a406",
          restaurantName: "A Cafe",
          location: "Tarakeswar",
          outletType: "Cafe",
          isOpen: true,
          status: "approved",
          workingDays: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
          openingClosing: {
            sameForAllDays: true,
            slots: [{ open: "10:00", close: "22:00", _id: "4" }]
          },
          rating: 4.0,
          totalRatings: 65,
          cuisine: ["Fast Food", "Beverages", "Desserts"],
          deliveryTime: "15-25 min",
          minimumOrder: 59,
          isNew: true,
          distance: "4.5 km",
          offers: ["Free Delivery"],
          averageCost: 120,
        },
      ];

      setRestaurants(mockData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load restaurants");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // Scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Filter and sort restaurants
  const filteredRestaurants = useMemo(() => {
    let result = [...restaurants];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.restaurantName.toLowerCase().includes(query) ||
          r.location.toLowerCase().includes(query) ||
          r.outletType.toLowerCase().includes(query) ||
          r.cuisine?.some(c => c.toLowerCase().includes(query))
      );
    }

    // Outlet type filter
    if (selectedType !== "All") {
      result = result.filter((r) => r.outletType === selectedType);
    }

    // Sort
    switch (sortBy) {
      case "name":
        result.sort((a, b) => a.restaurantName.localeCompare(b.restaurantName));
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "deliveryTime":
        result.sort((a, b) => {
          const aTime = parseInt(a.deliveryTime?.split("-")[0] || "60");
          const bTime = parseInt(b.deliveryTime?.split("-")[0] || "60");
          return aTime - bTime;
        });
        break;
      case "distance":
        result.sort((a, b) => {
          const aDist = parseFloat(a.distance?.replace(" km", "") || "10");
          const bDist = parseFloat(b.distance?.replace(" km", "") || "10");
          return aDist - bDist;
        });
        break;
      default:
        // relevance - featured and trending first
        result.sort((a, b) => {
          const aScore = (a.isFeatured ? 10 : 0) + (a.isTrending ? 5 : 0) + (a.isNew ? 3 : 0);
          const bScore = (b.isFeatured ? 10 : 0) + (b.isTrending ? 5 : 0) + (b.isNew ? 3 : 0);
          return bScore - aScore;
        });
        break;
    }

    return result;
  }, [restaurants, searchQuery, selectedType, sortBy]);

  // Get counts for filter chips
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    restaurants.forEach((r) => {
      counts[r.outletType] = (counts[r.outletType] || 0) + 1;
    });
    return counts;
  }, [restaurants]);

  // Update active filter count
  useEffect(() => {
    let count = 0;
    if (selectedType !== "All") count++;
    if (searchQuery) count++;
    setActiveFilterCount(count);
  }, [selectedType, searchQuery]);

  const handleFavoriteToggle = (id: string) => {
    setRestaurants(prev =>
      prev.map(r =>
        r._id === id ? { ...r, isFavorite: !r.isFavorite } : r
      )
    );
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedType("All");
    setSortBy("relevance");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Premium Header Skeleton */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gray-200 rounded-2xl" />
              <div>
                <div className="h-8 bg-gray-200 rounded w-48 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-64" />
              </div>
            </div>
          </div>

          {/* Filters Skeleton */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6 animate-pulse">
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-12 bg-gray-200 rounded-xl w-28" />
              ))}
            </div>
          </div>

          {/* Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <RestaurantCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-500 text-sm">{error}</p>
          <button
            onClick={() => fetchRestaurants()}
            className="mt-6 px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* ====== PREMIUM HEADER ====== */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-50 to-orange-100 rounded-full opacity-20 -translate-y-1/2 translate-x-1/3" />
          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                  <Store className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Restaurants Near You
                    <span className="ml-2 text-sm font-normal text-gray-400">
                      {filteredRestaurants.length} places
                    </span>
                  </h1>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <span>Discover the best restaurants in your area</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                      Curated for you
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => fetchRestaurants(true)}
                  disabled={isRefreshing}
                  className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-600 transition-all duration-200 disabled:opacity-50"
                  title="Refresh"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
                </button>
                {activeFilterCount > 0 && (
                  <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </div>
            </div>

            {/* Search Bar */}
            <div className="mt-5 relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for restaurants, cuisines, or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder:text-gray-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                )}
              </div>
              {searchQuery && (
                <div className="absolute mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-20 max-h-64 overflow-y-auto">
                  <div className="text-xs text-gray-400 px-3 py-2 font-medium">
                    Search results for "{searchQuery}"
                  </div>
                  {filteredRestaurants.slice(0, 5).map((r) => (
                    <Link
                      key={r._id}
                      href={`/restaurant/${r._id}`}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500 font-bold text-xs">
                        {r.restaurantName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{r.restaurantName}</p>
                        <p className="text-xs text-gray-500">{r.location}</p>
                      </div>
                    </Link>
                  ))}
                  {filteredRestaurants.length === 0 && (
                    <div className="text-center py-6 text-gray-400 text-sm">
                      No restaurants found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ====== PREMIUM FILTERS ====== */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Type Filters */}
            <div className="flex flex-wrap gap-2">
              {OUTLET_TYPES.map((type) => (
                <FilterChip
                  key={type.value}
                  label={type.label}
                  icon={type.icon}
                  active={selectedType === type.value}
                  onClick={() => setSelectedType(type.value)}
                  count={type.value === "All" ? restaurants.length : typeCounts[type.value]}
                />
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Sort Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:border-orange-300 hover:text-orange-600 transition-all duration-200">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="hidden sm:inline">Sort</span>
                  <span className="text-xs text-gray-400">|</span>
                  <span className="text-orange-500 font-semibold">
                    {SORT_OPTIONS.find(o => o.value === sortBy)?.label || "Relevance"}
                  </span>
                </button>
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
                  {SORT_OPTIONS.map((option) => (
                    <SortOption
                      key={option.value}
                      label={option.label}
                      icon={option.icon}
                      active={sortBy === option.value}
                      onClick={() => setSortBy(option.value)}
                    />
                  ))}
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2.5 rounded-lg transition-all duration-200 ${
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
                  className={`p-2.5 rounded-lg transition-all duration-200 ${
                    viewMode === "list"
                      ? "bg-white shadow-sm text-gray-900"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                  title="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Clear Filters */}
              {(activeFilterCount > 0 || sortBy !== "relevance") && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors px-3 py-2 hover:bg-orange-50 rounded-lg"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ====== RESTAURANT RESULTS ====== */}
        {filteredRestaurants.length === 0 ? (
          <div className="bg-white rounded-3xl border-2 border-dashed border-gray-300 p-16 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Store className="w-12 h-12 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No restaurants found
              </h3>
              <p className="text-gray-500 text-sm">
                {searchQuery
                  ? `We couldn't find any restaurants matching "${searchQuery}".`
                  : "No restaurants available in this area."}
              </p>
              {(searchQuery || selectedType !== "All") && (
                <button
                  onClick={clearAllFilters}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Results Stats */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-700">{filteredRestaurants.length}</span> restaurants
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
              <p className="text-xs text-gray-400">
                {filteredRestaurants.length === restaurants.length ? (
                  "All restaurants displayed"
                ) : (
                  `${filteredRestaurants.length} of ${restaurants.length}`
                )}
              </p>
            </div>

            {/* Restaurant Grid */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  : "space-y-4"
              }
            >
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant._id}
                  restaurant={restaurant}
                  variant={viewMode}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ====== SCROLL TO TOP BUTTON ====== */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full shadow-2xl shadow-orange-500/40 hover:shadow-orange-500/60 transition-all duration-300 hover:scale-110 group"
        >
          <ChevronRightIcon className="w-6 h-6 rotate-[-90deg] group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}
    </main>
  );
}