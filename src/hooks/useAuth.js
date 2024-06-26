import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import arrayBufferToBase64 from "../utils/arrayBufferToBase64";
import axios from "axios";

const useAuth = () => {
  const getToken = localStorage.getItem("amivid-token");
  let userData = {};
  if (getToken) {
    const decodedToken = jwtDecode(getToken);
    userData = decodedToken;
  }

  const [user, setUser] = useState(userData);
  const [loadingUser, setLoadingUser] = useState(false);

  const logout = () => {
    localStorage.removeItem("amivid-token");
    setUser({});
  };

  const getUser = async (user) => {
    setLoadingUser(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/user/${user._id}`
      );
      if (res.status === 200) {
        const userData = {
          _id: res.data._id,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          phone: res.data.phone,
        };

        if (res.data && res.data?.bio) {
          userData.bio = res.data.bio;
        }
        // res.data.profilePicture

        if (res.data && res.data?.profilePicture?.data) {
          const base64String = arrayBufferToBase64(
            res.data.profilePicture.data.data
          );
          const url = `data:${res.data.profilePicture.contentType};base64,${base64String}`;

          userData.profilePicture = url;
        }

        setUser(userData);
        setLoadingUser(false);
      }
    } catch (error) {
      console.log(error);
      setLoadingUser(false);
    }
  };

  return {
    user,
    setUser,
    logout,
    getUser,
    loadingUser,
  };
};

export default useAuth;
