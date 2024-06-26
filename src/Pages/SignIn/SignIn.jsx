import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, CircularProgress } from "@mui/material";
import { AuthContext } from "../../Context/AuthContext";
import { jwtDecode } from "jwt-decode";
import arrayBufferToBase64 from "../../utils/arrayBufferToBase64";

const defaultTheme = createTheme();

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertPopup, setAlertPopup] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError("Please fill the form correctly!");
      setAlertPopup(true);
      setLoading(false);
      return;
    }
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/user/login/by-email`,
        {
          email,
          password,
        }
      );
      if (res.status === 409 || res.status === 401) {
        setError(res.data?.message || "Invalid Credentials!");
        setAlertPopup(true);
        setLoading(false);
      }
      console.log(res.data)
      if (res.data.token) {
        localStorage.setItem("amivid-token", res.data.token);
      }
      if (res.data && res.data?.user) {
        let userData = res.data.user;
        if (res.data?.user?.profilePicture?.data) {
          const base64String = arrayBufferToBase64(
            res.data.user.profilePicture.data.data
          );
          const url = `data:${res.data.user?.profilePicture.contentType};base64,${base64String}`;

          userData.profilePicture = url;
        }else{
          userData.profilePicture = ""
        }
        setResponseMessage("Logged in successfully.");
        setAlertPopup(true);
        setUser(userData);
        // Clear The Form.
        setError("");
        setEmail("");
        setPassword("");
        if (userData._id) {
          navigate(`/profile/${userData._id}`);
        }
      }
      setLoading(false);
    } catch (error) {
      setError("Something went wrong!");
      setAlertPopup(true);
      console.error(error);
      setLoading(false);
    }
  };
  return (
    <>
      {alertPopup && (
        <Alert
          sx={{ position: "fixed", top: "0", right: "0", zIndex: "20" }}
          severity={error ? "error" : "success"}
          onClose={() => setAlertPopup(false)}
        >
          {error ? error : responseMessage}
        </Alert>
      )}
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1550686041-366ad85a1355)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleLogin}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, py: "10px" }}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress
                      sx={{
                        color: "#fff",
                        width: "24px !important",
                        height: "24px !important",
                      }}
                    />
                  ) : (
                    "Sign In"
                  )}
                </Button>
                <Box>
                  <Box component="p" sx={{ textAlign: "center" }}>
                    <Link to="/sign-up">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default SignIn;
