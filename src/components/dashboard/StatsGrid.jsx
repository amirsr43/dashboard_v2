import React from 'react';
import { faDollarSign, faUsers, faBagShopping, faChartLine } from '@fortawesome/free-solid-svg-icons';
import StatCard from './StatCard';

const stats = [
  {
    title: 'Total Revenue',
    value: '$54,239',
    change: '+12.5%',
    trend: 'up',
    icon: faDollarSign,
    color: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    title: 'Active Users',
    value: '18,293',
    change: '+8.2%',
    trend: 'up',
    icon: faUsers,
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    title: 'New Orders',
    value: '4,129',
    change: '-3.1%',
    trend: 'down',
    icon: faBagShopping,
    color: 'text-amber-600 dark:text-amber-400',
  },
  {
    title: 'Conversion Rate',
    value: '3.24%',
    change: '+2.4%',
    trend: 'up',
    icon: faChartLine,
    color: 'text-violet-600 dark:text-violet-400',
  },
];

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <StatCard key={idx} {...stat} />
      ))}
    </div>
  );
};

export default StatsGrid;