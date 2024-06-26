import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import SignUp from "./Pages/SignUp/SignUp";
import PrivateRoute from "./utils/PrivateRoute";
import NotFound from "./Pages/NotFound/NotFound";
import SignIn from "./Pages/SignIn/SignIn";
import Profile from "./Pages/Profile/Profile";
import arrayBufferToBase64 from "./utils/arrayBufferToBase64";
import { AuthContext } from "./Context/AuthContext";
import axios from "axios";
import OtherProfile from "./Pages/OtherProfile/OtherProfile";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import WelcomePage from "./Pages/WelcomePage/WelcomePage";

const App = () => {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const getUserFromDB = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}/user/${user._id}`
        );
        if (res.status === 200) {
          let userData = {
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
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/pre-login" element={<WelcomePage />} />
        <Route path="/user/profile/:userId" element={<OtherProfile />} />

        <Route
          path="/profile/:userId"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
