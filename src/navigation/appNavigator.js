import { LandingScreen } from "../screens/landingScreen";
import { SignInScreen } from "../screens/signInScreen";
import { SplashScreen } from "../screens/splashScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { InstructorBottomTabNavigator } from "./instructorBottomTabNavigator";
import { RegisterScreenStepOne } from "../screens/registerScreenStepOne";
import { RegisterScreenStepTwo } from "../screens/registerScreenStepTwo";
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
      <Stack.Screen name="RegisterStepOne" component={RegisterScreenStepOne} />
      <Stack.Screen name="RegisterStepTwo" component={RegisterScreenStepTwo} />
      <Stack.Screen
        name="StudentBottomTab"
        component={StudentBottomTabNavigator}
      />
    </Stack.Navigator>
  );
};
