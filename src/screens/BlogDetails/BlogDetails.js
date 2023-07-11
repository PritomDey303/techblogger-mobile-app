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
import { AirbnbRating, Card, Icon } from "react-native-elements";
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
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  // const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [trigger, setTrigger] = useState(true);
  const [formattedDate, setFormattedDate] = useState("");
  const windowHeight = Dimensions.get("window").height;
  const [alreadyRating, setAlreadyRating] = useState(0);
  const [like, setLike] = useState(false);
  const [ratingNotification, setRatingNotification] = useState(false);

  //useeffect for setting rating notification to false
  React.useEffect(() => {
    setTimeout(() => {
      setRatingNotification(false);
    }, 3000);
  }, [ratingNotification]);

  //useEffect for fetching post by id
  React.useEffect(() => {
    function getPost() {
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
          setLoading(false);
        });
    }
    getPost();
    //call api to check if user already rated
    fetch(`${url}/api/rating/check/${id}`, {
      headers: {
        Authorization: `bearer ${authData?.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          setAlreadyRating(data.rating);
        }
        if (data.rating === 0) {
          setAlreadyRating(0);
        }
      });
    //call api to check if user already liked
    fetch(`${url}/api/like/check/${id}`, {
      headers: {
        Authorization: `bearer ${authData?.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.like === true) {
          setLike(true);
        } else {
          setLike(false);
        }
      });
  }, [trigger]);

  //post comment function
  const addComment = async (comment) => {
    const token = await AsyncStorage.getItem("token");

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

  const handleRating = (rating) => {
    fetch(`${url}/api/rating/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authData?.token}`,
      },
      body: JSON.stringify({
        blogid: id,
        rating: rating,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setRatingNotification(true);
          setTrigger(!trigger);
        } else {
          console.log("something went wrong");
        }
      });
  };
  //////////////////////////////////////////
  //handle like
  const handleLike = () => {
    fetch(`${url}/api/like/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authData?.token}`,
      },

      body: JSON.stringify({
        blogid: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          //notification("Liked successfully", "success");
          setLike(!like);
          setTrigger(!trigger);
        } else {
          console.log("something went wrong");
        }
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
              <View style={styles.showRatingLikeInfo}>
                <Text style={styles.like}>
                  {data?.likesCount} {data?.likesCount > 1 ? `likes` : `like`}
                </Text>
                <Text style={styles.rating}>Rating:{data?.avgrating}/5</Text>
              </View>
              <Text style={styles.dateAuthor}>
                Published on{" "}
                <Text style={{ color: "white" }}>{formattedDate}</Text> by{" "}
                <Text style={{ color: "white" }}> {data?.author?.name}</Text>
              </Text>
              <Text style={styles.description}>{data?.description}</Text>

              <View style={styles.ratingContainer}>
                <Text style={styles.ratingTitle}>Rate the post</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={alreadyRating || 0}
                  size={20}
                  onFinishRating={(rating) => {
                    setAlreadyRating(rating);
                    handleRating(rating);
                  }}
                />
                <Text
                  style={{
                    color: "green",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  {ratingNotification ? "Rating submitted" : ""}
                </Text>
              </View>
              <View style={styles.likeContainer}>
                {!like ? (
                  <Icon
                    name="thumbs-up"
                    type="font-awesome"
                    color="#dc3545"
                    size={20}
                    reverse
                    style={styles.likeButton}
                    onPress={() => {
                      handleLike();
                    }}
                  />
                ) : (
                  <Icon
                    name="thumbs-down"
                    type="font-awesome"
                    color="#dc3545"
                    size={20}
                    style={styles.likeButton}
                    reverse
                    onPress={() => {
                      handleLike();
                    }}
                  />
                )}
                {/* //like button */}
              </View>
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
  likeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
    //light ash
    backgroundColor: "rgb(255, 255, 255)",
    elevation: 10,
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
  },
  ratingContainer: {
    width: "90%",
    alignSelf: "center",
    //light ash
    backgroundColor: "rgb(255, 255, 255)",
    elevation: 10,
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
  },

  ratingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#dc3545",
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
  showRatingLikeInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    //secoqndary color
    color: "rgb(194, 222, 220)",
  },
  like: {
    //secoqndary color
    color: "rgb(194, 222, 220)",
    fontWeight: "bold",
  },
  rating: {
    //secoqndary color
    color: "rgb(194, 222, 220)",
    fontWeight: "bold",
  },
  //set the like button at the center of the view
  likeButton: {
    alignItems: "center",
  },
});

export default BlogDetails;
