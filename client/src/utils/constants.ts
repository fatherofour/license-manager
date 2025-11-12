export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'MSP License Manager';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_CUSTOMERS: '/admin/customers',
  ADMIN_LICENSES: '/admin/licenses',
  ADMIN_REQUESTS: '/admin/requests',
  ADMIN_PENDING: '/admin/pending',
  ADMIN_SETTINGS: '/admin/settings',
  CLIENT_DASHBOARD: '/client/dashboard',
  CLIENT_LICENSES: '/client/licenses',
  CLIENT_REQUESTS: '/client/requests',
} as const;

export const LICENSE_TYPES = {
  MICROSOFT_365: 'Microsoft 365',
  WINDOWS: 'Windows',
  SOPHOS: 'Sophos',
  ZOHO: 'Zoho',
  VOUCHER: 'Voucher',
} as const;

export const LICENSE_SUBTYPES = {
  'Microsoft 365': [
    'Business Basic',
    'Business Standard',
    'Business Premium',
    'E3',
    'E5',
  ],
  Windows: [
    'Windows 10 Pro',
    'Windows 11 Pro',
    'Windows 11 Enterprise',
    'Windows Server 2022',
  ],
  Sophos: [
    'Endpoint Protection',
    'Complete Security',
    'XG Firewall',
    'Central Cloud',
  ],
  Zoho: [
    'Workplace Standard',
    'Workplace Professional',
    'CRM Standard',
    'CRM Professional',
  ],
  Voucher: ['Gift Card', 'Promotional Code'],
} as const;

export const STATUS_COLORS = {
  active: 'bg-green-100 text-green-700',
  expiring: 'bg-yellow-100 text-yellow-700',
  expired: 'bg-red-100 text-red-700',
  suspended: 'bg-gray-100 text-gray-700',
  pending: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
} as const;

export const CHART_COLORS = {
  'Microsoft 365': '#0078D4',
  Windows: '#00A4EF',
  Sophos: '#00C1D5',
  Zoho: '#C74634',
  Voucher: '#F59E0B',
} as const;