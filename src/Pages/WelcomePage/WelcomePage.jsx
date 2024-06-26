import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <main>
      <Box
        component="section"
        sx={{
          minHeight: "100vh",
          padding: "50px 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography sx={{
            mb:"20px"
          }}>
            Please check your inbox. We sent an email with a Login Password.
          </Typography>
          <Link to="/sign-in">
            <Button variant="contained">Let's Login</Button>
          </Link>
        </Box>
      </Box>
    </main>
  );
};

export default WelcomePage;
