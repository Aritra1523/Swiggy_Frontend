import {
  CheckCircle2,
  Clock,
  Utensils,
  Bike,
  XCircle,
  PackageCheck,
} from "lucide-react";

export type OrderStatus =
  | "placed"
  | "accepted"
  | "preparing"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

// Status flow for normal progression
export const ORDER_STATUS_FLOW: Partial<Record<OrderStatus, OrderStatus>> = {
  placed: "accepted",
  accepted: "preparing",
  preparing: "out_for_delivery",
  out_for_delivery: "delivered",
};

// Statuses where cancellation is allowed
export const VALID_CANCELLATION_STATUSES: OrderStatus[] = [
  "placed",
  "accepted",
  "preparing",
];

// Check if status transition is valid
export const isValidTransition = (
  currentStatus: OrderStatus,
  targetStatus: OrderStatus,
): boolean => {
  if (targetStatus === "cancelled") {
    return VALID_CANCELLATION_STATUSES.includes(currentStatus);
  }
  return ORDER_STATUS_FLOW[currentStatus] === targetStatus;
};

// Status configuration
export const STATUS_CONFIG: Record<
  OrderStatus,
  {
    icon: React.ElementType;
    color: string;
    label: string;
  }
> = {
  placed: {
    icon: Clock,
    color: "bg-yellow-50 text-yellow-700 border-yellow-200",
    label: "Placed",
  },
  accepted: {
    icon: CheckCircle2,
    color: "bg-blue-50 text-blue-700 border-blue-200",
    label: "Accepted",
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

// Labels for next action buttons
export const NEXT_ACTION_LABEL: Record<
  Exclude<OrderStatus, "delivered" | "cancelled">,
  string
> = {
  placed: "Accept Order",
  accepted: "Start Preparing",
  preparing: "Mark Out for Delivery",
  out_for_delivery: "Mark Delivered",
};