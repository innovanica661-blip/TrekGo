// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../database/authcontext";

/**
 * Uso:
 * <ProtectedRoute element={<MiComponente />} allowedRoles={['admin','user']} />
 */
const ProtectedRoute = ({ element, allowedRoles = [] }) => {
  const { user, role } = useAuth();

  // Si no hay usuario -> pedir login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si allowedRoles fue provisto y el role del usuario no está incluido -> redirigir a inicio público
  if (Array.isArray(allowedRoles) && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // Si todo OK, renderiza el elemento protegido
  return element;
};

export default ProtectedRoute;
