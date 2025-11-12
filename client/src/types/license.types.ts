export enum LicenseCategory {
  MICROSOFT_365 = 'Microsoft 365',
  WINDOWS = 'Windows',
  SOPHOS = 'Sophos',
  ZOHO = 'Zoho',
  VOUCHER = 'Voucher',
}

export enum LicenseStatus {
  ACTIVE = 'active',
  EXPIRING = 'expiring',
  EXPIRED = 'expired',
  SUSPENDED = 'suspended',
}

export interface License {
  id: string;
  type: LicenseCategory;
  subtype: string;
  cost: number;
  price: number;
  active: boolean;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LicenseUser {
  email: string;
  mobile: string;
  assignedDate: string;
}

export interface CustomerLicense {
  id: string;
  licenseId: string;
  customerId: string;
  type: LicenseCategory;
  subtype: string;
  quantity: number;
  users: LicenseUser[];
  purchaseDate: string;
  renewalDate: string;
  status: LicenseStatus;
  notes?: string;
}

export interface CreateLicenseDto {
  type: LicenseCategory;
  subtype: string;
  cost: number;
  price: number;
  description?: string;
}

export interface UpdateLicenseDto {
  subtype?: string;
  cost?: number;
  price?: number;
  active?: boolean;
  description?: string;
}

export interface AssignLicenseDto {
  customerId: string;
  licenseId: string;
  quantity: number;
  renewalDate: string;
  users?: LicenseUser[];
}