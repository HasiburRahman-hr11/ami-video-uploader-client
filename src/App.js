import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import SignUp from "./Pages/SignUp/SignUp";
import PrivateRoute from "./utils/PrivateRoute";
import NotFound from "./Pages/NotFound/NotFound";
import SignIn from "./Pages/SignIn/SignIn";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { AuthContext } from "./Context/AuthContext";
import axios from "axios";
import arrayBufferToBase64 from "./utils/arrayBufferToBase64";

const App = () => {
  const { user, setUser } = useContext(AuthContext);

  // Function to convert ArrayBuffer to base64

  useEffect(() => {
    const getUserFromDB = async () => {
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
          console.log("UserData from App --", userData);

          setUser(userData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (user && user?._id) {
      getUserFromDB();
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
