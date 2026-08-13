"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  RootState,
} from "@/redux/store/store";

import {
  placeOrder,
  fetchMyOrders,
  fetchOrderDetails,
  cancelOrder,
  updateOrderStatus,
} from "@/redux/slice/order/order";

import {
  PlaceOrderPayload,
  UpdateOrderStatusPayload,
} from "@/typescript/order/order";

const useOrders = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    orders,
    selectedOrder,
    orderLoading,
    orderError,
  } = useSelector(
    (state: RootState) => state.order
  );

 
  // PLACE ORDER
 

  const handlePlaceOrder = async (
    data: PlaceOrderPayload
  ) => {
    try {
      const response = await dispatch(
        placeOrder(data)
      ).unwrap();

      return response;
    } catch (error) {
      throw error;
    }
  };

 
  // MY ORDERS
 

  const handleFetchMyOrders = async () => {
    try {
      const response = await dispatch(
        fetchMyOrders()
      ).unwrap();

      return response;
    } catch (error) {
      throw error;
    }
  };

 
  // ORDER DETAILS
 

  const handleFetchOrderDetails = async (
    id: string
  ) => {
    try {
      const response = await dispatch(
        fetchOrderDetails(id)
      ).unwrap();

      return response;
    } catch (error) {
      throw error;
    }
  };

 
  // CANCEL ORDER
 

  const handleCancelOrder = async (
    id: string
  ) => {
    try {
      const response = await dispatch(
        cancelOrder(id)
      ).unwrap();

      return response;
    } catch (error) {
      throw error;
    }
  };

 
  // UPDATE ORDER STATUS
 

  const handleUpdateOrderStatus = async (
    id: string,
    data: UpdateOrderStatusPayload
  ) => {
    try {
      const response = await dispatch(
        updateOrderStatus({
          id,
          data,
        })
      ).unwrap();

      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    orders,
    selectedOrder,
    orderLoading,
    orderError,

    handlePlaceOrder,
    handleFetchMyOrders,
    handleFetchOrderDetails,
    handleCancelOrder,
    handleUpdateOrderStatus,
  };
};

export default useOrders;