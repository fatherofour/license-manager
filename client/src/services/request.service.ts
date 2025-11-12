import api from './api';
import { LicenseRequest, CreateRequestDto, UpdateRequestDto } from '@/types';

export const requestService = {
  getAll: async (): Promise<LicenseRequest[]> => {
    const response = await api.get<LicenseRequest[]>('/requests');
    return response.data;
  },

  getById: async (id: string): Promise<LicenseRequest> => {
    const response = await api.get<LicenseRequest>(`/requests/${id}`);
    return response.data;
  },

  create: async (data: CreateRequestDto): Promise<LicenseRequest> => {
    const response = await api.post<LicenseRequest>('/requests', data);
    return response.data;
  },

  update: async (id: string, data: UpdateRequestDto): Promise<LicenseRequest> => {
    const response = await api.put<LicenseRequest>(`/requests/${id}`, data);
    return response.data;
  },

  approve: async (id: string, notes?: string): Promise<LicenseRequest> => {
    const response = await api.post<LicenseRequest>(`/requests/${id}/approve`, {
      notes,
    });
    return response.data;
  },

  reject: async (id: string, notes?: string): Promise<LicenseRequest> => {
    const response = await api.post<LicenseRequest>(`/requests/${id}/reject`, {
      notes,
    });
    return response.data;
  },

  getPending: async (): Promise<LicenseRequest[]> => {
    const response = await api.get<LicenseRequest[]>('/requests/pending');
    return response.data;
  },

  getByCustomer: async (customerId: string): Promise<LicenseRequest[]> => {
    const response = await api.get<LicenseRequest[]>(
      `/requests/customer/${customerId}`
    );
    return response.data;
  },
};