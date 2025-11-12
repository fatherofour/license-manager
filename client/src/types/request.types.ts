export enum RequestStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export interface LicenseRequest {
  id: string;
  customerId: string;
  customerName: string;
  licenseType: string;
  subtype: string;
  userEmail: string;
  mobile: string;
  status: RequestStatus;
  requestDate: string;
  processedDate?: string;
  processedBy?: string;
  notes?: string;
}

export interface CreateRequestDto {
  customerId: string;
  licenseType: string;
  subtype: string;
  userEmail: string;
  mobile: string;
  notes?: string;
}

export interface UpdateRequestDto {
  status: RequestStatus;
  notes?: string;
}