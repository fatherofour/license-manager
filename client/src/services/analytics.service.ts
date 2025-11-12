import api from './api';
import { AnalyticsData, TimeFrame } from '@/types';

export const analyticsService = {
  getDashboardData: async (timeframe: TimeFrame = 'monthly'): Promise<AnalyticsData> => {
    const response = await api.get<AnalyticsData>('/analytics/dashboard', {
      params: { timeframe },
    });
    return response.data;
  },

  getSalesData: async (timeframe: TimeFrame = 'monthly') => {
    const response = await api.get('/analytics/sales', {
      params: { timeframe },
    });
    return response.data;
  },

  getLicenseDistribution: async () => {
    const response = await api.get('/analytics/license-distribution');
    return response.data;
  },

  getTopCustomers: async (limit: number = 10) => {
    const response = await api.get('/analytics/top-customers', {
      params: { limit },
    });
    return response.data;
  },

  getRevenueReport: async (startDate: string, endDate: string) => {
    const response = await api.get('/analytics/revenue', {
      params: { startDate, endDate },
    });
    return response.data;
  },
};