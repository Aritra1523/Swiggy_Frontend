"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getAvailableDeliveryOrders,
  getActiveDeliveryOrder,
  acceptDeliveryOrder,
  pickupDeliveryOrder,
  outForDeliveryOrder,
  deliverDeliveryOrder,
  getDeliveryHistory,
} from "@/api/delivery/deliveryApi";

export const deliveryKeys = {
  all: ["delivery"] as const,

  available: () =>
    [...deliveryKeys.all, "available"] as const,

  active: () =>
    [...deliveryKeys.all, "active"] as const,

  history: () =>
    [...deliveryKeys.all, "history"] as const,
};

export const useAvailableDeliveryOrders = () => {
  return useQuery({
    queryKey: deliveryKeys.available(),
    queryFn: getAvailableDeliveryOrders,
    refetchInterval: 15000,
  });
};

export const useActiveDeliveryOrder = () => {
  return useQuery({
    queryKey: deliveryKeys.active(),
    queryFn: getActiveDeliveryOrder,
    refetchInterval: 10000,
  });
};

export const useDeliveryHistory = () => {
  return useQuery({
    queryKey: deliveryKeys.history(),
    queryFn: getDeliveryHistory,
  });
};

export const useAcceptDeliveryOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: acceptDeliveryOrder,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: deliveryKeys.available(),
      });

      queryClient.invalidateQueries({
        queryKey: deliveryKeys.active(),
      });
    },
  });
};

export const usePickupDeliveryOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: pickupDeliveryOrder,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: deliveryKeys.active(),
      });
    },
  });
};

export const useOutForDeliveryOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: outForDeliveryOrder,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: deliveryKeys.active(),
      });
    },
  });
};

export const useDeliverDeliveryOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deliverDeliveryOrder,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: deliveryKeys.active(),
      });

      queryClient.invalidateQueries({
        queryKey: deliveryKeys.history(),
      });
    },
  });
};