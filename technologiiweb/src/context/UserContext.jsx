// src/context/UserContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

// Create the UserContext
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores the logged-in user's data

  useEffect(() => {
    // Check for user data in localStorage on initial render
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Rehydrate user context from localStorage
    }
  }, []);

  const updateUser = (userData) => {
    if (userData) {
      // Save user data in context and localStorage
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      // Clear user data from context and localStorage
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token"); // Remove token if necessary
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access UserContext
export const useUserContext = () => useContext(UserContext);
