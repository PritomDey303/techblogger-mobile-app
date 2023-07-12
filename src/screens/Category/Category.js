import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, Image, Text, TouchableHighlight, View } from "react-native";
import { AuthContext } from "../../Context/AuthContext";
import { CategoryList } from "../../Context/CategoryList";
import Footer from "../../components/Footer/Footer";
import styles from "../Category/styles";
export default function Category() {
  const { authData } = React.useContext(AuthContext);
  const navigation = useNavigation();

  const renderCategory = ({ item }) => (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={() => {
        authData.isLoggedIn
          ? navigation.navigate("CategoryBlogs", { id: item.value })
          : navigation.navigate("Login");
      }}
    >
      <View style={styles.categoriesItemContainer}>
        <Image
          style={styles.categoriesPhoto}
          source={{ uri: item.photo_url }}
        />
        <Text style={styles.categoriesName}>{item.value}</Text>
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
      <Footer />
    </View>
  );
}
