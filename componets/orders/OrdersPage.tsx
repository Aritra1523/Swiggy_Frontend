"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import useOrders from "@/customHooks/order/useOrders";
import { socket } from "@/lib/socket/socket";

import {
  Clock,
  MapPin,
  Package,
  ChevronRight,
  ShoppingBag,
  Calendar,
  CheckCircle,
  XCircle,
  Utensils,
  Bike,
  Filter,
  Search,
  ArrowLeft,
} from "lucide-react";

const STATUS_FILTERS = [
  "all",
  "placed",
  "accepted",
  "preparing",
  "out_for_delivery",
  "delivered",
  "cancelled",
] as const;

export default function OrdersPage() {
  const router = useRouter();

  const { orders, orderLoading, orderError, handleFetchMyOrders } = useOrders();

  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // ---- Socket io:  ----

  useEffect(() => {
    handleFetchMyOrders();
  }, []);

  // ---- Socket: live order status updates ----
  useEffect(() => {
    // Connect to socket
    socket.connect();

    const handleConnect = () => {
      console.log("Connected:", socket.id);
    };

    const handleOrderStatus = (data: any) => {
      console.log("Order status update:", data);
      // Refetch orders to get the updated status
      handleFetchMyOrders();
      // alert("hiii")
    };

    // Register event listeners
    socket.on("connect", handleConnect);
    socket.on("order:status", handleOrderStatus);

    // Cleanup on unmount
    return () => {
      socket.off("connect", handleConnect);
      socket.off("order:status", handleOrderStatus);
      socket.disconnect();
    };
  }, []); // Empty dependency array ensures this runs once

  // ✅ Updated statusConfig with all statuses including out_for_delivery
  const statusConfig = {
    placed: {
      icon: Clock,
      color: "bg-yellow-50 text-yellow-700 border-yellow-100",
      label: "Order Placed",
      progress: 20,
    },
    accepted: {
      icon: CheckCircle,
      color: "bg-blue-50 text-blue-700 border-blue-100",
      label: "Accepted",
      progress: 40,
    },
    preparing: {
      icon: Utensils,
      color: "bg-purple-50 text-purple-700 border-purple-100",
      label: "Preparing",
      progress: 60,
    },
    out_for_delivery: {
      // ✅ Added out_for_delivery
      icon: Bike,
      color: "bg-indigo-50 text-indigo-700 border-indigo-100",
      label: "Out for Delivery",
      progress: 85,
    },
    delivered: {
      icon: CheckCircle,
      color: "bg-green-50 text-green-700 border-green-100",
      label: "Delivered",
      progress: 100,
    },
    cancelled: {
      icon: XCircle,
      color: "bg-red-50 text-red-700 border-red-100",
      label: "Cancelled",
      progress: 0,
    },
  };

  const getStatusConfig = (status: string) => {
    return (
      statusConfig[status as keyof typeof statusConfig] || {
        icon: Clock,
        color: "bg-gray-50 text-gray-700 border-gray-100",
        label: status.replaceAll("_", " "),
        progress: 0,
      }
    );
  };

  const filteredOrders = orders.filter((order) => {
    if (activeFilter !== "all" && order.status !== activeFilter) {
      return false;
    }

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();

      const restaurantName =
        order.restaurant?.restaurantName?.toLowerCase() || "";

      const itemsMatch = order.items?.some((item) =>
        item.food?.itemName?.toLowerCase().includes(search),
      );

      return restaurantName.includes(search) || itemsMatch;
    }

    return true;
  });

  // ---------------- LOADING ----------------

  if (orderLoading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded-lg mb-2" />
            <div className="h-4 w-32 bg-gray-200 rounded-lg mb-8" />

            <div className="flex gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-10 w-24 bg-gray-200 rounded-full" />
              ))}
            </div>

            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm mb-4">
                <div className="flex justify-between">
                  <div className="h-6 w-32 bg-gray-200 rounded" />
                  <div className="h-6 w-24 bg-gray-200 rounded-full" />
                </div>

                <div className="mt-4 space-y-3">
                  <div className="h-4 w-48 bg-gray-200 rounded" />
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // ---------------- ERROR ----------------

  if (orderError) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">😕</div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Couldn't load orders
          </h2>

          <p className="text-gray-500 mb-6">{orderError}</p>

          <button
            onClick={handleFetchMyOrders}
            className="px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}

      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>

            <span className="text-sm text-gray-500">
              {orders.length} orders
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Title */}

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Package className="w-8 h-8 text-orange-500" />
            My Orders
          </h1>

          <p className="text-gray-500 mt-1">Track all your food orders</p>
        </div>

        {/* Search */}

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search restaurant or food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 text-gray-800"
            />
          </div>
        </div>

        {/* Filters */}

        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />

          {STATUS_FILTERS.map((status) => (
            <button
              key={status}
              onClick={() => setActiveFilter(status)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                activeFilter === status
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {status === "all" ? "All Orders" : status.replaceAll("_", " ")}
            </button>
          ))}
        </div>

        {/* No Orders */}

        {!orders.length && (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
            <ShoppingBag className="w-20 h-20 text-orange-400 mx-auto mb-5" />

            <h2 className="text-2xl font-bold text-gray-800">No orders yet</h2>

            <p className="text-gray-500 mt-2">
              Start ordering your favourite food.
            </p>

            <button
              onClick={() => router.push("/")}
              className="mt-6 px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl"
            >
              Browse Restaurants
            </button>
          </div>
        )}

        {/* Filter Empty */}

        {orders.length > 0 && filteredOrders.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />

            <h3 className="text-xl font-semibold text-gray-800">
              No matching orders
            </h3>

            <button
              onClick={() => {
                setActiveFilter("all");
                setSearchTerm("");
              }}
              className="mt-4 text-orange-500 font-semibold"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Orders */}

        <AnimatePresence>
          <div className="space-y-4">
            {filteredOrders.map((order, index) => {
              const totalItems =
                order.items?.reduce(
                  (total, item) => total + item.quantity,
                  0,
                ) || 0;

              const status = getStatusConfig(order.status);

              const StatusIcon = status.icon;

              return (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md overflow-hidden"
                >
                  {/* Restaurant */}

                  <div className="p-5 pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                          <Utensils className="w-6 h-6 text-orange-500" />
                        </div>

                        <div>
                          <h3 className="font-bold text-gray-900">
                            {order.restaurant?.restaurantName || "Restaurant"}
                          </h3>

                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />

                              {new Date(order.createdAt).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                },
                              )}
                            </span>

                            <span>•</span>

                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />

                              {new Date(order.createdAt).toLocaleTimeString(
                                "en-IN",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Status */}

                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border ${status.color}`}
                      >
                        <StatusIcon className="w-4 h-4" />
                        {status.label}
                      </div>
                    </div>
                  </div>

                  {/* Items */}

                  <div className="px-5 pt-4 pb-3">
                    <div className="space-y-2">
                      {order.items?.slice(0, 3).map((item) => (
                        <div
                          key={item._id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex gap-3">
                            <span className="text-sm font-medium text-gray-500">
                              {item.quantity}×
                            </span>

                            <span className="text-sm text-gray-700">
                              {item.food?.itemName || "Food item unavailable"}
                            </span>
                          </div>

                          <span className="text-sm font-medium text-orange-500">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}

                      {order.items?.length > 3 && (
                        <p className="text-xs text-gray-400 pl-8">
                          +{order.items.length - 3} more items
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-gray-100" />

                  {/* Footer */}

                  <div className="px-5 py-4 flex flex-col sm:flex-row justify-between gap-3">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate max-w-[200px]">
                          {order.address}
                        </span>
                      </div>

                      <span className="hidden sm:block">•</span>

                      <div className="flex items-center gap-1">
                        <ShoppingBag className="w-4 h-4" />
                        {totalItems} items
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <span className="text-lg font-bold text-orange-600">
                        ₹{order.totalAmount.toFixed(2)}
                      </span>

                      <Link
                        href={`/Order/${order._id}`}
                        className="inline-flex items-center gap-1 px-4 py-2 bg-orange-50 text-orange-600 hover:bg-orange-100 font-semibold rounded-lg text-sm"
                      >
                        View Details
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Progress - Updated to include out_for_delivery */}

                  {order.status !== "delivered" &&
                    order.status !== "cancelled" && (
                      <div className="px-5 pb-5">
                        <div className="bg-gray-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="h-full bg-orange-500 rounded-full transition-all"
                            style={{
                              width:
                                order.status === "placed"
                                  ? "20%"
                                  : order.status === "accepted"
                                    ? "40%"
                                    : order.status === "preparing"
                                      ? "60%"
                                      : order.status === "out_for_delivery" // ✅ Added out_for_delivery
                                        ? "85%"
                                        : "0%",
                            }}
                          />
                        </div>

                        <div className="flex justify-between text-xs text-gray-400 mt-1.5">
                          <span>Placed</span>
                          <span>Accepted</span>
                          <span>Preparing</span>
                          <span>Out for Delivery</span>{" "}
                          {/* ✅ Added this step */}
                          <span>Delivered</span>
                        </div>
                      </div>
                    )}
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      </div>
    </main>
  );
}
