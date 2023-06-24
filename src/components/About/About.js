import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview";
const About = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>About Us</Text>
        <View style={styles.underline} />
      </View>

      <View style={styles.contentcontainer}>
        <View style={styles.videoContainer}>
          <WebView
            style={styles.video}
            javaScriptEnabled={true}
            source={{ uri: "https://youtu.be/tUP5S4YdEJo" }}
          />
        </View>

        <View style={styles.mapContainer}>
          <WebView
            style={styles.map}
            javaScriptEnabled={true}
            source={{
              uri: "https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=University of Oxford&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed",
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: 16,
    width: "80%",
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  title: {
    marginLeft: 8,
    fontSize: 25,
    fontWeight: "bold",
    color: "#000000", // Danger color (e.g., red)
    borderBottomWidth: 3,
  },
  underline: {
    flex: 1,
    height: 1,
    backgroundColor: "#FF0000", // Danger color (e.g., red)
    marginLeft: 8,
  },
  videoContainer: {
    width: "100%",
    aspectRatio: 1,
    marginBottom: 36,
    elevation: 5,
    borderRadius: 8,
  },
  video: {
    flex: 1,
  },
  mapTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  mapContainer: {
    width: "100%",
    aspectRatio: 0.8,
    borderRadius: 8,

    marginBottom: 16,
    elevation: 5,
  },
  map: {
    flex: 1,
  },
  contentcontainer: {
    width: "100%",
    padding: 15,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
});

export default About;
