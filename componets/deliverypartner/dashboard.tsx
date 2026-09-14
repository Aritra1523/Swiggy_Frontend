"use client";

import { useState } from "react";
import {
  Bike,
  CheckCircle2,
  Clock,
  IndianRupee,
  MapPin,
  Package,
  Power,
  RefreshCw,
  Truck,
  Wallet,
} from "lucide-react";

import {
  useAcceptDeliveryOrder,
  useActiveDeliveryOrder,
  useDeliverDeliveryOrder,
  useOutForDeliveryOrder,
  usePickupDeliveryOrder,
  useAvailableDeliveryOrders,
} from "@/customHooks/delivery/useDeliveryOrders";

import { useDeliveryEarnings } from "@/customHooks/delivery/useDeliveryEarnings";

import axiosInstance from "@/api/baseUrl/Api";
import { endpoints } from "@/api/endpoints/Endpoints";
import DeliveryHistoryPage from "./history";

export default function DeliveryPartnerDashboard() {
  const [online, setOnline] = useState(false);

  const availableQuery = useAvailableDeliveryOrders();
  const activeQuery = useActiveDeliveryOrder();
  const earningsQuery = useDeliveryEarnings();

  const acceptMutation = useAcceptDeliveryOrder();
  const pickupMutation = usePickupDeliveryOrder();
  const outMutation = useOutForDeliveryOrder();
  const deliverMutation = useDeliverDeliveryOrder();

  const availableResponse = availableQuery.data;
  const activeResponse = activeQuery.data;
  const earningsResponse = earningsQuery.data;

  const availableOrders =
    availableResponse?.data?.orders ?? availableResponse?.data ?? [];

  const activeOrder =
    activeResponse?.data?.order ?? activeResponse?.data ?? null;

  const earnings = earningsResponse?.data ?? earningsResponse ?? {};

  const toggleOnline = async () => {
    try {
      const response = await axiosInstance.patch(
        endpoints.toggleDeliveryOnline,
      );

      setOnline(response.data?.data?.isOnline ?? !online);

      await availableQuery.refetch();
    } catch (error) {
      console.error("Failed to toggle online status", error);
    }
  };

  const refresh = () => {
    availableQuery.refetch();
    activeQuery.refetch();
    earningsQuery.refetch();
  };

  const getNextAction = () => {
    if (!activeOrder) return null;

    switch (activeOrder.deliveryStatus) {
      case "accepted":
        return {
          label: "Mark Picked Up",
          action: () => pickupMutation.mutate(activeOrder._id),
        };

      case "picked_up":
        return {
          label: "Start Delivery",
          action: () => outMutation.mutate(activeOrder._id),
        };

      case "out_for_delivery":
        return {
          label: "Mark Delivered",
          action: () => deliverMutation.mutate(activeOrder._id),
        };

      default:
        return null;
    }
  };

  const nextAction = getNextAction();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}

      <header className="sticky top-0 z-20 border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-white">
              <Bike size={24} />
            </div>

            <div>
              <h1 className="text-lg font-bold text-slate-900">
                Delivery Partner
              </h1>

              <p className="text-xs text-slate-500">Manage your deliveries</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={refresh}
              className="rounded-lg border p-2 hover:bg-slate-100"
              title="Refresh"
            >
              <RefreshCw size={18} />
            </button>

            <button
              onClick={toggleOnline}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 font-semibold transition ${
                online
                  ? "bg-green-500 text-white"
                  : "bg-slate-200 text-slate-700"
              }`}
            >
              <Power size={17} />

              {online ? "Online" : "Offline"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-6">
        {/* STATS */}

        <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard
            icon={<Wallet size={22} />}
            title="Today"
            value={`₹${earnings.today ?? 0}`}
          />

          <StatCard
            icon={<IndianRupee size={22} />}
            title="This Week"
            value={`₹${earnings.week ?? 0}`}
          />

          <StatCard
            icon={<Package size={22} />}
            title="This Month"
            value={`₹${earnings.month ?? 0}`}
          />

          <StatCard
            icon={<CheckCircle2 size={22} />}
            title="All Time"
            value={`₹${earnings.allTime ?? 0}`}
          />
        </section>

        {/* ACTIVE DELIVERY */}

        {activeOrder && (
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-500">
                  ACTIVE DELIVERY
                </p>

                <h2 className="text-xl font-bold text-slate-900">
                  Order #{activeOrder._id?.slice(-6)}
                </h2>
              </div>

              <div className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-600">
                {activeOrder.deliveryStatus?.replaceAll("_", " ")}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <InfoBox
                icon={<MapPin size={20} />}
                title="Restaurant"
                value={activeOrder.restaurant?.name ?? "Restaurant"}
              />

              <InfoBox
                icon={<Truck size={20} />}
                title="Delivery Address"
                value={activeOrder.address}
              />
            </div>

            <div className="mt-5 flex items-center justify-between border-t pt-5">
              <div>
                <p className="text-sm text-slate-500">Delivery Fee</p>

                <p className="flex items-center text-xl font-bold">
                  <IndianRupee size={18} />
                  {activeOrder.deliveryFee ?? 0}
                </p>
              </div>

              {nextAction && (
                <button
                  disabled={
                    pickupMutation.isPending ||
                    outMutation.isPending ||
                    deliverMutation.isPending
                  }
                  onClick={nextAction.action}
                  className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
                >
                  {nextAction.label}
                </button>
              )}
            </div>
          </section>
        )}

        {/* AVAILABLE ORDERS */}

        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Available Orders
              </h2>

              <p className="text-sm text-slate-500">
                Orders ready for delivery
              </p>
            </div>

            <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-600">
              {availableOrders.length} available
            </span>
          </div>

          {!online && (
            <div className="mb-4 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
              You are currently offline. Go online to receive delivery requests.
            </div>
          )}

          {availableQuery.isLoading ? (
            <Loading />
          ) : availableOrders.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {availableOrders.map((order: any) => (
                <div
                  key={order._id}
                  className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <p className="text-xs font-medium text-slate-500">
                        ORDER
                      </p>

                      <h3 className="font-bold text-slate-900">
                        #{order._id?.slice(-6)}
                      </h3>
                    </div>

                    <div className="rounded-lg bg-green-100 px-3 py-1 text-sm font-bold text-green-700">
                      ₹{order.deliveryFee ?? 0}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <InfoBox
                      icon={<Package size={18} />}
                      title="Restaurant"
                      value={order.restaurant?.name ?? "Restaurant"}
                    />

                    <InfoBox
                      icon={<MapPin size={18} />}
                      title="Deliver To"
                      value={order.address}
                    />

                    <InfoBox
                      icon={<IndianRupee size={18} />}
                      title="Order Value"
                      value={`₹${order.totalAmount ?? 0}`}
                    />
                  </div>

                  <button
                    disabled={acceptMutation.isPending || !!activeOrder}
                    onClick={() => acceptMutation.mutate(order._id)}
                    className="mt-5 w-full rounded-xl bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {acceptMutation.isPending
                      ? "Accepting..."
                      : "Accept Delivery"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
        <DeliveryHistoryPage/>
      </main>
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
        {icon}
      </div>

      <p className="text-sm text-slate-500">{title}</p>

      <p className="mt-1 text-xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function InfoBox({
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
      <div className="mt-0.5 text-orange-500">{icon}</div>

      <div className="min-w-0">
        <p className="text-xs text-slate-500">{title}</p>

        <p className="truncate text-sm font-semibold text-slate-800">{value}</p>
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div className="rounded-2xl border bg-white p-10 text-center">
      <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-orange-500" />

      <p className="text-sm text-slate-500">Loading available deliveries...</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border bg-white p-10 text-center">
      <Clock size={42} className="mx-auto mb-3 text-slate-300" />

      <h3 className="font-semibold text-slate-700">No deliveries available</h3>

      <p className="mt-1 text-sm text-slate-500">
        New delivery requests will appear here.
      </p>
    </div>
  );
}
