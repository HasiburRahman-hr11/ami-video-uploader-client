import React from "react";

import UserInfo from "../../Components/Dashboard/UserInfo";
import VideosWrapper from "../../Components/Dashboard/VideosWrapper";

const Dashboard = () => {
  return (
    <main>
      <UserInfo />
      <VideosWrapper />
    </main>
  );
};

export default Dashboard;
