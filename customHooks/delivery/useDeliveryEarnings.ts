"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getDeliveryEarnings,
  getDeliveryEarningsHistory,
} from "@/api/delivery/deliveryApi";

export const deliveryEarningsKeys = {
  all: ["delivery-earnings"] as const,

  summary: () =>
    [...deliveryEarningsKeys.all, "summary"] as const,

  history: () =>
    [...deliveryEarningsKeys.all, "history"] as const,
};

export const useDeliveryEarnings = () => {
  return useQuery({
    queryKey: deliveryEarningsKeys.summary(),
    queryFn: getDeliveryEarnings,
    refetchInterval: 30000,
  });
};

export const useDeliveryEarningsHistory = () => {
  return useQuery({
    queryKey: deliveryEarningsKeys.history(),
    queryFn: getDeliveryEarningsHistory,
  });
};