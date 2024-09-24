import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvider } from './context/CartContext'; 
import { RestaurantProvider } from './context/restaurentContext';
import { RegisteruserProvider } from "./context/registerusersContext";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <RegisteruserProvider>
  <CartProvider>
  <RestaurantProvider>
      <App />
      </RestaurantProvider>
  </CartProvider>
  </RegisteruserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

