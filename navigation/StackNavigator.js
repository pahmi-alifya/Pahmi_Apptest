import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import ContactScreen from "../screens/ContactScreen";

const RootStack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#22d48a" },
  headerTitleStyle: { color: "white", fontSize: 20 },
  headerTitleAlign: "center",
  headerTintColor: "white",
};

const StackNavigator = () => {
  return (
    <RootStack.Navigator
      headerMode="none"
      initialRouteName="Home"
      screenOptions={globalScreenOptions}
    >
      <RootStack.Screen
        name="Home"
        component={HomeScreen}
        // options={{ headerShown: false, headerLeft: () => null }}
      />
      <RootStack.Screen
        name="Contact"
        component={ContactScreen}
        // options={{ headerShown: false, headerLeft: () => null }}
      />
    </RootStack.Navigator>
  );
};

export default StackNavigator;
