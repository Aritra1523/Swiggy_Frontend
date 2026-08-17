"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useOrders from "@/customHooks/order/useOrders";

const CANCELLABLE_STATUSES = ["placed", "confirmed"];

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const {
    selectedOrder,
    orderLoading,
    orderError,
    handleFetchOrderDetails,
    handleCancelOrder,
  } = useOrders();

  const [fetching, setFetching] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [confirmingCancel, setConfirmingCancel] = useState(false);

  const orderId = params.id as string;

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        setFetching(true);
        await handleFetchOrderDetails(orderId);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const cancelThisOrder = async () => {
    if (!selectedOrder) return;
    setCancelling(true);
    try {
      await handleCancelOrder(selectedOrder._id);
      setConfirmingCancel(false);
    } catch (error) {
      // orderError already reflects this
    } finally {
      setCancelling(false);
    }
  };

  // Loading
  if (fetching || orderLoading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mx-auto" />

          <p className="mt-4 text-gray-500">Loading order...</p>
        </div>
      </main>
    );
  }

  // Error
  if (orderError) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center max-w-md w-full">
          <div className="text-5xl mb-4">⚠️</div>

          <h1 className="text-2xl font-bold text-gray-800">
            Unable to load order
          </h1>

          <p className="text-red-500 mt-2">{orderError}</p>

          <button
            onClick={() => router.back()}
            className="mt-6 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl"
          >
            Go Back
          </button>
        </div>
      </main>
    );
  }

  // No order
  if (!selectedOrder) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center max-w-md w-full">
          <div className="text-5xl mb-4">📦</div>

          <h1 className="text-2xl font-bold text-gray-800">Order not found</h1>

          <button
            onClick={() => router.push("/Order")}
            className="mt-6 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl"
          >
            My Orders
          </button>
        </div>
      </main>
    );
  }

  const totalItems =
    selectedOrder.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  const statusColors: Record<string, string> = {
    placed: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    preparing: "bg-purple-100 text-purple-700",
    out_for_delivery: "bg-indigo-100 text-indigo-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  const statusColor =
    statusColors[selectedOrder.status] || "bg-gray-100 text-gray-700";

  const canCancel = CANCELLABLE_STATUSES.includes(selectedOrder.status);

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.push("/Order")}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-orange-500 font-medium transition-colors"
        >
          <span className="text-xl">←</span>
          Back to My Orders
        </button>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-400">Order ID</p>

              <h1 className="font-bold text-xl text-gray-900 font-mono">
                #{selectedOrder._id.slice(-8)}
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                {new Date(selectedOrder.createdAt).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>

            <span
              className={`inline-flex w-fit px-4 py-2 rounded-full text-sm font-semibold capitalize ${statusColor}`}
            >
              {selectedOrder.status.replaceAll("_", " ")}
            </span>
          </div>
        </div>

        {/* Restaurant */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-5">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Restaurant</h2>

          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center text-2xl">
              🍽️
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-900">
                {selectedOrder.restaurant?.restaurantName || "Restaurant"}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {selectedOrder.restaurant?.location || "Location not available"}
              </p>
            </div>
          </div>
        </div>

        {/* Ordered Items */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-5">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-bold text-gray-900">Ordered Items</h2>

            <span className="text-sm text-gray-500">
              {totalItems} item
              {totalItems !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="space-y-4">
            {selectedOrder.items?.map((item) => {
              const itemTotal = item.price * item.quantity;

              return (
                <div
                  key={item._id}
                  className="flex justify-between items-center gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">
                      {item.food?.itemName || "Food item"}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      ₹{item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>

                  <p className="font-bold text-gray-900">
                    ₹{itemTotal.toFixed(2)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-5">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Delivery Address
          </h2>

          <div className="flex gap-3">
            <div className="text-xl">📍</div>

            <div>
              <p className="text-gray-700">{selectedOrder.address}</p>
            </div>
          </div>
        </div>

        {/* Payment / Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-5">
          <h2 className="text-lg font-bold text-gray-900 mb-5">
            Order Summary
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{selectedOrder.totalAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span className="text-green-600">Free</span>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>

                <span className="text-2xl font-bold text-orange-600">
                  ₹{selectedOrder.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Cancel confirmation */}
        {confirmingCancel && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mt-5">
            <p className="font-semibold text-red-800">Cancel this order?</p>
            <p className="text-sm text-red-600 mt-1">
              This can&apos;t be undone.
            </p>
            <div className="flex gap-3 mt-4">
              <button
                onClick={cancelThisOrder}
                disabled={cancelling}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
              >
                {cancelling ? "Cancelling..." : "Yes, cancel it"}
              </button>
              <button
                onClick={() => setConfirmingCancel(false)}
                disabled={cancelling}
                className="px-5 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-white transition-colors disabled:opacity-50"
              >
                Keep order
              </button>
            </div>
          </div>
        )}

        {/* Bottom Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
          {canCancel && !confirmingCancel && (
            <button
              onClick={() => setConfirmingCancel(true)}
              className="px-6 py-3 border border-red-300 text-red-600 hover:bg-red-50 font-semibold rounded-xl transition-colors"
            >
              Cancel Order
            </button>
          )}

          <button
            onClick={() => router.push("/Order")}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors"
          >
            View All Orders
          </button>
        </div>
      </div>
    </main>
  );
}
