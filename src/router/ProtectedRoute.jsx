import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Access the user state from Redux store
  const location = useLocation();
  const username = useSelector((state) => state.password.username);

  // Check if user is authenticated
  if (!username) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/" state={{ from: location }} />;
  }

  // Render the children (protected content) if user is authenticated
  return children;
};

export default ProtectedRoute;
