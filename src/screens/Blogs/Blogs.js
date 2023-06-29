import React, { useContext } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AllPost } from "../../Context/AllPostsContext";
import BlogCard from "../../components/BlogCard/BlogCard";
import CategoryHero from "../../components/CategoryHero/CategoryHero";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";
import Pagination from "../../components/Pagination/Pagination";

const Blogs = () => {
  const { posts, setPage, page, totalPageNumber, done } = useContext(AllPost);
  const width = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

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
    <ScrollView contentContainerStyle={{ minHeight: windowHeight }}>
      {!done ? (
        <Loading />
      ) : (
        <View>
          {/* title */}
          <View>
            <CategoryHero category="All Blogs" />
          </View>
          {/* post */}
          {!posts.length ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="red" />
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          ) : (
            <View style={styles.flatcontainer}>
              {/* map the posts here using flatlist */}
              {posts.map((item) => renderItem({ item }))}
            </View>
          )}

          {/* pagination */}
          <Pagination
            page={page}
            setPage={setPage}
            totalPageNumber={totalPageNumber}
          />
        </View>
      )}
      <Footer />
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
    paddingTop: 20,
  },
  title: {
    marginLeft: 18,
    fontSize: 25,
    fontWeight: "bold",
    color: "#000000", // Danger color (e.g., red)
    borderBottomWidth: 3,
  },
  flatcontainer: {
    marginTop: 20,
    padding: 16,
    paddingHorizontal: 25,
  },
  underline: {
    flex: 1,
    height: 1,
    backgroundColor: "#FF0000", // Danger color (e.g., red)
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 400,
  },
});
export default Blogs;
