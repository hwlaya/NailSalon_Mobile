import "react-native-gesture-handler";
// In App.js in a new project

import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/Auth/Login";
import IndexScreen from "./src/screens/IndexScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainNavigation from "./src/Navigation/MainNavigation";
import { PaperProvider } from "react-native-paper";
import { UserProvider } from "./src/providers/UserProvider";
import { useFonts } from "expo-font";
import Carousel from "react-native-snap-carousel";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Montserrat-Black": require("./src/assets/fonts/Montserrat-Black.ttf"),
    "Montserrat-Bold": require("./src/assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Light": require("./src/assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Medium": require("./src/assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Regular": require("./src/assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Thin": require("./src/assets/fonts/Montserrat-Thin.ttf"),
  });

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <UserProvider>
          <MainNavigation />
        </UserProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
