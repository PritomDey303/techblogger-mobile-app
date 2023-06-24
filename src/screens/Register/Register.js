import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";

const Register = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleSignup = () => {
    // Perform signup logic here
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Username"
        leftIcon={{ type: "material", name: "person" }}
        value={username}
        onChangeText={setUsername}
      />
      <Input
        placeholder="Email"
        leftIcon={{ type: "material", name: "email" }}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Mobile"
        leftIcon={{ type: "material", name: "phone" }}
        keyboardType="phone-pad"
        value={mobile}
        onChangeText={setMobile}
      />
      <Input
        placeholder="Name"
        leftIcon={{ type: "material", name: "person" }}
        value={name}
        onChangeText={setName}
      />
      <Input
        placeholder="Password"
        leftIcon={{ type: "material", name: "lock" }}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title="Register"
        loading={false}
        loadingProps={{ size: "small", color: "white" }}
        buttonStyle={{
          backgroundColor: "#dc3545",
          borderRadius: 10,
        }}
        onPress={() => console.log("aye")}
      />
      <Text style={styles.redirectMessage}>
        Already have an account?{" "}
        <Text
          style={styles.redirectLink}
          onPress={() => navigation.navigate("Login")}
        >
          Login here
        </Text>
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
  datePicker: {
    width: "100%",
    marginBottom: 16,
  },
  redirectMessage: {
    marginTop: 36,
    textAlign: "center",

    color: "#6c757d",
    fontWeight: "bold",
  },
  redirectLink: {
    color: "blue",
    fontWeight: "bold",
  },
});

export default Register;
