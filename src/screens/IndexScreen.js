import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";
import { useRoute } from "@react-navigation/native";

const IndexScreen = () => {
  const route = useRoute();

  useEffect(() => {
    console.log(route.params);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>
          {/* {" "}
          {route.params.user.first_name} {route.params.user.last_name} */}
        </Text>
        <Text> Welcome to the Home Screen </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IndexScreen;
