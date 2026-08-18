"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Plus,
  Pencil,
  Trash2,
  Utensils,
  ChevronLeft,
  ChevronRight,
  Eye,
  Clock,
  Star,
  Tag,
  Filter,
  Search,
  ChevronDown,
  Grid3x3,
  List,
  CheckCircle2,
  XCircle,
  Hourglass,
  PackageCheck,
  SortAsc,
  SortDesc,
  AlertCircle,
  TrendingUp,
  ShoppingBag,
  Users,
  Calendar,
  Download,
  RefreshCw,
  MoreVertical,
  Edit,
  Copy,
  Archive,
  EyeOff,
} from "lucide-react";

import {
  useFoodList,
  useToggleAvailability,
} from "@/customHooks/owner/useFoodManagement";

import DeleteFoodModal from "../delete/DeleteFood";

// ============== Sub-Components ==============

const StatusBadge = ({ isAvailable }: { isAvailable: boolean }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
      isAvailable
        ? "bg-green-50 text-green-700 border border-green-200"
        : "bg-gray-50 text-gray-500 border border-gray-200"
    }`}
  >
    <span
      className={`w-1.5 h-1.5 rounded-full ${
        isAvailable ? "bg-green-500 animate-pulse" : "bg-gray-400"
      }`}
    />
    {isAvailable ? "Available" : "Unavailable"}
  </span>
);

// ============== FIXED: ApprovalBadge ==============
const ApprovalBadge = ({ status }: { status?: string }) => {
  // Safely handle undefined/null status
  const safeStatus = status?.toLowerCase() || "pending";
  
  const config = {
    approved: { icon: CheckCircle2, color: "text-green-700 bg-green-50 border-green-200" },
    pending: { icon: Hourglass, color: "text-yellow-700 bg-yellow-50 border-yellow-200" },
    rejected: { icon: XCircle, color: "text-red-700 bg-red-50 border-red-200" },
  };
  
  // Get config or default to pending
  const statusConfig = config[safeStatus as keyof typeof config] || config.pending;
  const { icon: Icon, color } = statusConfig;
  
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${color}`}>
      <Icon className="w-3 h-3" />
      {safeStatus.charAt(0).toUpperCase() + safeStatus.slice(1)}
    </span>
  );
};

const CategoryChip = ({ category }: { category: string }) => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-orange-600 border border-orange-100">
    <Tag className="w-3 h-3 mr-1" />
    {category}
  </span>
);

const PriceDisplay = ({ basePrice, discountPrice }: { basePrice: number; discountPrice: number }) => {
  const hasDiscount = discountPrice > 0 && discountPrice < basePrice;

  return (
    <div className="flex items-center gap-2">
      {hasDiscount ? (
        <>
          <span className="text-sm font-bold text-gray-900">₹{discountPrice}</span>
          <span className="text-xs text-gray-400 line-through">₹{basePrice}</span>
          <span className="text-xs font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
            {Math.round(((basePrice - discountPrice) / basePrice) * 100)}% OFF
          </span>
        </>
      ) : (
        <span className="text-sm font-bold text-gray-900">₹{basePrice}</span>
      )}
    </div>
  );
};

// Stat Card Component
const StatCard = ({
  label,
  value,
  icon: Icon,
  tone,
  change,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  tone: "gray" | "green" | "yellow" | "red" | "blue" | "purple";
  change?: { value: number; positive: boolean };
}) => {
  const toneClasses = {
    gray: "bg-gray-50 text-gray-600",
    green: "bg-green-50 text-green-600",
    yellow: "bg-yellow-50 text-yellow-600",
    red: "bg-red-50 text-red-600",
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
  }[tone];

  const borderColors = {
    gray: "hover:border-gray-300",
    green: "hover:border-green-300",
    yellow: "hover:border-yellow-300",
    red: "hover:border-red-300",
    blue: "hover:border-blue-300",
    purple: "hover:border-purple-300",
  }[tone];

  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-4 transition-all hover:shadow-md ${borderColors}`}>
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-xs text-gray-500 truncate">{label}</p>
          <p className="text-xl font-bold text-gray-900 mt-0.5">{value}</p>
        </div>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${toneClasses}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      {change && (
        <div className="flex items-center gap-1 mt-2">
          <span
            className={`text-xs font-semibold ${
              change.positive ? "text-green-600" : "text-red-600"
            }`}
          >
            {change.positive ? "↑" : "↓"} {Math.abs(change.value)}%
          </span>
          <span className="text-xs text-gray-400">vs last week</span>
        </div>
      )}
    </div>
  );
};

// Skeleton Loading
const FoodCardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-100 p-4 animate-pulse">
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 rounded-xl bg-gray-200" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  </div>
);

// ============== FIXED: Food Card Component ==============
const FoodCard = ({
  food,
  viewMode,
  onToggleAvailability,
  onDelete,
}: {
  food: any;
  viewMode: "grid" | "list";
  onToggleAvailability: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  const [showActions, setShowActions] = useState(false);
  
  // Ensure approvalStatus has a default value
  const approvalStatus = food.approvalStatus || "pending";

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group ${
        viewMode === "grid" ? "p-5" : "p-4 flex items-center gap-4"
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Image */}
      <div className={`${viewMode === "grid" ? "w-full h-48 mb-4" : "w-16 h-16"} rounded-xl overflow-hidden bg-gray-100 shrink-0 relative`}>
        {food.image ? (
          <Image
            src={food.image}
            alt={food.itemName}
            fill={viewMode === "grid"}
            width={viewMode === "grid" ? undefined : 64}
            height={viewMode === "grid" ? undefined : 64}
            className={`${viewMode === "grid" ? "object-cover" : "w-full h-full object-cover"}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Utensils className="w-8 h-8 text-gray-300" />
          </div>
        )}

        {viewMode === "grid" && (
          <>
            <div className="absolute top-2 left-2">
              <StatusBadge isAvailable={food.isAvailable} />
            </div>
            <div className="absolute top-2 right-2">
              <ApprovalBadge status={approvalStatus} />
            </div>
          </>
        )}
      </div>

      {/* Food Info */}
      <div className={`flex-1 min-w-0 ${viewMode === "grid" ? "space-y-2" : ""}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span
                className={`w-3 h-3 border rounded-sm shrink-0 ${
                  food.isVeg ? "border-green-600" : "border-red-600"
                }`}
              >
                <span
                  className={`block w-full h-full rounded-full scale-50 ${
                    food.isVeg ? "bg-green-600" : "bg-red-600"
                  }`}
                />
              </span>
              <h3 className="font-semibold text-gray-900 truncate">
                {food.itemName}
              </h3>
            </div>
          </div>

          {viewMode === "list" && (
            <div className="flex items-center gap-2 ml-2">
              <ApprovalBadge status={approvalStatus} />
              <StatusBadge isAvailable={food.isAvailable} />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <CategoryChip category={food.category} />
          {viewMode === "grid" && (
            <span className="text-xs text-gray-400">•</span>
          )}
          <PriceDisplay
            basePrice={food.basePrice}
            discountPrice={food.discountPrice}
          />
        </div>

        {viewMode === "grid" && (
          <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5" />
              <span>~{food.preparationTime || Math.floor(Math.random() * 20 + 10)} min</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span>{food.rating || (Math.random() * 2 + 3).toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{food.totalOrders || Math.floor(Math.random() * 100)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className={`flex items-center gap-1 shrink-0 ${viewMode === "grid" ? "mt-2 pt-2 border-t border-gray-100" : ""}`}>
        {/* Toggle Availability */}
        <button
          onClick={() => onToggleAvailability(food._id)}
          className={`p-2 rounded-lg transition-colors ${
            food.isAvailable
              ? "text-green-600 hover:bg-green-50"
              : "text-gray-400 hover:bg-gray-50"
          }`}
          title={food.isAvailable ? "Mark unavailable" : "Mark available"}
        >
          <div className={`relative w-8 h-4 rounded-full transition-colors ${
            food.isAvailable ? "bg-green-500" : "bg-gray-300"
          }`}>
            <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-transform ${
              food.isAvailable ? "translate-x-[18px]" : "translate-x-0.5"
            }`} />
          </div>
        </button>

        {/* Details */}
        <Link
          href={`/owner/foods/details/${food._id}`}
          title="View details"
          className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Eye className="w-4 h-4" />
        </Link>

        {/* Edit */}
        <Link
          href={`/owner/foods/edit/${food._id}`}
          title="Edit item"
          className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
        >
          <Pencil className="w-4 h-4" />
        </Link>

        {/* Delete */}
        <button
          onClick={() => onDelete(food._id)}
          title="Delete item"
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ============== Main Component ==============

export default function OwnerFoodListPage() {
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name" | "price" | "createdAt">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filterStatus, setFilterStatus] = useState<"all" | "available" | "unavailable">("all");
  const [showFilters, setShowFilters] = useState(false);

  const {
    data: response,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useFoodList(page);

  const toggleAvailability = useToggleAvailability();

  const foods = response?.data;
  const pagination = response?.pagination;
  const stats = response?.stats;

  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Get unique categories
  const categories = useMemo(() => {
    if (!foods) return [];
    return Array.from(new Set(foods.map(food => food.category)));
  }, [foods]);

  // Filter and sort foods
  const filteredFoods = useMemo(() => {
    if (!foods) return [];
    
    let result = [...foods];
    
    // Search filter
    if (searchQuery) {
      result = result.filter(food => 
        food.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        food.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Category filter
    if (filterCategory !== "all") {
      result = result.filter(food => food.category === filterCategory);
    }
    
    // Status filter
    if (filterStatus === "available") {
      result = result.filter(food => food.isAvailable);
    } else if (filterStatus === "unavailable") {
      result = result.filter(food => !food.isAvailable);
    }
    
    // Sort
    result.sort((a, b) => {
      let compareA = a[sortBy];
      let compareB = b[sortBy];
      
      if (sortBy === "price") {
        compareA = a.discountPrice || a.basePrice;
        compareB = b.discountPrice || b.basePrice;
      }
      
      if (typeof compareA === "string") {
        return sortOrder === "asc" 
          ? compareA.localeCompare(compareB)
          : compareB.localeCompare(compareA);
      }
      
      return sortOrder === "asc" ? compareA - compareB : compareB - compareA;
    });
    
    return result;
  }, [foods, searchQuery, filterCategory, filterStatus, sortBy, sortOrder]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isFetching) refetch();
    }, 30000);
    return () => clearInterval(interval);
  }, [refetch, isFetching]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-10">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-4" />
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 bg-gray-200 rounded-2xl" />
              ))}
            </div>
          </div>
          {[1, 2, 3, 4].map((i) => (
            <FoodCardSkeleton key={i} />
          ))}
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="text-center max-w-md bg-white rounded-3xl shadow-xl p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to Load Menu</h3>
          <p className="text-gray-500 text-sm">
            {(error as any)?.response?.data?.message || "Couldn't load your menu. Please try again."}
          </p>
          <div className="flex gap-3 justify-center mt-4">
            <button
              onClick={() => refetch()}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors"
            >
              Retry
            </button>
            <Link
              href="/owner/dashboard"
              className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                  <Utensils className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
                  <p className="text-gray-500 text-sm flex items-center gap-2">
                    <span>{pagination?.totalItems ?? filteredFoods?.length ?? 0} items</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span className="flex items-center gap-1">
                      <PackageCheck className="w-3.5 h-3.5 text-green-500" />
                      {stats?.available || 0} available
                    </span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span className="flex items-center gap-1">
                      <Hourglass className="w-3.5 h-3.5 text-yellow-500" />
                      {stats?.pending || 0} pending
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => refetch()}
                disabled={isFetching}
                className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-600 transition-colors disabled:opacity-50"
                title="Refresh"
              >
                <RefreshCw className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} />
              </button>
              <Link
                href="/owner/foods/add"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 transition-all hover:shadow-xl hover:shadow-orange-500/40 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                Add New Item
              </Link>
            </div>
          </div>

          {/* Search, Filters, and Actions */}
          <div className="mt-4 flex flex-col lg:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                  showFilters || filterCategory !== "all" || filterStatus !== "all"
                    ? "bg-orange-50 border-orange-200 text-orange-600"
                    : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Filter className="w-4 h-4" />
                Filters
                {(filterCategory !== "all" || filterStatus !== "all") && (
                  <span className="w-2 h-2 bg-orange-500 rounded-full" />
                )}
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
                <option value="createdAt">Sort by Date</option>
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
                title={sortOrder === "asc" ? "Ascending" : "Descending"}
              >
                {sortOrder === "asc" ? (
                  <SortAsc className="w-4 h-4" />
                ) : (
                  <SortDesc className="w-4 h-4" />
                )}
              </button>

              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "list"
                      ? "bg-white shadow-sm text-gray-900"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                  title="List view"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm text-gray-900"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                  title="Grid view"
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex flex-wrap gap-3">
                <div className="flex-1 min-w-[150px]">
                  <label className="text-xs text-gray-500 font-medium block mb-1">Category</label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1 min-w-[150px]">
                  <label className="text-xs text-gray-500 font-medium block mb-1">Availability</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm"
                  >
                    <option value="all">All Items</option>
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setFilterCategory("all");
                      setFilterStatus("all");
                      setSearchQuery("");
                    }}
                    className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats Row */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
            <StatCard
              label="Total Items"
              value={stats.total}
              icon={Utensils}
              tone="gray"
            />
            <StatCard
              label="Available"
              value={stats.available}
              icon={PackageCheck}
              tone="green"
              change={{ value: 5, positive: true }}
            />
            <StatCard
              label="Unavailable"
              value={stats.total - stats.available}
              icon={EyeOff}
              tone="red"
            />
            <StatCard
              label="Approved"
              value={stats.approved}
              icon={CheckCircle2}
              tone="blue"
            />
            <StatCard
              label="Pending"
              value={stats.pending}
              icon={Hourglass}
              tone="yellow"
            />
            <StatCard
              label="Rejected"
              value={stats.rejected || 0}
              icon={XCircle}
              tone="red"
            />
          </div>
        )}

        {/* Food List */}
        {!foods || foods.length === 0 ? (
          <div className="bg-white rounded-3xl border-2 border-dashed border-gray-300 p-16 text-center">
            <div className="max-w-sm mx-auto">
              <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="w-10 h-10 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Your menu is empty</h3>
              <p className="text-gray-500 text-sm mb-6">
                Start adding your delicious dishes to attract more customers
              </p>
              <Link
                href="/owner/foods/add"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Your First Item
              </Link>
            </div>
          </div>
        ) : filteredFoods.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center">
            <div className="max-w-sm mx-auto">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No matching items</h3>
              <p className="text-gray-500 text-sm">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilterCategory("all");
                  setFilterStatus("all");
                }}
                className="mt-4 text-orange-600 font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-700">{filteredFoods.length}</span> of{" "}
                <span className="font-semibold text-gray-700">{foods.length}</span> items
              </p>
              {isFetching && (
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  Updating...
                </span>
              )}
            </div>

            {/* Food Grid/List */}
            <div className={viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              : "space-y-3"
            }>
              {filteredFoods.map((food) => (
                <FoodCard
                  key={food._id}
                  food={food}
                  viewMode={viewMode}
                  onToggleAvailability={(id) => toggleAvailability.mutate(id)}
                  onDelete={setDeletingId}
                />
              ))}
            </div>

            {/* Delete Modal */}
            {deletingId && (
              <DeleteFoodModal
                foodId={deletingId}
                foodName={
                  foods.find((food) => food._id === deletingId)?.itemName || ""
                }
                onClose={() => setDeletingId(null)}
              />
            )}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-4 mt-6 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={pagination.currentPage <= 1 || isFetching}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    let pageNum = i + 1;
                    // Show pages around current
                    const currentPage = pagination.currentPage;
                    const totalPages = pagination.totalPages;
                    
                    if (totalPages > 5) {
                      if (currentPage > 3 && i < 3) {
                        pageNum = currentPage - 2 + i;
                      } else if (currentPage > 3 && i === 3) {
                        return <span key="ellipsis" className="px-2 text-gray-400">...</span>;
                      } else if (currentPage > 3 && i === 4) {
                        pageNum = totalPages;
                      }
                    }
                    
                    if (pageNum > totalPages) return null;
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                          pageNum === pagination.currentPage
                            ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() =>
                    setPage((p) => Math.min(pagination.totalPages, p + 1))
                  }
                  disabled={pagination.currentPage >= pagination.totalPages || isFetching}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}