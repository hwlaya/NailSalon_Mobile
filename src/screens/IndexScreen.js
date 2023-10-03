import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Header from "../components/Header";
import { useRoute } from "@react-navigation/native";
import api from "../../config/api";
import { Card, Text } from "react-native-paper";

const IndexScreen = () => {
  const route = useRoute();

  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsAddOns, setProductAddOns] = useState([]);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    api
      .get("/api/services-page")
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

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.content}>
          <Text variant="headlineLarge">Services</Text>
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
                return (
                  <Card key={index}>
                    <Text>{item.product_name}</Text>
                    <Text>{item.price}</Text>
                  </Card>
                );
              })
            : null}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IndexScreen;
