import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import { Paper, Box, Typography } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import TodayIcon from '@mui/icons-material/Today';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';





const Owner = () => {
  const username = sessionStorage.getItem('username');
  const role = sessionStorage.getItem('role');
  const id = sessionStorage.getItem('id');
  const [menu, setMenu] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);




  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/menu/${id}`); 
        const data = await response.json();
        console.log(data)
        setMenu(data);
        setTotalAmount(data.length); 
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchMenu();
  }, []);



  return (
<>
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: 30, 
        }}
      >
        <Paper elevation={1} sx={{ p: 4, mb: 2 }}>
          <Typography variant="h4" component="div">
            Welcome, {username} as {role}
          </Typography>
        </Paper>

       
        <Box
          sx={{
            display: 'flex',
            justifyContent:'space-evenly',
            flexWrap: 'nowrap',
            gap: 1,  
          }}
        >
          {/* Box 1 */}
          <Box
      sx={{
        flex: '1 1 21%',
        minWidth: 200,
        bgcolor: '#1e272e',
        color: '#fff',
        p: 2,
        height: '100px',
        borderRadius: 1,
        boxShadow: 2,
        display: 'flex',
        alignItems: 'center', // Vertically center content
        justifyContent: 'space-between', // Space between text and icon
      }}
    >
      <Box>
        <Typography variant="h6">Total Menus</Typography>
        <Typography>{totalAmount}</Typography>
      </Box>
      <RestaurantMenuIcon />
    </Box>

          {/* Box 2 */}
          <Box
      sx={{
        flex: '1 1 21%',
        minWidth: 200,
        bgcolor: '#fff',
        color: 'black',
        p: 2,
        height: '100px',
        borderRadius: 1,
        boxShadow: 2,
        display: 'flex',
        alignItems: 'center', // Vertically center content
        justifyContent: 'space-between', // Space between text and icon
      }}
    >
      <Box>
        <Typography variant="h6">Orders Today</Typography>
        <Typography>20</Typography>
      </Box>
      <TodayIcon />
    </Box>
          {/* Box 3 */}
          <Box
      sx={{
        flex: '1 1 21%',
        minWidth: 200,
        bgcolor: 'lightgray',
        color: 'black',
        p: 2,
        height: '100px',
        borderRadius: 1,
        boxShadow: 2,
        display: 'flex',
        alignItems: 'center', // Vertically center content
        justifyContent: 'space-between', // Space between text and icon
      }}
    >
      <Box>
        <Typography variant="h6">Total Revenue</Typography>
        <Typography>$300.00</Typography>
      </Box>
      <AttachMoneyIcon />
    </Box>
          {/* Box 4 */}
          
        </Box>
      </Box>
      </>
  );
};

export default Owner;
