// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserContext();

  if (!user) {
    // Redirect to login page if user is not authenticated
    return <Navigate to="/" />;
  }

  // Render children (the protected component) if authenticated
  return children;
};

export default ProtectedRoute;
