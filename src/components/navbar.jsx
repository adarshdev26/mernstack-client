import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  const username = sessionStorage.getItem('username');
  const role = sessionStorage.getItem('role');

  return (
    <AppBar position="static" style={{ background: '#ffe0b2' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to='/' style={{textDecoration:'none'}}>Home</Link>
        </Typography>
        <Box>
          {!username ? (
            <>
              <Link to="/login">
                <Button color="inherit">Login</Button>
              </Link>
              <Link to="/register">
                <Button color="inherit">Register</Button>
              </Link>
            </>
          ) : (
            <>
              {role === 'user' && (
                <Link to="/account">
                  <Button color="inherit">{username}</Button>
                </Link>
              )}
              <Button color="inherit" onClick={() => {
                sessionStorage.clear();
                window.location.reload();
              }}>
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
