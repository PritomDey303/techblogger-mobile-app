import PropTypes from "prop-types";
import React from "react";
import { View } from "react-native";
import MenuButton from "../../components/MenuButton/MenuButton";
import styles from "./styles";

export default function DrawerContainer(props) {
  const { navigation } = props;
  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <MenuButton
          title="HOME"
          source={require("../../../assets/icons/home.png")}
          onPress={() => {
            navigation.navigate("Home");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="Blogs"
          source={require("../../../assets/icons/blog.png")}
          onPress={() => {
            navigation.navigate("Blogs");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="CATEGORIES"
          source={require("../../../assets/icons/category.png")}
          onPress={() => {
            navigation.navigate("Categories");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="SEARCH"
          source={require("../../../assets/icons/search.png")}
          onPress={() => {
            navigation.navigate("Search");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="LOGIN"
          source={require("../../../assets/icons/login.png")}
          onPress={() => {
            navigation.navigate("Login");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="REGISTER"
          source={require("../../../assets/icons/register.png")}
          onPress={() => {
            navigation.navigate("Register");
            navigation.closeDrawer();
          }}
        />
      </View>
    </View>
  );
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};
