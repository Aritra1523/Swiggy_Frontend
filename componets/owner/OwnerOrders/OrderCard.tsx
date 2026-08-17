"use client";

import { useUpdateOrderStatus } from "@/customHooks/owner/useFoodManagement";
import { OwnerOrder } from "@/typescript/restaurantOwner/restaurantOwner";
import {
  CheckCircle2,
  Clock,
  Utensils,
  Bike,
  XCircle,
  PackageCheck,
  IndianRupee,
} from "lucide-react";

// Define the status types
type OrderStatus = 
  | 'placed' 
  | 'confirmed' 
  | 'preparing' 
  | 'out_for_delivery' 
  | 'delivered' 
  | 'cancelled';

// Define the flow of status transitions
const ORDER_STATUS_FLOW: Partial<Record<OrderStatus, OrderStatus>> = {
  placed: "confirmed",
  confirmed: "preparing",
  preparing: "out_for_delivery",
  out_for_delivery: "delivered",
};

// Define valid transitions for cancellation
const VALID_CANCELLATION_STATUSES: OrderStatus[] = [
  'placed', 
  'confirmed', 
  'preparing'
];

// Check if a status can be cancelled
const isValidTransition = (currentStatus: OrderStatus, targetStatus: OrderStatus): boolean => {
  if (targetStatus === 'cancelled') {
    return VALID_CANCELLATION_STATUSES.includes(currentStatus);
  }
  return ORDER_STATUS_FLOW[currentStatus] === targetStatus;
};

// Status configuration with proper typing
const STATUS_CONFIG: Record<OrderStatus, {
  icon: React.ElementType;
  color: string;
  label: string;
}> = {
  placed: {
    icon: Clock,
    color: "bg-yellow-50 text-yellow-700 border-yellow-200",
    label: "Placed",
  },
  confirmed: {
    icon: CheckCircle2,
    color: "bg-blue-50 text-blue-700 border-blue-200",
    label: "Confirmed",
  },
  preparing: {
    icon: Utensils,
    color: "bg-purple-50 text-purple-700 border-purple-200",
    label: "Preparing",
  },
  out_for_delivery: {
    icon: Bike,
    color: "bg-indigo-50 text-indigo-700 border-indigo-200",
    label: "Out for Delivery",
  },
  delivered: {
    icon: PackageCheck,
    color: "bg-green-50 text-green-700 border-green-200",
    label: "Delivered",
  },
  cancelled: {
    icon: XCircle,
    color: "bg-red-50 text-red-700 border-red-200",
    label: "Cancelled",
  },
};

// Next action labels
const NEXT_ACTION_LABEL: Record<Exclude<OrderStatus, 'delivered' | 'cancelled'>, string> = {
  placed: "Confirm Order",
  confirmed: "Start Preparing",
  preparing: "Mark Out for Delivery",
  out_for_delivery: "Mark Delivered",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const config = STATUS_CONFIG[status] ?? {
    icon: Clock,
    color: "bg-gray-50 text-gray-700 border-gray-200",
    label: status.replace("_", " "),
  };
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.color}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
}

export function OrderCard({ order }: { order: OwnerOrder }) {
  const { mutate: updateStatus, isPending } = useUpdateOrderStatus();

  const isFinished = order.status === "delivered" || order.status === "cancelled";
  const nextStatus = ORDER_STATUS_FLOW[order.status as OrderStatus];

  const handleAdvance = () => {
    if (!nextStatus) return;
    updateStatus({ id: order._id, status: nextStatus });
  };

  const handleCancel = () => {
    if (!isValidTransition(order.status as OrderStatus, "cancelled")) return;
    if (window.confirm("Cancel this order?")) {
      updateStatus({ id: order._id, status: "cancelled" });
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm font-semibold text-gray-900">
            #{order._id.slice(-6).toUpperCase()}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <OrderStatusBadge status={order.status as OrderStatus} />
      </div>

      <div className="space-y-1 mb-3">
        {order.items.map((item, i) => (
          <p key={i} className="text-sm text-gray-600">
            {item.quantity}× {item.food.itemName}
          </p>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="inline-flex items-center gap-1 text-sm font-bold text-gray-900">
          <IndianRupee className="w-3.5 h-3.5" />
          {order.totalAmount}
        </span>

        {!isFinished && (
          <div className="flex items-center gap-2">
            {nextStatus && (
              <button
                onClick={handleAdvance}
                disabled={isPending}
                className="px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Updating..." : NEXT_ACTION_LABEL[nextStatus]}
              </button>
            )}
            {isValidTransition(order.status as OrderStatus, "cancelled") && (
              <button
                onClick={handleCancel}
                disabled={isPending}
                className="px-3 py-1.5 text-sm font-medium text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}