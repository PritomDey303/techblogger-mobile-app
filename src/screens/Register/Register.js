import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
//import button as alias from react-native-elements
import { format } from "date-fns";
import { AuthContext } from "../../Context/AuthContext";
import {
  emailValidator,
  mobileValidator,
  passwordValidator,
  usernameValidator,
} from "../../UtilityFunction/useInputValidator";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";

const Register = ({ navigation }) => {
  const { loading, signup, notification } = React.useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const date = new Date();
  const [selectedDate, setSelectedDate] = useState(date);
  const [showPicker, setShowPicker] = useState(false);
  const [error, setError] = useState("");
  const windowHeight = Dimensions.get("window").height;
  const [formattedDate, setFormattedDate] = useState(
    format(date, "dd/MM/yyyy")
  );
  //getting only date from datetime picker using moment
  const handleDateChange = (event, date) => {
    console.log(date);
    if (date !== undefined) {
      setSelectedDate(date);
      const formattedDate = format(date, "dd/MM/yyyy");
      setFormattedDate(formattedDate);
    }
    setShowPicker(false);
  };

  const validate = () => {
    if (
      name.trim() === "" ||
      username.trim() === "" ||
      email.trim() === "" ||
      mobile.trim() === "" ||
      password.trim() === ""
    ) {
      setError("All fields are required.");
      return false;
    }
    if (!emailValidator(email)) {
      setError("Invalid email.");
      return false;
    }
    if (!usernameValidator(username)) {
      setError("Invalid username.");
      return false;
    }
    if (!mobileValidator(mobile)) {
      setError("Invalid mobile number.");
      return false;
    }
    if (!passwordValidator(password)) {
      setError(
        "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number."
      );
      return false;
    }
    return true;
  };

  //check date of birth is 12 years old or not
  const checkDOB = () => {
    const today = new Date();
    const birthDate = new Date(selectedDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 12) {
      setError("You must be at least 12 years old");
      return false;
    }
    return true;
  };
  //clear input after signup
  const clearInput = () => {
    setUsername("");
    setEmail("");
    setMobile("");
    setName("");
    setPassword("");
    setSelectedDate(date);
    setFormattedDate(format(date, "dd/MM/yyyy"));
  };

  //handle signup
  const handleSignUp = () => {
    const isValid = validate();
    const isDOBValid = checkDOB();
    if (isValid && isDOBValid) {
      signup(
        {
          name,
          username,
          email,
          mobile,
          password,
          dob: selectedDate,
        },
        clearInput
      );
    }
  };

  //useEffect to clear error after 5 seconds
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
            placeholder="Name"
            leftIcon={{ type: "material", name: "person" }}
            value={name}
            onChangeText={setName}
          />
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
          {/* datetime picker */}
          <Input
            placeholder={`DOB:` + formattedDate}
            leftIcon={{ type: "material", name: "today" }}
            //   onFocus={() => setShowPicker(true)}
            onTouchEndCapture={() => setShowPicker(true)}
            //keyboardAppearance none to hide keyboard
            keyboardAppearance="none"
            keyboardType="none"
          />
          {/* <Button
          title="Date of Birth"
          buttonStyle={{
            backgroundColor: "transparent",
            color: "black",
            borderColor: "grey",

            titleStyle: { color: "black" },

            //add only border bottom

            borderBottomWidth: 1,
            borderRadius: 10,
          }}
          onPress={() => setShowPicker(true)}
        /> */}

          {showPicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={(event, date) => handleDateChange(event, date)}
            />
          )}

          <Input
            placeholder="Password"
            leftIcon={{ type: "material", name: "lock" }}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {/* //showing error message */}
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
            title="Register"
            buttonStyle={{
              backgroundColor: "#dc3545",
              borderRadius: 10,
            }}
            onPress={() => {
              handleSignUp();
            }}
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
      )}
      {loading ? null : <Footer />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
    padding: 16,
    paddingTop: 70,
    paddingBottom: 70,
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
  button: {
    backgroundColor: "#dc3545",
  },
});

export default Register;
