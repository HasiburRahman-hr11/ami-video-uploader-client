import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Container, Grid, Button } from "@mui/material";
import UploadVideo from "./UploadVideo";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import LoadingVideos from "../LoadingVideos/LoadingVideos";
import { useParams } from "react-router-dom";

const VideosWrapper = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const { user } = useContext(AuthContext);
  const params = useParams();

  useEffect(() => {
    const fetchUserVideos = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}/video/user-videos/${params.userId}?page=${page}&limit=${limit}`
        );

        if (page > 1) {
          setVideos([...videos, ...res.data.videos]);
        } else {
          setVideos(res.data.videos);
        }
        if (page >= res.data.totalPage) {
          setHasMore(false);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchUserVideos();
  }, [params, page, limit]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  return (
    <Box
      component="section"
    >
      <Box
        component="div"
        sx={{
          padding: "60px 0",
          background: "#f9f9f9",
          borderRadius: "15px",
          position: "relative",
        }}
      >
        <Container maxWidth="1600px">
          {params?.userId === user._id ? (
            <>
              <Typography
                component="h3"
                variant="h3"
                sx={{
                  textAlign: "center",
                  fontWeight: "500",
                  marginBottom: "20px",
                }}
              >
                My Videos
              </Typography>
              <UploadVideo setVideos={setVideos} />
            </>
          ) : (
            <Typography
              component="h3"
              variant="h3"
              sx={{
                textAlign: "center",
                fontWeight: "500",
                marginBottom: "20px",
              }}
            >
              All Videos
            </Typography>
          )}

          <>
            {videos.length === 0 && !loading ? (
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
              <Box sx={{ padding: "50px 0" }}>
                <Grid container spacing={3}>
                  {videos.map((video) => (
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
                {hasMore && !loading && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      mt: "30px",
                    }}
                  >
                    <Button variant="contained" onClick={loadMore}>
                      Load More
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          </>

          {loading && <LoadingVideos />}
        </Container>
      </Box>
    </Box>
  );
};

export default VideosWrapper;
