import { Box, Typography } from "@mui/material";
import React from "react";

const Banner = () => {
  return (
    <Box component="section" sx={{ position: "relative", minHeight:"500px", overflow:"hidden" }}>
      <Box component="div">
        <Box
          component="img"
          src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg"
          alt="banner"
          sx={{
            width: "100%",
            display: "block",
            height: "100%",
            maxHeight: "600px",
            objectFit: "cover",
          }}
        />
      </Box>
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(0,0,0,0.5)",
          zIndex:"10",
          top:0,
          left:0
        }}
      >
        <Typography sx={{ fontSize: "50px", fontWeight: "600", color: "#fff" }}>
          Welcome to Video Box
        </Typography>
      </Box>
    </Box>
  );
};

export default Banner;
