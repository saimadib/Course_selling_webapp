import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';


import { useNavigate } from 'react-router-dom';

export default function Cardown(props) {
  const navigate = useNavigate();



  const getCourse = async (e) => {
    console.log(e);
  };

  const handleEditClick = () => {
    navigate('/editCourse', { state: props });
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
        image={props.img}
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
      </CardActions>
    </Card>
  );
}
