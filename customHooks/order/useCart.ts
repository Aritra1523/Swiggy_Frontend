"use client";

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/redux/store/store";

import {
  addToCart,
  fetchCart,
  deleteCartItem,
} from "@/redux/slice/order/order";

import { AddCartPayload } from "@/typescript/order/order";

const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { cart, cartLoading, cartError } = useSelector(
    (state: RootState) => state.order,
  );

  // ADD TO CART (additive: +1, or whatever quantity is passed)
  const handleAddToCart = useCallback(
    async (data: AddCartPayload) => {
      const result = await dispatch(addToCart(data)).unwrap();
      await dispatch(fetchCart()).unwrap(); // repopulate food/restaurant
      return result;
    },
    [dispatch],
  );

  // FETCH CART
  const handleFetchCart = useCallback(async () => {
    return await dispatch(fetchCart()).unwrap();
  }, [dispatch]);

  // DECREMENT BY 1 (removes the line once it hits 0) — matches backend exactly
  const handleDecrementCartItem = useCallback(
    async (foodId: string) => {
      const result = await dispatch(deleteCartItem(foodId)).unwrap();
      await dispatch(fetchCart()).unwrap();
      return result;
    },
    [dispatch],
  );

  // "+": always send a delta of 1, backend is additive
  const handleIncrementCartItem = useCallback(
    async (foodId: string) => {
      await dispatch(
        addToCart({ foodId, quantity: 1 } as AddCartPayload),
      ).unwrap();
      await dispatch(fetchCart()).unwrap();
    },
    [dispatch],
  );

  return {
    cart,
    cartLoading,
    cartError,

    handleAddToCart,
    handleFetchCart,
    handleDecrementCartItem,
    handleIncrementCartItem,
  };
};

export default useCart;