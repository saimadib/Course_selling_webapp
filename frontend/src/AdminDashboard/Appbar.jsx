import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Appbar() {
  const navigate = useNavigate();

  const handleClick = () => {
    // Remove token from localStorage
    // localStorage.removeItem('auth-token-admin');

    // Navigate to homepage
    navigate('/');
  };

  return (
    <div>
      <Box
        sx={{
          backgroundColor: "white",
          width: "99%",
          height: 50,
          padding: 0,
          marginLeft:0.5,
          marginTop:1,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          borderRadius:"40px",
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
      
        <Tooltip title="Logout" placement="left">
          <Button
            sx={{
              color: "black",
            }}
            onClick={handleClick} // Attach the handleClick function to the onClick event
          >
            <AccountCircleIcon  sx={{fontSize:"35px"}} />
          </Button>
        </Tooltip>
      </Box>
    </div>
  );
}
