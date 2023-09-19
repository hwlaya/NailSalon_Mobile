import React from "react";
import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  useColorScheme,
} from "react-native";
import { Button } from "react-native-paper";

const Header = () => {
  const darkMode = useColorScheme();
  return (
    <>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={darkMode == "dark" ? "#fff" : "#000"}
      />
      <View style={styles.headerContainer}>
        <View style={styles.leftContent}>
          <Button
            icon="menu"
            mode="text"
            textColor="#000"
            iconSize={50}
            style={styles.menuStyle}
          />
        </View>
        <Image
          source={require("../assets/images/logo_text.png")}
          style={styles.logoStyle}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: "20%",
    width: "100%",
    // padding: 8,
    paddingHorizontal: 10,
    backgroundColor: "#f8c5c5",
    jusitfyContent: "space-between",
    // alignItems: "center",
  },
  headerText: {
    color: "#ffff",
    fontSize: 18,
  },
  headerStyle: {
    height: 82,
    width: 100,
    alignSelf: "center",
  },
  logoStyle: {
    height: "60%",
    width: "40%",
    alignSelf: "center",
  },
  menuStyle: {
    alignSelf: "flex-start",
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  searchStyle: {
    alignSelf: "flex-end",
  },
  rightContent: {
    flexDirection: "row",
    alignSelf: "flex-end",
  },
});

export default Header;
