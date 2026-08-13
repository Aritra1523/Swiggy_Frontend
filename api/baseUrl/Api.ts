import axios from "axios";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

export const baseURL = "http://localhost:4000";

const axiosInstance = axios.create({
  baseURL,

  withCredentials: true,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("auth/login")
    ) {
      originalRequest._retry = true;

      const refreshToken = getCookie("refresh-token");

      if (!refreshToken) {
        deleteCookie("token");
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${baseURL}/refresh-token`, {
          refreshToken,
        });

        const newAccessToken = response.data.accessToken;

        // Save new access token
        setCookie("token", newAccessToken, {
          maxAge: 60 * 15, // 15 min
          path: "/",
        });

        // Update original request header
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        deleteCookie("token");
        deleteCookie("refresh-token");

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;