import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import axiosInstance from "@/api/baseUrl/Api";
import { endpoints } from "@/api/endpoints/Endpoints";

import {
  RegisterPayload,
  RegisterResponse,
  User,
  AuthState,
} from "@/typescript/auth/Register";

import {
  LoginPayload,
  LoginResponse,
} from "@/typescript/auth/Login";

import {
  VerifyOtpPayload,
  VerifyOtpResponse,
} from "@/typescript/auth/Otp";

// INITIAL STATE

const initialState: AuthState = {
  loading: false,
  error: null,
  user: null,
  accessToken: null,
  refreshToken: null,
};

// REGISTER

export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterPayload,
  { rejectValue: string }
>(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        endpoints.register,
        data
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  }
);

// LOGIN

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        endpoints.login,
        data
      );

      console.log(
        "LOGIN API RESPONSE:",
        response.data
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  }
);

// VERIFY OTP

export const verifyOtp = createAsyncThunk<
  VerifyOtpResponse,
  VerifyOtpPayload,
  { rejectValue: string }
>(
  "auth/otp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        endpoints.otp,
        data
      );

      console.log(
        "OTP API RESPONSE:",
        response.data
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "OTP Verification Failed"
      );
    }
  }
);

// AUTH SLICE

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
 
    // HYDRATE USER
 

    hydrateUser: (
      state,
      action: { payload: User }
    ) => {
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
     

      .addCase(
        registerUser.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        registerUser.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.error = null;

          if (payload?.data) {
            state.user = payload.data;
          }
        }
      )

      .addCase(
        registerUser.rejected,
        (state, { payload }) => {
          state.loading = false;

          state.error =
            payload ?? "Registration Failed";
        }
      )

     
      // VERIFY OTP - PENDING
     

      .addCase(
        verifyOtp.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

  

      .addCase(
        verifyOtp.fulfilled,
        (state, { payload }) => {
          console.log(
            "OTP SUCCESS PAYLOAD:",
            payload
          );

          state.loading = false;
          state.error = null;

          // User
          if (payload?.data) {
            state.user = payload.data;
          }

          // Access Token
          if (payload?.accessToken) {
            state.accessToken =
              payload.accessToken;
          }

          // Refresh Token
          if (payload?.refreshToken) {
            state.refreshToken =
              payload.refreshToken;
          }
        }
      )



      .addCase(
        verifyOtp.rejected,
        (state, { payload }) => {
          state.loading = false;

          state.error =
            payload ??
            "OTP Verification Failed";
        }
      )



      .addCase(
        loginUser.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

     
      // LOGIN - SUCCESS
     

      .addCase(
        loginUser.fulfilled,
        (state, { payload }) => {
          console.log(
            "LOGIN PAYLOAD:",
            payload
          );

          console.log(
            "LOGIN USER:",
            payload.data
          );

          console.log(
            "LOGIN ACCESS TOKEN:",
            payload.accessToken
          );

          console.log(
            "LOGIN REFRESH TOKEN:",
            payload.refreshToken
          );

          state.loading = false;
          state.error = null;

          // Save user
          state.user = payload.data;

          // Save access token
          state.accessToken =
            payload.accessToken;

          // Save refresh token
          state.refreshToken =
            payload.refreshToken;
        }
      )

   

      .addCase(
        loginUser.rejected,
        (state, { payload }) => {
          state.loading = false;

          state.error =
            payload ?? "Login Failed";
        }
      );
  },
});



export const {
  logout,
  hydrateUser,
} = authSlice.actions;


export default authSlice.reducer;