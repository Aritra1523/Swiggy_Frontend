import {
  ShoppingBag,
  Clock,
  CheckCircle,
  Truck,
  Package,
  XCircle,
  PackageCheck,
  LucideIcon,
} from "lucide-react";

// Add "confirmed" to the OrderStatus type
export type OrderStatus = 
  | "placed"
  | "accepted"
  | "confirmed"
  | "preparing"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export type FilterValue = "all" | OrderStatus;

export interface Filter {
  value: FilterValue;
  label: string;
  icon: LucideIcon;
  color: ColorKey;
}

export type ColorKey = 
  | "slate"
  | "blue"
  | "emerald"
  | "amber"
  | "purple"
  | "green"
  | "rose";

export interface ColorConfig {
  bg: string;
  hoverBg: string;
  activeBg: string;
  text: string;
  activeText: string;
  border: string;
  activeBorder: string;
  iconBg: string;
  activeIconBg: string;
  badgeBg: string;
  badgeText: string;
  hoverText: string;
}

// Update FILTERS to include "confirmed"
export const FILTERS: Filter[] = [
  { value: "all", label: "All", icon: ShoppingBag, color: "slate" },
  { value: "placed", label: "Placed", icon: Clock, color: "blue" },
  { value: "confirmed", label: "Confirmed", icon: CheckCircle, color: "emerald" },
  { value: "accepted", label: "Accepted", icon: CheckCircle, color: "emerald" },
  { value: "preparing", label: "Preparing", icon: Package, color: "amber" },
  { value: "out_for_delivery", label: "Out for Delivery", icon: Truck, color: "purple" },
  { value: "delivered", label: "Delivered", icon: PackageCheck, color: "green" },
  { value: "cancelled", label: "Cancelled", icon: XCircle, color: "rose" },
];

export const colorConfig: Record<ColorKey, ColorConfig> = {
  slate: {
    bg: "bg-slate-50",
    hoverBg: "hover:bg-slate-100",
    activeBg: "bg-slate-700",
    text: "text-slate-700",
    activeText: "text-white",
    border: "border-slate-200",
    activeBorder: "border-slate-700",
    iconBg: "bg-slate-100",
    activeIconBg: "bg-slate-600",
    badgeBg: "bg-slate-200",
    badgeText: "text-slate-700",
    hoverText: "hover:text-slate-900",
  },
  blue: {
    bg: "bg-blue-50",
    hoverBg: "hover:bg-blue-100",
    activeBg: "bg-blue-600",
    text: "text-blue-700",
    activeText: "text-white",
    border: "border-blue-200",
    activeBorder: "border-blue-600",
    iconBg: "bg-blue-100",
    activeIconBg: "bg-blue-500",
    badgeBg: "bg-blue-200",
    badgeText: "text-blue-700",
    hoverText: "hover:text-blue-900",
  },
  emerald: {
    bg: "bg-emerald-50",
    hoverBg: "hover:bg-emerald-100",
    activeBg: "bg-emerald-600",
    text: "text-emerald-700",
    activeText: "text-white",
    border: "border-emerald-200",
    activeBorder: "border-emerald-600",
    iconBg: "bg-emerald-100",
    activeIconBg: "bg-emerald-500",
    badgeBg: "bg-emerald-200",
    badgeText: "text-emerald-700",
    hoverText: "hover:text-emerald-900",
  },
  amber: {
    bg: "bg-amber-50",
    hoverBg: "hover:bg-amber-100",
    activeBg: "bg-amber-600",
    text: "text-amber-700",
    activeText: "text-white",
    border: "border-amber-200",
    activeBorder: "border-amber-600",
    iconBg: "bg-amber-100",
    activeIconBg: "bg-amber-500",
    badgeBg: "bg-amber-200",
    badgeText: "text-amber-700",
    hoverText: "hover:text-amber-900",
  },
  purple: {
    bg: "bg-purple-50",
    hoverBg: "hover:bg-purple-100",
    activeBg: "bg-purple-600",
    text: "text-purple-700",
    activeText: "text-white",
    border: "border-purple-200",
    activeBorder: "border-purple-600",
    iconBg: "bg-purple-100",
    activeIconBg: "bg-purple-500",
    badgeBg: "bg-purple-200",
    badgeText: "text-purple-700",
    hoverText: "hover:text-purple-900",
  },
  green: {
    bg: "bg-green-50",
    hoverBg: "hover:bg-green-100",
    activeBg: "bg-green-600",
    text: "text-green-700",
    activeText: "text-white",
    border: "border-green-200",
    activeBorder: "border-green-600",
    iconBg: "bg-green-100",
    activeIconBg: "bg-green-500",
    badgeBg: "bg-green-200",
    badgeText: "text-green-700",
    hoverText: "hover:text-green-900",
  },
  rose: {
    bg: "bg-rose-50",
    hoverBg: "hover:bg-rose-100",
    activeBg: "bg-rose-600",
    text: "text-rose-700",
    activeText: "text-white",
    border: "border-rose-200",
    activeBorder: "border-rose-600",
    iconBg: "bg-rose-100",
    activeIconBg: "bg-rose-500",
    badgeBg: "bg-rose-200",
    badgeText: "text-rose-700",
    hoverText: "hover:text-rose-900",
  },
};