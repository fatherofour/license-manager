import React, { useState } from 'react';
import { RequestCard } from './RequestCard';
import { useRequests } from '@/hooks/useRequests';
import { Loader } from '@/components/common/Loader';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Filter, Search } from 'lucide-react';

export const PendingRequests: React.FC = () => {
  const { requests, loading, approveRequest, rejectRequest } = useRequests();
  const [searchTerm, setSearchTerm] = useState('');
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const pendingRequests = requests.filter((r) => r.status === 'pending');

  const filteredRequests = pendingRequests.filter(
    (request) =>
      request.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.licenseType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApproveClick = (id: string) => {
    setSelectedRequestId(id);
    setShowApproveModal(true);
  };

  const handleRejectClick = (id: string) => {
    setSelectedRequestId(id);
    setShowRejectModal(true);
  };

  const handleApprove = async () => {
    if (!selectedRequestId) return;

    setIsProcessing(true);
    const success = await approveRequest(selectedRequestId, notes);
    setIsProcessing(false);

    if (success) {
      setShowApproveModal(false);
      setSelectedRequestId(null);
      setNotes('');
    }
  };

  const handleReject = async () => {
    if (!selectedRequestId) return;

    setIsProcessing(true);
    const success = await rejectRequest(selectedRequestId, notes);
    setIsProcessing(false);

    if (success) {
      setShowRejectModal(false);
      setSelectedRequestId(null);
      setNotes('');
    }
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Pending Requests</h1>
          <p className="text-gray-500 mt-1">
            {pendingRequests.length} request{pendingRequests.length !== 1 ? 's' : ''} pending
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search size={20} />}
            />
          </div>
          <Button icon={<Filter size={18} />} variant="outline">
            Filter
          </Button>
        </div>
      </div>

      {filteredRequests.length > 0 ? (
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onApprove={handleApproveClick}
              onReject={handleRejectClick}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <p className="text-gray-500 text-lg">
            {searchTerm
              ? 'No requests found matching your search'
              : 'No pending requests at this time'}
          </p>
        </div>
      )}

      {/* Approve Modal */}
      <Modal
        isOpen={showApproveModal}
        onClose={() => {
          setShowApproveModal(false);
          setNotes('');
        }}
        title="Approve Request"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to approve this license request? The license will be
            provisioned for the customer.
          </p>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Approval Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about this approval..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setShowApproveModal(false);
                setNotes('');
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="success"
              onClick={handleApprove}
              isLoading={isProcessing}
              className="flex-1"
            >
              Approve Request
            </Button>
          </div>
        </div>
      </Modal>

      {/* Reject Modal */}
      <Modal
        isOpen={showRejectModal}
        onClose={() => {
          setShowRejectModal(false);
          setNotes('');
        }}
        title="Reject Request"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to reject this license request? This action cannot be
            undone.
          </p>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Rejection Reason (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Provide a reason for rejection..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setShowRejectModal(false);
                setNotes('');
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleReject}
              isLoading={isProcessing}
              className="flex-1"
            >
              Reject Request
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};