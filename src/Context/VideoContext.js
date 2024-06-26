import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeVideos = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}/video/home-videos`
        );
        setVideos(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchHomeVideos();
  }, []);

  const addVideo = (userId, newVideo) => {
    setVideos((prevVideos) =>
      prevVideos.map((user) =>
        user._id === userId
          ? { ...user, videos: [newVideo, ...user.videos] }
          : user
      )
    );
  };

  const deleteVideo = (userId, videoId) => {
    setVideos((prevVideos) =>
      prevVideos.map((user) =>
        user._id === userId
          ? {
              ...user,
              videos: user.videos.filter((video) => video._id !== videoId),
            }
          : user
      )
    );
  };

  return (
    <VideoContext.Provider value={{ videos, loading, addVideo, deleteVideo , setVideos}}>
      {children}
    </VideoContext.Provider>
  );
};
