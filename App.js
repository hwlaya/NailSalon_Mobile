import "react-native-gesture-handler";
// In App.js in a new project

import * as React from "react";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainNavigation from "./src/Navigation/MainNavigation";
import { PaperProvider } from "react-native-paper";
import { UserProvider } from "./src/providers/UserProvider";
import { SplashScreen } from "react-native-splash-screen";
import { useFonts } from "expo-font";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";

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
      <ApplicationProvider {...eva} theme={eva.light}>
        <PaperProvider>
          <UserProvider>
            <MainNavigation />
          </UserProvider>
        </PaperProvider>
      </ApplicationProvider>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
