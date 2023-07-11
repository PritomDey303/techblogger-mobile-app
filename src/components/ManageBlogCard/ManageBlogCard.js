import { useNavigation } from "@react-navigation/native";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Icon } from "react-native-elements";
import { AuthContext } from "../../Context/AuthContext";
const ManageBlogCard = ({
  title,
  description,
  category,
  id,
  date,
  deleteBlog,
}) => {
  const { authData, loading } = React.useContext(AuthContext);
  const navigation = useNavigation();
  const postCreatedAt = new Date(date); // Replace with your post's creation date

  const timeAgo = formatDistanceToNow(postCreatedAt, { locale: enUS });
  if (loading) {
    return;
  }

  return (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={() => {
        authData.isLoggedIn
          ? navigation.navigate("BlogDetails", { id: id })
          : navigation.navigate("Login");
      }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {title.length > 20 ? title.substring(0, 20) + "..." : title}
          </Text>
          {/* delete icon button */}

          <Icon
            name="trash"
            type="font-awesome"
            color="#dc3545"
            size={15}
            elevation={5}
            reverse
            style={styles.likeButton}
            onPress={() => {
              deleteBlog(id);
            }}
          />
        </View>
        <Text style={styles.description}>
          {description.length > 100
            ? description.substring(0, 200) + "..."
            : description}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.category}>{category}</Text>
          <Text style={styles.date}>{timeAgo} ago</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: "100%",

    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 7,
    padding: 16,
  },
  hovercontainer: {
    backgroundColor: "transparent",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    color: "#dc3545",
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "#dc3545",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#dc3545",
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    color: "#808080",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
});

export default ManageBlogCard;
