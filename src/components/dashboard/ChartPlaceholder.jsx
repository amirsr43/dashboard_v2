import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ChartPlaceholder = ({ title, icon, description, hasSelect = false }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-gray-200 dark:border-zinc-800 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        {hasSelect && (
          <select className="text-sm bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg px-3 py-1">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
          </select>
        )}
      </div>
      <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-zinc-800/50 rounded-lg border border-dashed border-gray-200 dark:border-zinc-700">
        <div className="text-center">
          <FontAwesomeIcon icon={icon} className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Integrate with Recharts or Chart.js</p>
        </div>
      </div>
    </div>
  );
};

export default ChartPlaceholder;