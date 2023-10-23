import React, { useEffect, useState } from "react";
import {
  Dimensions,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
// import Header from "../components/Header";
import { useRoute } from "@react-navigation/native";
import api from "../../config/api";
import { Card, Text } from "react-native-paper";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { SafeAreaView } from "react-native-safe-area-context";

const IndexScreen = () => {
  const route = useRoute();

  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsAddOns, setProductAddOns] = useState([]);
  const [packages, setPackages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const serviceImages = {
    "General Service": require("../assets/images/general_service.jpg"),
    "Nail Extension": require("../assets/images/nail_extension.jpg"),
    Waxing: require("../assets/images/waxing.jpg"),
    Eyelash: require("../assets/images/eyelash.jpg"),
    "Eyelash Extensions": require("../assets/images/eyelash_extension.jpg"),
  };

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

  const carouselItems = [
    {
      image: require("../assets/images/Gracey.jpg"),
    },
    {
      image: require("../assets/images/graceynails_neon.jpg"),
    },
    {
      image: require("../assets/images/graceynails_store.jpg"),
    },
  ];

  const pagination = (
    <Pagination
      dotsLength={carouselItems.length}
      activeDotIndex={activeIndex}
      containerStyle={{ backgroundColor: "transparent", paddingBottom: 0 }}
      dotStyle={{
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 0,
        backgroundColor: "rgba(122, 122, 122, 0.92)",
      }}
      inactiveDotStyle={{
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 0,
        backgroundColor: "rgba(122, 122, 122, 0.80)",
      }}
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
    />
  );
  const _renderCarouselItem = ({ item, index }) => {
    return (
      <View style={styles.carouselItem}>
        <Image
          source={item.image}
          style={{ width: 400, height: 150, alignSelf: "center" }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.bodyContainer}>
          <Carousel
            layout={"default"}
            ref={(ref) => (this.carousel = ref)}
            data={carouselItems}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={400}
            renderItem={_renderCarouselItem}
            onSnapToItem={(index) => setActiveIndex(index)}
          />
          {pagination}
          <Text
            variant="headlineLarge"
            style={{
              paddingLeft: "5%",
              marginTop: "1%",
              marginBottom: "5%",
              fontFamily: "Montserrat-Medium",
            }}
          >
            {" "}
            Services
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {services.length > 0
              ? services.map((item, index) => {
                  const serviceName = item.service_name;
                  const serviceImage = serviceImages[serviceName];
                  return (
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => console.log(serviceName)}
                      key={index}
                      style={{ alignItems: "center" }}
                    >
                      <Image source={serviceImage} style={styles.cardImage} />
                      <Text>{serviceName}</Text>
                    </TouchableOpacity>
                  );
                })
              : null}
          </View>

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
            Packages
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {packages.length > 0
              ? packages.map((item, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => console.log(item.package_name)}
                      key={index}
                      style={{ alignItems: "center" }}
                    >
                      <Card style={styles.cardStyle}></Card>
                      <Text>{item.package_name}</Text>
                    </TouchableOpacity>
                  );
                })
              : null}
          </View>

          {services.length > 0
            ? services.map((item, index) => {
                return (
                  <Card key={index}>
                    <Text>{item.service_name}</Text>
                  </Card>
                );
              })
            : null}
          {products.length > 0
            ? products.map((item, index) => {
                if ((index >= 0, index <= 11)) {
                  return (
                    <View key={index}>
                      <Text>{item.product_name}</Text>
                      <Text>{item.price}</Text>
                    </View>
                  );
                }
              })
            : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: -40,
  },
  bodyContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselItem: {
    backgroundColor: "#f8bef7",
    borderRadius: 5,
    height: 150,
    justifyContent: "center",
    // padding: -30,
    // marginTop: 10,
    // marginLeft: 25,
    // marginRight: 25,
  },
  cardStyle: {
    width: 120,
    height: 120,
    borderRadius: 20,
    margin: 10,
  },
  cardImage: {
    width: 120,
    height: 120,
    borderRadius: 20,
    margin: 10,
  },
  pagination: {
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },
});

export default IndexScreen;
