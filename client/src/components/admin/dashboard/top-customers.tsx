import React from 'react';
import { Card } from '@/components/common/Card';
import { formatCurrency } from '@/utils/formatters';
import { TopCustomer } from '@/types';

interface TopCustomersProps {
  customers: TopCustomer[];
}

export const TopCustomers: React.FC<TopCustomersProps> = ({ customers }) => {
  return (
    <Card title="Top Customers by Monthly Spend">
      <div className="space-y-4">
        {customers.map((customer, idx) => (
          <div
            key={customer.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                {idx + 1}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{customer.name}</h3>
                <p className="text-sm text-gray-500">{customer.licenseCount} license types</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-800">
                {formatCurrency(customer.totalSpent)}
              </p>
              <p className="text-sm text-gray-500">Last: {customer.lastPurchase}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};