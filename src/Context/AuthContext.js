//Auth context to handle user authentication and authorization manually
import React, { createContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "./Url";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [loginTrigger, setLoginTrigger] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [authData, setAuthData] = useState({
    isLoggedIn: false,
    user: null,
  });
  const [loading, setLoading] = useState(true);
  //async get token function

  const getToken = async () => {
    const token = await AsyncStorage.getItem("token");
    return token;
  };
  useEffect(() => {
    //write async function to validate token and get user data
    const validateToken = async () => {
      const token = await getToken();
      if (token) {
        fetch(`${url}/api/auth/keeplogin`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            //console.log(data);
            if (data?.status === "success") {
              setAuthData({
                isLoggedIn: true,
                user: data?.user,
                token: token,
              });
              setLoading(false);
            }
            if (data?.status === "error") {
              setLoading(false);
            }
          });
      } else {
        setLoading(false);
      }
    };
    validateToken();
  }, [loginTrigger]);

  const login = async (data, clearInput) => {
    setLoading(true);
    //api call for login
    fetch(`${url}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.status === "success") {
          //clear all previous token

          AsyncStorage.setItem("token", data.token);

          setAuthData({
            isLoggedIn: true,
            user: data?.user,
            token: data?.token,
          });
          setLoading(false);
          setNotification({ message: data.message, type: "success" });
          clearInput();
          setLoginTrigger(!loginTrigger);
        }
        if (data?.status === "error") {
          setNotification({ message: data.message, type: "error" });
          setLoading(false);
        }
        return data;
      });
  };

  //signup function

  const signup = (authdata, clearInput) => {
    setLoading(true);
    console.log(loading);
    //api call for signup
    fetch(`${url}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authdata),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.status === "success") {
          setLoading(false);
          setNotification({ message: data.message, type: "success" });
          setLoading(false);
          setIsSignup(true);
          clearInput();
        }

        if (data?.status === "error") {
          setNotification({ message: data.message, type: "error" });
          setLoading(false);
        }
      });
  };

  //logout function

  const logout = () => {
    setLoading(true);
    setAuthData({
      isLoggedIn: false,
      user: null,
    });
    AsyncStorage.removeItem("token");
    setLoading(false);
    setLoginTrigger(!loginTrigger);
  };
  //show notification timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 5000);
    return () => clearTimeout(timer);
  }, [notification]);

  return (
    <AuthContext.Provider
      value={{
        authData,
        login,
        signup,
        logout,
        loading,
        isSignup,
        setIsSignup,
        notification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
