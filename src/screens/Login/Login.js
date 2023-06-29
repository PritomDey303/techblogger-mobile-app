import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { AuthContext } from "../../Context/AuthContext";
import {
  checkStringType,
  passwordValidator,
} from "../../UtilityFunction/useInputValidator";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";

const Login = () => {
  const { login, notification, loading } = React.useContext(AuthContext);
  const navigation = useNavigation();
  const [rememberMe, setRememberMe] = React.useState(false);
  const [text, setText] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const windowHeight = Dimensions.get("window").height;

  const [loginData, setLoginData] = React.useState({
    email: "",
    username: "",
    mobile: "",
    password: "",
  });
  const clearInput = () => {
    setLoginData({
      email: "",
      username: "",
      mobile: "",
      password: "",
    });
    setText("");
    setPassword("");
  };
  //validator function
  const validate = () => {
    if (text.trim() === "") {
      setError("Please enter your email or username or mobile");
      return false;
    }
    if (password.trim() === "") {
      setError("Please enter your password");
      return false;
    }
    if (passwordValidator(password) === false) {
      setError(
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number"
      );
      return false;
    }

    if (checkStringType(text) === "email") {
      loginData.email = text;
      return true;
    }
    if (checkStringType(Number(text)) === "mobile") {
      loginData.mobile = text;
      return true;
    }
    if (checkStringType(text) === "username") {
      loginData.username = text;

      return true;
    }
    setError("Invalid input. Please enter a valid email or username or mobile");
    return false;
  };

  //handle login function
  const handleLogin = () => {
    const isValid = validate();
    console.log(isValid);

    console.log(loginData);
    if (isValid) {
      loginData.password = password;

      console.log(loginData);
      login(loginData, clearInput);
      setError("");
    }
  };
  //clear setError after 5 seconds

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [error]);

  return (
    <ScrollView contentContainerStyle={{ minHeight: windowHeight }}>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <Input
            placeholder="Email or Username or Mobile"
            leftIcon={{ type: "material", name: "email" }}
            keyboardType="text"
            value={text}
            onChangeText={(text) => setText(text)}
          />
          <Input
            placeholder="Password"
            leftIcon={{ type: "material", name: "lock" }}
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          {/* <CheckBox
      title="Remember Me"
      checked={rememberMe}
      containerStyle={styles.checkbox}
      onPress={() => setRememberMe(!rememberMe)}
      checkedColor="#dc3545"
    /> */}
          {/* show notification */}
          {notification?.message !== "" ? (
            <Text
              style={{
                color: notification.type === "error" ? "red" : "green",
                marginBottom: 10,
                fontWeight: "bold",
              }}
            >
              {notification.message}
            </Text>
          ) : null}
          {error !== "" ? (
            <Text
              style={{ color: "red", marginBottom: 10, fontWeight: "bold" }}
            >
              {error}
            </Text>
          ) : null}

          <Button
            title="Log in"
            loading={false}
            loadingProps={{ size: "small", color: "white" }}
            buttonStyle={{
              backgroundColor: "#dc3545",
              borderRadius: 10,
            }}
            onPress={() => {
              handleLogin();
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
      )}
      {!loading && <Footer />}
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
  checkbox: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderWidth: 0,
    padding: 0,
    marginVertical: 5,
    marginBottom: 20,
    color: "#6c757d",
  },
});

export default Login;
