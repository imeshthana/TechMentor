import { LandingScreen } from "../screens/landingScreen";
import { SignInScreen } from "../screens/signInScreen";
import { SplashScreen } from "../screens/splashScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { InstructorBottomTabNavigator } from "./instructorBottomTabNavigator";
import { RegisterScreenStepOne } from "../screens/registerScreenStepOne";
import { RegisterScreenStepTwo } from "../screens/registerScreenStepTwo";
import { StudentBottomTabNavigator } from "./studentBottomTabNavigator";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const { isAuthenticated, authData } = useContext(AuthContext);

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      {isAuthenticated ? (
        authData.userRole == "student" ? (
          <Stack.Screen
            name="StudentBottomTab"
            component={StudentBottomTabNavigator}
          />
        ) : (
          <Stack.Screen
            name="InstructorBottomTab"
            component={InstructorBottomTabNavigator}
          />
        )
      ) : (
        <>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen
            name="RegisterStepOne"
            component={RegisterScreenStepOne}
          />
          <Stack.Screen
            name="RegisterStepTwo"
            component={RegisterScreenStepTwo}
          />
          <Stack.Screen
            name="StudentBottomTab"
            component={StudentBottomTabNavigator}
          />
          <Stack.Screen
            name="InstructorBottomTab"
            component={InstructorBottomTabNavigator}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
