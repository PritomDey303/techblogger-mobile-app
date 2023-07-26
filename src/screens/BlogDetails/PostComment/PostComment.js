import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { AuthContext } from "../../../Context/AuthContext";
import { useDebounce } from "../../../UtilityFunction/useDebounce";
const PostComment = ({ addComment }) => {
  const [commenterName, setCommenterName] = useState("");
  const [comment, setComment] = useState("");
  const { authData } = React.useContext(AuthContext);
  const [toxicityScore, setToxicityScore] = React.useState(null);
  const debouncedComment = useDebounce(comment, 1000);

  React.useEffect(() => {
    // Call analyzeComment when the debounced comment changes
    if (debouncedComment) {
      console.log("debouncedComment");
      handleAnalyzingComment(comment);
    }
  }, [debouncedComment]);
  async function analyzeComment(text) {
    const perspectiveEndpoint =
      "https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze";
    const apiKey = "AIzaSyBipGQHpLzFDJOtuNdJpnxc9phM2r_OFz0"; // Replace with your Perspective API key

    const headers = {
      "Content-Type": "application/json",
    };

    const payload = {
      comment: {
        text: text,
      },
      languages: ["en"],
      requestedAttributes: {
        TOXICITY: {},
      },
    };

    const params = {
      key: apiKey,
    };

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    };

    try {
      const response = await fetch(
        `${perspectiveEndpoint}?key=${apiKey}`,
        requestOptions
      );
      const data = await response.json();
      console.log(data.attributeScores);
      const toxicityScore = data?.attributeScores.TOXICITY.summaryScore.value;
      setToxicityScore(toxicityScore);
    } catch (error) {
      console.log("Error analyzing comment:", error);

      return null;
    }
  }

  const handleCommenterNameChange = (text) => {
    setCommenterName(text);
  };

  const handleCommentChange = async (text) => {
    setComment(text);
  };
  const handleAnalyzingComment = async (text) => {
    console.log(text);
    await analyzeComment(text);
  };

  const handleSubmit = async () => {
    //console.log(commenterName, comment);
    if (comment.trim() !== "") {
      await addComment(comment);
      setCommenterName("");
      setComment("");
    } else {
      alert("Please enter a comment.");
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
        onFocus={() => {
          setToxicityScore(null);
        }}
        onChangeText={handleCommentChange}
        inputStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
      />
      {comment.trim() !== "" &&
      toxicityScore !== null &&
      toxicityScore > 0.7 ? (
        <View>
          <Text style={{ color: "red", fontWeight: "bold" }}>
            This comment is toxic. Toxicity Level:{" "}
            {(toxicityScore * 100).toFixed(2)}%{" "}
          </Text>
        </View>
      ) : (
        <Text style={{ color: "green", fontWeight: "bold" }}>
          Toxicity Level: {(toxicityScore * 100).toFixed(2)}%
        </Text>
      )}

      {toxicityScore !== null &&
      toxicityScore > 0.7 &&
      comment.trim() !== "" ? (
        <Button
          title="Submit"
          disabled
          onPress={() => handleSubmit()}
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
        />
      ) : (
        <Button
          title="Submit"
          onPress={() => handleSubmit()}
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
        />
      )}
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
