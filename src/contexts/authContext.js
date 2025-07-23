import React, { createContext, useState, useEffect } from "react";
import SecureStorage from "../services/storageService";
import ApiClient from "../services/apiService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);

  var isAuthenticated;

  const loadAuthData = async () => {
    const token = await SecureStorage.get("accessToken");
    const refreshToken = await SecureStorage.get("refreshToken");
    const userId = await SecureStorage.get("userId");
    const userRole = await SecureStorage.get("userRole");

    if (token && refreshToken) {
      setAuthData({ userId, userRole });
    }

    isAuthenticated = true;

    setLoading(false);
  };

  useEffect(() => {
    loadAuthData();
  }, []);

  const login = async (token, refreshToken, userId, userRole) => {
    await SecureStorage.save("accessToken", token);
    await SecureStorage.save("refreshToken", refreshToken);
    await SecureStorage.save("userId", userId);
    await SecureStorage.save("userRole", userRole);

    isAuthenticated = true;
    setAuthData({ userId, userRole });
  };

  const logout = async () => {
    isAuthenticated = false;
    await SecureStorage.clearAll();
    setAuthData(null);
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
      logout();
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
