import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch, faFilter, faPlus, faEllipsisVertical,
  faCheckCircle, faClock, faTimesCircle, faTruck, faBox
} from '@fortawesome/free-solid-svg-icons';
import { useApp } from '../context/AppContext';

const orders = [
  { id: '#ORD-001', customer: 'John Doe', product: 'MacBook Pro 14"', amount: '$2,399.00', status: 'Delivered', date: '2024-01-15', items: 1 },
  { id: '#ORD-002', customer: 'Sarah Smith', product: 'iPhone 15 Pro + Case', amount: '$1,234.00', status: 'Processing', date: '2024-01-14', items: 2 },
  { id: '#ORD-003', customer: 'Mike Johnson', product: 'AirPods Pro', amount: '$249.00', status: 'Cancelled', date: '2024-01-14', items: 1 },
  { id: '#ORD-004', customer: 'Emily Brown', product: 'iPad Air + Apple Pencil', amount: '$879.00', status: 'Shipped', date: '2024-01-13', items: 2 },
  { id: '#ORD-005', customer: 'David Wilson', product: 'Mac Mini M4', amount: '$799.00', status: 'Delivered', date: '2024-01-12', items: 1 },
  { id: '#ORD-006', customer: 'Lisa Park', product: 'Apple Watch Series 10', amount: '$429.00', status: 'Processing', date: '2024-01-11', items: 1 },
  { id: '#ORD-007', customer: 'James Taylor', product: 'Magic Keyboard + Mouse', amount: '$218.00', status: 'Shipped', date: '2024-01-10', items: 2 },
];

const statusConfig = {
  Delivered: { icon: faCheckCircle, cls: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' },
  Processing: { icon: faClock, cls: 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400' },
  Cancelled: { icon: faTimesCircle, cls: 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400' },
  Shipped: { icon: faTruck, cls: 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400' },
};

const OrdersPage = () => {
  const { showToast } = useApp();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [openMenu, setOpenMenu] = useState(null);

  const filtered = orders.filter(o => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalRevenue = orders.reduce((sum, o) => {
    if (o.status !== 'Cancelled') sum += parseFloat(o.amount.replace(/[$,]/g, ''));
    return sum;
  }, 0);

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Orders</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track and manage all customer orders.</p>
        </div>
        <button
          onClick={() => showToast('New order form coming soon!', 'info')}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
          New Order
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Orders', value: orders.length, color: 'text-indigo-600 dark:text-indigo-400' },
          { label: 'Delivered', value: orders.filter(o => o.status === 'Delivered').length, color: 'text-emerald-600 dark:text-emerald-400' },
          { label: 'Shipped', value: orders.filter(o => o.status === 'Shipped').length, color: 'text-blue-600 dark:text-blue-400' },
          { label: 'Revenue', value: `$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 0 })}`, color: 'text-violet-600 dark:text-violet-400' },
        ].map(stat => (
          <div key={stat.label} className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-gray-200 dark:border-zinc-800 shadow-sm">
            <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
            <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-zinc-800 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-48">
            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100"
            />
          </div>
          <div className="flex gap-1">
            {['All', 'Delivered', 'Shipped', 'Processing', 'Cancelled'].map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  filterStatus === s
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-zinc-800/50">
              <tr className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
              {filtered.map(order => {
                const { icon, cls } = statusConfig[order.status];
                return (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono font-medium text-indigo-600 dark:text-indigo-400">{order.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{order.customer}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{order.product}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">{order.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${cls}`}>
                        <FontAwesomeIcon icon={icon} className="w-3 h-3" />
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{order.date}</td>
                    <td className="px-6 py-4 text-right relative">
                      <div className="relative inline-block">
                        <button
                          onClick={() => setOpenMenu(openMenu === order.id ? null : order.id)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-400 transition-colors"
                        >
                          <FontAwesomeIcon icon={faEllipsisVertical} className="w-4 h-4" />
                        </button>
                        {openMenu === order.id && (
                          <div className="absolute right-0 mt-1 w-44 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-xl z-20 overflow-hidden">
                            <button
                              onClick={() => { showToast(`Viewing ${order.id}`, 'info'); setOpenMenu(null); }}
                              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
                            >
                              View Details
                            </button>
                            {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                              <button
                                onClick={() => { showToast(`Order ${order.id} cancelled.`, 'warning'); setOpenMenu(null); }}
                                className="w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                              >
                                Cancel Order
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 dark:border-zinc-800 flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">Showing {filtered.length} of {orders.length} orders</p>
          <div className="flex gap-1">
            {[1, 2, 3].map(p => (
              <button key={p} className={`w-8 h-8 text-sm rounded-lg ${p === 1 ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800'} transition-colors`}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
