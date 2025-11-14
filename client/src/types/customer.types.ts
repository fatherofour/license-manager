import { CustomerLicense } from './license.types';
import { Customer as SharedCustomer } from '../../../shared/types/customer.types';

export interface Customer extends Omit<SharedCustomer, 'lastPurchase' | 'licenses'> {
  lastPurchase: string;  // Override to be strictly string
  licenses: CustomerLicense[];  // Use local CustomerLicense type
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