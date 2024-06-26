import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Backdrop,
  Modal,
  Fade,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { VideoContext } from "../../Context/VideoContext";

const UploadVideo = ({ setVideos }) => {
  const { user } = useContext(AuthContext);
  const { setVideos: setHomeVideos } = useContext(VideoContext);
  const [openModal, setOpenModal] = useState(false);
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoError, setVideoError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [serverError, setServerError] = useState("");

  const [uploading, setUploading] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    const wordCount = value.trim().split(/\s+/).length;
    if (wordCount > 30) {
      setTitleError("Title must be less than 30 words");
    } else {
      setTitleError("");
      setTitle(value);
    }
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    const wordCount = value.trim().split(/\s+/).length;
    if (wordCount > 150) {
      setDescriptionError("Description must be less than 150 words");
    } else {
      setDescriptionError("");
      setDescription(value);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        // Check if file size is greater than 10MB
        setVideoError("File size must be less than 10MB");
        setVideo(null);
      } else if (!file.type.startsWith("video/")) {
        // Check if file type is a video
        setVideoError("File must be a video");
        setVideo(null);
      } else {
        setVideoError("");
        setVideo(file);
      }
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("video", video);
    formData.append("title", title);
    formData.append("description", description);

    setVideoError("");
    setServerError("");
    setUploading(true);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/video/upload/${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 201) {
        setVideos((prevVideos) => [res.data, ...prevVideos]);

        handleCloseModal();
        setVideo(null);
        setTitle("");
        setDescription("");
        // Refetch Home Videos
        await fetchHomeVideos();
      }
      setUploading(false);
    } catch (err) {
      console.error(err);
      setUploading(false);
      setServerError("Something Went Wrong. Check your network and try again.");
    }
  };

  const fetchHomeVideos = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/video/home-videos`
      );
      setHomeVideos(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Box component="div">
      <Box
        sx={{
          width: "max-content",
          margin: "0 auto",
        }}
      >
        <Button variant="contained" onClick={handleOpenModal}>
          Upload Video
        </Button>
      </Box>

      <Modal
        aria-labelledby="upload-video-modal-title"
        aria-describedby="upload-video-modal-description"
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
          <Box sx={styles.modalContent}>
            <Box
              onClick={handleCloseModal}
              sx={{
                position: "absolute",
                top: "20px",
                right: "20px",
                width: "max-content",
                cursor: "pointer",
              }}
            >
              <CloseIcon />
            </Box>
            <Typography
              id="upload-video-modal-title"
              variant="h4"
              component="h4"
              sx={{
                textAlign: "center",
                marginBottom: "30px",
              }}
            >
              Upload Video
            </Typography>

            <form
              style={{ display: "block" }}
              //   onSubmit={handleUpdateProfile}
              encType="multipart/form-data"
            >
              <Box sx={{ marginBottom: "20px" }}>
                <TextField
                  fullWidth
                  label="Video Title (Max 30 Words)"
                  variant="outlined"
                  value={title}
                  onChange={handleTitleChange}
                  required
                />
                {titleError && (
                  <Typography
                    sx={{
                      textAlign: "center",
                      color: "red",
                      marginTop: "5px",
                      fontSize: "15px",
                    }}
                  >
                    {titleError}
                  </Typography>
                )}
              </Box>
              <Box sx={{ marginBottom: "20px" }}>
                <TextField
                  fullWidth
                  multiline
                  label="Description (Max 150 Words)"
                  variant="outlined"
                  value={description}
                  onChange={handleDescriptionChange}
                />
                {descriptionError && (
                  <Typography
                    sx={{
                      textAlign: "center",
                      color: "red",
                      marginTop: "5px",
                      fontSize: "15px",
                    }}
                  >
                    {descriptionError}
                  </Typography>
                )}
              </Box>
              <Box sx={{ marginBottom: "20px" }}>
                <Typography sx={{ mb: "5px", fontSize: "14px" }}>
                  Select Video File (Max Size:10MB)
                </Typography>
                <input
                  type="file"
                  onChange={handleVideoChange}
                  accept="video/*"
                  placeholder="Select Video File"
                  required
                  style={{
                    width: "100%",
                    height: "50px",
                    border: "1px solid #dddd",
                    borderRadius: "5px",
                    padding: "13px",
                  }}
                />
                {videoError && (
                  <Typography
                    sx={{
                      textAlign: "center",
                      color: "red",
                      marginTop: "5px",
                      fontSize: "15px",
                    }}
                  >
                    {videoError}
                  </Typography>
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={handleUpload}
                  variant="contained"
                  disabled={!video || !title || uploading}
                  sx={{ minWidth: "150px", height: "40px" }}
                >
                  {uploading ? (
                    <CircularProgress
                      sx={{
                        color: "#fff",
                        width: "24px !important",
                        height: "24px !important",
                      }}
                    />
                  ) : (
                    "Upload Video"
                  )}
                </Button>
                {uploading && (
                  <Typography
                    sx={{ fontSize: "15px", mt: "10px", textAlign: "center" }}
                  >
                    Uploading may take some time. Please do not close the popup.
                  </Typography>
                )}
                {serverError && (
                  <Typography
                    sx={{
                      fontSize: "15px",
                      mt: "10px",
                      textAlign: "center",
                      color: "red",
                    }}
                  >
                    {serverError}
                  </Typography>
                )}
              </Box>
            </form>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default UploadVideo;

const styles = {
  modalContent: {
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
  },
  videoInput: {},
};
