import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosInstance from "@/api/baseUrl/Api";
import { endpoints } from "@/api/endpoints/Endpoints";
import { Food, FoodListResponse } from "@/typescript/foodListType/type";

interface FoodState {
  foods: Food[];
  loading: boolean;
  error: string | null;
}

const initialState: FoodState = {
  foods: [],
  loading: false,
  error: null,
};

export const fetchFoodList = createAsyncThunk<
  FoodListResponse,
  string | undefined,
  { rejectValue: string }
>("food/fetchFoodList", async (restaurantId, { rejectWithValue }) => {
  try {
    const url = restaurantId
      ? endpoints.restaurantFood(restaurantId)
      : endpoints.foodList;

    const response = await axiosInstance.get<FoodListResponse>(url);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch food list",
    );
  }
});

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    clearFoodError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoodList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFoodList.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        // state.foods = payload.data ?? payload.foods ?? [];
        state.foods = payload.data ?? [];
      })
      .addCase(fetchFoodList.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || "Failed to fetch food list";
      });
  },
});

export const { clearFoodError } = foodSlice.actions;

export default foodSlice.reducer;
