import React from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { AllPost } from "../../Context/AllPostsContext";
import { AuthContext } from "../../Context/AuthContext";
import { url } from "../../Context/Url";
import CategoryHero from "../../components/CategoryHero/CategoryHero";
import Loading from "../../components/Loading/Loading";
import ManageBlogCard from "../../components/ManageBlogCard/ManageBlogCard";

const ManageBlogs = () => {
  const { authData } = React.useContext(AuthContext);
  const { setTriggerPost, triggerPost } = React.useContext(AllPost);
  const [blogs, setBlogs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const windowHeight = Dimensions.get("window").height;
  const [trigger, setTrigger] = React.useState(false);
  const renderItem = ({ item }) => (
    <ManageBlogCard
      key={item?._id}
      id={item?._id}
      date={item?.createdAt}
      title={item?.title}
      description={item?.description}
      category={item?.category}
      deleteBlog={deleteBlog}
    />
  );
  React.useEffect(() => {
    setLoading(true);
    fetch(`${url}/api/blog/user/data`, {
      method: "GET",
      headers: {
        authorization: `bearer ${authData?.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        if (data?.status === "success") {
          setBlogs(data.data);
          setLoading(false);
        }
        if (data?.status === "error") {
          setError("Something went wrong");
          setLoading(false);
        }
      });
  }, [trigger]);
  const deleteBlog = (id) => {
    setLoading(true);
    fetch(`${url}/api/blog/delete/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${authData?.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        console.log(data);
        if (data?.status === "success") {
          setTriggerPost(!triggerPost);
          setTrigger(!trigger);
        }
      });
  };
  return (
    <ScrollView contentContainerStyle={{ minHeight: windowHeight }}>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <CategoryHero category="Manage Blogs" />
          <View style={styles.flatcontainer}>
            {blogs.map((item) => renderItem({ item }))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  blogItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  blogDate: {
    fontSize: 14,
  },
  flatcontainer: {
    marginTop: 20,
    padding: 16,
    paddingHorizontal: 25,
  },
});

export default ManageBlogs;
