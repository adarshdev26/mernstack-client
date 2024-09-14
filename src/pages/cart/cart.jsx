import React, { useContext } from 'react';
import { CartContext } from '../../context/cartContext'; // Adjust the path as needed
import { Box, Divider, Typography, Button, List, ListItem } from '@mui/material';

const Cart = () => {
  const { cart } = useContext(CartContext);

  const totalAmount = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <Box sx={{ p: 3, maxWidth: '800px', margin: '0 auto', mt: 4 }}>
      <Typography variant='h4' align='center' gutterBottom>
        Cart Items
      </Typography>

      {cart.length === 0 ? (
        <Typography variant='body1' align='center'>
          Your cart is empty.
        </Typography>
      ) : (
        <List>
          {cart.map((item, index) => (
            <ListItem 
              key={index} 
              sx={{ 
                borderBottom: '1px solid #ccc', 
                mb: 2, 
                p: 2, 
                borderRadius: '8px',
                bgcolor: 'background.paper',
                boxShadow: 2 
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Typography variant='h6'>{item.name}</Typography>
                <Typography variant='body2' color='textSecondary'>
                  Price: ${item.price}
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  Quantity: {item.quantity}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      )}

      <Box 
        component="section" 
        sx={{ 
          mt: 4, 
          p: 3, 
          border: '1px solid #ccc', 
          borderRadius: '8px', 
          bgcolor: 'background.paper', 
          boxShadow: 3 
        }}
      >
        <Typography variant='h4' align='center' gutterBottom>
          Summary
        </Typography>
        
        <List sx={{ mb: 2 }}>
          <ListItem disableGutters>
            <Typography variant='body2' component="span" sx={{ fontWeight: 'bold' }}>Subtotal:</Typography>
            <Typography variant='body2' component="span" sx={{ ml: 1 }}>${totalAmount.toFixed(2)}</Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant='body2' component="span" sx={{ fontWeight: 'bold' }}>Discount:</Typography>
            <Typography variant='body2' component="span" sx={{ ml: 1 }}>-$0.00</Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant='body2' component="span" sx={{ fontWeight: 'bold' }}>Shipping & Handling:</Typography>
            <Typography variant='body2' component="span" sx={{ ml: 1 }}>$0.00</Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant='body2' component="span" sx={{ fontWeight: 'bold' }}>Tax (Calculated at checkout):</Typography>
            <Typography variant='body2' component="span" sx={{ ml: 1 }}>$0.00</Typography>
          </ListItem>
        </List>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant='h5'>Balance</Typography>
          <Typography variant='h5'>${totalAmount.toFixed(2)}</Typography>
        </Box>

        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ py: 1.5, fontSize: '16px', textTransform: 'none' }}
        >
          Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
