import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const StatCard = ({ title, value, change, trend, icon, color }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg bg-gray-50 dark:bg-zinc-800 ${color}`}>
          <FontAwesomeIcon icon={icon} className="w-5 h-5" />
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
            trend === 'up'
              ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
              : 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400'
          }`}
        >
          <FontAwesomeIcon icon={trend === 'up' ? faArrowUp : faArrowDown} className="w-3 h-3" />
          {change}
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  );
};

export default StatCard;