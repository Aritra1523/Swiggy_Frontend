import Link from "next/link";
import { Clock, MapPin, Package, ShoppingBag, ChevronRight } from "lucide-react";
import OrderStatusBadge from "./OrderStatusBadge";
import { Order } from "@/typescript/order/order";
interface OrderCardProps {
  order: Order;
}
export default function OrderCard({ order }: OrderCardProps) {
  const totalItems = order.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md overflow-hidden">
      {/* Restaurant Info */}
      <div className="p-5 pb-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
              <Package className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">
                {order.restaurant?.restaurantName || "Restaurant"}
              </h3>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(order.createdAt).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>
      </div>

      {/* Items */}
      <div className="px-5 pt-4 pb-3">
        <div className="space-y-2">
          {order.items?.slice(0, 3).map((item) => (
            <div key={item._id} className="flex items-center justify-between">
              <div className="flex gap-3">
                <span className="text-sm font-medium text-gray-500">
                  {item.quantity}×
                </span>
                <span className="text-sm text-gray-700">
                  {item.food?.itemName || "Food item unavailable"}
                </span>
              </div>
              <span className="text-sm font-medium text-orange-500">
₹{((item.price ?? 0) * item.quantity).toFixed(2)}              </span>
            </div>
          ))}
          {order.items?.length > 3 && (
            <p className="text-xs text-gray-400 pl-8">
              +{order.items.length - 3} more items
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-gray-100" />

      {/* Footer */}
      <div className="px-5 py-4 flex flex-col sm:flex-row justify-between gap-3">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span className="truncate max-w-[200px]">{order.address}</span>
          </div>
          <span className="hidden sm:block">•</span>
          <div className="flex items-center gap-1">
            <ShoppingBag className="w-4 h-4" />
            {totalItems} items
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-lg font-bold text-orange-600">
            ₹{order.totalAmount.toFixed(2)}
          </span>
          <Link
            href={`/Order/${order._id}`}
            className="inline-flex items-center gap-1 px-4 py-2 bg-orange-50 text-orange-600 hover:bg-orange-100 font-semibold rounded-lg text-sm"
          >
            View Details
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Progress Bar */}
      {order.status !== "delivered" && order.status !== "cancelled" && (
        <div className="px-5 pb-5">
          <div className="bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full bg-orange-500 rounded-full transition-all"
              style={{
                width:
                  order.status === "placed"
                    ? "20%"
                    : order.status === "accepted"
                    ? "40%"
                    : order.status === "preparing"
                    ? "60%"
                    : order.status === "out_for_delivery"
                    ? "85%"
                    : "0%",
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1.5">
            <span>Placed</span>
            <span>Accepted</span>
            <span>Preparing</span>
            <span>Out for Delivery</span>
            <span>Delivered</span>
          </div>
        </div>
      )}
    </div>
  );
}