import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { UserContext } from "../providers/UserProvider";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import api from "../../config/api";
import axios from "axios";

const Profile = () => {
  const navigation = useNavigation();
  const user = useContext(UserContext);
  const [fname, setFname] = useState(user.user.first_name);
  const [mname, setMname] = useState(user.userProfile.middle_name);
  const [lname, setLname] = useState(user.user.last_name);
  const [bday, setBday] = useState(user.userProfile.birthday);
  const [address, setAddress] = useState(user.userProfile.address);
  const [phone, setPhone] = useState(user.userProfile.contact_no);
  const [email, setEmail] = useState(user.user.email);
  const [uname, setUname] = useState(user.user.username);
  const [password, setPassword] = useState(user.user.password);
  const [npassword, setNpassword] = useState(user.user.new_password);
  const [cpassword, setCpassword] = useState(user.user.confirm_password);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFname(user.user.first_name);
    setMname(user.userProfile.middle_name);
    setLname(user.user.last_name);
    setBday(user.userProfile.birthday);
    setAddress(user.userProfile.address);
    setPhone(user.userProfile.contact_no);
    setEmail(user.user.email);
    setUname(user.user.username);
    setPassword(user.user.password);
    setNpassword(user.user.new_passwordpassword);
    setCpassword(user.user.confirm_password);

    const unsubscribe = navigation.addListener("focus", () => {
      setFname(user.user.first_name);
      setMname(user.userProfile.middle_name);
      setLname(user.user.last_name);
      setBday(user.userProfile.birthday);
      setAddress(user.userProfile.address);
      setPhone(user.userProfile.contact_no);
      setEmail(user.user.email);
      setUname(user.user.username);
      setPassword(user.user.password);
      setNpassword(user.user.new_password);
      setCpassword(user.user.confirm_password);
    });
    return unsubscribe;
  }, [navigation]);

  const handleEditProfileSubmit = () => {
    if ((fname.trim() == "", lname.trim() == "", uname.trim() == "")) {
      Alert.alert("Oops", "Please Input Field");
    } else {
      const updatedUserData = {
        first_name: fname,
        middle_name: mname,
        last_name: lname,
        birthday: bday,
        address: address,
        contact_no: phone,
        isMobile: true,
      };

      api
        .put(`users/${user.user.id}`, updatedUserData)
        .then((response) => {
          setLoading(false);
          if (response.data.success == "true") {
            user.user = response.data.user;
            user.userProfile = response.data.user_profile;
            Alert.alert(
              "Success!",
              "You have successfully edited your profile"
            );
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err.response.data);
        });
    }
  };

  const handleChangePasswordSubmit = () => {
    if (password !== password) {
      alert("Current password is incorrect.");
    } else if (npassword !== cpassword) {
      alert("New password and confirm password must match.");
    } else {
      // Send a request to update the user's password
      const newPasswordData = {
        current_password: password, // current pass
        password: npassword, //new pass
        confirm_password: cpassword, //confirm
        isMobile: true,
      };

      console.log(newPasswordData);

      api
        .post(`update-password/${user.user.id}`, newPasswordData)
        .then((response) => {
          setLoading(false);
          console.log(response.data);
          alert("Password changed successfully");
        })
        .catch((error) => {
          setLoading(false);
          console.log(error.response.data);
          // console.error("Error updating password:", error);
          alert("Failed to change password. Please try again.");
        });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Loading loading={loading} />
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
            Profile
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "#D9D9D9",
                paddingVertical: 15,
                paddingHorizontal: 10,
                flexDirection: "row",
                justifyContent: "center",
                width: 80,
                marginLeft: 20,
                borderRadius: 500,
              }}
            >
              <Icon name="account" size={50} color={"#fff"} />
            </View>
            <View style={{ justifyContent: "center", marginLeft: 20 }}>
              <Text style={{ fontFamily: "Montserrat-Bold", fontSize: 20 }}>
                {fname} {lname}
              </Text>
              <Text style={{ fontFamily: "Montserrat-Light" }}>
                {user.user.email}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                marginLeft: "40%",
              }}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <View>
                <Icon name="logout" size={30} color={"#000"}></Icon>
              </View>
            </TouchableOpacity>
          </View>

          <Text
            variant="headlineSmall"
            style={{
              fontFamily: "Montserrat-Light",
              marginLeft: "8%",
              marginTop: "5%",
            }}
          >
            Edit Profile
          </Text>
          <View style={styles.divider} />

          <View style={{ alignItems: "center" }}>
            <View style={styles.inputText}>
              <Text>First Name</Text>
              <TextInput
                style={{
                  height: 35,
                  width: "75%",
                }}
                outlineStyle={{ borderRadius: 20 }}
                value={fname}
                onChangeText={(value) => setFname(value)}
                mode="outlined"
              />
            </View>
            <View style={[styles.inputText, { marginTop: -5 }]}>
              <Text>Middle Name</Text>
              <TextInput
                style={{
                  height: 35,
                  width: "75%",
                }}
                outlineStyle={{ borderRadius: 20 }}
                value={mname}
                onChangeText={(value) => setMname(value)}
                mode="outlined"
              />
            </View>
            <View style={[styles.inputText, { marginTop: -5 }]}>
              <Text>Last Name</Text>
              <TextInput
                style={{
                  height: 35,
                  width: "75%",
                }}
                outlineStyle={{ borderRadius: 20 }}
                value={lname}
                onChangeText={(value) => setLname(value)}
                mode="outlined"
              />
            </View>
            <View style={[styles.inputText, { marginTop: -5 }]}>
              <Text>Birthday</Text>
              <TextInput
                style={{
                  height: 35,
                  width: "75%",
                }}
                outlineStyle={{ borderRadius: 20 }}
                value={bday}
                onChangeText={(value) => setBday(value)}
                mode="outlined"
              />
            </View>
            <View style={[styles.inputText, { marginTop: -5 }]}>
              <Text>Address</Text>
              <TextInput
                style={{
                  height: 35,
                  width: "75%",
                }}
                outlineStyle={{ borderRadius: 20 }}
                value={address}
                onChangeText={(value) => setAddress(value)}
                mode="outlined"
              />
            </View>
            <View style={[styles.inputText, { marginTop: -5 }]}>
              <Text>Phone</Text>
              <TextInput
                style={{
                  height: 35,
                  width: "75%",
                }}
                outlineStyle={{ borderRadius: 20 }}
                value={phone}
                onChangeText={(value) => setPhone(value)}
                mode="outlined"
              />
            </View>
            <View style={[styles.inputText, { marginTop: -5 }]}>
              <Text>Username</Text>
              <TextInput
                style={{
                  height: 35,
                  width: "75%",
                }}
                outlineStyle={{ borderRadius: 20 }}
                value={uname}
                onChangeText={(value) => setUname(value)}
                mode="outlined"
              />
            </View>
            <View style={[styles.inputText, { marginTop: -5 }]}>
              <Text>Email</Text>
              <TextInput
                style={{
                  height: 35,
                  width: "75%",
                }}
                outlineStyle={{ borderRadius: 20 }}
                value={email}
                mode="outlined"
                disabled
              />
            </View>

            <TouchableOpacity
              style={{ width: 400 }}
              onPress={() => handleEditProfileSubmit()}
            >
              <View style={styles.buttonContainer}>
                <Text style={{ fontSize: 18 }}>Submit</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Text
            variant="headlineSmall"
            style={{
              fontFamily: "Montserrat-Light",
              marginLeft: "8%",
              marginTop: "5%",
            }}
          >
            Change Password
          </Text>
          <View style={styles.divider} />

          <View style={{ alignItems: "center" }}>
            <View style={styles.inputText}>
              <Text>Current Password</Text>
              <TextInput
                style={{
                  height: 35,
                  width: "65%",
                }}
                outlineStyle={{ borderRadius: 20 }}
                secureTextEntry={true}
                onChangeText={(value) => setPassword(value)}
                mode="outlined"
                value={password}
              />
            </View>
            <View style={[styles.inputText, { marginTop: -5 }]}>
              <Text>New Password</Text>
              <TextInput
                style={{
                  height: 35,
                  width: "65%",
                }}
                outlineStyle={{ borderRadius: 20 }}
                secureTextEntry={true}
                onChangeText={(value) => setNpassword(value)}
                mode="outlined"
                value={npassword}
              />
            </View>
            <View style={[styles.inputText, { marginTop: -5 }]}>
              <Text>Confirm Password</Text>
              <TextInput
                style={{
                  height: 35,
                  width: "65%",
                }}
                outlineStyle={{ borderRadius: 20 }}
                secureTextEntry={true}
                onChangeText={(value) => setCpassword(value)}
                mode="outlined"
                value={cpassword}
              />
            </View>

            <TouchableOpacity
              style={{ width: 400, marginBottom: 40 }}
              onPress={() => handleChangePasswordSubmit()}
            >
              <View style={styles.buttonContainer}>
                <Text style={{ fontSize: 18 }}>Submit</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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

  divider: {
    alignSelf: "flex-start",
    borderBottomWidth: 1,
    borderColor: "gray",
    marginVertical: 1,
    width: "90%",
  },
  inputText: {
    flexDirection: "row",
    width: "88%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "3%",
    marginVertical: 3,
    paddingHorizontal: 15,
  },
  buttonContainer: {
    backgroundColor: "#f9e2e1",
    marginHorizontal: 50,
    marginTop: 10,
    borderRadius: 20,
    width: "35%",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
});

export default Profile;
