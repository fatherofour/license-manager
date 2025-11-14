import React, { useState } from 'react';
import { Search, Plus, Filter, ChevronDown } from 'lucide-react';
import { Input } from '@/components/common/input';
import { Button } from "@/components/common/button";
import { Loader } from '@/components/common/loader';
import { CustomerCard } from './customercard';
import { useCustomers } from '@/hooks/usecustomers';
import { Customer } from '@shared/types/customer.types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const CustomersList: React.FC = () => {
  const { customers, loading } = useCustomers();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'suspended'>(
    'all'
  );

  const filteredCustomers = customers.filter((customer: Customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
        <Button icon={<Plus size={18} />}>Add Customer</Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => setFilterStatus('all')}>
              All Status
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setFilterStatus('active')}>
              Active
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setFilterStatus('inactive')}>
              Inactive
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setFilterStatus('suspended')}>
              Suspended
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid gap-6">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <CustomerCard key={customer.id} customer={customer} />
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            No customers found matching your criteria
          </div>
        )}
      </div>
    </div>
 );
};