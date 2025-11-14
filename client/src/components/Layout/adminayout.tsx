import React, { ReactNode } from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { useRequests } from '@/hooks/userequests';

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { requests } = useRequests();
  const pendingCount = requests.filter(req => req.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header pendingCount={pendingCount} />
      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
