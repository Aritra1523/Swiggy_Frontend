"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useCart from "@/customHooks/order/useCart";
import useOrders from "@/customHooks/order/useOrders";

import { OrderSummary } from "./OrderSummary";
import { LoadingSpinner } from "./LoadingSpinner";
import { EmptyCart } from "./EmptyCart";
import { CartList } from "./CartList";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartLoading, handleDeleteCartItem } = useCart();
  const { handlePlaceOrder, orderLoading, orderError } = useOrders();
  const [address, setAddress] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);

  const items = cart?.items || [];
  const totalItems = items.reduce((total, item) => total + Number(item.quantity || 0), 0);
  const totalAmount = items.reduce((total, item) => total + Number(item.price || 0) * Number(item.quantity || 0), 0);

  const handlePlaceOrderClick = async () => {
    const trimmedAddress = address.trim();
    if (trimmedAddress.length < 5) {
      alert("Address must be at least 5 characters");
      return;
    }
    if (!items.length) {
      alert("Your cart is empty");
      return;
    }

    try {
      setPlacingOrder(true);
      await handlePlaceOrder({ address: trimmedAddress });
      // Toast notification would go here
      router.push("/Order");
    } catch (error) {
      alert(error?.message || "Failed to place order");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (cartLoading) return <LoadingSpinner />;
  if (!items.length) return <EmptyCart />;

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-500 mt-1">
            {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CartList items={items} onRemoveItem={handleDeleteCartItem} />
          <OrderSummary
            totalItems={totalItems}
            totalAmount={totalAmount}
            address={address}
            setAddress={setAddress}
            orderError={orderError}
            placingOrder={placingOrder}
            orderLoading={orderLoading}
            onPlaceOrder={handlePlaceOrderClick}
          />
        </div>
      </div>
    </main>
  );
}
