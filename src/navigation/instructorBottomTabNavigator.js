import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { purple } from "../utils/constants";
import { AddCourseScreen } from "../screens/instructorScreens/addCourseScreen";
import { ProfileScreen } from "../screens/profileScreen";
import { InstructorDashboardNavigator } from "./instructorDashboardNavigator";

const Tab = createBottomTabNavigator();

export const InstructorBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: purple,
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
          height: 70,
          paddingBottom: 5,
          paddingTop: 5,
          backgroundColor: "#fff",
          borderTopWidth: 0.5,
          borderTopColor: "#ddd",
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={InstructorDashboardNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="bar-chart-outline" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Add Course"
        component={AddCourseScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="post-add" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-circle" size={22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
