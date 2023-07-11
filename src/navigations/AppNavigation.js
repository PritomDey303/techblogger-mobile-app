import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { AuthContext } from "../Context/AuthContext";
import BlogDetails from "../screens/BlogDetails/BlogDetails";
import Blogs from "../screens/Blogs/Blogs";
import Category from "../screens/Category/Category";
import DrawerContainer from "../screens/DrawerContainer/DrawerContainer";
import HomeScreen from "../screens/Home/HomeScreen";
import Login from "../screens/Login/Login";
import ManageBlogs from "../screens/ManageBlogs/ManageBlogs";
import Register from "../screens/Register/Register";

const Stack = createStackNavigator();

function MainNavigator() {
  const { authData, loading } = React.useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontWeight: "bold",
          textAlign: "center",
          alignSelf: "center",
          flex: 1,
          marginTop: 13,
        },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Categories" component={Category} />

      {/* <Stack.Screen name="Login" component={Login} /> */}
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Blogs" component={Blogs} />

      {!authData?.isLoggedIn ? (
        <Stack.Screen name="Login" component={Login} />
      ) : (
        <Stack.Screen name="BlogDetails" component={BlogDetails} />
      )}
      <Stack.Screen name="ManageBlogs" component={ManageBlogs} />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function DrawerStack() {
  return (
    <Drawer.Navigator
      drawerPosition="left"
      initialRouteName="Main"
      drawerStyle={{
        width: 250,
      }}
      screenOptions={{ headerShown: false }}
      drawerContent={({ navigation }) => (
        <DrawerContainer navigation={navigation} />
      )}
    >
      <Drawer.Screen name="Main" component={MainNavigator} />
    </Drawer.Navigator>
  );
}

export default function AppContainer() {
  return (
    <NavigationContainer>
      <DrawerStack />
    </NavigationContainer>
  );
}

console.disableYellowBox = true;
