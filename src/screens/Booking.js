import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { ProgressBar, Card, Button } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
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
  Radio,
  RadioGroup,
  useTheme,
} from "@ui-kitten/components";
import moment from "moment";
import { UserContext } from "../providers/UserProvider";

const options = ["Select a Branch", "Sampaloc Manila", "Quezon City"];

const Booking = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();

  const [progress, setProgress] = useState(0.25);
  const [page, setPage] = useState(1);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [staff, setStaff] = useState(0);
  const [selectedStaff, setSelectedStaff] = useState();
  const [timeIn, setTimeIn] = useState("");
  const [timeOut, setTimeOut] = useState("");
  const [selectedBranch, setSelectedBranch] = useState(new IndexPath(0));
  const displayValue = options[selectedBranch.row];

  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsAndPackages, setProductsAndPackages] = useState([]);
  const [productsAddOns, setProductAddOns] = useState([]);
  const [packages, setPackages] = useState([]);

  const [selectedService, setSelectedService] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [productValue, setProductValue] = useState("");
  const [productValue1, setProductValue1] = useState("");
  const [productValue2, setProductValue2] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [testProduct, setTestProduct] = useState(new IndexPath(0));
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState();

  const user = useContext(UserContext);
  const [fname, setFname] = useState(user.user.first_name);
  const [lname, setLname] = useState(user.user.last_name);
  const [phone, setPhone] = useState(user.userProfile.contact_no);
  const [email, setEmail] = useState(user.user.email);

  useEffect(() => {
    api
      .get("services-page")
      .then((response) => {
        setServices(response.data.services);
        setProducts(response.data.products);
        setProductAddOns(response.data.products_add_ons);
        setPackages(response.data.packages);

        const tempProducts = response.data.products;
        const tempPackages = response.data.packages;

        let tempAllProductsAndPackage = [];

        tempProducts.map((item, index) => {
          tempAllProductsAndPackage.push(item);
        });

        tempPackages.map((item, index) => {
          tempAllProductsAndPackage.push(item);
        });

        setProductsAndPackages(tempAllProductsAndPackage);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const price = parseFloat(productValue.split("₱")[1]) || 0;
    const price1 = parseFloat(productValue1.split("₱")[1]) || 0;
    const price2 = parseFloat(productValue2.split("₱")[1]) || 0;

    const tempPrice = price + price1 + price2;
    setTotalPrice(tempPrice);
  }, [productValue, productValue1, productValue2]);

  const calculateTotalPrice = () => {
    console.log("Total Price:", totalPrice);
  };

  return (
    <View style={styles.container}>
      <ProgressBar
        color="#F8C5C5"
        animatedValue={progress}
        style={{ backgroundColor: "#fff2d1" }}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {page === 1 ? (
          <View style={styles.bodyContainer}>
            <Text style={styles.textStyle}> Pick Schedule and Branch</Text>
            <WeeklyCalendar style={{ height: 300 }} />
            <View style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
              <Datepicker
                label={`Choose a Date`}
                min={moment().add(1, "days").toDate()}
                date={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                }}
              />
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
            <Text style={styles.textStyle}> Choose Services</Text>
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

              <Card style={styles.packagecardStyle}>
                <View style={{ flexDirection: "column" }}>
                  {packages.map((item, index) => {
                    return (
                      <View key={index} style={styles.packageContainer}>
                        <Text category="h6">{item.package_name}</Text>
                        <Text>Price: {item.price}</Text>
                        <View style={styles.productContainer}>
                          {item.products.map((product, productIndex) => (
                            <View key={productIndex} style={styles.productItem}>
                              <Text>{product.product_name}</Text>
                              <Text></Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    );
                  })}
                </View>
              </Card>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                <Layout style={{ marginTop: 20 }}>
                  <Select
                    style={{
                      width: 380,
                      alignSelf: "flex-start",
                      padding: 10,
                    }}
                    label="Select a Service"
                    alignment="start"
                    value={
                      productValue ||
                      (selectedProduct
                        ? selectedProduct.product_name !== undefined
                          ? selectedProduct.product_name
                          : selectedProduct.package_name !== undefined
                          ? selectedProduct.package_name
                          : null
                        : "")
                    }
                    onSelect={(index) => {
                      console.log(productsAndPackages[index - 1]);
                      const selected = productsAndPackages[index - 1];
                      setSelectedProduct(selected);
                      setProductValue(
                        `${
                          selected.product_name !== undefined
                            ? selected.product_name
                            : selected.package_name !== undefined
                            ? selected.package_name
                            : null
                        } ₱${selected.price}`
                      );

                      // console.log(productValue);
                    }}
                  >
                    {/* <SelectItem title="None" /> */}
                    {products.map((product, index) => (
                      <SelectItem key={index} title={product.product_name} />
                    ))}
                    {packages.map((packages, index) => {
                      return (
                        <SelectItem
                          key={products.length + index}
                          title={packages.package_name}
                        />
                      );
                    })}
                  </Select>
                  <Select
                    style={{
                      width: 380,
                      alignSelf: "flex-start",
                      padding: 10,
                    }}
                    label="Select a Service"
                    alignment="start"
                    value={
                      productValue1 ||
                      (selectedProduct
                        ? selectedProduct.product_name !== undefined
                          ? selectedProduct.product_name
                          : selectedProduct.package_name !== undefined
                          ? selectedProduct.package_name
                          : null
                        : "")
                    }
                    onSelect={(index) => {
                      console.log(productsAndPackages[index - 1]);
                      const selected = productsAndPackages[index - 1];
                      setSelectedProduct(selected);
                      setProductValue1(
                        `${
                          selected.product_name !== undefined
                            ? selected.product_name
                            : selected.package_name !== undefined
                            ? selected.package_name
                            : null
                        } ₱${selected.price}`
                      );

                      console.log(productValue1);
                    }}
                  >
                    {products.map((product, index) => (
                      <SelectItem key={index} title={product.product_name} />
                    ))}
                    {packages.map((packages, index) => {
                      return (
                        <SelectItem
                          key={products.length + index}
                          title={packages.package_name}
                        />
                      );
                    })}
                  </Select>
                  <Select
                    style={{
                      width: 380,
                      alignSelf: "flex-start",
                      padding: 10,
                    }}
                    label="Select a Service"
                    alignment="start"
                    value={
                      productValue2 ||
                      (selectedProduct
                        ? selectedProduct.product_name !== undefined
                          ? selectedProduct.product_name
                          : selectedProduct.package_name !== undefined
                          ? selectedProduct.package_name
                          : null
                        : "")
                    }
                    onSelect={(index) => {
                      console.log(productsAndPackages[index - 1]);
                      const selected = productsAndPackages[index - 1];
                      setSelectedProduct(selected);
                      setProductValue2(
                        `${
                          selected.product_name !== undefined
                            ? selected.product_name
                            : selected.package_name !== undefined
                            ? selected.package_name
                            : null
                        } ₱${selected.price}`
                      );

                      console.log(productValue2);
                    }}
                  >
                    {products.map((product, index) => (
                      <SelectItem key={index} title={product.product_name} />
                    ))}
                    {packages.map((packages, index) => {
                      return (
                        <SelectItem
                          key={products.length + index}
                          title={packages.package_name}
                        />
                      );
                    })}
                  </Select>
                </Layout>
              </View>
              {/* Display the total price */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  width: "93%",
                }}
              >
                <Text category="h6">Total: ₱{totalPrice}</Text>
              </View>
            </View>
          </View>
        ) : page === 3 ? (
          <View style={styles.bodyContainer}>
            <Text style={styles.textStyle}> Assigned Technician</Text>
            <>
              <RadioGroup
                selectedIndex={selectedStaff}
                onChange={(index) => {
                  console.log("RadioGroup - Selected Index:", index);
                  console.log("RadioGroup - Selected Item:", staff[index]); // Log the selected staff item
                  setSelectedStaff(index); //  update the state
                }}
              >
                {staff.length > 0 &&
                  staff.map((item, index) => {
                    return (
                      <View style={styles.p3container} key={index}>
                        <View style={styles.p3content}>
                          <Card style={styles.tcardStyle}>
                            <Image
                              source={{
                                uri: `https://graceynails.com/NailSalonProject-main/public/img/profile_pictures/${item.id}/${item.staff_image}`,
                              }}
                              style={styles.imageStyle}
                            />
                          </Card>
                          <Radio
                            onChange={() => {
                              setSelectedStaff(index);
                            }}
                            checked={selectedStaff === index}
                          >
                            {`Option ${index + 1}`}
                          </Radio>
                          <Text>Name: {item.staff_name}</Text>
                          <Text>Services:</Text>
                          {item.services.map((service) => (
                            <Text key={service.id}>{service.service_name}</Text>
                          ))}
                        </View>
                      </View>
                    );
                  })}
              </RadioGroup>
            </>
          </View>
        ) : (
          <View style={styles.bodyContainer}>
            <Text style={styles.textStyle}> Summary Form </Text>
            <Text category="h6">Customer Details</Text>
            <Input
              placeholder="Place your Text"
              value={fname}
              style={styles.inputStyle}
              disabled="true"
              onChangeText={(nextValue) => setValue(nextValue)}
            />
            <Input
              placeholder="Place your Text"
              value={lname}
              style={styles.inputStyle}
              disabled="true"
              onChangeText={(nextValue) => setValue(nextValue)}
            />
            <Input
              placeholder="Place your Text"
              value={phone}
              style={styles.inputStyle}
              disabled="true"
              onChangeText={(nextValue) => setValue(nextValue)}
            />
            <Input
              placeholder="Place your Text"
              value={email}
              style={styles.inputStyle}
              disabled="true"
              onChangeText={(nextValue) => setValue(nextValue)}
            />
            <Text category="h6">Booking Details</Text>
            <Input
              placeholder="Place your Text"
              value={moment(selectedDate).format("LL")}
              style={styles.inputStyle}
              disabled="true"
              onChangeText={(nextValue) => setValue(nextValue)}
            />
            <Input
              placeholder="Place your Text"
              value={selectedTime}
              style={styles.inputStyle}
              disabled="true"
              onChangeText={(nextValue) => setValue(nextValue)}
            />
            <Input
              placeholder="Place your Text"
              value={displayValue}
              style={styles.inputStyle}
              disabled="true"
              onChangeText={(nextValue) => setValue(nextValue)}
            />
            <Text category="h6">Service Details</Text>
            <Input
              placeholder="Place your Text"
              value={productValue}
              style={styles.inputStyle}
              disabled="true"
              onChangeText={(nextValue) => setValue(nextValue)}
            />
            <Input
              placeholder="Place your Text"
              value={productValue1}
              style={styles.inputStyle}
              disabled="true"
              onChangeText={(nextValue) => setValue(nextValue)}
            />
            <Input
              placeholder="Place your Text"
              value={productValue2}
              style={styles.inputStyle}
              disabled="true"
              onChangeText={(nextValue) => setValue(nextValue)}
            />
            <Text category="h6">Technician Details</Text>
            <Input
              placeholder="Place your Text"
              value={staff[selectedIndex].staff_name}
              style={styles.inputStyle}
              disabled="true"
              onChangeText={(nextValue) => setValue(nextValue)}
            />
            <View>
              <Text>Total: </Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Input
                placeholder="Place your Text"
                value={`₱${String(totalPrice)}`}
                style={styles.inputStyle}
                disabled="true"
                onChangeText={(nextValue) => setValue(nextValue)}
              />
            </View>
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
          onPress={async () => {
            if (page === 4) {
              const formdata = new FormData();
              formdata.append("user_id", user.user.id);
              formdata.append("date", moment(selectedDate).format("LL"));
              formdata.append("time_in", timeIn);
              formdata.append("time_out", timeOut);
              formdata.append("branch", "Sampaloc Manila");
              formdata.append("staff_id", selectedStaff);
              formdata.append("service1", productValue.split("₱")[0]);
              formdata.append("service2", productValue1.split("₱")[0]);
              formdata.append("service3", productValue2.split("₱")[0]);
              formdata.append("total_price", totalPrice);

              try {
                const response = await api.post("booking", formdata);
                Alert.alert("Success!", "Booking Successfully Created");
                navigation.navigate("IndexScreen");
              } catch (err) {
                console.log(err.response);
              }
            } else if (progress === 1) {
              Alert.alert("Warning!", "Already at the last page!");
            } else {
              let tempProgress = progress;
              tempProgress = tempProgress + 0.25;
              setPage(page + 1);
              setProgress(tempProgress);
            }

            if (page === 1) {
              let date = moment(selectedDate).format("YYYY-MM-DD");

              const time = moment(selectedTime, "hh:mm A").format("hh:mm:ss");
              const datetime = `${date}T${time}`; //ISO
              setTimeIn(
                `${moment(selectedDate).format("YYYY-MM-DD")} ${selectedTime}`
              );
              setTimeOut(
                moment(datetime)
                  .add(1, "hour")
                  .add(30, "minutes")
                  .format(`YYYY-MM-DD hh:mm A`)
              );
              console.log(
                `${moment(selectedDate).format("YYYY-MM-DD")} ${selectedTime}`
              );
              console.log(
                moment(datetime)
                  .add(1, "hour")
                  .add(30, "minutes")
                  .format(`YYYY-MM-DD hh:mm A`)
              );
              api
                .get("getAvailableStaff", {
                  params: {
                    time_in: `${moment(selectedDate).format(
                      "YYYY-MM-DD"
                    )} ${selectedTime}`,
                    time_out: moment(datetime)
                      .add(1, "hour")
                      .add(30, "minutes")
                      .format(`YYYY-MM-DD hh:mm A`),
                    serviceType1: 1,
                    serviceType2: 1,
                    serviceType3: 1,
                    userId: 3,
                  },
                })
                .then((response) => {
                  setStaff(response.data.staff);
                  console.log(response.data.staff);
                });
            }
          }}
        >
          <Text style={{ color: "#fff" }}>{page == 4 ? "Submit" : "Next"}</Text>
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
    margin: 1,
  },
  packagecardStyle: {
    flexDirection: "row",
    width: 380,
    height: "55%",
    borderRadius: 20,
    margin: 1,
    padding: 10,
  },
  packageContainer: {
    marginBottom: -10,
  },
  productContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    // justifyContent: "space-evenly",
  },
  productItem: {
    margin: 2,
  },
  p3container: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 30,
  },
  p3content: {
    justifyContent: "center",
    alignItems: "center",
  },
  tcardStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 320,
    borderRadius: 20,
    margin: 10,
  },
  imageStyle: {
    height: 300,
    width: 170,
    borderRadius: 10,
  },

  textStyle: {
    paddingLeft: "2%",
    marginTop: "1%",
    marginBottom: "1%",
    fontFamily: "Montserrat-Medium",
    fontSize: 26,
  },

  inputStyle: {
    padding: 6,
    justifyContent: "center",
    width: "50%",
    borderRadius: 10,
  },
});

export default Booking;
