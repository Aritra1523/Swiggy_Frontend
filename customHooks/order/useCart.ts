"use client";

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

  const {
    cart,
    cartLoading,
    cartError,
  } = useSelector(
    (state: RootState) => state.order
  );

  
  // ADD TO CART
  

  const handleAddToCart = async (
    data: AddCartPayload
  ) => {
    try {
      const response = await dispatch(
        addToCart(data)
      ).unwrap();

      return response;
    } catch (error) {
      throw error;
    }
  };

  
  // GET CART
  

  const handleFetchCart = async () => {
    try {
      const response = await dispatch(
        fetchCart()
      ).unwrap();

      return response;
    } catch (error) {
      throw error;
    }
  };

  
  // DECREASE / REMOVE ITEM
  

  const handleDeleteCartItem = async (
    foodId: string
  ) => {
    try {
      const response = await dispatch(
        deleteCartItem(foodId)
      ).unwrap();

      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    cart,
    cartLoading,
    cartError,

    handleAddToCart,
    handleFetchCart,
    handleDeleteCartItem,
  };
};

export default useCart;