import React, { createContext, useState, useEffect } from "react";
import SecureStorage from "../services/storageService";
import ApiClient from "../services/apiService";
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigation = useNavigation(AuthContext);
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loadAuthData = async () => {
    try {
      const token = await SecureStorage.get("accessToken");
      const refreshToken = await SecureStorage.get("refreshToken");
      const userId = await SecureStorage.get("userId");
      const userRole = await SecureStorage.get("userRole");

      if (token && refreshToken && userId && userRole) {
        setAuthData({ userId, userRole, token });
        setIsAuthenticated(true);
        console.log("Auth data loaded successfully");
      } else {
        setIsAuthenticated(false);
        setAuthData(null);
      }
    } catch (error) {
      console.error("Error loading auth data:", error);
      setIsAuthenticated(false);
      setAuthData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAuthData();
  }, []);

  const login = async (token, refreshToken, userId, userRole) => {
    try {
      await SecureStorage.save("accessToken", token);
      await SecureStorage.save("refreshToken", refreshToken);
      await SecureStorage.save("userId", userId);
      await SecureStorage.save("userRole", userRole);

      setAuthData({ userId, userRole, token });
      setIsAuthenticated(true);
      console.log("Login successful");
    } catch (error) {
      console.error("Login error:", error);
      setIsAuthenticated(false);
    }
  };

  const logout = async () => {
    try {
      setIsAuthenticated(false);
      setAuthData(null);
      await SecureStorage.clearAll();
      console.log("Logout successful");
      navigation.navigate("Landing");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const refreshAuthToken = async () => {
    try {
      const refreshToken = await SecureStorage.get("refreshToken");
      const userId = await SecureStorage.get("userId");

      if (!refreshToken || !userId) throw new Error("No refresh credentials");

      const res = await ApiClient.post("/auth/refresh", {
        id: userId,
        token: refreshToken,
      });

      const { token: newToken } = res.data;

      await SecureStorage.save("accessToken", newToken);
      setAuthData((prev) => ({ ...prev, token: newToken }));
      return newToken;
    } catch (err) {
      console.error("Refresh failed", err);
      await logout();
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authData,
        login,
        logout,
        refreshAuthToken,
        loading,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
