import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import { Alert } from "react-native";
import SecureStorage from "./storageService";
import { triggerLogout } from "../contexts/authHandler";

const ApiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

ApiClient.interceptors.request.use(
  async (config) => {
    const token = await SecureStorage.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Bearer token added");
    }
    return config;
  },
  (error) => {
    console.log("Request Error:", error);
    return Promise.reject(error);
  }
);

ApiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("Response Error:", error);
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 403 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = await SecureStorage.get("refreshToken");
        const userId = await SecureStorage.get("userId");

        if (!refreshToken || !userId) {
          return Promise.reject(error);
        }

        const res = await axios.post(`${baseUrl}/auth/refresh`, {
          id: userId,
          token: refreshToken,
        });

        const newAccessToken = res.data.accessToken;
        await SecureStorage.save("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return ApiClient(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err);
        await SecureStorage.clearAll();
        await triggerLogout();
        Alert.alert("Session Expired", "Please log in again.");
        return Promise.reject(err);
      }
    }

    Alert.alert("Error", "An unexpected error occurred.");
    return Promise.reject(error);
  }
);

export default ApiClient;
