import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

import { useNavigate } from 'react-router-dom';
import config from "../../config/config";
import Axios from 'axios';

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



export default function Cardown(props) {
  const navigate = useNavigate();

  const [token, setToken] = React.useState(localStorage.getItem('auth-token-user'));

  // Fetch the token every time the component updates
  React.useEffect(() => {
    setToken(localStorage.getItem('auth-token-user'));
  }, []);

  if (!token) {
    alert('User not logged in, Please log in to buy courses');
  }

;

  const headers = {
    Authorization: "Bearer " + token,
  }

  const title=props.title;
  const description=props.description;
  const price=props.price;


  const handleEditClick = async (e) => {
    e.preventDefault();
    const newCourse = { title, description, price };
    const url = `${config.base_url}/api/user/courses/${props.id}`;
    const loginRes = await Axios.post(url, newCourse, { headers });

    if (loginRes.data.status === "fail") {
      alert("login failed, Please login again")
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
        borderRadius:"10px",
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={props.img}
        sx={{ width: '355px', objectFit: 'cover', height: '200px', backgroundColor: 'pink' }}
      />
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: '10', marginTop: '1' }}>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
          <Button size="small">
            Learn More
          </Button>
        </Typography>
        <Rating  name="read-only" value="3" readOnly style={{ marginTop: 75 }} />
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
        <Button variant="contained" sx={{ widtth:"110px",display: 'inline-flex',marginTop: '100px',backgroundColor:"black" }} onClick={handleEditClick}>
          <ShoppingBagIcon />
          Buy
        </Button>
        </ThemeProvider>
      </CardActions>
    </Card>
  );
}
