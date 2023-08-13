import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CreateIcon from '@mui/icons-material/Create';

import ShowCourses from "./coursesShow/UserCourses";
import PurchasedCourse from './PurchasedCourses/purchasedCourses';
import { useNavigate } from 'react-router-dom';
import Typography from '../components/typography';


const style = {
  SideBar: {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '20vw', // 20% of the viewport width
    height: '100vh', // 100% of the viewport height
    backgroundColor: '#000000',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  MainContent: {
    width: '80vw', // 80% of the viewport width
    marginLeft: '20vw', // Match the width of the sidebar
    minHeight: '100vh', // Match the height of the sidebar
    backgroundColor: 'lightgrey',
    padding: '20px',
    marginTop:"80px"
  },
  ButtonCss: {
    width: '100%',
    borderRadius: '12px',
    color: '#f2f2f2', // Light black color
    backgroundColor: 'lightgrey', // Light black background color
    '&:focus': {
      color: '#202434', // White color on focus
      backgroundColor: '#f2f2f2', // White background color on focus
    },
  },
  Logo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  LogoImage: {
    width: '100px',
    height: '100px',
  },
  Separator: {
    width: '100%',
    height: '2px',
    backgroundColor: '#f2f2f2',
    margin: '20px 0',
  },
};


export default function BoxSx() {
  const [clickedButton, setClickedButton] = useState(null);

  const navigate =useNavigate();

  const handleHomeClick = () => {
    setClickedButton('home');
    navigate('/');
  };

  const handleButtonClick = (buttonId) => {
    if (buttonId === clickedButton) {
      setClickedButton(null);
    } else {
      setClickedButton(buttonId);
    }
  };

  return (
    <div>
      <Box sx={style.SideBar}>
        <Box sx={style.Logo}>
          <img src="/Images/Edumastery.png" alt="Logo" style={style.LogoImage} />
        </Box>
        <Box sx={style.Separator} />
        <Box sx={{ width: '90%' }}>
          <Button
            sx={{
              ...style.ButtonCss,
              backgroundColor: clickedButton === 'courses' ? '#ffffff' : '#000000',
              justifyContent: 'flex-start', // Align content to the left
            }}
            variant="text"
            onClick={() => handleButtonClick('courses')}
          >
            <LibraryBooksIcon sx={{ marginRight: '8px' }} /> {/* Add margin to the right */}
            Courses
          </Button>
        </Box>
        <Box sx={{ width: '90%' }}>
          <Button
            sx={{
              ...style.ButtonCss,
              backgroundColor: clickedButton === 'PurchasedCourse' ? '#ffffff' : '#000000',
              justifyContent: 'flex-start', // Align content to the left
            }}
            variant="text"
            onClick={() => handleButtonClick('PurchasedCourse')}
          >
            <CreateIcon sx={{ marginRight: '8px' }} /> {/* Add margin to the right */}
            Purchased Course 
          </Button>
        </Box>
        <Box sx={{ width: '90%' }}>
          <Button
            sx={{
              ...style.ButtonCss,
              backgroundColor: clickedButton === 'home' ? '#ffffff' : '#000000',
              justifyContent: 'flex-start', // Align content to the left
            }}
            variant="text"
            onClick={handleHomeClick}
          >
            <HomeIcon sx={{ marginRight: '8px' }} /> {/* Add margin to the right */}
            Home
          </Button>
        </Box>
      </Box>
      {clickedButton === 'courses' && (
        <Box sx={style.MainContent}>
        <Typography  sx={{display:"flex",justifyContent:"center",fontSize:"50px",margin:2}} >Available Courses</Typography>
          <ShowCourses />
        </Box>
      )}
      {clickedButton === 'PurchasedCourse' && (
        <Box sx={style.MainContent}>
        <Typography  sx={{display:"flex",justifyContent:"center",fontSize:"50px",margin:2}} >Purchased Courses</Typography>
          <PurchasedCourse />
        </Box>
      )}
    </div>
  );
}