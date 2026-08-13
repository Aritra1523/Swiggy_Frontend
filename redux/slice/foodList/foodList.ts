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
  void,
  { rejectValue: string }
>(
  "food/fetchFoodList",
  async (_, { rejectWithValue }) => {
    try {
      const response =
        await axiosInstance.get<FoodListResponse>(
          endpoints.foodList,
        );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch food list",
      );
    }
  },
);

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

      // FETCH FOOD LIST
      .addCase(fetchFoodList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        fetchFoodList.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.foods = action.payload.data;
        },
      )

      .addCase(
        fetchFoodList.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to fetch food list";
        },
      );
  },
});

export const { clearFoodError } =
  foodSlice.actions;

export default foodSlice.reducer;