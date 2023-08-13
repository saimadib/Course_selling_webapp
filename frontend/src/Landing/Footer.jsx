import * as React from 'react';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '../components/typography';

function Copyright() {
  return (
    <React.Fragment>
      {'© '}
      <Link color="#00A8B5" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

export default function AppFooter() {
  return (
    <Typography
      component="footer"
      sx={{ display: 'flex', bgcolor: '#000000',height :"300px" }}
    >
      <Container sx={{ my: 8, display: 'flex' }}>
       
      </Container>
    </Typography>
  );
}