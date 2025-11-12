import { useState, useEffect } from 'react';
import { License } from '@/types';
import { licenseService } from '@/services/license.service';
import { useNotification } from '@/context/NotificationContext';

export const useLicenses = () => {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showNotification } = useNotification();

  const fetchLicenses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await licenseService.getAll();
      setLicenses(data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch licenses';
      setError(errorMessage);
      showNotification('error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getLicense = async (id: string): Promise<License | null> => {
    try {
      const data = await licenseService.getById(id);
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch license';
      showNotification('error', errorMessage);
      return null;
    }
  };

  const createLicense = async (licenseData: any): Promise<License | null> => {
    try {
      const data = await licenseService.create(licenseData);
      setLicenses((prev) => [...prev, data]);
      showNotification('success', 'License created successfully');
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to create license';
      showNotification('error', errorMessage);
      return null;
    }
  };

  const updateLicense = async (id: string, licenseData: any): Promise<License | null> => {
    try {
      const data = await licenseService.update(id, licenseData);
      setLicenses((prev) => prev.map((l) => (l.id === id ? data : l)));
      showNotification('success', 'License updated successfully');
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to update license';
      showNotification('error', errorMessage);
      return null;
    }
  };

  const deleteLicense = async (id: string): Promise<boolean> => {
    try {
      await licenseService.delete(id);
      setLicenses((prev) => prev.filter((l) => l.id !== id));
      showNotification('success', 'License deleted successfully');
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to delete license';
      showNotification('error', errorMessage);
      return false;
    }
  };

  useEffect(() => {
    fetchLicenses();
  }, []);

  return {
    licenses,
    loading,
    error,
    refetch: fetchLicenses,
    getLicense,
    createLicense,
    updateLicense,
    deleteLicense,
  };
};