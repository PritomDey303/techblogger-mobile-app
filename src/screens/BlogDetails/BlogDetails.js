import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { format } from "date-fns";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Card } from "react-native-elements";
import { AuthContext } from "../../Context/AuthContext";
import { url } from "../../Context/Url";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";
import Comment from "./Comment/Comment";
import PostComment from "./PostComment/PostComment";
const BlogDetails = () => {
  const { authData } = React.useContext(AuthContext);
  const route = useRoute();

  const { id } = route.params;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  // const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [trigger, setTrigger] = useState(true);
  const [formattedDate, setFormattedDate] = useState("");
  const windowHeight = Dimensions.get("window").height;
  //useEffect for fetching post by id
  React.useEffect(() => {
    function getPost() {
      setLoading(true);
      fetch(`${url}/api/blog/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data.data);

          setComments(data.data.comments);
          let date = new Date(data.data.createdAt);

          let date2 = format(date, "dd MMMM, yyyy");
          setFormattedDate(date2);

          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    getPost();
  }, [trigger]);

  //post comment function
  const addComment = async (comment) => {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    fetch(`${url}/api/comment/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        comment: comment,
        blogid: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setTrigger(!trigger);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ScrollView contentContainerStyle={{ minHeight: windowHeight }}>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            <Image
              source={{
                uri: `${data?.image_url}` || "https://picsum.photos/200/300",
              }}
              style={styles.backgroundImage}
            />
            <View style={styles.overlay}>
              <Text style={styles.title}>{data?.title}</Text>
              <Text style={styles.dateAuthor}>
                Published on{" "}
                <Text style={{ color: "white" }}>{formattedDate}</Text> by{" "}
                <Text style={{ color: "white" }}> {data?.author?.name}</Text>
              </Text>
              <Text style={styles.description}>{data?.description}</Text>
            </View>
          </Card>
          <Card containerStyle={styles.commentcardContainer}>
            {/* //comments */}
            <View style={styles.commentoverlay}>
              <Text style={styles.commentsTitle}>Comments</Text>
              {comments?.map((comment) => (
                <Comment
                  key={comment._id}
                  comment={comment}
                  setTrigger={setTrigger}
                  trigger={trigger}
                />
              ))}
              <PostComment addComment={addComment} />
            </View>
          </Card>

          <Footer />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    borderRadius: 10,
    overflow: "hidden",
  },
  backgroundImage: {
    width: "100%",
    height: 200,
  },
  overlay: {
    padding: 20,
    backgroundColor: "#dc3545",
    opacity: 0.9,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 10,
  },
  dateAuthor: {
    fontSize: 15,
    fontWeight: "bold",
    //secoqndary color
    color: "rgb(194, 222, 220)",
    marginBottom: 15,
  },
  ratingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  rating: {
    marginRight: 10,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 20,
    marginBottom: 10,
  },
  comment: {
    fontSize: 14,
    color: "#FFFFFF",
    marginBottom: 5,
  },
  commentInputContainer: {
    paddingHorizontal: 0,
    marginBottom: 10,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
  },
  postButton: {
    backgroundColor: "#FF0000",
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 20,
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomColor: "#FFFFFF",
    borderBottomWidth: 2,
  },
  underline: {
    width: 30,
    borderBottomColor: "white",
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  commentoverlay: {
    padding: 20,
    backgroundColor: "#dc3545",
    opacity: 0.9,
  },
  commentcardContainer: {
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default BlogDetails;
