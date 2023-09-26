import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { UserContext } from "../providers/UserProvider";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";

const Profile = () => {
  const navigation = useNavigation();
  const user = useContext(UserContext);
  const [fname, setFname] = useState(user.user.first_name);
  const [mname, setMname] = useState(user.user.middle_name);
  const [lname, setLname] = useState(user.user.last_name);
  const [bday, setBday] = useState(user.user.bday);
  const [address, setAddress] = useState(user.user.address);
  const [phone, setPhone] = useState(user.user.contact_no);
  const [email, setEmail] = useState(user.user.email);
  const [uname, setUname] = useState(user.user.username);
  const [password, setPassword] = useState(user.user.password);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFname(user.user.first_name);
    setMname(user.user.middle_name);
    setLname(user.user.last_name);
    setBday(user.user.bday);
    setAddress(user.user.address);
    setPhone(user.user.contact_no);
    setEmail(user.user.email);
    setUname(user.user.username);
    setPassword(user.user.password);

    const unsubscribe = navigation.addListener("focus", () => {
      setFname(user.user.first_name);
      setMname(user.user.middle_name);
      setLname(user.user.last_name);
      setBday(user.user.bday);
      setAddress(user.user.address);
      setPhone(user.user.contact_no);
      setEmail(user.user.email);
      setUname(user.user.username);
      setPassword(user.user.password);
    });

    return unsubscribe;
  }, [navigation]);

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
                {user.user.first_name} {user.user.last_name}
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
                onChangeText={(value) => setEmail(value)}
                mode="outlined"
              />
            </View>
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
});

export default Profile;
