import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user.email ? <>{children}</> : <Navigate to="/" />;
}
export default PrivateRoute;
