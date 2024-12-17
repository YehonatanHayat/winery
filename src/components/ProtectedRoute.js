import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const userRole = localStorage.getItem('userRole');

  if (!userRole || (role && userRole !== role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
