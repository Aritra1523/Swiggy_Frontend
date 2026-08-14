// "use client";

// import { useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import { AppDispatch, RootState } from "@/redux/store/store";

// import {
//   addToCart,
//   fetchCart,
//   deleteCartItem,
// } from "@/redux/slice/order/order";

// import { AddCartPayload } from "@/typescript/order/order";

// const useCart = () => {
//   const dispatch = useDispatch<AppDispatch>();

//   const { cart, cartLoading, cartError } = useSelector(
//     (state: RootState) => state.order,
//   );

//   // ADD TO CART
//   const handleAddToCart = async (data: AddCartPayload) => {
//     return await dispatch(addToCart(data)).unwrap();
//   };

//   // FETCH CART
//   const handleFetchCart = useCallback(async () => {
//     return await dispatch(fetchCart()).unwrap();
//   }, [dispatch]);
//   const handleUpdateQuantity = async (foodId: string, newQuantity: number) => {
//     if (newQuantity < 1) {
//       await deleteCartItem(foodId);
//       return;
//     }
//   };
//   // DECREASE / REMOVE ITEM
//   const handleDeleteCartItem = async (foodId: string) => {
//     return await dispatch(deleteCartItem(foodId)).unwrap();
//   };

//   return {
//     cart,
//     cartLoading,
//     cartError,

//     handleAddToCart,
//     handleFetchCart,
//     handleDeleteCartItem,
//     handleUpdateQuantity,
//   };
// };

// export default useCart;


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

  // ADD TO CART
  const handleAddToCart = async (data: AddCartPayload) => {
    const result = await dispatch(addToCart(data)).unwrap();
    await dispatch(fetchCart()).unwrap();
    return result;
  };

  // FETCH CART
  const handleFetchCart = useCallback(async () => {
    return await dispatch(fetchCart()).unwrap();
  }, [dispatch]);

  // DECREASE / REMOVE ITEM
  const handleDeleteCartItem = useCallback(
    async (foodId: string) => {
      const result = await dispatch(deleteCartItem(foodId)).unwrap();
      await dispatch(fetchCart()).unwrap();
      return result;
    },
    [dispatch],
  );

  // UPDATE QUANTITY
  const handleUpdateQuantity = useCallback(
    async (foodId: string, newQuantity: number, currentQuantity: number) => {
      if (newQuantity < 1) {
        await handleDeleteCartItem(foodId);
        return;
      }

      if (newQuantity > currentQuantity) {
        // Increasing: addToCart is additive, so only send the delta (+1)
        await dispatch(
          addToCart({ foodId, quantity: 1 } as AddCartPayload),
        ).unwrap();
        await dispatch(fetchCart()).unwrap();
      } else {
        // Decreasing (but not to 0): no dedicated endpoint wired up yet — see note below
        console.warn(
          "Decrement without removal has no backend endpoint wired up",
        );
      }
    },
    [dispatch, handleDeleteCartItem],
  );

  return {
    cart,
    cartLoading,
    cartError,

    handleAddToCart,
    handleFetchCart,
    handleDeleteCartItem,
    handleUpdateQuantity,
  };
};

export default useCart;