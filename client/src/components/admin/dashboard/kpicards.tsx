import React from 'react';
import { TrendingUp, DollarSign, Users, Package } from 'lucide-react';
import { formatCurrency, formatNumber } from '@/utils/formatters';
import { KPIMetrics } from '@/types';

interface KPICardsProps {
  metrics: KPIMetrics;
}

export const KPICards: React.FC<KPICardsProps> = ({ metrics }) => {
  const cards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(metrics.totalRevenue),
      change: `+${metrics.revenueGrowth.toFixed(1)}% from last month`,
      icon: DollarSign,
      gradient: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-400',
    },
    {
      title: 'Total Profit',
      value: formatCurrency(metrics.totalProfit),
      change: `Margin: ${metrics.profitMargin.toFixed(1)}%`,
      icon: TrendingUp,
      gradient: 'from-green-500 to-green-600',
      bgColor: 'bg-green-400',
    },
    {
      title: 'Active Customers',
      value: formatNumber(metrics.activeCustomers),
      change: '+3 this month',
      icon: Users,
      gradient: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-400',
    },
    {
      title: 'Total Licenses',
      value: formatNumber(metrics.totalLicenses),
      change: 'Across all customers',
      icon: Package,
      gradient: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`bg-gradient-to-br ${card.gradient} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white text-opacity-90 text-sm">{card.title}</p>
              <h3 className="text-3xl font-bold mt-2">{card.value}</h3>
              <p className="text-white text-opacity-90 text-sm mt-2">{card.change}</p>
            </div>
            <div className={`${card.bgColor} bg-opacity-30 p-3 rounded-lg`}>
              <card.icon size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};