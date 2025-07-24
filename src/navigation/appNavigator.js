import React, { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LandingScreen } from "../screens/landingScreen";
import { SignInScreen } from "../screens/signInScreen";
import { SplashScreen } from "../screens/splashScreen";
import { InstructorBottomTabNavigator } from "./instructorBottomTabNavigator";
import { RegisterScreenStepOne } from "../screens/registerScreenStepOne";
import { RegisterScreenStepTwo } from "../screens/registerScreenStepTwo";
import { StudentBottomTabNavigator } from "./studentBottomTabNavigator";
import { AuthContext } from "../contexts/authContext";

const Stack = createStackNavigator();

export const AppNavigator = () => {
  const { authData, loading, isAuthenticated, logout } =
    useContext(AuthContext);

  if (loading) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={
        isAuthenticated
          ? authData?.userRole === "student"
            ? "StudentBottomTab"
            : "InstructorBottomTab"
          : "Landing"
      }
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="RegisterStepOne" component={RegisterScreenStepOne} />
      <Stack.Screen name="RegisterStepTwo" component={RegisterScreenStepTwo} />

      {isAuthenticated && authData?.userRole === "student" && (
        <Stack.Screen
          name="StudentBottomTab"
          component={StudentBottomTabNavigator}
        />
      )}
      {isAuthenticated && authData?.userRole === "instructor" && (
        <Stack.Screen
          name="InstructorBottomTab"
          component={InstructorBottomTabNavigator}
        />
      )}
    </Stack.Navigator>
  );
};