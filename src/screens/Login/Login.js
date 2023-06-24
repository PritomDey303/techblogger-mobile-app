import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";

const Login = () => {
  return (
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
        onPress={() => console.log("aye")}
      />

      <Text style={styles.registerLink}>
        <Text style={styles.text}> Don't have an account?</Text> Register here
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  registerLink: {
    marginTop: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
  },
  text: {
    fontWeight: "bold",

    color: "#6c757d",
  },
});

export default Login;
