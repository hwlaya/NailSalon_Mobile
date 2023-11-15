import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
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
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import IndexScreen from "../screens/IndexScreen";
import Profile from "../screens/Profile";
import Booking from "../screens/Booking";
import BookingList from "../screens/BookingList";
import BookingDetails from "../screens/BookingDetails";
import BookingReview from "../screens/BookingReview";
import Customization from "../screens/Customization";
import { Divider, Drawer } from "react-native-paper";
import { UserContext } from "../providers/UserProvider";

const AuthStack = createNativeStackNavigator();
const DrawerStackNav = createDrawerNavigator();

const CustomHeader = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View
      style={{
        backgroundColor: "#f9e2e1",
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {route.name !== "Booking" ? (
        <TouchableOpacity
          style={{ justifyContent: "center", marginTop: "7%" }}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer)}
        >
          <Icon name="menu" size={35} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{ justifyContent: "center", marginTop: "7%" }}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={35} />
        </TouchableOpacity>
      )}
      {route.name !== "Booking" && (
        <Image
          source={require("../assets/images/logo_text.png")}
          style={{
            width: 125,
            height: 90,
            alignSelf: "center",
            marginRight: 30,
          }}
        />
      )}
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
      <Drawer.Section style={{ paddingTop: 50 }}>
        <View style={{ flexDirection: "row" }}>
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
            navigation.navigate("IndexScreen");
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
        <Drawer.Item
          label="Booking List"
          active={active == "BookingList"}
          icon={() => (
            <Icon name="calendar-check" size={30} color={"#F8C5C5"} />
          )}
          onPress={() => {
            navigation.navigate("BookingList");
          }}
        />
        <Drawer.Item
          label="Customization"
          active={active == "Customization"}
          icon={() => (
            <Icon name="palette-outline" size={30} color={"#F8C5C5"} />
          )}
          onPress={() => {
            navigation.navigate("Customization");
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
        name="IndexScreen"
        component={IndexScreen}
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
      <DrawerStackNav.Screen
        name="BookingList"
        component={BookingList}
        options={{
          header: () => <CustomHeader />,
        }}
      />
      <DrawerStackNav.Screen
        name="BookingDetails"
        component={BookingDetails}
        options={{
          header: () => <CustomHeader />,
        }}
      />
      <DrawerStackNav.Screen
        name="BookingReview"
        component={BookingReview}
        options={{
          header: () => <CustomHeader />,
        }}
      />
      <DrawerStackNav.Screen
        name="Customization"
        component={Customization}
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
