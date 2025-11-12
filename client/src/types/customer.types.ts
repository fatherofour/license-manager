import { CustomerLicense } from './license.types';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  licenses: CustomerLicense[];
  totalSpent: number;
  lastPurchase: string;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomerDto {
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface UpdateCustomerDto {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  status?: 'active' | 'inactive' | 'suspended';
}