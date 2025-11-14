import React, { useState } from 'react';
import { ClientRequestForm } from '@/components/client/Requests/clientrequestform';
import { ClientRequestsList } from '@/components/client/Requests/clientrequestlist';
import { Button } from "@/components/common/button";
import { Plus, List } from 'lucide-react';

export const RequestsPage: React.FC = () => {
  const [view, setView] = useState<'form' | 'list'>('form');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">License Requests</h1>
          <p className="text-gray-500 mt-1">
            {view === 'form' ? 'Submit a new license request' : 'View your request history'}
          </p>
        </div>
        <Button
          icon={view === 'form' ? <List size={18} /> : <Plus size={18} />}
          onClick={() => setView(view === 'form' ? 'list' : 'form')}
        >
          {view === 'form' ? 'View All Requests' : 'New Request'}
        </Button>
      </div>

      {view === 'form' ? <ClientRequestForm /> : <ClientRequestsList />}
    </div>
  );
};