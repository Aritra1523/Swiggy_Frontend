import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosInstance from "@/api/baseUrl/Api";
import { endpoints } from "@/api/endpoints/Endpoints";
import { Restaurant, RestaurantResponse,RestaurantState } from "@/typescript/foodListType/type";


const initialState: RestaurantState = {
  restaurants: [],
  loading: false,
  error: null,
};

export const fetchRestaurantList = createAsyncThunk<
  RestaurantResponse,
  void,
  { rejectValue: string }
>("restaurant/fetchRestaurantList", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get<RestaurantResponse>(
      endpoints.restaurantList,
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch restaurant list",
    );
  }
});

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,

  reducers: {
    clearRestaurantError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // FETCH RESTAURANT LIST
      .addCase(fetchRestaurantList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRestaurantList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.restaurants = action.payload.data;
      })

      .addCase(fetchRestaurantList.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to fetch restaurant list";
      });
  },
});

export const { clearRestaurantError } = restaurantSlice.actions;

export default restaurantSlice.reducer;
