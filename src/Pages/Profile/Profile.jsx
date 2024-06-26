import React from "react";

import UserInfo from "../../Components/Profile/UserInfo";
import VideosWrapper from "../../Components/Profile/VideosWrapper";
import Navigation from "../../Components/Navigation/Navigation";

const Profile = () => {
  return (
    <main>
      <Navigation />
      <UserInfo />
      <VideosWrapper />
    </main>
  );
};

export default Profile;
