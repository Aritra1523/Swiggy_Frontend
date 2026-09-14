import axiosInstance from "@/api/baseUrl/Api";
import { endpoints } from "@/api/endpoints/Endpoints";

export const getAvailableDeliveryOrders = async () => {
  const response = await axiosInstance.get(
    endpoints.deliveryAvailableOrders
  );

  return response.data;
};

export const acceptDeliveryOrder = async (orderId: string) => {
  const response = await axiosInstance.post(
    endpoints.deliveryAcceptOrder(orderId)
  );

  return response.data;
};

export const getActiveDeliveryOrder = async () => {
  const response = await axiosInstance.get(
    endpoints.deliveryActiveOrder
  );

  return response.data;
};

export const pickupDeliveryOrder = async (orderId: string) => {
  const response = await axiosInstance.patch(
    endpoints.deliveryPickupOrder(orderId)
  );

  return response.data;
};

export const outForDeliveryOrder = async (orderId: string) => {
  const response = await axiosInstance.patch(
    endpoints.deliveryOutForDelivery(orderId)
  );

  return response.data;
};

export const deliverDeliveryOrder = async (orderId: string) => {
  const response = await axiosInstance.patch(
    endpoints.deliveryDelivered(orderId)
  );

  return response.data;
};

export const getDeliveryHistory = async () => {
  const response = await axiosInstance.get(
    endpoints.deliveryHistory
  );

  return response.data;
};

export const getDeliveryEarnings = async () => {
  const response = await axiosInstance.get(
    endpoints.deliveryEarnings
  );

  return response.data;
};

export const getDeliveryEarningsHistory = async () => {
  const response = await axiosInstance.get(
    endpoints.deliveryEarningsHistory
  );

  return response.data;
};