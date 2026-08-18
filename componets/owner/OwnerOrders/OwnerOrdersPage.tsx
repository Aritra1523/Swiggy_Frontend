"use client";

import { useState } from "react";
import {
  ClipboardList,
  RefreshCw,
  PackageSearch,
} from "lucide-react";

import { useOwnerOrders } from "@/customHooks/owner/useFoodManagement";
import { OrderCard } from "./OrderCard";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "placed", label: "Placed" },
  { value: "accepted", label: "Accepted" },
  { value: "preparing", label: "Preparing" },
  { value: "out_for_delivery", label: "Out for Delivery" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

export default function OwnerOrdersPage() {
  const [filter, setFilter] = useState("all");

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useOwnerOrders();

  const orders = data?.data ?? [];

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <ClipboardList className="w-6 h-6 text-orange-500" />

              <h1 className="text-2xl font-bold text-gray-900">
                Orders
              </h1>

              {isFetching && !isLoading && (
                <RefreshCw className="w-4 h-4 text-gray-400 animate-spin" />
              )}
            </div>

            <p className="text-sm text-gray-500 mt-1">
              Manage orders received by your restaurant
            </p>
          </div>

          {/* TOTAL ORDERS */}
          <div className="bg-white border border-gray-100 rounded-xl px-5 py-3 shadow-sm">
            <p className="text-xs text-gray-500">
              Total Orders
            </p>

            <p className="text-xl font-bold text-gray-900">
              {data?.totalOrders ?? 0}
            </p>
          </div>
        </div>

        {/* FILTERS */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filterItem) => {
              const active = filter === filterItem.value;

              return (
                <button
                  key={filterItem.value}
                  onClick={() => setFilter(filterItem.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                    active
                      ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {filterItem.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* LOADING */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse"
              >
                <div className="flex justify-between">
                  <div>
                    <div className="h-5 w-32 bg-gray-200 rounded" />
                    <div className="h-3 w-24 bg-gray-200 rounded mt-2" />
                  </div>

                  <div className="h-7 w-24 bg-gray-200 rounded-full" />
                </div>

                <div className="mt-5 space-y-3">
                  <div className="h-4 w-full bg-gray-200 rounded" />
                  <div className="h-4 w-3/4 bg-gray-200 rounded" />
                  <div className="h-4 w-1/2 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ERROR */}
        {!isLoading && isError && (
          <div className="bg-white rounded-2xl border border-red-100 p-10 text-center">
            <div className="text-4xl mb-3">
              😕
            </div>

            <h3 className="text-lg font-semibold text-gray-900">
              Failed to load orders
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Something went wrong while fetching restaurant orders.
            </p>

            <button
              onClick={() => refetch()}
              className="mt-5 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold"
            >
              Try Again
            </button>
          </div>
        )}

        {/* EMPTY */}
        {!isLoading &&
          !isError &&
          filteredOrders.length === 0 && (
            <div className="bg-white rounded-3xl border-2 border-dashed border-gray-200 p-16 text-center">
              <PackageSearch className="w-12 h-12 text-gray-300 mx-auto mb-4" />

              <h3 className="text-xl font-semibold text-gray-900">
                No orders found
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                {filter === "all"
                  ? "Your restaurant has not received any orders yet."
                  : `There are no ${filter.replaceAll(
                      "_",
                      " "
                    )} orders.`}
              </p>

              {filter !== "all" && (
                <button
                  onClick={() => setFilter("all")}
                  className="mt-5 px-5 py-2.5 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600"
                >
                  View All Orders
                </button>
              )}
            </div>
          )}

        {/* ORDERS */}
        {!isLoading &&
          !isError &&
          filteredOrders.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {filteredOrders.map((order) => (
                <OrderCard
                  key={order._id}
                  order={order}
                />
              ))}
            </div>
          )}
      </div>
    </main>
  );
}