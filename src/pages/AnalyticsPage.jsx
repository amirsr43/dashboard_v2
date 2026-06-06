import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUp, faArrowDown, faEye, faMousePointer,
  faUsers, faShoppingCart, faGlobe,
  faMobile, faDesktop, faTablet
} from '@fortawesome/free-solid-svg-icons';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

const periodData = {
  '7d': [
    { label: 'Mon', views: 12400, visitors: 3200 },
    { label: 'Tue', views: 9800, visitors: 2800 },
    { label: 'Wed', views: 15200, visitors: 4100 },
    { label: 'Thu', views: 11600, visitors: 3400 },
    { label: 'Fri', views: 18900, visitors: 5200 },
    { label: 'Sat', views: 14300, visitors: 4000 },
    { label: 'Sun', views: 16800, visitors: 4600 },
  ],
  '30d': [
    { label: 'Wk 1', views: 68000, visitors: 18400 },
    { label: 'Wk 2', views: 72000, visitors: 20100 },
    { label: 'Wk 3', views: 65000, visitors: 17800 },
    { label: 'Wk 4', views: 81000, visitors: 22600 },
  ],
  '90d': [
    { label: 'Jan', views: 248000, visitors: 68000 },
    { label: 'Feb', views: 282000, visitors: 76000 },
    { label: 'Mar', views: 301000, visitors: 83000 },
  ],
  '1y': [
    { label: 'Jan', views: 248000, visitors: 68000 },
    { label: 'Feb', views: 282000, visitors: 76000 },
    { label: 'Mar', views: 301000, visitors: 83000 },
    { label: 'Apr', views: 265000, visitors: 72000 },
    { label: 'May', views: 320000, visitors: 89000 },
    { label: 'Jun', views: 345000, visitors: 95000 },
    { label: 'Jul', views: 312000, visitors: 86000 },
    { label: 'Aug', views: 358000, visitors: 99000 },
    { label: 'Sep', views: 334000, visitors: 92000 },
    { label: 'Oct', views: 389000, visitors: 108000 },
    { label: 'Nov', views: 402000, visitors: 112000 },
    { label: 'Dec', views: 421000, visitors: 117000 },
  ],
};

const trafficSources = [
  { name: 'Organic', value: 42, color: '#6366f1' },
  { name: 'Direct', value: 28, color: '#8b5cf6' },
  { name: 'Social', value: 18, color: '#ec4899' },
  { name: 'Referral', value: 8, color: '#f59e0b' },
  { name: 'Email', value: 4, color: '#10b981' },
];

const topPages = [
  { page: '/home', views: 84231, change: '+12%', up: true },
  { page: '/products', views: 52904, change: '+8%', up: true },
  { page: '/pricing', views: 34120, change: '-3%', up: false },
  { page: '/blog', views: 28450, change: '+19%', up: true },
  { page: '/contact', views: 12840, change: '+5%', up: true },
];

const devices = [
  { type: 'Desktop', icon: faDesktop, percentage: 54, color: '#6366f1' },
  { type: 'Mobile', icon: faMobile, percentage: 38, color: '#8b5cf6' },
  { type: 'Tablet', icon: faTablet, percentage: 8, color: '#ec4899' },
];

const metrics = [
  { label: 'Page Views', value: '284,391', change: '+14.2%', trend: 'up', icon: faEye, color: 'from-indigo-500 to-indigo-600' },
  { label: 'Unique Visitors', value: '48,290', change: '+8.7%', trend: 'up', icon: faUsers, color: 'from-violet-500 to-violet-600' },
  { label: 'Click Rate', value: '5.34%', change: '-1.2%', trend: 'down', icon: faMousePointer, color: 'from-pink-500 to-rose-500' },
  { label: 'Conversions', value: '3,847', change: '+22.5%', trend: 'up', icon: faShoppingCart, color: 'from-emerald-500 to-teal-500' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 shadow-xl text-sm">
        <p className="font-semibold text-gray-700 dark:text-gray-200 mb-1.5">{label}</p>
        {payload.map(p => (
          <p key={p.dataKey} style={{ color: p.color }} className="font-medium">
            {p.dataKey === 'views'
              ? `${(p.value / 1000).toFixed(1)}k views`
              : `${(p.value / 1000).toFixed(1)}k visitors`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const AnalyticsPage = () => {
  const [period, setPeriod] = useState('7d');
  const data = periodData[period];

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Detailed insights about your website performance.</p>
        </div>
        <div className="flex gap-1 bg-gray-100 dark:bg-zinc-800 rounded-lg p-1">
          {['7d', '30d', '90d', '1y'].map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                period === p
                  ? 'bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map(m => (
          <div key={m.label} className="bg-white dark:bg-zinc-900 rounded-xl p-5 border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${m.color} flex items-center justify-center`}>
                <FontAwesomeIcon icon={m.icon} className="w-4 h-4 text-white" />
              </div>
              <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                m.trend === 'up'
                  ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                  : 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400'
              }`}>
                <FontAwesomeIcon icon={m.trend === 'up' ? faArrowUp : faArrowDown} className="w-3 h-3" />
                {m.change}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{m.label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{m.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Traffic Bar Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm p-6">
          <div className="mb-5">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Traffic Overview</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Page views vs unique visitors</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:opacity-20" />
              <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={v => v >= 1000 ? `${v/1000}k` : v} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.05)' }} />
              <Bar dataKey="views" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={32} />
              <Bar dataKey="visitors" fill="#c4b5fd" radius={[4, 4, 0, 0]} maxBarSize={32} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-3">
            <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <span className="w-3 h-2 rounded bg-indigo-500 inline-block" /> Views
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <span className="w-3 h-2 rounded bg-violet-300 inline-block" /> Visitors
            </span>
          </div>
        </div>

        {/* Traffic Sources Pie */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm p-6">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Traffic Sources</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Where visitors come from</p>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={trafficSources} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                {trafficSources.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {trafficSources.map(s => (
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="text-xs text-gray-600 dark:text-gray-400">{s.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-100 dark:bg-zinc-800 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full" style={{ width: `${s.value}%`, background: s.color }} />
                  </div>
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 w-7 text-right">{s.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-zinc-800">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Top Pages</h3>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-zinc-800">
            {topPages.map((p, idx) => (
              <div key={p.page} className="px-6 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-sm font-mono text-gray-700 dark:text-gray-300">{p.page}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{p.views.toLocaleString()}</span>
                  <span className={`flex items-center gap-1 text-xs font-medium ${p.up ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                    <FontAwesomeIcon icon={p.up ? faArrowUp : faArrowDown} className="w-2.5 h-2.5" />
                    {p.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device + Region */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm p-6">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-5">Device Breakdown</h3>
          <div className="space-y-4 mb-6">
            {devices.map(d => (
              <div key={d.type} className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-zinc-800 flex items-center justify-center" style={{ color: d.color }}>
                  <FontAwesomeIcon icon={d.icon} className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-gray-800 dark:text-gray-200">{d.type}</span>
                    <span className="font-bold text-gray-900 dark:text-white">{d.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-zinc-800 rounded-full h-2">
                    <div className="h-2 rounded-full transition-all duration-700" style={{ width: `${d.percentage}%`, background: d.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
            <div className="flex items-center gap-2 mb-3">
              <FontAwesomeIcon icon={faGlobe} className="w-4 h-4 text-indigo-500" />
              <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Top Regions</h4>
            </div>
            <div className="space-y-2">
              {[['🇮🇩 Indonesia', '38%'], ['🇺🇸 United States', '22%'], ['🇬🇧 United Kingdom', '14%'], ['🇩🇪 Germany', '9%']].map(([country, pct]) => (
                <div key={country} className="flex justify-between items-center text-sm py-1">
                  <span className="text-gray-600 dark:text-gray-400">{country}</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalyticsPage;
