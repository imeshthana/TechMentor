import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CoursesScreen } from "../screens/studentScreens/coursesScreen";
import { SingleCourseScreen } from "../screens/studentScreens/singleCourseScreen";

const Stack = createNativeStackNavigator();

export const CourseNavigator = () => {

  return (
    <Stack.Navigator
      initialRouteName="Courses"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Courses" component={CoursesScreen} />
      <Stack.Screen name="SingleCourse" component={SingleCourseScreen} />
    </Stack.Navigator>
  );
};
