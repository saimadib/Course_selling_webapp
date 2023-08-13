import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import config from '../../config/config';

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

const token = localStorage.getItem("auth-token-admin");
const headers = {
  Authorization: "Bearer " + token,
};


export default function Cardown(props) {
  const navigate = useNavigate();
  const img = props.img;

  const getCourse = async (e) => {
    console.log(e);
  };

  const handleEditClick = () => {
    navigate('/editCourse', { state: props });
  };

  const handleDeleteClick = async (e) => {
    e.preventDefault();

    const url = `${config.base_url}/api/admin/courses/${props.id}`;
    const loginRes = await Axios.delete(url, { headers });

    if (loginRes.data.status === "fail") {
      alert("Unauthorized");
    } else {
      
      alert(loginRes.data.message);
    }
  };

  return (
    <Card
      sx={{
        display: 'flex',
        width: '900px',
        margin: 'auto',
        '@media(max-width: 600px)': {
          maxWidth: '90%',
        },
        height: 200,
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={img}
        sx={{ width: '355px', objectFit: 'cover', height: '200px' }}
      />
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: '10', marginTop: '1' }}>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
          <Button onClick={getCourse} size="small">
            Learn More
          </Button>
        </Typography>
        <Rating name="read-only" value="3" readOnly style={{ marginTop: 75 }} />
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '10px',
          borderLeft: '1px solid rgba(0, 0, 0, 0.2)',
          width: '100px',
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {props.price}
        </Typography>
        <ThemeProvider theme={theme}>
        <Button variant="contained" size="medium" sx={{ width: '110px', marginTop: '50px', display: 'inline-flex' ,backgroundColor:"black"}} onClick={handleDeleteClick}>
          <ShoppingBagIcon />
          Delete
        </Button>
        
        <Button variant="contained" size="medium" sx={{ width: '110px', marginTop: '10px', display: 'inline-flex',marginRight:"10px",backgroundColor:"black" }} onClick={handleEditClick}>
          <ShoppingBagIcon />
          Edit
        </Button>
</ThemeProvider>
      </CardActions>
    </Card>
  );
}
