import React, { createContext, useState, useContext } from 'react';
import { Checkbox, Box, Typography, DialogContent, DialogTitle } from '@mui/material';

// Create CartContext
const CartContext = createContext();

// CartProvider component to wrap around app components
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  
  const addToCart = (productDetails, quantity, selectedModifier) => {
    const itemWithQuantityAndModifier = { 
      ...productDetails, 
      quantity,
      selectedModifier 
    }; 

    const existingItemIndex = cart.findIndex(item => 
      item._id === productDetails._id && 
      item.selectedModifier?._id === selectedModifier._id
    );
      
    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart(prevCart => [...prevCart, itemWithQuantityAndModifier]);
    }
  };
  
  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter(item => item._id !== itemId);
    setCart(updatedCart);
  };

  const updateQuantity = (itemId, newQuantity) => {
    const updatedCart = cart.map(item =>
      item._id === itemId
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((accumulator, item) => {
    const modifierPrice = item.selectedModifier ? item.selectedModifier.price : 0;
    return accumulator + (item.itemPrice + modifierPrice) * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);