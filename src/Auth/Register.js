import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Button, Text, TextInput, Card, HelperText } from "react-native-paper";
import Loading from "../components/Loading";
import api from "../../config/api";
import moment from "moment";

const Register = () => {
  const navigation = useNavigation();
  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [bday, setBday] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  //Helper
  const [errorhelper, setErrorHelper] = useState(false);
  const [isDateOfBirthValid, setIsDateOfBirthValid] = useState(false);

  const validateDateOfBirth = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    const isValid = regex.test(dateString);
    setIsDateOfBirthValid(isValid);
    return isValid;
  };

  useEffect(() => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (phone[0] == 0 || phone.length > 11) {
      setErrorHelper(true);
    } else {
      setErrorHelper(false);
    }

    const isValid = regex.test(bday);
    setIsDateOfBirthValid(isValid);

    console.log(bday);
    console.log(isValid);
  }, [phone, bday]);

  //loading
  const [loading, setLoading] = useState(false);

  const onSubmitRegister = () => {
    // setLoading(true);
    if (password !== cpassword) {
      Alert.alert(
        "Password Mismatch!",
        "Please make sure that your password is the same!"
      );
      // setLoading(false);
    } else if (!isDateOfBirthValid) {
      Alert.alert("Invalid Format!", "Date format must be YYYY-MM-DD");
      // setLoading(false);
    } else if (errorhelper) {
      Alert.alert(
        "Invalid Phone format",
        "Must be 10 characters and first character must be not 0"
      );
      // setLoading(false);
    } else {
      api
        .post("register", {
          first_name: fname,
          middle_name: mname,
          last_name: lname,
          birthday: moment(bday).format("YYYY-MM-DD"),
          contact_no: phone,
          email: email,
          username: uname,
          password: password,
          confirm_password: cpassword,
          address: address,
          is_notify: false,
        })

        .then((response) => {
          // setLoading(false);
          console.log(response);
          Alert.alert(
            "Success!",
            "Account has been registered. Proceed to login!"
          );
          navigation.navigate("Login");
        })
        .catch((err) => {
          // setLoading(false);
          console.log(err.response);
        });
    }
  };
  return (
    <View style={styles.container}>
      <Loading loading={loading} />
      <View style={[styles.topHalf]}>
        <Button
          icon="arrow-left"
          mode="text"
          textColor="#000"
          style={{
            alignSelf: "flex-start",
            marginTop: 10,
          }}
          onPress={() => {
            navigation.navigate("Login");
          }}
        />
      </View>
      <View style={styles.bodyContainer}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ alignItems: "center", marginVertical: 10, flex: 0.8 }}>
            <Card style={{ width: "85%", paddingVertical: 8 }}>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Text
                  variant="displaySmall"
                  style={{ fontFamily: "Montserrat-Regular" }}
                >
                  Register
                </Text>
                <Text
                  variant="labelMedium"
                  style={{ fontFamily: "Montserrat-Medium" }}
                >
                  Please input all the required requirements to register{" "}
                </Text>
              </View>
              <View style={{ width: "100%", flexDirection: "row" }}>
                <TextInput
                  mode="outlined"
                  outlineColor="#000"
                  activeOutlineColor="#F8C5C5"
                  value={fname}
                  onChangeText={(value) => setFname(value)}
                  label={`First Name`}
                  style={{
                    backgroundColor: "transparent",
                    width: "44.5%",
                    marginRight: -2,
                    marginLeft: 17,
                  }}
                />
                <TextInput
                  mode="outlined"
                  outlineColor="#000"
                  activeOutlineColor="#F8C5C5"
                  value={mname}
                  onChangeText={(value) => setMname(value)}
                  label={`Middle Name`}
                  style={{
                    backgroundColor: "transparent",
                    width: "44.5%",
                    marginLeft: 4,
                  }}
                />
              </View>
              <TextInput
                mode="outlined"
                outlineColor="#000"
                activeOutlineColor="#F8C5C5"
                value={lname}
                onChangeText={(value) => setLname(value)}
                label={`Last Name`}
                style={{
                  backgroundColor: "transparent",
                  width: "90%",
                  alignSelf: "center",
                }}
              />
              <TextInput
                mode="outlined"
                outlineColor="#000"
                activeOutlineColor="#F8C5C5"
                value={bday}
                onChangeText={(value) => {
                  setBday(value);
                }}
                label={`Date of Birth`}
                style={{
                  backgroundColor: "transparent",
                  width: "90%",
                  alignSelf: "center",
                }}
              />
              {!isDateOfBirthValid && (
                <HelperText type="error" visible={!isDateOfBirthValid}>
                  Invalid date format (YYYY-MM-DD)
                </HelperText>
              )}

              <TextInput
                mode="outlined"
                outlineColor="#000"
                activeOutlineColor="#F8C5C5"
                value={address}
                onChangeText={(value) => setAddress(value)}
                label={`Address`}
                style={{
                  backgroundColor: "transparent",
                  width: "90%",
                  alignSelf: "center",
                }}
              />

              <TextInput
                mode="outlined"
                outlineColor="#000"
                activeOutlineColor="#F8C5C5"
                value={phone}
                onChangeText={(value) => setPhone(value)}
                keyboardType="numeric"
                label={`Contact Number`}
                style={{
                  width: "90%",
                  alignSelf: "center",
                }}
              />
              {errorhelper && (
                <HelperText type="error" visible={errorhelper}>
                  Invalid Phone Nnumber Format
                </HelperText>
              )}

              <TextInput
                mode="outlined"
                outlineColor="#000"
                activeOutlineColor="#F8C5C5"
                value={uname}
                onChangeText={(value) => setUname(value)}
                label={`Username`}
                style={{
                  backgroundColor: "transparent",
                  width: "90%",
                  alignSelf: "center",
                }}
              />

              <TextInput
                mode="outlined"
                outlineColor="#000"
                activeOutlineColor="#F8C5C5"
                value={email}
                onChangeText={(value) => setEmail(value)}
                label={`Email Address`}
                style={{
                  backgroundColor: "transparent",
                  width: "90%",
                  alignSelf: "center",
                }}
              />

              <TextInput
                mode="outlined"
                outlineColor="#000"
                activeOutlineColor="#F8C5C5"
                value={password}
                onChangeText={(value) => setPassword(value)}
                label={`Password`}
                secureTextEntry={true}
                style={{
                  backgroundColor: "transparent",
                  width: "90%",
                  alignSelf: "center",
                }}
              />

              <TextInput
                mode="outlined"
                outlineColor="#000"
                activeOutlineColor="#F8C5C5"
                value={cpassword}
                onChangeText={(value) => setCpassword(value)}
                label={`Confirm Password`}
                secureTextEntry={true}
                style={{
                  backgroundColor: "transparent",
                  width: "90%",
                  alignSelf: "center",
                }}
              />
              <View style={{ alignItems: "center", marginTop: "-1%" }}>
                <Button
                  mode="contained"
                  buttonColor="#f9e2e1"
                  style={{
                    marginTop: 15,
                    borderRadius: 5,
                    width: "40%",
                    height: 45,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    onSubmitRegister();
                  }}
                >
                  <Text variant="labelLarge" style={{ color: "black" }}>
                    {" "}
                    SIGN UP{" "}
                  </Text>
                </Button>
              </View>
            </Card>
          </View>
          <View style={[styles.bottomHalf]}>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 1,
              }}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={{ fontFamily: "Montserrat-Light" }}>
                Already have an account?{" "}
                <Text style={{ fontFamily: "Montserrat-Bold" }}>Login</Text>
              </Text>
            </TouchableOpacity>
            <View>
              <Image
                source={require("../assets/images/logo_hand.png")}
                style={styles.hlogoStyle}
              />
            </View>
          </View>
        </ScrollView>
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
    jusitfyContent: "center",
    backgroundColor: "#f9e2e1",
  },
  topHalf: {
    backgroundColor: "#f9e2e1",
    paddingVertical: 8,
  },
  bottomHalf: {
    flex: 0.2,
    backgroundColor: "#FFF",
  },
  hlogoStyle: {
    height: 75,
    width: 200,
    opacity: 0.2,
    marginTop: "8%",
    alignSelf: "center",
  },
});

export default Register;
