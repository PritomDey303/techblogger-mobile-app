import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import Footer from "../../components/Footer/Footer";

const Login = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={styles.container}>
        <Input
          placeholder="Email"
          leftIcon={{ type: "material", name: "email" }}
          keyboardType="email-address"
        />
        <Input
          placeholder="Password"
          leftIcon={{ type: "material", name: "lock" }}
          secureTextEntry
        />
        <Button
          title="Log in"
          loading={false}
          loadingProps={{ size: "small", color: "white" }}
          buttonStyle={{
            backgroundColor: "#dc3545",
            borderRadius: 10,
          }}
          onPress={() => {
            navigation.navigate("Register");
          }}
        />

        <Text style={styles.text}>
          Already have an account?{" "}
          <Text
            style={styles.registerLink}
            onPress={() => navigation.navigate("Register")}
          >
            Register here
          </Text>
        </Text>
      </View>
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    paddingTop: 170,
    paddingBottom: 200,
  },
  registerLink: {
    marginTop: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#6c757d",
    marginTop: 36,
  },
});

export default Login;
