import { useState } from "react";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const getToken = localStorage.getItem("amivid-token");
  let userData = {};
  if (getToken) {
    const decodedToken = jwtDecode(getToken);
    userData = decodedToken;
  }

  const [user, setUser] = useState(userData);

  const handleLogout = () => {
    localStorage.removeItem("amivid-token");
    setUser({});
  };

  return {
    user,
    setUser,
    handleLogout,
  };
};

export default useAuth;
