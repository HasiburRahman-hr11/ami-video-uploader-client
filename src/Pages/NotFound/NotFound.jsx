import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

const NotFound = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "rgb(246, 244, 253)",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        padding: "50px 30px",
        textAlign: "center",
        minHeight: "100vh",
      }}
    >
      <Box>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: "200px",
            fontFamily: '"Cormorant", serif',
            fontWeight: "700",
          }}
        >
          404
        </Typography>
        <Typography variant="p" component="p" sx={{ mb: "30px" }}>
          Page Not Found!
        </Typography>
        <Box
          sx={{
            width: "max-content",
            margin: "0 auto",
            backgroundColor: "#1F145E",
            padding: "10px 30px",
            borderRadius: "7px",
            transition: "all 0.5s ease",
            "&:hover": {
              backgroundColor: "#534a86",
            },
          }}
        >
          <Link
            to="/"
            style={{
              color: "#ffffff",
              fontSize: "14px",
              textTransform: "uppercase",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: '"Cormorant", serif',
              fontWeight: "700",
            }}
          >
            {" "}
            <HomeIcon sx={{ mr: "10px" }} /> <span>Go TO Home</span>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default NotFound;
