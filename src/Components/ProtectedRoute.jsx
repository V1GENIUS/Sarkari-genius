import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAdmin }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin && userRole !== "admin") {
    return <Navigate to="/" replace />; // Redirect non-admin users to the home page
  }

  return children;
};

export default ProtectedRoute;
