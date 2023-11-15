import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Text, TextInput } from "react-native-paper";
import { Rating, AirbnbRating } from "react-native-ratings";
import { UserContext } from "../providers/UserProvider";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import api from "../../config/api";
import { useNavigation } from "@react-navigation/native";

const BookingReview = ({ route }) => {
  const navigation = useNavigation();
  const user = useContext(UserContext);

  const [rating, setRating] = useState(0);
  const handleRating = (ratedValue) => {
    setRating(ratedValue);
    console.log(`Rated: ${ratedValue}`);
  };

  const [review, setReview] = useState(0);
  const handleSave = () => {
    console.log(user.user.id);
    console.log(route.params.booking_id);
    console.log(rating);
    console.log(review);
    const formdata = new FormData();
    formdata.append("user_id", user.user.id);
    formdata.append("booking_id", route.params.booking_id);
    formdata.append("review_score", rating);
    formdata.append("review_desc", review);

    api
      .post("saveReviews", formdata)
      .then((response) => {
        console.log(response);
        Alert.alert("Success!", "Feedback Successfully Saved");
        navigation.navigate("BookingList");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <View>
      <AirbnbRating onFinishRating={handleRating} defaultRating={0} />

      <TextInput
        placeholder="Review Description"
        numberOfLines={4}
        mode="disabled"
        value={review}
        onChangeText={(value) => setReview(value)}
      />
      <TouchableOpacity style={{ width: 400 }} onPress={() => handleSave()}>
        <View style={styles.buttonContainer}>
          <Text style={{ fontSize: 18 }}>
            Save
            <Icon name="content-save" size={20}></Icon>
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#f9e2e1",
    margin: 20,
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

export default BookingReview;
