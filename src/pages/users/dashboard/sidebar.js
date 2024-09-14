import React from 'react'
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

 const navigate = useNavigate()

const handleLogout = ()=> {
 sessionStorage.removeItem('username','role');
 navigate('/');
}
  return (
    <Drawer
        sx={{
          width: 240,  // Width of the sidebar
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open
      >
        <List>
          <ListItem button>
          <Link to="#">
            <ListItemText primary="Dashboard Overview" />
            </Link>
          </ListItem>
          <ListItem button>
            <ListItemText primary="Manage Menu" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Orders" />
          </ListItem>
          <ListItem button>
          </ListItem>
          <ListItem button>
            <ListItemText primary="Reports" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
  )
}

export default Sidebar
