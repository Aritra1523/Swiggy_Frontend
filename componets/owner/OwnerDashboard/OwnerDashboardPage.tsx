"use client";

import Link from "next/link";
import Image from "next/image";
import { useMyRestaurant, useFoodList } from "@/customHooks/owner/useFoodManagement";
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
  { icon: typeof CheckCircle2; color: string; label: string; message: string; bgGradient: string }
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

// Stat Card Component
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
    orange: "bg-orange-50 text-orange-600",
    green: "bg-green-50 text-green-600",
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
          )}
        </div>
        <div className={`p-2.5 rounded-xl ${colors[color]} group-hover:scale-110 transition-transform`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      {/* {change && (
        <div className="flex items-center gap-1 mt-2">
          <span
            className={`text-xs font-semibold ${
              change.positive ? "text-green-600" : "text-red-600"
            }`}
          >
            {change.positive ? "↑" : "↓"} {Math.abs(change.value)}%
          </span>
          <span className="text-xs text-gray-400">vs last month</span>
        </div>
      )} */}
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
    orange: "bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-600",
    blue: "bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-600",
    green: "bg-green-50 hover:bg-green-100 border-green-200 text-green-600",
    purple: "bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-600",
  };

  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed transition-all ${colors[color]} group`}
    >
      <Icon className="w-6 h-6 mb-1.5 group-hover:scale-110 transition-transform" />
      <span className="text-sm font-semibold text-gray-900">{label}</span>
      <span className="text-xs text-gray-500 text-center mt-0.5">{description}</span>
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

export default function OwnerDashboardPage() {
  const { data: restaurantRes, isLoading: restaurantLoading } = useMyRestaurant();
  const { data: foodsRes, isLoading: foodsLoading } = useFoodList(1, 100);
  const [selectedPeriod, setSelectedPeriod] = useState<"today" | "week" | "month">("week");

  const restaurant = restaurantRes?.data;
  const foods = foodsRes?.data ?? [];

  const totalItems = foodsRes?.pagination?.totalItems ?? foods.length;
  const availableCount = foods.filter((f) => f.isAvailable).length;
  const pendingApprovalCount = foods.filter(
    (f) => f.approvalStatus === "pending",
  ).length;

  const recentItems = [...foods]
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  // Mock data for analytics (would come from API in production)
  const analyticsData = {
    todayOrders: 24,
    weekOrders: 156,
    monthOrders: 623,
    totalRevenue: 45678,
    averageRating: 4.8,
    totalReviews: 342,
    conversionRate: 12.5,
    popularItems: 3,
  };

  if (restaurantLoading) {
    return (
      <main className="p-6 md:p-10 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="animate-pulse bg-white rounded-3xl h-48 shadow-sm" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse bg-white rounded-2xl h-28 shadow-sm" />
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
          <h3 className="text-2xl font-bold text-gray-900 mt-6">Welcome to Your Restaurant Dashboard</h3>
          <p className="text-gray-500 mt-2 text-sm">
            Complete your restaurant onboarding to start managing your menu and orders.
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
                  <p className="text-sm font-medium opacity-75 mt-2">Restaurant Cover</p>
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

          {/* Restaurant Info - Overlay */}
          <div className="relative -mt-16 px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              {/* Restaurant Avatar */}
              <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg bg-white flex items-center justify-center overflow-hidden">
                {restaurant.logo ? (
                  <Image
                    src={restaurant.logo}
                    alt={restaurant.restaurantName}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Store className="w-10 h-10 text-orange-500" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                  {restaurant.restaurantName}
                </h1>
                <div className="flex flex-wrap items-center gap-3 mt-1 text-white/90">
                  <span className="flex items-center gap-1 text-sm">
                    <MapPin className="w-3.5 h-3.5" />
                    {restaurant.location}
                  </span>
                  <span className="hidden md:inline text-white/30">|</span>
                  <span className="flex items-center gap-1 text-sm">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    {analyticsData.averageRating} ({analyticsData.totalReviews} reviews)
                  </span>
                  <span className="hidden md:inline text-white/30">|</span>
                  <span className="flex items-center gap-1 text-sm">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    {analyticsData.weekOrders} orders this week
                  </span>
                </div>
              </div>

              {/* Quick Action Button */}
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white text-sm font-medium rounded-xl transition-colors border border-white/20">
                  <Share2 className="w-4 h-4 inline mr-1.5" />
                  Share
                </button>
                <Link
                  href="/owner/restaurant/edit"
                  className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-900 text-sm font-medium rounded-xl transition-colors shadow-lg"
                >
                  Edit Profile
                </Link>
              </div>
            </div>

            {restaurant.status !== "approved" && (
              <div className="mt-4 p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20">
                <p className="text-sm text-white flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {status.message}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={UtensilsCrossed}
            label="Total Menu Items"
            value={foodsLoading ? "—" : totalItems}
            subtitle={`${availableCount} available`}
            color="orange"
          />
          <StatCard
            icon={ShoppingBag}
            label="Orders"
            value={analyticsData.weekOrders}
            change={{ value: 8.5, positive: true }}
            subtitle={`${analyticsData.todayOrders} today`}
            color="blue"
          />
          <StatCard
            icon={DollarSign}
            label="Revenue"
            value={`₹${(analyticsData.totalRevenue / 1000).toFixed(1)}K`}
            change={{ value: 12.3, positive: true }}
            subtitle={`₹${analyticsData.totalRevenue} total`}
            color="green"
          />
          <StatCard
            icon={ClockIcon}
            label="Pending Approval"
            value={pendingApprovalCount}
            subtitle={`${foodsLoading ? "—" : foods.length} total items`}
            color="purple"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
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
          {/* <QuickActionCard
            icon={TrendingUp}
            label="Analytics"
            description="View insights"
            href="/owner/analytics"
            color="green"
          /> */}
          <QuickActionCard
            icon={Users}
            label="Customers"
            description="Manage reviews"
            href="/owner/customers"
            color="purple"
          />
        </div>

        {/* Recent Activity & Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Items */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold text-gray-900">Recently Added</h2>
                <p className="text-xs text-gray-400">Latest items from your menu</p>
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
                  <div key={i} className="animate-pulse h-16 bg-gray-50 rounded-xl" />
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
                  <span className="text-sm font-medium text-orange-700">Today's Orders</span>
                  <span className="text-2xl font-bold text-orange-700">{analyticsData.todayOrders}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-orange-600">↑ 3 from yesterday</span>
                </div>
              </div>

              {/* Popular Items */}
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-700">Popular Items</span>
                  <span className="text-2xl font-bold text-blue-700">{analyticsData.popularItems}</span>
                </div>
                <span className="text-xs text-blue-600">Most ordered this week</span>
              </div>

              {/* Conversion Rate */}
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-700">Conversion Rate</span>
                  <span className="text-2xl font-bold text-green-700">{analyticsData.conversionRate}%</span>
                </div>
                <div className="w-full h-1.5 bg-green-200 rounded-full mt-2">
                  <div 
                    className="h-full bg-green-500 rounded-full" 
                    style={{ width: `${analyticsData.conversionRate}%` }}
                  />
                </div>
              </div>

              {/* Rating Summary */}
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-purple-500 text-purple-500" />
                  <span className="text-sm font-medium text-purple-700">Average Rating</span>
                  <span className="ml-auto text-2xl font-bold text-purple-700">{analyticsData.averageRating}</span>
                </div>
                <span className="text-xs text-purple-600">Based on {analyticsData.totalReviews} reviews</span>
              </div>
            </div>

            {/* Period Selector */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex gap-1">
                {["Today", "Week", "Month"].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period.toLowerCase() as any)}
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
          Dashboard updates every 5 minutes • Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </main>
  );
}