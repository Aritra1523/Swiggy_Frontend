"use client";

import { useState } from "react";
import { ClipboardList, RefreshCw, PackageSearch } from "lucide-react";

import { useOwnerOrders } from "@/customHooks/owner/useFoodManagement";
import { OrderCard } from "./OrderCard";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "placed", label: "Placed" },
  { value: "confirmed", label: "Confirmed" },
  { value: "preparing", label: "Preparing" },
  { value: "out_for_delivery", label: "Out for Delivery" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

export default function OwnerOrdersPage() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const { data, isLoading, isFetching, isError } = useOwnerOrders(page);

  const orders = data?.data ?? [];
  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-orange-500" />
          <h1 className="text-lg font-bold text-gray-900">Orders</h1>
          {isFetching && !isLoading && (
            <RefreshCw className="w-3.5 h-3.5 text-gray-400 animate-spin" />
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              filter === f.value
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 p-5 h-40 animate-pulse"
            />
          ))}
        </div>
      ) : isError ? (
        <div className="bg-white rounded-2xl border border-red-100 p-10 text-center text-sm text-red-600">
          Failed to load orders.
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-3xl border-2 border-dashed border-gray-300 p-16 text-center">
          <PackageSearch className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No orders here</h3>
          <p className="text-gray-500 text-sm">
            {filter === "all" ? "No orders yet." : `No ${filter.replace("_", " ")} orders.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredOrders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}

      {data?.pagination && data.pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1 || isFetching}
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-sm text-gray-500">
            Page {data.pagination.currentPage} of {data.pagination.totalPages}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= data.pagination.totalPages || isFetching}
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}