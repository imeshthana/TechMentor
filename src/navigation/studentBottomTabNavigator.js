import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { purple, lightPurple, blue } from "../utils/constants";
import { AIBotScreen } from "../screens/studentScreens/aiBotScreen";
import { ProfileScreen } from "../screens/profileScreen";
import { CourseNavigator } from "./courseNavigator";
import { DashboardNavigator } from "./dashBoardNavigator";

const Tab = createBottomTabNavigator();

export const StudentBottomTabNavigator = () => {
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
        name="Courses"
        component={CourseNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="menu-book" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="grid-outline" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AI Bot"
        component={AIBotScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubbles-outline" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
