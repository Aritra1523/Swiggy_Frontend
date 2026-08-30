import {
  Clock,
  CheckCircle,
  Utensils,
  Bike,
  XCircle,
} from "lucide-react";

export const STATUS_FILTERS = [
  "all",
  "placed",
  "accepted",
  "preparing",
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