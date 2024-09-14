import React from 'react'
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';


const Sidebar = () => {
const navigate = useNavigate()

const handleLogout = ()=> {
 sessionStorage.removeItem('username','role');
 navigate('/');
}

  return (
    <div>
   <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#1e272e', // Dark background
          color: '#f5f6fa', // Light text color
        },
      }}
      variant="persistent"
      anchor="left"
      open
    >
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon sx={{ color: '#f5f6fa' }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard Overview" />
        </ListItem>

        <ListItem button component={Link} to="/registerrestaurant">
          <ListItemIcon sx={{ color: '#f5f6fa' }}>
            <RestaurantIcon />
          </ListItemIcon>
          <ListItemText primary="Restaurants" />
        </ListItem>

        <ListItem button component={Link} to="/menuitems">
          <ListItemIcon sx={{ color: '#f5f6fa' }}>
            <MenuBookIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Menu" />
        </ListItem>

        <ListItem button>
          <ListItemIcon sx={{ color: '#f5f6fa' }}>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>

        <ListItem button>
          <ListItemIcon sx={{ color: '#f5f6fa' }}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Reservations" />
        </ListItem>

        <ListItem button component={Link} to="/registerusers">
          <ListItemIcon sx={{ color: '#f5f6fa' }}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>

        <ListItem button>
          <ListItemIcon sx={{ color: '#f5f6fa' }}>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>

        <ListItem button>
          <ListItemIcon sx={{ color: '#f5f6fa' }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>

        <Divider sx={{ backgroundColor: '#576574' }} />

        <ListItem button onClick={handleLogout}>
          <ListItemIcon sx={{ color: '#f5f6fa' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
    </div>
  )
}

export default Sidebar;
