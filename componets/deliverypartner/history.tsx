"use client";

import {
  CheckCircle2,
  IndianRupee,
  MapPin,
  Package,
  RefreshCw,
} from "lucide-react";

import { useDeliveryHistory } from "@/customHooks/delivery/useDeliveryOrders";

export default function DeliveryHistoryPage() {
  const { data, isLoading, isError, refetch } =
    useDeliveryHistory();

  const orders = data?.data?.orders ?? data?.data ?? [];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 md:px-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Delivery History
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              View your completed deliveries
            </p>
          </div>

          <button
            onClick={() => refetch()}
            className="rounded-xl border bg-white p-2.5 text-slate-600 hover:bg-slate-100"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 md:px-6">
        {isLoading && (
          <div className="rounded-2xl border bg-white p-10 text-center">
            <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-orange-500" />

            <p className="text-sm text-slate-500">
              Loading delivery history...
            </p>
          </div>
        )}

        {isError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="font-semibold text-red-600">
              Failed to load delivery history
            </p>

            <button
              onClick={() => refetch()}
              className="mt-3 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white"
            >
              Try Again
            </button>
          </div>
        )}

        {!isLoading && !isError && orders.length === 0 && (
          <div className="rounded-2xl border bg-white p-12 text-center">
            <Package
              size={48}
              className="mx-auto mb-4 text-slate-300"
            />

            <h2 className="text-lg font-bold text-slate-700">
              No deliveries yet
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your completed deliveries will appear here.
            </p>
          </div>
        )}

        {!isLoading && !isError && orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order: any) => (
              <DeliveryHistoryCard
                key={order._id}
                order={order}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function DeliveryHistoryCard({
  order,
}: {
  order: any;
}) {
  const date = order.deliveredAt
    ? new Date(order.deliveredAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

  const time = order.deliveredAt
    ? new Date(order.deliveredAt).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      {/* TOP */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Package size={19} className="text-orange-500" />

            <h2 className="font-bold text-slate-900">
              Order #{order._id?.slice(-6)}
            </h2>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            {date} {time && `• ${time}`}
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-sm font-semibold text-green-700">
          <CheckCircle2 size={16} />
          Delivered
        </div>
      </div>

      {/* DETAILS */}
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <Info
          icon={<MapPin size={18} />}
          title="Restaurant"
          value={order.restaurant?.name ?? "Restaurant"}
        />

        <Info
          icon={<MapPin size={18} />}
          title="Delivered To"
          value={order.address ?? "Address unavailable"}
        />

        <Info
          icon={<IndianRupee size={18} />}
          title="Order Value"
          value={`₹${order.totalAmount ?? 0}`}
        />
      </div>

      {/* BOTTOM */}
      <div className="mt-5 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-slate-500">
            Delivery Earnings
          </p>

          <p className="text-lg font-bold text-green-600">
            ₹{order.deliveryFee ?? 0}
          </p>
        </div>

        <div className="text-sm text-slate-500">
          {order.items?.length ?? 0} item
          {(order.items?.length ?? 0) !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
}

function Info({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 rounded-xl bg-slate-50 p-3">
      <div className="text-orange-500">{icon}</div>

      <div className="min-w-0">
        <p className="text-xs text-slate-500">
          {title}
        </p>

        <p className="truncate text-sm font-semibold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}