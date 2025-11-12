import React from 'react';
import { Card } from '@/components/common/Card';
import { Table } from '@/components/common/Table';
import { Badge } from '@/components/common/Badge';
import { formatCurrency } from '@/utils/formatters';
import { License } from '@/types';
import { calculateProfit, calculateProfitMargin } from '@/utils/calculations';

interface FinancialAnalyticsProps {
  licenses: License[];
}

export const FinancialAnalytics: React.FC<FinancialAnalyticsProps> = ({ licenses }) => {
  const columns = [
    {
      key: 'type',
      label: 'License Type',
      render: (_: any, row: License) => (
        <div>
          <p className="font-semibold text-gray-800">{row.type}</p>
          <p className="text-sm text-gray-500">{row.subtype}</p>
        </div>
      ),
    },
    {
      key: 'cost',
      label: 'Cost',
      align: 'right' as const,
      render: (value: number) => <span className="text-gray-600">{formatCurrency(value)}</span>,
    },
    {
      key: 'price',
      label: 'Selling Price',
      align: 'right' as const,
      render: (value: number) => (
        <span className="text-gray-800 font-semibold">{formatCurrency(value)}</span>
      ),
    },
    {
      key: 'profit',
      label: 'Profit/Unit',
      align: 'right' as const,
      render: (_: any, row: License) => (
        <span className="text-green-600 font-semibold">
          {formatCurrency(calculateProfit(row))}
        </span>
      ),
    },
    {
      key: 'margin',
      label: 'Margin',
      align: 'right' as const,
      render: (_: any, row: License) => (
        <Badge variant="success">{calculateProfitMargin(row).toFixed(1)}%</Badge>
      ),
    },
  ];

  return (
    <Card title="Financial Analytics">
      <Table columns={columns} data={licenses} />
    </Card>
  );
};