import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const CategoryHero = ({ category }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("./categoryhero.jpg")}
        style={styles.backgroundImage}
      />
      <Text style={styles.categoryName}>{category}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: 200, // Adjust the height as per your requirement
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    opacity: 0.8,
  },
  categoryName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the background color opacity as per your requirement
    padding: 10,
  },
});

export default CategoryHero;
