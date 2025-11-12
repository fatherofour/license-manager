import { useState, useEffect } from 'react';
import { AnalyticsData, TimeFrame } from '@/types';
import { analyticsService } from '@/services/analytics.service';
import { useNotification } from '@/context/NotificationContext';

export const useAnalytics = (initialTimeframe: TimeFrame = 'monthly') => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<TimeFrame>(initialTimeframe);
  const { showNotification } = useNotification();

  const fetchAnalytics = async (tf: TimeFrame = timeframe) => {
    try {
      setLoading(true);
      setError(null);
      const analyticsData = await analyticsService.getDashboardData(tf);
      setData(analyticsData);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch analytics';
      setError(errorMessage);
      showNotification('error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics(timeframe);
  }, [timeframe]);

  return {
    data,
    loading,
    error,
    timeframe,
    setTimeframe,
    refetch: fetchAnalytics,
  };
};