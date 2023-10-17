import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ProgressBar } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import api from "../../config/api";
import RNDateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import WeeklyCalendar from "react-native-weekly-calendar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Datepicker,
  IndexPath,
  Input,
  Select,
  SelectItem,
  Text,
} from "@ui-kitten/components";
import moment from "moment";

const options = ["Branch 1", "Branch 2", "Branch 3"];

const Booking = () => {
  const route = useRoute();
  const [progress, setProgress] = useState(0.25);
  const [page, setPage] = useState(1);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState([]);

  const [selectedDate, setSelect] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(new IndexPath(0));
  const displayValue = options[selectedBranch.row];

  return (
    <View style={styles.container}>
      <ProgressBar
        color="#F8C5C5"
        // progress={progress}
        animatedValue={progress}
        style={{ backgroundColor: "#fff2d1" }}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {page === 1 ? (
          <View style={styles.bodyContainer}>
            <WeeklyCalendar style={{ height: 300 }} />
            <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
              <Datepicker label={`Choose a Date`} />
              <TouchableOpacity
                onPress={() => {
                  setTimePickerVisible(true);
                }}
                style={{ marginTop: 10 }}
              >
                <Text category="label" appearance="hint">
                  Choose a Time
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#dde1eb",
                    backgroundColor: "#edf0f4",
                    borderRadius: 3,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                  }}
                >
                  <Text style={{ fontSize: 16 }}>{selectedTime}</Text>
                </View>
              </TouchableOpacity>
              <Select
                style={{ width: "100%" }}
                label={`Choose a Branch`}
                value={displayValue}
                selectedIndex={selectedBranch}
                onSelect={(index) => {
                  setSelectedBranch(index);
                }}
              >
                {options.map((item, index) => {
                  return <SelectItem key={index} title={item} />;
                })}
              </Select>
            </View>
            {timePickerVisible && (
              <RNDateTimePicker
                mode="time"
                value={new Date()}
                style={{ width: 300, opacity: 1, height: 30, marginTop: 50 }}
                onChange={(e, date) => {
                  if (e.type === "set") {
                    setSelectedTime(moment(date).format("hh:mm A"));
                    setTimePickerVisible(false);
                  } else {
                    setTimePickerVisible(false);
                  }
                }}
              />
            )}
          </View>
        ) : page === 2 ? (
          <View style={styles.bodyContainer}>
            <Text>Page 2</Text>
          </View>
        ) : page === 3 ? (
          <View style={styles.bodyContainer}>
            <Text>Page 3</Text>
          </View>
        ) : (
          <View style={styles.bodyContainer}>
            <Text>Page 4</Text>
          </View>
        )}
      </ScrollView>
      {/* BUTTON NAVIGATOR SA BABA */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginVertical: 30,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#dc3545",
            paddingVertical: 15,
            paddingHorizontal: 20,
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => {
            if (progress === 0.25) {
              Alert.alert("Warning!", "Already at the first page!");
            } else {
              let tempProgress = progress;
              tempProgress = tempProgress - 0.25;
              setPage(page - 1);
              setProgress(tempProgress);
            }
          }}
        >
          <Icon name="chevron-left" size={20} color={"#fff"} />
          <Text style={{ color: "#fff" }}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#198754",
            paddingVertical: 15,
            paddingHorizontal: 20,
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => {
            if (progress === 1) {
              Alert.alert("Warning!", "Already at the last page!");
            } else {
              let tempProgress = progress;
              tempProgress = tempProgress + 0.25;
              setPage(page + 1);
              setProgress(tempProgress);
            }
          }}
        >
          <Text style={{ color: "#fff" }}>Next</Text>
          <Icon name="chevron-right" size={20} color={"#fff"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
