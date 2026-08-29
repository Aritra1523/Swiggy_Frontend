import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setCookie } from "cookies-next";

import axiosInstance from "@/api/baseUrl/Api";
import { endpoints } from "@/api/endpoints/Endpoints";

import {
  RegisterPayload,
  RegisterResponse,
  User,
  AuthState,
} from "@/typescript/auth/Register";

import { LoginPayload, LoginResponse } from "@/typescript/auth/Login";

import { VerifyOtpPayload, VerifyOtpResponse } from "@/typescript/auth/Otp";

// INITIAL STATE

const initialState: AuthState = {
  loading: false,
  error: null,
  user: null,
  accessToken: null,
  refreshToken: null,
};

const persistAuthCookies = (payload: {
  accessToken?: string;
  refreshToken?: string;
  data?: User;
}) => {
  if (payload.accessToken) {
    setCookie("token", payload.accessToken, {
      maxAge: 60 * 15, // 15 min
      path: "/",
    });
  }

  if (payload.refreshToken) {
    setCookie("refresh-token", payload.refreshToken, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
  }

  if (payload.data) {
    setCookie("user", JSON.stringify(payload.data), {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
  }
};

// REGISTER

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

// LOGIN

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(endpoints.login, data);

    const res: LoginResponse = response.data;

    console.log("LOGIN API RESPONSE:", res);

    persistAuthCookies(res);

    return res;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Login Failed");
  }
});

// VERIFY OTP

export const verifyOtp = createAsyncThunk<
  VerifyOtpResponse,
  VerifyOtpPayload,
  { rejectValue: string }
>("auth/otp", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(endpoints.otp, data);

    const res: VerifyOtpResponse = response.data;

    console.log("OTP API RESPONSE:", res);

    persistAuthCookies(res);

    return res;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "OTP Verification Failed",
    );
  }
});

// AUTH SLICE

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    // HYDRATE USER

    hydrateUser: (state, action: { payload: User }) => {
      state.user = action.payload;
    },

    // LOGOUT

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // REGISTER

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;

        if (payload?.data) {
          state.user = payload.data;
        }
      })

      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;

        state.error = payload ?? "Registration Failed";
      })

      // VERIFY OTP - PENDING

      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(verifyOtp.fulfilled, (state, { payload }) => {
        console.log("OTP SUCCESS PAYLOAD:", payload);

        state.loading = false;
        state.error = null;

        // User
        if (payload?.data) {
          state.user = payload.data;
        }

        // Access Token
        if (payload?.accessToken) {
        }

        // Refresh Token
        if (payload?.refreshToken) {
          state.refreshToken = payload.refreshToken;
        }
      })

      .addCase(verifyOtp.rejected, (state, { payload }) => {
        state.loading = false;

        state.error = payload ?? "OTP Verification Failed";
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // LOGIN - SUCCESS

      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;

        // Save user
        state.user = payload.data;

        // Save access token
        state.accessToken = payload.accessToken;

        // Save refresh token
        state.refreshToken = payload.refreshToken;
      })

      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;

        state.error = payload ?? "Login Failed";
      });
  },
});

export const { logout, hydrateUser } = authSlice.actions;

export default authSlice.reducer;
