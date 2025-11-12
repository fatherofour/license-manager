import { License, CustomerLicense } from '@/types';

export const calculateProfit = (license: License): number => {
  return license.price - license.cost;
};

export const calculateProfitMargin = (license: License): number => {
  return ((license.price - license.cost) / license.price) * 100;
};

export const calculateTotalRevenue = (licenses: CustomerLicense[]): number => {
  return licenses.reduce((total, license) => {
    return total + license.quantity;
  }, 0);
};

export const calculateTotalProfit = (
  customerLicenses: CustomerLicense[],
  licenseTypes: License[]
): number => {
  return customerLicenses.reduce((total, customerLicense) => {
    const licenseType = licenseTypes.find(
      (lt) => lt.subtype === customerLicense.subtype
    );
    if (licenseType) {
      return total + calculateProfit(licenseType) * customerLicense.quantity;
    }
    return total;
  }, 0);
};

export const calculateGrowthRate = (current: number, previous: number): number => {
  if (previous === 0) return 100;
  return ((current - previous) / previous) * 100;
};