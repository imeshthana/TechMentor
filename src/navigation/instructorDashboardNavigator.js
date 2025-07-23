import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SingleCourseScreen } from "../screens/instructorScreens/singleCourseScreen";
import { InstructorDashboardScreen } from "../screens/instructorScreens/dashboardScreen";
import { EditCourseScreen } from "../screens/instructorScreens/editCourseScreen";

const Stack = createNativeStackNavigator();

export const InstructorDashboardNavigator = () => {

  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Dashboard" component={InstructorDashboardScreen} />
      <Stack.Screen name="SingleCourse" component={SingleCourseScreen} />
      <Stack.Screen name="EditCourse" component={EditCourseScreen} />
    </Stack.Navigator>
  );
};
