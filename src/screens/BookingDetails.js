import React, { Fragment, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text, Divider } from "react-native-paper";
import { Input } from "@ui-kitten/components";
import moment from "moment";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const BookingDetails = ({ route }) => {
  const navigation = useNavigation();
  const [bookings, setBookings] = useState([]);
  const [bookingId, setBookingsId] = useState("null");

  useEffect(() => {
    console.log(route.params.id);
    const fetchUserBookings = async () => {
      try {
        const response = await api.get(
          `getIndividualBooking/${route.params.id}`
        );
        setBookings(response.data.bookings);
        // setBookingsId(response.data.bookings.id);
        console.log(response.data.bookings);
      } catch (err) {
        console.log(err.response);
      }
    };
    fetchUserBookings();
  }, [route.params.id]);

  return (
    <ScrollView>
      <View>
        <Text style={styles.textStyle}>Booking Details</Text>
        {bookings.map((booking) => (
          <Fragment>
            <Text>Customer Information</Text>
            <Input
              disabled="true"
              label={"First Name"}
              value={booking.user.first_name}
            />
            <Input
              disabled="true"
              label={"Last Name"}
              value={booking.user.last_name}
            />
            <Input disabled="true" label={"Email"} value={booking.user.email} />
            <Input
              disabled="true"
              label={"Contact Number"}
              value={booking.user_profile.contact_no}
            />
            <Input
              disabled="true"
              label={"First Name"}
              value={booking.user.first_name}
            />
            <Divider />
            <Text>Booking Details</Text>
            <Input disabled="true" label={"Date"} value={booking.date} />
            <Input
              disabled="true"
              label={"Time"}
              value={`${moment(booking.time_in, "YYYY-MM-DD hh:mm A").format(
                "hh:mm A"
              )} - ${moment(booking.time_out, "YYYY-MM-DD hh:mm A").format(
                "hh:mm A"
              )}`}
            />
            <Text>Selected Service</Text>
            {booking.products.map((product) => (
              <Input disabled="true" value={product.product_name} />
            ))}
            {booking.packages.map((item) => (
              <Input disabled="true" value={item.package_name} />
            ))}

            <Input
              disabled="true"
              label={"Technician Name"}
              value={booking.staff.staff_name}
            />
            <Input
              disabled="true"
              label={"Total Price"}
              value={booking.payment.total_price}
            />
            <Input
              disabled="true"
              label={"Payment Status"}
              value={
                booking.payment.payment_status == 1 ? "Paid" : "Not Yet Paid"
              }
            />
          </Fragment>
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
  buttonContainer: {
    backgroundColor: "#f9e2e1",
    margin: 20,
    marginTop: 10,
    borderRadius: 20,
    width: "35%",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
});
export default BookingDetails;
