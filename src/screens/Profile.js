import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { UserContext } from "../providers/UserProvider";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation();
  const user = useContext(UserContext);
  const [fname, setFname] = useState(user.user.first_name);
  const [lname, setLname] = useState(user.user.last_name);
  const [uname, setUname] = useState(user.user.username);

  useEffect(() => {
    setFname(user.user.first_name);
    setLname(user.user.last_name);
    setUname(user.user.username);

    const unsubscribe = navigation.addListener("focus", () => {
      setFname(user.user.first_name);
      setLname(user.user.last_name);
      setUname(user.user.username);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style>
      <TextInput value={fname} onChangeText={(value) => setFname(value)} />
      <TextInput value={lname} onChangeText={(value) => setLname(value)} />
      <TextInput value={uname} onChangeText={(value) => setUname(value)} />
    </View>
  );
};

export default Profile;
