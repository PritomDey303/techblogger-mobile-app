import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-elements";
import Footer from "../../components/Footer/Footer";

const BlogDetails = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = () => {
    if (comment) {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Card containerStyle={styles.cardContainer}>
          <Image
            source={{
              uri: "https://img.freepik.com/premium-vector/ai-artificial-intelligence-ai-digital-brain-technology-background_41814-515.jpg",
            }}
            style={styles.backgroundImage}
          />
          <View style={styles.overlay}>
            <Text style={styles.title}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusamus, rem.
            </Text>
            <Text style={styles.dateAuthor}>
              Published on 24th June 2023 by John Doe
            </Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic
              temporibus molestiae officiis tempora dolore. In perspiciatis
              corrupti magnam consequatur a magni, itaque necessitatibus
              voluptatum quaerat fuga laborum sunt possimus eaque facere dolores
              dolore voluptas nesciunt tempore ullam ut quibusdam! Quis
              quibusdam labore, ullam illum temporibus quasi doloribus suscipit
              dolore laboriosam amet modi ipsa sunt animi recusandae inventore,
              optio dolorum quas, minima et culpa veritatis obcaecati ipsam.
              Quia expedita fuga natus veniam recusandae commodi voluptatem,
              fugit repudiandae assumenda veritatis obcaecati, nesciunt
              perferendis amet nostrum tempore deleniti ducimus quo. Voluptate
              ut nesciunt eos aliquid, laborum sed assumenda quibusdam soluta
              commodi excepturi culpa iusto inventore voluptatem minima quia
              sint possimus temporibus minus doloribus! Ipsa, dolore doloribus!
              Qui, rem veniam quas cumque laborum ab odio quasi eum delectus
              veritatis dolorum fugit ipsam non quia explicabo dolore, eaque
              ipsum harum. Id laborum itaque maiores autem quidem blanditiis
              fugiat quam, illum molestiae aut fugit repellat quod accusamus
              provident, temporibus, a similique sunt fuga deserunt. Quaerat
              omnis iusto explicabo maiores vitae voluptates ullam culpa quod ea
              eius corrupti, eaque totam assumenda illo tempora quidem
              recusandae. Cupiditate, odit. Neque, vero qui ad distinctio
              ducimus quos ipsam debitis optio aperiam. Laborum expedita
              consequatur repellendus. Ab fuga odio sequi qui!
            </Text>
          </View>
        </Card>
      </View>
      <Footer />
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
});

export default BlogDetails;
