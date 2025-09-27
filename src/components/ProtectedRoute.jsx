import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../database/authcontext';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { user, isLoggedIn, role } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/inicio" />;
  }

  return element;
};

export default ProtectedRoute;