import { Users } from 'lucide-react';

export default function AdminCustomers() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-bold text-white">Customers</h1>
      </div>
      
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <Users className="w-8 h-8 text-primary-500" />
        </div>
        <h2 className="text-white font-bold text-lg mb-2">Customer Directory</h2>
        <p className="text-gray-500 text-sm max-w-md">
          View all registered customers, their order history, and account details.
        </p>
      </div>
    </div>
  );
}
