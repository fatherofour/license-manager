import React from 'react';
import { Plus, Package, Users, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/common/button";
import { LicenseOverview } from './licenseoverview';
import { RecentRequests } from './recentrequest';
import { useAuth } from '@/context/AuthContext';
import { Customer } from '@/types/customer.types';
import { useCustomers } from '@/hooks/usecustomers';
import { useRequests } from '@/hooks/userequests';
import { Loader } from '@/components/common/loader';
import { formatCurrency } from '@/utils/formatters';

export const ClientDashboard: React.FC = () => {
  const { user } = useAuth();
  const { customers, loading: customersLoading } = useCustomers();
  const { requests, loading: requestsLoading } = useRequests();
  const navigate = useNavigate();

  // Type assertion to ensure we're using the correct Customer type
  const currentCustomer = customers.find((c) => c.id === user?.customerId) as Customer | undefined;
  const customerRequests = requests.filter((r) => r.customerId === user?.customerId);

  if (customersLoading || requestsLoading || !currentCustomer || !user?.customerId) {
    return <Loader fullScreen />;
  }

  const totalLicenses = currentCustomer.licenses?.reduce((sum, l) => sum + l.quantity, 0) ?? 0;
  const activeLicenses = currentCustomer.licenses?.filter((l) => l.status === 'active').length ?? 0;
  const expiringLicenses = currentCustomer.licenses?.filter((l) => l.status === 'expiring').length ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{currentCustomer.name}</h1>
          <p className="text-gray-500 mt-1">License Dashboard</p>
        </div>
        <Button
          onClick={() => navigate('/client/requests')}
          icon={<Plus size={18} />}
        >
          Request New License
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 text-sm">Total Licenses</p>
              <h3 className="text-3xl font-bold mt-2">{totalLicenses}</h3>
              <p className="text-blue-100 text-sm mt-2">Across all types</p>
            </div>
            <div className="bg-blue-400 bg-opacity-30 p-3 rounded-lg">
              <Package size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-green-100 text-sm">Active Licenses</p>
              <h3 className="text-3xl font-bold mt-2">{activeLicenses}</h3>
              <p className="text-green-100 text-sm mt-2">License types</p>
            </div>
            <div className="bg-green-400 bg-opacity-30 p-3 rounded-lg">
              <Users size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-yellow-100 text-sm">Expiring Soon</p>
              <h3 className="text-3xl font-bold mt-2">{expiringLicenses}</h3>
              <p className="text-yellow-100 text-sm mt-2">Within 30 days</p>
            </div>
            <div className="bg-yellow-400 bg-opacity-30 p-3 rounded-lg">
              <Package size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-purple-100 text-sm">Total Spent</p>
              <h3 className="text-3xl font-bold mt-2">
                {formatCurrency(currentCustomer.totalSpent)}
              </h3>
              <p className="text-purple-100 text-sm mt-2">All time</p>
            </div>
            <div className="bg-purple-400 bg-opacity-30 p-3 rounded-lg">
              <DollarSign size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* License Overview */}
      <LicenseOverview customer={currentCustomer} />

      {/* Recent Requests */}
      <RecentRequests requests={customerRequests} />
    </div>
  );
};
