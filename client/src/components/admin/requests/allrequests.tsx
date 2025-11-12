import React, { useState } from 'react';
import { RequestCard } from './RequestCard';
import { useRequests } from '@/hooks/useRequests';
import { Loader } from '@/components/common/Loader';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import { Search, Filter } from 'lucide-react';
import { RequestStatus } from '@/types';

export const AllRequests: React.FC = () => {
  const { requests, loading } = useRequests();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.licenseType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || request.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: 'all', label: 'All Requests' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
  ];

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">All Requests</h1>
        <p className="text-gray-500 mt-1">
          {requests.length} total request{requests.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search by customer, email, or license type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search size={20} />}
          />
        </div>
        <div className="w-48">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={statusOptions}
          />
        </div>
      </div>

      {filteredRequests.length > 0 ? (
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              showActions={false}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <p className="text-gray-500 text-lg">
            {searchTerm || statusFilter !== 'all'
              ? 'No requests found matching your filters'
              : 'No requests yet'}
          </p>
        </div>
      )}
    </div>
  );
};