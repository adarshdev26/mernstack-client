// RestaurantContext.js
import React, { createContext, useState, useEffect } from 'react';

export const RegistreruserContext = createContext();

export const RegisteruserProvider = ({ children }) => {
 

  return (
    <RegistreruserContext.Provider value={{ RegistreruserContext }}>
      {children}
    </RegistreruserContext.Provider>
  );
};
