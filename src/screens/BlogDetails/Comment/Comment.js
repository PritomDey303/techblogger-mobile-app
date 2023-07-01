import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const Comment = ({ comment }) => {
  const commentCreatedAt = new Date(comment?.createdAt);
  const timeAgo = formatDistanceToNow(commentCreatedAt, { locale: enUS });
  return (
    <View style={styles.container}>
      <Image source={require("./human.jpg")} style={styles.image} />

      <View style={styles.commentContainer}>
        <Text style={styles.commenterName}>{comment?.user?.name}</Text>
        <Text style={styles.time}>{timeAgo} ago</Text>
        <Text style={styles.comment}>{comment?.comment}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  avatar: {
    marginRight: 10,
  },
  commentContainer: {
    flex: 1,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  commenterName: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 18,
    color: "#FFFFFF",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    paddingTop: 10,
    borderWidth: 4,
    borderColor: "white",
    marginRight: 10,
  },
  time: {
    fontSize: 12,
    //font color secondary
    color: "rgb(194, 222, 220)",
  },
  comment: {
    fontSize: 14,
    color: "#FFFFFF",
    marginTop: 5,
  },
});

export default Comment;
