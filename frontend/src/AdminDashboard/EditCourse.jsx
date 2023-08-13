import React from "react";
import Axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { createTheme} from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';
import config from "../config/config";
import { useLocation } from 'react-router-dom';

const token = localStorage.getItem("auth-token-admin");

const theme = createTheme({
  components: {
    MuiEditor: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          borderRadius: '4px',
          minHeight: '100px',
        },
        toolbar: {
          borderBottom: '1px solid #ccc',
        },
      },
    },
  },
});

const headers = {
  Authorization: "Bearer " + token,
};

function EditCourse() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const props = location.state;

  const [title, setTitle] = React.useState(props.title);
  const [description, setDescription] = React.useState(props.description);
  const [price, setPrice] = React.useState(props.price);


  const submitCourse = async (e) => {
    e.preventDefault();
    const newCourse = { title, description, price };
    const url = `${config.base_url}/api/admin/courses/${props.id}`;
    const loginRes = await Axios.put(url, newCourse, { headers });

    if (loginRes.data.status === "fail") {
      alert("login failed, Please login again")
    } else {
      alert(loginRes.data.message);
      navigate("/Admindashboard");
    }
  }

  return (
    <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: 200,
          bgcolor: 'black',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          
        }}
      >
        <Typography variant="h3" component="h1" color="white">
          Update Course
        </Typography>
      </Box>

      <Box
        component="form"
        onSubmit={submitCourse}
        sx={{
          width: '100%',
          maxWidth: '600px',
          padding: '20px',
          borderRadius: '4px',
          marginTop: '3rem', 
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',// Adjust the negative margin top as needed
        }}
      >
        <TextField
          id="filled-basic"
          label="Title of course"
          variant="filled"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ marginBottom: '16px' }}
        />

        <TextField
          label="Description"
          variant="filled"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{
            marginBottom: '16px',
            '& .MuiFilledInput-root': {
              height: '120px', // Adjust the height as desired
            },
            '& .MuiFilledInput-input': {
              padding: '12px 16px', // Adjust the inner padding as desired
            },
          }}
        />

        <TextField
          id="filled-basic"
          label="Price"
          variant="filled"
          fullWidth
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          sx={{ marginBottom: '16px' }}
        />

        <Button type="submit" variant="contained"sx={{backgroundColor:"black"}}>
          Update
        </Button>
      </Box>
    </div>
  );
}

export default EditCourse;
