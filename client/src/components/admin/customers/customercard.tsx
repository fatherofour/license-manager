import React from 'react';
import { Badge } from '@/components/common/badge';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { Customer } from "@shared/types/customer.types";

type CustomerStatus = 'active' | 'inactive' | 'suspended';


interface CustomerCardProps {
  customer: Customer & { status: CustomerStatus };
  onClick?: () => void;
}

const statusVariant: Record<CustomerStatus, 'success' | 'default' | 'error'> = {
  active: 'success',
  inactive: 'default',
  suspended: 'error',
} as const;

export const CustomerCard: React.FC<CustomerCardProps> = ({ customer, onClick }) => {

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
          <Badge variant={statusVariant[customer.status] || 'default'} size="sm" className="mt-2">
            {customer.status.toUpperCase()}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {(customer.licenses || []).slice(0, 2).map((license) => (
          <div key={license.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-gray-800">{license.type}</h4>
                <p className="text-sm text-gray-500">Purchased: {formatDate(license.purchaseDate)}</p>
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
            <div className="text-sm mt-3">
              <span className="text-gray-600">
                Renewal: <strong>{formatDate(license.renewalDate)}</strong>
              </span>
              {license.quantity > 1 && (
                <span className="ml-4 text-gray-600">
                  Quantity: <strong>{license.quantity}</strong>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {(customer.licenses?.length || 0) > 2 && (
        <p className="text-sm text-gray-500 mt-4 text-center">
          +{(customer.licenses?.length || 0) - 2} more license types
        </p>
      )}
    </div>
  );
};