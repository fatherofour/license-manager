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
      const data = await requestService.getRequests();
      setRequests(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching requests:', err);
      setError('Failed to load requests');
      showNotification({
        type: 'error',
        message: 'Failed to load license requests',
      });
    } finally {
      setLoading(false);
    }
  };

  const createRequest = async (requestData: Partial<LicenseRequest>) => {
    try {
      setLoading(true);
      const newRequest = await requestService.createRequest(requestData);
      setRequests(prev => [...prev, newRequest]);
      showNotification({
        type: 'success',
        message: 'License request submitted successfully',
      });
      return newRequest;
    } catch (err) {
      console.error('Error creating request:', err);
      showNotification({
        type: 'error',
        message: 'Failed to submit license request',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateRequest = async (id: string, updates: Partial<LicenseRequest>) => {
    try {
      setLoading(true);
      const updatedRequest = await requestService.updateRequest(id, updates);
      setRequests(prev =>
        prev.map(req => (req.id === id ? updatedRequest : req))
      );
      showNotification({
        type: 'success',
        message: 'Request updated successfully',
      });
      return updatedRequest;
    } catch (err) {
      console.error('Error updating request:', err);
      showNotification({
        type: 'error',
        message: 'Failed to update request',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteRequest = async (id: string) => {
    try {
      setLoading(true);
      await requestService.deleteRequest(id);
      setRequests(prev => prev.filter(req => req.id !== id));
      showNotification({
        type: 'success',
        message: 'Request deleted successfully',
      });
    } catch (err) {
      console.error('Error deleting request:', err);
      showNotification({
        type: 'error',
        message: 'Failed to delete request',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return {
    requests,
    loading,
    error,
    fetchRequests,
    createRequest,
    updateRequest,
    deleteRequest,
  };
};
