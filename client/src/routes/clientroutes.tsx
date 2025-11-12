import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ClientLayout } from '@/components/layout/ClientLayout';
import { DashboardPage, LicensesPage, RequestsPage } from '@/pages/client';
import { SettingsPage } from '@/pages/admin';

export const ClientRoutes: React.FC = () => {
  return (
    <ClientLayout>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/licenses" element={<LicensesPage />} />
        <Route path="/requests" element={<RequestsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </ClientLayout>
  );
};