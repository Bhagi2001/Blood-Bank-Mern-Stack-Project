import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ allow = [] }) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return <div className="bb-page-center">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allow.length && !allow.includes(user?.role)) return <Navigate to="/" replace />;

  return <Outlet />;
}
