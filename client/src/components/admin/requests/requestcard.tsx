import React from 'react';
import { LicenseRequest } from '@/types';
import { formatDate } from '@/utils/formatters';
import { Badge } from '@/components/common/badge';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { Button } from "@/components/common/button";

interface RequestCardProps {
  request: LicenseRequest;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  showActions?: boolean;
}

export const RequestCard: React.FC<RequestCardProps> = ({
  request,
  onApprove,
  onReject,
  showActions = true,
}) => {
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
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition bg-white">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{request.customerName}</h3>
          <p className="text-gray-500">
            {request.licenseType} - {request.subtype}
          </p>
        </div>
        <Badge variant={getStatusVariant(request.status)}>
          <span className="flex items-center gap-1">
            {getStatusIcon(request.status)}
            {request.status.toUpperCase()}
          </span>
        </Badge>
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
          <p className="font-medium text-gray-800">{formatDate(request.requestDate)}</p>
        </div>
      </div>

      {request.notes && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Notes:</p>
          <p className="text-sm text-gray-700">{request.notes}</p>
        </div>
      )}

      {request.processedDate && (
        <div className="mb-4">
          <p className="text-sm text-gray-500">
            Processed on {formatDate(request.processedDate)}
            {request.processedBy && ` by ${request.processedBy}`}
          </p>
        </div>
      )}

      {showActions && request.status === 'pending' && (
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Button
            variant="success"
            className="flex-1"
            icon={<CheckCircle size={18} />}
            onClick={() => onApprove?.(request.id)}
          >
            Approve
          </Button>
          <Button
            variant="danger"
            className="flex-1"
            icon={<XCircle size={18} />}
            onClick={() => onReject?.(request.id)}
          >
            Reject
          </Button>
        </div>
      )}
    </div>
  );
};