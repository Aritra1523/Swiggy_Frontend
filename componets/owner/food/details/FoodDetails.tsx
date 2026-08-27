"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useFoodDetails } from "@/customHooks/owner/useFoodManagement";
import {
  ArrowLeft,
  Pencil,
  Utensils,
  CheckCircle2,
  Clock,
  XCircle,
  ShoppingBag,
  Star,
  Users,
  Timer,
  ChefHat,
  AlertCircle,
  Share2,
  Printer,
  MoreVertical,
  Calendar,
  Package,
  Tag,
} from "lucide-react";

const APPROVAL_CONFIG: Record<
  "approved" | "pending" | "rejected",
  { icon: typeof CheckCircle2; color: string; label: string; bgColor: string }
> = {
  approved: {
    icon: CheckCircle2,
    color: "text-green-700 border-green-200 bg-green-50",
    bgColor: "bg-green-500",
    label: "Approved",
  },
  pending: {
    icon: Clock,
    color: "text-yellow-700 border-yellow-200 bg-yellow-50",
    bgColor: "bg-yellow-500",
    label: "Pending Review",
  },
  rejected: {
    icon: XCircle,
    color: "text-red-700 border-red-200 bg-red-50",
    bgColor: "bg-red-500",
    label: "Rejected",
  },
};

// Stat Card Component
const StatCard = ({
  icon: Icon,
  label,
  value,
  subtext,
  color = "blue",
}: {
  icon: any;
  label: string;
  value: string | number;
  subtext?: string;
  color?: "blue" | "green" | "orange" | "purple";
}) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors">
      <div className="flex items-center gap-2">
        <div className={`p-1.5 rounded-lg ${colors[color]}`}>
          <Icon className="w-3.5 h-3.5" />
        </div>
        <span className="text-xs font-medium text-gray-500">{label}</span>
      </div>
      <p className="text-sm font-semibold text-gray-900 mt-1">{value}</p>
      {subtext && <p className="text-xs text-gray-400 mt-0.5">{subtext}</p>}
    </div>
  );
};

// Loading Skeleton
const DetailsSkeleton = () => (
  <div className="max-w-2xl mx-auto animate-pulse">
    <div className="h-8 w-32 bg-gray-200 rounded-lg mb-6" />
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="w-full h-56 bg-gray-200" />
      <div className="p-6 space-y-4">
        <div className="h-8 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-24 bg-gray-200 rounded" />
        <div className="grid grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Error Component
const ErrorState = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
    <div className="text-center max-w-md bg-white rounded-3xl shadow-xl p-8">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to Load Item</h3>
      <p className="text-gray-500 text-sm mb-6">{message}</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={onRetry}
          className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/owner/foods/foodList"
          className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
        >
          Back to Menu
        </Link>
      </div>
    </div>
  </div>
);

export default function FoodDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: food, isLoading, isError, error, refetch } = useFoodDetails(id);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 md:px-8">
        <DetailsSkeleton />
      </main>
    );
  }

  if (isError || !food) {
    return (
      <ErrorState
        message={(error as any)?.response?.data?.message || "Couldn't load this item"}
        onRetry={() => refetch()}
      />
    );
  }

  const approval = APPROVAL_CONFIG[food.approvalStatus];
  const ApprovalIcon = approval.icon;

  // Format date
  const createdAt = new Date(food.createdAt || Date.now());
  const formattedDate = createdAt.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4 md:py-10 md:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.push("/owner/foods/foodList")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:text-orange-500 hover:border-orange-200 hover:bg-orange-50 font-medium transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Menu
          </button>

          <div className="flex items-center gap-2">
            <button
              className="p-2 bg-white border border-gray-200 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              className="p-2 bg-white border border-gray-200 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
              title="Print"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Image Section */}
          <div className="relative w-full h-64 md:h-80 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            {food.image ? (
              <Image
                src={food.image}
                alt={food.itemName}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Utensils className="w-16 h-16 text-gray-300" />
                <span className="text-sm text-gray-400">No image available</span>
              </div>
            )}

            {/* Status Badge - Overlay */}
            <div className="absolute top-4 right-4">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border shadow-sm backdrop-blur-sm ${approval.color}`}
              >
                <ApprovalIcon className="w-3.5 h-3.5" />
                {approval.label}
              </span>
            </div>

            {/* Availability Badge */}
            <div className="absolute top-4 left-4">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm backdrop-blur-sm ${
                  food.isAvailable
                    ? "bg-green-500 text-white"
                    : "bg-gray-500 text-white"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    food.isAvailable ? "bg-white" : "bg-gray-300"
                  }`}
                />
                {food.isAvailable ? "Available" : "Unavailable"}
              </span>
            </div>

            {/* Veg/Non-Veg Badge */}
            <div className="absolute bottom-4 left-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                  food.isVeg ? "bg-green-500" : "bg-red-500"
                }`}
              >
                <span className="text-white font-bold text-xs">
                  {food.isVeg ? "V" : "N"}
                </span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {food.itemName}
                  </h1>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                    <ChefHat className="w-3.5 h-3.5" />
                    {food.category}
                  </span>
                  {food.cuisine && (
                    <>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm text-gray-500">{food.cuisine}</span>
                    </>
                  )}
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Added {formattedDate}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="bg-orange-50 rounded-2xl px-4 py-2 md:px-6 md:py-3 border border-orange-100 shrink-0">
                {food.discountPrice > 0 && food.discountPrice < food.basePrice ? (
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ₹{food.discountPrice}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        ₹{food.basePrice}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                        {food.discountPercentage || Math.round(((food.basePrice - food.discountPrice) / food.basePrice) * 100)}% OFF
                      </span>
                    </div>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{food.basePrice}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            {food.description && (
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Description
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {food.description}
                </p>
              </div>
            )}

            {/* Rejection Reason - Show prominently if rejected */}
            {food.approvalStatus === "rejected" && food.rejectedReason && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-red-800">
                      Rejection Reason
                    </p>
                    <p className="text-sm text-red-700 mt-0.5">
                      {food.rejectedReason}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <StatCard
                icon={Timer}
                label="Prep Time"
                value={`${food.preparationTime || 0} min`}
                color="orange"
              />
              <StatCard
                icon={Star}
                label="Rating"
                value={food.rating > 0 ? `${food.rating} ★` : "N/A"}
                subtext={food.rating > 0 ? `${food.totalRatings} reviews` : "No ratings yet"}
                color="yellow"
              />
              <StatCard
                icon={ShoppingBag}
                label="Total Orders"
                value={food.totalOrders || 0}
                color="blue"
              />
              <StatCard
                icon={Users}
                label="Daily Average"
                value={Math.round((food.totalOrders || 0) / 30)}
                subtext="Last 30 days"
                color="purple"
              />
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1  gap-3 mb-6 p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-3">
               
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Clock className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Last Updated</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(food.updatedAt || Date.now()).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => router.push(`/owner/foods/edit/${food._id}`)}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all active:scale-95"
              >
                <Pencil className="w-4 h-4" />
                Edit Item
              </button>

           
            </div>
          </div>
        </div>

        {/* Related Actions Card */}
        <div className="mt-6 bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-center transition-colors">
              <Package className="w-5 h-5 text-gray-600 mx-auto mb-1" />
              <span className="text-xs text-gray-600">Update Stock</span>
            </button>
            <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-center transition-colors">
              <Clock className="w-5 h-5 text-gray-600 mx-auto mb-1" />
              <span className="text-xs text-gray-600">Set Schedule</span>
            </button>
            <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-center transition-colors">
              <Tag className="w-5 h-5 text-gray-600 mx-auto mb-1" />
              <span className="text-xs text-gray-600">Add Variant</span>
            </button>
            <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-center transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-600 mx-auto mb-1" />
              <span className="text-xs text-gray-600">More</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}