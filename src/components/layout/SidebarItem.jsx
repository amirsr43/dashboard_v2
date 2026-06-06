import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SidebarItem = ({ icon, label, active, sidebarOpen }) => {
  return (
    <a
      href="#"
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all group ${
        active
          ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800'
      }`}
    >
      <FontAwesomeIcon icon={icon} className="w-5 h-5 flex-shrink-0" />
      {sidebarOpen && <span className="text-sm font-medium">{label}</span>}
    </a>
  );
};

export default SidebarItem;