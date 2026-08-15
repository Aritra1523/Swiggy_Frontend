"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import useCart from "@/customHooks/order/useCart";
import useOrders from "@/customHooks/order/useOrders";

export default function CheckoutPage() {
  const router = useRouter();

  const {
    cart,
    cartLoading,
    handleDeleteCartItem,
  } = useCart();

  const {
    handlePlaceOrder,
    orderLoading,
    orderError,
  } = useOrders();

  const [address, setAddress] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);

  const items = cart?.items || [];

  // Total quantity
  const totalItems = items.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  // IMPORTANT:
  // Use cart item price, NOT food.discountPrice
  const totalAmount = items.reduce(
    (total, item) => {
      const price = Number(item.price || 0);
      const quantity = Number(item.quantity || 0);

      return total + price * quantity;
    },
    0
  );

  const handlePlaceOrderClick = async () => {
    const trimmedAddress = address.trim();

    // Address validation
    if (trimmedAddress.length < 5) {
      alert("Address must be at least 5 characters");
      return;
    }

    // Cart validation
    if (!items.length) {
      alert("Your cart is empty");
      return;
    }

    try {
      setPlacingOrder(true);

      await handlePlaceOrder({
        address: trimmedAddress,
      });

      alert("Order placed successfully!");

      router.push("/orders");
    } catch (error: any) {
      alert(
        error?.message ||
          "Failed to place order"
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (cartLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  // =========================
  // EMPTY CART
  // =========================

  if (!items.length) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-md p-10 text-center max-w-md w-full">
          <div className="text-6xl mb-4">
            🛒
          </div>

          <h1 className="text-2xl font-bold text-gray-800">
            Your cart is empty
          </h1>

          <p className="text-gray-500 mt-2">
            Add some delicious food to your cart.
          </p>

          <button
            onClick={() => router.push("/")}
            className="mt-6 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors"
          >
            Browse Food
          </button>
        </div>
      </main>
    );
  }

  // =========================
  // CHECKOUT
  // =========================

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Checkout
          </h1>

          <p className="text-gray-500 mt-1">
            {totalItems} item
            {totalItems !== 1 ? "s" : ""} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* =========================
              CART ITEMS
          ========================= */}

          <div className="lg:col-span-2 space-y-4">

            {items.map((item) => {
              const food = item.food;

              if (!food) return null;

              // IMPORTANT:
              // Price comes from cart item
              const price = Number(item.price || 0);

              const quantity = Number(
                item.quantity || 0
              );

              const itemTotal =
                price * quantity;

              const originalPrice =
                Number(food.basePrice || 0);

              const hasDiscount =
                originalPrice > price;

              return (
                <div
                  key={item._id || food._id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">

                    {/* IMAGE */}

                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">

                      {food.image ? (
                        <Image
                          src={food.image}
                          alt={food.itemName}
                          width={112}
                          height={112}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                          🍽️ No Image
                        </div>
                      )}

                    </div>

                    {/* DETAILS */}

                    <div className="flex-1">

                      <div className="flex justify-between gap-3">

                        <div>
                          <h2 className="font-bold text-lg text-gray-900">
                            {food.itemName}
                          </h2>

                          <p className="text-sm text-gray-500 mt-1">
                            {food.restaurant?.restaurantName}
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            {food.restaurant?.location}
                          </p>
                        </div>

                        {/* REMOVE */}

                        <button
                          onClick={() =>
                            handleDeleteCartItem(
                              food._id
                            )
                          }
                          className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                        >
                          Remove
                        </button>

                      </div>

                      {/* PRICE */}

                      <div className="mt-3 flex items-center justify-between">

                        <div className="flex items-center gap-2">

                          <span className="font-bold text-lg text-orange-600">
                            ₹{price}
                          </span>

                          {hasDiscount && (
                            <span className="text-sm text-gray-400 line-through">
                              ₹{originalPrice}
                            </span>
                          )}

                        </div>

                        {/* QUANTITY */}

                        <div className="flex items-center gap-3">

                          <span className="text-sm text-gray-500">
                            Qty:
                          </span>

                          <span className="font-bold bg-orange-50 text-orange-600 px-3 py-1 rounded-lg">
                            {quantity}
                          </span>

                        </div>

                      </div>

                      {/* ITEM TOTAL */}

                      <div className="mt-3 text-right">

                        <span className="font-bold text-gray-900">
                          ₹{itemTotal}
                        </span>

                      </div>

                    </div>

                  </div>
                </div>
              );
            })}

          </div>

          {/* =========================
              ORDER SUMMARY
          ========================= */}

          <div className="lg:col-span-1">

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">

              <h2 className="text-xl font-bold text-gray-900 mb-5">
                Order Summary
              </h2>

              {/* ITEMS */}

              <div className="flex justify-between text-gray-600 mb-3">
                <span>
                  Items
                </span>

                <span>
                  {totalItems}
                </span>
              </div>

              {/* SUBTOTAL */}

              <div className="flex justify-between text-gray-600 mb-3">
                <span>
                  Subtotal
                </span>

                <span>
                  ₹{totalAmount}
                </span>
              </div>

              {/* DELIVERY */}

              <div className="flex justify-between text-gray-600 mb-4">
                <span>
                  Delivery Fee
                </span>

                <span className="text-green-600">
                  Free
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4">

                <div className="flex justify-between text-lg font-bold text-gray-900">

                  <span>
                    Total
                  </span>

                  <span>
                    ₹{totalAmount}
                  </span>

                </div>

              </div>

              {/* ADDRESS */}

              <div className="mt-6">

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Delivery Address
                </label>

                <textarea
                  value={address}
                  onChange={(e) =>
                    setAddress(e.target.value)
                  }
                  placeholder="Enter your delivery address"
                  rows={4}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 resize-none transition-all"
                />

                <p className="text-xs text-gray-400 mt-1">
                  Minimum 5 characters
                </p>

              </div>

              {/* API ERROR */}

              {orderError && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                  {orderError}
                </div>
              )}

              {/* PLACE ORDER */}

              <button
                onClick={handlePlaceOrderClick}
                disabled={
                  placingOrder ||
                  orderLoading ||
                  address.trim().length < 5
                }
                className="w-full mt-6 py-3.5 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors"
              >
                {placingOrder ||
                orderLoading ? (
                  <span className="flex items-center justify-center gap-2">

                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />

                    Placing Order...

                  </span>
                ) : (
                  `Place Order • ₹${totalAmount}`
                )}
              </button>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}