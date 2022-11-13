import * as React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Header } from "./components/Header";

import { MainScreen } from "./screens/MainScreen";
import { CollectionScreen } from "./screens/CollectionScreen";
import { ScannerScreen } from "./screens/ScannerScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View } from "react-native";
import { Text } from "react-native";
import { ChatMainScreen } from "./chat-module/ChatMainScreen";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const options = {
  headerShown: false,
};

const MainNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={MainScreen} options={options} />
      <Stack.Screen
        name="Collection"
        component={CollectionScreen}
        options={options}
      />
      <Stack.Screen name="Scanner" component={ScannerScreen} options={options} />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const ChatNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="@BlackPinkConcert"
      overlayColor="transparent"
      drawerStyle={{ backgroundColor: "black" }}
      drawerContentOptions={{
        activeTintColor: "white",
        labelStyle: {
          fontWeight: "800",
        },
        inactiveTintColor: "#878787",
      }}
    >
      <Drawer.Screen name="@BlackPinkConcert" component={ChatMainScreen} />
      <Drawer.Screen name="@FallOutBoysConcert" component={ChatMainScreen} />
      <Drawer.Screen name="@PHWeb3Festival" component={ChatMainScreen} />
      <Drawer.Screen name="@GreenDay" component={ChatMainScreen} />
    </Drawer.Navigator>
  );
};

export const Navigation = () => {
  const [currentRoute, setCurrentRoute] = React.useState("");
  const routeNameRef = React.createRef();
  const navigationRef = React.createRef();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
        setCurrentRoute(navigationRef.current.getCurrentRoute().name);
      }}
      onStateChange={() => {
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
        console.log(navigationRef.current.getCurrentRoute());
        setCurrentRoute(currentRouteName);
        routeNameRef.current = currentRouteName;
      }}
    >
      <Header page={currentRoute} />
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: "black" }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "ios-home" : "ios-home-outline";
            } else if (route.name === "Connect") {
              iconName = focused ? "ios-chatbox" : "ios-chatbox-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarStyle: { backgroundColor: "#000000" },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={MainNavigation} options={options} />
        <Tab.Screen name="Connect" component={ChatNavigation} options={options} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
