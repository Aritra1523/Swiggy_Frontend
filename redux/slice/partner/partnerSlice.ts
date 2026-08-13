import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/api/baseUrl/Api";
import { endpoints } from "@/api/endpoints/Endpoints";
import {
  ApplyRestaurantPayload,
  ApplyRestaurantResponse,
} from "@/typescript/partner/ApplyRestaurant";
import {
  RestaurantOtpPayload,
  RestaurantOtpResponse,
} from "@/typescript/partner/ResutantOtp";
import {
  RestaurantDetailsPayload,
  RestaurantDetailsResponse,
} from "@/typescript/partner/RestaurantDetails";
import {
  RestaurantDocumentsPayload,
  RestaurantDocumentsResponse,
} from "@/typescript/partner/RestaurantDocuments";

import {
  PartnerContractPayload,
  PartnerContractResponse,
} from "@/typescript/partner/PartnerContract";

import { RestaurantDetails } from "@/typescript/partner/RestaurantDetails";

interface PartnerState {
  loading: boolean;
  error: string | null;
  restaurantEmail: string;
  restaurantDetails: RestaurantDetails | null;
}
interface PartnerState {
  loading: boolean;
  error: string | null;

  restaurantEmail: string;

  restaurantDetails: RestaurantDetails | null;
}
const initialState: PartnerState = {
  loading: false,
  error: null,
  restaurantEmail: "",
  restaurantDetails: null,
};

/*  Apply Restaurant  */

export const applyRestaurant = createAsyncThunk<
  ApplyRestaurantResponse,
  ApplyRestaurantPayload,
  { rejectValue: string }
>("partner/applyRestaurant", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(endpoints.applyRestaurat, data);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to send OTP",
    );
  }
});

/*  Verify OTP  */

export const verifyRestaurantOtp = createAsyncThunk<
  RestaurantOtpResponse,
  RestaurantOtpPayload,
  { rejectValue: string }
>("partner/verifyRestaurantOtp", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(endpoints.restaruntOtp, data);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "OTP Verification Failed",
    );
  }
});

//Add Restaurant Details
export const addRestaurantDetails = createAsyncThunk<
  RestaurantDetailsResponse,
  RestaurantDetailsPayload,
  { rejectValue: string }
>("partner/restaurantDetails", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(endpoints.restaruntDetails, data);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to save restaurant details",
    );
  }
});

//Document Add
export const addRestaurantDocuments = createAsyncThunk<
  RestaurantDocumentsResponse,
  RestaurantDocumentsPayload,
  { rejectValue: string }
>("partner/restaurantDocuments", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(
      endpoints.restaruntDocument,
      data,
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to save restaurant documents",
    );
  }
});

//SubmitPartnerContract
export const submitPartnerContract = createAsyncThunk<
  PartnerContractResponse,
  PartnerContractPayload,
  { rejectValue: string }
>("partner/partnerContract", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(endpoints.partnerCOntract, data);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to submit contract",
    );
  }
});
/*  Slice  */

const partnerSlice = createSlice({
  name: "partner",
  initialState,

  reducers: {
    setRestaurantEmail: (state, action) => {
      state.restaurantEmail = action.payload;
    },

    clearPartnerState: (state) => {
      state.restaurantEmail = "";
      state.error = null;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder

      /* Apply Restaurant */

      .addCase(applyRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(applyRestaurant.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(applyRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed";
      })

      /* Verify OTP */

      .addCase(verifyRestaurantOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(verifyRestaurantOtp.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(verifyRestaurantOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "OTP Failed";
      })
      //Add Restaurant Details
      .addCase(addRestaurantDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addRestaurantDetails.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(addRestaurantDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed";
      })
      //Add Documents
      .addCase(addRestaurantDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addRestaurantDocuments.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(addRestaurantDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed";
      })
      //PartnerContract
      .addCase(submitPartnerContract.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(submitPartnerContract.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(submitPartnerContract.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed";
      });
  },
});

export const { setRestaurantEmail, clearPartnerState } = partnerSlice.actions;

export default partnerSlice.reducer;
