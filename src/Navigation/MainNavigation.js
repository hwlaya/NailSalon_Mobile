import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { DrawerActions, CommonActions } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import IndexScreen from "../screens/IndexScreen";
import Booking from "../screens/Booking";
import Profile from "../screens/Profile";
import { Divider, Drawer } from "react-native-paper";
import { UserContext } from "../providers/UserProvider";

const AuthStack = createNativeStackNavigator();
const DrawerStackNav = createDrawerNavigator();
const BottomTab = createMaterialBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <BottomTab.Navigator
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title;

            return label;
          }}
        />
      )}
    >
      <BottomTab.Screen
        name="Home"
        component={IndexScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            <Icon name="home" size={size} color={color} />;
          },
        }}
      />
    </BottomTab.Navigator>
  );
};

const CustomHeader = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: "#f9e2e1",
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity
        style={{ justifyContent: "center", marginTop: "7%" }}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer)}
      >
        <Icon name="menu" size={35} />
      </TouchableOpacity>
      <Image
        source={require("../assets/images/logo_text.png")}
        style={{ width: 125, height: 90, alignSelf: "center", marginRight: 30 }}
      />
      <View></View>
    </View>
  );
};

const CustomDrawerContent = (props) => {
  const [active, setActive] = useState("");
  const user = useContext(UserContext);
  const navigation = useNavigation();
  return (
    <View>
      <Drawer.Section title={`Menu`}>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              backgroundColor: "#F8C5C5",
              paddingVertical: 15,
              paddingHorizontal: 10,
              flexDirection: "row",
              justifyContent: "center",
              width: 80,
              marginLeft: 20,
              borderRadius: 500,
            }}
          >
            <Icon name="account" size={50} color={"#fff"} />
          </View>
          <View style={{ justifyContent: "center", marginLeft: 20 }}>
            <Text style={{ fontFamily: "Montserrat-Bold", fontSize: 20 }}>
              {user.user.first_name} {user.user.last_name}
            </Text>
            <Text style={{ fontFamily: "Montserrat-Light" }}>
              {user.user.email}
            </Text>
          </View>
        </View>
        <Divider style={{ marginTop: 20 }} />
        <Drawer.Item
          label="Home"
          active={active === "Home"}
          icon={() => <Icon name="home" size={30} color={"#F8C5C5"} />}
          onPress={() => {
            navigation.navigate("BottomNav");
          }}
        />
        <Drawer.Item
          label="Profile"
          active={active === "Profile"}
          icon={() => <Icon name="account" size={30} color={"#F8C5C5"} />}
          onPress={() => {
            navigation.navigate("Profile");
          }}
        />
        <Drawer.Item
          label="Booking"
          active={active == "Booking"}
          icon={() => (
            <Icon name="calendar-heart" size={30} color={"#F8C5C5"} />
          )}
          onPress={() => {
            navigation.navigate("Booking");
          }}
        />
      </Drawer.Section>
      <Drawer.Item
        label="Logout"
        icon={() => <Icon name="logout" size={30} color={"#F8C5C5"} />}
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
    </View>
  );
};

const DrawerStack = () => {
  return (
    <DrawerStackNav.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{ backgroundColor: "white" }}
    >
      <DrawerStackNav.Screen
        name="BottomNav"
        component={BottomTabNavigation}
        options={{
          header: () => <CustomHeader />,
        }}
      />
      <DrawerStackNav.Screen
        name="Profile"
        component={Profile}
        options={{
          header: () => <CustomHeader />,
        }}
      />
      <DrawerStackNav.Screen
        name="Booking"
        component={Booking}
        options={{
          header: () => <CustomHeader />,
        }}
      />
    </DrawerStackNav.Navigator>
  );
};

function MainNavigation() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Register" component={Register} />
        <AuthStack.Screen name="DrawerStack" component={DrawerStack} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;
