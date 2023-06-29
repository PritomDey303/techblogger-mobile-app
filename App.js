import React from "react";
import AllPostsContext from "./src/Context/AllPostsContext";
import AuthProvider from "./src/Context/AuthContext";
import AppContainer from "./src/navigations/AppNavigation";
export default function App() {
  return (
    <AuthProvider>
      <AllPostsContext>
        <AppContainer />
      </AllPostsContext>
    </AuthProvider>
  );
}
