import React, { useState } from 'react';
import { Customer, CustomerLicense } from '@/types';
import { formatDate } from '@/utils/formatters';
import { Badge } from '@/components/common/Badge';
import { Card } from '@/components/common/Card';
import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { getExpiryStatus } from '@/utils/dateHelpers';

interface LicenseOverviewProps {
  customer: Customer;
}

export const LicenseOverview: React.FC<LicenseOverviewProps> = ({ customer }) => {
  const [expandedLicenses, setExpandedLicenses] = useState<Set<string>>(new Set());

  const toggleExpanded = (licenseId: string) => {
    setExpandedLicenses((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(licenseId)) {
        newSet.delete(licenseId);
      } else {
        newSet.add(licenseId);
      }
      return newSet;
    });
  };

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
    <Card title="Your Licenses" subtitle="All active and purchased licenses">
      <div className="space-y-4">
        {customer.licenses.map((license) => {
          const isExpanded = expandedLicenses.has(license.id);
          const status = getExpiryStatus(license.renewalDate);

          return (
            <div
              key={license.id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition"
            >
              <div
                className="p-6 cursor-pointer hover:bg-gray-50 transition"
                onClick={() => toggleExpanded(license.id)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-800">
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
                    <p className="text-gray-500">{license.subtype}</p>
                  </div>
                  <button className="p-2 hover:bg-gray-200 rounded-lg transition">
                    {isExpanded ? (
                      <ChevronUp size={20} className="text-gray-600" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-600" />
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Quantity</p>
                    <p className="text-lg font-semibold text-gray-800">
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
                      {license.users.length}
                    </p>
                  </div>
                </div>
              </div>

              {isExpanded && license.users.length > 0 && (
                <div className="border-t border-gray-200 bg-gray-50 p-6">
                  <h4 className="font-semibold text-gray-700 mb-3">Assigned Users</h4>
                  <div className="space-y-2">
                    {license.users.map((user, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200"
                      >
                        <div>
                          <p className="font-medium text-gray-800">{user.email}</p>
                          <p className="text-sm text-gray-500">{user.mobile}</p>
                        </div>
                        <p className="text-sm text-gray-500">
                          Assigned: {formatDate(user.assignedDate)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {isExpanded && license.notes && (
                <div className="border-t border-gray-200 bg-blue-50 p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Notes:</strong> {license.notes}
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {customer.licenses.length === 0 && (
          <div className="text-center py-12">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">No licenses purchased yet</p>
            <p className="text-gray-400 text-sm mt-2">
              Request your first license to get started
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};