import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Footer from "./Footer";
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import ClassIcon from '@mui/icons-material/Class';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

import { useRecoilValue } from 'recoil';
import { token_local } from '../Store/Atom/user';
// Define a custom theme to prevent the hover behavior
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

const styles = {
  appBar: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  backgroundImageContainer: {
    position: 'relative',
    height: '100vh',
    overflow: 'auto',
    zIndex: 0,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    backgroundImage: 'url("https://picsum.photos/id/1/3840/2160")',
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
    borderRadius: '0 0 150px 0',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', // Update alignment to center
    justifyContent: 'center', // Update alignment to center
    maxWidth: '600px',
    gap: '30px',
    margin: '120px 0px 180px 0px',
    padding: '0 180px', // Update padding instead of paddingLeft and paddingRight
    '@media (max-width: 1280px)': {
      padding: '0 120px', // Update padding for large screens
    },
    '@media (max-width: 960px)': {
      padding: '0 40px', // Update padding for medium screens
    },
    '@media (max-width: 600px)': {
      margin: '120px 20px 0',
      padding: '0 20px', // Update padding for small screens
    },
  },
  featureBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '400px',
    height: '250px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)', // Add drop shadow effect
  },
};


export default function Landing() {
  const navigate = useNavigate();
  const currentToken = useRecoilValue(token_local);


  // Use useEffect to update the currentToken whenever the prop 'token' changes
  // React.useEffect(() => {
  //   const tokenFromStorage=localStorage.getItem("auth-token-user");
  //   setCurrentToken(tokenFromStorage);
  // }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/register');
  };

  const handleDashClick = () => {
    navigate('/UserDashboard');
  };
  const handleHomeClick = () => {
    navigate('/');
  };
  const handleAdminClick = () => {
    navigate('/admin/login');
  };

  useEffect(() => {
    // Hide the scrollbar on mount
    document.body.style.overflow = 'hidden';
    document.body.style.margin = '0';
    document.body.style.padding = '0';

    // Re-enable the scrollbar on unmount
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.margin = '';
      document.body.style.padding = '';
    };
  }, []);

  return (
    <React.Fragment>
    <div style={{backgroundColor:"lightgrey"}}>
      <Box sx={styles.backgroundImageContainer}>
        <div style={styles.backgroundImage} />
        <AppBar position="static" sx={styles.appBar}>
      <Toolbar>
      <Box sx={{backgroundColor:"black",borderRadius:"30px"}}>
      <Button variant="h6" component="div" onClick={handleHomeClick} sx={{fontSize:"1rem",color:"white"}} >
            EduMastery
          </Button>
          </Box>
        {currentToken && ( // Check if token is available
          <Button variant="h6" component="div" onClick={handleDashClick}  sx={{ marginLeft: '1080px' }} >
            Dashboard
          </Button>
        )}
        <div style={{ marginLeft: 'auto' }}>
          {!currentToken && ( // Check if token is not available
            <>
              <Button color="inherit" onClick={handleLoginClick}>
                Login
              </Button>
              <Button color="inherit" onClick={handleSignupClick}>
                Sign up
              </Button>
            </>
          )}
          <Button color="inherit" onClick={handleAdminClick}>
            Admin Login
          </Button>
        </div>
      </Toolbar>
    </AppBar>
        <Box sx={styles.contentContainer}>
          <Typography variant="h2" component="h2" sx={{ color: 'white', fontWeight: 'bold', width: '80%' }}>
            A Better Place To Learn
          </Typography>
          <Typography variant="h6" component="h6" sx={{ color: 'white', fontSize: '17px' }}>
          With a user-friendly interface and expertly designed courses, we ensure an enriching and enjoyable learning experience. Dive into captivating previews and intriguing course outlines, setting the stage for an inspiring journey ahead.
          </Typography>
          <ThemeProvider theme={theme}>
      <Button variant="contained" sx={{ width: 'fit-content', backgroundColor: "#000000" }} onClick={handleSignupClick}>
        Sign up
      </Button>
    </ThemeProvider>
        </Box>
        <Box
          sx={{
            width: 800,
            height: 300,
            position: 'relative',
            top: 'calc(100% - 100px)', // Adjust the value as needed to leave space after the background image
            margin: '0 auto', // Center the box horizontally
            marginTop: '-530px', // Offset the top position to leave space after the background image
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <Typography variant="h4" component="h3" sx={{ color: 'black', fontWeight: 'bold', width: '60%', textAlign: 'center' }}>
          Unlock Your Potential, Enroll Today!
          </Typography>
          <Typography variant="h6" component="h6" sx={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: '17px', textAlign: 'center' }}>
          Welcome to our empowering course-selling platform, where we believe in unleashing your full potential. Discover a diverse selection of transformative courses designed to propel you towards success and personal growth. Whether you're seeking to acquire new skills, enhance your knowledge, or explore exciting passions, we've got you covered.
          </Typography>
          <ThemeProvider theme={theme}>
      <Button variant="contained" sx={{ width: 'fit-content', backgroundColor: "#000000" }} onClick={handleSignupClick}>
        Sign up
      </Button>
    </ThemeProvider>

        </Box>
        <Box sx={{ marginTop: '700px', textAlign: 'center' }}>
          <Box style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <Box style={styles.featureBox}>
              <AllInclusiveIcon sx={{marginBottom:2,fontSize: "3rem"}} />
              <Typography variant="h6">Lifetime Access</Typography>
              <Typography variant="body1" sx={{margin:2}}>allowing you to revisit and review the materials at your convenience and pace.</Typography>
            </Box>
            <Box style={styles.featureBox}>
            <ClassIcon sx={{marginBottom:2,fontSize: "3rem"}} />
              <Typography variant="h6">Diverse course selection</Typography>
              <Typography variant="body1" sx={{margin:2}}>Our platform offers a diverse course selection spanning various disciplines and skill levels to cater to a broad audience of learners.</Typography>
            </Box>
            <Box style={styles.featureBox}>
            <CastForEducationIcon sx={{marginBottom:2,fontSize: "3rem"}} />
              <Typography variant="h6">Interactive Learning</Typography>
              <Typography variant="body1" sx={{margin:2}}>Experience engaging and interactive learning with our platform, incorporating quizzes, assignments, projects, and discussions to enhance your educational journey.</Typography>
            </Box>
            <Box style={styles.featureBox}>
            <CardMembershipIcon sx={{marginBottom:2,fontSize: "3rem"}} />
              <Typography variant="h6">certifications</Typography>
              <Typography variant="body1" sx={{margin:2}}>Upon course completion, receive valuable certifications recognized by industry professionals, validating your newfound knowledge and skills.</Typography>
            </Box>
            <Box style={styles.featureBox}>
            <LocalLibraryIcon sx={{marginBottom:2,fontSize: "3rem"}} />
              <Typography variant="h6">Expert Instructors</Typography>
              <Typography variant="body1" sx={{margin:2}}>who bring their wealth of knowledge and practical insights to the courses.</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ marginTop: '150px', textAlign: 'center' }}>
        <Footer/>
        </Box>
      </Box>
      </div>
    </React.Fragment>
  );
}
