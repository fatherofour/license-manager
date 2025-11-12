import React from 'react';
import { Badge } from '@/components/common/badge';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { Customer } from "@shared/types/customer.types";

interface CustomerCardProps {
  customer: Customer;
  onClick?: () => void;
}

export const CustomerCard: React.FC<CustomerCardProps> = ({ customer, onClick }) => {
  const statusVariant = {
    active: 'success' as const,
    inactive: 'default' as const,
    suspended: 'error' as const,
  };

  return (
    <div
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{customer.name}</h3>
          <p className="text-gray-500">{customer.email}</p>
          {customer.phone && <p className="text-gray-500 text-sm">{customer.phone}</p>}
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">
            {formatCurrency(customer.totalSpent)}
          </p>
          <p className="text-sm text-gray-500">Total Spent</p>
          <Badge variant={statusVariant[customer.status]} size="sm" className="mt-2">
            {customer.status.toUpperCase()}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {customer.licenses.slice(0, 2).map((license) => (
          <div key={license.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-gray-800">{license.type}</h4>
                <p className="text-sm text-gray-500">{license.subtype}</p>
              </div>
              <Badge
                variant={
                  license.status === 'active'
                    ? 'success'
                    : license.status === 'expiring'
                    ? 'warning'
                    : 'error'
                }
                size="sm"
              >
                {license.status.toUpperCase()}
              </Badge>
            </div>
            <div className="flex justify-between text-sm mt-3">
              <span className="text-gray-600">
                Qty: <strong>{license.quantity}</strong>
              </span>
              <span className="text-gray-600">{formatDate(license.renewalDate)}</span>
            </div>
          </div>
        ))}
      </div>

      {customer.licenses.length > 2 && (
        <p className="text-sm text-gray-500 mt-4 text-center">
          +{customer.licenses.length - 2} more license types
        </p>
      )}
    </div>
  );
};