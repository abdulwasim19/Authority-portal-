import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute.jsx';
import { AuthorityLayout } from '../components/layout/AuthorityLayout.jsx';
import { Login } from '../pages/auth/Login.jsx';
import { AuthorityDashboard } from '../pages/dashboard/AuthorityDashboard.jsx';
import { AuthorityCases } from '../pages/cases/AuthorityCases.jsx';
import { AuthorityCaseDetail } from '../pages/cases/AuthorityCaseDetail.jsx';
import { AuthorityAnalytics } from '../pages/analytics/AuthorityAnalytics.jsx';
import { AuthorityReports } from '../pages/reports/AuthorityReports.jsx';
import { Unauthorized } from '../pages/errors/Unauthorized.jsx';
import { NotFound } from '../pages/errors/NotFound.jsx';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/authority/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route
        path="/authority"
        element={
          <ProtectedRoute>
            <AuthorityLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AuthorityDashboard />} />
        <Route path="cases" element={<AuthorityCases />} />
        <Route path="cases/:id" element={<AuthorityCaseDetail />} />
        <Route path="analytics" element={<AuthorityAnalytics />} />
        <Route path="reports" element={<AuthorityReports />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
