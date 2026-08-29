import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useCart from "@/customHooks/order/useCart";
import useOrders from "@/customHooks/order/useOrders";
import { CheckoutData } from "@/typescript/cartTypes/cartTypes";

export const useCartPage = () => {
  const router = useRouter();
  const {
    cart,
    cartLoading,
    cartError,
    handleFetchCart,
    handleDecrementCartItem,
    handleIncrementCartItem,
  } = useCart();
  const { handlePlaceOrder, orderLoading, orderError } = useOrders();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);

  useEffect(() => {
    handleFetchCart().finally(() => setHasLoadedOnce(true));
  }, [handleFetchCart]);

  const onIncrement = async (foodId: string) => {
    setUpdatingItemId(foodId);
    await handleIncrementCartItem(foodId);
    setUpdatingItemId(null);
  };

  const onDecrement = async (foodId: string) => {
    setUpdatingItemId(foodId);
    await handleDecrementCartItem(foodId);
    setUpdatingItemId(null);
  };

  const handleCheckout = (items: any[], grandTotal: number, totalItems: number, groupedByRestaurant: any) => {
    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setIsCheckingOut(true);

    const checkoutData: CheckoutData = {
      items,
      totalAmount: grandTotal,
      totalItems,
      restaurant: Object.values(groupedByRestaurant)[0]?.restaurant,
      timestamp: Date.now(),
    };
    
    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));

    setTimeout(() => {
      router.push("/check");
    }, 600);
  };

  return {
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
    orderLoading,
    orderError,
  };
};