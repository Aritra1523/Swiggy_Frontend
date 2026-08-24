"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import useOrders from "@/customHooks/order/useOrders";
import {
  ArrowLeft,
  Clock,
  MapPin,
  Store,
  Utensils,
  ShoppingBag,
  Truck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Calendar,
  Receipt,
  CreditCard,
  Package,
  User,
  Phone,
  Mail,
  ChevronRight,
  Home,
  Building,
  MapPinned,
  Timer,
  ChefHat,
  Bike,
  TrendingUp,
  Download,
  Printer,
  Share2,
  MoreVertical,
} from "lucide-react";

const CANCELLABLE_STATUSES = [
  "placed",
  "accepted",
  // "preparing",
];

// Status Configuration
const STATUS_CONFIG: Record<
  string,
  {
    label: string;
    color: string;
    bgColor: string;
    borderColor: string;
    icon: any;
    progress: number;
  }
> = {
  placed: {
    label: "Order Placed",
    color: "text-yellow-700",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    icon: Clock,
    progress: 20,
  },
  accepted: {
    label: "Order Accepted",
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    icon: CheckCircle2,
    progress: 40,
  },
  preparing: {
    label: "Preparing",
    color: "text-purple-700",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    icon: ChefHat,
    progress: 60,
  },
  out_for_delivery: {
    label: "Out for Delivery",
    color: "text-indigo-700",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    icon: Bike,
    progress: 85,
  },
  delivered: {
    label: "Delivered",
    color: "text-green-700",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    icon: CheckCircle2,
    progress: 100,
  },
  cancelled: {
    label: "Cancelled",
    color: "text-red-700",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    icon: XCircle,
    progress: 0,
  },
};

// Loading Skeleton
const OrderDetailsSkeleton = () => (
  <div className="max-w-4xl mx-auto animate-pulse space-y-4">
    <div className="h-8 w-32 bg-gray-200 rounded-lg" />
    <div className="bg-white rounded-3xl p-6 space-y-4">
      <div className="flex justify-between">
        <div className="space-y-2">
          <div className="h-6 w-40 bg-gray-200 rounded" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>
        <div className="h-8 w-28 bg-gray-200 rounded-full" />
      </div>
      <div className="h-2 bg-gray-200 rounded-full" />
    </div>
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="bg-white rounded-3xl p-6 h-32" />
    ))}
  </div>
);

// Status Timeline Component
const StatusTimeline = ({
  status,
  createdAt,
}: {
  status: string;
  createdAt: string;
}) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.placed;
  const steps = [
    { label: "Order Placed", icon: Clock, time: createdAt },
    {
      label: "Order Accepted",
      icon: CheckCircle2,
      time: status === "placed" ? null : createdAt,
    },
    {
      label: "Preparing",
      icon: ChefHat,
      time: status === "preparing" ? "Currently" : null,
    },
    {
      label: "Out for Delivery",
      icon: Bike,
      time: status === "out_for_delivery" ? "On the way" : null,
    },
    {
      label: "Delivered",
      icon: CheckCircle2,
      time: status === "delivered" ? "Delivered" : null,
    },
  ];

  const currentStepIndex = steps.findIndex((_, index) => {
    if (status === "delivered") return index === 4;
    if (status === "out_for_delivery") return index === 3;
    if (status === "preparing") return index === 2;
    if (status === "accepted") return index === 1;
    return index === 0;
  });

  return (
    <div className="relative">
      {steps.map((step, index) => {
        const isCompleted = index <= currentStepIndex;
        const isCurrent = index === currentStepIndex;
        const Icon = step.icon;

        return (
          <div
            key={index}
            className="relative flex items-start gap-4 pb-8 last:pb-0"
          >
            {/* Line connector */}
            {index < steps.length - 1 && (
              <div
                className={`absolute left-5 top-10 w-0.5 h-[calc(100%-1.5rem)] transition-colors ${
                  isCompleted ? "bg-orange-500" : "bg-gray-200"
                }`}
              />
            )}

            {/* Dot */}
            <div
              className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
                isCurrent
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30 ring-4 ring-orange-100"
                  : isCompleted
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-400"
              }`}
            >
              <Icon className="w-4 h-4" />
            </div>

            {/* Content */}
            <div className="flex-1 pt-1">
              <div className="flex items-center justify-between">
                <h4
                  className={`font-semibold ${isCompleted ? "text-gray-900" : "text-gray-400"}`}
                >
                  {step.label}
                </h4>
                {step.time && (
                  <span
                    className={`text-xs ${isCompleted ? "text-gray-500" : "text-gray-400"}`}
                  >
                    {step.time}
                  </span>
                )}
              </div>
              {isCurrent && status !== "delivered" && (
                <p className="text-xs text-orange-600 font-medium mt-0.5">
                  In Progress
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Info Card Component
const InfoCard = ({
  icon: Icon,
  label,
  value,
  subValue,
  color = "orange",
}: {
  icon: any;
  label: string;
  value: string;
  subValue?: string;
  color?: "orange" | "blue" | "green" | "purple" | "red";
}) => {
  const colors = {
    orange: "bg-orange-50 text-orange-600",
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <div className="flex items-start gap-3">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colors[color]}`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="text-xs text-gray-400 font-medium">{label}</p>
        <p className="text-sm font-semibold text-gray-900">{value}</p>
        {subValue && <p className="text-xs text-gray-400 mt-0.5">{subValue}</p>}
      </div>
    </div>
  );
};

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const {
    selectedOrder,
    orderLoading,
    orderError,
    handleFetchOrderDetails,
    handleCancelOrder,
  } = useOrders();

  const [fetching, setFetching] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [confirmingCancel, setConfirmingCancel] = useState(false);

  const orderId = params.id as string;

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        setFetching(true);
        await handleFetchOrderDetails(orderId);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const cancelThisOrder = async () => {
    if (!selectedOrder) return;

    setCancelling(true);

    try {
      await handleCancelOrder(selectedOrder._id);
      setConfirmingCancel(false);
      await handleFetchOrderDetails(selectedOrder._id);
    } catch (error) {
      console.error("Failed to cancel order:", error);
    } finally {
      setCancelling(false);
    }
  };

  // Loading
  if (fetching || orderLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 md:px-8">
        <OrderDetailsSkeleton />
      </main>
    );
  }

  // Error
  if (orderError) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Unable to Load Order
          </h2>
          <p className="text-red-500 text-sm">{orderError}</p>
          <button
            onClick={() => router.back()}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-xl transition-all"
          >
            Go Back
          </button>
        </div>
      </main>
    );
  }

  // No Order
  if (!selectedOrder) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Order Not Found
          </h2>
          <p className="text-gray-500 text-sm">
            The order you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/Order"
            className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-xl transition-all"
          >
            View All Orders
          </Link>
        </div>
      </main>
    );
  }

  const totalItems =
    selectedOrder.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  const status = STATUS_CONFIG[selectedOrder.status] || STATUS_CONFIG.placed;
  const StatusIcon = status.icon;
  const canCancel = CANCELLABLE_STATUSES.includes(selectedOrder.status);

  // Format date
  const orderDate = new Date(selectedOrder.createdAt);
  const formattedDate = orderDate.toLocaleDateString("en-IN", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = orderDate.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4 md:py-10 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.push("/Order")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:text-orange-500 hover:border-orange-200 hover:bg-orange-50 font-medium transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            My Orders
          </button>

          <div className="flex items-center gap-2">
            <button className="p-2 bg-white border border-gray-200 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-2 bg-white border border-gray-200 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Order Header Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-4">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                    <Receipt className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">
                      Order ID
                    </p>
                    <h1 className="font-bold text-xl text-gray-900 font-mono tracking-tight">
                      #{selectedOrder._id.slice(-8).toUpperCase()}
                    </h1>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-3 flex-wrap">
                  <span className="flex items-center gap-1.5 text-sm text-gray-500">
                    <Calendar className="w-3.5 h-3.5" />
                    {formattedDate}
                  </span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span className="flex items-center gap-1.5 text-sm text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    {formattedTime}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border ${status.bgColor} ${status.color} ${status.borderColor}`}
                >
                  <StatusIcon className="w-4 h-4" />
                  {status.label}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            {selectedOrder.status !== "cancelled" && (
              <div className="mt-6">
                <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-700"
                    style={{ width: `${status.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span
                    className={
                      status.progress >= 20 ? "text-orange-600 font-medium" : ""
                    }
                  >
                    Placed
                  </span>
                  <span
                    className={
                      status.progress >= 40 ? "text-orange-600 font-medium" : ""
                    }
                  >
                    Accepted
                  </span>
                  <span
                    className={
                      status.progress >= 60 ? "text-orange-600 font-medium" : ""
                    }
                  >
                    Preparing
                  </span>
                  <span
                    className={
                      status.progress >= 85 ? "text-orange-600 font-medium" : ""
                    }
                  >
                    Out for Delivery
                  </span>
                  <span
                    className={
                      status.progress >= 100
                        ? "text-orange-600 font-medium"
                        : ""
                    }
                  >
                    Delivered
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Store className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-bold text-gray-900">
              Restaurant Details
            </h2>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center text-3xl shadow-sm">
              {selectedOrder.restaurant?.logo ? (
                <Image
                  src={selectedOrder.restaurant.logo}
                  alt={selectedOrder.restaurant.restaurantName}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <Store className="w-7 h-7 text-orange-500" />
              )}
            </div>

            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900">
                {selectedOrder.restaurant?.restaurantName || "Restaurant"}
              </h3>
              <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                {selectedOrder.restaurant?.location || "Location not available"}
              </div>
              {selectedOrder.restaurant?.phone && (
                <p className="text-sm text-gray-400 mt-0.5">
                  📞 {selectedOrder.restaurant.phone}
                </p>
              )}
            </div>

            {/* <Link
              href={`/restaurant/${selectedOrder.restaurant?._id}`}
              className="inline-flex items-center gap-1 text-sm text-orange-600 font-medium hover:underline"
            >
              View Restaurant
              <ChevronRight className="w-4 h-4" />
            </Link> */}
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 mb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-bold text-gray-900">Order Items</h2>
            </div>
            <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
              {totalItems} item{totalItems !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="space-y-4">
            {selectedOrder.items?.map((item) => {
              const itemTotal = item.price * item.quantity;

              return (
                <div
                  key={item._id}
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors"
                >
                  {/* Item Image */}
                  <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                    {item.food?.image ? (
                      <Image
                        src={item.food.image}
                        alt={item.food.itemName}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Utensils className="w-6 h-6 text-gray-300" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          item.food?.isVeg ? "bg-green-600" : "bg-red-600"
                        }`}
                      />
                      <h3 className="font-semibold text-gray-900 truncate">
                        {item.food?.itemName || "Food item unavailable"}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-0.5">
                      <span>
                        ₹{item.price.toFixed(2)} × {item.quantity}
                      </span>
                      {item.variant && (
                        <>
                          <span className="w-1 h-1 bg-gray-300 rounded-full" />
                          <span>{item.variant}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <p className="font-bold text-gray-900 text-lg">
                    ₹{itemTotal.toFixed(2)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Delivery & Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Delivery Address */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-bold text-gray-900">
                Delivery Address
              </h2>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedOrder.user?.name || "Customer"}
                  </p>
                  {selectedOrder.user?.phone && (
                    <p className="text-sm text-gray-500">
                      {selectedOrder.user.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                  <Home className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selectedOrder.address || "Address not available"}
                  </p>
                  {selectedOrder.addressNote && (
                    <p className="text-xs text-gray-400 mt-1">
                      📝 {selectedOrder.addressNote}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-green-500" />
              <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-900 font-medium">
                  ₹{selectedOrder.totalAmount.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Delivery Fee</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tax</span>
                <span className="text-gray-900 font-medium">₹0.00</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Payment Method</span>
                <span className="text-gray-900 font-medium capitalize">
                  {selectedOrder.paymentMethod || "Online"}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-gray-900">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-orange-600">
                    ₹{selectedOrder.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cancel Confirmation */}
        {confirmingCancel && (
          <div className="bg-gradient-to-br from-red-50 to-red-100/50 border-2 border-red-200 rounded-3xl p-6 mb-4 animate-in slide-in-from-top duration-300">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-red-800 text-lg">
                  Cancel this order?
                </p>
                <p className="text-sm text-red-600 mt-1">
                  This action cannot be undone. The order will be permanently
                  cancelled.
                </p>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={cancelThisOrder}
                    disabled={cancelling}
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 shadow-lg shadow-red-500/30"
                  >
                    {cancelling ? "Cancelling..." : "Yes, Cancel Order"}
                  </button>
                  <button
                    onClick={() => setConfirmingCancel(false)}
                    disabled={cancelling}
                    className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Keep Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
          {canCancel && !confirmingCancel && (
            <button
              onClick={() => setConfirmingCancel(true)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-semibold rounded-xl transition-all"
            >
              <XCircle className="w-4 h-4" />
              Cancel Order
            </button>
          )}

          <Link
            href="/Order"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-xl transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            View All Orders
          </Link>
        </div>
      </div>
    </main>
  );
}
