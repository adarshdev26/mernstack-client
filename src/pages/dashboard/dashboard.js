import React from 'react';
import {Typography, Box, Paper } from '@mui/material';
import Sidebar from './sidebar';

const Dashboard = () => {
  const username = sessionStorage.getItem('username');
  const role = sessionStorage.getItem('role');

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar/>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, marginRight: 240 }} // Adjust marginLeft to align content with the sidebar
      >
        <Paper elevation={3} sx={{ p: 6 }}>
          <Typography variant="h4" component="div">
            Welcome, {username} as {role}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
