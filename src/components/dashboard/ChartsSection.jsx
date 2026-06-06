import React, { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const revenueData = {
  '7d': [
    { label: 'Mon', revenue: 4200, orders: 38 },
    { label: 'Tue', revenue: 5800, orders: 52 },
    { label: 'Wed', revenue: 4900, orders: 44 },
    { label: 'Thu', revenue: 7100, orders: 63 },
    { label: 'Fri', revenue: 8400, orders: 75 },
    { label: 'Sat', revenue: 6200, orders: 56 },
    { label: 'Sun', revenue: 5100, orders: 47 },
  ],
  '30d': [
    { label: 'Wk 1', revenue: 28000, orders: 245 },
    { label: 'Wk 2', revenue: 34000, orders: 298 },
    { label: 'Wk 3', revenue: 29500, orders: 267 },
    { label: 'Wk 4', revenue: 41200, orders: 371 },
  ],
  '90d': [
    { label: 'Jan', revenue: 98000, orders: 890 },
    { label: 'Feb', revenue: 112000, orders: 1020 },
    { label: 'Mar', revenue: 125000, orders: 1140 },
  ],
};

const trafficData = [
  { name: 'Organic', value: 42, color: '#6366f1' },
  { name: 'Direct', value: 28, color: '#8b5cf6' },
  { name: 'Social', value: 18, color: '#ec4899' },
  { name: 'Referral', value: 8, color: '#f59e0b' },
  { name: 'Email', value: 4, color: '#10b981' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 shadow-xl text-sm">
        <p className="font-semibold text-gray-700 dark:text-gray-200 mb-2">{label}</p>
        {payload.map(p => (
          <p key={p.dataKey} style={{ color: p.color }} className="font-medium">
            {p.dataKey === 'revenue' ? `$${p.value.toLocaleString()}` : `${p.value} orders`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ChartsSection = () => {
  const [period, setPeriod] = useState('7d');
  const data = revenueData[period];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Revenue Area Chart */}
      <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Revenue Overview</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Total earnings over time</p>
          </div>
          <div className="flex gap-1 bg-gray-100 dark:bg-zinc-800 rounded-lg p-1">
            {Object.keys(revenueData).map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  period === p
                    ? 'bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:opacity-20" />
            <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={v => v >= 1000 ? `$${v/1000}k` : `$${v}`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} fill="url(#colorRevenue)" dot={false} activeDot={{ r: 5, fill: '#6366f1' }} />
            <Area type="monotone" dataKey="orders" stroke="#8b5cf6" strokeWidth={2} fill="url(#colorOrders)" dot={false} activeDot={{ r: 4, fill: '#8b5cf6' }} />
          </AreaChart>
        </ResponsiveContainer>

        <div className="flex gap-4 mt-3">
          <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <span className="w-3 h-0.5 bg-indigo-500 inline-block rounded" /> Revenue
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <span className="w-3 h-0.5 bg-violet-500 inline-block rounded" /> Orders
          </span>
        </div>
      </div>

      {/* Traffic Sources Pie Chart */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm p-6">
        <div className="mb-4">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Traffic Sources</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Visitor acquisition breakdown</p>
        </div>

        <ResponsiveContainer width="100%" height={160}>
          <PieChart>
            <Pie
              data={trafficData}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={70}
              paddingAngle={3}
              dataKey="value"
            >
              {trafficData.map((entry, i) => (
                <Cell key={i} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: 'var(--tw-color-zinc-900)', border: 'none', borderRadius: '8px', fontSize: '12px' }} />
          </PieChart>
        </ResponsiveContainer>

        <div className="space-y-2 mt-2">
          {trafficData.map(d => (
            <div key={d.name} className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                {d.name}
              </span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">{d.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;