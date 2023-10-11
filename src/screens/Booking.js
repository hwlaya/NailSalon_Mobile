import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import api from "../../config/api";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const Booking = () => {
  const route = useRoute();

  const [selectedDate, setSelect] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState([]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.bodyContainer}>
          <Text
            variant="headlineLarge"
            style={{
              paddingLeft: "5%",
              marginTop: "8%",
              marginBottom: "5%",
              fontFamily: "Montserrat-Medium",
            }}
          >
            {" "}
            Booking
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Booking;
