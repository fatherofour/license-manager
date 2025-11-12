export interface SalesData {
  name: string;
  licenses: number;
  revenue: number;
}

export interface LicenseDistribution {
  name: string;
  value: number;
  color: string;
}

export interface KPIMetrics {
  totalRevenue: number;
  totalProfit: number;
  activeCustomers: number;
  totalLicenses: number;
  revenueGrowth: number;
  profitMargin: number;
}

export interface TopCustomer {
  id: string;
  name: string;
  totalSpent: number;
  licenseCount: number;
  lastPurchase: string;
}

export type TimeFrame = 'daily' | 'weekly' | 'monthly';

export interface AnalyticsData {
  kpiMetrics: KPIMetrics;
  salesData: {
    daily: SalesData[];
    weekly: SalesData[];
    monthly: SalesData[];
  };
  licenseDistribution: LicenseDistribution[];
  topCustomers: TopCustomer[];
}