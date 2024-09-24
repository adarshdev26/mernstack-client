import React, { useState } from 'react';
import { Box, Typography, Button, Divider, List, ListItem, TextField, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Delete from "../pages/shop/assets/images/delete.png";
import Edit from "../pages/shop/assets/images/edit.png";
import { useCart } from '../context/CartContext';



const SidebarAddToCart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  const [editingItem, setEditingItem] = useState(null);
  const [quantity, setQuantity] = useState('');


  const handleRemove = (itemId) => {
    removeFromCart(itemId);
  };


  const handleEdit = (item) => {
    setEditingItem(item._id);
    setQuantity(item.quantity);
  };


  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  

  const handleQuantityUpdate = (itemId) => {
    const newQuantity = parseInt(quantity, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      updateQuantity(itemId, newQuantity);
      setEditingItem(null);
      setQuantity('');
    } else {
      alert('Please enter a valid quantity.');
    }
  };



  const handleCart = () => {
    navigate('/cart');
  };



  return (
    <Box
      sx={{
        width: 250,
        padding: 1,
        position: 'fixed',
        right: 0,
        top: 0,
        height: '100vh',
        backgroundColor: '#f4f4f4',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        overflowY: 'auto',
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontSize: '16px' }}>
        Cart <ShoppingCartIcon fontSize="small" />
      </Typography>

      <Divider />

      <Box sx={{ maxHeight: '300px', overflowY: 'auto' }}>
        <List>
          {cart.map((item) => (
            <ListItem key={item._id} sx={{ display: 'flex', alignItems: 'center', padding: '8px 0' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body2" sx={{ fontSize: '14px' }}>
                  {item.itemTitle}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '12px', color: 'gray' }}>
                  ${item.itemPrice} x {item.quantity}
                </Typography>
                {item.selectedModifier && (
                <Typography variant="body2" sx={{ fontSize: '12px', color: 'gray' }}>
                  Modifier: {item.selectedModifier.name} (+${item.selectedModifier.price})
                </Typography>
              )}

              </Box>
              <IconButton
                onClick={() => handleEdit(item)}
                sx={{ marginLeft: '10px' }}
                aria-label="edit"
              >
                <img src={Edit} style={{ height: '16px' }} alt="edit" />
              </IconButton>
              <IconButton
                onClick={() => handleRemove(item._id)}
                sx={{ marginLeft: '10px' }}
                aria-label="remove"
              >
                <img src={Delete} style={{ height: '16px' }} alt="remove" />
              </IconButton>
              {editingItem === item._id && (
                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                  <TextField
                    value={quantity}
                    onChange={handleQuantityChange}
                    size="small"
                    type="number"
                    inputProps={{ min: 1 }}
                    sx={{ width: '60px', marginRight: '10px' }}
                  />
                  <Button
                    onClick={() => handleQuantityUpdate(item._id)}
                    variant="outlined"
                    color="primary"
                    size="small"
                  >
                    Update
                  </Button>
                </Box>
              )}
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider />

      <Typography variant="h6" sx={{ marginTop: 1, fontSize: '14px', textAlign: 'center' }}>
        Total: ${cartTotal}
      </Typography>

      <Button
        onClick={handleCart}
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 1, fontSize: '12px' }}
      >
        Checkout
      </Button>
    </Box>
  );
};

export default SidebarAddToCart;
