import React from "react";
import AllPostsContext from "./src/Context/AllPostsContext";
import AppContainer from "./src/navigations/AppNavigation";
export default function App() {
  return (
    <AllPostsContext>
      <AppContainer />
    </AllPostsContext>
  );
}
