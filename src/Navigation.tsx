import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Header } from "./components/Header";

import { MainScreen } from "./screens/MainScreen";
import { CollectionScreen } from "./screens/CollectionScreen";
const Stack = createNativeStackNavigator();

const options = {
  headerShown: false,
};

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Header />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={MainScreen} options={options} />
        <Stack.Screen
          name="Collection"
          component={CollectionScreen}
          options={options}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
