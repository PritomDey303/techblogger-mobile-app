import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { AuthContext } from "../../../Context/AuthContext";

const PostComment = ({ addComment }) => {
  const [commenterName, setCommenterName] = useState("");
  const [comment, setComment] = useState("");
  const { authData } = React.useContext(AuthContext);
  const handleCommenterNameChange = (text) => {
    setCommenterName(text);
  };

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handleSubmit = async () => {
    //console.log(commenterName, comment);
    if (comment.trim() !== "") {
      await addComment(comment);
      setCommenterName("");
      setComment("");
    }
  };

  return (
    <View style={styles.container}>
      <Input
        value={authData?.user?.name}
        onChangeText={handleCommenterNameChange}
        inputStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        disabled
      />
      <Input
        placeholder="Add a comment..."
        value={comment}
        onChangeText={handleCommentChange}
        inputStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
      />
      <Button
        title="Submit"
        onPress={() => handleSubmit()}
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    elevation: 5,
  },
  input: {
    //blackish
    color: "rgb(36, 40, 44)",
  },
  inputContainer: {
    borderBottomColor: "#dc3545",
  },
  button: {
    backgroundColor: "#dc3545",
    marginTop: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFFFFF",
  },
});

export default PostComment;
