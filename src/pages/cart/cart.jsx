import React from 'react';
import { Box, Divider, Typography, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, cartTotal } = useCart(); 
  const navigate = useNavigate();


  const newuser = sessionStorage.getItem('id');


  
  const handlePurchase = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurantId: newuser,
          items: cart.map(item => ({
            itemTitle: item.itemTitle,
            quantity: item.quantity,
            price: item.itemPrice,
          })),
          totalAmount: cartTotal,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      const data = await response.json();
      console.log('Order placed successfully:', data);
      sessionStorage.removeItem('id');

      setTimeout(() => {
        navigate('/success');
      }, 500);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };




  return (
    <Box
      sx={{
        width: '100%',
        padding: 2,
        margin: 'auto',
        maxWidth: 600, // Set a maximum width for responsiveness
        backgroundColor: '#f5f5f5',
        borderRadius: 4,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h5" gutterBottom align="center">
        Your Shopping Cart
      </Typography>

      <Divider />

      {/* Display cart items */}
      <List dense>
        {cart.map((item, index) => (
          <ListItem key={item._id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <ListItemIcon>
              <ShoppingCartIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={item.itemTitle}
              secondary={`Qty: ${item.quantity} - $${item.itemPrice * item.quantity}`}
            />
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Display total amount */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
        <Typography variant="h6">Total:</Typography>
        <Typography variant="h6">${cartTotal}</Typography>
      </Box>

      <Button onClick={handlePurchase} variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
        Confirm Purchase
      </Button>
    </Box>
  );
};

export default Cart;
