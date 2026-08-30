"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import useOrders from "@/customHooks/order/useOrders";
import { socket } from "@/lib/socket/socket";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import Swal from "sweetalert2";
import { Package, ShoppingBag, Search, ArrowLeft } from "lucide-react";
import Link from "next/link";
import OrderFilters from "./OrderFilters";
import OrderCard from "./OrderCard";
import { type StatusFilter } from "./orderConstants";


export default function OrdersPage() {
  const router = useRouter();
  const { orders, orderLoading, orderError, handleFetchMyOrders } = useOrders();
  const userId = useSelector((state: RootState) => state.auth.user?.id);
const [activeFilter, setActiveFilter] =
  useState<StatusFilter>("all");  const [searchTerm, setSearchTerm] = useState("");

  // Fetch orders on mount
  useEffect(() => {
    handleFetchMyOrders();
  }, []);

  // Socket: live order status updates
  useEffect(() => {
    socket.connect();

    const handleConnect = () => {
      console.log("Connected:", socket.id);
      if (userId) {
        socket.emit("user:join", userId);
        console.log("Joined room for user:", userId);
      }
    };

    const handleOrderStatus = (data: any) => {
      console.log("Order status update:", data);
      if (data.userId !== userId) return;

      handleFetchMyOrders();
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "info",
        title: `Order status: ${data.previousStatus} → ${data.currentStatus}`,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    };

    if (socket.connected && userId) {
      socket.emit("user:join", userId);
    }

    socket.on("connect", handleConnect);
    socket.on("order:status", handleOrderStatus);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("order:status", handleOrderStatus);
      socket.disconnect();
    };
  }, [userId, handleFetchMyOrders]);

  const filteredOrders = orders.filter((order) => {
    if (activeFilter !== "all" && order.status !== activeFilter) return false;
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      const restaurantName = order.restaurant?.restaurantName?.toLowerCase() || "";
      const itemsMatch = order.items?.some((item) =>
        item.food?.itemName?.toLowerCase().includes(search)
      );
      return restaurantName.includes(search) || itemsMatch;
    }
    return true;
  });

  // Loading State
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

  // Error State
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
            <span className="text-sm text-gray-500">{orders.length} orders</span>
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

        {/* Search & Filters */}
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

        <OrderFilters
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        {/* No Orders */}
        {!orders.length && (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
            <ShoppingBag className="w-20 h-20 text-orange-400 mx-auto mb-5" />
            <h2 className="text-2xl font-bold text-gray-800">No orders yet</h2>
            <p className="text-gray-500 mt-2">Start ordering your favourite food.</p>
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

        {/* Orders List */}
        <AnimatePresence>
          <div className="space-y-4">
            {filteredOrders.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <OrderCard order={order} />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </main>
  );
}