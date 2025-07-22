import { InstructorRegisterScreen } from "../screens/instructorScreens/registerScreen";
import { LandingScreen } from "../screens/landingScreen";
import { SignInScreen } from "../screens/signInScreen";
import { SplashScreen } from "../screens/splashScreen";
import { StudentRegisterScreen, StudentRegisterScreenStepOne } from "../screens/studentScreens/registerScreenStepOne";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StudentRegisterScreenStepTwo } from "../screens/studentScreens/registerScreenStepTwo";
import { StudentBottomTabNavigator } from "./studentBottomTabNavigator";

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen
        name="StudentRegisterStepOne"
        component={StudentRegisterScreenStepOne}
      />
      <Stack.Screen
        name="StudentRegisterStepTwo"
        component={StudentRegisterScreenStepTwo}
      />

      <Stack.Screen
        name="InstructorRegister"
        component={InstructorRegisterScreen}
      />
      <Stack.Screen
        name="StudentBottomTab"
        component={StudentBottomTabNavigator}
      />
      
    </Stack.Navigator>
  );
};
