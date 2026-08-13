import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/api/baseUrl/Api";
import { endpoints } from "@/api/endpoints/Endpoints";
import { RegisterPayload, RegisterResponse } from "@/typescript/auth/Register";
import { LoginPayload, LoginResponse } from "@/typescript/auth/Login";
import { VerifyOtpPayload, VerifyOtpResponse } from "@/typescript/auth/Otp";
import {User,AuthState} from "@/typescript/auth/Register"



const initialState: AuthState = {
  loading: false,
  error: null,
  user: null,
  accessToken: null,
  refreshToken: null,
};

//  REGISTER

export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterPayload,
  { rejectValue: string }
>("auth/register", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(endpoints.register, data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Registration Failed",
    );
  }
});

//  LOGIN

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(endpoints.login, data);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Login Failed");
  }
});

//  OTP

export const verifyOtp = createAsyncThunk<
  VerifyOtpResponse,
  VerifyOtpPayload,
  { rejectValue: string }
>("auth/otp", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(endpoints.otp, data);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "OTP Verification Failed",
    );
  }
});

// //  FORGOT PASSWORD

// export const forgotPassword = createAsyncThunk<
//   ForgotPasswordResponse,
//   ForgotPasswordPayload,
//   { rejectValue: string }
// >("auth/forgotPassword", async (data, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.post(endpoints.resetlink, data);
//     return response.data;
//   } catch (error: any) {
//     return rejectWithValue(
//       error.response?.data?.message || "Failed to send reset link",
//     );
//   }
// });

// //  RESET PASSWORD

// export const resetPassword = createAsyncThunk<
//   ResetPasswordResponse,
//   ResetPasswordPayload,
//   { rejectValue: string }
// >("auth/resetPassword", async (data, { rejectWithValue }) => {
//   try {
//     const { id, token, password, confirm_password } = data;

//     const response = await axiosInstance.post(
//       endpoints.resetPassword(id, token),
//       { password, confirm_password },
//     );

//     return response.data;
//   } catch (error: any) {
//     return rejectWithValue(
//       error.response?.data?.message || "Failed to reset password",
//     );
//   }
// });

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    hydrateUser: (state, action: { payload: User }) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      //  REGISTER

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;

        // Check if response has data property
        if (payload?.data) {
          state.user = payload.data;
        }
      })

      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload ?? "Registration Failed";
      })

      //  OTP

      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        // Set user data and tokens from OTP response
        if (action.payload?.data) {
          state.user = action.payload.data;
        }
        if (action.payload?.accessToken) {
          state.accessToken = action.payload.accessToken;
        }
        if (action.payload?.refreshToken) {
          state.refreshToken = action.payload.refreshToken;
        }
      })

      .addCase(verifyOtp.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload ?? "OTP Verification Failed";
      })

      //  LOGIN

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload.data;
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
      })

      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload ?? "Login Failed";
      })

      
  },
});

export const { logout, hydrateUser } = authSlice.actions;

export default authSlice.reducer;
