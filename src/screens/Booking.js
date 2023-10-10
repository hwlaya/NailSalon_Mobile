import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import api from "../../config/api";
import {DateTimePickerAndroid} from "@react-native-community/datetimepicker";

const Booking = () => {
  const route = useRoute();

  const [selectedDate, setSelect] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState([]);

  return (
    <View>
      <RNDateTimePicker mode="date" />
    </View>
  );
};

export default Booking;
