import React from 'react';
import { LicenseRequest } from '@/types';
import { formatDate } from '@/utils/formatters';
import { Badge } from '@/components/common/badge';
import { Card } from '@/components/common/Card';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

interface RecentRequestsProps {
  requests: LicenseRequest[];
}

export const RecentRequests: React.FC<RecentRequestsProps> = ({ requests }) => {
  const recentRequests = requests
    .sort((a, b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime())
    .slice(0, 5);

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

  return (
    <Card title="Recent Requests" subtitle="Your latest license requests">
      {recentRequests.length > 0 ? (
        <div className="space-y-3">
          {recentRequests.map((request) => (
            <div
              key={request.id}
              className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:shadow-sm transition"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-semibold text-gray-800">
                    {request.licenseType} - {request.subtype}
                  </h4>
                  <Badge variant={getStatusVariant(request.status)}>
                    <span className="flex items-center gap-1">
                      {getStatusIcon(request.status)}
                      {request.status.toUpperCase()}
                    </span>
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">User: {request.userEmail}</p>
                <p className="text-sm text-gray-500">
                  Requested: {formatDate(request.requestDate)}
                </p>
                {request.processedDate && (
                  <p className="text-sm text-gray-500">
                    Processed: {formatDate(request.processedDate)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Clock size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">No requests yet</p>
          <p className="text-gray-400 text-sm mt-2">
            Submit a request to get started
          </p>
        </div>
      )}
    </Card>
  );
};