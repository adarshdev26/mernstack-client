import React from 'react';
import Sidebar from './sidebar';
import {Typography, Box, Paper } from '@mui/material';

const Userdashboard = () => {
  const username = sessionStorage.getItem('username') ;
  return (
    <Box sx={{ display: 'flex' }}>
 
    <Sidebar/>

    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, marginRight: 240 }} 
    >
      <Paper elevation={3} sx={{ p: 6 }}>
        <Typography variant="h4" component="div">
          Welcome, {username}
        </Typography>
      </Paper>
    </Box>
  </Box>
  )
}

export default Userdashboard;
