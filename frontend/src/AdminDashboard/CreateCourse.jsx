import React, { useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../config/config";
const token = localStorage.getItem("auth-token-admin");

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          '&:hover': {
            backgroundColor: '#000000 !important',
          },
        },
      },
    },
  },
});


const headers = {
  Authorization: "Bearer " + token,
};

function CreateCourse() {
  const navigate = useNavigate();

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [image, setImageUrl] = React.useState("");


  const submitCourse = async (e) => {
    e.preventDefault();
    const newCourse = { title, description, price, image };
    const url = config.base_url + "/api/admin/courses";
    const loginRes = await Axios.post(url, newCourse, { headers });
  
    if (loginRes.data.status === "fail") {
      alert("login failed, Please login again");
    } else {
      alert(loginRes.data.message);
      navigate("/Admindashboard");
    }
  };
  

  useEffect(() => {
    document.body.style.margin = "0";
  }, []);

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <Typography
        variant="h3"
        component="h1"
        color="black"
        sx={{ textAlign: "center", marginBottom: "60px" }}
      >
        Create Course
      </Typography>

      <Box
        component="form"
        onSubmit={submitCourse}
        sx={{
          width: "60%",
          margin: "0 auto", // To center align the box horizontally
        }}
      >
        <TextField
          id="filled-basic"
          label="Title of course"
          variant="filled"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ marginBottom: "16px" }}
        />

        <TextField
          label="Description"
          variant="filled"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ marginBottom: "16px" }}
        />

        <TextField
          id="filled-basic"
          label="Price"
          variant="filled"
          fullWidth
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          sx={{ marginBottom: "16px" }}
        />

        <TextField
          id="filled-basic"
          label="Image URL"
          variant="filled"
          fullWidth
          value={image}
          onChange={(e) => setImageUrl(e.target.value)}
          sx={{ marginBottom: "16px" }}
        />

<ThemeProvider theme={theme}>
        <Button type="submit" variant="contained"sx={{backgroundColor:"black"}}>
          Create
        </Button>
        </ThemeProvider>
      </Box>
    </div>
  );
}

export default CreateCourse;
