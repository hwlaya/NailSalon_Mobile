import "react-native-gesture-handler";
// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/Auth/Login";
import IndexScreen from "./src/screens/IndexScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainNavigation from "./src/Navigation/MainNavigation";
import { PaperProvider } from "react-native-paper";
import { UserProvider } from "./src/providers/UserProvider";

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

const Stack = createNativeStackNavigator();

function App() {
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

export default App;
