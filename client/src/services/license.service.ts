import api from './api';
import {
  License,
  CustomerLicense,
  CreateLicenseDto,
  UpdateLicenseDto,
  AssignLicenseDto,
} from '@/types';

export const licenseService = {
  getAll: async (): Promise<License[]> => {
    const response = await api.get<License[]>('/licenses');
    return response.data;
  },

  getById: async (id: string): Promise<License> => {
    const response = await api.get<License>(`/licenses/${id}`);
    return response.data;
  },

  create: async (data: CreateLicenseDto): Promise<License> => {
    const response = await api.post<License>('/licenses', data);
    return response.data;
  },

  update: async (id: string, data: UpdateLicenseDto): Promise<License> => {
    const response = await api.put<License>(`/licenses/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/licenses/${id}`);
  },

  assignToCustomer: async (data: AssignLicenseDto): Promise<CustomerLicense> => {
    const response = await api.post<CustomerLicense>('/licenses/assign', data);
    return response.data;
  },

  getCustomerLicenses: async (customerId: string): Promise<CustomerLicense[]> => {
    const response = await api.get<CustomerLicense[]>(
      `/licenses/customer/${customerId}`
    );
    return response.data;
  },
};