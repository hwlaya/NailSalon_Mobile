import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  ScrollView,
} from "react-native";
import { Button, Text, TextInput, Card } from "react-native-paper";
import Loading from "../components/Loading";
import axios from "axios";
import api from "../../config/api";
import { UserContext } from "../providers/UserProvider";
// import Header from "../components/Header";

const screenHeight = Dimensions.get("window").height;

const Login = () => {
  const navigation = useNavigation();
  const user = useContext(UserContext);
  const [email, setEmail] = useState("hanslaya08@gmail.com");
  const [password, setPassword] = useState("Password.123");
  const [loading, setLoading] = useState(false);

  const onSubmitLogin = () => {
    setLoading(true);
    if (email == "" || password == "") {
      Alert.alert("Error!", "Please input your credentials!");
    } else {
      api
        .post("api/login", {
          email: email,
          password: password,
          isMobile: true,
        })
        .then((response) => {
          setLoading(false);
          user.user = response.data.user;
          navigation.navigate("DrawerStack", {
            screen: "Home",
            params: {
              user: response.data.user,
            },
          });
        })
        .catch((err) => {
          setLoading(false);
          console.log(err.response);
          Alert.alert("Invalid Credentials!", "User does not exist!");
        });
    }
  };

  return (
    <View style={styles.container}>
      <Loading loading={loading} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.bodyContainer}>
          <View style={[styles.topHalf]}>
            <View
              style={{
                alignItems: "center",
                marginTop: "10%",
                marginBottom: "-70%",
              }}
            >
              <Image
                source={require("../assets/images/logo_text.png")}
                style={styles.iconStyle}
              />
            </View>
            <View
              style={{
                alignItems: "center",
                flex: 0.65,
                justifyContent: "center",
              }}
            >
              <Card
                style={{ width: "85%", borderRadius: 30, paddingVertical: 8 }}
              >
                <View style={{ alignItems: "center", marginTop: "10%" }}>
                  <Text
                    variant="displaySmall"
                    style={{ fontFamily: "Montserrat-Regular" }}
                  >
                    Login
                  </Text>
                </View>
                <TextInput
                  mode="outlined"
                  outlineColor="#000"
                  activeOutlineColor="#F8C5C5"
                  value={email}
                  onChangeText={(value) => setEmail(value)}
                  label={`Email`}
                  style={{
                    backgroundColor: "transparent",
                    width: "80%",
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
                    width: "80%",
                    alignSelf: "center",
                  }}
                />
                <View style={{ alignItems: "center" }}>
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
                      onSubmitLogin();
                    }}
                  >
                    <Text variant="labelLarge" style={{ color: "black" }}>
                      {" "}
                      LOGIN{" "}
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
                }}
                onPress={() => {
                  navigation.navigate("Register");
                }}
              >
                <Text
                  style={{ fontFamily: "Montserrat-Light", paddingTop: "10%" }}
                >
                  Don't have an account yet?{" "}
                  <Text style={{ fontFamily: "Montserrat-Bold" }}>
                    Register here!
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: "100%",
    // // alignItems: "center",
    // // justifyContent: "center",
    backgroundColor: "#fff",
  },
  bodyContainer: {
    flex: 1,
    justifyContent: "center",
  },
  topHalf: {
    flex: 1,
    backgroundColor: "#f9e2e1",
  },
  bottomHalf: {
    flex: 0.35,
    backgroundColor: "#FFF",
  },
  iconStyle: {
    height: "40%",
    width: "61%",
    // paddingBottom: "10px",
  },
});

export default Login;
