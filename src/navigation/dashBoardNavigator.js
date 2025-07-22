import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CoursesScreen } from "../screens/studentScreens/coursesScreen";
import { SingleCourseScreen } from "../screens/studentScreens/singleCourseScreen";
import { DashBoardScreen } from "../screens/studentScreens/dashBoardScreen";

const Stack = createNativeStackNavigator();

export const DashboardNavigator = () => {

  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Dashboard" component={DashBoardScreen} />
      <Stack.Screen name="SingleCourse" component={SingleCourseScreen} />
    </Stack.Navigator>
  );
};
