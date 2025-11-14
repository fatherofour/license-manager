import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useauths';
import { Loader } from '@/components/common/loader';
import { UserRole } from '@/types';

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (isAuthenticated && user) {
    // Redirect to appropriate dashboard based on role
    const redirectPath = user.role === UserRole.ADMIN ? '/admin/dashboard' : '/client/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};