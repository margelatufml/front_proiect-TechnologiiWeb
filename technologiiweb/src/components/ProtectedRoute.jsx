import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user, setUser } = useUserContext();

  useEffect(() => {
    // Rehydrate user from localStorage if user is null
    if (!user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [user, setUser]);

  const token = localStorage.getItem("token");

  // Redirect to login page if neither user nor token is available
  if (!user && !token) {
    return <Navigate to="/" />;
  }

  return children; // Render the protected component
};

export default ProtectedRoute;
