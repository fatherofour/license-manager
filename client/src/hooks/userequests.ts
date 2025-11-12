import { useState, useEffect } from 'react';
import { LicenseRequest } from '@/types';
import { requestService } from '@/services/request.service';
import { useNotification } from '@/context/NotificationContext';

export const useRequests = () => {
  const [requests, setRequests] = useState<LicenseRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showNotification } = useNotification();

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await requestService.getAll();
      setRequests(data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch requests';
      setError(errorMessage);
      showNotification('error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const createRequest = async (requestData: any): Promise<LicenseRequest | null> => {
    try {
      const data = await requestService.create(requestData);
      setRequests((prev) => [...prev, data]);
      showNotification('success', 'Request submitted successfully');
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to create request';
      showNotification('error', errorMessage);
      return null;
    }
  };

  const approveRequest = async (id: string, notes?: string): Promise<boolean> => {
    try {
      const data = await requestService.approve(id, notes);
      setRequests((prev) => prev.map((r) => (r.id === id ? data : r)));
      showNotification('success', 'Request approved successfully');
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to approve request';
      showNotification('error', errorMessage);
      return false;
    }
  };

  const rejectRequest = async (id: string, notes?: string): Promise<boolean> => {
    try {
      const data = await requestService.reject(id, notes);
      setRequests((prev) => prev.map((r) => (r.id === id ? data : r)));
      showNotification('success', 'Request rejected successfully');
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to reject request';
      showNotification('error', errorMessage);
      return false;
    }
  };

  const getPendingRequests = async () => {
    try {
      const data = await requestService.getPending();
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch pending requests';
      showNotification('error', errorMessage);
      return [];
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return {
    requests,
    loading,
    error,
    refetch: fetchRequests,
    createRequest,
    approveRequest,
    rejectRequest,
    getPendingRequests,
  };
};