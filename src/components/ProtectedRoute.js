// components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem("authToken");

  return token ? Component : <Navigate to="/admin" />;
};

export default ProtectedRoute;
