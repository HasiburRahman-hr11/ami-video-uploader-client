import React, { useEffect, useState } from "react";
import Navigation from "../../Components/Navigation/Navigation";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Avatar, Box, CircularProgress, Typography } from "@mui/material";
import arrayBufferToBase64 from "../../utils/arrayBufferToBase64";
import VideosWrapper from "../../Components/Profile/VideosWrapper";

const OtherProfile = () => {
  const params = useParams();
  const [user, setUser] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      setLoadingUser(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}/user/${params.userId}`
        );
        if (res.data && res.data._id) {
          let userData = res.data;
          if (res.data?.profilePicture?.data) {
            const base64String = arrayBufferToBase64(
              res.data.profilePicture.data.data
            );
            const url = `data:${res.data.profilePicture.contentType};base64,${base64String}`;

            userData.profilePicture = url;
          }
          setUser(userData);
        }
        setLoadingUser(false);
      } catch (error) {
        console.log(error);
        setLoadingUser(false);
      }
    };
    if (params?.userId) {
      getUser();
    }
  }, [params]);
  return (
    <main>
      <Navigation />
      <Box component="section" sx={{ minHeight: "300px" }}>
        {loadingUser ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "300px",
              padding: "50px 0",
              textAlign: "center",
            }}
          >
            <Box>
              <CircularProgress
                sx={{
                  color: "#1976D2",
                  width: "35px !important",
                  height: "35px !important",
                }}
              />
              <Typography
                sx={{ textAlign: "center", fontSize: "20px", mt: "10px" }}
              >
                Loading User Information
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box
            component="div"
            sx={{
              maxWidth: "800px",
              margin: "0 auto",
              padding: "80px 0",
              width: "max-content",
            }}
          >
            {user?.firstName ? (
              <>
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "max-content",
                    margin: "0 auto",
                  }}
                >
                  <Box
                    component="div"
                    sx={{
                      width: "max-content",
                      position: "relative",
                    }}
                  >
                    {!loadingUser && user?.profilePicture ? (
                      <Box
                        sx={{
                          width: "90px",
                          height: "90px",
                          borderRadius: "50%",
                          overflow: "hidden",
                          background: "#d9d9d9",
                        }}
                      >
                        <img
                          src={user.profilePicture}
                          alt="Profile Picture"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      </Box>
                    ) : (
                      <Avatar
                        sx={{
                          bgcolor: "#d9d9d9",
                          width: "90px",
                          height: "90px",
                          color: "#333",
                          fontWeight: "600",
                        }}
                      >
                        {user.firstName.charAt(0) + user.lastName.charAt(0)}
                      </Avatar>
                    )}
                  </Box>
                  <Box component="div" sx={{ flex: 1, pl: "20px" }}>
                    <Typography
                      component="h3"
                      variant="h3"
                      sx={{
                        fontSize: {
                          md: "30px",
                          sm: "20px",
                          xs: "15px",
                        },
                      }}
                    >
                      {" "}
                      {user.firstName + " " + user.lastName}{" "}
                    </Typography>
                    <Typography
                      component="p"
                      variant="p"
                      sx={{
                        fontSize: {
                          sm: "12px",
                          md: "15px",
                        },
                        color: "#666666",
                        mt: "5px",
                      }}
                    >
                      {" "}
                      {user.email}{" "}
                    </Typography>
                  </Box>
                </Box>

                {user && user?.bio && (
                  <Box sx={{ mt: "20px", textAlign: "center" }}>
                    <Typography>{user.bio}</Typography>
                  </Box>
                )}
              </>
            ) : (
              <Box>
                <Typography sx={{ textAlign: "center" }}>
                  User Not Found!
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>
      <VideosWrapper />
    </main>
  );
};

export default OtherProfile;
