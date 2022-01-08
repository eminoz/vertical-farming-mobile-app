import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import { Button } from "react-native";
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "home screen" }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailsScreen}
          initialParams={{ itemId: 12 }}
          options={headerOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const headerOptions = () => {
  return {
    headerRight: () => (
      <Button
        onPress={() => alert("This is a button!")}
        title="Info"
        color="#2f4f4f"
      />
    ),
    title: "My home",
    headerStyle: {
      backgroundColor: "#dcdcdc",
    },
    headerTintColor: "#2f4f4f",
    headerTitleStyle: {
      fontWeight: "bold",
    },
  };
};

export default App;
