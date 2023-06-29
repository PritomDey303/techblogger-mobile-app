import React, { createContext, useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toastConfig, setToastConfig] = useState(null);

  const showToast = (message, duration = 3000) => {
    setToastConfig({ message, duration });
    setTimeout(hideToast, duration);
  };

  const hideToast = () => {
    setToastConfig(null);
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toastConfig && (
        <View style={styles.toastContainer}>
          <Text style={styles.toastText}>{toastConfig.message}</Text>
        </View>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "#333333",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  toastText: {
    color: "#ffffff",
  },
});
