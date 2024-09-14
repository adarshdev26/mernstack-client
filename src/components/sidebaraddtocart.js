import React, { useContext } from 'react';
import { Box, Typography, Button, Divider, List, ListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/cartContext'; // Adjust the path as needed
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Delete from "../pages/shop/assets/images/delete.png"
const SidebarAddToCart = (props) => {
  const { cart, addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const result = props.cart;

  const sum = result.reduce((accumulator, item) => accumulator + item.itemPrice, 0);

  const handleCart = () => {
    result.forEach(item => addToCart(item)); // Add each item to the cart context
    navigate('/cart');
  };


  const handleRemove = ()=> {
    alert("are you sure want to removes")
  }

  return (
    <Box 
      sx={{
        width: 300,
        padding: 2,
        position: 'fixed',
        right: 0,
        top: 0,
        height: '100vh',
        backgroundColor: '#f4f4f4',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Your Cart
      </Typography>

      <Divider />
      <List>
        {result.map((item, index) => (
          <ListItem key={item._id}>
            <Typography variant="body1">{item.itemTitle} -</Typography>
            <Typography variant="body2" sx={{marginLeft:'12px'}}>${item.itemPrice}</Typography>
             <img src={Delete} style={{height:'20px', marginLeft:'10px'}} onClick={handleRemove}></img>
          </ListItem>
        ))}
      </List>

      <Divider />

      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Total: ${sum}
      </Typography>  
      <Typography variant="h9" sx={{ marginTop: 2, display: 'flex', alignItems: 'center' }}>
        <CheckCircleIcon sx={{ color: 'green', marginRight: 1 }} />
        Include Utensils (Forks, Napkins, Knives)
      </Typography>

      <Button
        onClick={handleCart}
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 2 }}
      >
        Checkout
      </Button>
    </Box>
  );
};

export default SidebarAddToCart;
