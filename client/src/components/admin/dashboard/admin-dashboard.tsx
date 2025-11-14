import React from 'react';
import { Download } from 'lucide-react';
import { Button } from "@/components/common/button";
import { Loader } from '@/components/common/loader';
import { KPICards } from './kpi-cards';
import { SalesChart } from './sales-chart';
import { LicenseDistribution } from './license-distribution';
import { TopCustomers } from './top-customers';
import { FinancialAnalytics } from './financial-analytics';
import { useAnalytics } from '@/hooks/useanalytics';
import { useLicenses } from '@/hooks/uselicenses';

export const AdminDashboard: React.FC = () => {
  const { data, loading, timeframe, setTimeframe } = useAnalytics();
  const { licenses } = useLicenses();

  if (loading || !data) {
    return <Loader fullScreen />;
  }

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Exporting report...');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
        <Button icon={<Download size={18} />} onClick={handleExport}>
          Export Report
        </Button>
      </div>

      <KPICards metrics={data.kpiMetrics} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart
          data={data.salesData[timeframe]}
          timeframe={timeframe}
          onTimeframeChange={setTimeframe}
        />
        <LicenseDistribution data={data.licenseDistribution} />
      </div>

      <TopCustomers customers={data.topCustomers} />

      <FinancialAnalytics licenses={licenses} />
    </div>
  );
};