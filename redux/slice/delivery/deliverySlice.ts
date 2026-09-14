import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosInstance from "@/api/baseUrl/Api";
import { endpoints } from "@/api/endpoints/Endpoints";

import {
  ApplyDeliveryPayload,
  ApplyDeliveryResponse,
  DeliveryOtpPayload,
  DeliveryOtpResponse,
  DeliveryDetailsPayload,
  DeliveryDetailsResponse,
  DeliveryDocumentsResponse,
  DeliveryContractPayload,
  DeliveryContractResponse,
  DeliveryPartner,
  DeliveryProfileResponse,
  ToggleOnlineResponse,
} from "@/typescript/delivery/Delivery";

interface DeliveryState {
  loading: boolean;
  error: string | null;
  deliveryEmail: string;
  profile: DeliveryPartner | null;
}

const initialState: DeliveryState = {
  loading: false,
  error: null,
  deliveryEmail: "",
  profile: null,
};

/* Apply for Delivery Partner */

export const applyDelivery = createAsyncThunk<
  ApplyDeliveryResponse,
  ApplyDeliveryPayload,
  { rejectValue: string }
>("delivery/apply", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(endpoints.applyDelivery, data);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to send OTP",
    );
  }
});

/* Verify Delivery OTP */

export const verifyDeliveryOtp = createAsyncThunk<
  DeliveryOtpResponse,
  DeliveryOtpPayload,
  { rejectValue: string }
>("delivery/verifyOtp", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(endpoints.deliveryOtp, data);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "OTP Verification Failed",
    );
  }
});

/* Resend Delivery OTP */

export const resendDeliveryOtp = createAsyncThunk<
  DeliveryOtpResponse,
  { email: string },
  { rejectValue: string }
>("delivery/resendOtp", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(
      endpoints.deliveryResendOtp,
      data,
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to resend OTP",
    );
  }
});

/* Add Delivery Details */

export const addDeliveryDetails = createAsyncThunk<
  DeliveryDetailsResponse,
  DeliveryDetailsPayload,
  { rejectValue: string }
>("delivery/details", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(endpoints.deliveryDetails, data);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to save details",
    );
  }
});

/* Add Delivery Documents (multipart) */

export const addDeliveryDocuments = createAsyncThunk<
  DeliveryDocumentsResponse,
  FormData,
  { rejectValue: string }
>("delivery/documents", async (formData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(
      endpoints.deliveryDocuments,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to save documents",
    );
  }
});

/* Submit Delivery Contract */

export const submitDeliveryContract = createAsyncThunk<
  DeliveryContractResponse,
  DeliveryContractPayload,
  { rejectValue: string }
>("delivery/contract", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(endpoints.deliveryContract, data);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to submit contract",
    );
  }
});

/* Get My Delivery Profile (Dashboard) */

export const fetchMyDeliveryProfile = createAsyncThunk<
  DeliveryProfileResponse,
  void,
  { rejectValue: string }
>("delivery/myProfile", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(endpoints.myDeliveryProfile);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to load profile",
    );
  }
});

/* Toggle Online / Offline (Dashboard) */

export const toggleDeliveryOnline = createAsyncThunk<
  ToggleOnlineResponse,
  void,
  { rejectValue: string }
>("delivery/toggleOnline", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.patch(endpoints.toggleDeliveryOnline);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to toggle status",
    );
  }
});

const deliverySlice = createSlice({
  name: "delivery",

  initialState,

  reducers: {
    setDeliveryEmail: (state, action: { payload: string }) => {
      state.deliveryEmail = action.payload;
    },

    resetDeliveryState: (state) => {
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(applyDelivery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyDelivery.fulfilled, (state, { payload }) => {
        state.loading = false;

        if (payload?.data?.email) {
          state.deliveryEmail = payload.data.email;
        }
      })
      .addCase(applyDelivery.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload ?? "Failed to send OTP";
      })

      .addCase(verifyDeliveryOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyDeliveryOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyDeliveryOtp.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload ?? "OTP Verification Failed";
      })

      .addCase(addDeliveryDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDeliveryDetails.fulfilled, (state, { payload }) => {
        state.loading = false;

        if (payload?.data) {
          state.profile = payload.data;
        }
      })
      .addCase(addDeliveryDetails.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload ?? "Failed to save details";
      })

      .addCase(addDeliveryDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDeliveryDocuments.fulfilled, (state, { payload }) => {
        state.loading = false;

        if (payload?.data) {
          state.profile = payload.data;
        }
      })
      .addCase(addDeliveryDocuments.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload ?? "Failed to save documents";
      })

      .addCase(submitDeliveryContract.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitDeliveryContract.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(submitDeliveryContract.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload ?? "Failed to submit contract";
      })

      .addCase(fetchMyDeliveryProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyDeliveryProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.profile = payload.data;
      })
      .addCase(fetchMyDeliveryProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload ?? "Failed to load profile";
      })

      .addCase(toggleDeliveryOnline.fulfilled, (state, { payload }) => {
        if (state.profile) {
          state.profile.isOnline = payload.data.isOnline;
        }
      });
  },
});

export const { setDeliveryEmail, resetDeliveryState } = deliverySlice.actions;

export default deliverySlice.reducer;