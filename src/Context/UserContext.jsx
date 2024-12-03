// context/UserContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a Context for User
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// UserProvider component to provide user context to the component tree
export const UserProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState(
    JSON.parse(localStorage.getItem('curruser')) || null
  );

  const updateUser = (user) => {
    localStorage.setItem('curruser', JSON.stringify(user));
    setCurrUser(user);
  };

  return (
    <UserContext.Provider value={{ currUser,setCurrUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
