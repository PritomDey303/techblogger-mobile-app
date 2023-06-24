import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Button, Image } from "react-native-elements";

const Hero = () => {
  return (
    <View style={styles.container}>
      <Image source={require("./herobg.jpg")} style={styles.heroImage} />
      <View style={styles.overlay}>
        <Animatable.Text
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          style={styles.title}
        >
          Welcome to Techblogger
        </Animatable.Text>

        <Text style={styles.subtitle}>Discover the Best Experience</Text>

        <Button
          title="Read Blogs"
          loading={false}
          loadingProps={{ size: "small", color: "white" }}
          buttonStyle={{
            backgroundColor: "rgba(214, 61, 57, 1)",
            borderRadius: 10,
          }}
          containerStyle={{
            marginHorizontal: 50,
            height: 50,
            width: 200,
            marginVertical: 10,
          }}
          onPress={() => {
            console.log("aye");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginBottom: 20,
  },
  heroImage: {
    width: "100%",
    height: 300,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#fff",
    color: "#000",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
});

export default Hero;
