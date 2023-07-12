import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { url } from "../../Context/Url";
import capitalize from "../../UtilityFunction/toCapitalize";
import BlogCard from "../../components/BlogCard/BlogCard";
import CategoryHero from "../../components/CategoryHero/CategoryHero";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";
import Pagination from "../../components/Pagination/Pagination";

const CategoryBlogs = () => {
  const route = useRoute();
  const { id } = route.params;
  const [posts, setPosts] = useState([]);
  const [done, setDone] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState(1);
  const limit = 6;
  //const { posts, setPage, page, totalPageNumber, done } = useContext(AllPost);
  const width = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  //fetching data from backend
  React.useEffect(() => {
    setDone(false);
    fetch(`${url}/api/blog/category/${id}?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPosts(data.data.blogs);
        setTotalPageNumber(Math.ceil(data?.data?.totalPages));
        setDone(true);
      });
  }, [id, page]);
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
            <CategoryHero category={capitalize(id)} />
          </View>
          {/* post */}
          {!posts.length ? (
            <View style={styles.loadingContainer}>
              <Text style={{ color: "red", fontWeight: "bold" }}>
                No Blog Available!
              </Text>
            </View>
          ) : (
            <View style={styles.flatcontainer}>
              {/* map the posts here using flatlist */}
              {posts.map((item) => renderItem({ item }))}
            </View>
          )}

          {/* pagination */}
          {posts.length > 0 && (
            <Pagination
              page={page}
              setPage={setPage}
              totalPageNumber={totalPageNumber}
            />
          )}
        </View>
      )}
      {done && <Footer />}
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
export default CategoryBlogs;
