import React, { useContext, useEffect, useState } from "react";
import { VideoContext } from "../../Context/VideoContext";
import { Avatar, Box, Button, Container, Grid, Typography } from "@mui/material";
import LoadingVideos from "../LoadingVideos/LoadingVideos";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import arrayBufferToBase64 from "../../utils/arrayBufferToBase64";

const VideosWrapper = () => {
  const { videos, loading } = useContext(VideoContext);
  const { user } = useContext(AuthContext);

  const [homeVideos , setHomeVideos] = useState([...videos]);

  useEffect(()=>{
    if(user && user._id){
      const otherUsersVideos = videos.filter(otherUser => otherUser._id !== user._id);
      const myVideos = videos.filter(otherUser => otherUser._id === user._id);
      setHomeVideos([...myVideos , ...otherUsersVideos])
    }else{
      setHomeVideos([...videos])
    }
  },[user, videos]);

  return (
    <Box
      sx={{
        padding: "60px 0",
        background: "#f9f9f9",
        borderRadius: "15px",
        position: "relative",
      }}
    >
      <Container maxWidth="1600px">
        <Typography
          component="h3"
          variant="h3"
          sx={{
            textAlign: "center",
            fontWeight: "500",
            pb: "20px",
          }}
        >
          All Videos
        </Typography>

        {loading ? (
          <LoadingVideos />
        ) : (
          <>
            {homeVideos && homeVideos.length === 0 ? (
              <Box
                component="div"
                sx={{
                  padding: "50px 0",
                }}
              >
                <Typography
                  component="p"
                  variant="p"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  No videos uploaded yet.
                </Typography>
              </Box>
            ) : (
              <Box>
                {homeVideos.map((uploader) => (
                  <Box
                    key={uploader._id}
                    sx={{
                      padding: "30px 20px",
                      background: "#f1f1f1",
                      borderRadius: "10px",
                      mt: "30px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: "30px",
                      }}
                    >
                      <Box sx={{
                        display: "flex",
                        alignItems: "center",
                      }}>
                        {uploader?.profilePicture && uploader?.profilePicture?.data ? (
                          <Avatar src={`data:${uploader?.profilePicture.contentType};base64,${arrayBufferToBase64(
                              uploader?.profilePicture.data.data
                            )}`} />
                        ): (
                          <Avatar> {uploader.firstName.charAt(0) + uploader.lastName.charAt(0)}</Avatar>
                        )}
                        <Typography
                          sx={{
                            fontSize: "25px",
                            fontWeight: "500",
                            paddingLeft:"10px"
                          }}
                        >
                          {uploader.firstName + " " + uploader.lastName} {user && user?._id === uploader._id && '(You)'}
                        </Typography>
                      </Box>
                      <Button variant="contained">
                        {user && user?._id === uploader._id ? (
                          <Link
                            to={`/profile/${uploader._id}`}
                            style={{ color: "#fff" }}
                          >
                            View All
                          </Link>
                        ) : (
                          <Link
                            to={`/user/profile/${uploader._id}`}
                            style={{ color: "#fff" }}
                          >
                            View All
                          </Link>
                        )}
                      </Button>
                    </Box>

                    <Grid container spacing={3}>
                      {uploader.videos.map((video) => (
                        <Grid item sm={6} md={4} key={video._id}>
                          <Box
                            sx={{
                              background: "#fff",
                              padding: "10px 10px",
                              borderRadius: "5px",
                            }}
                          >
                            <Box
                              component="video"
                              controls
                              src={video.url}
                              sx={{
                                display: "block",
                                width: "100%",
                                height: "250px",
                                objectFit: "cover",
                              }}
                            ></Box>
                            <Typography
                              sx={{
                                fontSize: "20px",
                                fontWeight: "500",
                                my: "15px",
                                padding: "0 8px",
                              }}
                            >
                              {video.title}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                ))}
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default VideosWrapper;
