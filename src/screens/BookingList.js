import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, DataTable, Card } from "react-native-paper";
import { UserContext } from "../providers/UserProvider";
import api from "../../config/api";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

const BookingList = () => {
  const navigation = useNavigation();
  const user = useContext(UserContext);

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch user bookings
    const fetchUserBookings = async () => {
      try {
        const response = await api.get(`getAllBookingsByUser/${user.user.id}`);
        setBookings(response.data.bookings);
        console.log(user.id);
      } catch (err) {
        console.log(err.response);
      }
    };
    fetchUserBookings();
  }, [user.id]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Text style={styles.textStyle}>List of Bookings</Text>
      <View style={{ alignItems: "center" }}>
        {bookings.map((booking) => (
          <Card style={styles.cardStyle}>
            <Card.Content>
              <Text variant="titleLarge">Booking ID: {booking.id}</Text>
              <Text variant="bodyMedium">{booking.date}</Text>
              <Text variant="bodyMedium">
                {moment(booking.time_in, "YYYY-MM-DD hh:mm A").format(
                  "hh:mm A"
                )}
                {" - "}
                {moment(booking.time_out, "YYYY-MM-DD hh:mm A").format(
                  "hh:mm A"
                )}
              </Text>
              <Text variant="bodyMedium">{booking.branch.branch_address}</Text>
              <Text
                variant="titleMedium"
                style={{ color: "pink", fontWeight: "bold" }}
                onPress={() => {
                  navigation.navigate("BookingDetails", { id: booking.id });
                }}
              >
                View{" "}
              </Text>
              <Text
                variant="titleMedium"
                style={{ color: "green" }}
                onPress={() => {
                  navigation.navigate("BookingReview", {
                    booking_id: booking.id,
                  });
                }}
              >
                Give Review{" "}
              </Text>
            </Card.Content>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    padding: 20,
    paddingLeft: "2%",
    marginTop: "1%",
    marginBottom: "5%",
    fontFamily: "Montserrat-Medium",
    fontSize: 30,
  },
  cardStyle: {
    marginBottom: "10%",
    width: 350,
    borderRadius: 30,
    paddingVertical: 8,
  },
});
export default BookingList;
