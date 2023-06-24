import React, { useContext } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { AllPost } from "../../Context/AllPostsContext";
import BlogCard from "../BlogCard/BlogCard";
const LatestPost = () => {
  const { posts } = useContext(AllPost);
  const width = Dimensions.get("window").width;

  const renderItem = ({ item }) => (
    <BlogCard
      key={item?._id}
      id={item?._id}
      date={item?.createdAt}
      title={item?.title}
      description={item?.description}
      category={item?.category}
    />
  );
  //custom animation

  return (
    <View>
      {/* title */}
      <View style={styles.container}>
        <Text style={styles.title}>Latest Post</Text>
        <View style={styles.underline} />
      </View>
      {/* post */}
      {!posts.length ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="red" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Carousel
            loop
            width={width}
            height={300}
            autoPlay={true}
            autoPlayInterval={3000}
            data={posts}
            scrollAnimationDuration={1000}
            itemWidth={width - 60}
            separatorWidth={0}
            renderItem={({ index }) => (
              <View style={styles.flatcontainer}>
                {renderItem({ item: posts[index] })}
              </View>
            )}
          />
        </View>
      )}
    </View>
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
  title: {
    marginLeft: 18,
    fontSize: 25,
    fontWeight: "bold",
    color: "#000000", // Danger color (e.g., red)
    borderBottomWidth: 3,
  },
  flatcontainer: {
    flex: 1,
    padding: 16,
    paddingHorizontal: 25,
  },
  underline: {
    flex: 1,
    height: 1,
    backgroundColor: "#FF0000", // Danger color (e.g., red)
    marginLeft: 8,
  },
});
export default LatestPost;
