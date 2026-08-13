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
} from "@/typescript/order/order";
import { data } from "framer-motion/client";
import { isRejectedWithValue } from "@reduxjs/toolkit";

interface OrderState {
  cart: Cart | null;

  orders: Order[];

  selectedOrder: Order | null;

  loading: boolean;

  cartLoading: boolean;

  orderLoading: boolean;

  error: string | null;

  cartError: string | null;

  orderError: string | null;
}

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

//Update Order Status

export const updateOrderStatus = createAsyncThunk<
  OrderResponse,
  {
    id: string;
    data: UpdateOrderStatusPayload;
  },
  { rejectValue: string }
>(
  "order/updateOrderStatus",
  async (
    { id, data },
    { rejectWithValue },
  ) => {
    try {
      const response =
        await axiosInstance.put<OrderResponse>(
          endpoints.updateOrderStatus(id),
          data,
        );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update order status",
      );
    }
  },
);



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

      .addCase(
        addToCart.fulfilled,
        (state, action) => {
          state.cartLoading = false;

          if (action.payload.data) {
            state.cart =
              action.payload.data;
          }
        },
      )

      .addCase(
        addToCart.rejected,
        (state, action) => {
          state.cartLoading = false;

          state.cartError =
            action.payload ||
            "Failed to add item";
        },
      )

    
      // FETCH CART
    

      .addCase(fetchCart.pending, (state) => {
        state.cartLoading = true;
        state.cartError = null;
      })

      .addCase(
        fetchCart.fulfilled,
        (state, action) => {
          state.cartLoading = false;

          state.cart =
            action.payload.data;
        },
      )

      .addCase(
        fetchCart.rejected,
        (state, action) => {
          state.cartLoading = false;

          state.cartError =
            action.payload ||
            "Failed to fetch cart";
        },
      )

    
      // DELETE CART ITEM
    

      .addCase(
        deleteCartItem.pending,
        (state) => {
          state.cartLoading = true;
          state.cartError = null;
        },
      )

      .addCase(
        deleteCartItem.fulfilled,
        (state, action) => {
          state.cartLoading = false;

          if (action.payload.data) {
            state.cart =
              action.payload.data;
          } else {
            state.cart = null;
          }
        },
      )

      .addCase(
        deleteCartItem.rejected,
        (state, action) => {
          state.cartLoading = false;

          state.cartError =
            action.payload ||
            "Failed to update cart";
        },
      )

    
      // PLACE ORDER
    

      .addCase(placeOrder.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
      })

      .addCase(
        placeOrder.fulfilled,
        (state, action) => {
          state.orderLoading = false;

          if (action.payload.data) {
            state.orders.unshift(
              action.payload.data,
            );
          }

          // Backend deletes cart
          state.cart = null;
        },
      )

      .addCase(
        placeOrder.rejected,
        (state, action) => {
          state.orderLoading = false;

          state.orderError =
            action.payload ||
            "Failed to place order";
        },
      )

    
      // MY ORDERS
    

      .addCase(
        fetchMyOrders.pending,
        (state) => {
          state.orderLoading = true;
          state.orderError = null;
        },
      )

      .addCase(
        fetchMyOrders.fulfilled,
        (state, action) => {
          state.orderLoading = false;

          state.orders =
            action.payload.data;
        },
      )

      .addCase(
        fetchMyOrders.rejected,
        (state, action) => {
          state.orderLoading = false;

          state.orderError =
            action.payload ||
            "Failed to fetch orders";
        },
      )

    
      // ORDER DETAILS
    

      .addCase(
        fetchOrderDetails.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )

      .addCase(
        fetchOrderDetails.fulfilled,
        (state, action) => {
          state.loading = false;

          state.selectedOrder =
            action.payload.data;
        },
      )

      .addCase(
        fetchOrderDetails.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to fetch order";
        },
      )

    
      // CANCEL ORDER
    

      .addCase(
        cancelOrder.pending,
        (state) => {
          state.orderLoading = true;
          state.orderError = null;
        },
      )

      .addCase(
        cancelOrder.fulfilled,
        (state, action) => {
          state.orderLoading = false;

          if (action.payload.data) {
            state.selectedOrder =
              action.payload.data;

            const index =
              state.orders.findIndex(
                (order) =>
                  order._id ===
                  action.payload.data?._id,
              );

            if (index !== -1) {
              state.orders[index] =
                action.payload.data;
            }
          }
        },
      )

      .addCase(
        cancelOrder.rejected,
        (state, action) => {
          state.orderLoading = false;

          state.orderError =
            action.payload ||
            "Failed to cancel order";
        },
      )

    
      // UPDATE ORDER STATUS
    

      .addCase(
        updateOrderStatus.pending,
        (state) => {
          state.orderLoading = true;
          state.orderError = null;
        },
      )

      .addCase(
        updateOrderStatus.fulfilled,
        (state, action) => {
          state.orderLoading = false;

          if (action.payload.data) {
            state.selectedOrder =
              action.payload.data;

            const index =
              state.orders.findIndex(
                (order) =>
                  order._id ===
                  action.payload.data?._id,
              );

            if (index !== -1) {
              state.orders[index] =
                action.payload.data;
            }
          }
        },
      )

      .addCase(
        updateOrderStatus.rejected,
        (state, action) => {
          state.orderLoading = false;

          state.orderError =
            action.payload ||
            "Failed to update order status";
        },
      );
  },
});

export const {
  clearOrderError,
  clearCartError,
  clearSelectedOrder,
} = orderSlice.actions;

export default orderSlice.reducer;