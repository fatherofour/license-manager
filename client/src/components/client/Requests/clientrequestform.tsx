import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Input } from '@/components/common/input';
import { Select } from '@/components/common/select';
import { Button } from "@/components/common/button";
import { Card } from '@/components/common/Card';
import { useAuth } from '@/hooks/useauths';
import { useCustomers } from '@/hooks/usecustomers';
import { useRequests } from '@/hooks/userequests';
import { useNotification } from '@/context/NotificationContext';
import { LICENSE_TYPES, LICENSE_SUBTYPES } from '@/utils/constants';
import { validateEmail, validatePhone, validateRequired } from '@/utils/validators';
import { Loader } from '@/components/common/loader';

interface FormData {
  licenseType: string;
  subtype: string;
  userEmail: string;
  mobile: string;
  notes: string;
}

interface FormErrors {
  licenseType?: string;
  subtype?: string;
  userEmail?: string;
  mobile?: string;
}

export const ClientRequestForm: React.FC = () => {
  const { user } = useAuth();
  const { customers, loading: customersLoading } = useCustomers();
  const { createRequest } = useRequests();
  const { showNotification } = useNotification();

  const currentCustomer = customers.find((c) => c.id === user?.customerId);

  const [formData, setFormData] = useState<FormData>({
    licenseType: 'Microsoft 365',
    subtype: '',
    userEmail: '',
    mobile: '',
    notes: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (customersLoading || !currentCustomer) {
    return <Loader fullScreen />;
  }

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
      await createRequest({
        customerId: currentCustomer.id,
        licenseType: formData.licenseType,
        subtype: formData.subtype,
        userEmail: formData.userEmail,
        mobile: formData.mobile,
        notes: formData.notes,
      });

      // Reset form
      setFormData({
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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Request New License</h1>
        <p className="text-gray-500 mt-1">
          Submit a request for a new license for your organization
        </p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Organization:</strong> {currentCustomer.name}
              </p>
              <p className="text-sm text-gray-600 mt-1">{currentCustomer.email}</p>
            </div>

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
              helperText="Email address for the user who will use this license"
            />

            <Input
              type="tel"
              label="Mobile Number"
              required
              value={formData.mobile}
              onChange={(e) => handleChange('mobile', e.target.value)}
              placeholder="+1234567890"
              error={errors.mobile}
              helperText="Contact number for the user"
            />

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Add any additional information or special requirements..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                rows={4}
              />
            </div>

            <div className="pt-4 border-t border-gray-200">
              <Button
                type="submit"
                isLoading={isSubmitting}
                icon={<Plus size={20} />}
                className="w-full"
              >
                Submit License Request
              </Button>
              <p className="text-sm text-gray-500 text-center mt-3">
                Your request will be reviewed by our team and you'll be notified once
                it's processed
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};