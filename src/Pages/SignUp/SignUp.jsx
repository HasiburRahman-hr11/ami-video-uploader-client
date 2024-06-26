import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import axios from "axios";
import { Alert, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [alertPopup, setAlertPopup] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();


  const handleSignUp = async (event) => {
    event.preventDefault();
    if (!firstName || !lastName || !email || !phone) {
      setError("Please fill the form correctly!");
      setAlertPopup(true);
      return;
    }
    setLoading(true);


    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_API_URL}/user/register/by-email`, {
        firstName,
        lastName,
        email,
        phone
      });
      if (res.status === 409) {
        setError(res.data?.message || "User already exist!");
        setAlertPopup(true);
      }
      if (res.status === 500) {
        setError("Check the email you provided and try again.");
        setAlertPopup(true);
      }
      if (res.status === 200) {
        setError("");
        setResponseMessage("Your account has been created successfully.");
        setAlertPopup(true);
        setLoading(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        navigate("/pre-login");
      }
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
                Sign Up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSignUp}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label="Your First Name"
                  name="firstName"
                  autoComplete="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Your Last Name"
                  name="lastName"
                  autoComplete="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Typography
                  component="p"
                  sx={{ color: "#777", fontSize: "13px", mb: "5px" }}
                >
                  Note: Please provide a valid email address. We will send your login password to this email.
                </Typography>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                  {loading ? <CircularProgress sx={{color:"#fff", width:"24px !important", height:"24px !important"}} /> : 'Sign Up'}
                </Button>
                <Box>
                  <Box component="p" sx={{ textAlign: "center" }}>
                    <Link to="/sign-in">
                      {"Already have an account? Sign In"}
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

export default SignUp;
