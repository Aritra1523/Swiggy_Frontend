"use client";

import Link from "next/link";
import Image from "next/image";
import {
  useMyRestaurant,
  useFoodList,
  useRestaurantStatus,
  useOwnerOrders,
  usePendingFoodCount,
} from "@/customHooks/owner/useFoodManagement";
import {
  Store,
  UtensilsCrossed,
  Plus,
  CheckCircle2,
  Clock,
  XCircle,
  MapPin,
  ChevronRight,
  TrendingUp,
  Users,
  Star,
  ShoppingBag,
  Calendar,
  AlertCircle,
  Package,
  DollarSign,
  Percent,
  Clock as ClockIcon,
  Eye,
  Heart,
  Share2,
  MoreVertical,
} from "lucide-react";
import { useState } from "react";

const STATUS_CONFIG: Record<
  string,
  {
    icon: typeof CheckCircle2;
    color: string;
    label: string;
    message: string;
    bgGradient: string;
  }
> = {
  approved: {
    icon: CheckCircle2,
    color: "text-green-700 border-green-200 bg-green-50",
    label: "Approved",
    message: "Your restaurant is live and taking orders.",
    bgGradient: "from-green-500 to-emerald-600",
  },
  rejected: {
    icon: XCircle,
    color: "text-red-700 border-red-200 bg-red-50",
    label: "Rejected",
    message: "Your application was rejected. Check your email for details.",
    bgGradient: "from-red-500 to-rose-600",
  },
  draft: {
    icon: Clock,
    color: "text-gray-700 border-gray-200 bg-gray-50",
    label: "Draft",
    message: "Finish onboarding to get your restaurant approved.",
    bgGradient: "from-gray-500 to-gray-600",
  },
  documents_pending: {
    icon: Clock,
    color: "text-yellow-700 border-yellow-200 bg-yellow-50",
    label: "Documents pending",
    message: "Submit your business documents to continue.",
    bgGradient: "from-yellow-500 to-amber-600",
  },
  menu_pending: {
    icon: Clock,
    color: "text-yellow-700 border-yellow-200 bg-yellow-50",
    label: "Menu pending",
    message: "Add menu items to continue onboarding.",
    bgGradient: "from-yellow-500 to-amber-600",
  },
  contract_pending: {
    icon: Clock,
    color: "text-yellow-700 border-yellow-200 bg-yellow-50",
    label: "Contract pending",
    message: "Sign the partner contract to continue.",
    bgGradient: "from-yellow-500 to-amber-600",
  },
  review_pending: {
    icon: Clock,
    color: "text-blue-700 border-blue-200 bg-blue-50",
    label: "Under review",
    message: "An admin is reviewing your application.",
    bgGradient: "from-blue-500 to-indigo-600",
  },
};

// Stat Card Component with Enhanced Hover Animations
const StatCard = ({
  icon: Icon,
  label,
  value,
  change,
  color = "orange",
  subtitle,
}: {
  icon: any;
  label: string;
  value: string | number;
  change?: { value: number; positive: boolean };
  color?: "orange" | "green" | "blue" | "purple" | "red";
  subtitle?: string;
}) => {
  const colors = {
    orange: {
      bg: "bg-orange-50 group-hover:bg-orange-500",
      text: "text-orange-600 group-hover:text-white",
      light: "bg-orange-50",
      gradient: "from-orange-400 to-orange-600",
    },
    green: {
      bg: "bg-green-50 group-hover:bg-green-500",
      text: "text-green-600 group-hover:text-white",
      light: "bg-green-50",
      gradient: "from-green-400 to-emerald-600",
    },
    blue: {
      bg: "bg-blue-50 group-hover:bg-blue-500",
      text: "text-blue-600 group-hover:text-white",
      light: "bg-blue-50",
      gradient: "from-blue-400 to-indigo-600",
    },
    purple: {
      bg: "bg-purple-50 group-hover:bg-purple-500",
      text: "text-purple-600 group-hover:text-white",
      light: "bg-purple-50",
      gradient: "from-purple-400 to-pink-600",
    },
    red: {
      bg: "bg-red-50 group-hover:bg-red-500",
      text: "text-red-600 group-hover:text-white",
      light: "bg-red-50",
      gradient: "from-red-400 to-rose-600",
    },
  };

  const colorConfig = colors[color];

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden">
      {/* Animated Background */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${colorConfig.gradient}`}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-500 font-medium group-hover:text-white/90 transition-colors duration-300">
              {label}
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-1 group-hover:text-white transition-colors duration-300">
              {value}
            </p>
            {subtitle && (
              <p className="text-xs text-gray-400 mt-0.5 group-hover:text-white/80 transition-colors duration-300">
                {subtitle}
              </p>
            )}
          </div>

          {/* Icon with Animation */}
          <div
            className={`p-2.5 rounded-xl ${colorConfig.light} group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shrink-0 ml-3`}
          >
            <Icon
              className={`w-5 h-5 ${colorConfig.text} transition-colors duration-300`}
            />
          </div>
        </div>

        {/* Change Indicator */}
        {change && (
          <div className="flex items-center gap-1 mt-2">
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${change.positive ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"} group-hover:bg-white/20 group-hover:text-white transition-all duration-300`}
            >
              {change.positive ? "↑" : "↓"} {change.value}%
            </span>
            <span className="text-xs text-gray-400 group-hover:text-white/70 transition-colors duration-300">
              vs last week
            </span>
          </div>
        )}

        {/* Animated Bottom Bar */}
        <div
          className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${colorConfig.gradient} transition-all duration-500 w-0 group-hover:w-full`}
        />
      </div>
    </div>
  );
};

// Quick Action Card
const QuickActionCard = ({
  icon: Icon,
  label,
  description,
  href,
  color = "orange",
}: {
  icon: any;
  label: string;
  description: string;
  href: string;
  color?: "orange" | "blue" | "green" | "purple";
}) => {
  const colors = {
    orange:
      "bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-600",
    blue: "bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-600",
    green: "bg-green-50 hover:bg-green-100 border-green-200 text-green-600",
    purple:
      "bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-600",
  };

  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed transition-all ${colors[color]} group`}
    >
      <Icon className="w-6 h-6 mb-1.5 group-hover:scale-110 transition-transform" />
      <span className="text-sm font-semibold text-gray-900">{label}</span>
      <span className="text-xs text-gray-500 text-center mt-0.5">
        {description}
      </span>
    </Link>
  );
};

// Recent Item Component
const RecentItem = ({ food }: { food: any }) => (
  <Link
    href={`/owner/foods/${food._id}`}
    className="flex items-center justify-between py-3 px-3 rounded-xl hover:bg-gray-50 transition-all group"
  >
    <div className="flex items-center gap-3 min-w-0 flex-1">
      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
        {food.image ? (
          <Image
            src={food.image}
            alt={food.itemName}
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        ) : (
          <UtensilsCrossed className="w-4 h-4 text-gray-400" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${
              food.isVeg ? "bg-green-600" : "bg-red-600"
            }`}
          />
          <span className="text-sm font-medium text-gray-900 truncate">
            {food.itemName}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>{food.category}</span>
          {food.isAvailable ? (
            <span className="text-green-600">• Available</span>
          ) : (
            <span className="text-gray-400">• Unavailable</span>
          )}
        </div>
      </div>
    </div>
    <div className="flex items-center gap-3 shrink-0">
      <span className="text-sm font-semibold text-gray-900">
        ₹{food.discountPrice > 0 ? food.discountPrice : food.basePrice}
      </span>
      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-orange-500 transition-colors" />
    </div>
  </Link>
);

// Restaurant Availability Toggle Component (Integrated with better state management)
const RestaurantAvailabilityToggle = ({
  isOpen,
  onStatusChange,
}: {
  isOpen: boolean;
  onStatusChange: (newStatus: boolean) => void;
}) => {
  const {
    mutate: updateStatus,
    isPending,
    isError,
    isSuccess,
  } = useRestaurantStatus();

  const handleToggle = () => {
    const newStatus = !isOpen;
    // Call the parent's onStatusChange to update the local state
    onStatusChange(newStatus);
    // Make the API call
    updateStatus({
      isOpen: newStatus,
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between gap-4">
        {/* Restaurant Status */}
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Restaurant Availability
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {isOpen
              ? "Your restaurant is currently accepting orders."
              : "Your restaurant is currently closed."}
          </p>
        </div>

        {/* Toggle */}
        <button
          type="button"
          onClick={handleToggle}
          disabled={isPending}
          className={`relative w-14 h-7 rounded-full transition-colors ${
            isOpen ? "bg-green-500" : "bg-gray-300"
          } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <span
            className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
              isOpen ? "translate-x-8" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Status */}
      <div className="mt-4 flex items-center gap-2">
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            isOpen ? "bg-green-500" : "bg-red-500"
          }`}
        />

        <span
          className={`text-sm font-semibold ${
            isOpen ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPending
            ? "Updating..."
            : isSuccess && !isError
              ? isOpen
                ? "Restaurant is Open ✓"
                : "Restaurant is Closed ✓"
              : isOpen
                ? "Restaurant is Open"
                : "Restaurant is Closed"}
        </span>
      </div>

      {/* Error */}
      {isError && (
        <p className="text-sm text-red-500 mt-3">
          Failed to update restaurant status. Please try again.
        </p>
      )}
    </div>
  );
};

export default function OwnerDashboardPage() {
  const {
    data: restaurantRes,
    isLoading: restaurantLoading,
    refetch: refetchRestaurant,
  } = useMyRestaurant();
  const { data: foodsRes, isLoading: foodsLoading } = useFoodList(1, 100);
  const { data: ordersRes } = useOwnerOrders();
  const [selectedPeriod, setSelectedPeriod] = useState<
    "today" | "week" | "month"
  >("week");
  // Local state for restaurant open status
  const [localIsOpen, setLocalIsOpen] = useState<boolean | null>(null);

  const restaurant = restaurantRes?.data;
  const foods = foodsRes?.data ?? [];

  // Use local state if available, otherwise use restaurant data
  const isOpen =
    localIsOpen !== null ? localIsOpen : (restaurant?.isOpen ?? false);

  // "Total Menu Items" should mean approved, live menu items — not
  // pending+approved+rejected combined (that's what pagination.totalItems
  // counts). Matches the same stats.approved the Food Management tab uses.
  const totalItems = foodsRes?.stats?.approved ?? 0;
  // Use the pending food count hook
  const { data: pendingCount = 0, isLoading: pendingCountLoading } =
    usePendingFoodCount();
  const availableCount = foods.filter((f) => f.isAvailable).length;

  const totalOrders = ordersRes?.totalOrders ?? 0;
  const recentItems = [...foods]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);
  const pendingApprovalCount = pendingCount;

  // Handle status change
  const handleStatusChange = (newStatus: boolean) => {
    setLocalIsOpen(newStatus);
    // Refetch restaurant data after a short delay to sync with server
    setTimeout(() => {
      refetchRestaurant();
    }, 1000);
  };

  if (restaurantLoading) {
    return (
      <main className="p-6 md:p-10 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="animate-pulse bg-white rounded-3xl h-48 shadow-sm" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="animate-pulse bg-white rounded-2xl h-28 shadow-sm"
              />
            ))}
          </div>
          <div className="animate-pulse bg-white rounded-3xl h-64 shadow-sm" />
        </div>
      </main>
    );
  }

  if (!restaurantRes?.hasRestaurant || !restaurant) {
    return (
      <main className="p-6 md:p-10 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex items-center justify-center">
        <div className="max-w-lg mx-auto text-center bg-white rounded-3xl shadow-xl border border-gray-100 p-12">
          <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto shadow-lg shadow-orange-500/30">
            <Store className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mt-6">
            Welcome to Your Restaurant Dashboard
          </h3>
          <p className="text-gray-500 mt-2 text-sm">
            Complete your restaurant onboarding to start managing your menu and
            orders.
          </p>
          <Link
            href="/owner/restaurant/setup"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-xl transition-all"
          >
            <Store className="w-4 h-4" />
            Set Up Restaurant
          </Link>
        </div>
      </main>
    );
  }

  const status = STATUS_CONFIG[restaurant.status] ?? STATUS_CONFIG.draft;
  const StatusIcon = status.icon;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section with Restaurant Image */}
        <div className="relative bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          {/* Restaurant Cover Image */}
          <div className="relative w-full h-48 md:h-64 bg-gradient-to-r from-orange-400 to-orange-500">
            {restaurant.coverImage ? (
              <Image
                src={restaurant.coverImage}
                alt={restaurant.restaurantName}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 flex items-center justify-center">
                <div className="text-center text-white">
                  <Store className="w-16 h-16 mx-auto opacity-50" />
                  <p className="text-sm font-medium opacity-75 mt-2">
                    Restaurant Cover
                  </p>
                </div>
              </div>
            )}

            {/* Status Badge - Overlay */}
            <div className="absolute top-4 right-4">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border shadow-lg backdrop-blur-sm bg-white/90 ${status.color}`}
              >
                <StatusIcon className="w-3.5 h-3.5" />
                {status.label}
              </span>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>

          {/* Restaurant Info - Premium Card Overlay */}
          <div className="relative -mt-20 px-6 pb-6">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-white/20 p-6 shadow-2xl">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Restaurant Avatar - Larger with glow */}
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="w-28 h-28 rounded-2xl border-4 border-white shadow-2xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center overflow-hidden ring-4 ring-orange-500/30">
                      {restaurant.logo ? (
                        <Image
                          src={restaurant.logo}
                          alt={restaurant.restaurantName}
                          width={112}
                          height={112}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Store className="w-12 h-12 text-white" />
                      )}
                    </div>
                    {/* Online Status Badge */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
                    </div>
                  </div>

                  <div className="lg:hidden">
                    <h1 className="text-2xl font-bold text-gray-900">
                      {restaurant.restaurantName}
                    </h1>
                  </div>
                </div>

                {/* Restaurant Info */}
                <div className="flex-1 min-w-0">
                  <h1 className="hidden lg:block text-3xl font-bold text-gray-900 mb-3">
                    {restaurant.restaurantName}
                  </h1>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1.5 text-sm bg-gray-100 hover:bg-gray-200 px-3.5 py-1.5 rounded-full border border-gray-200 text-gray-700 transition-colors">
                      <MapPin className="w-3.5 h-3.5 text-gray-500" />
                      {restaurant.location || "Location not set"}
                    </span>

                    <span className="flex items-center gap-1.5 text-sm bg-gray-100 hover:bg-gray-200 px-3.5 py-1.5 rounded-full border border-gray-200 text-gray-700 transition-colors">
                      <ShoppingBag className="w-3.5 h-3.5 text-gray-500" />
                      <span className="font-semibold">{totalOrders || 0}</span>
                      <span className="text-gray-500">orders</span>
                    </span>

                    <span className="flex items-center gap-1.5 text-sm bg-gray-100 hover:bg-gray-200 px-3.5 py-1.5 rounded-full border border-gray-200 text-gray-700 transition-colors">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">4.8</span>
                      <span className="text-gray-500">(128 reviews)</span>
                    </span>

                    <span
                      className={`flex items-center gap-1.5 text-sm px-3.5 py-1.5 rounded-full border transition-colors ${
                        isOpen
                          ? "bg-green-100 hover:bg-green-200 border-green-200 text-green-700"
                          : "bg-red-100 hover:bg-red-200 border-red-200 text-red-700"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${isOpen ? "bg-green-500" : "bg-red-500"} animate-pulse`}
                      />
                      {isOpen ? "Open Now" : "Closed"}
                    </span>
                  </div>
                </div>

                {/* Action Buttons - Premium Style */}
                <div className="flex flex-col sm:flex-row gap-2 lg:gap-3 shrink-0">
                  <Link
                    href={"/owner/restaurant"}
                    target="_blank"
                    className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-medium rounded-2xl transition-all flex items-center gap-2 hover:scale-105 hover:shadow-xl shadow-lg shadow-orange-500/25"
                  >
                    <Eye className="w-4 h-4" />
                    View Store
                  </Link>
                </div>
              </div>

              {/* Status Message - Enhanced */}
              {restaurant.status !== "approved" && (
                <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 backdrop-blur-sm rounded-2xl border border-yellow-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {status.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Contact support if you need assistance
                    </p>
                  </div>
                  <button className="ml-auto px-4 py-1.5 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 text-xs font-medium rounded-xl transition-colors">
                    Learn More
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={UtensilsCrossed}
            label="Total Menu Items"
            value={foodsLoading ? "—" : foods.length}
            subtitle={`${availableCount} available`}
            color="orange"
          />
          <StatCard
            icon={ShoppingBag}
            label="Orders"
            value={totalOrders}
            change={{ value: 8.5, positive: true }}
            color="blue"
          />
          <StatCard
            icon={ClockIcon}
            label="Food Pending Approval"
            value={pendingApprovalCount}
            subtitle={`${foodsLoading ? "—" : foods.length} total items`}
            color="purple"
          />
        </div>

        {/* Quick Actions & Restaurant Availability Toggle */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <QuickActionCard
              icon={Plus}
              label="Add Item"
              description="Add new dish"
              href="/owner/foods/add"
              color="orange"
            />
            <QuickActionCard
              icon={Eye}
              label="View Menu"
              description="Manage items"
              href="/owner/foods/foodList"
              color="blue"
            />
            <QuickActionCard
              icon={ShoppingBag}
              label="Orders"
              description="Manage orders"
              href="/owner/order"
              color="purple"
            />
          </div>
          {/* Restaurant Availability Toggle */}
          <div className="lg:col-span-1">
            <RestaurantAvailabilityToggle
              isOpen={isOpen}
              onStatusChange={handleStatusChange}
            />
          </div>
        </div>

        {/* Recent Activity & Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Items */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold text-gray-900">Recently Added</h2>
                <p className="text-xs text-gray-400">
                  Latest items from your menu
                </p>
              </div>
              <Link
                href="/owner/foods/foodList"
                className="text-sm text-orange-600 font-medium hover:underline flex items-center gap-0.5"
              >
                View all
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {foodsLoading ? (
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="animate-pulse h-16 bg-gray-50 rounded-xl"
                  />
                ))}
              </div>
            ) : recentItems.length === 0 ? (
              <div className="text-center py-12">
                <UtensilsCrossed className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">No menu items yet.</p>
                <Link
                  href="/owner/foods/add"
                  className="inline-block mt-2 text-sm text-orange-600 font-medium hover:underline"
                >
                  Add your first item
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {recentItems.map((food) => (
                  <RecentItem key={food._id} food={food} />
                ))}
              </div>
            )}
          </div>

          {/* Quick Insights */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Quick Insights</h2>

            <div className="space-y-4">
              {/* Today's Performance */}
              <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-orange-700">
                    Today's Orders
                  </span>
                  <span className="text-2xl font-bold text-orange-700">0</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-orange-600">
                    ↑ 3 from yesterday
                  </span>
                </div>
              </div>

              {/* Popular Items */}
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-700">
                    Popular Items
                  </span>
                  <span className="text-2xl font-bold text-blue-700">0</span>
                </div>
                <span className="text-xs text-blue-600">
                  Most ordered this week
                </span>
              </div>

              {/* Conversion Rate */}
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-700">
                    Conversion Rate
                  </span>
                  <span className="text-2xl font-bold text-green-700">0%</span>
                </div>
                <div className="w-full h-1.5 bg-green-200 rounded-full mt-2">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `0%` }}
                  />
                </div>
              </div>

              {/* Rating Summary */}
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-purple-500 text-purple-500" />
                  <span className="text-sm font-medium text-purple-700">
                    Average Rating
                  </span>
                  <span className="ml-auto text-2xl font-bold text-purple-700">
                    0
                  </span>
                </div>
                <span className="text-xs text-purple-600">
                  Based on 0 reviews
                </span>
              </div>
            </div>

            {/* Period Selector */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex gap-1">
                {["Today", "Week", "Month"].map((period) => (
                  <button
                    key={period}
                    onClick={() =>
                      setSelectedPeriod(period.toLowerCase() as any)
                    }
                    className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                      selectedPeriod === period.toLowerCase()
                        ? "bg-orange-500 text-white"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center text-xs text-gray-400">
          Dashboard updates every 5 minutes • Last updated:{" "}
          {new Date().toLocaleTimeString()}
        </div>
      </div>
    </main>
  );
}
