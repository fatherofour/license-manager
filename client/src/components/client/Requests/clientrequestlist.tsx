import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRequests } from '@/hooks/useRequests';
import { Loader } from '@/components/common/Loader';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import { Search, Clock, CheckCircle, XCircle } from 'lucide-react';
import { formatDate } from '@/utils/formatters';
import { Badge } from '@/components/common/Badge';
import { Card } from '@/components/common/Card';
import { LicenseRequest } from '@/types';

export const ClientRequestsList: React.FC = () => {
  const { user } = useAuth();
  const { requests, loading } = useRequests();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const customerRequests = requests.filter((r) => r.customerId === user?.customerId);

  const filteredRequests = customerRequests.filter((request) => {
    const matchesSearch =
      request.licenseType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.subtype.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: 'all', label: 'All Requests' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={18} />;
      case 'approved':
        return <CheckCircle size={18} />;
      case 'rejected':
        return <XCircle size={18} />;
      default:
        return null;
    }
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">My Requests</h1>
        <p className="text-gray-500 mt-1">
          {customerRequests.length} total request
          {customerRequests.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search by license type, email, or subtype..."
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
          {filteredRequests
            .sort(
              (a, b) =>
                new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime()
            )
            .map((request) => (
              <Card key={request.id} hover>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-800">
                        {request.licenseType} - {request.subtype}
                      </h3>
                      <Badge variant={getStatusVariant(request.status)}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(request.status)}
                          {request.status.toUpperCase()}
                        </span>
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">User Email</p>
                    <p className="font-medium text-gray-800">{request.userEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mobile</p>
                    <p className="font-medium text-gray-800">{request.mobile}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Request Date</p>
                    <p className="font-medium text-gray-800">
                      {formatDate(request.requestDate)}
                    </p>
                  </div>
                </div>

                {request.processedDate && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <strong>Processed:</strong> {formatDate(request.processedDate)}
                      {request.processedBy && ` by ${request.processedBy}`}
                    </p>
                  </div>
                )}

                {request.notes && (
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-700">
                      <strong>Notes:</strong> {request.notes}
                    </p>
                  </div>
                )}

                {request.status === 'pending' && (
                  <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-sm text-yellow-800 flex items-center gap-2">
                      <Clock size={16} />
                      This request is pending review by our team
                    </p>
                  </div>
                )}

                {request.status === 'approved' && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-800 flex items-center gap-2">
                      <CheckCircle size={16} />
                      This request has been approved and the license has been provisioned
                    </p>
                  </div>
                )}

                {request.status === 'rejected' && (
                  <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-sm text-red-800 flex items-center gap-2">
                      <XCircle size={16} />
                      This request was rejected. Please contact support for more information.
                    </p>
                  </div>
                )}
              </Card>
            ))}
        </div>
      ) : (
        <Card>
          <div className="text-center py-12">
            <Clock size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">
              {searchTerm || statusFilter !== 'all'
                ? 'No requests found matching your filters'
                : 'No requests submitted yet'}
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Submit a new request to get started
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};