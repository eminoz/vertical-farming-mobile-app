import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackScreen from "./navigator/HomeStackScreen";
import SettingsStackScreen from "./navigator/SettingsStackScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
const Tab = createBottomTabNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Main") {
              iconName = focused ? "home" : "home";
            } else if (route.name === "Setting") {
              iconName = focused ? "settings" : "settings";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Main" component={HomeStackScreen} />
        <Tab.Screen name="Setting" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
