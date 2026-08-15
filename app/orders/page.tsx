"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useOrders from "@/customHooks/order/useOrders";

export default function OrdersPage() {
  const router = useRouter();
  const { orders, orderLoading, orderError, handleFetchMyOrders } = useOrders();

  useEffect(() => {
    handleFetchMyOrders();
  }, []);

  if (orderLoading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-500 mt-1">View your recent orders</p>
        </div>

        {/* ERROR */}
        {orderError && (
          <div
            className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600"
            role="alert"
          >
            {orderError}
          </div>
        )}

        {/* EMPTY STATE */}
        {!orders.length && !orderLoading && (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
            <div className="text-6xl mb-4" aria-hidden="true">
              📦
            </div>
            <h2 className="text-2xl font-bold text-gray-800">No orders yet</h2>
            <p className="text-gray-500 mt-2">Your orders will appear here.</p>
            <button
              onClick={() => router.push("/")}
              className="mt-6 px-6 py-3 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Browse Food
            </button>
          </div>
        )}

        {/* ORDERS LIST */}
        <div className="space-y-5">
          {orders.map((order) => {
            const totalItems = order.items.reduce(
              (total, item) => total + item.quantity,
              0
            );

            const statusColors = {
              delivered: "bg-green-100 text-green-700",
              cancelled: "bg-red-100 text-red-700",
              pending: "bg-yellow-100 text-yellow-700",
              confirmed: "bg-blue-100 text-blue-700",
              preparing: "bg-purple-100 text-purple-700",
              out_for_delivery: "bg-indigo-100 text-indigo-700",
            };

            const statusColor =
              statusColors[order.status as keyof typeof statusColors] ||
              "bg-gray-100 text-gray-700";

            return (
              <div
                key={order._id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow duration-200"
              >
                {/* TOP SECTION */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">
                      Order ID
                    </p>
                    <p className="font-semibold text-gray-800 font-mono text-sm">
                      #{order._id.slice(-8)}
                    </p>
                  </div> */}
                  <span
                    className={`inline-flex px-3 py-1.5 rounded-full text-sm font-semibold capitalize ${statusColor}`}
                  >
                    {order.status.replaceAll("_", " ")}
                  </span>
                </div>

                {/* RESTAURANT */}
                <div className="mt-5 pb-4 border-b border-gray-100">
                  <h2 className="font-bold text-lg text-gray-900">
                    {order.restaurant?.restaurantName || "Restaurant"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {order.restaurant?.location}
                  </p>
                </div>

                {/* ITEMS */}
                <div className="mt-4 space-y-3">
                  {order.items.map((item) => {
                    const itemTotal = item.price * item.quantity;
                    return (
                      <div
                        key={item._id}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium text-gray-800">
                            {item.food?.itemName || "Food item"}
                          </p>
                          <p className="text-sm text-gray-500">
                            ₹{item.price.toFixed(2)} × {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold text-gray-900">
                          ₹{itemTotal.toFixed(2)}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* ADDRESS */}
                <div className="mt-5 p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-400 uppercase tracking-wider">
                    Delivery Address
                  </p>
                  <p className="text-sm text-gray-700 mt-1">{order.address}</p>
                </div>

                {/* BOTTOM SECTION */}
                <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <p className="text-sm text-gray-500">
                      {totalItems} item{totalItems !== 1 ? "s" : ""}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(order.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-xl font-bold text-orange-600">
                      ₹{order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}