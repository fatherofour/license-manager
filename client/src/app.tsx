import React from 'react';
import { AppRoutes } from './routes';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { NotificationContainer } from './components/common/Notification';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AppRoutes />
        <NotificationContainer />
      </NotificationProvider>
    </AuthProvider>
  );
};
