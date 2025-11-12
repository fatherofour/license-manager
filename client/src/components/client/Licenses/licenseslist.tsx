import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useCustomers } from '@/hooks/useCustomers';
import { Loader } from '@/components/common/Loader';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import { Search, Filter, Package, AlertCircle } from 'lucide-react';
import { formatDate, getExpiryStatus } from '@/utils/dateHelpers';
import { Badge } from '@/components/common/Badge';
import { Card } from '@/components/common/Card';

export const LicensesList: React.FC = () => {
  const { user } = useAuth();
  const { customers, loading } = useCustomers();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const currentCustomer = customers.find((c) => c.id === user?.customerId);

  if (loading || !currentCustomer) {
    return <Loader fullScreen />;
  }

  const filteredLicenses = currentCustomer.licenses.filter((license) => {
    const matchesSearch =
      license.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      license.subtype.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || license.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: 'all', label: 'All Licenses' },
    { value: 'active', label: 'Active' },
    { value: 'expiring', label: 'Expiring Soon' },
    { value: 'expired', label: 'Expired' },
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'expiring':
        return 'warning';
      case 'expired':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">My Licenses</h1>
        <p className="text-gray-500 mt-1">
          {currentCustomer.licenses.length} total license
          {currentCustomer.licenses.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search by license type or subtype..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search size={20} />}
          />
        </div>
        <div className="w-48">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={statusOptions}
          />
        </div>
      </div>

      {filteredLicenses.length > 0 ? (
        <div className="grid gap-6">
          {filteredLicenses.map((license) => (
            <Card key={license.id} hover>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-800">
                      {license.type}
                    </h3>
                    <Badge variant={getStatusVariant(license.status)}>
                      {license.status.toUpperCase()}
                    </Badge>
                    {license.status === 'expiring' && (
                      <span className="flex items-center gap-1 text-yellow-600 text-sm">
                        <AlertCircle size={16} />
                        Renewal due soon
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-lg">{license.subtype}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Quantity</p>
                  <p className="text-xl font-semibold text-gray-800">
                    {license.quantity}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Purchase Date</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {formatDate(license.purchaseDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Renewal Date</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {formatDate(license.renewalDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Assigned Users</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {license.users.length} / {license.quantity}
                  </p>
                </div>
              </div>

              {license.users.length > 0 && (
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-700 mb-3">
                    Assigned Users ({license.users.length})
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {license.users.map((user, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-800">{user.email}</p>
                          <p className="text-sm text-gray-500">{user.mobile}</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          {formatDate(user.assignedDate)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {license.notes && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>Notes:</strong> {license.notes}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <div className="text-center py-12">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">
              {searchTerm || statusFilter !== 'all'
                ? 'No licenses found matching your filters'
                : 'No licenses available'}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};