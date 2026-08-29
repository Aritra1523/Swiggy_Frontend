import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosInstance from "@/api/baseUrl/Api";
import { endpoints } from "@/api/endpoints/Endpoints";

import {
  AddCartPayload,
  AddCartResponse,
  Cart,
  CartListResponse,
  DeleteCartItemResponse,
  Order,
  OrdersResponse,
  OrderResponse,
  PlaceOrderPayload,
  PlaceOrderResponse,
  UpdateOrderStatusPayload,
  OrderState,
} from "@/typescript/order/order";
import { data } from "framer-motion/client";
import { isRejectedWithValue } from "@reduxjs/toolkit";



const initialState: OrderState = {
  cart: null,
  orders: [],
  selectedOrder: null,
  loading: false,
  cartLoading: false,
  orderLoading: false,
  error: null,
  cartError: null,
  orderError: null,
};

//Add to Cart
export const addToCart = createAsyncThunk<
  AddCartResponse,
  AddCartPayload,
  { rejectValue: string }
>("order/addToCart", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post<AddCartResponse>(
      endpoints.addCart,
      data,
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to add item to cart",
    );
  }
});

//Get Cart
export const fetchCart = createAsyncThunk<
  CartListResponse,
  void,
  { rejectValue: string }
>("order/fetchCart", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get<CartListResponse>(
      endpoints.cartList,
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch cart",
    );
  }
});

//Delete Cart Item

export const deleteCartItem = createAsyncThunk<
  DeleteCartItemResponse,
  string,
  { rejectValue: string }
>("order/deleteCartItem", async (foodId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete<DeleteCartItemResponse>(
      endpoints.deleteCartItem(foodId),
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to update cart",
    );
  }
});

//Place Order

export const placeOrder = createAsyncThunk<
  PlaceOrderResponse,
  PlaceOrderPayload,
  { rejectValue: string }
>("order/placeOrder", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post<PlaceOrderResponse>(
      endpoints.placeOrder,
      data,
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to place order",
    );
  }
});

//Get My Orders
export const fetchMyOrders = createAsyncThunk<
  OrdersResponse,
  void,
  { rejectValue: string }
>("order/fetchMyOrders", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get<OrdersResponse>(
      endpoints.myOrders,
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch orders",
    );
  }
});

//Get Single Order
export const fetchOrderDetails = createAsyncThunk<
  OrderResponse,
  string,
  { rejectValue: string }
>("order/fetchOrderDetails", async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get<OrderResponse>(
      endpoints.orderDetails(id),
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch order",
    );
  }
});

//Cancel Order

export const cancelOrder = createAsyncThunk<
  OrderResponse,
  string,
  { rejectValue: string }
>("order/cancelOrder", async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put(endpoints.cancelOrder(id));
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to cancel order",
    );
  }
});

const orderSlice = createSlice({
  name: "order",

  initialState,

  reducers: {
    clearOrderError: (state) => {
      state.error = null;
      state.orderError = null;
    },

    clearCartError: (state) => {
      state.cartError = null;
    },

    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ADD CART

      .addCase(addToCart.pending, (state) => {
        state.cartLoading = true;
        state.cartError = null;
      })

      .addCase(addToCart.fulfilled, (state, { payload }) => {
        state.cartLoading = false;

        if (payload.data) {
          state.cart = payload.data;
        }
      })

      .addCase(addToCart.rejected, (state, { payload }) => {
        state.cartLoading = false;

        state.cartError = payload || "Failed to add item";
      })

      // FETCH CART

      .addCase(fetchCart.pending, (state) => {
        state.cartLoading = true;
        state.cartError = null;
      })

      .addCase(fetchCart.fulfilled, (state, { payload }) => {
        state.cartLoading = false;

        state.cart = payload.data;
      })

      .addCase(fetchCart.rejected, (state, { payload }) => {
        state.cartLoading = false;

        state.cartError = payload || "Failed to fetch cart";
      })

      // DELETE CART ITEM

      .addCase(deleteCartItem.pending, (state) => {
        state.cartLoading = true;
        state.cartError = null;
      })

      .addCase(deleteCartItem.fulfilled, (state, { payload }) => {
        state.cartLoading = false;

        if (payload.data) {
          state.cart = payload.data;
        } else {
          state.cart = null;
        }
      })

      .addCase(deleteCartItem.rejected, (state, { payload }) => {
        state.cartLoading = false;

        state.cartError = payload || "Failed to update cart";
      })

      // PLACE ORDER

      .addCase(placeOrder.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
      })

      .addCase(placeOrder.fulfilled, (state, { payload }) => {
        state.orderLoading = false;

        if (payload.data) {
          state.orders.unshift(payload.data);
        }

        // Backend deletes cart
        state.cart = null;
      })

      .addCase(placeOrder.rejected, (state, { payload }) => {
        state.orderLoading = false;

        state.orderError = payload || "Failed to place order";
      })

      // MY ORDERS

      .addCase(fetchMyOrders.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
      })

      .addCase(fetchMyOrders.fulfilled, (state, { payload }) => {
        state.orderLoading = false;

        state.orders = payload.data;
      })

      .addCase(fetchMyOrders.rejected, (state, { payload }) => {
        state.orderLoading = false;

        state.orderError = payload || "Failed to fetch orders";
      })

      // ORDER DETAILS

      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchOrderDetails.fulfilled, (state, { payload }) => {
        state.loading = false;

        state.selectedOrder = payload.data;
      })

      .addCase(fetchOrderDetails.rejected, (state, { payload }) => {
        state.loading = false;

        state.error = payload || "Failed to fetch order";
      })

      // CANCEL ORDER

      .addCase(cancelOrder.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
      })

      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.orderLoading = false;

        // action.meta.arg is the order id passed into dispatch(cancelOrder(id))
        const cancelledId = action.meta.arg;

        if (action.payload.data) {
          // Backend sent the full updated order — use it as-is
          state.selectedOrder = action.payload.data;

          const index = state.orders.findIndex(
            (order) => order._id === action.payload.data?._id,
          );

          if (index !== -1) {
            state.orders[index] = action.payload.data;
          }
        } else {
          // Backend only confirmed success with no order back — patch the
          // status locally so the UI still reflects the cancellation.
          const index = state.orders.findIndex(
            (order) => order._id === cancelledId,
          );

          if (index !== -1) {
            state.orders[index] = {
              ...state.orders[index],
              status: "cancelled",
            };
          }

          if (state.selectedOrder?._id === cancelledId) {
            state.selectedOrder = {
              ...state.selectedOrder,
              status: "cancelled",
            };
          }
        }
      })

      .addCase(cancelOrder.rejected, (state, { payload }) => {
        state.orderLoading = false;

        state.orderError = payload || "Failed to cancel order";
      });
  },
});

export const { clearOrderError, clearCartError, clearSelectedOrder } =
  orderSlice.actions;

export default orderSlice.reducer;
