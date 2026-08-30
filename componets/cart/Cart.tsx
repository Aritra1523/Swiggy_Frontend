"use client";

import { useCartPage } from "@/customHooks/cart/useCartPage";
import { CartSkeleton } from "./CartSkeleton";
import { CartError } from "./CartError";
import { CartEmpty } from "./CartEmpty";
import { calculateTotals, groupByRestaurant } from "./cartUtils";
import { CartHeader } from "./CartHeader";
import { RestaurantGroup } from "./RestaurantGroup";
import { PromoCode } from "./PromoCode";
import { OrderSummary } from "./OrderSummary";



export default function CartPage() {
  const {
    cart,
    cartLoading,
    cartError,
    hasLoadedOnce,
    updatingItemId,
    isCheckingOut,
    onIncrement,
    onDecrement,
    handleCheckout,
    handleFetchCart,
  } = useCartPage();

  // Loading state
  if (cartLoading && !hasLoadedOnce) {
    return <CartSkeleton />;
  }

  // Error state
  if (cartError) {
    return (
      <CartError
        error={cartError}
        onRetry={() => handleFetchCart()}
      />
    );
  }

  const items = cart?.items || [];

  // Empty state
  if (items.length === 0) {
    return <CartEmpty />;
  }

  // Calculate totals
  const billDetails = calculateTotals(items);
  const groupedByRestaurant = groupByRestaurant(items);

  return (
    <main className="min-h-screen bg-gray-50">
      <CartHeader
        totalItems={billDetails.totalItems}
        grandTotal={billDetails.grandTotal}
      />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {Object.values(groupedByRestaurant).map((group) => (
              <RestaurantGroup
                key={group.restaurant?._id}
                group={group}
                updatingItemId={updatingItemId}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
              />
            ))}
            <PromoCode />
          </div>

          {/* Order Summary */}
          <OrderSummary
            billDetails={billDetails}
            isCheckingOut={isCheckingOut}
            itemsCount={items.length}
            onCheckout={() =>
              handleCheckout(
                items,
                billDetails.grandTotal,
                billDetails.totalItems,
                groupedByRestaurant
              )
            }
          />
        </div>
      </div>
    </main>
  );
}