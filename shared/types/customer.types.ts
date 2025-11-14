import { LicenseUser } from '../../client/src/types/license.types';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  status: 'active' | 'inactive' | 'suspended';
  totalSpent: number;
  lastPurchase: string | Date;
  licenses: Array<{
    id: string;
    licenseId: string;
    customerId: string;
    type: string;
    subtype: string;
    quantity: number;
    users: LicenseUser[];
    purchaseDate: string | Date;
    renewalDate: string | Date;
    status: 'active' | 'expiring' | 'expired' | 'suspended';
    notes?: string;
  }>;
}