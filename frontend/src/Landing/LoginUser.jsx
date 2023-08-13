import React, { useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Axios from "axios";
import config from "../config/config";
import { useNavigate } from "react-router-dom";
import { token_local } from '../Store/Atom/user';
import { useSetRecoilState } from 'recoil';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function Login() {

    const navigate = useNavigate();
    const setCurrentToken=useSetRecoilState(token_local);
    

    const [username, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");

    const onChangeEmail = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
      };

      const onChangePassword = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
      };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { username, password };
    const url = config.base_url + "/api/user/login";
    const loginRes = await Axios.post(url, newUser);

    if (loginRes.data.status === "fail") {
      setEmailError(loginRes.data.message);
      setPasswordError(loginRes.data.message);
    } else {
      localStorage.setItem("auth-token-user", loginRes.data.token);
      const token=localStorage.getItem("auth-token-user");
      setCurrentToken(token);
      navigate("/UserDashboard");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={emailError.length > 0 ? true : false}
              helperText={emailError}
              autoFocus
              value={username}
              onChange={onChangeEmail}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={passwordError.length > 0 ? true : false}
              helperText={passwordError}
              value={password}
              onChange={onChangePassword}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;