import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/baseUrl/Api";
import { endpoints } from "@/api/endpoints/Endpoints";
import {
  OwnerFood,
  AddFoodPayload,
  EditFoodPayload,
  FoodListResponse,
  FoodDetailsResponse,
  AddFoodResponse,
  MyRestaurantResponse,
  DeleteFoodResponse,
  ToggleAvailabilityResponse,
  OwnerOrderListResponse,
  OwnerOrder,
  UpdateOrderStatusResponse,
  RestaurantStatusPayload,
  RestaurantStatusResponse,
  PendingFoodCountResponse,
} from "@/typescript/restaurantOwner/restaurantOwner";

// Query keys centralized so mutations can invalidate precisely
export const ownerKeys = {
  restaurant: ["owner", "restaurant"] as const,
  foods: ["owner", "foods"] as const,
  food: (id: string) => ["owner", "foods", id] as const,
};

// Builds multipart form data for endpoints that accept an image file
// (add-food and food/edit both use upload.single("image") on the backend)
function toFormData(payload: AddFoodPayload | EditFoodPayload): FormData {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (key === "image" && value instanceof File) {
      formData.append("image", value);
      return;
    }

    formData.append(key, String(value));
  });

  return formData;
}

// GET /my-restaurant

export function useMyRestaurant() {
  return useQuery({
    queryKey: ownerKeys.restaurant,
    queryFn: async () => {
      const response = await axiosInstance.get<MyRestaurantResponse>(
        endpoints.myRestaurant,
      );
      return response.data;
    },
  });
}

// GET /food/list

export function useFoodList(page = 1, limit = 10) {
  return useQuery({
    queryKey: [...ownerKeys.foods, page, limit],
    queryFn: async () => {
      const response = await axiosInstance.get<FoodListResponse>(
        endpoints.foodlistOwner,
        { params: { page, limit } },
      );
      return response.data; // full response: { success, data, pagination }
    },
  });
}

// GET /food/details/:id

export function useFoodDetails(id: string | undefined) {
  return useQuery({
    queryKey: ownerKeys.food(id ?? ""),
    queryFn: async () => {
      const response = await axiosInstance.get<FoodDetailsResponse>(
        endpoints.restaurantfoodDetails(id as string),
      );
      return response.data.data;
    },
    enabled: !!id, // don't fire until an id actually exists
  });
}

// POST /add-food

export function useAddFood() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: AddFoodPayload) => {
      const response = await axiosInstance.post<AddFoodResponse>(
        endpoints.addFood,
        toFormData(payload),
        { headers: { "Content-Type": "multipart/form-data" } },
      );
      return response.data;
    },
    //If successfully added the food then re-fretch because previous data is now stale or new data is come using invalidateQueries
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ownerKeys.foods });
    },
  });
}

// POST /food/edit/:id

export function useEditFood() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: EditFoodPayload;
    }) => {
      const response = await axiosInstance.post<AddFoodResponse>(
        endpoints.editFood(id),
        toFormData(payload),
        { headers: { "Content-Type": "multipart/form-data" } },
      );
      return response.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ownerKeys.foods });
      queryClient.invalidateQueries({ queryKey: ownerKeys.food(variables.id) });
    },
  });
}

// DELETE /food/:id

export function useDeleteFood() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete<DeleteFoodResponse>(
        endpoints.deleteFood(id),
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ownerKeys.foods });
    },
  });
}

// PATCH /:id/toggle-availability

export function useToggleAvailability() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.patch<ToggleAvailabilityResponse>(
        endpoints.toggleAvailability(id),
      );
      return response.data;
    },
    // Optimistic update — flips the item immediately in the cached list,
    // since waiting for the round trip makes toggling feel laggy.
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ownerKeys.foods });

      const previousFoods = queryClient.getQueryData<OwnerFood[]>(
        ownerKeys.foods,
      );

      queryClient.setQueryData<OwnerFood[]>(ownerKeys.foods, (old) =>
        old?.map((food) =>
          food._id === id ? { ...food, isAvailable: !food.isAvailable } : food,
        ),
      );

      return { previousFoods };
    },
    onError: (_err, _id, context) => {
      // Roll back if the request actually failed
      if (context?.previousFoods) {
        queryClient.setQueryData(ownerKeys.foods, context.previousFoods);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ownerKeys.foods });
    },
  });
}

export const ownerOrderKeys = {
  orders: ["owner", "orders"] as const,
  order: (id: string) => ["owner", "orders", id] as const,
};

export function useOwnerOrders() {
  return useQuery({
    queryKey: ownerOrderKeys.orders,
    queryFn: async () => {
      const response = await axiosInstance.get<OwnerOrderListResponse>(
        endpoints.ownerOrders,
      );

      return response.data;
    },
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await axiosInstance.put<UpdateOrderStatusResponse>(
        endpoints.updateOrderStatus(id),
        { status },
      );
      return response.data;
    },
    // Optimistic update — flips the status immediately in the cached list,
    // since waiting for the round trip makes the action feel laggy.
    onMutate: async ({ id, status }: { id: string; status: string }) => {
      await queryClient.cancelQueries({ queryKey: ownerOrderKeys.orders });

      const previousOrders = queryClient.getQueryData<OwnerOrderListResponse>(
        ownerOrderKeys.orders,
      );

      queryClient.setQueryData<OwnerOrderListResponse>(
        ownerOrderKeys.orders,
        (old) =>
          old
            ? {
                ...old,
                data: old.data.map((order) =>
                  order._id === id
                    ? { ...order, status: status as OwnerOrder["status"] }
                    : order,
                ),
              }
            : old,
      );

      return { previousOrders };
    },
    onError: (_err, _vars, context) => {
      // Roll back if the request actually failed (invalid transition,
      // already completed, not the owner's order, etc.)
      if (context?.previousOrders) {
        queryClient.setQueryData(ownerOrderKeys.orders, context.previousOrders);
      }
    },
    onSettled: (_data, _err, variables) => {
      queryClient.invalidateQueries({ queryKey: ownerOrderKeys.orders });
      queryClient.invalidateQueries({
        queryKey: ownerOrderKeys.order(variables.id),
      });
    },
  });
}

export const restaurantKeys = {
  myRestaurant: ["owner", "restaurant"] as const,
};

const updateRestaurantStatus = async (
  payload: RestaurantStatusPayload,
): Promise<RestaurantStatusResponse> => {
  const response = await axiosInstance.patch<RestaurantStatusResponse>(
    endpoints.restaurantStatus, // PATCH /restaurant/status
    payload,
  );
  return response.data;
};

export const useRestaurantStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRestaurantStatus,

    onSuccess: () => {
      // Reuses the SAME key your existing useMyRestaurant (top of file)
      // already uses — no second key system, no chance of drift.
      queryClient.invalidateQueries({ queryKey: ownerKeys.restaurant });
    },

    onError: (error) => {
      console.error("Restaurant status update failed:", error);
    },
  });
};
export const foodKeys = {
  all: ["foods"] as const,
  lists: () => [...foodKeys.all, "list"] as const,
  list: (filters: any) => [...foodKeys.lists(), filters] as const,
  details: () => [...foodKeys.all, "detail"] as const,
  detail: (id: string) => [...foodKeys.details(), id] as const,
  pendingCount: () => [...foodKeys.all, "pending-count"] as const,
};
export function usePendingFoodCount() {
  return useQuery({
    queryKey: foodKeys.pendingCount(),
    queryFn: async () => {
      const response = await axiosInstance.get<PendingFoodCountResponse>(
        "/restaurant/foods/pending-count"
      );
      return response.data;
    },
    select: (data) => data.count, // Extract only the count from the response
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}