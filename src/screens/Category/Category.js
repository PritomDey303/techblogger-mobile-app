import React from "react";
import { FlatList, Image, Text, TouchableHighlight, View } from "react-native";
import { CategoryList } from "../../Context/CategoryList";
import styles from "../Category/styles";

export default function Category() {
  const renderCategory = ({ item }) => (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={() => {
        console.log("Pressed");
      }}
    >
      <View style={styles.categoriesItemContainer}>
        <Image
          style={styles.categoriesPhoto}
          source={{ uri: item.photo_url }}
        />
        <Text style={styles.categoriesName}>{item.value}</Text>
        <Text style={styles.categoriesInfo}>5 posts</Text>
      </View>
    </TouchableHighlight>
  );
  return (
    <View>
      <FlatList
        data={CategoryList}
        renderItem={renderCategory}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
}
