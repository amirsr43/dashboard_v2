import React from 'react';
import StatusBadge from '../common/StatusBadge';

const transactions = [
  { id: 1, user: 'John Doe', amount: '$234.50', status: 'Success', date: '2024-01-15' },
  { id: 2, user: 'Sarah Smith', amount: '$1,234.00', status: 'Pending', date: '2024-01-14' },
  { id: 3, user: 'Mike Johnson', amount: '$89.99', status: 'Failed', date: '2024-01-14' },
  { id: 4, user: 'Emily Brown', amount: '$567.30', status: 'Success', date: '2024-01-13' },
  { id: 5, user: 'David Wilson', amount: '$1,890.00', status: 'Success', date: '2024-01-12' },
];

const RecentActivityTable = () => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-zinc-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-zinc-800/50">
            <tr className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                <td className="px-6 py-3 text-sm font-medium text-gray-900 dark:text-white">{transaction.user}</td>
                <td className="px-6 py-3 text-sm text-gray-700 dark:text-gray-300">{transaction.amount}</td>
                <td className="px-6 py-3"><StatusBadge status={transaction.status} /></td>
                <td className="px-6 py-3 text-sm text-gray-500 dark:text-gray-400">{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentActivityTable;