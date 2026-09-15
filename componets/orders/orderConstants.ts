// import {
//   Clock,
//   CheckCircle,
//   Utensils,
//   Bike,
//   XCircle,
// } from "lucide-react";

// export const STATUS_FILTERS = [
//   "all",
//   "placed",
//   "accepted",
//   "preparing",
//   "out_for_delivery",
//   "delivered",
//   "cancelled",
// ] as const;
// export type StatusFilter = (typeof STATUS_FILTERS)[number];

// export const statusConfig = {
//   placed: {
//     icon: Clock,
//     color: "bg-yellow-50 text-yellow-700 border-yellow-100",
//     label: "Order Placed",
//     progress: 20,
//   },
//   accepted: {
//     icon: CheckCircle,
//     color: "bg-blue-50 text-blue-700 border-blue-100",
//     label: "Accepted",
//     progress: 40,
//   },
//   preparing: {
//     icon: Utensils,
//     color: "bg-purple-50 text-purple-700 border-purple-100",
//     label: "Preparing",
//     progress: 60,
//   },
//   out_for_delivery: {
//     icon: Bike,
//     color: "bg-indigo-50 text-indigo-700 border-indigo-100",
//     label: "Out for Delivery",
//     progress: 85,
//   },
//   delivered: {
//     icon: CheckCircle,
//     color: "bg-green-50 text-green-700 border-green-100",
//     label: "Delivered",
//     progress: 100,
//   },
//   cancelled: {
//     icon: XCircle,
//     color: "bg-red-50 text-red-700 border-red-100",
//     label: "Cancelled",
//     progress: 0,
//   },
// };
import {
  Clock,
  CheckCircle,
  Utensils,
  PackageCheck,
  Bike,
  XCircle,
} from "lucide-react";

export const STATUS_FILTERS = [
  "all",
  "placed",
  "accepted",
  "preparing",
  "ready",
  "picked_up",
  "out_for_delivery",
  "delivered",
  "cancelled",
] as const;
export type StatusFilter = (typeof STATUS_FILTERS)[number];

export const statusConfig = {
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
  ready: {
    icon: PackageCheck,
    color: "bg-teal-50 text-teal-700 border-teal-100",
    label: "Ready for Pickup",
    progress: 75,
  },
  picked_up: {
    icon: Bike,
    color: "bg-cyan-50 text-cyan-700 border-cyan-100",
    label: "Picked Up",
    progress: 80,
  },
  out_for_delivery: {
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
/**
 * The customer-facing status lives in two separate backend fields:
 *   - `status`         -> owned by the restaurant  (placed -> accepted -> preparing -> ready)
 *   - `deliveryStatus` -> owned by the delivery partner (accepted -> picked_up -> out_for_delivery -> delivered)
 *
 * The delivery partner's actions only write to `deliveryStatus`, so reading `status`
 * alone makes the customer's tracker freeze at "Ready for Pickup". This picks
 * whichever of the two is further along the customer journey.
 */
const STATUS_RANK: Record<string, number> = {
  placed: 1,
  accepted: 2,
  preparing: 3,
  ready: 4,
  picked_up: 5,
  out_for_delivery: 6,
  delivered: 7,
};

export function resolveOrderStatus(order: {
  status?: string;
  deliveryStatus?: string;
}): string {
  // Cancelled always wins, regardless of how far delivery got.
  if (order.status === "cancelled") return "cancelled";

  const base = order.status ?? "placed";

  // "unassigned"/"assigned" are internal dispatch states and the delivery
  // partner's own "accepted" refers to accepting the job, not the restaurant
  // accepting the order — none of these should be shown to the customer.
  const delivery = order.deliveryStatus;
  if (!delivery || !["picked_up", "out_for_delivery", "delivered"].includes(delivery)) {
    return base;
  }

  return (STATUS_RANK[delivery] ?? 0) > (STATUS_RANK[base] ?? 0) ? delivery : base;
}