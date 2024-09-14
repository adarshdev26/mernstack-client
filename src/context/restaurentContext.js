// RestaurantContext.js
import React, { createContext, useState, useEffect } from 'react';

export const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  
  const [restaurants, setRestaurants] = useState([]);

  
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/restaurants'); 
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <RestaurantContext.Provider value={{ restaurants }}>
      {children}
    </RestaurantContext.Provider>
  );
};
