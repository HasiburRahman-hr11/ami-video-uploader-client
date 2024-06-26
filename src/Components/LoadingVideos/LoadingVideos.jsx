import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

const LoadingVideos = () => {
  return (
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
        <Typography sx={{textAlign:"center", fontSize:"20px", mt:"10px"}}>Loading Videos</Typography>
      </Box>
    </Box>
  );
};

export default LoadingVideos;
