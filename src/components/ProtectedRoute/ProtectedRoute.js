import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { authData, loading } = useContext(AuthContext);
  const { isLoggedIn } = authData;
  if (loading) return null;

  return isLoggedIn ? <Component {...rest} /> : null;
};

export default ProtectedRoute;
