import { format, parseISO, differenceInDays, addMonths, addYears, setYear } from 'date-fns';

// Helper function to get current date with year set to 2025
const getCurrentDate = (): Date => {
  const now = new Date();
  return setYear(now, 2025);
};

export const formatDisplayDate = (date: string | Date): string => {
  return format(new Date(date), 'MMM dd, yyyy');
};

export const formatInputDate = (date: string | Date): string => {
  return format(new Date(date), 'yyyy-MM-dd');
};

export const getDaysUntil = (date: string | Date): number => {
  return differenceInDays(new Date(date), getCurrentDate());
};

export const isExpiringSoon = (renewalDate: string, daysThreshold: number = 30): boolean => {
  const daysUntil = getDaysUntil(renewalDate);
  return daysUntil > 0 && daysUntil <= daysThreshold;
};

export const isExpired = (renewalDate: string): boolean => {
  return getDaysUntil(renewalDate) < 0;
};

export const calculateRenewalDate = (
  startDate: string | Date,
  duration: number,
  unit: 'months' | 'years'
): string => {
  const date = new Date(startDate);
  const renewalDate = unit === 'months' ? addMonths(date, duration) : addYears(date, duration);
  return formatInputDate(renewalDate);
};

export const getExpiryStatus = (renewalDate: string): 'active' | 'expiring' | 'expired' => {
  if (isExpired(renewalDate)) return 'expired';
  if (isExpiringSoon(renewalDate)) return 'expiring';
  return 'active';
};

// Alias formatDisplayDate as formatDate for backward compatibility
export const formatDate = formatDisplayDate;