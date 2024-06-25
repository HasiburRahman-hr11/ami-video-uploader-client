import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Backdrop,
  Modal,
  Fade,
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress,
} from "@mui/material";
import { AuthContext } from "../../Context/AuthContext";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import arrayBufferToBase64 from "../../utils/arrayBufferToBase64";

const UserInfo = () => {
  const { user, setUser } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertPopup, setAlertPopup] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState("");

  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState();

  const handleProfilePictureChange = (e) => {
    setProfilePicturePreview(URL.createObjectURL(e.target.files[0]));
    setProfilePicture(e.target.files[0]);
  };

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setPhone(user.phone);
    if (user?.profilePicture) {
      setProfilePicturePreview(user.profilePicture);
    }
    if (user?.bio) {
      setBio(user.bio);
    }
  }, [user]);

  //   console.log(user);

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    if (!firstName || !lastName || !phone) {
      setError("Please fill the form correctly!");
      setAlertPopup(true);
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("phone", phone);
    formData.append("bio", bio);
    formData.append("profilePicture", profilePicture);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/user/update/${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        const userData = {
          _id: res.data._id,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          phone: res.data.phone,
        };

        if (res.data && res.data?.bio) {
          userData.bio = res.data.bio;
        }
        if (res.data && res.data?.profilePicture?.data) {
          const base64String = arrayBufferToBase64(
            res.data.profilePicture.data.data
          );
          const url = `data:${res.data.profilePicture.contentType};base64,${base64String}`;
          userData.profilePicture = url;
        }
        setUser(userData);
        setResponseMessage("Profile Updated Successfully!");
        setAlertPopup(true);
        setLoading(false);
        handleCloseModal();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Box
      component="div"
      sx={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "50px 0",
        width: "max-content",
      }}
    >
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <Box sx={modalContent}>
            <Typography
              id="transition-modal-title"
              variant="h4"
              component="h4"
              sx={{
                textAlign: "center",
                marginBottom: "30px",
              }}
            >
              Edit Profile
            </Typography>

            <form
              style={{ display: "block" }}
              onSubmit={handleUpdateProfile}
              encType="multipart/form-data"
            >
              <Box
                component="div"
                sx={{
                  width: "max-content",
                  position: "relative",
                  margin: "0 auto",
                }}
              >
                <input
                  type="file"
                  name="profilePicture"
                  id="profilePicture"
                  onChange={handleProfilePictureChange}
                  style={{
                    opacity: 0,
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    cursor: "pointer",
                    left: "0",
                    top: "0",
                    zIndex: 10,
                  }}
                />
                {profilePicturePreview && (
                  <Avatar
                    alt="Cindy Baker"
                    src={profilePicturePreview}
                    sx={{ width: "90px", height: "90px" }}
                  />
                )}
                {!profilePicturePreview && (
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

              <Grid container spacing={2} sx={{ mt: "20px" }}>
                <Grid item md={6} sm={12}>
                  <Box sx={{ marginBottom: "20px" }}>
                    <TextField
                      fullWidth
                      label="First Name"
                      variant="outlined"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Box>
                </Grid>
                <Grid item md={6} sm={12}>
                  <Box sx={{ marginBottom: "20px" }}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      variant="outlined"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ marginBottom: "20px" }}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  variant="outlined"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Box>
              <Box sx={{ marginBottom: "20px" }}>
                <TextField
                  fullWidth
                  multiline
                  label="Bio"
                  variant="outlined"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <Button variant="contained" type="submit" disabled={loading}>
                  {loading ? (
                    <CircularProgress
                      sx={{
                        color: "#fff",
                        width: "20px !important",
                        height: "20px !important",
                      }}
                    />
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </Box>
              {alertPopup && (
                <Typography
                  sx={{
                    textAlign: "center",
                    color: error ? "red" : "black",
                    marginTop: "20px",
                  }}
                >
                  {error ? error : responseMessage}
                </Typography>
              )}
            </form>
          </Box>
        </Fade>
      </Modal>
      <Box
        component="div"
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          component="div"
          sx={{
            width: "max-content",
            position: "relative",
          }}
        >
          {user?.profilePicture ? (
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Button onClick={handleOpenModal} variant="outlined">
          Edit Profile
        </Button>
      </Box>
    </Box>
  );
};

export default UserInfo;

const modalContent = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxWidth: "700px",
};
