import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth.js';

// Frontend gate only — a UX convenience, not real security. The real
// authorization decision is enforced by M3 on every request; this just
// keeps unauthorized users out of the authority UI shell and routes them
// to the same 403 experience the backend's rejection would produce.
export function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'authority') return <Navigate to="/unauthorized" replace />;
  return children;
}
