import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Input } from '@/components/common/input';
import { Select } from '@/components/common/select';
import { Button } from "@/components/common/button";
import { Card } from '@/components/common/Card';
import { useCustomers } from '@/hooks/usecustomers';
import { useLicenses } from '@/hooks/uselicenses';
import { useRequests } from '@/hooks/userequests';
import { useNotification } from '@/context/NotificationContext';
import { LICENSE_TYPES, LICENSE_SUBTYPES } from '@/utils/constants';
import { validateEmail, validatePhone, validateRequired } from '@/utils/validators';

interface FormData {
  customerId: string;
  licenseType: string;
  subtype: string;
  userEmail: string;
  mobile: string;
  notes: string;
}

interface FormErrors {
  customerId?: string;
  licenseType?: string;
  subtype?: string;
  userEmail?: string;
  mobile?: string;
}

export const NewRequestForm: React.FC = () => {
  const { customers } = useCustomers();
  const { licenses } = useLicenses();
  const { createRequest } = useRequests();
  const { showNotification } = useNotification();

  const [formData, setFormData] = useState<FormData>({
    customerId: '',
    licenseType: 'Microsoft 365',
    subtype: '',
    userEmail: '',
    mobile: '',
    notes: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const customerOptions = customers.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  const licenseTypeOptions = Object.values(LICENSE_TYPES).map((type) => ({
    value: type,
    label: type,
  }));

  const subtypeOptions = formData.licenseType
    ? LICENSE_SUBTYPES[formData.licenseType as keyof typeof LICENSE_SUBTYPES]?.map(
        (subtype) => ({
          value: subtype,
          label: subtype,
        })
      ) || []
    : [];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!validateRequired(formData.customerId)) {
      newErrors.customerId = 'Customer is required';
    }

    if (!validateRequired(formData.licenseType)) {
      newErrors.licenseType = 'License type is required';
    }

    if (!validateRequired(formData.subtype)) {
      newErrors.subtype = 'License subtype is required';
    }

    if (!validateEmail(formData.userEmail)) {
      newErrors.userEmail = 'Valid email is required';
    }

    if (!validatePhone(formData.mobile)) {
      newErrors.mobile = 'Valid phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      showNotification('error', 'Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedCustomer = customers.find((c) => c.id === formData.customerId);
      
      await createRequest({
        customerId: formData.customerId,
        licenseType: formData.licenseType,
        subtype: formData.subtype,
        userEmail: formData.userEmail,
        mobile: formData.mobile,
        notes: formData.notes,
      });

      // Reset form
      setFormData({
        customerId: '',
        licenseType: 'Microsoft 365',
        subtype: '',
        userEmail: '',
        mobile: '',
        notes: '',
      });
      setErrors({});
    } catch (error) {
      console.error('Failed to submit request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      // Reset subtype when license type changes
      ...(field === 'licenseType' ? { subtype: '' } : {}),
    }));

    // Clear error for this field
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field as keyof FormErrors];
        return newErrors;
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card title="New License Request" subtitle="Submit a new license request for a customer">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Select
            label="Customer"
            required
            value={formData.customerId}
            onChange={(e) => handleChange('customerId', e.target.value)}
            options={[
              { value: '', label: 'Select customer...' },
              ...customerOptions,
            ]}
            error={errors.customerId}
          />

          <Select
            label="License Type"
            required
            value={formData.licenseType}
            onChange={(e) => handleChange('licenseType', e.target.value)}
            options={licenseTypeOptions}
            error={errors.licenseType}
          />

          <Select
            label="License Subtype"
            required
            value={formData.subtype}
            onChange={(e) => handleChange('subtype', e.target.value)}
            options={[
              { value: '', label: 'Select subtype...' },
              ...subtypeOptions,
            ]}
            error={errors.subtype}
            disabled={!formData.licenseType}
          />

          <Input
            type="email"
            label="User Email"
            required
            value={formData.userEmail}
            onChange={(e) => handleChange('userEmail', e.target.value)}
            placeholder="user@company.com"
            error={errors.userEmail}
          />

          <Input
            type="tel"
            label="Mobile Number"
            required
            value={formData.mobile}
            onChange={(e) => handleChange('mobile', e.target.value)}
            placeholder="+1234567890"
            error={errors.mobile}
          />

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Add any additional notes..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              rows={4}
            />
          </div>

          <Button
            type="submit"
            isLoading={isSubmitting}
            icon={<Plus size={20} />}
            className="w-full"
          >
            Submit Request
          </Button>
        </form>
      </Card>
    </div>
  );
};