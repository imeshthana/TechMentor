import React, { createContext, useState, useEffect } from "react";
import SecureStorage from "../services/storageService";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setLogoutHandler } from "./authHandler";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigation = useNavigation(AuthContext);
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setLogoutHandler(logout);
  }, [logout]);

  const loadAuthData = async () => {
    try {
      const token = await SecureStorage.get("accessToken");
      const refreshToken = await SecureStorage.get("refreshToken");
      const userId = await SecureStorage.get("userId");
      const userRole = await SecureStorage.get("userRole");

      if (token && refreshToken && userId && userRole) {
        if (userRole == "student") {
          navigation.navigate("StudentBottomTab");
        } else {
          navigation.navigate("InstructorBottomTab");
        }

        setAuthData({ userId, userRole });
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

      if (userRole == "student") {
        navigation.navigate("StudentBottomTab");
      } else {
        navigation.navigate("InstructorBottomTab");
      }

      setAuthData({ userId, userRole });
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
      await AsyncStorage.clear();
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Landing" }],
        });
      }, 100);
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authData,
        login,
        logout,
        loading,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
