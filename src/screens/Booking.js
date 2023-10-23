import React, { useEffect, useState } from "react";
import {
  Dimensions,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ProgressBar, Card } from "react-native-paper";
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
  Layout,
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
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(new IndexPath(0));
  const displayValue = options[selectedBranch.row];

  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsAddOns, setProductAddOns] = useState([]);
  const [packages, setPackages] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    api
      .get("services-page")
      .then((response) => {
        setServices(response.data.services);
        setProducts(response.data.products);
        setProductAddOns(response.data.products_add_ons);
        setPackages(response.data.packages);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

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
              <Datepicker
                label={`Choose a Date`}
                min={moment().add(1, "days").toDate()}
                // renderDay={renderDay}
                onSelect={(date) => setSelectedDate(date)}
              />
              {selectedDate && (
                <View style={{ marginTop: 10 }}>
                  <Text>{moment(selectedDate).format("DD MM, YYYY")}</Text>
                </View>
              )}
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
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <Card style={styles.cardStyle}>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-evenly",
                  }}
                >
                  <View>
                    <Text category="h6">General Services</Text>
                    {products.length > 0
                      ? products.map((item, index) => {
                          if (index <= 11) {
                            return (
                              <View key={index}>
                                <Text>
                                  {item.product_name} {item.price}
                                </Text>
                              </View>
                            );
                          }
                        })
                      : null}
                  </View>
                  <View>
                    <Text category="h6"> Nail Extension</Text>
                    {products.length > 0
                      ? products.map((item, index) => {
                          if (index >= 12 && index <= 16) {
                            return (
                              <View key={index}>
                                <Text>
                                  {item.product_name} {item.price}
                                </Text>
                              </View>
                            );
                          }
                        })
                      : null}
                  </View>
                  <View>
                    <Text category="h6"> Waxing</Text>
                    {products.length > 0
                      ? products.map((item, index) => {
                          if (index >= 17 && index <= 22) {
                            return (
                              <View key={index}>
                                <Text>
                                  {item.product_name} {item.price}
                                </Text>
                              </View>
                            );
                          }
                        })
                      : null}
                  </View>
                  <View>
                    <Text category="h6"> Eyelash</Text>
                    {products.length > 0
                      ? products.map((item, index) => {
                          if (index >= 23 && index <= 24) {
                            return (
                              <View key={index}>
                                <Text>
                                  {item.product_name} {item.price}
                                </Text>
                              </View>
                            );
                          }
                        })
                      : null}
                  </View>
                  <View>
                    <Text category="h6"> Eyelash Extension</Text>
                    {products.length > 0
                      ? products.map((item, index) => {
                          if (index >= 25 && index <= 27) {
                            return (
                              <View key={index}>
                                <Text>
                                  {item.product_name} {item.price}
                                </Text>
                              </View>
                            );
                          }
                        })
                      : null}
                  </View>
                </View>
              </Card>
              <View>
                <Layout style={{ marginTop: 20 }}>
                  <Select
                    style={{
                      width: 380,
                      height: 400,
                      alignSelf: "flex-start",
                      padding: 10,
                    }}
                    label="Select a Service"
                    alignment="start"
                    value={selectedService}
                    onSelect={(index) =>
                      setSelectedService(services[index.row])
                    }
                  >
                    {services.map((service, index) => (
                      <SelectItem key={index} title={service.service_name} />
                    ))}
                  </Select>
                </Layout>
              </View>
            </View>
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
  cardStyle: {
    flexDirection: "row",
    width: 380,
    height: 390,
    borderRadius: 20,
    margin: 10,
  },
});

export default Booking;
