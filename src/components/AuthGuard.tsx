// src/components/AuthGuard.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  // Check if a token exists in local storage
  const token = localStorage.getItem('authToken');

  if (!token) {
    // If no token is found, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If a token is found, render the child components (the protected page)
  return <>{children}</>;
};

export default AuthGuard;