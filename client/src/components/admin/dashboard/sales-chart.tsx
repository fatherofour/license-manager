import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '@/components/common/Card';
import { TimeFrame, SalesData } from '@/types';

interface SalesChartProps {
  data: SalesData[];
  timeframe: TimeFrame;
  onTimeframeChange: (timeframe: TimeFrame) => void;
}

export const SalesChart: React.FC<SalesChartProps> = ({
  data,
  timeframe,
  onTimeframeChange,
}) => {
  const timeframeButtons = [
    { value: 'daily' as TimeFrame, label: 'Daily' },
    { value: 'weekly' as TimeFrame, label: 'Weekly' },
    { value: 'monthly' as TimeFrame, label: 'Monthly' },
  ];

  return (
    <Card
      title="Sales Performance"
      actions={
        <div className="flex gap-2">
          {timeframeButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => onTimeframeChange(btn.value)}
              className={`px-3 py-1 rounded transition ${
                timeframe === btn.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      }
    >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="licenses"
            stroke="#0078D4"
            strokeWidth={2}
            name="Licenses Sold"
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#10B981"
            strokeWidth={2}
            name="Revenue ($)"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};