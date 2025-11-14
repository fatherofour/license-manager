import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from './privateroutes';
import { PublicRoute } from './publicroutes';
import { AdminRoutes } from './adminroutes';
import { ClientRoutes } from './clientroutes';
import { LoginPage, RegisterPage, ForgotPasswordPage } from '@/pages/auth';
import { ErrorPage } from '@/pages/errorpage';
import { UserRole } from '@/types';

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPasswordPage />
            </PublicRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute allowedRoles={[UserRole.ADMIN]}>
              <AdminRoutes />
            </PrivateRoute>
          }
        />

        {/* Client Routes */}
        <Route
          path="/client/*"
          element={
            <PrivateRoute allowedRoles={[UserRole.CLIENT]}>
              <ClientRoutes />
            </PrivateRoute>
          }
        />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 404 Error Page */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};