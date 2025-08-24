
import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ children, admin }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;

  // If admin protection is requested, decode JWT and check role
  if (admin) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.role === 'admin') {
        return children;
      } else {
        // Optionally, redirect to home or show "Not authorized"
        return <Navigate to="/login" />;
      }
    } catch (err) {
      // Invalid token, redirect to login
      return <Navigate to="/login" />;
    }
  }

  // Default: just require any valid token (user or admin)
  return children;
};

export default ProtectedRoute;
