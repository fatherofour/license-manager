import { useState, useEffect } from 'react';
import { Customer } from '@/types';
import { customerService } from '@/services/customer.service';
import { useNotification } from '@/context/NotificationContext';

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showNotification } = useNotification();

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await customerService.getAll();
      setCustomers(data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch customers';
      setError(errorMessage);
      showNotification('error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getCustomer = async (id: string): Promise<Customer | null> => {
    try {
      const data = await customerService.getById(id);
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch customer';
      showNotification('error', errorMessage);
      return null;
    }
  };

  const createCustomer = async (customerData: any): Promise<Customer | null> => {
    try {
      const data = await customerService.create(customerData);
      setCustomers((prev) => [...prev, data]);
      showNotification('success', 'Customer created successfully');
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to create customer';
      showNotification('error', errorMessage);
      return null;
    }
  };

  const updateCustomer = async (
    id: string,
    customerData: any
  ): Promise<Customer | null> => {
    try {
      const data = await customerService.update(id, customerData);
      setCustomers((prev) => prev.map((c) => (c.id === id ? data : c)));
      showNotification('success', 'Customer updated successfully');
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to update customer';
      showNotification('error', errorMessage);
      return null;
    }
  };

  const deleteCustomer = async (id: string): Promise<boolean> => {
    try {
      await customerService.delete(id);
      setCustomers((prev) => prev.filter((c) => c.id !== id));
      showNotification('success', 'Customer deleted successfully');
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to delete customer';
      showNotification('error', errorMessage);
      return false;
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return {
    customers,
    loading,
    error,
    refetch: fetchCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  };
};