import React from "react";
import { Box, Typography, Grid, Container, Button } from "@mui/material";

const VideosWrapper = () => {
  return (
    <Box
      component="section"
      sx={{
        padding: "0 30px",
      }}
    >
      <Box
        component="div"
        sx={{
          padding: "30px 0",
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
              marginBottom:"20px"
            }}
          >
            My Videos
          </Typography>
          <Box
          sx={{
            width: "max-content",
            margin:"0 auto"
          }}
        >
          <Button variant="contained">Upload Video</Button>
        </Box>

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
        </Container>
      </Box>
    </Box>
  );
};

export default VideosWrapper;
